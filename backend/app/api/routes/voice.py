"""Voice AI route — parses speech transcript into structured task data via Gemini."""

import json
import logging
from datetime import date

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.deps import get_current_user
from app.core.config import settings
from app.db.database import get_db
from app.db.models import User
from app.schemas.task import VoiceParseRequest, VoiceParseResponse

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/tasks", tags=["Voice AI"])

SYSTEM_PROMPT = """You are a task parsing assistant. Extract task information from the user's speech.
Return ONLY a valid JSON object with these exact keys:
  - title: string (required, concise task name, max 80 chars)
  - description: string or null (additional context from the speech)
  - priority: one of exactly "low", "medium", "high", "urgent"
  - due_date: ISO date string "YYYY-MM-DD" or null

Priority inference rules:
  - "urgent", "ASAP", "immediately", "today" → "urgent"
  - "high priority", "important", "critical" → "high"
  - "low priority", "whenever", "someday" → "low"
  - default → "medium"

Due date inference:
  - "today" → today's date
  - "tomorrow" → tomorrow's date
  - "next week" → 7 days from today
  - "by Friday" → next Friday's date
  - specific dates → parse them
  - no date mentioned → null

Today's date for reference: {today}

Return ONLY the JSON. No markdown, no explanation, no backticks."""


@router.post(
    "/parse-voice",
    response_model=VoiceParseResponse,
    summary="Parse voice transcript into structured task data",
)
async def parse_voice_route(
    body: VoiceParseRequest,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
) -> VoiceParseResponse:
    """Use Gemini Flash to extract task fields from a voice transcript."""
    if not settings.GEMINI_API_KEY:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Voice parsing unavailable — GEMINI_API_KEY not configured.",
        )

    try:
        import google.generativeai as genai

        genai.configure(api_key=settings.GEMINI_API_KEY)
        model = genai.GenerativeModel("gemini-1.5-flash-latest")

        today_str = date.today().isoformat()
        system = SYSTEM_PROMPT.format(today=today_str)

        logger.info("Starting voice parse for transcript: '%s'", body.transcript)
        response = model.generate_content(
            f"{system}\n\nUser speech: {body.transcript}",
            generation_config={"temperature": 0.1, "max_output_tokens": 256},
        )

        raw = response.text.strip()
        logger.info("AI Analysis Response: %s", raw)

        # Strip markdown code fences if present
        if raw.startswith("```"):
            raw = raw.split("```")[1]
            if raw.startswith("json"):
                raw = raw[4:]
            raw = raw.strip()

        parsed = json.loads(raw)

        return VoiceParseResponse(
            title=parsed.get("title", body.transcript[:80]),
            description=parsed.get("description"),
            priority=parsed.get("priority", "medium"),
            due_date=parsed.get("due_date"),
        )

    except json.JSONDecodeError as e:
        logger.error("Gemini returned invalid JSON: %s", e)
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail="Could not parse task from speech — AI returned invalid format.",
        )
    except Exception as e:
        logger.error("Gemini API error: %s", e)
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail=f"Voice parsing failed: {str(e)}",
        )

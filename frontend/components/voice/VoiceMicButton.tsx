'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { Mic, Square, Loader2, CheckCircle2, AlertCircle, RefreshCw } from 'lucide-react';
import api from '@/lib/api';

type VoiceState = 'idle' | 'listening' | 'processing' | 'done' | 'error' | 'unsupported';

interface ParsedTask {
  title: string;
  description: string | null;
  priority: string;
  due_date: string | null;
}

interface VoiceMicButtonProps {
  onParsed: (task: ParsedTask) => void;
}

export default function VoiceMicButton({ onParsed }: VoiceMicButtonProps) {
  const [state, setState] = useState<VoiceState>('idle');
  const [transcriptDisplay, setTranscriptDisplay] = useState('');
  const [error, setError] = useState('');
  
  // Refs for stability in callbacks
  const recognitionRef = useRef<any>(null);
  const transcriptRef = useRef('');
  const isListeningRef = useRef(false);
  const processingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const SR = typeof window !== 'undefined'
      ? ((window as any).SpeechRecognition || (window as any).webkitSpeechRecognition)
      : null;
    if (!SR) setState('unsupported');
    
    return () => {
      if (processingTimeoutRef.current) clearTimeout(processingTimeoutRef.current);
    };
  }, []);

  const callGemini = async (text: string) => {
    const cleanText = text.trim();
    if (!cleanText) {
      setState('idle');
      return;
    }

    setState('processing');
    setError('');

    // Safety timeout for the AI parsing (15 seconds)
    processingTimeoutRef.current = setTimeout(() => {
      if (state === 'processing') {
        setState('error');
        setError('Intelligence timeout. Please try again.');
      }
    }, 15000);

    try {
      const resp = await api.post('/tasks/parse-voice', { transcript: cleanText });
      if (processingTimeoutRef.current) clearTimeout(processingTimeoutRef.current);
      
      onParsed(resp.data);
      setState('done');
      setTimeout(() => setState('idle'), 2500);
    } catch (e: any) {
      if (processingTimeoutRef.current) clearTimeout(processingTimeoutRef.current);
      setError(e?.response?.data?.detail || 'AI parsing unsuccessful. Try speaking clearly.');
      setState('error');
    }
  };

  const startListening = useCallback(() => {
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SR) return;

    if (isListeningRef.current) return;

    const recognition = new SR();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = 'en-IN';

    recognition.onstart = () => {
      setState('listening');
      transcriptRef.current = '';
      setTranscriptDisplay('');
      setError('');
      isListeningRef.current = true;
    };

    recognition.onresult = (e: any) => {
      const current = Array.from(e.results)
        .map((r: any) => r[0].transcript)
        .join('');
      transcriptRef.current = current;
      setTranscriptDisplay(current);
    };

    recognition.onend = () => {
      isListeningRef.current = false;
      // Use the ref value directly to avoid closure issues
      const finalTranscript = transcriptRef.current;
      if (!finalTranscript) {
        setState('idle');
        return;
      }
      callGemini(finalTranscript);
    };

    recognition.onerror = (e: any) => {
      isListeningRef.current = false;
      if (e.error === 'no-speech') {
        setState('idle');
      } else {
        setError(`Microphone: ${e.error}`);
        setState('error');
      }
    };

    recognitionRef.current = recognition;
    recognition.start();
  }, [onParsed]); // Minimal dependencies

  const stopListening = useCallback(() => {
    if (recognitionRef.current && isListeningRef.current) {
      recognitionRef.current.stop();
    }
  }, []);

  if (state === 'unsupported') {
    return (
      <div className="flex items-center gap-2 bg-[#1F1F1F] border border-[#2A2A2A] rounded-xl px-4 py-3">
        <AlertCircle size={16} className="text-amber-400 shrink-0" />
        <p className="text-[12px] text-gray-400">Voice requires Chrome or Edge browser.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-3 w-full">
      {/* Mic / state button */}
      <div className="relative">
        {state === 'listening' && (
          <span className="absolute inset-0 rounded-full animate-ping"
            style={{ background: 'rgba(6,182,212,0.25)' }} />
        )}
        <button
          type="button"
          onClick={state === 'listening' ? stopListening : startListening}
          disabled={state === 'processing'}
          className="relative w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all active:scale-95 disabled:opacity-60"
          style={{
            background:
              state === 'listening' ? '#EF4444' : // Red when listening (standard)
              state === 'processing' ? '#F5C842' :
              state === 'done' ? '#10B981' :
              state === 'error' ? '#1F1F1F' : '#06B6D4',
            boxShadow:
              state === 'listening' ? '0 0 20px rgba(239,68,68,0.4)' : 'none',
          }}
        >
          {state === 'processing' ? (
            <Loader2 size={24} className="text-black animate-spin" />
          ) : state === 'done' ? (
            <CheckCircle2 size={24} className="text-white" />
          ) : state === 'error' ? (
            <AlertCircle size={24} className="text-red-500" />
          ) : state === 'listening' ? (
            <Square size={18} className="text-white fill-white" />
          ) : (
            <Mic size={24} className="text-white" />
          )}
        </button>
      </div>

      {/* Dynamic Label */}
      <div className="flex flex-col items-center gap-1">
        <p className="text-[11px] font-black uppercase tracking-widest text-center"
          style={{
            color:
              state === 'listening' ? '#EF4444' :
              state === 'processing' ? '#F5C842' :
              state === 'done' ? '#10B981' :
              state === 'error' ? '#EF4444' : '#6B7280',
          }}
        >
          {state === 'idle' && 'Voice Intelligence'}
          {state === 'listening' && 'Listening...'}
          {state === 'processing' && 'AI Parsing...'}
          {state === 'done' && 'Strategic Sync Complete'}
          {state === 'error' && 'Operational Failure'}
        </p>
        
        <p className="text-[10px] text-gray-500 font-medium max-w-[200px] text-center antialiased">
          {state === 'idle' && 'Speak your objective to autofill form'}
          {state === 'listening' && 'Click square to stop manually'}
          {state === 'processing' && 'Extracting mission parameters'}
          {state === 'error' && (error || "Calibration error")}
        </p>
      </div>

      {/* Live transcript visualizer */}
      <AnimatePresence>
        {state === 'listening' && transcriptDisplay && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl px-5 py-4 text-[13px] text-cyan-400 font-mono italic min-h-[50px] leading-relaxed shadow-inner"
          >
            {transcriptDisplay}
            <span className="inline-block w-1.5 h-4 bg-cyan-400 ml-1 animate-pulse" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Retry Action */}
      {state === 'error' && (
        <button
          type="button"
          onClick={() => setState('idle')}
          className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-white transition-all bg-[#1F1F1F] px-4 py-2 rounded-xl mt-2"
        >
          <RefreshCw size={12} className="text-amber-400" /> Recalibrate
        </button>
      )}
    </div>
  );
}

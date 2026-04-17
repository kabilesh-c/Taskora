'use client';

import { motion } from 'framer-motion';

export function Testimonials() {
  const reviews = [
    {
      body: "Managing our SEO and social campaigns used to be chaos. TaskFlow's voice task feature alone saves our team 2 hours a week.",
      author: "Arjun M.",
      role: "Digital Strategist",
      rating: 4.9
    },
    {
      body: "The real-time updates and reporting tools are particularly impressive, providing us with the insights we need to make informed decisions quickly.",
      author: "Priya R.",
      role: "Project Manager",
      rating: 4.8
    },
    {
      body: "Priority filtering and calendar view is exactly what a web dev agency needs. We've dropped Jira entirely for this.",
      author: "Karan S.",
      role: "Tech Lead",
      rating: 5.0
    },
    {
      body: "This task management website has transformed the way our team works. The ease of assigning tasks and tracking progress is unmatched.",
      author: "Maria D.",
      role: "Web Designer",
      rating: 4.9
    },
    {
      body: "The onboarding was seamless. Even our least tech-savvy clients adapt to the shared boards immediately.",
      author: "Siddharth V.",
      role: "Account Executive",
      rating: 4.7
    },
    {
      body: "I love how user-friendly this platform is. It has streamlined our task management and made it easier to oversee multiple projects.",
      author: "Elena T.",
      role: "Marketing Coordinator",
      rating: 4.8
    }
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, scale: 0.95 },
    show: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
  };

  return (
    <section id="testimonials" className="py-24 bg-background-alt">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary tracking-tight mb-4">
            What teams say after using TaskFlow
          </h2>
        </div>

        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {reviews.map((review, i) => (
            <motion.div key={i} variants={item}>
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 h-full flex flex-col">
                <div className="flex items-center gap-1 mb-4">
                  {'★★★★★'.split('').map((star, idx) => (
                    <span key={idx} className={idx < Math.floor(review.rating) ? "text-amber-400 text-sm" : "text-gray-200 text-sm"}>
                      {star}
                    </span>
                  ))}
                  <span className="text-xs font-medium text-gray-500 ml-2">{review.rating}</span>
                </div>
                
                <p className="text-text-secondary text-sm leading-relaxed mb-6 flex-1">
                  &quot;{review.body}&quot;
                </p>
                
                <div className="flex items-center gap-3 mt-auto">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary text-xs">
                    {review.author.substring(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <h5 className="text-sm font-semibold text-text-primary">{review.author}</h5>
                    <p className="text-xs text-text-secondary">{review.role}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

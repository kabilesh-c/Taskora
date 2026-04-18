export function Testimonials() {
  const reviews = [
    {
      body: "I've tried several task management tools, but this one stands out as the best. The real-time reporting feature is incredibly useful for tracking my team's progress.",
      author: "Kyle Calvert",
      role: "Marketing Coordinator",
      rating: 4.8,
      seed: "11"
    },
    {
      body: "For someone who juggles multiple projects, I needed a tool that could keep me organized without being a hassle to use. This platform...",
      author: "Robyn Blackman",
      role: "Project Manager",
      rating: 4.4,
      seed: "22"
    },
    {
      body: "This new management website has transformed the way our team works. The ease of assigning tasks, setting deadlines, and tracking progress is unmatched.",
      author: "Maris Barrett",
      role: "Web Designer",
      rating: 4.9,
      seed: "33"
    },
    {
      body: "I love how user-friendly this platform is. It has streamlined our task management and made it easier to oversee multiple projects simultaneously.",
      author: "Gia Amir",
      role: "App Tester",
      rating: 4.5,
      seed: "44"
    },
    {
      body: "The progress tracking and reporting tools are particularly impressive, providing us with the insights we need to make informed decisions quickly. This tool has become an essential part...",
      author: "Orville Paul",
      role: "Product Creator",
      rating: 4.7,
      seed: "55"
    },
    {
      body: "The realtime updates and reporting that... us stay on top of our projects without any guesswork. Plus, their customer support is fantastic - responsive and helpful!",
      author: "Saige Leon",
      role: "Team Executive",
      rating: 4.9,
      seed: "66"
    }
  ];

  return (
    <section id="review" className="max-w-[1280px] mx-auto px-6 lg:px-8 mb-24">
      <div className="text-center mb-16">
        <h2 className="text-[32px] md:text-[40px] font-bold text-bordup-dark leading-tight max-w-[400px] mx-auto">
          What are they say after using Bordup
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.map((review, i) => (
          <div key={i} className="bg-white rounded-[24px] p-6 border border-gray-100 shadow-sm flex flex-col justify-between h-[220px]">
            <div>
              <div className="flex items-center gap-1 mb-4">
                {'★★★★★'.split('').map((star, idx) => (
                  <span key={idx} className={idx < Math.floor(review.rating) ? "text-bordup-yellow text-sm" : "text-gray-200 text-sm"}>
                    {star}
                  </span>
                ))}
                <span className="text-xs font-bold text-bordup-dark ml-2">{review.rating}</span>
              </div>
              <p className="text-[13px] text-gray-600 leading-relaxed max-w-[280px] line-clamp-4">
                &quot;{review.body}&quot;
              </p>
            </div>
            
            <div className="flex items-center gap-3 mt-4 pt-4 border-t border-gray-50">
              <div className="w-10 h-10 rounded-full border border-gray-100 bg-gray-50 overflow-hidden shrink-0">
                 <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${review.seed}`} alt={review.author} className="w-full h-full object-cover" />
              </div>
              <div>
                <h5 className="text-sm font-bold text-bordup-dark">{review.author}</h5>
                <p className="text-[10px] text-gray-500 font-medium">{review.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

'use client';

import { useState, useEffect } from 'react';

const concertBanners = [
  { id: 1, title: 'Concert A', date: '2026-06-01', venue: 'GBK Jakarta', color: 'bg-zinc-900' },
  { id: 2, title: 'Concert B', date: '2026-07-15', venue: 'ICE BSD', color: 'bg-main-darkbrown' },
  { id: 3, title: 'Concert C', date: '2026-08-20', venue: 'JIEXPO Kemayoran', color: 'bg-zinc-800' },
];

export const ConcertCarousel = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % concertBanners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full overflow-hidden aspect-[21/9] md:aspect-[2.5/1] bg-main-darkbrown">
      {concertBanners.map((banner, index) => (
        <div
          key={banner.id}
          className={`absolute inset-0 transition-opacity duration-1000 flex items-center justify-center ${
            index === current ? 'opacity-100 z-10' : 'opacity-0 z-0'
          } ${banner.color}`}
        >
          {/* Content Placeholder */}
          <div className="text-center px-6">
            <span className="inline-block px-4 py-1 rounded-full border border-main-gold text-main-gold text-[10px] font-black uppercase tracking-[0.2em] mb-4">
              Upcoming Event
            </span>
            <h2 className="text-4xl md:text-7xl font-black text-white uppercase tracking-tighter italic">
              {banner.title}
            </h2>
            <div className="mt-6 flex items-center justify-center gap-6 text-main-cream/60 text-xs md:text-sm font-black uppercase tracking-[0.2em]">
              <span>{banner.venue}</span>
              <span className="text-main-gold">•</span>
              <span>{banner.date}</span>
            </div>
          </div>
          
          {/* Background pattern placeholder */}
          <div className="absolute inset-0 opacity-10 pointer-events-none">
             <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
          </div>
        </div>
      ))}

      {/* Navigation Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {concertBanners.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-2 transition-all duration-300 rounded-full ${
              i === current ? 'w-10 bg-main-yellow' : 'w-2 bg-white/30 hover:bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

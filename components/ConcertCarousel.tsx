'use client';

import { useState, useEffect } from 'react';

const concertBanners = [
  { id: 1, title: 'LANY a beautiful blur tour', price: 'Rp 1.500.000', venue: 'Stadium GBK', date: '01 Juni 2026', color: 'bg-zinc-900' },
  { id: 2, title: 'Bruno Mars Live in Jakarta', price: 'Rp 2.200.000', venue: 'JIS Jakarta', date: '15 Juli 2026', color: 'bg-main-darkbrown' },
  { id: 3, title: 'Coldplay Music of Spheres', price: 'Rp 3.000.000', venue: 'GBK Jakarta', date: '20 Agustus 2026', color: 'bg-zinc-800' },
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
    <div className="relative w-full overflow-hidden aspect-[21/9] md:aspect-[3/1] bg-main-darkbrown">
      {concertBanners.map((banner, index) => (
        <div
          key={banner.id}
          className={`absolute inset-0 transition-opacity duration-1000 flex items-end justify-start p-8 md:p-20 ${
            index === current ? 'opacity-100 z-10' : 'opacity-0 z-0'
          } ${banner.color}`}
        >
          {/* Background pattern/image placeholder */}
          <div className="absolute inset-0 opacity-20 pointer-events-none z-0">
             <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
          </div>

          {/* Content Overlay */}
          <div className="relative z-10 max-w-4xl font-avenir">
            <span className="inline-block px-4 py-1.5 rounded-full bg-main-yellow text-main-darkbrown text-[10px] font-bold uppercase tracking-[0.2em] mb-6">
              Upcoming Event
            </span>
            <h2 className="text-4xl md:text-7xl font-bold text-white uppercase tracking-tighter leading-none mb-6 font-avenir">
              {banner.title}
            </h2>
            <div className="flex flex-wrap items-center gap-x-8 gap-y-4 text-main-cream/60 text-xs md:text-sm font-bold uppercase tracking-[0.2em]">
              <div className="flex items-center gap-2">
                <span className="text-main-gold">Venue:</span> {banner.venue}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-main-gold">Date:</span> {banner.date}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-main-gold">Starts from:</span> 
                <span className="text-main-white">{banner.price}</span>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Dots */}
      <div className="absolute bottom-6 md:bottom-10 right-8 md:right-20 z-20 flex gap-2">
        {concertBanners.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-1 md:h-1.5 transition-all duration-300 rounded-full ${
              i === current ? 'w-8 md:w-12 bg-main-yellow' : 'w-2 bg-white/20 hover:bg-white/40'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

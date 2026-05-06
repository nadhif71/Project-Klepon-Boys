'use client';

import { useState, useEffect } from 'react';

const concertBanners = [
  { id: 1, title: 'LANY - Jakarta', price: 'Rp 1.500.000', venue: 'Stadium GBK', date: '01 Juni 2026', color: 'bg-zinc-900', img: '/images/lany.webp' },
  { id: 2, title: 'Keshi: Requiem Tour', price: 'Rp 1.800.000', venue: 'Istora Senayan', date: '15 Desember 2026', color: 'bg-main-darkbrown', img: '/images/keshi2x.webp' },
  { id: 3, title: 'Fuji Kaze: Best of Tour', price: 'Rp 2.100.000', venue: 'JIS Jakarta', date: '20 Oktober 2026', color: 'bg-zinc-800', img: '/images/fujikaze2x.webp' },
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
    <div className="relative w-full overflow-hidden aspect-[16/10] md:aspect-[3/1] bg-main-darkbrown">
      {concertBanners.map((banner, index) => (
        <div
          key={banner.id}
          className={`absolute inset-0 transition-opacity duration-1000 flex items-end justify-start p-6 md:p-20 ${
            index === current ? 'opacity-100 z-10' : 'opacity-0 z-0'
          } ${banner.color}`}
        >
          {/* Background Image / Placeholder */}
          <div className="absolute inset-0 z-0">
             {banner.img ? (
               <div className="relative w-full h-full">
                  <img src={banner.img} alt={banner.title} className="w-full h-full object-cover opacity-40 md:opacity-60" />
                  <div className="absolute inset-0 bg-gradient-to-t from-main-darkbrown via-transparent/20 to-transparent"></div>
               </div>
             ) : (
               <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
             )}
          </div>

          {/* Content Overlay */}
          <div className="relative z-10 max-w-4xl font-avenir">
            <span className="inline-block px-3 py-1 md:px-4 md:py-1.5 rounded-full bg-main-yellow text-main-darkbrown text-[8px] md:text-[10px] font-bold uppercase tracking-[0.2em] mb-4 md:mb-6">
              Upcoming Event
            </span>
            <h2 className="text-3xl md:text-7xl font-bold text-white uppercase tracking-tighter leading-none mb-4 md:mb-6">
              {banner.title}
            </h2>
            <div className="flex flex-col md:flex-row md:items-center gap-x-8 gap-y-2 text-main-cream/80 text-[10px] md:text-sm font-bold uppercase tracking-[0.1em]">
              <div className="flex items-center gap-2">
                <span className="text-main-gold">Venue:</span> {banner.venue}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-main-gold">Date:</span> {banner.date}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-main-gold">Price:</span> 
                <span className="text-main-white">{banner.price}</span>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Dots */}
      <div className="absolute bottom-4 md:bottom-10 right-6 md:right-20 z-20 flex gap-2">
        {concertBanners.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-1 transition-all duration-300 rounded-full ${
              i === current ? 'w-6 md:w-12 bg-main-yellow' : 'w-1.5 md:w-2 bg-white/20 hover:bg-white/40'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

import { useRef, useState } from 'react';

interface VideoTestimonial {
  id: string;
  name: string;
  role: string;
  outcome: string;
  overview: string;
  duration: string;
  src: string;
  poster: string;
}

const testimonials: VideoTestimonial[] = [
  {
    id: 'renuka',
    name: 'Renuka',
    role: 'Digital Healthcare Platform',
    outcome: '3x Faster Delivery',
    overview:
      'Working with Shubhang and Pranamya helped us automate clinical operations. We made more progress in 1 month than the previous 3 months combined.',
    duration: '2:27',
    src: '/videos/renuka.mp4',
    poster: '/videos/renuka-poster.jpg',
  },
  {
    id: 'ashok',
    name: 'Ashok Vidyasagar',
    role: 'Stratapilot AI',
    outcome: 'Backend & UX',
    overview:
      'Pranamya did a fantastic job of integrating the backend and rendering the UX for creative diagnosis. Stellar output and clear architecture explanation.',
    duration: '0:48',
    src: '/videos/ashok.mp4',
    poster: '/videos/ashok-poster.jpg',
  },
  {
    id: 'jashwant',
    name: 'Jashwant',
    role: 'Founder, Expedified',
    outcome: 'Lead Gen Pipeline',
    overview:
      'Promptly built an automation scraping qualified Reddit leads into Google Sheets with tailored response drafts ready to convert customers.',
    duration: '1:07',
    src: '/videos/jashwant-subtitled.mp4',
    poster: '/videos/jashwant-subtitled-poster.jpg',
  },
  {
    id: 'rahul',
    name: 'Rahul Jain',
    role: 'Selona AI (UK)',
    outcome: 'AI Engineering',
    overview:
      'Exceptional work ethics, deep analytical thinking, and fast execution beyond instructions. Strong long-term association.',
    duration: '0:53',
    src: '/videos/rahul-subtitled-v2.mp4',
    poster: '/videos/rahul-subtitled-poster-v2.jpg',
  },
  {
    id: 'lorenz',
    name: 'Lorenz',
    role: 'Mind & Vitals',
    outcome: 'Workflow Ops',
    overview:
      'Built a custom automation that makes my daily workflow so much easier, delivered with genuine support and kindness.',
    duration: '0:23',
    src: '/videos/lorenz-subtitled.mp4',
    poster: '/videos/lorenz-subtitled-poster-v2.jpg',
  },
  {
    id: 'dinaz',
    name: 'Dinaz Bhagat',
    role: 'Founder, Yogi Tree',
    outcome: 'Tailored Solution',
    overview:
      'They completely understood what I needed for a very specific requirement and did a fabulous job. Communicated really well and delivered on point.',
    duration: '0:28',
    src: '/videos/testimonial-6.mp4',
    poster: '/videos/testimonial-6-poster.jpg',
  },
  {
    id: 'arunkumar',
    name: 'Arunkumar SV',
    role: 'Founder, PharmAInspire',
    outcome: 'First-Principles AI',
    overview:
      'Strong technical knowledge and first-principles product building. Exceptional ability to break down complex technical concepts and deliver.',
    duration: '1:01',
    src: '/videos/arunkumar.mp4',
    poster: '/videos/arunkumar-poster.jpg',
  },
];

function VerticalVideoCard({ item }: { item: VideoTestimonial }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((err) => {
          console.warn('Playback request failed:', err);
        });
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const current = videoRef.current.currentTime;
    const dur = videoRef.current.duration || 1;
    setProgress((current / dur) * 100);
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setProgress(0);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <div className="group/card shrink-0 w-[260px] sm:w-[320px] md:w-[340px] flex flex-col bg-[#F0EFE6] border border-[#DDD8CC] rounded-2xl sm:rounded-3xl p-3.5 sm:p-5 shadow-[0_4px_20px_-10px_rgba(18,18,18,0.06)] hover:border-[#0B422A] hover:shadow-[0_16px_32px_-16px_rgba(11,66,42,0.18)] transition-all duration-300 transform-gpu select-none">
      {/* Vertical Video Reel (Top) */}
      <div
        onClick={togglePlay}
        className="relative aspect-[9/16] w-full rounded-xl sm:rounded-2xl overflow-hidden bg-[#0B2818] cursor-pointer select-none border border-black/10 transform-gpu"
      >
        {/* Video Player */}
        {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
        <video
          ref={videoRef}
          src={item.src}
          poster={item.poster}
          playsInline
          loop
          preload="none"
          onTimeUpdate={handleTimeUpdate}
          onEnded={handleEnded}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          className="relative z-10 h-full w-full object-cover bg-black"
        />

        {/* Guaranteed Crisp Poster Image Overlay when paused */}
        {!isPlaying && (
          <img
            src={item.poster}
            alt={item.name ? `${item.name} video testimonial` : 'Client video testimonial'}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 z-10 h-full w-full object-cover pointer-events-none transition-opacity duration-200"
          />
        )}

        {/* Subtle top vignette for mute button visibility without blocking bottom subtitles */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-b from-black/35 via-transparent to-transparent"
        />

        {/* Top Controls: Mute/Unmute Only */}
        <div className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 z-30 pointer-events-none">
          <button
            type="button"
            onClick={toggleMute}
            className="pointer-events-auto w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-black/60 text-white/90 hover:text-[#D9B75B] hover:bg-black/80 flex items-center justify-center backdrop-blur-md border border-white/10 transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D9B75B] touch-manipulation"
            aria-label={isMuted ? 'Unmute video' : 'Mute video'}
          >
            {isMuted ? (
              <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
              </svg>
            ) : (
              <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
              </svg>
            )}
          </button>
        </div>

        {/* Center Play Button Overlay */}
        <div
          className={[
            'absolute inset-0 z-30 flex items-center justify-center transition-opacity duration-300 pointer-events-none',
            isPlaying ? 'opacity-0 group-hover/card:opacity-60' : 'opacity-100',
          ].join(' ')}
        >
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#D9B75B] text-[#0B2818] flex items-center justify-center shadow-lg transform transition-transform group-hover/card:scale-110">
            {isPlaying ? (
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
              </svg>
            ) : (
              <svg className="w-5 h-5 sm:w-6 sm:h-6 translate-x-[1.5px]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5.14v14.72a1 1 0 0 0 1.5.86l11-7.36a1 1 0 0 0 0-1.72l-11-7.36A1 1 0 0 0 8 5.14Z" />
              </svg>
            )}
          </div>
        </div>

        {/* Bottom Scrubber Progress Bar */}
        <div className="absolute bottom-0 inset-x-0 z-30 h-1 bg-white/20">
          <div
            className="h-full bg-[#D9B75B] transition-all duration-100"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Card Body Overview (Below Video) */}
      <div className="mt-3 sm:mt-4 flex flex-col flex-1">
        <div>
          <h3 className="font-syne font-bold text-sm sm:text-base text-[#0B422A] tracking-tight">
            {item.name || '\u00A0'}
          </h3>
          <p className="font-mono-custom text-[11px] sm:text-[11.5px] text-[#6B7E76] mt-0.5">
            {item.role || '\u00A0'}
          </p>
        </div>

        {/* Crisp 1–2 sentence overview quote of what they said */}
        <p className="text-xs sm:text-[13px] text-[#4A5550] leading-relaxed mt-2 sm:mt-3 pt-2 sm:pt-3 border-t border-[#DDD8CC]/70 italic">
          &ldquo;{item.overview}&rdquo;
        </p>
      </div>
    </div>
  );
}

export function VideoTestimonials() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const amount = direction === 'left' ? -300 : 300;
      scrollContainerRef.current.scrollBy({ left: amount, behavior: 'smooth' });
    }
  };

  return (
    <section
      id="video-testimonials"
      aria-label="Client video testimonials"
      className="py-12 sm:py-20 md:py-28 bg-[#FDFCF0] border-t border-[#DDD8CC] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-14 gap-4">
          <div>
            <span className="font-mono-custom text-[11px] font-semibold text-[#6B7E76] uppercase tracking-[0.2em] block mb-2">
              CLIENT STORIES
            </span>
            <h2 className="font-syne text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#0B422A]">
              Founders on camera
            </h2>
          </div>

          <div className="flex items-center gap-3 self-end sm:self-auto">
            {/* Slider Navigation Arrows */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => scroll('left')}
                className="w-9 h-9 rounded-full border border-[#DDD8CC] bg-[#F0EFE6] hover:border-[#0B422A] hover:bg-[#0B422A] hover:text-[#FDFCF0] text-[#0B422A] flex items-center justify-center transition-all cursor-pointer shadow-xs touch-manipulation"
                aria-label="Scroll left"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => scroll('right')}
                className="w-9 h-9 rounded-full border border-[#DDD8CC] bg-[#F0EFE6] hover:border-[#0B422A] hover:bg-[#0B422A] hover:text-[#FDFCF0] text-[#0B422A] flex items-center justify-center transition-all cursor-pointer shadow-xs touch-manipulation"
                aria-label="Scroll right"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* 5 Vertical Reel Cards Carousel */}
        <div
          ref={scrollContainerRef}
          className="flex gap-4 sm:gap-6 overflow-x-auto pb-6 pt-1 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-none no-scrollbar"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          {testimonials.map((item) => (
            <VerticalVideoCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}

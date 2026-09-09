import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";

import bogoBanner from "../assets/bogo-banner.png";
import crust20Banner from "../assets/crust20-banner.png";
import welcome100Banner from "../assets/welcome100-banner.png";
import freeDeliveryBanner from "../assets/free-delivery-banner.png";

const slides = [
  {
    id: 1,
    image: bogoBanner,
    alt: "Buy One Get One Free pizza offer",
  },
  {
    id: 2,
    image: crust20Banner,
    alt: "20 percent off pizza offer",
  },
  {
    id: 3,
    image: welcome100Banner,
    alt: "100 rupees off first order",
  },
  {
    id: 4,
    image: freeDeliveryBanner,
    alt: "Free delivery on orders above 499 rupees",
  },
];

export default function HeroBanner({ navigate }) {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((current) =>
        current === slides.length - 1
          ? 0
          : current + 1
      );
    }, 4500);

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setActiveSlide((current) =>
      current === slides.length - 1
        ? 0
        : current + 1
    );
  };

  const previousSlide = () => {
    setActiveSlide((current) =>
      current === 0
        ? slides.length - 1
        : current - 1
    );
  };

  const openMenu = () => {
    document
      .getElementById("pizza-menu")
      ?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
  };

  return (
    <section className="relative w-full">

      {/* BANNER */}
      <div className="relative overflow-hidden rounded-[24px] bg-[#eee8e0]">

        <AnimatePresence mode="wait">

          <motion.img
            key={slides[activeSlide].id}
            src={slides[activeSlide].image}
            alt={slides[activeSlide].alt}
            draggable="false"
            onClick={openMenu}
            initial={{
              opacity: 0,
              x: 25,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            exit={{
              opacity: 0,
              x: -25,
            }}
            transition={{
              duration: 0.4,
              ease: "easeOut",
            }}
            className="block aspect-[3/2] w-full cursor-pointer object-cover"
          />

        </AnimatePresence>

        {/* LEFT ARROW */}
        <button
          type="button"
          onClick={previousSlide}
          aria-label="Previous banner"
          className="absolute left-3 top-1/2 z-20 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-[#29231f] shadow-md backdrop-blur-md transition active:scale-90"
        >
          <FiChevronLeft size={16} />
        </button>

        {/* RIGHT ARROW */}
        <button
          type="button"
          onClick={nextSlide}
          aria-label="Next banner"
          className="absolute right-3 top-1/2 z-20 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-[#29231f] shadow-md backdrop-blur-md transition active:scale-90"
        >
          <FiChevronRight size={16} />
        </button>

        {/* DOTS */}
        <div className="absolute bottom-2.5 left-1/2 z-30 flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-white/75 px-2.5 py-1.5 shadow-sm backdrop-blur-md">

          {slides.map((slide, index) => (
            <button
              key={slide.id}
              type="button"
              aria-label={`Go to slide ${index + 1}`}
              onClick={() => setActiveSlide(index)}
              className="flex items-center justify-center"
            >
              <motion.span
                animate={{
                  width:
                    activeSlide === index
                      ? 21
                      : 7,
                }}
                transition={{
                  duration: 0.25,
                }}
                className={`block h-1.5 rounded-full ${
                  activeSlide === index
                    ? "bg-[#087443]"
                    : "bg-[#c4cbd2]"
                }`}
              />
            </button>
          ))}

        </div>
      </div>

    </section>
  );
}
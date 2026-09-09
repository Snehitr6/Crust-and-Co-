import { motion } from "framer-motion";
import {
  FiArrowRight,
  FiChevronRight,
  FiHeart,
} from "react-icons/fi";

import { pizzas } from "../data/pizzas";

export default function SplashScreen() {
  const heroPizza =
    pizzas?.find(
      (pizza) =>
        pizza.category === "pizzas" &&
        pizza.image
    )?.image || pizzas?.[0]?.image;

  const ingredients = [
    {
      emoji: "🌿",
      x: -125,
      y: -125,
      delay: 0.25,
      duration: 3.2,
    },
    {
      emoji: "🍅",
      x: 130,
      y: -105,
      delay: 0.45,
      duration: 3.5,
    },
    {
      emoji: "🧀",
      x: -145,
      y: 30,
      delay: 0.65,
      duration: 3.1,
    },
    {
      emoji: "🫒",
      x: 140,
      y: 45,
      delay: 0.8,
      duration: 3.7,
    },
    {
      emoji: "🌿",
      x: -95,
      y: 135,
      delay: 1,
      duration: 3.4,
    },
    {
      emoji: "🍅",
      x: 105,
      y: 130,
      delay: 1.15,
      duration: 3.1,
    },
  ];

  const flourParticles = Array.from(
    { length: 22 },
    (_, index) => ({
      id: index,
      left: `${8 + ((index * 37) % 84)}%`,
      top: `${12 + ((index * 53) % 76)}%`,
      delay: (index % 7) * 0.12,
      size: 1 + (index % 3),
      duration: 2.4 + (index % 4) * 0.4,
    })
  );

  return (
    <motion.div
      initial={{
        opacity: 1,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
        scale: 1.035,
        filter: "blur(4px)",
      }}
      transition={{
        duration: 0.8,
        ease: [0.76, 0, 0.24, 1],
      }}
      className="fixed inset-0 z-[9999] overflow-hidden bg-[#120e0c]"
    >
      {/* =====================================================
          CINEMATIC BACKGROUND
      ===================================================== */}

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_43%,rgba(239,62,50,0.18),transparent_28%),radial-gradient(circle_at_50%_100%,rgba(245,130,35,0.12),transparent_40%)]" />

      {/* Oven glow */}
      <motion.div
        animate={{
          scale: [0.85, 1.12, 0.92],
          opacity: [0.18, 0.42, 0.2],
        }}
        transition={{
          duration: 2.8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute left-1/2 top-[39%] h-[330px] w-[330px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#ef3e32]/25 blur-[100px]"
      />

      {/* Warm bottom oven glow */}
      <motion.div
        animate={{
          opacity: [0.18, 0.34, 0.2],
          scaleX: [0.9, 1.08, 0.94],
        }}
        transition={{
          duration: 2.2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-[-150px] left-1/2 h-[300px] w-[430px] -translate-x-1/2 rounded-full bg-[#ff8a32]/20 blur-[85px]"
      />

      {/* =====================================================
          FILM GRAIN
      ===================================================== */}

      <div className="pointer-events-none absolute inset-0 opacity-[0.045] mix-blend-screen">
        <div className="h-full w-full bg-[radial-gradient(circle_at_20%_20%,white_0.6px,transparent_0.8px)] [background-size:5px_5px]" />
      </div>

      {/* =====================================================
          FLOUR / DUST PARTICLES
      ===================================================== */}

      {flourParticles.map((particle) => (
        <motion.span
          key={particle.id}
          className="absolute rounded-full bg-white"
          style={{
            left: particle.left,
            top: particle.top,
            width: particle.size,
            height: particle.size,
          }}
          initial={{
            opacity: 0,
            y: 18,
            scale: 0.4,
          }}
          animate={{
            opacity: [0, 0.5, 0],
            y: [-10, -55, -90],
            x: [0, particle.id % 2 ? 5 : -5, 0],
            scale: [0.4, 1, 0.2],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeOut",
          }}
        />
      ))}

      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}

      <div className="relative z-10 flex h-full w-full flex-col items-center px-6">

        {/* ===================================================
            TOP LABEL
        =================================================== */}

        <motion.div
          initial={{
            opacity: 0,
            y: -15,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.6,
            delay: 0.15,
          }}
          className="absolute top-[7%] text-center"
        >
          <p className="text-[8px] font-extrabold uppercase tracking-[0.42em] text-white/35">
            Crafted for cravings
          </p>

          <div className="mx-auto mt-3 h-px w-8 bg-[#ef3e32]" />
        </motion.div>

        {/* ===================================================
            PIZZA STAGE
        =================================================== */}

        <div className="absolute left-1/2 top-[40%] h-[285px] w-[285px] -translate-x-1/2 -translate-y-1/2">

          {/* Outer glow */}
          <motion.div
            animate={{
              scale: [0.92, 1.08, 0.94],
              opacity: [0.2, 0.48, 0.2],
            }}
            transition={{
              duration: 2.3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute left-1/2 top-1/2 h-[220px] w-[220px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#ef3e32]/25 blur-[55px]"
          />

          {/* Pizza shadow */}
          <motion.div
            animate={{
              scaleX: [0.85, 1, 0.88],
              opacity: [0.25, 0.42, 0.25],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute bottom-[17px] left-1/2 h-8 w-[205px] -translate-x-1/2 rounded-full bg-black/70 blur-2xl"
          />

          {/* Orbit ring */}
          <motion.div
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 11,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute inset-[13px] rounded-full border border-dashed border-[#ef3e32]/25"
          />

          <motion.div
            animate={{
              rotate: -360,
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute inset-[28px] rounded-full border border-white/[0.08]"
          />

          {/* =================================================
              REAL PIZZA
          ================================================= */}

          <motion.div
            initial={{
              opacity: 0,
              scale: 0.25,
              y: 65,
              rotate: -18,
              filter: "blur(10px)",
            }}
            animate={{
              opacity: 1,
              scale: [0.92, 1, 0.96],
              y: [30, 0, 8],
              rotate: [-4, 2, -2],
              filter: "blur(0px)",
            }}
            transition={{
              opacity: {
                duration: 0.75,
                delay: 0.35,
              },
              scale: {
                duration: 2.2,
                delay: 0.35,
                ease: [0.22, 1, 0.36, 1],
              },
              y: {
                duration: 2.2,
                delay: 0.35,
                ease: [0.22, 1, 0.36, 1],
              },
              rotate: {
                duration: 2.2,
                delay: 0.35,
                ease: [0.22, 1, 0.36, 1],
              },
              filter: {
                duration: 0.8,
                delay: 0.35,
              },
            }}
            className="absolute left-1/2 top-1/2 h-[210px] w-[210px] -translate-x-1/2 -translate-y-1/2"
          >
            <motion.img
              src={heroPizza}
              alt="Freshly baked pizza"
              draggable="false"
              animate={{
                rotate: [0, 2, -2, 0],
                scale: [1, 1.025, 1],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="h-full w-full rounded-full object-cover shadow-[0_25px_55px_rgba(0,0,0,0.55)]"
            />

            {/* pizza highlight */}
            <div className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-tr from-black/15 via-transparent to-white/10" />

            {/* edge glow */}
            <div className="pointer-events-none absolute inset-[-2px] rounded-full border border-[#f5a13b]/20" />
          </motion.div>

          {/* =================================================
              FLOATING INGREDIENTS
          ================================================= */}

          {ingredients.map((ingredient, index) => (
            <motion.div
              key={index}
              className="absolute left-1/2 top-1/2 text-[19px] drop-shadow-[0_5px_8px_rgba(0,0,0,0.45)]"
              initial={{
                opacity: 0,
                x: 0,
                y: 0,
                scale: 0.3,
                rotate: -30,
              }}
              animate={{
                opacity: [0, 1, 0.7],
                x: ingredient.x,
                y: ingredient.y,
                scale: [0.3, 1, 0.85],
                rotate: [0, 20, -12],
              }}
              transition={{
                duration: ingredient.duration,
                delay: ingredient.delay,
                repeat: Infinity,
                repeatDelay: 0.5,
                ease: "easeOut",
              }}
            >
              {ingredient.emoji}
            </motion.div>
          ))}
        </div>

        {/* ===================================================
            STEAM
        =================================================== */}

        <div className="pointer-events-none absolute left-1/2 top-[25%] h-[130px] w-[120px] -translate-x-1/2">
          {[0, 1, 2].map((item) => (
            <motion.span
              key={item}
              className="absolute bottom-0 left-1/2 h-[70px] w-[20px] -translate-x-1/2 rounded-full bg-white/[0.09] blur-[8px]"
              style={{
                marginLeft: (item - 1) * 22,
              }}
              animate={{
                y: [15, -35, -65],
                x: [
                  0,
                  item === 0 ? -12 : item === 2 ? 12 : 0,
                ],
                opacity: [0, 0.35, 0],
                scale: [0.7, 1, 1.3],
              }}
              transition={{
                duration: 2.5,
                delay: item * 0.4 + 0.8,
                repeat: Infinity,
                ease: "easeOut",
              }}
            />
          ))}
        </div>

        {/* ===================================================
            BRAND
        =================================================== */}

        <div className="absolute left-0 right-0 top-[59%] text-center">

          <motion.p
            initial={{
              opacity: 0,
              y: 18,
              letterSpacing: "0.7em",
            }}
            animate={{
              opacity: 1,
              y: 0,
              letterSpacing: "0.32em",
            }}
            transition={{
              duration: 0.8,
              delay: 1.05,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="text-[8px] font-bold uppercase text-[#ff806f]"
          >
            Welcome to
          </motion.p>

          <motion.h1
            initial={{
              opacity: 0,
              y: 25,
              scale: 0.94,
              filter: "blur(7px)",
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              filter: "blur(0px)",
            }}
            transition={{
              duration: 0.9,
              delay: 1.2,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mt-2 text-[35px] font-extrabold tracking-[-0.055em] text-white"
          >
            Crust
            <span className="text-[#ef3e32]">
              &
            </span>
            Co.
          </motion.h1>

          <motion.div
            initial={{
              width: 0,
              opacity: 0,
            }}
            animate={{
              width: 48,
              opacity: 1,
            }}
            transition={{
              duration: 0.6,
              delay: 1.65,
            }}
            className="mx-auto mt-3 h-[2px] rounded-full bg-[#ef3e32]"
          />

          <motion.p
            initial={{
              opacity: 0,
              y: 8,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.6,
              delay: 1.8,
            }}
            className="mt-3 text-[9px] font-medium tracking-[0.16em] text-white/40"
          >
            PIZZA · GOOD FOOD · HAPPY PEOPLE
          </motion.p>
        </div>

        {/* ===================================================
            BOTTOM LOADER
        =================================================== */}

        <div className="absolute bottom-[7%] left-6 right-6">

          <motion.div
            initial={{
              opacity: 0,
              y: 12,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.5,
              delay: 1.9,
            }}
            className="flex items-center justify-between"
          >
            <div className="flex items-center gap-1.5">
              <motion.span
                animate={{
                  scale: [1, 1.35, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 1.1,
                  repeat: Infinity,
                }}
                className="h-1.5 w-1.5 rounded-full bg-[#ef3e32]"
              />

              <span className="text-[8px] font-bold uppercase tracking-[0.18em] text-white/35">
                Baking your experience
              </span>
            </div>

            <motion.span
              animate={{
                x: [0, 3, 0],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
              }}
              className="text-[#ef3e32]"
            >
              <FiChevronRight size={12} />
            </motion.span>
          </motion.div>

          <div className="mt-3 h-[3px] overflow-hidden rounded-full bg-white/[0.08]">
            <motion.div
              initial={{
                width: "0%",
              }}
              animate={{
                width: "100%",
              }}
              transition={{
                duration: 2.7,
                delay: 0.15,
                ease: [0.65, 0, 0.35, 1],
              }}
              className="relative h-full rounded-full bg-gradient-to-r from-[#ef3e32] via-[#ff704f] to-[#f6a23a]"
            >
              <motion.div
                animate={{
                  x: ["-30%", "120%"],
                }}
                transition={{
                  duration: 1.1,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute inset-y-0 w-16 bg-white/35 blur-sm"
              />
            </motion.div>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <motion.p
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              transition={{
                delay: 2,
              }}
              className="text-[7px] font-bold uppercase tracking-[0.2em] text-white/20"
            >
              Freshly baked
            </motion.p>

            <motion.p
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              transition={{
                delay: 2.15,
              }}
              className="flex items-center gap-1 text-[7px] font-bold uppercase tracking-[0.2em] text-white/20"
            >
              Made with
              <FiHeart
                size={8}
                className="fill-current text-[#ef3e32]"
              />
            </motion.p>
          </div>
        </div>
      </div>

      {/* =====================================================
          CORNER DECORATION
      ===================================================== */}

      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          delay: 1.6,
        }}
        className="absolute left-5 top-1/2 h-12 w-px bg-gradient-to-b from-transparent via-[#ef3e32]/30 to-transparent"
      />

      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          delay: 1.8,
        }}
        className="absolute right-5 top-1/2 h-12 w-px bg-gradient-to-b from-transparent via-[#ef3e32]/30 to-transparent"
      />
    </motion.div>
  );
}
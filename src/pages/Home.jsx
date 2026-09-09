import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  FiCheck,
  FiChevronRight,
  FiClock,
  FiFilter,
  FiMapPin,
  FiSearch,
  FiSliders,
  FiStar,
  FiX,
} from "react-icons/fi";

import Header from "../components/Header";
import HeroBanner from "../components/HeroBanner";
import CategorySlider from "../components/CategorySlider";
import PizzaCard from "../components/PizzaCard";
import DealCard from "../components/DealCard";
import BottomNavigation from "../components/BottomNavigation";

import { pizzas, deals } from "../data/pizzas";

export default function Home({ navigate, onProduct }) {
  const [activeCategory, setActiveCategory] = useState("pizzas");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState("popular");
  const [ratingFilter, setRatingFilter] = useState(0);

  /* =========================================================
     CATEGORY TITLES
  ========================================================= */

  const categoryNames = {
    pizzas: "Popular pizzas",
    sides: "Perfect sides",
    drinks: "Cool & refreshing",
    desserts: "Sweet endings",
    spicy: "Turn up the heat",
    combos: "Best value combos",
  };

  /* =========================================================
     FILTER + SEARCH
  ========================================================= */

  const filteredPizzas = useMemo(() => {
    let result = pizzas.filter((pizza) => {
      const categoryMatch =
        activeCategory === "pizzas" ||
        pizza.category === activeCategory;

      const query = searchTerm.trim().toLowerCase();

      const searchMatch =
        !query ||
        pizza.name?.toLowerCase().includes(query) ||
        pizza.description?.toLowerCase().includes(query) ||
        pizza.toppings?.some((item) =>
          item.toLowerCase().includes(query)
        );

      const ratingMatch =
        Number(pizza.rating || 0) >= ratingFilter;

      return categoryMatch && searchMatch && ratingMatch;
    });

    if (sortBy === "rating") {
      result.sort(
        (a, b) =>
          Number(b.rating || 0) -
          Number(a.rating || 0)
      );
    }

    if (sortBy === "price-low") {
      result.sort(
        (a, b) =>
          Number(a.price || 0) -
          Number(b.price || 0)
      );
    }

    if (sortBy === "price-high") {
      result.sort(
        (a, b) =>
          Number(b.price || 0) -
          Number(a.price || 0)
      );
    }

    return result;
  }, [
    activeCategory,
    searchTerm,
    ratingFilter,
    sortBy,
  ]);

  /* =========================================================
     BEST SELLERS
  ========================================================= */

  const bestSellers = useMemo(() => {
    return [...pizzas]
      .filter(
        (pizza) =>
          pizza.category === "pizzas"
      )
      .sort(
        (a, b) =>
          Number(b.rating || 0) -
          Number(a.rating || 0)
      )
      .slice(0, 4);
  }, []);

  /* =========================================================
     FILTER ACTIONS
  ========================================================= */

  const resetFilters = () => {
    setSortBy("popular");
    setRatingFilter(0);
  };

  /* =========================================================
     SCROLL HELPERS
  ========================================================= */

  const scrollToMenu = () => {
    requestAnimationFrame(() => {
      const menu = document.getElementById(
        "pizza-menu"
      );

      if (!menu) return;

      menu.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  };

  const handleCategoryChange = (category) => {
    setActiveCategory(category);

    setTimeout(() => {
      const menu = document.getElementById(
        "pizza-menu"
      );

      if (!menu) return;

      menu.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 60);
  };

  const handleViewAll = () => {
    setActiveCategory("pizzas");

    setTimeout(() => {
      const menu = document.getElementById(
        "pizza-menu"
      );

      if (!menu) return;

      menu.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 60);
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#fff9f0] pb-28">

      {/* =====================================================
          FIXED HEADER
      ===================================================== */}

      <Header navigate={navigate} />

      <main className="w-full">

        {/* ===================================================
            DELIVERY LOCATION
        =================================================== */}

        <section className="px-4 pt-2">
          <button
            type="button"
            onClick={() =>
              alert(
                "Location selection will be available during checkout."
              )
            }
            className="flex w-full items-center gap-3 rounded-[18px] border border-[#eadfd3] bg-white p-3 shadow-sm transition active:scale-[0.99]"
          >
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[#fff0e8] text-[#ef3e32]">
              <FiMapPin size={18} />
            </div>

            <div className="min-w-0 flex-1 text-left">
              <div className="flex items-center gap-2">
                <p className="text-[9px] font-extrabold uppercase tracking-[0.12em] text-[#ef3e32]">
                  Delivering to
                </p>

                <span className="rounded-full bg-[#eaf8ef] px-2 py-0.5 text-[7px] font-bold text-[#31905b]">
                  AVAILABLE
                </span>
              </div>

              <p className="mt-1 truncate text-[12px] font-extrabold text-[#29231f]">
                Home · Your delivery location
              </p>
            </div>

            <FiChevronRight
              size={16}
              className="flex-shrink-0 text-[#aaa098]"
            />
          </button>
        </section>

        {/* ===================================================
            HERO
        =================================================== */}

        <section className="px-4 pt-4">
          <HeroBanner navigate={navigate} />
        </section>

        {/* ===================================================
            QUICK BENEFITS
        =================================================== */}

        <section className="mt-4 px-4">
          <div className="grid grid-cols-3 gap-2">

            <motion.div
              whileTap={{ scale: 0.97 }}
              className="rounded-[16px] border border-[#eadfd3] bg-white p-3"
            >
              <FiClock
                size={16}
                className="text-[#ef3e32]"
              />

              <p className="mt-2 text-[10px] font-extrabold text-[#29231f]">
                25–30 min
              </p>

              <p className="mt-0.5 text-[8px] text-[#9a8e85]">
                Fast delivery
              </p>
            </motion.div>

            <motion.div
              whileTap={{ scale: 0.97 }}
              className="rounded-[16px] border border-[#eadfd3] bg-white p-3"
            >
              <FiStar
                size={16}
                className="fill-current text-[#ef3e32]"
              />

              <p className="mt-2 text-[10px] font-extrabold text-[#29231f]">
                4.9 rating
              </p>

              <p className="mt-0.5 text-[8px] text-[#9a8e85]">
                Loved by foodies
              </p>
            </motion.div>

            <motion.div
              whileTap={{ scale: 0.97 }}
              className="rounded-[16px] border border-[#eadfd3] bg-white p-3"
            >
              <FiCheck
                size={16}
                className="text-[#ef3e32]"
              />

              <p className="mt-2 text-[10px] font-extrabold text-[#29231f]">
                Fresh daily
              </p>

              <p className="mt-0.5 text-[8px] text-[#9a8e85]">
                Made to order
              </p>
            </motion.div>

          </div>
        </section>

        {/* ===================================================
            SEARCH
        =================================================== */}

        <section className="mt-6 px-4">
          <div className="flex items-center gap-2">

            <div className="flex h-[55px] min-w-0 flex-1 items-center gap-3 rounded-[18px] border border-[#eadfd3] bg-white px-4 shadow-sm transition focus-within:border-[#ef3e32] focus-within:ring-4 focus-within:ring-[#ef3e32]/10">

              <FiSearch
                size={19}
                className="flex-shrink-0 text-[#8d8179]"
              />

              <input
                type="search"
                value={searchTerm}
                onChange={(e) =>
                  setSearchTerm(e.target.value)
                }
                placeholder="Search pizza, sides, drinks..."
                className="w-full min-w-0 bg-transparent text-[13px] font-medium text-[#29231f] outline-none placeholder:text-[#aaa098]"
              />

              {searchTerm && (
                <button
                  type="button"
                  onClick={() =>
                    setSearchTerm("")
                  }
                  className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[#f2ebe4]"
                >
                  <FiX size={12} />
                </button>
              )}
            </div>

            <button
              type="button"
              onClick={() =>
                setFilterOpen(true)
              }
              className={`relative flex h-[55px] w-[52px] flex-shrink-0 items-center justify-center rounded-[18px] border bg-white shadow-sm transition active:scale-90 ${
                sortBy !== "popular" ||
                ratingFilter > 0
                  ? "border-[#ef3e32] text-[#ef3e32]"
                  : "border-[#eadfd3] text-[#ef3e32]"
              }`}
            >
              <FiSliders size={19} />

              {(sortBy !== "popular" ||
                ratingFilter > 0) && (
                <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-[#ef3e32]" />
              )}
            </button>

          </div>
        </section>

        {/* ===================================================
            CATEGORIES
        =================================================== */}

        <section className="mt-7">

          <div className="mb-4 flex items-end justify-between px-4">

            <div>
              <p className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-[#ef3e32]">
                Explore
              </p>

              <h2 className="mt-1 text-[20px] font-extrabold tracking-[-0.02em] text-[#29231f]">
                What are you craving?
              </h2>
            </div>

            <button
              type="button"
              onClick={handleViewAll}
              className="text-[10px] font-bold text-[#ef3e32]"
            >
              View all
            </button>

          </div>

          <CategorySlider
            activeCategory={activeCategory}
            setActiveCategory={
              handleCategoryChange
            }
          />

        </section>

        {/* ===================================================
            BEST SELLERS
        =================================================== */}

        <section className="mt-8">

          <div className="mb-4 flex items-end justify-between px-4">

            <div>
              <p className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-[#ef3e32]">
                Customer favourites
              </p>

              <h2 className="mt-1 text-[19px] font-extrabold text-[#29231f]">
                Best sellers
              </h2>
            </div>

            <button
              type="button"
              onClick={scrollToMenu}
              className="flex items-center gap-1 text-[10px] font-bold text-[#ef3e32]"
            >
              See all
              <FiChevronRight size={13} />
            </button>

          </div>

          <div className="hide-scrollbar flex gap-3 overflow-x-auto px-4 pb-2">

            {bestSellers.map((pizza) => (
              <motion.div
                key={pizza.id}
                initial={{
                  opacity: 0,
                  x: 20,
                }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                }}
                viewport={{
                  once: true,
                  amount: 0.2,
                }}
                transition={{
                  duration: 0.4,
                }}
                className="w-[205px] flex-shrink-0"
              >
                <PizzaCard
                  pizza={pizza}
                  onProduct={onProduct}
                />
              </motion.div>
            ))}

          </div>
        </section>

        {/* ===================================================
            MAIN MENU
        =================================================== */}

        <section
          id="pizza-menu"
          className="mt-7 scroll-mt-[88px] px-4"
        >

          <div className="mb-4 flex items-end justify-between">

            <div className="min-w-0">

              <p className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-[#ef3e32]">
                Fresh from the oven
              </p>

              <h2 className="mt-1 text-[19px] font-extrabold text-[#29231f]">
                {categoryNames[
                  activeCategory
                ]}
              </h2>

              <p className="mt-1 text-[10px] text-[#958980]">
                {filteredPizzas.length}{" "}
                items available
              </p>

            </div>

            <button
              type="button"
              onClick={() =>
                setFilterOpen(true)
              }
              className="flex flex-shrink-0 items-center gap-1 rounded-full border border-[#eadfd3] bg-white px-3 py-2 text-[10px] font-bold text-[#5d5149]"
            >
              <FiFilter size={12} />
              Filter
            </button>

          </div>

          {/* =================================================
              EMPTY STATE
          ================================================= */}

          {filteredPizzas.length === 0 ? (
            <motion.div
              initial={{
                opacity: 0,
                y: 15,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              className="rounded-[24px] border border-[#eadfd3] bg-white p-8 text-center"
            >

              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#fff0eb] text-2xl">
                🍕
              </div>

              <h3 className="mt-4 text-base font-extrabold text-[#29231f]">
                Nothing found
              </h3>

              <p className="mt-2 text-xs text-[#958980]">
                Try another search or filter.
              </p>

              <button
                type="button"
                onClick={() => {
                  setSearchTerm("");
                  setActiveCategory(
                    "pizzas"
                  );
                  resetFilters();

                  setTimeout(() => {
                    document
                      .getElementById(
                        "pizza-menu"
                      )
                      ?.scrollIntoView({
                        behavior:
                          "smooth",
                        block: "start",
                      });
                  }, 60);
                }}
                className="mt-5 rounded-full bg-[#ef3e32] px-5 py-2.5 text-xs font-bold text-white"
              >
                Reset menu
              </button>

            </motion.div>
          ) : (

            <div className="grid grid-cols-2 gap-3">

              {filteredPizzas.map(
                (pizza, index) => (
                  <motion.div
                    key={pizza.id}
                    initial={{
                      opacity: 0,
                      y: 16,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      delay:
                        index * 0.035,
                      duration: 0.35,
                      ease: [
                        0.22,
                        1,
                        0.36,
                        1,
                      ],
                    }}
                    className="min-w-0"
                  >
                    <PizzaCard
                      pizza={pizza}
                      onProduct={
                        onProduct
                      }
                    />
                  </motion.div>
                )
              )}

            </div>

          )}

        </section>

        {/* ===================================================
            DEALS
        =================================================== */}

        <section className="mt-9">

          <div className="mb-4 flex items-end justify-between px-4">

            <div>
              <p className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-[#ef3e32]">
                Save more
              </p>

              <h2 className="mt-1 text-[19px] font-extrabold text-[#29231f]">
                Today's offers
              </h2>
            </div>

            <span className="rounded-full bg-[#fff0eb] px-3 py-1.5 text-[9px] font-bold text-[#ef3e32]">
              Limited time
            </span>

          </div>

          <div className="hide-scrollbar flex gap-3 overflow-x-auto px-4 pb-2">

            {deals.map((deal) => (
              <motion.div
                key={deal.id}
                initial={{
                  opacity: 0,
                  x: 20,
                }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                }}
                viewport={{
                  once: true,
                  amount: 0.2,
                }}
                transition={{
                  duration: 0.4,
                }}
                className="w-[285px] flex-shrink-0"
              >
                <DealCard
                  deal={deal}
                  navigate={navigate}
                />
              </motion.div>
            ))}

          </div>

        </section>

        {/* ===================================================
            CRUST STANDARD
        =================================================== */}

        <section className="mt-9 px-4">

          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.2,
            }}
            transition={{
              duration: 0.5,
            }}
            className="overflow-hidden rounded-[28px] bg-[#29231f] p-5 text-white"
          >

            <p className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-[#ff7162]">
              The Crust standard
            </p>

            <h2 className="mt-2 max-w-[280px] text-[21px] font-extrabold leading-tight">
              Simple ingredients.
              <br />
              Serious pizza.
            </h2>

            <p className="mt-2 max-w-[300px] text-[10px] leading-5 text-white/55">
              Every order is prepared fresh,
              packed carefully and sent out
              hot.
            </p>

            <div className="mt-5 grid grid-cols-3 gap-2">

              <div className="rounded-[17px] bg-white/10 p-3">
                <div className="text-xl">
                  🍅
                </div>

                <p className="mt-2 text-[9px] font-extrabold">
                  Fresh
                </p>

                <p className="mt-1 text-[8px] leading-4 text-white/45">
                  Quality ingredients
                </p>
              </div>

              <div className="rounded-[17px] bg-white/10 p-3">
                <div className="text-xl">
                  🔥
                </div>

                <p className="mt-2 text-[9px] font-extrabold">
                  Hot
                </p>

                <p className="mt-1 text-[8px] leading-4 text-white/45">
                  Baked to order
                </p>
              </div>

              <div className="rounded-[17px] bg-white/10 p-3">
                <div className="text-xl">
                  ❤️
                </div>

                <p className="mt-2 text-[9px] font-extrabold">
                  Loved
                </p>

                <p className="mt-1 text-[8px] leading-4 text-white/45">
                  Made with care
                </p>
              </div>

            </div>

          </motion.div>

        </section>

        {/* ===================================================
            REWARDS
        =================================================== */}

        <section className="mt-6 px-4">

          <motion.div
            initial={{
              opacity: 0,
              y: 15,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.2,
            }}
            transition={{
              duration: 0.45,
            }}
            className="flex items-center gap-4 rounded-[23px] border border-[#eadfd3] bg-white p-4"
          >

            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-[16px] bg-[#ef3e32] text-xl text-white">
              🍕
            </div>

            <div className="min-w-0 flex-1">

              <p className="text-[12px] font-extrabold text-[#29231f]">
                Crust & Co. Rewards
              </p>

              <p className="mt-1 text-[9px] leading-4 text-[#958980]">
                Order more, unlock better
                deals and save your
                favourites.
              </p>

            </div>

            <button
              type="button"
              onClick={() =>
                navigate("profile")
              }
              className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-[#fff0eb] text-[#ef3e32] transition active:scale-90"
            >
              <FiChevronRight
                size={16}
              />
            </button>

          </motion.div>

        </section>

      </main>

      {/* =====================================================
          BOTTOM NAVIGATION
      ===================================================== */}

      <BottomNavigation
        active="home"
        navigate={navigate}
      />

      {/* =====================================================
          FILTER SHEET
      ===================================================== */}

      <AnimatePresence>
        {filterOpen && (
          <>
            {/* BACKDROP */}

            <motion.button
              type="button"
              aria-label="Close filters"
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
              }}
              onClick={() =>
                setFilterOpen(false)
              }
              className="fixed inset-0 z-[90] cursor-default bg-black/45"
            />

            {/* FILTER PANEL */}

            <motion.div
              initial={{
                y: "100%",
              }}
              animate={{
                y: 0,
              }}
              exit={{
                y: "100%",
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
              }}
              className="fixed bottom-0 left-1/2 z-[100] w-full max-w-[430px] -translate-x-1/2 rounded-t-[30px] bg-[#fff9f0] p-5 shadow-2xl"
            >

              {/* HANDLE */}

              <div className="mx-auto h-1.5 w-12 rounded-full bg-[#d8cec5]" />

              {/* HEADER */}

              <div className="mt-5 flex items-center justify-between">

                <div>
                  <p className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-[#ef3e32]">
                    Refine
                  </p>

                  <h2 className="mt-1 text-[20px] font-extrabold text-[#29231f]">
                    Filter & sort
                  </h2>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setFilterOpen(false)
                  }
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm transition active:scale-90"
                >
                  <FiX size={18} />
                </button>

              </div>

              {/* SORT */}

              <div className="mt-6">

                <p className="mb-3 text-xs font-extrabold text-[#29231f]">
                  Sort by
                </p>

                <div className="grid grid-cols-2 gap-2">

                  {[
                    [
                      "popular",
                      "Most popular",
                    ],
                    [
                      "rating",
                      "Top rated",
                    ],
                    [
                      "price-low",
                      "Price: low to high",
                    ],
                    [
                      "price-high",
                      "Price: high to low",
                    ],
                  ].map(
                    ([value, label]) => (
                      <button
                        type="button"
                        key={value}
                        onClick={() =>
                          setSortBy(
                            value
                          )
                        }
                        className={`flex items-center justify-between rounded-[15px] border px-3.5 py-3 text-left text-[10px] font-bold transition ${
                          sortBy === value
                            ? "border-[#ef3e32] bg-[#fff0eb] text-[#ef3e32]"
                            : "border-[#eadfd3] bg-white text-[#5d5149]"
                        }`}
                      >
                        {label}

                        {sortBy ===
                          value && (
                          <FiCheck
                            size={14}
                          />
                        )}
                      </button>
                    )
                  )}

                </div>

              </div>

              {/* RATING */}

              <div className="mt-6">

                <p className="mb-3 text-xs font-extrabold text-[#29231f]">
                  Minimum rating
                </p>

                <div className="flex gap-2">

                  {[0, 4, 4.5, 4.7].map(
                    (rating) => (
                      <button
                        type="button"
                        key={rating}
                        onClick={() =>
                          setRatingFilter(
                            rating
                          )
                        }
                        className={`flex flex-1 items-center justify-center gap-1 rounded-[14px] border py-3 text-[10px] font-bold transition ${
                          ratingFilter ===
                          rating
                            ? "border-[#ef3e32] bg-[#fff0eb] text-[#ef3e32]"
                            : "border-[#eadfd3] bg-white text-[#5d5149]"
                        }`}
                      >
                        {rating === 0 ? (
                          "Any"
                        ) : (
                          <>
                            <FiStar
                              size={11}
                              className="fill-current"
                            />
                            {rating}+
                          </>
                        )}
                      </button>
                    )
                  )}

                </div>

              </div>

              {/* BUTTONS */}

              <div className="mt-7 flex gap-3">

                <button
                  type="button"
                  onClick={
                    resetFilters
                  }
                  className="flex-1 rounded-[17px] border border-[#eadfd3] bg-white py-3.5 text-xs font-extrabold text-[#29231f] transition active:scale-[0.98]"
                >
                  Reset
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setFilterOpen(
                      false
                    )
                  }
                  className="flex-[1.5] rounded-[17px] bg-[#ef3e32] py-3.5 text-xs font-extrabold text-white shadow-lg shadow-red-200 transition active:scale-[0.98]"
                >
                  Show{" "}
                  {filteredPizzas.length}{" "}
                  items
                </button>

              </div>

              <div className="h-2" />

            </motion.div>
          </>
        )}
      </AnimatePresence>

    </div>
  );
}

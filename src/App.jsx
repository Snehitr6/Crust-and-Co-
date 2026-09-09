import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

import SplashScreen from "./components/SplashScreen";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";
import Favorites from "./pages/Favorites";
import Profile from "./pages/Profile";

import { CartProvider } from "./context/CartContext";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState("home");
  const [selectedPizza, setSelectedPizza] = useState(null);
  const [previousPage, setPreviousPage] = useState("home");

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1800);

    return () => clearTimeout(timer);
  }, []);

  const navigate = (nextPage) => {
    setPreviousPage(page);
    setPage(nextPage);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const openProduct = (pizza) => {
    setSelectedPizza(pizza);
    setPreviousPage(page);
    setPage("product");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const goBack = () => {
    let destination = previousPage;

    if (
      destination === "product" ||
      destination === "favorites" ||
      destination === "profile"
    ) {
      destination = "home";
    }

    setPage(destination);
    setPreviousPage("home");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const profileBack = () => {
    setPage("home");
    setPreviousPage("home");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const favoritesBack = () => {
    setPage("home");
    setPreviousPage("home");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <CartProvider>
      <div className="mx-auto min-h-screen max-w-[430px] overflow-x-hidden bg-[#fff8ed]">

        {/* =========================================
            SPLASH SCREEN
        ========================================= */}

        <AnimatePresence>
          {loading && <SplashScreen />}
        </AnimatePresence>

        {/* =========================================
            PAGE CONTENT

            IMPORTANT:
            No transform / y animation here.
            This allows fixed navbar elements
            to remain fixed to the viewport.
        ========================================= */}

        <AnimatePresence mode="wait">
          <motion.div
            key={page}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.22,
              ease: "easeOut",
            }}
            className="min-h-screen"
          >
            {page === "home" && (
              <Home
                navigate={navigate}
                onProduct={openProduct}
              />
            )}

            {page === "product" && selectedPizza && (
              <ProductDetails
                pizza={selectedPizza}
                goBack={goBack}
                navigate={navigate}
              />
            )}

            {page === "cart" && (
              <Cart
                goBack={goBack}
                navigate={navigate}
              />
            )}

            {page === "checkout" && (
              <Checkout
                goBack={goBack}
                navigate={navigate}
              />
            )}

            {page === "success" && (
              <OrderSuccess navigate={navigate} />
            )}

            {page === "favorites" && (
              <Favorites
                goBack={favoritesBack}
                onProduct={openProduct}
              />
            )}

            {page === "profile" && (
              <Profile
                goBack={profileBack}
                navigate={navigate}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </CartProvider>
  );
}
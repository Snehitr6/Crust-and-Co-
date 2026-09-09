import {
  FaPizzaSlice,
  FaLeaf,
  FaPepperHot,
  FaWineBottle,
  FaIceCream,
  FaUtensils,
} from "react-icons/fa";

export const categories = [
  {
    id: "pizzas",
    name: "Pizza",
    icon: FaPizzaSlice,
  },
  {
    id: "sides",
    name: "Sides",
    icon: FaUtensils,
  },
  {
    id: "drinks",
    name: "Drinks",
    icon: FaWineBottle,
  },
  {
    id: "desserts",
    name: "Desserts",
    icon: FaIceCream,
  },
  {
    id: "spicy",
    name: "Spicy",
    icon: FaPepperHot,
  },
  {
    id: "combos",
    name: "Combos",
    icon: FaLeaf,
  },
];

export const pizzas = [
  /* =========================================================
     PIZZAS
  ========================================================= */

  {
    id: 1,
    name: "Garden Harvest",
    category: "pizzas",
    price: 299,
    rating: 4.9,
    badge: "Bestseller",
    image:
      "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=900&q=85",
    description:
      "Bell peppers, onion, olives, corn & mozzarella",
    toppings: [
      "Bell Peppers",
      "Onion",
      "Black Olives",
      "Sweet Corn",
      "Mozzarella",
    ],
    sizes: [
      { name: "Regular", price: 299 },
      { name: "Medium", price: 399 },
      { name: "Large", price: 499 },
    ],
    crusts: [
      "Classic Hand Tossed",
      "Cheese Burst",
      "Thin & Crispy",
    ],
  },

  {
    id: 2,
    name: "Pepperoni Blaze",
    category: "pizzas",
    price: 349,
    rating: 4.8,
    badge: "Popular",
    image:
      "https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=900&q=85",
    description:
      "Loaded pepperoni, mozzarella & signature tomato sauce",
    toppings: [
      "Pepperoni",
      "Mozzarella",
      "Tomato Sauce",
      "Chilli Flakes",
    ],
    sizes: [
      { name: "Regular", price: 349 },
      { name: "Medium", price: 449 },
      { name: "Large", price: 549 },
    ],
    crusts: [
      "Classic Hand Tossed",
      "Cheese Burst",
      "Thin & Crispy",
    ],
  },

  {
    id: 3,
    name: "Truffle Mushroom",
    category: "pizzas",
    price: 379,
    rating: 4.7,
    badge: "Chef's Pick",
    image:
      "https://images.unsplash.com/photo-1579751626657-72bc17010498?auto=format&fit=crop&w=900&q=85",
    description:
      "Creamy mushroom, roasted garlic, herbs & mozzarella",
    toppings: [
      "Mushrooms",
      "Roasted Garlic",
      "Fresh Herbs",
      "Mozzarella",
      "Truffle Oil",
    ],
    sizes: [
      { name: "Regular", price: 379 },
      { name: "Medium", price: 479 },
      { name: "Large", price: 579 },
    ],
    crusts: [
      "Classic Hand Tossed",
      "Cheese Burst",
      "Thin & Crispy",
    ],
  },

  {
    id: 4,
    name: "Smoky BBQ Chicken",
    category: "pizzas",
    price: 399,
    rating: 4.8,
    badge: "New",
    image:
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=900&q=85",
    description:
      "Smoky BBQ chicken, onions, jalapeños & melted cheese",
    toppings: [
      "BBQ Chicken",
      "Onion",
      "Jalapeños",
      "Mozzarella",
      "BBQ Sauce",
    ],
    sizes: [
      { name: "Regular", price: 399 },
      { name: "Medium", price: 499 },
      { name: "Large", price: 599 },
    ],
    crusts: [
      "Classic Hand Tossed",
      "Cheese Burst",
      "Thin & Crispy",
    ],
  },

  {
    id: 5,
    name: "Margherita Classic",
    category: "pizzas",
    price: 249,
    rating: 4.9,
    badge: "Classic",
    image:
      "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=900&q=85",
    description:
      "Fresh tomato, basil, mozzarella & signature pizza sauce",
    toppings: [
      "Fresh Tomato",
      "Basil",
      "Mozzarella",
      "Pizza Sauce",
    ],
    sizes: [
      { name: "Regular", price: 249 },
      { name: "Medium", price: 349 },
      { name: "Large", price: 449 },
    ],
    crusts: [
      "Classic Hand Tossed",
      "Cheese Burst",
      "Thin & Crispy",
    ],
  },

  {
    id: 6,
    name: "Fiery Jalapeño",
    category: "pizzas",
    price: 329,
    rating: 4.7,
    badge: "Spicy",
    image:
      "https://images.unsplash.com/photo-1565299507177-b0ac66763828?auto=format&fit=crop&w=900&q=85",
    description:
      "Jalapeños, chilli peppers, onion & extra mozzarella",
    toppings: [
      "Jalapeños",
      "Chilli",
      "Onion",
      "Mozzarella",
      "Chilli Oil",
    ],
    sizes: [
      { name: "Regular", price: 329 },
      { name: "Medium", price: 429 },
      { name: "Large", price: 529 },
    ],
    crusts: [
      "Classic Hand Tossed",
      "Cheese Burst",
      "Thin & Crispy",
    ],
  },

  /* =========================================================
     SIDES
  ========================================================= */

  {
    id: 7,
    name: "Garlic Bread",
    category: "sides",
    price: 149,
    rating: 4.7,
    badge: "Favourite",
    image:
      "https://images.unsplash.com/photo-1573140401552-3fab0b24306f?auto=format&fit=crop&w=900&q=85",
    description:
      "Golden baked garlic bread with herbs and butter",
    toppings: [
      "Garlic Butter",
      "Italian Herbs",
      "Parmesan",
    ],
    sizes: [
      { name: "Regular", price: 149 },
      { name: "Large", price: 199 },
    ],
    crusts: ["Classic"],
  },

 {
  id: 8,
  name: "Cheesy Breadsticks",
  category: "sides",
  price: 179,
  rating: 4.8,
  badge: "Popular",
  image:
    "https://bakeitgood.com/assets/images/1752154505866-rwhw7nxh.jpg",
  description:
    "Soft baked breadsticks topped with mozzarella cheese",
  toppings: [
    "Mozzarella",
    "Garlic Butter",
    "Italian Herbs",
  ],
  sizes: [
    { name: "Regular", price: 179 },
    { name: "Large", price: 229 },
  ],
  crusts: ["Classic"],
},

  {
    id: 9,
    name: "Loaded Potato Bites",
    category: "sides",
    price: 159,
    rating: 4.6,
    image:
      "https://images.unsplash.com/photo-1518013431117-eb1465fa5752?auto=format&fit=crop&w=900&q=85",
    description:
      "Crispy potato bites served with creamy dipping sauce",
    toppings: [
      "Potato",
      "Cheese",
      "Seasoning",
      "Creamy Dip",
    ],
    sizes: [
      { name: "Regular", price: 159 },
      { name: "Large", price: 209 },
    ],
    crusts: ["Classic"],
  },

  /* =========================================================
     DRINKS
  ========================================================= */

  {
    id: 10,
    name: "Classic Cola",
    category: "drinks",
    price: 79,
    rating: 4.6,
    badge: "Chilled",
    image:
      "https://images.unsplash.com/photo-1629203851122-3726ecdf080e?auto=format&fit=crop&w=900&q=85",
    description:
      "Ice-cold classic cola, perfect with your pizza",
    toppings: [
      "Cola",
      "Ice",
    ],
    sizes: [
      { name: "Regular", price: 79 },
      { name: "Large", price: 109 },
    ],
    crusts: ["Chilled"],
  },

  {
    id: 11,
    name: "Fresh Lime Soda",
    category: "drinks",
    price: 99,
    rating: 4.8,
    badge: "Refreshing",
    image:
      "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=900&q=85",
    description:
      "Refreshing sparkling lime soda with fresh citrus",
    toppings: [
      "Fresh Lime",
      "Sparkling Water",
      "Mint",
    ],
    sizes: [
      { name: "Regular", price: 99 },
      { name: "Large", price: 129 },
    ],
    crusts: ["Chilled"],
  },

  {
    id: 12,
    name: "Peach Iced Tea",
    category: "drinks",
    price: 119,
    rating: 4.7,
    image:
      "https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=900&q=85",
    description:
      "Smooth peach iced tea served chilled with lemon",
    toppings: [
      "Peach",
      "Black Tea",
      "Lemon",
    ],
    sizes: [
      { name: "Regular", price: 119 },
      { name: "Large", price: 149 },
    ],
    crusts: ["Chilled"],
  },

  /* =========================================================
     DESSERTS
  ========================================================= */

  {
    id: 13,
    name: "Chocolate Lava Cake",
    category: "desserts",
    price: 149,
    rating: 4.9,
    badge: "Bestseller",
    image:
      "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=900&q=85",
    description:
      "Warm chocolate cake with a rich molten chocolate centre",
    toppings: [
      "Dark Chocolate",
      "Cocoa",
      "Chocolate Sauce",
    ],
    sizes: [
      { name: "Regular", price: 149 },
      { name: "Large", price: 199 },
    ],
    crusts: ["Classic"],
  },

  {
    id: 14,
    name: "Tiramisu Cup",
    category: "desserts",
    price: 169,
    rating: 4.8,
    badge: "Chef's Pick",
    image:
      "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=900&q=85",
    description:
      "Creamy mascarpone, espresso and cocoa layered dessert",
    toppings: [
      "Mascarpone",
      "Espresso",
      "Cocoa",
    ],
    sizes: [
      { name: "Regular", price: 169 },
      { name: "Large", price: 219 },
    ],
    crusts: ["Classic"],
  },

  {
    id: 15,
    name: "Brownie Sundae",
    category: "desserts",
    price: 189,
    rating: 4.7,
    image:
      "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=900&q=85",
    description:
      "Warm chocolate brownie topped with creamy vanilla ice cream",
    toppings: [
      "Chocolate Brownie",
      "Vanilla Ice Cream",
      "Chocolate Sauce",
    ],
    sizes: [
      { name: "Regular", price: 189 },
      { name: "Large", price: 239 },
    ],
    crusts: ["Classic"],
  },

  /* =========================================================
     SPICY
  ========================================================= */

  {
    id: 16,
    name: "Inferno Chicken",
    category: "spicy",
    price: 399,
    rating: 4.8,
    badge: "Extra Hot",
    image:
      "https://images.unsplash.com/photo-1565299507177-b0ac66763828?auto=format&fit=crop&w=900&q=85",
    description:
      "Spicy chicken, jalapeños, chilli sauce & mozzarella",
    toppings: [
      "Spicy Chicken",
      "Jalapeños",
      "Red Chilli",
      "Mozzarella",
      "Hot Sauce",
    ],
    sizes: [
      { name: "Regular", price: 399 },
      { name: "Medium", price: 499 },
      { name: "Large", price: 599 },
    ],
    crusts: [
      "Classic Hand Tossed",
      "Cheese Burst",
      "Thin & Crispy",
    ],
  },

  {
    id: 17,
    name: "Chilli Paneer Fire",
    category: "spicy",
    price: 349,
    rating: 4.7,
    badge: "Hot",
    image:
      "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=900&q=85",
    description:
      "Spicy paneer, green chilli, onion & smoky chilli sauce",
    toppings: [
      "Paneer",
      "Green Chilli",
      "Onion",
      "Mozzarella",
      "Chilli Sauce",
    ],
    sizes: [
      { name: "Regular", price: 349 },
      { name: "Medium", price: 449 },
      { name: "Large", price: 549 },
    ],
    crusts: [
      "Classic Hand Tossed",
      "Cheese Burst",
      "Thin & Crispy",
    ],
  },

  {
    id: 18,
    name: "Red Hot Pepperoni",
    category: "spicy",
    price: 379,
    rating: 4.8,
    badge: "Spicy",
    image:
      "https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=900&q=85",
    description:
      "Pepperoni, jalapeños, chilli flakes & spicy tomato sauce",
    toppings: [
      "Pepperoni",
      "Jalapeños",
      "Chilli Flakes",
      "Mozzarella",
      "Spicy Sauce",
    ],
    sizes: [
      { name: "Regular", price: 379 },
      { name: "Medium", price: 479 },
      { name: "Large", price: 579 },
    ],
    crusts: [
      "Classic Hand Tossed",
      "Cheese Burst",
      "Thin & Crispy",
    ],
  },

  /* =========================================================
     COMBOS
  ========================================================= */

  {
    id: 19,
    name: "Solo Pizza Combo",
    category: "combos",
    price: 399,
    rating: 4.9,
    badge: "Best Value",
    image:
      "https://images.unsplash.com/photo-1579751626657-72bc17010498?auto=format&fit=crop&w=900&q=85",
    description:
      "Regular pizza with garlic bread and a chilled drink",
    toppings: [
      "1 Regular Pizza",
      "Garlic Bread",
      "Soft Drink",
    ],
    sizes: [
      { name: "Regular", price: 399 },
    ],
    crusts: ["Classic Hand Tossed"],
  },

  {
    id: 20,
    name: "Movie Night Combo",
    category: "combos",
    price: 699,
    rating: 4.9,
    badge: "Popular",
    image:
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=900&q=85",
    description:
      "Two medium pizzas, cheesy breadsticks and two drinks",
    toppings: [
      "2 Medium Pizzas",
      "Cheesy Breadsticks",
      "2 Drinks",
    ],
    sizes: [
      { name: "Regular", price: 699 },
    ],
    crusts: ["Classic Hand Tossed"],
  },

  {
    id: 21,
    name: "Family Feast",
    category: "combos",
    price: 999,
    rating: 4.9,
    badge: "Family Pick",
    image:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=900&q=85",
    description:
      "Three large pizzas, sides, drinks and a dessert",
    toppings: [
      "3 Large Pizzas",
      "Garlic Bread",
      "4 Drinks",
      "Dessert",
    ],
    sizes: [
      { name: "Regular", price: 999 },
    ],
    crusts: ["Classic Hand Tossed"],
  },
];

/* =========================================================
   DEALS
========================================================= */

export const deals = [
  {
    id: 1,
    title: "BOGO Madness",
    description:
      "Buy one regular pizza and get another absolutely free.",
    discount: "Buy 1 Get 1",
    coupon: "BOGO",
    image:
      "https://images.unsplash.com/photo-1579751626657-72bc17010498?auto=format&fit=crop&w=900&q=85",
  },

  {
    id: 2,
    title: "Weekend Feast",
    description:
      "Save big on our family-sized pizza and sides combo.",
    discount: "₹200 OFF",
    coupon: "WELCOME100",
    image:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=900&q=85",
  },

  {
    id: 3,
    title: "Family Night",
    description:
      "Get your whole family together with our value-packed feast.",
    discount: "20% OFF",
    coupon: "CRUST20",
    image:
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=900&q=85",
  },
];
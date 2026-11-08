const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, ".env") });
if (!process.env.MONGO_URI) {
  require("dotenv").config({ path: path.resolve(process.cwd(), ".env") });
}
const MenuItem = require("./models/MenuItem");

const items = [
  {
    name: "Espresso",
    category: "Coffee",
    price: 350,
    description: "Rich and bold single-origin double shot extracted at 9 bars.",
    image: "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Cappuccino",
    category: "Coffee",
    price: 450,
    description: "Espresso balanced with velvety steamed milk and dense micro-foam.",
    image: "https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Caramel Latte",
    category: "Coffee",
    price: 550,
    description: "Smooth double-ristretto with silky steamed milk and house-made caramel drizzle.",
    image: "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Iced Americano",
    category: "Coffee",
    price: 400,
    description: "Chilled espresso poured over crystal clear ice with cold mountain water.",
    image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Doodh Patti",
    category: "Chai",
    price: 200,
    description: "Classic creamy milk tea slow-simmered in buffalo milk with cardamom and ginger.",
    image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Kadak Chai",
    category: "Chai",
    price: 180,
    description: "Strong, dark, and full-bodied Assam CTC brew poured from height for natural froth.",
    image: "https://images.unsplash.com/photo-1561336313-0bd5e0b27ec8?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Kashmiri Chai",
    category: "Chai",
    price: 350,
    description: "Slow-aerated pink tea churned with whole milk, sea salt, and crushed pistachios.",
    image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Masala Chai",
    category: "Chai",
    price: 250,
    description: "Aromatic Assam tea simmered with cracked cinnamon, clove, ginger, and green cardamom.",
    image: "https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Mint Mojito",
    category: "Cold Drinks",
    price: 380,
    description: "Fresh crushed garden mint, zesty key lime, pure cane sugar, and chilled soda.",
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Cold Coffee",
    category: "Cold Drinks",
    price: 480,
    description: "16-hour slow-drip espresso blended with vanilla bean ice cream and dark cocoa.",
    image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Chicken Sandwich",
    category: "Snacks",
    price: 500,
    description: "Herb-grilled chicken breast with garlic aioli and crisp lettuce on artisan sourdough.",
    image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Samosa Plate",
    category: "Snacks",
    price: 250,
    description: "Crispy golden pastries stuffed with spiced potatoes and peas, served with sweet tamarind dip.",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80",
  },
];

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGO_URI, { serverSelectionTimeoutMS: 8000 });
    console.log("Connected to MongoDB for seeding...");
    await MenuItem.deleteMany({});
    await MenuItem.insertMany(items);
    console.log(`Successfully seeded ${items.length} menu items with photos.`);
    process.exit(0);
  } catch (err) {
    console.error("Seed error:", err.message);
    process.exit(1);
  }
}

seedDatabase();

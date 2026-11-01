const mongoose = require("mongoose");
require("dotenv").config();
const MenuItem = require("./models/MenuItem");

const items = [
  { name: "Espresso", category: "Coffee", price: 350, description: "Rich and bold single shot" },
  { name: "Cappuccino", category: "Coffee", price: 450, description: "Espresso with silky steamed milk foam" },
  { name: "Caramel Latte", category: "Coffee", price: 550, description: "Smooth latte with caramel drizzle" },
  { name: "Iced Americano", category: "Coffee", price: 400, description: "Chilled espresso over ice" },
  { name: "Doodh Patti", category: "Chai", price: 200, description: "Classic creamy milk tea" },
  { name: "Kadak Chai", category: "Chai", price: 180, description: "Strong, dark and full of flavour" },
  { name: "Kashmiri Chai", category: "Chai", price: 350, description: "Pink tea with nuts and cream" },
  { name: "Masala Chai", category: "Chai", price: 250, description: "Spiced tea with cardamom and ginger" },
  { name: "Mint Mojito", category: "Cold Drinks", price: 380, description: "Fresh mint, lime and soda" },
  { name: "Cold Coffee", category: "Cold Drinks", price: 480, description: "Blended coffee with ice cream" },
  { name: "Chicken Sandwich", category: "Snacks", price: 500, description: "Grilled chicken with creamy sauce" },
  { name: "Samosa Plate", category: "Snacks", price: 250, description: "Crispy samosas with chutney" },
];

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    await MenuItem.deleteMany();
    await MenuItem.insertMany(items);
    console.log("Menu seeded");
    process.exit();
  })
  .catch((err) => {
    console.log("Seed error:", err.message);
    process.exit(1);
  });
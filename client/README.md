# ChaiBean · Full Stack Luxury Cafe & Roastery

A full-stack artisanal cafe web application built with React 19, Vite, Tailwind CSS, Express, Node.js, and MongoDB.

---

## What Was Built in This Phase

### 1. Dedicated Booking Page Redesign (`Booking.jsx`)
- **Pinterest Editorial Backdrop**: Implemented the exact Pinterest reference image (`/booking-bg.jpg`) with a luxury dark espresso and warm gold gradient overlay that naturally blends into the cafe canvas.
- **Editorial Typography**: Features the hero quote: *"Start With Coffee, Stay For The Conversation — Because the best moments are brewed slowly."*
- **Zero Icon or Logo Overlap**: Applied `.field-icon-input` ensuring 52px of left clearance so icons never touch or overlap typed input or placeholders.
- **Custom Coffee-Shop Time Picker (`TimePicker.jsx`)**: Replaced the default OS blue-and-white clock interface with an artisan time selector featuring curated slots (*Morning, Afternoon, Evening, Night*) and custom time inputs in warm gold and espresso.
- **Interactive Party Size Touch Chips**: Fast tactile buttons for 1, 2, 3, 4, 5, 6, 8, 10+ guests with glowing gold borders.
- **Boarding Pass Confirmation**: Renders a luxury digital reservation ticket upon booking with instant confirmation codes.

---

### 2. Homepage Hero Section Upgrades (`Home.jsx`)
- **Cohesive Square Product Showcase**: Restructured the central product stage to share the exact same square/rounded-square geometry (`rounded-[2.5rem]`, `aspect-square`) as the 4 thumbnail selector cards.
- **Direct Hover Overlay**: Hovering directly over the product reveals drink category, title, price, and an attractive "Order This Brew" button.
- **10 Floating Coffee Beans in Background**: Expanded to 10 beans animated at multiple speeds (`animate-float-gentle`, `animate-float-slow`, `animate-float-reverse`), strictly confined to the background layer (`z-0 pointer-events-none`) along the outer peripheral margins. Never overlaps headings, text, buttons, or price tags (`relative z-20`).

---

### 3. "Two Crafts · One Hearth" Duel of Crafts
- Elevated Section 4 into an authentic brewing exhibition contrasting:
  - **The Kadak Chai Ritual**: 100°C brass kettle simmer, kiln-fired clay kulhad, upper Assam biodynamic leaves, wild saffron & cardamom.
  - **The Science of Slow Roasting**: 9.0 bars calibrated pressure, 93.5°C dual-boiler PID temperature, 100% Colombian Huila beans, 36g liquid silk yield in 27s.

---

### 4. Redesigned "Loved by Devotees" (Coffeehouse Devotee Journal)
- Replaced the basic card list with an authentic guestbook journal:
  - **Spotlight Feature Patron**: Large quotation in Playfair Display serif, verified regular badge, customer portrait, and favorite brew tag.
  - **Companion Review Cards**: Verified tea aficionado and coffee connoisseur reviews with 5-star golden ratings and authentic cafe stories.

---

### 5. Non-Overlapping Table Concierge on Homepage
- Resolved all logo, badge, and input text overlapping issues above and inside the reservation form.
- Integrated the custom `TimePicker` and `.field-icon-input` for pristine input presentation.

---

### 6. Refined Opening Hours & Sanctuary Section
- Modern 3-card layout:
  - **Hours of Warmth**: Day-by-day operating table with a live pulsing green badge (*Open Now*).
  - **Neighborhood Location**: Address with valet parking note and Google Maps shortcut.
  - **Sanctuary Amenities**: 200 Mbps fiber Wi-Fi, quiet study sockets, pet patio, earthen kulhad service.

---

## Backend & MongoDB Integration

- **Server**: Express 5 on port 5000 with CORS and rate-limiting.
- **Endpoints**:
  - `GET /api/menu`: Fetches all handcrafted menu items with high-res photos.
  - `POST /api/bookings`: Validates and saves table reservations.
  - `GET /api/health`: Health status probe for database connection.
- **Seed Data**: Run `node server/seed.js` to seed 12 signature drinks and snacks with full photo URLs.

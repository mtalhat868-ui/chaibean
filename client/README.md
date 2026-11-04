
# ChaiBean

A full stack cafe website built with React, Express, Node.js and MongoDB.

## Components

### Navbar

A floating, glass style navigation bar fixed at the top of every page.

**What it uses:**

1. `useState`: opens and closes the mobile menu
2. `NavLink`: page links that highlight the active page
3. `Link`: the logo link back to the home page
4. `map()`: loops over the links array to build every link
5. `motion.header`: slide down animation when the page loads
6. `motion.div`: fade in animation for the mobile menu
7. `lucide-react` icons: Coffee, Menu, X, Sun and Moon
8. Tailwind CSS: rounded pill shape, blur background, responsive classes
9. Conditional rendering: shows the Sun or Moon icon, and the mobile menu only when open
10. Props: `dark` and `toggleDark`, passed in from Layout

**Responsive:** links are visible on desktop and move into a menu button on mobile.
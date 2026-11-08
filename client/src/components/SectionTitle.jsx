// client/src/lib/cafeInfo.js
// One place for the cafe's details. Navbar and TimePicker read from here,
// so the opening hours can never disagree between pages.
// TODO: replace the placeholders for each new client.

export const CAFE = {
  name: "ChaiBean",
  hoursLabel: "8:00 AM – 11:00 PM",
  openTime: "08:00", // first bookable time (24h)
  lastBookingTime: "22:00", // last bookable time, one hour before closing (24h)
  phoneLabel: "+92 300 0000000",
  phoneHref: "tel:+923000000000",
  address: "Your street address, Bahawalpur",
};
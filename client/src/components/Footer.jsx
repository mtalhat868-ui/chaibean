import { Coffee } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-gold/20 bg-espresso py-8 text-center text-cream/80">
      <div className="flex items-center justify-center gap-2 text-cream">
        <Coffee className="h-5 w-5 text-gold" />
        <span className="font-display text-xl font-semibold">
          Chai<span className="text-gold">Bean</span>
        </span>
      </div>
      <p className="mt-2 text-sm">Freshly roasted coffee and kadak chai.</p>
      <p className="mt-4 text-xs text-cream/50">
        © {new Date().getFullYear()} ChaiBean. All rights reserved.
      </p>
    </footer>
  );
}
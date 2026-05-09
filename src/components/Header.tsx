"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const nav = [
  { label: "How It Works", href: "/#how-it-works" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 backdrop-blur border-b shadow-sm" style={{ backgroundColor: "rgba(245,239,230,0.97)", borderColor: "#E8C99A" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center">
            <Image src="/logo.png" alt="417 Freelancers" width={0} height={0} sizes="100vw" className="h-20 w-auto" />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium transition-colors"
                style={{ color: "#6B5E55" }}
                onMouseEnter={e => (e.currentTarget.style.color = "#C47A3A")}
                onMouseLeave={e => (e.currentTarget.style.color = "#6B5E55")}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/directory"
              className="ml-4 px-4 py-2 text-sm font-medium rounded-md transition-colors"
              style={{ backgroundColor: "#C47A3A", color: "#fff" }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#B06E34")}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = "#C47A3A")}
            >
              Freelancer Directory
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 rounded-md transition-colors"
            style={{ color: "#6B5E55" }}
            aria-label="Toggle menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {open && (
        <div className="md:hidden border-t px-4 py-4 space-y-3" style={{ backgroundColor: "#F5EFE6", borderColor: "#E8C99A" }}>
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block text-sm font-medium py-1 transition-colors"
              style={{ color: "#6B5E55" }}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/directory"
            className="block w-full text-center px-4 py-2 text-sm font-medium rounded-md"
            style={{ backgroundColor: "#C47A3A", color: "#fff" }}
            onClick={() => setOpen(false)}
          >
            Freelancer Directory
          </Link>
        </div>
      )}
    </header>
  );
}

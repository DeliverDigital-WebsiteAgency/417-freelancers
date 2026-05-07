import Link from "next/link";

const links = {
  Directory: [
    { label: "Browse All", href: "/directory" },
    { label: "Web Development", href: "/directory?category=web-development" },
    { label: "Design", href: "/directory?category=design" },
    { label: "Marketing", href: "/directory?category=marketing" },
    { label: "Copywriting", href: "/directory?category=copywriting" },
  ],
  Company: [
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "How It Works", href: "/#how-it-works" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div>
            <Link href="/" className="text-white font-bold text-lg flex items-center gap-2">
              <span>🔧</span> 417 Freelancers
            </Link>
            <p className="mt-3 text-sm leading-relaxed">
              Springfield, MO&apos;s premier directory of local freelance talent. Find skilled
              professionals in the 417 area.
            </p>
            <address className="mt-4 text-sm not-italic">
              <span className="block">Springfield, MO 65801</span>
              <a href="mailto:hello@417freelancers.com" className="hover:text-white transition-colors">
                hello@417freelancers.com
              </a>
            </address>
          </div>

          {Object.entries(links).map(([group, items]) => (
            <div key={group}>
              <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
                {group}
              </h3>
              <ul className="space-y-2">
                {items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm hover:text-white transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 pt-8 border-t border-gray-800 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs">
            &copy; {new Date().getFullYear()} 417 Freelancers. All rights reserved.
          </p>
          <p className="text-xs">
            Built in Springfield, MO by{" "}
            <a href="https://deliverdigital.net" className="hover:text-white transition-colors">
              Deliver Digital
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

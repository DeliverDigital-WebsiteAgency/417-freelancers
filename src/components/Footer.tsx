import Link from "next/link";
import Image from "next/image";

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
    { label: "Join the Directory", href: "/apply" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ],
};

export function Footer() {
  return (
    <footer className="mt-auto" style={{ backgroundColor: "#2C2420", color: "#6B5E55" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div>
            <Link href="/" className="flex items-center">
              <Image src="/logo.png" alt="417 Freelancers" width={0} height={0} sizes="100vw" className="h-24 w-auto" style={{ filter: "brightness(0) invert(1)" }} />
            </Link>
            <p className="mt-3 text-sm leading-relaxed">
              Springfield, MO&apos;s premier directory of local freelance talent. Find skilled
              professionals in the 417 area.
            </p>
            <address className="mt-4 text-sm not-italic">
              <span className="block">Springfield, MO 65801</span>
              <a href="mailto:hello@417freelancers.com" className="link-sand">
                hello@417freelancers.com
              </a>
            </address>
          </div>

          {Object.entries(links).map(([group, items]) => (
            <div key={group}>
              <h3 className="font-semibold text-sm uppercase tracking-wider mb-4" style={{ color: "#E8C99A" }}>
                {group}
              </h3>
              <ul className="space-y-2">
                {items.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="text-sm link-sand">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4" style={{ borderTop: "1px solid #3d3330" }}>
          <p className="text-xs">
            &copy; {new Date().getFullYear()} 417 Freelancers. All rights reserved.
          </p>
          <p className="text-xs">
            Built in Springfield, MO by{" "}
            <a href="https://deliverdigital.net" className="link-sand">
              Deliver Digital
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

"use client";

import { Badge } from "@/components/retroui/Badge";
import { Text } from "@/components/retroui/Text";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SideNavProps {
  setIsOpen?: (isOpen: boolean) => void;
}

export default function SideNav({ setIsOpen }: SideNavProps) {
  const pathname = usePathname();

  // ✅ Correct structure
  const sideNavItems = [
    {
      title: "Our Fleets",
      children: [{ title: "View All", href: "/ourfleets" }],
    },
    {
      title: "About",
      children: [{ title: "Company Info", href: "/about" }],
    },
    {
      title: "Contacts",
      children: [{ title: "Get in Touch", href: "/contact" }],
    },
    {
      title: "Inquiry",
      children: [{ title: "Submit Inquiry", href: "/inquiry" }],
    },
  ];

  return (
    <div className="sidebar-scroll border-r-2 max-h-screen overflow-y-auto transition-transform transform md:translate-x-0 w-full bg-background flex flex-col justify-start py-8">
      <nav
        className="flex flex-col items-start max-lg:px-6 space-y-4"
        aria-label="Main navigation"
      >
        {sideNavItems.map((item) => (
          <div key={item.title} className="w-full">
            <Text as="h5" className="font-semibold mb-2">
              {item.title}
            </Text>
          </div>
        ))}
      </nav>
    </div>
  );
}

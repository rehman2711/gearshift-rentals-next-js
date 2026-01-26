"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Badge } from "@/components/retroui/Badge";
import { Text } from "@/components/retroui/Text";
import { sideNavItems } from "@/app/configs/mobile-sidebar";

interface SideNavProps {
  setIsOpen?: (isOpen: boolean) => void;
}

export default function Sidebar({ setIsOpen }: SideNavProps) {
  const pathname = usePathname();

  return (
    <aside className="w-72 max-w-[85vw] h-screen bg-background border-r flex flex-col py-6">
      <nav className="flex-1 overflow-y-auto px-6 space-y-6">
        {sideNavItems.map((item) => (
          <div key={item.title} className="space-y-2">
            <Text as="h5" className="font-semibold text-sm tracking-wide">
              {item.title}
            </Text>

            <div className="flex flex-col gap-1">
              {item.children.map((child) => {
                const isActive = pathname === child.href;

                return (
                  <Link
                    key={child.href}
                    href={child.href}
                    onClick={() => setIsOpen?.(false)}
                    className={`flex items-center justify-between rounded-md px-3 py-2 text-sm transition
                      ${
                        isActive ? "bg-muted font-medium" : "hover:bg-muted/60"
                      }`}
                  >
                    <span>{child.title}</span>

                    {isActive && (
                      <Badge size="sm" variant="outline">
                        Active
                      </Badge>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>
    </aside>
  );
}

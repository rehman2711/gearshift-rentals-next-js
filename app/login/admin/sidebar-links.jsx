import Link from "next/link";

export default function SidebarLink({
  href,
  label,
  icon,
  open,
  pathname,
  onClick,
}) {
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      onClick={onClick}
      className={`
        flex items-center gap-4 px-4 py-3 text-sm rounded-md transition dark:bg-black/90 dark:text-white
        ${
          isActive
            ? "bg-yellow-400/20 text-yellow-700 font-semibold"
            : "text-gray-700 hover:bg-black/10"
        }
      `}
    >
      <span className={`${!open && "mx-auto"}`}>{icon}</span>
      {open && (
        <>
          <span className={`${!open && "hidden md:inline"}`}>{label}</span>
        </>
      )}
    </Link>
  );
}

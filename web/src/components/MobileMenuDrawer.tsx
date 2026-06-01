import { useEffect, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { getAuth } from "../utils/auth";

type MobileNavItem = {
  to: string;
  label: string;
  icon: string;
};

const getInitials = (name: string): string => {
  const parts = name
    .trim()
    .split(/\s+/)
    .filter(Boolean);
  if (parts.length === 0) return "U";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

export default function MobileMenuDrawer({
  open,
  onClose,
  items,
}: {
  open: boolean;
  onClose: () => void;
  items: MobileNavItem[];
}) {
  const location = useLocation();

  const user = useMemo(() => {
    const auth = getAuth();
    const name = auth?.nombreComercial?.trim() || "Cliente";
    return {
      name,
      role: "Cliente",
      initials: getInitials(name),
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60]">
      <button
        type="button"
        aria-label="Cerrar menú"
        className="absolute inset-0 bg-black/35"
        onClick={onClose}
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Menú"
        className="absolute left-0 top-0 h-full w-[75vw] max-w-[380px] bg-surface shadow-2xl border-r border-outline-variant/40"
      >
        <div className="px-6 pt-6 pb-4 border-b border-outline-variant/40">
          <div className="flex items-center gap-4">
            <div
              className="h-12 w-12 rounded-full flex items-center justify-center text-white font-black tracking-tight"
              style={{ backgroundColor: "#2563eb" }}
            >
              {user.initials}
            </div>
            <div className="min-w-0">
              <div className="text-sm font-black text-on-surface truncate">
                {user.name}
              </div>
              <div className="text-xs text-secondary font-semibold truncate">
                {user.role}
              </div>
            </div>
          </div>
        </div>

        <nav className="px-4 py-4 space-y-1">
          {items.map((item) => {
            const active = location.pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                onClick={onClose}
                aria-current={active ? "page" : undefined}
                className={[
                  "flex items-center gap-3 px-4 py-3 rounded-2xl transition-colors",
                  active
                    ? "bg-surface-container-high text-on-surface"
                    : "text-secondary hover:bg-surface-container-low",
                ].join(" ")}
              >
                <span
                  className={[
                    "material-symbols-outlined text-[20px]",
                    active ? "text-primary" : "text-secondary",
                  ].join(" ")}
                  aria-hidden="true"
                >
                  {item.icon}
                </span>
                <span className="text-[12px] font-extrabold uppercase tracking-[0.22em]">
                  {item.label}
                </span>
              </Link>
            );
          })}
        </nav>
      </aside>
    </div>
  );
}


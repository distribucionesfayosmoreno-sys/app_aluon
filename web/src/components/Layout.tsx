import { Outlet, Link, useLocation, Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import { clearAuth, isAuthenticated } from "../utils/auth";

type NavItem = {
  to: string;
  label: string;
};

const navItems: NavItem[] = [
  { to: "/", label: "Modelos" },
  { to: "/status", label: "Estado" },
];

function NavLink({ to, children }) {
  const location = useLocation();
  const isActive = location.pathname === to;
  return (
    <Link
      to={to}
      className={`font-inter text-[10px] uppercase tracking-widest font-bold transition-colors ${
        isActive ? "text-[#a92f32] scale-110" : "text-[#605b77] hover:text-[#a92f32]"
      }`}
    >
      {children}
    </Link>
  );
}

function MobileTabLink({ to, label }: { to: string; label: string }) {
  const location = useLocation();
  const isActive = location.pathname === to;
  return (
    <Link
      to={to}
      aria-current={isActive ? "page" : undefined}
      className="relative flex items-center justify-center px-3 py-2 text-[11px] uppercase tracking-[0.25em] font-bold whitespace-nowrap transition-colors"
      style={{ color: isActive ? "#a92f32" : "#7b7788" }}
    >
      <span>{label}</span>
      <span
        className="absolute left-3 right-3 -bottom-[1px] h-[2px] rounded-full transition-opacity"
        style={{
          backgroundColor: "#a92f32",
          opacity: isActive ? 1 : 0,
        }}
      />
    </Link>
  );
}

export default function Layout() {
  const navigate = useNavigate();
  const [showLogout, setShowLogout] = useState(false);
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  const handleLogout = () => {
    clearAuth();
    navigate("/login", { replace: true });
  };
  return (
    <div className="min-h-screen bg-surface text-on-surface">
      <header className="fixed top-0 w-full z-50 flex justify-between items-center px-6 h-16 bg-[#fcf9f8]">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-black tracking-[-0.02em] text-[#1b1b1b] font-headline">
            <img alt="ALUON" className="h-6 md:h-7 w-auto" src="/assets/logo.png" />
          </h1>
        </div>
        <div className="flex items-center gap-6">
          <nav className="hidden md:flex gap-8 items-center">
            <NavLink to="/">Catálogo</NavLink>
            <NavLink to="/status">Estado</NavLink>
          </nav>
          <button
            type="button"
            onClick={() => setShowLogout(true)}
            className="material-symbols-outlined text-[#605b77] cursor-pointer active:scale-95 duration-200"
            aria-label="Cerrar sesión"
            title="Cerrar sesión"
          >
            account_circle
          </button>
        </div>
      </header>

      <div className="md:hidden fixed top-16 left-0 right-0 z-40 bg-[#fcf9f8]/95 backdrop-blur-xl border-b border-[#dfbfbd]/40">
        <div className="flex items-center gap-3 px-4 h-12 overflow-x-auto">
          {navItems.map((item) => (
            <MobileTabLink key={item.to} to={item.to} label={item.label} />
          ))}
        </div>
      </div>

      <main className="pt-28 md:pt-16 pb-10 md:pb-0">
        <Outlet />
      </main>

      {showLogout ? (
        <div className="fixed inset-0 z-[60] flex items-end md:items-center justify-center bg-black/40 px-4">
          <div
            className="w-full max-w-md rounded-t-2xl md:rounded-2xl bg-surface text-on-surface shadow-xl border border-outline-variant/40"
            role="dialog"
            aria-modal="true"
            aria-label="Confirmar cierre de sesión"
          >
            <div className="px-6 pt-6 pb-4">
              <div className="text-xs uppercase tracking-[0.3em] text-secondary font-bold">Cuenta</div>
              <h3 className="font-headline font-bold text-xl mt-2">¿Cerrar sesión?</h3>
              <p className="text-sm text-secondary mt-2">
                Perderás el acceso hasta volver a iniciar sesión.
              </p>
            </div>
            <div className="px-6 pb-6 flex items-center gap-3">
              <button
                type="button"
                className="flex-1 h-11 rounded-full border border-outline-variant/60 text-xs font-bold uppercase tracking-[0.2em] text-secondary"
                onClick={() => setShowLogout(false)}
              >
                Cancelar
              </button>
              <button
                type="button"
                className="flex-1 h-11 rounded-full bg-primary text-white text-xs font-bold uppercase tracking-[0.2em]"
                onClick={handleLogout}
              >
                Cerrar sesión
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

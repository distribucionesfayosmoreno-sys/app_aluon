import { Outlet, Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { clearAuth, isAuthenticated } from "../utils/auth";
import MobileMenuDrawer from "./MobileMenuDrawer";

const mobileMenuItems = [
  { to: "/", label: "Modelos", icon: "home" },
  { to: "/request", label: "Orden", icon: "assignment" },
  { to: "/budget", label: "Presupuesto", icon: "receipt_long" },
  { to: "/status", label: "Estado", icon: "track_changes" },
] as const;

function NavLink({ to, children }: { to: string; children: React.ReactNode }) {
  const location = useLocation();
  const isActive = location.pathname === to;
  return (
    <Link
      to={to}
      className={`font-inter text-[10px] uppercase tracking-widest font-bold transition-colors ${
        isActive ? "text-primary scale-110" : "text-secondary hover:text-primary"
      }`}
    >
      {children}
    </Link>
  );
}

export default function Layout() {
  const navigate = useNavigate();
  const [showLogout, setShowLogout] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  const handleLogout = () => {
    clearAuth();
    navigate("/login", { replace: true });
  };

  return (
    <div className="min-h-screen bg-surface text-on-surface">
      <header className="fixed top-0 w-full z-50 flex justify-between items-center px-6 h-16 bg-surface border-b border-outline-variant/20">
        <div className="flex items-center gap-4">
          <button
            type="button"
            className="md:hidden material-symbols-outlined text-secondary hover:text-primary cursor-pointer active:scale-95 duration-200"
            aria-label="Abrir menú"
            title="Abrir menú"
            onClick={() => setMenuOpen(true)}
          >
            menu
          </button>
          <h1 className="text-xl font-black tracking-[-0.02em] text-on-surface font-headline">
            <img alt="ALUON" className="h-10 md:h-12 w-auto" src="/assets/logo.png" />
          </h1>
        </div>
        <div className="flex items-center gap-6">
          <nav className="hidden md:flex gap-8 items-center">
            <NavLink to="/">Catálogo</NavLink>
            <NavLink to="/budget">Presupuesto</NavLink>
            <NavLink to="/status">Estado</NavLink>
          </nav>
          <button
            type="button"
            onClick={() => setShowLogout(true)}
            className="material-symbols-outlined text-secondary hover:text-primary cursor-pointer active:scale-95 duration-200"
            aria-label="Cerrar sesión"
            title="Cerrar sesión"
          >
            account_circle
          </button>
        </div>
      </header>

      <MobileMenuDrawer
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        items={[...mobileMenuItems]}
      />

      <main className="pt-16 pb-10 md:pb-0">
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
              <div className="text-[10px] font-black uppercase tracking-[0.25em] text-[#a92f32]">Cuenta</div>
              <h3 className="font-headline font-black text-xl mt-2 text-on-surface">¿Cerrar sesión?</h3>
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
                className="flex-1 h-11 rounded-full bg-gradient-to-br from-[#a92f32] to-[#8c2427] text-white text-[10px] font-bold uppercase tracking-widest transition-all hover:scale-[1.02] active:scale-95"
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


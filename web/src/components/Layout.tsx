import { Outlet, Link, useLocation } from "react-router-dom";

type NavItem = {
  to: string;
  label: string;
};

const navItems: NavItem[] = [
  { to: "/", label: "Modelos" },
  { to: "/detail", label: "Medidas" },
  { to: "/checkout", label: "Enviar" },
  { to: "/requests", label: "Bandeja" },
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
  return (
    <div className="min-h-screen bg-surface text-on-surface">
      <header className="fixed top-0 w-full z-50 flex justify-between items-center px-6 h-16 bg-[#fcf9f8]">
        <div className="flex items-center gap-4">
          <span className="material-symbols-outlined text-[#a92f32] cursor-pointer active:scale-95 duration-200">menu</span>
          <h1 className="text-xl font-black tracking-[-0.02em] text-[#1b1b1b] font-headline">
            <img alt="ALUON" className="h-6 md:h-7 w-auto" src="/assets/logo.png" />
          </h1>
        </div>
        <div className="flex items-center gap-6">
          <nav className="hidden md:flex gap-8 items-center">
            <NavLink to="/">Catálogo</NavLink>
            <NavLink to="/detail">Detalle</NavLink>
            <NavLink to="/checkout">Carrito/Checkout</NavLink>
            <NavLink to="/requests">Bandeja</NavLink>
            <NavLink to="/status">Estado</NavLink>
          </nav>
          <span className="material-symbols-outlined text-[#605b77] cursor-pointer active:scale-95 duration-200">account_circle</span>
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

    </div>
  );
}

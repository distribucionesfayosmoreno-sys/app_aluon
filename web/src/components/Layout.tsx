import { Outlet, Link, useLocation } from "react-router-dom";

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

      <main className="pt-16 pb-24 md:pb-0">
        <Outlet />
      </main>

      <nav className="md:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 pb-safe h-20 bg-[#fcf9f8]/80 backdrop-blur-xl border-t border-[#dfbfbd]/15 shadow-[0_-10px_30px_rgba(27,27,27,0.04)] rounded-t-sm">
        <NavLink to="/">
          <div className="flex flex-col items-center justify-center">
            <span className="material-symbols-outlined" data-icon="grid_view">grid_view</span>
            <span className="font-inter text-[10px] uppercase tracking-widest font-bold mt-1">Modelos</span>
          </div>
        </NavLink>
        <NavLink to="/detail">
          <div className="flex flex-col items-center justify-center">
            <span className="material-symbols-outlined" data-icon="straighten">straighten</span>
            <span className="font-inter text-[10px] uppercase tracking-widest font-bold mt-1">Medidas</span>
          </div>
        </NavLink>
        <NavLink to="/checkout">
          <div className="flex flex-col items-center justify-center">
            <span className="material-symbols-outlined" data-icon="request_quote">request_quote</span>
            <span className="font-inter text-[10px] uppercase tracking-widest font-bold mt-1">Enviar</span>
          </div>
        </NavLink>
        <NavLink to="/requests">
          <div className="flex flex-col items-center justify-center">
            <span className="material-symbols-outlined" data-icon="inbox">inbox</span>
            <span className="font-inter text-[10px] uppercase tracking-widest font-bold mt-1">Bandeja</span>
          </div>
        </NavLink>
        <NavLink to="/status">
          <div className="flex flex-col items-center justify-center">
            <span className="material-symbols-outlined" data-icon="list_alt">list_alt</span>
            <span className="font-inter text-[10px] uppercase tracking-widest font-bold mt-1">Estado</span>
          </div>
        </NavLink>
      </nav>

    </div>
  );
}

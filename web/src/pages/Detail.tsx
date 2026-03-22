export default function Detail() {
  return (
    <section className="bg-surface-container-low py-12 px-4 md:px-16">
      <div className="text-xs uppercase tracking-[0.3em] text-secondary font-bold mb-4">Catálogo · Detalle</div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        <div className="relative">
          <div className="aspect-[4/3] bg-on-surface overflow-hidden">
            <img
              alt="Aluon Inox Detail"
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida/ADBb0ui97HSSi8VFlm1VV6kbgOhJq8CXQzwN2POUScMEiP6OkmtQb2jvy365vX9Dh4c0P6pmSZfjHZTn48GMHoRsBrcCneKkXIEZ0bHHkq27izvHA7Qjs4U2d2-t0UupaFLH-vO6z4sgUk9KOAksggNPDWgDOcTluvR-QkADThdvlBzGWfYQ-X5FyTEJsPZtssIUfDuqa-j1R6-VkVmNHstmxvk-eKlBLRNKEZYqFb2-2P57xZZUhkxB2Xxkjunm0KG2uO59YGdjL0gTyQ"
            />
          </div>
          <div className="absolute bottom-4 left-4 glass-panel px-4 py-2 border-l-2 border-primary">
            <span className="font-headline font-bold text-xs">ALUON INOX · TIG ELITE</span>
          </div>
        </div>
        <div className="space-y-6">
          <span className="inline-block px-3 py-1 bg-primary text-on-primary text-[10px] font-bold tracking-widest uppercase">
            Hybrid Core
          </span>
          <h2 className="font-headline font-bold text-4xl md:text-5xl leading-tight tracking-tight">ALUON INOX</h2>
          <p className="text-secondary leading-relaxed">
            Integración de acero inoxidable con aluminio de precisión. Diseñado para soportar cargas dinámicas con
            tolerancia micrométrica.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-surface p-4">
              <div className="text-[10px] uppercase tracking-[0.2em] text-secondary font-bold">Tolerancia</div>
              <div className="font-headline font-bold text-2xl text-primary">0.05mm</div>
            </div>
            <div className="bg-surface p-4">
              <div className="text-[10px] uppercase tracking-[0.2em] text-secondary font-bold">Longitud</div>
              <div className="font-headline font-bold text-2xl">6000mm</div>
            </div>
            <div className="bg-surface p-4">
              <div className="text-[10px] uppercase tracking-[0.2em] text-secondary font-bold">Acabado</div>
              <div className="font-headline font-bold text-2xl">99.9%</div>
            </div>
            <div className="bg-surface p-4">
              <div className="text-[10px] uppercase tracking-[0.2em] text-secondary font-bold">ISO</div>
              <div className="font-headline font-bold text-2xl">9001</div>
            </div>
          </div>
          <div className="flex flex-wrap gap-4">
            <button className="bg-surface-container-high text-on-surface px-6 py-3 text-xs font-bold uppercase tracking-widest">
              Ficha Técnica
            </button>
            <button className="bg-gradient-to-br from-primary to-primary-container text-on-primary px-6 py-3 text-xs font-bold uppercase tracking-widest flex items-center gap-3">
              Añadir al carrito
              <span className="material-symbols-outlined text-sm">shopping_cart</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

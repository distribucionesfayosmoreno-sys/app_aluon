export default function Checkout() {
  return (
    <section className="bg-surface-container-low py-12 px-4 md:px-16">
      <div className="text-xs uppercase tracking-[0.3em] text-secondary font-bold mb-4">Detalle · Carrito/Checkout</div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-surface p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-headline font-bold text-2xl">Carrito</h2>
              <a className="text-xs uppercase tracking-[0.2em] font-bold text-primary" href="/">
                Seguir comprando
              </a>
            </div>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                <img
                  alt="Aluon Inox"
                  className="w-full h-24 object-cover"
                  src="https://lh3.googleusercontent.com/aida/ADBb0ui97HSSi8VFlm1VV6kbgOhJq8CXQzwN2POUScMEiP6OkmtQb2jvy365vX9Dh4c0P6pmSZfjHZTn48GMHoRsBrcCneKkXIEZ0bHHkq27izvHA7Qjs4U2d2-t0UupaFLH-vO6z4sgUk9KOAksggNPDWgDOcTluvR-QkADThdvlBzGWfYQ-X5FyTEJsPZtssIUfDuqa-j1R6-VkVmNHstmxvk-eKlBLRNKEZYqFb2-2P57xZZUhkxB2Xxkjunm0KG2uO59YGdjL0gTyQ"
                />
                <div className="md:col-span-2">
                  <div className="text-xs uppercase tracking-[0.2em] text-secondary font-bold">Hybrid Core</div>
                  <div className="font-headline font-bold text-lg">ALUON INOX</div>
                  <div className="text-secondary text-sm">Lote industrial · 6m</div>
                </div>
                <div className="text-right font-headline font-bold text-xl">€1,980</div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                <img
                  alt="Aluon Bisel"
                  className="w-full h-24 object-cover"
                  src="https://lh3.googleusercontent.com/aida/ADBb0uiPbn_jSaU9PGOgwMEM3OjYK2pBwIh32R6FQ2FaCWrxBjV59ACJWp8_QU6zpmLcLo75oU6H-pr4j71wShlbmiK3RkGRJF83SUr057i6XFltaDL-uc5x1Xkk4vY-mw_k4Sk0HeeZShCqLc9D3ol_HWnZIHlSOwQSkRRrZJBaelu80qkajVVlHyJOFn73PjB9o-AB79tqUf14JpKC_ReXkoFoj5a6Dd9Iu8WXA9r4kozi9v3-T99KzIyE9yY_j4vkDhkff5oNyBrv"
                />
                <div className="md:col-span-2">
                  <div className="text-xs uppercase tracking-[0.2em] text-secondary font-bold">Precision Edge</div>
                  <div className="font-headline font-bold text-lg">ALUON BISEL</div>
                  <div className="text-secondary text-sm">Serie premium · 4m</div>
                </div>
                <div className="text-right font-headline font-bold text-xl">€1,260</div>
              </div>
            </div>
          </div>

          <div className="bg-surface p-6">
            <h3 className="font-headline font-bold text-xl mb-4">Datos de envío</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input className="bg-surface-container-low p-3 text-sm" placeholder="Empresa" />
              <input className="bg-surface-container-low p-3 text-sm" placeholder="Contacto" />
              <input className="bg-surface-container-low p-3 text-sm" placeholder="Email" />
              <input className="bg-surface-container-low p-3 text-sm" placeholder="Teléfono" />
              <input className="bg-surface-container-low p-3 text-sm md:col-span-2" placeholder="Dirección" />
            </div>
          </div>
        </div>

        <div className="bg-surface p-6 h-fit">
          <h3 className="font-headline font-bold text-xl mb-6">Resumen</h3>
          <div className="space-y-3 text-sm text-secondary">
            <div className="flex justify-between"><span>Subtotal</span><span>€3,240</span></div>
            <div className="flex justify-between"><span>Envío</span><span>€180</span></div>
            <div className="flex justify-between"><span>Impuestos</span><span>€620</span></div>
          </div>
          <div className="flex justify-between items-center font-headline font-bold text-2xl mt-6">
            <span>Total</span>
            <span className="text-primary">€4,040</span>
          </div>
          <button className="w-full bg-gradient-to-br from-primary to-primary-container text-on-primary py-4 mt-6 text-xs font-bold uppercase tracking-widest">
            Confirmar pedido
          </button>
          <div className="text-[10px] uppercase tracking-[0.2em] text-secondary mt-4">Pago seguro · ISO 9001</div>
        </div>
      </div>
    </section>
  );
}

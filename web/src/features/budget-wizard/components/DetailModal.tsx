import type { QuoteItemDraft } from "../BudgetWizard.types";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  items: QuoteItemDraft[];
};

const yesNo = (val: boolean) => (val ? "Sí" : "No");

export const DetailModal = ({ isOpen, onClose, items }: Props) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-lg bg-surface text-on-surface rounded-3xl shadow-2xl overflow-hidden flex flex-col my-8" style={{ maxHeight: "90vh" }}>
        {/* Header */}
        <header className="p-5 border-b border-outline-variant/20 flex items-center justify-between">
          <div>
            <h3 className="text-base font-black">Detalle del pedido</h3>
            <p className="text-[10px] text-secondary mt-0.5">Especificaciones de tus puertas.</p>
          </div>
          <button
            type="button"
            className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-surface-container text-secondary hover:text-on-surface transition-colors"
            onClick={onClose}
          >
            <span className="text-xl font-bold">×</span>
          </button>
        </header>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          {items.map((item, idx) => (
            <div key={idx} className="border-b border-outline-variant/10 pb-5 last:border-0 last:pb-0 space-y-4">
              <div className="text-[10px] font-black uppercase tracking-wider text-primary">
                Puerta #{idx + 1} — {item.productCategory.replace('_', ' ')}
              </div>

              {/* Data Table */}
              <div className="bg-surface-container rounded-xl p-3 border border-outline-variant/20">
                <div className="divide-y divide-outline-variant/10 text-xs text-secondary">
                  <div className="flex justify-between py-2 px-1">
                    <span>Modelo</span>
                    <span className="font-bold text-on-surface">{item.doorModel}</span>
                  </div>
                  <div className="flex justify-between py-2 px-1">
                    <span>Apertura</span>
                    <span className="font-bold text-on-surface">{item.doorType}</span>
                  </div>
                  <div className="flex justify-between py-2 px-1">
                    <span>Medidas</span>
                    <span className="font-bold text-on-surface">{item.widthMm} x {item.heightMm} mm</span>
                  </div>
                  <div className="flex justify-between py-2 px-1">
                    <span>Color</span>
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-on-surface">{item.colorCode}</span>
                      <div className="w-3.5 h-3.5 rounded-full border border-outline-variant/30" style={{ backgroundColor: item.colorCode }} />
                    </div>
                  </div>
                  <div className="flex justify-between py-2 px-1">
                    <span>Imprimación</span>
                    <span className="font-bold text-on-surface">{yesNo(item.primerRequired)}</span>
                  </div>
                  <div className="flex justify-between py-2 px-1">
                    <span>Refuerzo Larguero</span>
                    <span className="font-bold text-on-surface">{yesNo(item.larguero)}</span>
                  </div>
                  <div className="flex justify-between py-2 px-1">
                    <span>Marco Superior</span>
                    <span className="font-bold text-on-surface">{yesNo(item.marcoSuperior)}</span>
                  </div>
                  <div className="flex justify-between py-2 px-1">
                    <span>Bisagras</span>
                    <span className="font-bold text-on-surface">{yesNo(item.bisagras)}</span>
                  </div>
                  <div className="flex justify-between py-2 px-1">
                    <span>Portero Automático</span>
                    <span className="font-bold text-on-surface">{yesNo(item.porteroAutomatico)}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <footer className="p-4 border-t border-outline-variant/20 flex justify-end">
          <button
            type="button"
            className="px-5 py-2 bg-surface-container hover:bg-surface-container-high text-secondary hover:text-on-surface font-bold rounded-xl text-[10px] uppercase tracking-wider transition-colors"
            onClick={onClose}
          >
            Cerrar detalle
          </button>
        </footer>
      </div>
    </div>
  );
};

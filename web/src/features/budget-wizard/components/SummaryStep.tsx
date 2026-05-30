import type { CatalogDoorProduct, CatalogModel, CatalogVariant } from '../BudgetWizard.types';
import { openingImagePath } from '../utils/openingImages';

type Props = {
  model: CatalogModel;
  product: CatalogDoorProduct;
  variant: CatalogVariant;
  color: string;
  primerRequired: boolean;
  widthMm: number;
  heightMm: number;
  floorClearanceMm: number;
  larguero: boolean;
  marcoSuperior: boolean;
  bisagras: boolean;
  porteroAutomatico: boolean;
  submitting: boolean;
  onBack: () => void;
  onFinalize: () => void;
};

const yesNo = (val: boolean) => (val ? 'Sí' : 'No');

export const SummaryStep = ({
  model,
  product,
  variant,
  color,
  primerRequired,
  widthMm,
  heightMm,
  floorClearanceMm,
  larguero,
  marcoSuperior,
  bisagras,
  porteroAutomatico,
  submitting,
  onBack,
  onFinalize,
}: Props) => {
  const openingSide: 'LEFT' | 'RIGHT' = bisagras ? 'RIGHT' : 'LEFT';
  const openingImage = openingImagePath(variant.variante, openingSide);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <span className="text-[10px] uppercase tracking-widest text-[#a92f32] font-bold">Resumen de puerta</span>
          <h3 className="font-headline font-bold text-2xl text-on-surface mt-0.5">Revisa el diseño</h3>
        </div>
        <button
          type="button"
          onClick={onBack}
          className="text-xs font-bold uppercase tracking-wider text-secondary flex items-center gap-1 active:scale-95 transition-transform"
        >
          <span className="material-symbols-outlined text-sm">arrow_back</span>
          Volver
        </button>
      </div>

      <div className="bg-surface-container rounded-2xl p-4 border border-outline-variant/20 space-y-4 text-xs text-on-surface">
        {openingImage && (
          <div className="flex items-center justify-between gap-4">
            <div>
              <div className="text-secondary font-medium">Vista de apertura</div>
              <div className="font-bold text-on-surface">
                {openingSide === 'LEFT' ? 'Izquierda' : 'Derecha'}
              </div>
            </div>
            <div className="h-16 w-24 bg-white rounded-xl border border-outline-variant/25 overflow-hidden flex items-center justify-center">
              <img src={openingImage} alt="Apertura" className="max-h-full max-w-full object-contain" />
            </div>
          </div>
        )}
        <div className="flex justify-between py-1">
          <span className="text-secondary font-medium">Modelo</span>
          <span className="font-bold">{model.modelo}</span>
        </div>
        <div className="flex justify-between py-1">
          <span className="text-secondary font-medium">Tipo Cerramiento</span>
          <span className="font-bold">{product.producto.replace('_', ' ')}</span>
        </div>
        <div className="flex justify-between py-1">
          <span className="text-secondary font-medium">Apertura</span>
          <span className="font-bold">{variant.variante}</span>
        </div>
        <div className="flex justify-between py-1">
          <span className="text-secondary font-medium">Color Acabado</span>
          <div className="flex items-center gap-2">
            <span className="font-bold">{color}</span>
            <div className="w-4 h-4 rounded-full border border-outline-variant/40" style={{ backgroundColor: color }} />
          </div>
        </div>
        <div className="flex justify-between py-1">
          <span className="text-secondary font-medium">Imprimación</span>
          <span className="font-bold">{yesNo(primerRequired)}</span>
        </div>

        <div className="h-px bg-outline-variant/20" />

        <div className="flex justify-between py-1">
          <span className="text-secondary font-medium">Dimensiones</span>
          <span className="font-bold">{widthMm} x {heightMm} mm</span>
        </div>
        <div className="flex justify-between py-1">
          <span className="text-secondary font-medium">Holgura suelo</span>
          <span className="font-bold">{floorClearanceMm} mm</span>
        </div>
        <div className="flex justify-between py-1">
          <span className="text-secondary font-medium">Larguero de refuerzo</span>
          <span className="font-bold">{yesNo(larguero)}</span>
        </div>
        <div className="flex justify-between py-1">
          <span className="text-secondary font-medium">Marco superior</span>
          <span className="font-bold">{yesNo(marcoSuperior)}</span>
        </div>
        <div className="flex justify-between py-1">
          <span className="text-secondary font-medium">Bisagras</span>
          <span className="font-bold">{yesNo(bisagras)}</span>
        </div>
        <div className="flex justify-between py-1">
          <span className="text-secondary font-medium">Portero automático</span>
          <span className="font-bold">{yesNo(porteroAutomatico)}</span>
        </div>
      </div>

      <button
        type="button"
        disabled={submitting}
        onClick={onFinalize}
        className="w-full py-3.5 px-6 bg-[#a92f32] text-white font-black text-xs uppercase tracking-widest rounded-2xl shadow-md hover:bg-[#8c2427] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
      >
        {submitting ? 'Guardando...' : 'Aceptar y Guardar Puerta'}
        <span className="material-symbols-outlined text-sm">done_all</span>
      </button>
    </div>
  );
};

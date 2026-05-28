import type { CatalogModel, CatalogVariant } from '../BudgetWizard.types';

type Props = {
  model: CatalogModel;
  variants: CatalogVariant[];
  loading: boolean;
  onBack: () => void;
  onSelect: (variant: CatalogVariant) => void;
};

const mapVariantLabel = (val: string) => {
  switch (val) {
    case 'PEATONAL': return 'Peatonal';
    case 'ABATIBLE_UNA': return 'Abatible (1 hoja)';
    case 'ABATIBLE_DOS': return 'Abatible (2 hojas)';
    case 'CORREDERA': return 'Corredera Deslizante';
    case 'VALLA': return 'Fija / Valla';
    default: return val.replace('_', ' ');
  }
};

export const VariantStep = ({ model, variants, loading, onBack, onSelect }: Props) => {
  if (loading) {
    return <div className="text-xs text-secondary animate-pulse py-8 text-center">Cargando tipos de apertura...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-[10px] uppercase tracking-widest text-[#a92f32] font-bold">Paso 4 de 5</span>
          <h3 className="font-headline font-bold text-2xl text-on-surface mt-0.5">Tipo de Apertura</h3>
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

      <p className="text-xs text-secondary">
        Elige cómo se abrirá la puerta o cerramiento para el modelo **{model.modelo}**:
      </p>

      <div className="grid grid-cols-1 gap-3">
        {variants.map(variant => (
          <button
            key={variant.id}
            type="button"
            onClick={() => onSelect(variant)}
            className="group flex items-center justify-between p-4 bg-surface-container rounded-2xl border border-outline-variant/30 hover:border-[#a92f32] transition-colors active:scale-[0.99] text-left shadow-sm"
          >
            <div>
              <div className="text-xs font-black text-on-surface uppercase tracking-wide">
                Apertura {mapVariantLabel(variant.variante)}
              </div>
              <div className="text-[10px] text-secondary mt-0.5">
                Especificaciones de cerramientos de aluminio
              </div>
            </div>
            <span className="material-symbols-outlined text-secondary group-hover:text-[#a92f32] transition-colors">
              arrow_forward_ios
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

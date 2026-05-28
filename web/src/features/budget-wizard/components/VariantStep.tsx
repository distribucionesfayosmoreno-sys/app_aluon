import type { CatalogModel, CatalogVariant } from '../BudgetWizard.types';

type Props = {
  model: CatalogModel;
  variants: CatalogVariant[];
  loading: boolean;
  onBack: () => void;
  onSelect: (variant: CatalogVariant) => void;
};

const getVariantLabelName = (variante: string) => {
  switch (variante) {
    case 'PEATONAL': return 'Puerta';
    case 'CORREDERA': return 'Puerta Corredera';
    case 'ABATIBLE_UNA': return 'Puerta Abatible Una Hoja';
    case 'ABATIBLE_DOS': return 'Puerta Abatible Dos Hojas';
    case 'VALLA': return 'Valla';
    default: return 'Puerta';
  }
};

const mapVariantLabel = (variante: string) => {
  switch (variante) {
    case 'PEATONAL': return 'Puerta';
    case 'CORREDERA': return 'Puerta Corredera';
    case 'ABATIBLE_UNA': return 'Puerta Abatible Una Hoja';
    case 'ABATIBLE_DOS': return 'Puerta Abatible Dos Hojas';
    case 'VALLA': return 'Valla';
    default: return variante.replace('_', ' ');
  }
};

const getVariantImage = (modelo: string, variante: string) => {
  const label = getVariantLabelName(variante);
  const modelCamel = modelo.charAt(0).toUpperCase() + modelo.slice(1).toLowerCase();
  return `/ideas/aluon/images/Modelo ${modelCamel} - ${label}.png`;
};

export const VariantStep = ({ model, variants, loading, onBack, onSelect }: Props) => {
  if (loading) {
    return <div className="text-xs text-secondary animate-pulse py-8 text-center font-body">Cargando tipos de apertura...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-[10px] uppercase tracking-widest text-primary font-bold">Paso 4 de 5</span>
          <h3 className="font-headline font-bold text-2xl text-on-surface mt-0.5 font-space">Tipo de Apertura</h3>
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

      <p className="text-xs text-secondary font-body">
        Elige cómo se abrirá la puerta o cerramiento para el modelo **{model.modelo}**:
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {variants.map(variant => (
          <button
            key={variant.id}
            type="button"
            onClick={() => onSelect(variant)}
            className="group relative flex flex-col justify-end text-left bg-white rounded-2xl overflow-hidden border border-slate-200 hover:border-primary transition-all duration-200 active:scale-[0.98] shadow-sm h-64 w-full"
          >
            {/* Image container serving as full background */}
            <div className="absolute inset-0 w-full h-full bg-white flex items-center justify-center overflow-hidden">
              <img
                src={getVariantImage(model.modelo, variant.variante)}
                alt={variant.variante}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                onError={(e) => {
                  const target = e.currentTarget;
                  const label = getVariantLabelName(variant.variante);
                  if (!target.src.includes('Modelo Bisel')) {
                    target.src = `/ideas/aluon/images/Modelo Bisel - ${label}.png`;
                  }
                }}
              />
            </div>

            {/* Text Overlay */}
            <div className="relative z-10 p-4 pt-10 space-y-1 bg-gradient-to-t from-white via-white/90 to-transparent w-full">
              <div className="flex items-center justify-between">
                <span className="text-base font-black text-on-surface tracking-wider uppercase font-space">
                  {mapVariantLabel(variant.variante)}
                </span>
              </div>
              <p className="text-[10px] leading-relaxed text-secondary font-body">
                Especificaciones de cerramientos de aluminio y acabados de alta calidad.
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

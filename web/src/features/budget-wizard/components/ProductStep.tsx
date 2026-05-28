import type { CatalogDoorProduct, CatalogModel } from '../BudgetWizard.types';

type Props = {
  model: CatalogModel;
  products: CatalogDoorProduct[];
  loading: boolean;
  onBack: () => void;
  onSelect: (product: CatalogDoorProduct) => void;
};

const mapProductLabel = (val: string) => {
  switch (val) {
    case 'PUERTA_PASO': return 'Puerta de Paso';
    case 'PUERTA_GARAJE': return 'Puerta de Garaje';
    case 'VALLA': return 'Valla Perimetral';
    case 'REJA': return 'Reja Exterior';
    default: return val.replace('_', ' ');
  }
};

export const ProductStep = ({ model, products, loading, onBack, onSelect }: Props) => {
  if (loading) {
    return <div className="text-xs text-secondary animate-pulse py-8 text-center">Cargando productos...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-[10px] uppercase tracking-widest text-[#a92f32] font-bold">Paso 2 de 5</span>
          <h3 className="font-headline font-bold text-2xl text-on-surface mt-0.5">Tipo de estructura</h3>
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
        Estás configurando un producto del **Modelo {model.modelo}**. Elige el tipo de cerramiento:
      </p>

      <div className="grid grid-cols-1 gap-3">
        {products.map(product => (
          <button
            key={product.id}
            type="button"
            onClick={() => onSelect(product)}
            className="group flex items-center justify-between p-4 bg-surface-container rounded-2xl border border-outline-variant/30 hover:border-[#a92f32] transition-colors active:scale-[0.99] text-left shadow-sm"
          >
            <div>
              <div className="text-xs font-black text-on-surface uppercase tracking-wide">
                {mapProductLabel(product.producto)}
              </div>
              <div className="text-[10px] text-secondary mt-0.5">
                Cerramientos de aluminio extrusionado
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

import type { CatalogDoorProduct, CatalogModel } from '../BudgetWizard.types';

type Props = {
  model: CatalogModel;
  products: CatalogDoorProduct[];
  loading: boolean;
  onBack: () => void;
  onSelect: (product: CatalogDoorProduct) => void;
};

const getProductLabelName = (producto: string) => {
  switch (producto) {
    case 'PUERTA_PASO': return 'Puerta';
    case 'PUERTA_GARAJE': return 'Puerta Corredera';
    case 'VALLA': return 'Valla';
    case 'REJA': return 'Puerta';
    default: return 'Puerta';
  }
};

const mapProductLabel = (producto: string) => {
  switch (producto) {
    case 'PUERTA_PASO': return 'Puerta';
    case 'PUERTA_GARAJE': return 'Puerta Corredera';
    case 'VALLA': return 'Valla';
    case 'REJA': return 'Reja';
    default: return producto.replace('_', ' ');
  }
};

const getProductImage = (modelo: string, producto: string) => {
  const label = getProductLabelName(producto);
  const modelCamel = modelo.charAt(0).toUpperCase() + modelo.slice(1).toLowerCase();
  return `/ideas/aluon/images/Modelo ${modelCamel} - ${label}.png`;
};

export const ProductStep = ({ model, products, loading, onBack, onSelect }: Props) => {
  if (loading) {
    return <div className="text-xs text-secondary animate-pulse py-8 text-center font-body">Cargando productos...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-[10px] uppercase tracking-widest text-primary font-bold">Paso 2 de 5</span>
          <h3 className="font-headline font-bold text-2xl text-on-surface mt-0.5 font-space">Tipo de estructura</h3>
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
        Estás configurando un producto del **Modelo {model.modelo}**. Elige el tipo de cerramiento:
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {products.map(product => (
          <button
            key={product.id}
            type="button"
            onClick={() => onSelect(product)}
            className="group relative flex flex-col justify-end text-left bg-white rounded-2xl overflow-hidden border border-slate-200 hover:border-primary transition-all duration-200 active:scale-[0.98] shadow-sm h-64 w-full"
          >
            {/* Image container serving as full background */}
            <div className="absolute inset-0 w-full h-full bg-white flex items-center justify-center overflow-hidden">
              <img
                src={getProductImage(model.modelo, product.producto)}
                alt={product.producto}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                onError={(e) => {
                  const target = e.currentTarget;
                  const label = getProductLabelName(product.producto);
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
                  {mapProductLabel(product.producto)}
                </span>
              </div>
              <p className="text-[10px] leading-relaxed text-secondary font-body">
                Cerramientos de aluminio de alta durabilidad y diseño moderno.
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

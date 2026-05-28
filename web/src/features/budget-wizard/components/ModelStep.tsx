import type { CatalogModel } from '../BudgetWizard.types';

type Props = {
  models: CatalogModel[];
  loading: boolean;
  onSelect: (model: CatalogModel) => void;
};

export const ModelStep = ({ models, loading, onSelect }: Props) => {
  if (loading) {
    return <div className="text-xs text-secondary animate-pulse py-8 text-center">Cargando modelos del catálogo...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="text-center md:text-left">
        <span className="text-[10px] uppercase tracking-widest text-[#a92f32] font-bold">Paso 1 de 5</span>
        <h3 className="font-headline font-bold text-2xl text-on-surface mt-1">Selecciona un modelo</h3>
        <p className="text-xs text-secondary mt-1">
          Elige la línea estética para tu puerta.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {models.map(model => (
          <button
            key={model.id}
            type="button"
            onClick={() => onSelect(model)}
            className="group relative flex flex-col text-left bg-surface-container rounded-2xl overflow-hidden border border-outline-variant/30 hover:border-[#a92f32] transition-all duration-200 active:scale-[0.98] shadow-sm"
          >
            <div className="relative w-full h-32 bg-surface-container-high overflow-hidden">
              {model.imagenModelo ? (
                <img
                  src={model.imagenModelo}
                  alt={model.modelo}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-xs text-secondary uppercase font-black">
                  {model.modelo}
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 text-white text-[10px] font-black uppercase tracking-widest bg-[#a92f32] py-0.5 px-2 rounded">
                {model.modelo}
              </div>
            </div>
            <div className="p-4">
              <span className="text-[11px] font-bold text-on-surface block uppercase tracking-wider">
                Serie {model.modelo}
              </span>
              <span className="text-[10px] text-secondary mt-1 block">
                Acabados y perfiles de calidad premium.
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

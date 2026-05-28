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
        <span className="text-[10px] uppercase tracking-widest text-primary font-bold">Paso 1 de 5</span>
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
            className="group relative flex flex-col text-left bg-surface-container rounded-2xl overflow-hidden border border-outline-variant/30 hover:border-primary transition-all duration-200 active:scale-[0.98] shadow-sm"
          >
            <div className="relative w-full h-36 bg-white flex items-center justify-center overflow-hidden border-b border-outline-variant/10">
              {/* Template background */}
              <img
                src="/assets/template.png"
                alt="Template"
                className="absolute inset-0 w-full h-full object-cover"
              />
              {/* Model image centered */}
              {model.imagenModelo ? (
                <img
                  src={model.imagenModelo}
                  alt={model.modelo}
                  className="relative z-10 max-h-[80%] max-w-[80%] object-contain group-hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <div className="relative z-10 text-xs text-slate-800 uppercase font-black">
                  {model.modelo}
                </div>
              )}
            </div>
            <div className="p-4 space-y-1 bg-surface-container-high">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-on-surface tracking-wider uppercase font-space">
                  Serie {model.modelo}
                </span>
                <span className="text-[8px] font-bold text-primary tracking-widest uppercase bg-primary-fixed-dim/20 px-2 py-0.5 rounded-full font-space">
                  UI/UX
                </span>
              </div>
              <p className="text-[10px] leading-relaxed text-secondary font-body">
                Acabados en aluminio de alta durabilidad y diseño moderno.
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );

};

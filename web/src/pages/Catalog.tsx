import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { catalogModels } from "../data/catalogModels";

export default function Catalog() {
  const [selected, setSelected] = useState(catalogModels[0]?.id ?? "classic");
  const navigate = useNavigate();
  const current = useMemo(
    () => catalogModels.find((model) => model.id === selected) || catalogModels[0],
    [selected]
  );

  return (
    <section className="bg-surface-container-low md:px-16">
      <div className="max-w-6xl">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="hidden md:flex items-center gap-3 text-[10px] uppercase tracking-[0.2em] text-secondary font-bold">
            <span className="w-8 h-px bg-outline-variant/40"></span>
            <span>Premium Series</span>
          </div>
        </div>

        <div className="relative overflow-hidden bg-surface" style={{ paddingBottom: "5rem!important" }}>
          <img
            alt={current.title}
            className="absolute inset-0 w-full h-full object-cover object-[center_35%] transition-all duration-500 ease-out opacity-100 scale-100"
            src={current.img}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-on-surface via-on-surface/30 to-transparent"></div>

          <div className="relative z-10 grid gap-8 p-6 md:p-10">
            <div className="bg-surface/85 backdrop-blur-md max-w-md">
              <label
                className="block text-[10px] uppercase tracking-[0.2em] text-secondary font-bold"
                htmlFor="model-select"
              ></label>
              <Select value={selected} onValueChange={setSelected}>
                <SelectTrigger id="model-select">
                  <SelectValue placeholder="Selecciona un modelo" />
                </SelectTrigger>
                <SelectContent>
                  {catalogModels.map((model) => (
                    <SelectItem key={model.id} value={model.id}>
                      {model.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col justify-end">
              <span className="inline-block px-3 py-1 bg-primary text-on-primary text-[10px] font-bold tracking-widest uppercase mb-4">
                SERIE PREMIUM
              </span>
              <h3 className="font-headline font-bold text-3xl md:text-5xl text-surface leading-[0.95] tracking-tight mb-4">
                {current.title}
              </h3>
              <p className="text-surface/80 text-sm md:text-base max-w-md mb-6">{current.desc}</p>
              <div className="flex flex-wrap gap-3">
                <button
                  className="group relative border border-surface/70 text-surface px-6 py-3 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 transition-all duration-200 hover:border-surface hover:bg-surface/10 active:scale-[0.98]"
                  onClick={() => navigate(`/request?model=${selected}`)}
                  type="button"
                >
                  <span className="absolute inset-0 bg-surface/10 opacity-0 transition-opacity duration-200 group-hover:opacity-100"></span>
                  <span className="relative">Configurar ahora</span>
                  <span className="material-symbols-outlined text-sm relative">arrow_forward_ios</span>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-surface-container-low">
          <img
            alt={`${current.title} ficha`}
            className="w-full rounded-[0.5rem] bg-surface/10 object-cover object-[center_40%] max-h-[320px]"
            src={current.panel}
          />
        </div>
      </div>
    </section>
  );
}

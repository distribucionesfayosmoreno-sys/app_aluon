import { useMemo, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";

const models = [
  {
    id: "classic",
    label: "Aluon Classic",
    title: "ALUON CLASSIC",
    tag: "FOUNDATION",
    desc: "Proven durability and timeless industrial design for standard architectural builds.",
    img: "https://lh3.googleusercontent.com/aida/ADBb0uiebGKLGBRT0wo14PE-WUeV_qVbkbDpHp2gdfiTeszcsMzOqpQMv-g75cW7FWliyxfRvaEVDdsYnCqCba5Xk86XB0YbxmsVIL9agxKb6n9FF1Z3swGn4D_CtZg5XWZpgsg8gNYbBH9U0aDkerLP1VaFJ1I1ID-emNqJhc9Cb8E5nEk-eGfpEn4BsCKvCfEFa6-3h8MWUPblJyMEPk7FnwfyzkNFlGcjwcZ42xAWrBqSuoLiTwhaxBcTtqchpjbECUbZyr1rO2m2Yw",
    panel: "/img/classic.png",
  },
  {
    id: "bisel",
    label: "Aluon Bisel",
    title: "ALUON BISEL",
    tag: "PRECISION EDGE",
    desc: "Sophisticated beveled edges providing refined shadow lines and depth.",
    img: "https://lh3.googleusercontent.com/aida/ADBb0uiPbn_jSaU9PGOgwMEM3OjYK2pBwIh32R6FQ2FaCWrxBjV59ACJWp8_QU6zpmLcLo75oU6H-pr4j71wShlbmiK3RkGRJF83SUr057i6XFltaDL-uc5x1Xkk4vY-mw_k4Sk0HeeZShCqLc9D3ol_HWnZIHlSOwQSkRRrZJBaelu80qkajVVlHyJOFn73PjB9o-AB79tqUf14JpKC_ReXkoFoj5a6Dd9Iu8WXA9r4kozi9v3-T99KzIyE9yY_j4vkDhkff5oNyBrv",
    panel: "/img/bisel.png",
  },
  {
    id: "inox",
    label: "Aluon Inox",
    title: "ALUON INOX",
    tag: "HYBRID CORE",
    desc: "Integrating stainless steel accents for enhanced structural integrity and aesthetics.",
    img: "https://lh3.googleusercontent.com/aida/ADBb0ui97HSSi8VFlm1VV6kbgOhJq8CXQzwN2POUScMEiP6OkmtQb2jvy365vX9Dh4c0P6pmSZfjHZTn48GMHoRsBrcCneKkXIEZ0bHHkq27izvHA7Qjs4U2d2-t0UupaFLH-vO6z4sgUk9KOAksggNPDWgDOcTluvR-QkADThdvlBzGWfYQ-X5FyTEJsPZtssIUfDuqa-j1R6-VkVmNHstmxvk-eKlBLRNKEZYqFb2-2P57xZZUhkxB2Xxkjunm0KG2uO59YGdjL0gTyQ",
    panel: "/img/inox.png",
  },
  {
    id: "veneciana",
    label: "Aluon Veneciana",
    title: "ALUON VENECIANA",
    tag: "DYNAMIC FLOW",
    desc: "Adjustable slat technology for light control and modern ventilation.",
    img: "https://lh3.googleusercontent.com/aida/ADBb0ujTgpa1xe0I908Lg-0eXCFPXENeDKIiYVVqY76iiZokdA3uH3wcWU6UlC0y6Pftiw-9_lXGrHYrSOQ-rmJMwjgCr8f2S-O8U3CDdfdqQYYTCTb9DYfMh1r9psLMemMkIc-PbqUi7ec9bhSwtYVcoM2EO32JaMJhzllcwon13wymXtxLxuCVZn1SiGQEmfV1olC3ihXakkgDt38hj-pA9KjyZ9cACNM6IEd_GvYiSy_gMa2zAwWKVaztqDtXpLIvmkCYJVMZatMKKQ",
    panel: "/img/veneciana.png",
  },
];

export default function Catalog() {
  const [selected, setSelected] = useState("classic");
  const current = useMemo(
    () => models.find((model) => model.id === selected) || models[0],
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
            className="absolute inset-0 w-full h-full object-cover transition-all duration-500 ease-out opacity-100 scale-100"
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
                  {models.map((model) => (
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
                <button className="group relative border border-surface/70 text-surface px-6 py-3 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 transition-all duration-200 hover:border-surface hover:bg-surface/10 active:scale-[0.98]">
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
            className="w-full rounded-[0.5rem] bg-surface/10"
            src={current.panel}
          />
        </div>
      </div>
    </section>
  );
}

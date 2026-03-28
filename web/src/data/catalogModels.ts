export type CatalogModel = {
  id: string;
  label: string;
  title: string;
  tag: string;
  desc: string;
  img: string;
  panel: string;
};

const baseUrl = import.meta.env.BASE_URL ?? "/";
const imgBase = `${baseUrl.replace(/\\/$/, "")}/img`;

export const catalogModels: CatalogModel[] = [
  {
    id: "classic",
    label: "Aluon Classic",
    title: "ALUON CLASSIC",
    tag: "FOUNDATION",
    desc: "Proven durability and timeless industrial design for standard architectural builds.",
    img: `${imgBase}/classic.png`,
    panel: `${imgBase}/classic.png`,
  },
  {
    id: "bisel",
    label: "Aluon Bisel",
    title: "ALUON BISEL",
    tag: "PRECISION EDGE",
    desc: "Sophisticated beveled edges providing refined shadow lines and depth.",
    img: `${imgBase}/bisel.png`,
    panel: `${imgBase}/bisel.png`,
  },
  {
    id: "inox",
    label: "Aluon Inox",
    title: "ALUON INOX",
    tag: "HYBRID CORE",
    desc: "Integrating stainless steel accents for enhanced structural integrity and aesthetics.",
    img: `${imgBase}/inox.png`,
    panel: `${imgBase}/inox.png`,
  },
  {
    id: "veneciana",
    label: "Aluon Veneciana",
    title: "ALUON VENECIANA",
    tag: "DYNAMIC FLOW",
    desc: "Adjustable slat technology for light control and modern ventilation.",
    img: `${imgBase}/veneciana.png`,
    panel: `${imgBase}/veneciana.png`,
  },
];

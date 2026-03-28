export type CatalogModel = {
  id: string;
  label: string;
  title: string;
  tag: string;
  desc: string;
  img: string;
  panel: string;
};

const classicImg = new URL("../assets/doors/aluonClassic.webp", import.meta.url).toString();
const biselImg = new URL("../assets/doors/aluonBisel.webp", import.meta.url).toString();
const inoxImg = new URL("../assets/doors/aluonInox.webp", import.meta.url).toString();
const venecianaImg = new URL("../assets/doors/aluonVeneciana.webp", import.meta.url).toString();
const classicPanel = new URL("../assets/doors/panels/classic.webp", import.meta.url).toString();
const biselPanel = new URL("../assets/doors/panels/bisel.webp", import.meta.url).toString();
const inoxPanel = new URL("../assets/doors/panels/inox.webp", import.meta.url).toString();
const venecianaPanel = new URL("../assets/doors/panels/veneciana.webp", import.meta.url).toString();

export const catalogModels: CatalogModel[] = [
  {
    id: "classic",
    label: "Aluon Classic",
    title: "ALUON CLASSIC",
    tag: "FOUNDATION",
    desc: "Proven durability and timeless industrial design for standard architectural builds.",
    img: classicImg,
    panel: classicPanel,
  },
  {
    id: "bisel",
    label: "Aluon Bisel",
    title: "ALUON BISEL",
    tag: "PRECISION EDGE",
    desc: "Sophisticated beveled edges providing refined shadow lines and depth.",
    img: biselImg,
    panel: biselPanel,
  },
  {
    id: "inox",
    label: "Aluon Inox",
    title: "ALUON INOX",
    tag: "HYBRID CORE",
    desc: "Integrating stainless steel accents for enhanced structural integrity and aesthetics.",
    img: inoxImg,
    panel: inoxPanel,
  },
  {
    id: "veneciana",
    label: "Aluon Veneciana",
    title: "ALUON VENECIANA",
    tag: "DYNAMIC FLOW",
    desc: "Adjustable slat technology for light control and modern ventilation.",
    img: venecianaImg,
    panel: venecianaPanel,
  },
];

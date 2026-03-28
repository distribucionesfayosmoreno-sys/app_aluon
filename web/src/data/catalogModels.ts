export type CatalogModel = {
  id: string;
  label: string;
  title: string;
  tag: string;
  desc: string;
  img: string;
  panel: string;
};

export const catalogModels: CatalogModel[] = [
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

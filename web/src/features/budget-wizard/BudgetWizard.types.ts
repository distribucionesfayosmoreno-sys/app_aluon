export type ProductCategory = 'PUERTA_PASO' | 'PUERTA_GARAJE' | 'VALLA' | 'REJA';
export type DoorModel = 'PREMIUM' | 'CLASSIC' | 'INOX' | 'VENECIANA';
export type DoorType = 'PEATONAL' | 'CORREDERA' | 'ABATIBLE_UNA' | 'ABATIBLE_DOS' | 'VALLA';

export type CatalogModel = {
  id: string;
  modelo: DoorModel;
  imagenModelo: string | null;
};

export type CatalogDoorProduct = {
  id: string;
  modeloId: string;
  producto: ProductCategory;
  imagenModelo: string | null;
};

export type CatalogVariant = {
  id: string;
  puertaId: string;
  variante: DoorType;
  imagenVariante: string | null;
};

export type ColorHex = `#${string}`;

export type Step =
  | 'MODELO'
  | 'PRODUCTO'
  | 'COLOR'
  | 'APERTURA'
  | 'MEDIDAS'
  | 'RESUMEN'
  | 'ACCIONES'
  | 'FINALIZADO';

export type QuoteItemDraft = {
  doorModel: DoorModel;
  doorType: DoorType;
  productCategory: ProductCategory;
  colorCode: ColorHex;
  primerRequired: boolean;
  widthMm: number;
  heightMm: number;
  floorClearanceMm: number;
  larguero: boolean;
  marcoSuperior: boolean;
  bisagras: boolean;
  porteroAutomatico: boolean;
};

export type QuoteResponse = {
  id: string;
  quoteNumber: string;
  customerId: string | null;
  customerName: string | null;
  contactEmail: string | null;
  contactWhatsapp: string | null;
  tariffCode: string;
  status: string;
  validationMode: string;
  channel: string;
  total: number;
  createdAt: string;
  validatedAt: string | null;
  sentAt: string | null;
  items: Array<{
    doorModel: DoorModel;
    doorType: DoorType;
    productCategory: ProductCategory;
    colorCode: ColorHex;
    primerRequired: boolean;
    openingVariant: DoorType;
    widthMm: number;
    heightMm: number;
    floorClearanceMm: number;
    larguero: boolean;
    marcoSuperior: boolean;
    bisagras: boolean;
    porteroAutomatico: boolean;
    m2: number;
    pricePerM2: number;
    lineTotal: number;
  }>;
};

export type WorkOrderRequestPayload = {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  modeloPuerta: string;
  anchoMm: number;
  altoMm: number;
  notes: string;
};

export type WorkOrderRequestResponse = {
  id: string;
  codigoOrden: string;
};

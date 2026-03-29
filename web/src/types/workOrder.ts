export type WorkOrderRequestPayload = {
  modeloPuerta: string;
  anchoMm: number;
  altoMm: number;
  notes: string;
};

export type WorkOrderRequestResponse = {
  id: string;
  codigoOrden: string;
};

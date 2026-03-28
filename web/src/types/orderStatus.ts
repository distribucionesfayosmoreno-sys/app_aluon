export type OrderWorkflowStep =
  | "INBOX"
  | "REQUEST"
  | "BUDGET"
  | "VALIDATION"
  | "DEV"
  | "PROD"
  | "FINAL";

export type OrderStatus =
  | "PENDIENTE_MATERIAL"
  | "EN_PRODUCCION"
  | "LISTO_MONTAJE"
  | "INSTALADA"
  | "FACTURADA";

export type OrderStatusDto = {
  id: string;
  codigoOrden: string;
  estado: OrderStatus;
  workflowStep: OrderWorkflowStep;
  customerName: string;
};

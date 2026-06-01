import { useCallback, useEffect, useMemo, useState } from "react";
import type { OrderStatusDto, OrderWorkflowStep } from "../types/orderStatus";
import { getApiUrl } from "../utils/api";

type LoadState = "idle" | "loading" | "success" | "error";

const requestSteps = new Set<OrderWorkflowStep>(["INBOX", "REQUEST"]);
const budgetSteps = new Set<OrderWorkflowStep>([
  "BUDGET",
  "VALIDATION",
  "DEV",
  "PROD",
  "FINAL",
]);

const stepLabels: Record<OrderWorkflowStep, string> = {
  INBOX: "Recepción",
  REQUEST: "Solicitud",
  BUDGET: "Presupuesto",
  VALIDATION: "Validación",
  DEV: "En taller",
  PROD: "En producción",
  FINAL: "Finalizada",
};

const normalizeWorkflowStep = (value: string): OrderWorkflowStep => {
  switch (value) {
    case "BANDEJA":
      return "INBOX";
    case "SOLICITUD":
      return "REQUEST";
    case "PRESUPUESTO":
      return "BUDGET";
    case "VALIDACION":
      return "VALIDATION";
    case "DESARROLLO":
      return "DEV";
    case "PRODUCCION":
      return "PROD";
    case "FINALIZACION":
      return "FINAL";
    default:
      return value as OrderWorkflowStep;
  }
};

export default function ClientStatus() {
  const [orders, setOrders] = useState<OrderStatusDto[]>([]);
  const [state, setState] = useState<LoadState>("idle");
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    try {
      setState("loading");
      setError("");
      const apiBase = getApiUrl();
      const endpoint = `${apiBase}/api/orders/status`;

      const response = await fetch(endpoint);
      if (!response.ok) {
        const message = await response.text();
        throw new Error(message || "No se pudo cargar el estado.");
      }
      const data = (await response.json()) as OrderStatusDto[];
      const normalized = data.map((order) => ({
        ...order,
        workflowStep: normalizeWorkflowStep(order.workflowStep),
      }));
      setOrders(normalized);
      setState("success");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error inesperado.");
      setState("error");
    }
  }, []);

  useEffect(() => {
    let isMounted = true;
    const loadSafe = async () => {
      if (!isMounted) return;
      await load();
    };
    loadSafe();
    return () => {
      isMounted = false;
    };
  }, [load]);

  const requestOrders = useMemo(
    () => orders.filter((order) => requestSteps.has(order.workflowStep)),
    [orders]
  );
  const budgetOrders = useMemo(
    () => orders.filter((order) => budgetSteps.has(order.workflowStep)),
    [orders]
  );

  return (
    <section className="bg-surface-container-low min-h-screen py-6 px-4 md:px-16">
      <div className="max-w-5xl mx-auto space-y-6">
        <header className="bg-surface rounded-2xl p-5 border border-outline-variant/30 flex items-center justify-between shadow-sm">
          <div>
            <div className="text-[10px] font-black uppercase tracking-[0.25em] text-[#a92f32]">Estado</div>
            <h2 className="font-headline font-black text-lg text-on-surface mt-0.5">Mis Solicitudes y Presupuestos</h2>
          </div>
          <div className="hidden md:flex flex-col items-end select-none bg-surface-container border border-outline-variant/20 py-1 px-2.5 rounded-lg">
            <span className="text-[9px] font-black tracking-[0.15em] text-[#a92f32]">ALUON</span>
            <span className="text-[7px] font-semibold text-secondary uppercase tracking-wider animate-pulse" style={{ fontSize: '7px', lineHeight: '1.1' }}>Aluminio Soldado</span>
          </div>
        </header>

        <div className="bg-surface rounded-3xl p-5 md:p-6 border border-outline-variant/20 shadow-md">
          <p className="text-sm text-secondary mb-6 max-w-2xl">
            Revisa el avance de tus solicitudes, presupuestos y producción. Si necesitas ajustar datos, contacta a tu
            asesor antes de la validación.
          </p>

        {state === "loading" && (
          <div className="bg-surface p-6 text-secondary text-sm">Cargando estados...</div>
        )}
        {state === "error" && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 text-sm font-bold flex items-center justify-between">
            <span>{error || "No se pudo cargar el estado."}</span>
            <button
              className="text-xs font-bold uppercase tracking-[0.2em] text-red-700"
              type="button"
              onClick={load}
            >
              Reintentar
            </button>
          </div>
        )}

        {state === "success" && (
          <div className="grid gap-6 md:grid-cols-2">
            <div className="bg-surface-container p-6 rounded-2xl border border-outline-variant/20">
              <div className="flex items-center justify-between mb-4 border-b border-outline-variant/20 pb-2">
                <span className="text-[10px] font-black uppercase tracking-[0.25em] text-[#a92f32]">Solicitudes</span>
                <span className="text-xs text-secondary font-medium">{requestOrders.length} total</span>
              </div>

              {requestOrders.length === 0 ? (
                <div className="text-sm text-secondary space-y-3">
                  <p>No hay solicitudes activas.</p>
                  <a
                    href="/request"
                    className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-primary"
                  >
                    Crear solicitud
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </a>
                </div>
              ) : (
                <div className="divide-y divide-outline-variant/20">
                  {requestOrders.map((order) => (
                    <div key={order.id} className="flex items-center justify-between gap-4 py-3">
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-secondary font-bold">
                          <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden="true" />
                          {order.codigoOrden}
                        </div>
                        <div className="text-xs text-secondary uppercase tracking-[0.2em] mt-1">
                          {stepLabels[order.workflowStep]}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="bg-surface-container p-6 rounded-2xl border border-outline-variant/20">
              <div className="flex items-center justify-between mb-4 border-b border-outline-variant/20 pb-2">
                <span className="text-[10px] font-black uppercase tracking-[0.25em] text-[#a92f32]">Presupuestos</span>
                <span className="text-xs text-secondary font-medium">{budgetOrders.length} total</span>
              </div>

              {budgetOrders.length === 0 ? (
                <div className="text-sm text-secondary">
                  Aún no hay presupuestos en curso.
                </div>
              ) : (
                <div className="divide-y divide-outline-variant/20">
                  {budgetOrders.map((order) => (
                    <div key={order.id} className="flex items-center justify-between gap-4 py-3">
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-secondary font-bold">
                          <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden="true" />
                          {order.codigoOrden}
                        </div>
                        <div className="text-xs text-secondary uppercase tracking-[0.2em] mt-1">
                          {stepLabels[order.workflowStep]}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
        </div>
      </div>
    </section>
  );
}

import { useEffect, useMemo, useState } from "react";
import type { OrderStatusDto } from "../types/orderStatus";

type LoadState = "idle" | "loading" | "success" | "error";

const allowedSteps = new Set(["INBOX", "REQUEST"]);

export default function RequestsInbox() {
  const [orders, setOrders] = useState<OrderStatusDto[]>([]);
  const [state, setState] = useState<LoadState>("idle");
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;
    const load = async () => {
      try {
        setState("loading");
        const apiBase = (import.meta.env.VITE_API_URL as string | undefined) ?? "";
        const trimmedBase = apiBase.replace(/\/$/, "");
        const endpoint = `${trimmedBase}/api/orders/status`;
        const response = await fetch(endpoint);
        if (!response.ok) {
          const message = await response.text();
          throw new Error(message || "No se pudo cargar la bandeja.");
        }
        const data = (await response.json()) as OrderStatusDto[];
        if (isMounted) {
          setOrders(data);
          setState("success");
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : "Error inesperado.");
          setState("error");
        }
      }
    };
    load();
    return () => {
      isMounted = false;
    };
  }, []);

  const inboxOrders = useMemo(
    () => orders.filter((order) => allowedSteps.has(order.workflowStep)),
    [orders]
  );

  return (
    <section className="bg-surface-container-low py-10 px-4 md:px-16">
      <div className="max-w-5xl mx-auto space-y-6">
        <div>
          <div className="text-xs uppercase tracking-[0.3em] text-secondary font-bold mb-2">Producción · Bandeja</div>
          <h2 className="font-headline font-bold text-3xl md:text-4xl">Bandeja de solicitudes</h2>
          <p className="text-secondary mt-2">
            Aquí aparecen las solicitudes nuevas generadas desde la app móvil.
          </p>
        </div>

        {state === "loading" && (
          <div className="bg-surface p-6 text-secondary text-sm">Cargando solicitudes...</div>
        )}
        {state === "error" && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 text-sm font-bold">
            {error || "No se pudo cargar la bandeja."}
          </div>
        )}

        {state === "success" && (
          <div className="bg-surface p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs uppercase tracking-[0.2em] text-secondary font-bold">
                Solicitudes en bandeja
              </span>
              <span className="text-xs text-secondary">{inboxOrders.length} total</span>
            </div>

            {inboxOrders.length === 0 ? (
              <div className="text-sm text-secondary">No hay solicitudes pendientes.</div>
            ) : (
              <div className="space-y-3">
                {inboxOrders.map((order) => (
                  <div
                    key={order.id}
                    className="flex flex-wrap items-center justify-between gap-4 border border-outline-variant/30 rounded-lg px-4 py-3"
                  >
                    <div>
                      <div className="text-xs uppercase tracking-[0.2em] text-secondary font-bold">
                        {order.codigoOrden}
                      </div>
                      <div className="font-headline font-bold text-lg">{order.customerName}</div>
                    </div>
                    <div className="text-xs uppercase tracking-[0.2em] text-secondary font-bold">
                      {order.workflowStep === "INBOX" ? "INBOX" : "REQUEST"}
                    </div>
                    <span className="inline-flex items-center px-2 py-1 text-[10px] font-bold uppercase tracking-widest bg-primary/10 text-primary">
                      {order.estado.replaceAll("_", " ")}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

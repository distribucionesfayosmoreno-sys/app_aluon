import { useMemo, useState, type FormEvent } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { catalogModels } from "../data/catalogModels";
import type { WorkOrderRequestResponse } from "../types/workOrder";
import { getAuth } from "../utils/auth";

type SubmissionStatus = "idle" | "submitting" | "success" | "error";

export default function WorkOrderRequest() {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = useMemo(() => new URLSearchParams(location.search), [location.search]);
  const selectedModelId = queryParams.get("model");
  const selectedModel = useMemo(
    () => catalogModels.find((model) => model.id === selectedModelId) ?? catalogModels[0],
    [selectedModelId]
  );

  const [widthMm, setWidthMm] = useState("");
  const [heightMm, setHeightMm] = useState("");
  const [notes, setNotes] = useState("");
  const [attachments, setAttachments] = useState<FileList | null>(null);
  const [status, setStatus] = useState<SubmissionStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [orderCode, setOrderCode] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage("");

    const normalizedModel = selectedModel?.label ?? "ALUON";
    const auth = getAuth();
    const customerId = auth?.customerId;

    if (!customerId) {
      setErrorMessage("No se pudo identificar tu cuenta. Vuelve a iniciar sesión.");
      return;
    }
    const parsedWidth = Number(widthMm);
    const parsedHeight = Number(heightMm);

    if (!Number.isFinite(parsedWidth) || parsedWidth <= 0) {
      setErrorMessage("La anchura debe ser mayor que 0.");
      return;
    }
    if (!Number.isFinite(parsedHeight) || parsedHeight <= 0) {
      setErrorMessage("La altura debe ser mayor que 0.");
      return;
    }

    const payload = new FormData();
    if (customerId) {
      payload.append("customerId", customerId);
    }
    payload.append("modeloPuerta", normalizedModel);
    payload.append("anchoMm", String(parsedWidth));
    payload.append("altoMm", String(parsedHeight));
    payload.append("notes", notes.trim());

    if (attachments) {
      Array.from(attachments).forEach((file) => payload.append("attachments", file));
    }

    try {
      setStatus("submitting");
      const apiBase = (import.meta.env.VITE_API_URL as string | undefined) ?? "";
      const trimmedBase = apiBase.replace(/\/$/, "");
      const endpoint = `${trimmedBase}/api/orders/requests`;
      const response = await fetch(endpoint, {
        method: "POST",
        body: payload,
      });

      if (!response.ok) {
        const message = await response.text();
        throw new Error(message || "No se pudo enviar la solicitud.");
      }

      const data = (await response.json()) as WorkOrderRequestResponse;
      setOrderCode(data.codigoOrden);
      setStatus("success");
    } catch (error) {
      setStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "Error inesperado.");
    }
  };

  return (
    <section className="bg-surface-container-low py-10 px-4 md:px-16">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-xs uppercase tracking-[0.3em] text-secondary font-bold mb-2">Configuración · Medidas</div>
            <h2 className="font-headline font-bold text-3xl md:text-4xl">Formulario de solicitud</h2>
            <p className="text-secondary mt-2 max-w-xl">
              Completa las medidas y adjunta los archivos necesarios. Enviaremos tu solicitud directamente a la bandeja
              de órdenes de trabajo.
            </p>
          </div>
          <button
            className="text-xs uppercase tracking-[0.2em] font-bold text-primary hidden md:inline-flex items-center gap-2"
            onClick={() => navigate("/")}
            type="button"
          >
            Volver al catálogo
            <span className="material-symbols-outlined text-sm">arrow_back</span>
          </button>
        </div>

        <div className="bg-surface p-6 md:p-8 grid grid-cols-1 md:grid-cols-[1.2fr_1fr] gap-6 items-center">
          <div>
            <div className="text-[10px] uppercase tracking-[0.3em] text-secondary font-bold">Modelo seleccionado</div>
            <h3 className="font-headline font-bold text-2xl mt-3">{selectedModel?.title}</h3>
            <p className="text-secondary mt-3 text-sm">{selectedModel?.desc}</p>
          </div>
          <div className="relative h-48 rounded-xl overflow-hidden">
            <img
              alt={selectedModel?.title ?? "Modelo ALUON"}
              className="absolute inset-0 w-full h-full object-cover object-[center_35%]"
              src={selectedModel?.img}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-on-surface/70 via-on-surface/20 to-transparent"></div>
            <div className="absolute bottom-3 left-3 text-surface text-xs uppercase tracking-[0.3em] font-bold">
              {selectedModel?.tag}
            </div>
          </div>
        </div>

        <form className="bg-surface p-6 md:p-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <div className="text-[10px] uppercase tracking-[0.3em] text-secondary font-bold mb-3">Medidas (mm)</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                className="bg-surface-container-low p-3 text-sm"
                placeholder="Anchura total"
                inputMode="numeric"
                value={widthMm}
                onChange={(event) => setWidthMm(event.target.value)}
                required
              />
              <input
                className="bg-surface-container-low p-3 text-sm"
                placeholder="Altura total"
                inputMode="numeric"
                value={heightMm}
                onChange={(event) => setHeightMm(event.target.value)}
                required
              />
            </div>
            <p className="text-xs text-secondary mt-2">Añade otras indicaciones en el campo de notas.</p>
          </div>

          <textarea
            className="bg-surface-container-low p-3 text-sm w-full min-h-[120px]"
            placeholder="Notas adicionales"
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
          />

          <div className="flex flex-wrap items-center gap-3">
            <label className="inline-flex items-center gap-2 px-4 py-2 bg-surface-container-high text-on-surface text-xs font-bold uppercase tracking-widest cursor-pointer">
              <span className="material-symbols-outlined text-sm">attach_file</span>
              Adjuntar archivos
              <input
                className="hidden"
                type="file"
                multiple
                onChange={(event) => setAttachments(event.target.files)}
              />
            </label>
            {attachments && attachments.length > 0 ? (
              <span className="text-xs text-secondary">{attachments.length} archivo(s) seleccionado(s)</span>
            ) : (
              <span className="text-xs text-secondary">Puedes adjuntar planos o referencias.</span>
            )}
          </div>

          {status === "success" ? (
            <div className="bg-primary/10 border border-primary/30 text-primary px-4 py-3 text-sm font-bold">
              Solicitud enviada correctamente. Código: {orderCode}
            </div>
          ) : null}
          {status === "error" ? (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 text-sm font-bold">
              {errorMessage || "No se pudo enviar la solicitud."}
            </div>
          ) : null}

          <div className="flex flex-wrap items-center gap-4">
            <button
              className="bg-gradient-to-br from-primary to-primary-container text-on-primary px-6 py-3 text-xs font-bold uppercase tracking-widest flex items-center gap-3 disabled:opacity-60"
              disabled={status === "submitting"}
              type="submit"
            >
              {status === "submitting" ? "Enviando..." : "Enviar solicitud"}
              <span className="material-symbols-outlined text-sm">send</span>
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

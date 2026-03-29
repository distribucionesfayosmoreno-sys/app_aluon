import { useState } from "react";
import { Key, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";

type Step = "request" | "reset" | "done";

export default function ForgotPasswordPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>("request");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const apiBase = (import.meta.env.VITE_API_URL as string | undefined) ?? "";
  const trimmedBase = apiBase.replace(/\/$/, "");

  const requestReset = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email.trim()) {
      setErrorMessage("El correo electrónico es obligatorio.");
      return;
    }
    setErrorMessage("");
    setStatus("submitting");
    try {
      const response = await fetch(`${trimmedBase}/api/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });
      if (!response.ok) {
        const message = await response.text();
        throw new Error(message || "No se pudo enviar el correo.");
      }
      setStatus("success");
      setStep("reset");
    } catch (error) {
      setStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "Error inesperado.");
    }
  };

  const resetPassword = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!token.trim()) {
      setErrorMessage("El código es obligatorio.");
      return;
    }
    if (!password.trim()) {
      setErrorMessage("La contraseña es obligatoria.");
      return;
    }
    if (password.trim().length < 8) {
      setErrorMessage("La contraseña debe tener al menos 8 caracteres.");
      return;
    }
    if (password.trim() !== confirm.trim()) {
      setErrorMessage("Las contraseñas no coinciden.");
      return;
    }
    setErrorMessage("");
    setStatus("submitting");
    try {
      const response = await fetch(`${trimmedBase}/api/auth/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token: token.trim(),
          password: password.trim(),
        }),
      });
      if (!response.ok) {
        const message = await response.text();
        throw new Error(message || "No se pudo restablecer la contraseña.");
      }
      setStatus("success");
      setStep("done");
    } catch (error) {
      setStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "Error inesperado.");
    }
  };

  return (
    <main
      className="min-h-screen bg-[var(--ag-background)] text-on-surface"
      style={{
        "--ag-primary": "var(--ag-primary, #a92f32)",
        "--ag-secondary": "var(--ag-secondary, #605b77)",
        "--ag-background": "var(--ag-background, #fcf9f8)",
        "--ag-surface": "var(--ag-surface, #ffffff)",
        "--ag-on-primary": "var(--ag-on-primary, #ffffff)",
      }}
    >
      <section className="relative flex min-h-screen items-center justify-center px-5 py-10 sm:px-10">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-surface-container-low via-background to-surface-container-low"></div>

        <div className="relative w-full max-w-md rounded-2xl bg-[var(--ag-surface)]/95 p-6 shadow-[0_24px_60px_-45px_rgba(0,0,0,0.35)] backdrop-blur sm:p-8">
          <div className="mb-6 flex justify-center">
            <img alt="ALUON" src="/assets/logo.png" className="h-16 w-auto" />
          </div>
          <header className="mb-6 text-center">
            <p className="text-xs uppercase tracking-[0.3em] text-secondary">Recuperación</p>
            <h1 className="mt-2 text-2xl font-headline font-semibold text-on-surface">
              {step === "request" ? "Restablecer contraseña" : step === "reset" ? "Introduce el código" : "Contraseña actualizada"}
            </h1>
            <p className="mt-2 text-sm text-on-surface/70">
              {step === "request"
                ? "Te enviaremos un código a tu correo."
                : step === "reset"
                  ? "Revisa tu email e introduce el código."
                  : "Ya puedes iniciar sesión con tu nueva contraseña."}
            </p>
          </header>

          {errorMessage ? (
            <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
              {errorMessage}
            </div>
          ) : null}

          {step === "request" ? (
            <form className="space-y-5" onSubmit={requestReset}>
              <div className="space-y-2">
                <label className="sr-only" htmlFor="forgot-email">Correo electrónico</label>
                <div className="flex items-center gap-3 rounded-xl border border-outline-variant/60 bg-surface-container-low px-4 py-3 focus-within:border-[var(--ag-primary)] focus-within:ring-2 focus-within:ring-[var(--ag-primary)]/20">
                  <Mail className="h-4 w-4 text-secondary" aria-hidden="true" />
                  <input
                    id="forgot-email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Correo electrónico"
                    aria-label="Correo electrónico"
                    className="w-full bg-transparent text-sm text-on-surface placeholder:text-on-surface/40 focus:outline-none"
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={status === "submitting"}
                className="w-full rounded-xl bg-[var(--ag-primary)] py-3 text-sm font-semibold text-[var(--ag-on-primary)] shadow-[0_12px_30px_-18px_rgba(169,47,50,0.8)] transition hover:brightness-105 active:translate-y-[1px]"
              >
                {status === "submitting" ? "Enviando..." : "Enviar código"}
              </button>
            </form>
          ) : step === "reset" ? (
            <form className="space-y-5" onSubmit={resetPassword}>
              <div className="space-y-2">
                <label className="sr-only" htmlFor="reset-token">Código</label>
                <div className="flex items-center gap-3 rounded-xl border border-outline-variant/60 bg-surface-container-low px-4 py-3 focus-within:border-[var(--ag-primary)] focus-within:ring-2 focus-within:ring-[var(--ag-primary)]/20">
                  <Key className="h-4 w-4 text-secondary" aria-hidden="true" />
                  <input
                    id="reset-token"
                    type="text"
                    value={token}
                    onChange={(e) => setToken(e.target.value)}
                    placeholder="Código de recuperación"
                    aria-label="Código de recuperación"
                    className="w-full bg-transparent text-sm text-on-surface placeholder:text-on-surface/40 focus:outline-none"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="sr-only" htmlFor="reset-password">Nueva contraseña</label>
                <div className="flex items-center gap-3 rounded-xl border border-outline-variant/60 bg-surface-container-low px-4 py-3 focus-within:border-[var(--ag-primary)] focus-within:ring-2 focus-within:ring-[var(--ag-primary)]/20">
                  <Key className="h-4 w-4 text-secondary" aria-hidden="true" />
                  <input
                    id="reset-password"
                    type="password"
                    autoComplete="new-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Nueva contraseña"
                    aria-label="Nueva contraseña"
                    className="w-full bg-transparent text-sm text-on-surface placeholder:text-on-surface/40 focus:outline-none"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="sr-only" htmlFor="reset-confirm">Confirmar contraseña</label>
                <div className="flex items-center gap-3 rounded-xl border border-outline-variant/60 bg-surface-container-low px-4 py-3 focus-within:border-[var(--ag-primary)] focus-within:ring-2 focus-within:ring-[var(--ag-primary)]/20">
                  <Key className="h-4 w-4 text-secondary" aria-hidden="true" />
                  <input
                    id="reset-confirm"
                    type="password"
                    autoComplete="new-password"
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    placeholder="Repite la contraseña"
                    aria-label="Confirmar contraseña"
                    className="w-full bg-transparent text-sm text-on-surface placeholder:text-on-surface/40 focus:outline-none"
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={status === "submitting"}
                className="w-full rounded-xl bg-[var(--ag-primary)] py-3 text-sm font-semibold text-[var(--ag-on-primary)] shadow-[0_12px_30px_-18px_rgba(169,47,50,0.8)] transition hover:brightness-105 active:translate-y-[1px]"
              >
                {status === "submitting" ? "Actualizando..." : "Actualizar contraseña"}
              </button>
            </form>
          ) : (
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="w-full rounded-xl bg-[var(--ag-primary)] py-3 text-sm font-semibold text-[var(--ag-on-primary)] shadow-[0_12px_30px_-18px_rgba(169,47,50,0.8)] transition hover:brightness-105 active:translate-y-[1px]"
            >
              Volver al login
            </button>
          )}
        </div>
      </section>
    </main>
  );
}

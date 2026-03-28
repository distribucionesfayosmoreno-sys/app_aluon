import { useState } from "react";
import { Apple, Chrome, Facebook, Mail, Phone } from "lucide-react";
import { useNavigate } from "react-router-dom";

type LoginFormState = {
  email: string;
  telefonoWhatsapp: string;
};

export default function LoginPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState<LoginFormState>({
    email: "",
    telefonoWhatsapp: "",
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange =
    (field: keyof LoginFormState) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({ ...prev, [field]: event.target.value }));
      if (errorMessage) {
        setErrorMessage("");
      }
    };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!form.email.trim()) {
      setErrorMessage("El correo electrónico es obligatorio.");
      return;
    }
    if (!form.telefonoWhatsapp.trim()) {
      setErrorMessage("El teléfono de WhatsApp es obligatorio.");
      return;
    }

    try {
      setStatus("submitting");
      const apiBase = (import.meta.env.VITE_API_URL as string | undefined) ?? "";
      const trimmedBase = apiBase.replace(/\/$/, "");
      const endpoint = `${trimmedBase}/api/auth/login`;
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.email.trim(),
          telefonoWhatsapp: form.telefonoWhatsapp.trim(),
        }),
      });
      if (!response.ok) {
        const message = await response.text();
        throw new Error(message || "No se pudo iniciar sesión.");
      }
      setStatus("success");
      navigate("/status");
    } catch (error) {
      setStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "Error inesperado.");
    }
  };

  return (
    <main
      className="min-h-screen bg-[var(--ag-background)] text-on-surface"
      style={{
        // Variables listas para inyectar la paleta corporativa (Antigravity theme tokens).
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
          <header className="mb-8 text-center">
            <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-[var(--ag-primary)]/10"></div>
            <p className="text-xs uppercase tracking-[0.3em] text-secondary">
              Bienvenida
            </p>
            <h1 className="mt-2 text-3xl font-headline font-semibold text-on-surface">
              ¡Hola de nuevo!
            </h1>
            <p className="mt-2 text-sm text-on-surface/70">
              Accede para continuar con tu experiencia.
            </p>
          </header>

          {errorMessage ? (
            <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
              {errorMessage}
            </div>
          ) : null}

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label className="sr-only" htmlFor="login-email">
                Correo electrónico
              </label>
              <div className="flex items-center gap-3 rounded-xl border border-outline-variant/60 bg-surface-container-low px-4 py-3 focus-within:border-[var(--ag-primary)] focus-within:ring-2 focus-within:ring-[var(--ag-primary)]/20">
                <Mail className="h-4 w-4 text-secondary" aria-hidden="true" />
                <input
                  id="login-email"
                  type="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={handleChange("email")}
                  placeholder="Correo electrónico"
                  aria-label="Correo electrónico"
                  className="w-full bg-transparent text-sm text-on-surface placeholder:text-on-surface/40 focus:outline-none"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="sr-only" htmlFor="login-phone">
                Teléfono WhatsApp
              </label>
              <div className="flex items-center gap-3 rounded-xl border border-outline-variant/60 bg-surface-container-low px-4 py-3 focus-within:border-[var(--ag-primary)] focus-within:ring-2 focus-within:ring-[var(--ag-primary)]/20">
                <Phone className="h-4 w-4 text-secondary" aria-hidden="true" />
                <input
                  id="login-phone"
                  type="tel"
                  autoComplete="tel"
                  value={form.telefonoWhatsapp}
                  onChange={handleChange("telefonoWhatsapp")}
                  placeholder="Teléfono WhatsApp"
                  aria-label="Teléfono WhatsApp"
                  className="w-full bg-transparent text-sm text-on-surface placeholder:text-on-surface/40 focus:outline-none"
                />
              </div>
              <div className="text-right">
                <a
                  href="#"
                  className="text-xs font-medium text-[var(--ag-primary)] hover:text-[var(--ag-primary)]/80"
                >
                  ¿Necesitas ayuda?
                </a>
              </div>
            </div>

            <button
              type="submit"
              disabled={status === "submitting"}
              className="w-full rounded-xl bg-[var(--ag-primary)] py-3 text-sm font-semibold text-[var(--ag-on-primary)] shadow-[0_12px_30px_-18px_rgba(169,47,50,0.8)] transition hover:brightness-105 active:translate-y-[1px]"
            >
              {status === "submitting" ? "Accediendo..." : "Iniciar sesión"}
            </button>
          </form>

          <div className="my-6 flex items-center gap-4 text-xs text-on-surface/60">
            <span className="h-px flex-1 bg-outline-variant/60"></span>
            <span>O continúa con</span>
            <span className="h-px flex-1 bg-outline-variant/60"></span>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            <button
              type="button"
              className="flex items-center justify-center gap-2 rounded-xl border border-outline-variant/70 bg-surface-container-low py-2 text-xs font-semibold text-on-surface transition hover:border-[var(--ag-primary)]/60"
              aria-label="Iniciar sesión con Google"
              onClick={() => {
                // TODO: Conectar autenticación con Google.
              }}
            >
              <Chrome className="h-4 w-4" aria-hidden="true" />
              Google
            </button>
            <button
              type="button"
              className="flex items-center justify-center gap-2 rounded-xl border border-outline-variant/70 bg-surface-container-low py-2 text-xs font-semibold text-on-surface transition hover:border-[var(--ag-primary)]/60"
              aria-label="Iniciar sesión con Apple"
              onClick={() => {
                // TODO: Conectar autenticación con Apple.
              }}
            >
              <Apple className="h-4 w-4" aria-hidden="true" />
              Apple
            </button>
            <button
              type="button"
              className="flex items-center justify-center gap-2 rounded-xl border border-outline-variant/70 bg-surface-container-low py-2 text-xs font-semibold text-on-surface transition hover:border-[var(--ag-primary)]/60"
              aria-label="Iniciar sesión con Facebook"
              onClick={() => {
                // TODO: Conectar autenticación con Facebook.
              }}
            >
              <Facebook className="h-4 w-4" aria-hidden="true" />
              Facebook
            </button>
          </div>

          <p className="mt-8 text-center text-xs text-on-surface/70">
            ¿No tienes cuenta?{" "}
            <a
              href="/register"
              className="font-semibold text-[var(--ag-primary)] hover:text-[var(--ag-primary)]/80"
            >
              Regístrate aquí
            </a>
          </p>
        </div>
      </section>
    </main>
  );
}

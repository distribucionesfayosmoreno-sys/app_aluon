import { useState } from "react";
import {
  Apple,
  Chrome,
  Eye,
  EyeOff,
  Facebook,
  Lock,
  Mail,
} from "lucide-react";

type LoginFormState = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const [form, setForm] = useState<LoginFormState>({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange =
    (field: keyof LoginFormState) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({ ...prev, [field]: event.target.value }));
    };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // TODO: Conectar aquí la lógica de autenticación con email/contraseña.
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
              <label className="sr-only" htmlFor="login-password">
                Contraseña
              </label>
              <div className="flex items-center gap-3 rounded-xl border border-outline-variant/60 bg-surface-container-low px-4 py-3 focus-within:border-[var(--ag-primary)] focus-within:ring-2 focus-within:ring-[var(--ag-primary)]/20">
                <Lock className="h-4 w-4 text-secondary" aria-hidden="true" />
                <input
                  id="login-password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  value={form.password}
                  onChange={handleChange("password")}
                  placeholder="Contraseña"
                  aria-label="Contraseña"
                  className="w-full bg-transparent text-sm text-on-surface placeholder:text-on-surface/40 focus:outline-none"
                />
                <button
                  type="button"
                  className="rounded-full p-1 text-secondary transition hover:text-on-surface"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={
                    showPassword ? "Ocultar contraseña" : "Mostrar contraseña"
                  }
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" aria-hidden="true" />
                  ) : (
                    <Eye className="h-4 w-4" aria-hidden="true" />
                  )}
                </button>
              </div>
              <div className="text-right">
                <a
                  href="#"
                  className="text-xs font-medium text-[var(--ag-primary)] hover:text-[var(--ag-primary)]/80"
                >
                  ¿Olvidaste tu contraseña?
                </a>
              </div>
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-[var(--ag-primary)] py-3 text-sm font-semibold text-[var(--ag-on-primary)] shadow-[0_12px_30px_-18px_rgba(169,47,50,0.8)] transition hover:brightness-105 active:translate-y-[1px]"
            >
              Iniciar sesión
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
              href="#"
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

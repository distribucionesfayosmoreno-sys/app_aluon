import { useState } from "react";
import { Eye, EyeOff, Lock, Mail, User } from "lucide-react";

type RegisterFormState = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export default function RegisterPage() {
  const [form, setForm] = useState<RegisterFormState>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [formError, setFormError] = useState("");

  const handleChange =
    (field: keyof RegisterFormState) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({ ...prev, [field]: event.target.value }));
      if (formError) {
        setFormError("");
      }
    };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!form.name.trim()) {
      setFormError("El nombre es obligatorio.");
      return;
    }
    if (!form.email.trim()) {
      setFormError("El correo electrónico es obligatorio.");
      return;
    }
    if (form.password.length < 8) {
      setFormError("La contraseña debe tener al menos 8 caracteres.");
      return;
    }
    if (form.password !== form.confirmPassword) {
      setFormError("Las contraseñas no coinciden.");
      return;
    }

    // TODO: Conectar aquí la lógica de registro con email/contraseña.
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
          <header className="mb-8 text-center">
            <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-[var(--ag-primary)]/10"></div>
            <p className="text-xs uppercase tracking-[0.3em] text-secondary">
              Registro
            </p>
            <h1 className="mt-2 text-3xl font-headline font-semibold text-on-surface">
              Crea tu cuenta
            </h1>
            <p className="mt-2 text-sm text-on-surface/70">
              Te llevará menos de un minuto.
            </p>
          </header>

          {formError ? (
            <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
              {formError}
            </div>
          ) : null}

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label className="sr-only" htmlFor="register-name">
                Nombre completo
              </label>
              <div className="flex items-center gap-3 rounded-xl border border-outline-variant/60 bg-surface-container-low px-4 py-3 focus-within:border-[var(--ag-primary)] focus-within:ring-2 focus-within:ring-[var(--ag-primary)]/20">
                <User className="h-4 w-4 text-secondary" aria-hidden="true" />
                <input
                  id="register-name"
                  type="text"
                  autoComplete="name"
                  value={form.name}
                  onChange={handleChange("name")}
                  placeholder="Nombre completo"
                  aria-label="Nombre completo"
                  className="w-full bg-transparent text-sm text-on-surface placeholder:text-on-surface/40 focus:outline-none"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="sr-only" htmlFor="register-email">
                Correo electrónico
              </label>
              <div className="flex items-center gap-3 rounded-xl border border-outline-variant/60 bg-surface-container-low px-4 py-3 focus-within:border-[var(--ag-primary)] focus-within:ring-2 focus-within:ring-[var(--ag-primary)]/20">
                <Mail className="h-4 w-4 text-secondary" aria-hidden="true" />
                <input
                  id="register-email"
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
              <label className="sr-only" htmlFor="register-password">
                Contraseña
              </label>
              <div className="flex items-center gap-3 rounded-xl border border-outline-variant/60 bg-surface-container-low px-4 py-3 focus-within:border-[var(--ag-primary)] focus-within:ring-2 focus-within:ring-[var(--ag-primary)]/20">
                <Lock className="h-4 w-4 text-secondary" aria-hidden="true" />
                <input
                  id="register-password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
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
                  aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" aria-hidden="true" />
                  ) : (
                    <Eye className="h-4 w-4" aria-hidden="true" />
                  )}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <label className="sr-only" htmlFor="register-confirm-password">
                Confirmar contraseña
              </label>
              <div className="flex items-center gap-3 rounded-xl border border-outline-variant/60 bg-surface-container-low px-4 py-3 focus-within:border-[var(--ag-primary)] focus-within:ring-2 focus-within:ring-[var(--ag-primary)]/20">
                <Lock className="h-4 w-4 text-secondary" aria-hidden="true" />
                <input
                  id="register-confirm-password"
                  type={showConfirm ? "text" : "password"}
                  autoComplete="new-password"
                  value={form.confirmPassword}
                  onChange={handleChange("confirmPassword")}
                  placeholder="Confirma tu contraseña"
                  aria-label="Confirmar contraseña"
                  className="w-full bg-transparent text-sm text-on-surface placeholder:text-on-surface/40 focus:outline-none"
                />
                <button
                  type="button"
                  className="rounded-full p-1 text-secondary transition hover:text-on-surface"
                  onClick={() => setShowConfirm((prev) => !prev)}
                  aria-label={showConfirm ? "Ocultar contraseña" : "Mostrar contraseña"}
                >
                  {showConfirm ? (
                    <EyeOff className="h-4 w-4" aria-hidden="true" />
                  ) : (
                    <Eye className="h-4 w-4" aria-hidden="true" />
                  )}
                </button>
              </div>
              <p className="text-xs text-on-surface/60">
                Usa al menos 8 caracteres con una combinación segura.
              </p>
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-[var(--ag-primary)] py-3 text-sm font-semibold text-[var(--ag-on-primary)] shadow-[0_12px_30px_-18px_rgba(169,47,50,0.8)] transition hover:brightness-105 active:translate-y-[1px]"
            >
              Crear cuenta
            </button>
          </form>

          <p className="mt-8 text-center text-xs text-on-surface/70">
            ¿Ya tienes cuenta?{" "}
            <a
              href="/login"
              className="font-semibold text-[var(--ag-primary)] hover:text-[var(--ag-primary)]/80"
            >
              Inicia sesión
            </a>
          </p>
        </div>
      </section>
    </main>
  );
}

import { useState } from "react";
import { Key, Mail, MapPin, Phone, Store, User } from "lucide-react";

type RegistrationFormState = {
  nombreComercial: string;
  razonSocial: string;
  personaContacto: string;
  email: string;
  telefonoWhatsapp: string;
  password: string;
  direccion: string;
  cp: string;
  poblacion: string;
  provincia: string;
  pais: string;
};

export default function RegisterPage() {
  const [form, setForm] = useState<RegistrationFormState>({
    nombreComercial: "",
    razonSocial: "",
    personaContacto: "",
    email: "",
    telefonoWhatsapp: "",
    password: "",
    direccion: "",
    cp: "",
    poblacion: "",
    provincia: "",
    pais: "España",
  });
  const [formError, setFormError] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [registrationId, setRegistrationId] = useState("");
  const [registrationStatus, setRegistrationStatus] = useState("");

  const handleChange =
    (field: keyof RegistrationFormState) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({ ...prev, [field]: event.target.value }));
      if (formError) {
        setFormError("");
      }
    };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!form.nombreComercial.trim()) {
      setFormError("El nombre comercial es obligatorio.");
      return;
    }
    if (!form.email.trim()) {
      setFormError("El correo electrónico es obligatorio.");
      return;
    }
    if (!form.telefonoWhatsapp.trim()) {
      setFormError("El teléfono de WhatsApp es obligatorio.");
      return;
    }
    if (!form.password.trim()) {
      setFormError("La contraseña es obligatoria.");
      return;
    }
    if (form.password.trim().length < 8) {
      setFormError("La contraseña debe tener al menos 8 caracteres.");
      return;
    }

    try {
      setStatus("submitting");
      const apiBase = (import.meta.env.VITE_API_URL as string | undefined) ?? "";
      const trimmedBase = apiBase.replace(/\/$/, "");
      const endpoint = `${trimmedBase}/api/registrations`;
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombreComercial: form.nombreComercial.trim(),
          razonSocial: form.razonSocial.trim() || null,
          personaContacto: form.personaContacto.trim() || null,
          email: form.email.trim(),
          telefonoWhatsapp: form.telefonoWhatsapp.trim(),
          password: form.password.trim(),
          direccion: form.direccion.trim() || null,
          cp: form.cp.trim() || null,
          poblacion: form.poblacion.trim() || null,
          provincia: form.provincia.trim() || null,
          pais: form.pais.trim() || null,
        }),
      });

      if (!response.ok) {
        const message = await response.text();
        throw new Error(message || "No se pudo enviar la solicitud.");
      }

      const data = (await response.json()) as { registrationId: string; status: string };
      setRegistrationId(data.registrationId);
      setRegistrationStatus(data.status);
      setStatus("success");
    } catch (error) {
      setStatus("error");
      setFormError(error instanceof Error ? error.message : "Error inesperado.");
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
            <img
              alt="ALUON"
              src="/assets/logo.png"
              className="h-16 w-auto"
            />
          </div>
          <header className="mb-8 text-center">
            <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-[var(--ag-primary)]/10"></div>
            <p className="text-xs uppercase tracking-[0.3em] text-secondary">Registro</p>
            <h1 className="mt-2 text-3xl font-headline font-semibold text-on-surface">
              Solicitud de acceso
            </h1>
            <p className="mt-2 text-sm text-on-surface/70">
              Te confirmaremos el alta en breve.
            </p>
          </header>

          {formError ? (
            <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
              {formError}
            </div>
          ) : null}

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label className="sr-only" htmlFor="register-nombre-comercial">
                Nombre comercial
              </label>
              <div className="flex items-center gap-3 rounded-xl border border-outline-variant/60 bg-surface-container-low px-4 py-3 focus-within:border-[var(--ag-primary)] focus-within:ring-2 focus-within:ring-[var(--ag-primary)]/20">
                <Store className="h-4 w-4 text-secondary" aria-hidden="true" />
                <input
                  id="register-nombre-comercial"
                  type="text"
                  value={form.nombreComercial}
                  onChange={handleChange("nombreComercial")}
                  placeholder="Nombre comercial"
                  aria-label="Nombre comercial"
                  className="w-full bg-transparent text-sm text-on-surface placeholder:text-on-surface/40 focus:outline-none"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="sr-only" htmlFor="register-razon-social">
                Razón social
              </label>
              <div className="flex items-center gap-3 rounded-xl border border-outline-variant/60 bg-surface-container-low px-4 py-3 focus-within:border-[var(--ag-primary)] focus-within:ring-2 focus-within:ring-[var(--ag-primary)]/20">
                <Store className="h-4 w-4 text-secondary" aria-hidden="true" />
                <input
                  id="register-razon-social"
                  type="text"
                  value={form.razonSocial}
                  onChange={handleChange("razonSocial")}
                  placeholder="Razón social (opcional)"
                  aria-label="Razón social"
                  className="w-full bg-transparent text-sm text-on-surface placeholder:text-on-surface/40 focus:outline-none"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="sr-only" htmlFor="register-contact">
                Persona de contacto
              </label>
              <div className="flex items-center gap-3 rounded-xl border border-outline-variant/60 bg-surface-container-low px-4 py-3 focus-within:border-[var(--ag-primary)] focus-within:ring-2 focus-within:ring-[var(--ag-primary)]/20">
                <User className="h-4 w-4 text-secondary" aria-hidden="true" />
                <input
                  id="register-contact"
                  type="text"
                  value={form.personaContacto}
                  onChange={handleChange("personaContacto")}
                  placeholder="Persona de contacto (opcional)"
                  aria-label="Persona de contacto"
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
                  placeholder="Email de contacto"
                  aria-label="Correo electrónico"
                  className="w-full bg-transparent text-sm text-on-surface placeholder:text-on-surface/40 focus:outline-none"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="sr-only" htmlFor="register-phone">
                Teléfono WhatsApp
              </label>
              <div className="flex items-center gap-3 rounded-xl border border-outline-variant/60 bg-surface-container-low px-4 py-3 focus-within:border-[var(--ag-primary)] focus-within:ring-2 focus-within:ring-[var(--ag-primary)]/20">
                <Phone className="h-4 w-4 text-secondary" aria-hidden="true" />
                <input
                  id="register-phone"
                  type="tel"
                  value={form.telefonoWhatsapp}
                  onChange={handleChange("telefonoWhatsapp")}
                  placeholder="+34 600 123 456"
                  aria-label="Teléfono WhatsApp"
                  className="w-full bg-transparent text-sm text-on-surface placeholder:text-on-surface/40 focus:outline-none"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="sr-only" htmlFor="register-password">
                Contraseña
              </label>
              <div className="flex items-center gap-3 rounded-xl border border-outline-variant/60 bg-surface-container-low px-4 py-3 focus-within:border-[var(--ag-primary)] focus-within:ring-2 focus-within:ring-[var(--ag-primary)]/20">
                <Key className="h-4 w-4 text-secondary" aria-hidden="true" />
                <input
                  id="register-password"
                  type="password"
                  autoComplete="new-password"
                  value={form.password}
                  onChange={handleChange("password")}
                  placeholder="Contraseña (mín. 8 caracteres)"
                  aria-label="Contraseña"
                  className="w-full bg-transparent text-sm text-on-surface placeholder:text-on-surface/40 focus:outline-none"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="sr-only" htmlFor="register-address">
                Dirección
              </label>
              <div className="flex items-center gap-3 rounded-xl border border-outline-variant/60 bg-surface-container-low px-4 py-3 focus-within:border-[var(--ag-primary)] focus-within:ring-2 focus-within:ring-[var(--ag-primary)]/20">
                <MapPin className="h-4 w-4 text-secondary" aria-hidden="true" />
                <input
                  id="register-address"
                  type="text"
                  value={form.direccion}
                  onChange={handleChange("direccion")}
                  placeholder="Dirección (opcional)"
                  aria-label="Dirección"
                  className="w-full bg-transparent text-sm text-on-surface placeholder:text-on-surface/40 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <input
                id="register-cp"
                type="text"
                value={form.cp}
                onChange={handleChange("cp")}
                placeholder="Código postal"
                aria-label="Código postal"
                className="w-full rounded-xl border border-outline-variant/60 bg-surface-container-low px-4 py-3 text-sm text-on-surface placeholder:text-on-surface/40 focus:border-[var(--ag-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--ag-primary)]/20"
              />
              <input
                id="register-poblacion"
                type="text"
                value={form.poblacion}
                onChange={handleChange("poblacion")}
                placeholder="Población"
                aria-label="Población"
                className="w-full rounded-xl border border-outline-variant/60 bg-surface-container-low px-4 py-3 text-sm text-on-surface placeholder:text-on-surface/40 focus:border-[var(--ag-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--ag-primary)]/20"
              />
              <input
                id="register-provincia"
                type="text"
                value={form.provincia}
                onChange={handleChange("provincia")}
                placeholder="Provincia"
                aria-label="Provincia"
                className="w-full rounded-xl border border-outline-variant/60 bg-surface-container-low px-4 py-3 text-sm text-on-surface placeholder:text-on-surface/40 focus:border-[var(--ag-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--ag-primary)]/20"
              />
              <input
                id="register-pais"
                type="text"
                value={form.pais}
                onChange={handleChange("pais")}
                placeholder="País"
                aria-label="País"
                className="w-full rounded-xl border border-outline-variant/60 bg-surface-container-low px-4 py-3 text-sm text-on-surface placeholder:text-on-surface/40 focus:border-[var(--ag-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--ag-primary)]/20"
              />
            </div>

            <button
              type="submit"
              disabled={status === "submitting"}
              className="w-full rounded-xl bg-[var(--ag-primary)] py-3 text-sm font-semibold text-[var(--ag-on-primary)] shadow-[0_12px_30px_-18px_rgba(169,47,50,0.8)] transition hover:brightness-105 active:translate-y-[1px]"
            >
              {status === "submitting" ? "Enviando solicitud..." : "Enviar solicitud"}
            </button>
          </form>

          {status === "success" ? (
            <div className="mt-6 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
              Solicitud registrada. ID: <strong>{registrationId}</strong>. Estado:{" "}
              <strong>{registrationStatus || "PENDIENTE"}</strong>.
            </div>
          ) : null}

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

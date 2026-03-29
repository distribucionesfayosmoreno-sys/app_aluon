export type CustomerAuth = {
  registrationId?: string;
  customerId?: string;
  nombreComercial?: string;
  email?: string;
  telefonoWhatsapp?: string;
  status?: string;
};

const AUTH_KEY = "aluon.mobile.auth";

export const setAuth = (data: CustomerAuth) => {
  localStorage.setItem(AUTH_KEY, JSON.stringify(data));
};

export const getAuth = (): CustomerAuth | null => {
  const raw = localStorage.getItem(AUTH_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as CustomerAuth;
  } catch {
    localStorage.removeItem(AUTH_KEY);
    return null;
  }
};

export const clearAuth = () => {
  localStorage.removeItem(AUTH_KEY);
};

export const isAuthenticated = () => {
  const auth = getAuth();
  return Boolean(auth?.customerId || auth?.registrationId);
};

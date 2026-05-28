export const getApiUrl = (): string => {
  const envApiUrl = (import.meta.env.VITE_API_URL as string | undefined) ?? "";
  let resolvedUrl = envApiUrl.trim();

  // If running locally on localhost/127.0.0.1 and no VITE_API_URL is configured, use local backend port
  if (!resolvedUrl && (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1")) {
    return "http://localhost:8080";
  }

  // If the configured API URL is empty or points to the broken domain aluondevbackend.iconseriespeliculas.xyz,
  // we redirect it to the frontend proxy domain which has been verified to bypass CORS blocks.
  if (!resolvedUrl || resolvedUrl.includes("aluondevbackend.iconseriespeliculas.xyz")) {
    resolvedUrl = "https://desarrolloprogramagestionaluon.iconseriespeliculas.xyz";
  }

  // Ensure no trailing slash
  return resolvedUrl.replace(/\/$/, "");
};

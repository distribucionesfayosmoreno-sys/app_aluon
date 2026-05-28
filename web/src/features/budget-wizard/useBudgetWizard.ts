import { useEffect, useMemo, useState } from "react";
import type {
  CatalogDoorProduct,
  CatalogModel,
  CatalogVariant,
  ColorHex,
  QuoteItemDraft,
  QuoteResponse,
  Step,
} from "./BudgetWizard.types";
import { getAuth } from "../../utils/auth";

const defaultBooleans = {
  primerRequired: false,
  larguero: false,
  marcoSuperior: false,
  bisagras: false,
  porteroAutomatico: false,
};

const isHexColor = (value: string): value is ColorHex => /^#[0-9a-fA-F]{6}$/.test(value);

const apiBase = ((import.meta.env.VITE_API_URL as string | undefined) ?? "").replace(/\/$/, "");

export const useBudgetWizard = (initialModelId?: string | null) => {
  const [step, setStep] = useState<Step>("MODELO");

  const [models, setModels] = useState<CatalogModel[]>([]);
  const [doorProducts, setDoorProducts] = useState<CatalogDoorProduct[]>([]);
  const [variants, setVariants] = useState<CatalogVariant[]>([]);

  const [selectedModel, setSelectedModel] = useState<CatalogModel | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<CatalogDoorProduct | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<CatalogVariant | null>(null);

  const [color, setColor] = useState<ColorHex>("#ffffff");
  const [primerRequired, setPrimerRequired] = useState(defaultBooleans.primerRequired);

  const [widthMm, setWidthMm] = useState(0);
  const [heightMm, setHeightMm] = useState(0);
  const [floorClearanceMm, setFloorClearanceMm] = useState(0);
  const [larguero, setLarguero] = useState(defaultBooleans.larguero);
  const [marcoSuperior, setMarcoSuperior] = useState(defaultBooleans.marcoSuperior);
  const [bisagras, setBisagras] = useState(defaultBooleans.bisagras);
  const [porteroAutomatico, setPorteroAutomatico] = useState(defaultBooleans.porteroAutomatico);

  const [savedItems, setSavedItems] = useState<QuoteItemDraft[]>([]);
  const [quote, setQuote] = useState<QuoteResponse | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Cargar catálogo de modelos al montar
  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    fetch(`${apiBase}/api/catalog/models`)
      .then(res => {
        if (!res.ok) throw new Error("Error al cargar catálogo");
        return res.json();
      })
      .then(data => {
        if (cancelled) return;
        setModels(data);
        
        // Si nos pasan un id de modelo inicial (ej. classic, bisel...), pre-seleccionamos
        if (initialModelId) {
          const match = (data as CatalogModel[]).find(
            m => m.modelo.toLowerCase() === initialModelId.toLowerCase() ||
                 (initialModelId.toLowerCase() === "classic" && m.modelo === "CLASSIC") ||
                 (initialModelId.toLowerCase() === "bisel" && m.modelo === "PREMIUM")
          );
          if (match) {
            selectModel(match);
          }
        }
      })
      .catch(err => {
        if (cancelled) return;
        setError(err instanceof Error ? err.message : "Error al cargar catálogo");
      })
      .finally(() => {
        if (cancelled) return;
        setLoading(false);
      });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialModelId]);

  const loadDoorProducts = async (modeloId: string) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${apiBase}/api/catalog/door-products?modeloId=${encodeURIComponent(modeloId)}`);
      if (!res.ok) throw new Error("Error al cargar productos");
      const data = await res.json();
      setDoorProducts(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al cargar productos");
    } finally {
      setLoading(false);
    }
  };

  const loadVariants = async (puertaId: string) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${apiBase}/api/catalog/variants?puertaId=${encodeURIComponent(puertaId)}`);
      if (!res.ok) throw new Error("Error al cargar variantes");
      const data = await res.json();
      setVariants(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al cargar variantes");
    } finally {
      setLoading(false);
    }
  };

  const modelLabel = useMemo(() => {
    return selectedModel?.modelo ? `Modelo ${selectedModel.modelo}` : "";
  }, [selectedModel]);

  const productLabel = useMemo(() => {
    switch (selectedProduct?.producto) {
      case "PUERTA_PASO": return "Puerta paso";
      case "PUERTA_GARAJE": return "Puerta garaje";
      case "VALLA": return "Valla";
      case "REJA": return "Reja";
      default: return "";
    }
  }, [selectedProduct]);

  const variantLabel = useMemo(() => {
    switch (selectedVariant?.variante) {
      case "PEATONAL": return "Peatonal";
      case "ABATIBLE_UNA": return "Abatible (1 hoja)";
      case "ABATIBLE_DOS": return "Abatible (2 hojas)";
      case "CORREDERA": return "Corredera";
      case "VALLA": return "Valla";
      default: return "";
    }
  }, [selectedVariant]);

  const itemDraft = useMemo<QuoteItemDraft | null>(() => {
    if (!selectedModel || !selectedProduct || !selectedVariant) return null;
    return {
      doorModel: selectedModel.modelo,
      doorType: selectedVariant.variante,
      productCategory: selectedProduct.producto,
      colorCode: color,
      primerRequired,
      widthMm,
      heightMm,
      floorClearanceMm,
      larguero,
      marcoSuperior,
      bisagras,
      porteroAutomatico,
    };
  }, [
    selectedModel,
    selectedProduct,
    selectedVariant,
    color,
    primerRequired,
    widthMm,
    heightMm,
    floorClearanceMm,
    larguero,
    marcoSuperior,
    bisagras,
    porteroAutomatico,
  ]);

  const selectModel = async (model: CatalogModel) => {
    setSelectedModel(model);
    setSelectedProduct(null);
    setSelectedVariant(null);
    setDoorProducts([]);
    setVariants([]);
    await loadDoorProducts(model.id);
    setStep("PRODUCTO");
  };

  const selectProduct = async (product: CatalogDoorProduct) => {
    setSelectedProduct(product);
    setSelectedVariant(null);
    setVariants([]);
    await loadVariants(product.id);
    setStep("COLOR");
  };

  const selectVariant = (variant: CatalogVariant) => {
    setSelectedVariant(variant);
    setStep("MEDIDAS");
  };

  const resetCurrentDoor = () => {
    setDoorProducts([]);
    setVariants([]);
    setSelectedModel(null);
    setSelectedProduct(null);
    setSelectedVariant(null);
    setColor("#ffffff");
    setPrimerRequired(defaultBooleans.primerRequired);
    setWidthMm(0);
    setHeightMm(0);
    setFloorClearanceMm(0);
    setLarguero(defaultBooleans.larguero);
    setMarcoSuperior(defaultBooleans.marcoSuperior);
    setBisagras(defaultBooleans.bisagras);
    setPorteroAutomatico(defaultBooleans.porteroAutomatico);
  };

  const addCurrentItem = () => {
    if (!itemDraft) return;
    setSavedItems(prev => [...prev, itemDraft]);
    resetCurrentDoor();
    setStep("ACCIONES");
  };

  const removeItem = (index: number) => {
    setSavedItems(prev => prev.filter((_, i) => i !== index));
  };

  const editItem = async (index: number) => {
    const item = savedItems[index];
    if (!item) return;

    setSavedItems(prev => prev.filter((_, i) => i !== index));

    const model = models.find(m => m.modelo === item.doorModel);
    if (model) {
      setSelectedModel(model);
      const resProducts = await fetch(`${apiBase}/api/catalog/door-products?modeloId=${encodeURIComponent(model.id)}`);
      const productsData = await resProducts.json();
      setDoorProducts(productsData);
      const prod = (productsData as CatalogDoorProduct[]).find((p: CatalogDoorProduct) => p.producto === item.productCategory);
      if (prod) {
        setSelectedProduct(prod);
        const resVariants = await fetch(`${apiBase}/api/catalog/variants?puertaId=${encodeURIComponent(prod.id)}`);
        const variantsData = await resVariants.json();
        setVariants(variantsData);
        const vrnt = (variantsData as CatalogVariant[]).find((v: CatalogVariant) => v.variante === item.doorType);
        if (vrnt) {
          setSelectedVariant(vrnt);
        }
      }
    }

    setColor(item.colorCode);
    setPrimerRequired(item.primerRequired);
    setWidthMm(item.widthMm);
    setHeightMm(item.heightMm);
    setFloorClearanceMm(item.floorClearanceMm);
    setLarguero(item.larguero);
    setMarcoSuperior(item.marcoSuperior);
    setBisagras(item.bisagras);
    setPorteroAutomatico(item.porteroAutomatico);

    setStep("MEDIDAS");
  };

  const finalize = async () => {
    const customerId = getAuth()?.customerId;
    if (!customerId) {
      setError("No se pudo identificar tu cuenta.");
      return;
    }

    const itemsToSubmit = [...savedItems];
    if (itemsToSubmit.length === 0) {
      if (!itemDraft) {
        setError("Completa el flujo antes de finalizar.");
        return;
      }
      if (widthMm <= 0 || heightMm <= 0) {
        setError("Introduce medidas válidas.");
        return;
      }
      itemsToSubmit.push(itemDraft);
    }

    setSubmitting(true);
    setError("");
    try {
      const response = await fetch(`${apiBase}/api/quotes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerId,
          channel: "BOTH",
          items: itemsToSubmit,
        }),
      });
      if (!response.ok) {
        const txt = await response.text();
        throw new Error(txt || "Error al generar el presupuesto");
      }
      const data = await response.json();
      setQuote(data);
      setStep("FINALIZADO");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al generar el presupuesto");
    } finally {
      setSubmitting(false);
    }
  };

  const sendQuoteChannel = async (channel: "EMAIL" | "WHATSAPP" | "BOTH") => {
    if (!quote) return;
    setSubmitting(true);
    setError("");
    try {
      const response = await fetch(`${apiBase}/api/quotes/${quote.id}/send`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ channel }),
      });
      if (!response.ok) throw new Error("Error al enviar el presupuesto");
      const data = await response.json();
      setQuote(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al enviar el presupuesto");
    } finally {
      setSubmitting(false);
    }
  };

  const reset = () => {
    setStep("MODELO");
    resetCurrentDoor();
    setSavedItems([]);
    setQuote(null);
    setError("");
  };

  return {
    step,
    loading,
    submitting,
    error,
    quote,
    models,
    doorProducts,
    variants,
    selectedModel,
    selectedProduct,
    selectedVariant,
    color,
    primerRequired,
    widthMm,
    heightMm,
    floorClearanceMm,
    larguero,
    marcoSuperior,
    bisagras,
    porteroAutomatico,
    modelLabel,
    productLabel,
    variantLabel,
    savedItems,
    itemDraft,
    setColor: (value: ColorHex) => {
      if (isHexColor(value)) setColor(value);
    },
    setPrimerRequired,
    setWidthMm,
    setHeightMm,
    setFloorClearanceMm,
    setLarguero,
    setMarcoSuperior,
    setBisagras,
    setPorteroAutomatico,
    setStep,
    selectModel,
    selectProduct,
    selectVariant,
    addCurrentItem,
    removeItem,
    editItem,
    finalize,
    sendQuoteChannel,
    reset,
  };
};

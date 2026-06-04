import { useMemo } from "react";
import { useLocation } from "react-router-dom";
import { useBudgetWizard } from "../features/budget-wizard/useBudgetWizard";
import { ModelStep } from "../features/budget-wizard/components/ModelStep";
import { ProductStep } from "../features/budget-wizard/components/ProductStep";
import { ColorStep } from "../features/budget-wizard/components/ColorStep";
import { VariantStep } from "../features/budget-wizard/components/VariantStep";
import { MeasurementsStep } from "../features/budget-wizard/components/MeasurementsStep";
import { SummaryStep } from "../features/budget-wizard/components/SummaryStep";
import { OptionsStep } from "../features/budget-wizard/components/OptionsStep";
import { DoneStep } from "../features/budget-wizard/components/DoneStep";

export default function BudgetWizardPage() {
  const location = useLocation();
  const queryParams = useMemo(() => new URLSearchParams(location.search), [location.search]);
  const initialModelId = queryParams.get('model');

  const wizard = useBudgetWizard(initialModelId);

  return (
    <section className="bg-surface-container-low min-h-screen py-6 px-4 md:px-16">
      <div className="max-w-xl mx-auto space-y-6">
        {/* Page Header */}
        <header className="bg-surface rounded-2xl p-5 border border-outline-variant/30 flex items-center justify-between shadow-sm">
          <div>
            <div className="text-[10px] font-black uppercase tracking-[0.25em] text-[#a92f32]">Presupuestos</div>
            <h2 className="font-headline font-black text-lg text-on-surface mt-0.5">Wizard de Puertas</h2>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex flex-col items-end select-none bg-surface-container border border-outline-variant/20 py-1 px-2.5 rounded-lg">
              <span className="text-[9px] font-black tracking-[0.15em] text-[#a92f32]">ALUON</span>
              <span className="text-[7px] font-semibold text-secondary uppercase tracking-wider animate-pulse" style={{ fontSize: '7px', lineHeight: '1.1' }}>Aluminio Soldado</span>
            </div>
            <button
              type="button"
              onClick={wizard.reset}
              className="text-[10px] font-bold uppercase tracking-widest text-[#a92f32] active:scale-95 transition-transform"
            >
              Reiniciar
            </button>
          </div>
        </header>

        {/* Global Errors */}
        {wizard.error && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl text-xs font-bold shadow-sm">
            {wizard.error}
          </div>
        )}

        {/* Wizard step renderer */}
        <div className="bg-surface rounded-3xl p-5 md:p-6 border border-outline-variant/20 shadow-md">
          {wizard.step === 'MODELO' && (
            <ModelStep
              models={wizard.models}
              loading={wizard.loading}
              onSelect={wizard.selectModel}
            />
          )}

          {wizard.step === 'PRODUCTO' && wizard.selectedModel && (
            <ProductStep
              model={wizard.selectedModel}
              products={wizard.doorProducts}
              loading={wizard.loading}
              onBack={() => wizard.setStep('MODELO')}
              onSelect={wizard.selectProduct}
            />
          )}

          {wizard.step === 'COLOR' && wizard.selectedModel && wizard.selectedProduct && (
            <ColorStep
              color={wizard.color}
              primerRequired={wizard.primerRequired}
              onColorChange={wizard.setColor}
              onPrimerChange={wizard.setPrimerRequired}
              onBack={() => wizard.setStep('PRODUCTO')}
              onNext={() => wizard.setStep('APERTURA')}
            />
          )}

          {wizard.step === 'APERTURA' && wizard.selectedModel && wizard.selectedProduct && (
            <VariantStep
              model={wizard.selectedModel}
              variants={wizard.variants}
              loading={wizard.loading}
              onBack={() => wizard.setStep('COLOR')}
              onSelect={wizard.selectVariant}
            />
          )}

          {wizard.step === 'MEDIDAS' && wizard.selectedModel && wizard.selectedVariant && (
            <MeasurementsStep
              widthMm={wizard.widthMm}
              heightMm={wizard.heightMm}
              floorClearanceMm={wizard.floorClearanceMm}
              larguero={wizard.larguero}
              marcoSuperior={wizard.marcoSuperior}
              bisagras={wizard.bisagras}
              porteroAutomatico={wizard.porteroAutomatico}
              onWidthChange={wizard.setWidthMm}
              onHeightChange={wizard.setHeightMm}
              onFloorClearanceChange={wizard.setFloorClearanceMm}
              onLargueroChange={wizard.setLarguero}
              onMarcoSuperiorChange={wizard.setMarcoSuperior}
              onBisagrasChange={wizard.setBisagras}
              onPorteroAutomaticoChange={wizard.setPorteroAutomatico}
              onBack={() => wizard.setStep('APERTURA')}
              onNext={() => wizard.setStep('RESUMEN')}
            />
          )}

          {wizard.step === 'RESUMEN' && wizard.selectedModel && wizard.selectedProduct && wizard.selectedVariant && (
            <SummaryStep
              model={wizard.selectedModel}
              product={wizard.selectedProduct}
              variant={wizard.selectedVariant}
              color={wizard.color}
              primerRequired={wizard.primerRequired}
              widthMm={wizard.widthMm}
              heightMm={wizard.heightMm}
              floorClearanceMm={wizard.floorClearanceMm}
              larguero={wizard.larguero}
              marcoSuperior={wizard.marcoSuperior}
              bisagras={wizard.bisagras}
              porteroAutomatico={wizard.porteroAutomatico}
              submitting={wizard.submitting}
              onBack={() => wizard.setStep('MEDIDAS')}
              onFinalize={wizard.addCurrentItem}
            />
          )}

          {wizard.step === 'ACCIONES' && (
            <OptionsStep
              savedItems={wizard.savedItems}
              itemDraft={wizard.itemDraft}
              onAddDoor={wizard.startNewDoor}
              onRemoveDoor={wizard.removeItem}
              onEditDoor={wizard.editItem}
              onReset={wizard.reset}
              onFinalize={wizard.finalize}
              submitting={wizard.submitting}
            />
          )}

          {wizard.step === 'FINALIZADO' && wizard.quote && (
            <DoneStep
              quote={wizard.quote}
              onNew={wizard.reset}
              onSendChannel={wizard.sendQuoteChannel}
              submitting={wizard.submitting}
            />
          )}
        </div>
      </div>
    </section>
  );
}

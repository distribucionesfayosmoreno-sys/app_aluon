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
        <button
              type="button"
              onClick={wizard.reset}
              className="text-[10px] font-bold uppercase tracking-widest text-primary active:scale-95 transition-transform"
            >
              Reiniciar
            </button>

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
              loading={wizard.loading}
              onBack={() => wizard.setStep('MODELO')}
              onSelect={wizard.selectStructure}
            />
          )}

          {wizard.step === 'COLOR' && wizard.selectedModel && wizard.selectedProduct && (
            <ColorStep
              color={wizard.color}
              primerRequired={wizard.primerRequired}
              onColorChange={wizard.setColor}
              onPrimerChange={wizard.setPrimerRequired}
              onBack={() => wizard.setStep('PRODUCTO')}
              onNext={() => {
                if (wizard.selectedProduct?.producto === 'VALLA') {
                  wizard.setStep('MEDIDAS');
                } else {
                  wizard.setStep('APERTURA');
                }
              }}
            />
          )}

          {wizard.step === 'APERTURA' && wizard.selectedModel && wizard.selectedVariant && (
            <VariantStep
              model={wizard.selectedModel}
              doorType={wizard.selectedVariant.variante}
              bisagras={wizard.bisagras}
              onSelect={(val) => {
                wizard.setBisagras(val);
                wizard.setStep('MEDIDAS');
              }}
              onBack={() => wizard.setStep('COLOR')}
            />
          )}

          {wizard.step === 'MEDIDAS' && wizard.selectedModel && wizard.selectedVariant && (
            <MeasurementsStep
              widthMm={wizard.widthMm}
              heightMm={wizard.heightMm}
              floorClearanceMm={wizard.floorClearanceMm}
              larguero={wizard.larguero}
              marcoSuperior={wizard.marcoSuperior}
              porteroAutomatico={wizard.porteroAutomatico}
              onWidthChange={wizard.setWidthMm}
              onHeightChange={wizard.setHeightMm}
              onFloorClearanceChange={wizard.setFloorClearanceMm}
              onLargueroChange={wizard.setLarguero}
              onMarcoSuperiorChange={wizard.setMarcoSuperior}
              onPorteroAutomaticoChange={wizard.setPorteroAutomatico}
              onBack={() => {
                if (wizard.selectedProduct?.producto === 'VALLA') {
                  wizard.setStep('COLOR');
                } else {
                  wizard.setStep('APERTURA');
                }
              }}
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
              onAddDoor={wizard.addCurrentItem}
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

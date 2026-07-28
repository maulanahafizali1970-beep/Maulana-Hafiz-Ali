interface Step {
  title: string;
  description: string;
}

interface ConsultationStepsProps {
  steps: Step[];
  note: string;
}

export default function ConsultationSteps({ steps, note }: ConsultationStepsProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
        {steps.map((step, index) => (
          <div key={index} className="relative flex flex-col items-center text-center">
            {index < steps.length - 1 && (
              <div className="hidden lg:block absolute top-6 left-[calc(50%+2rem)] w-[calc(100%-4rem)] h-0.5 bg-subtle-gold/30 -z-10" />
            )}
            <div className="w-12 h-12 rounded-full bg-deep-emerald border-2 border-subtle-gold flex items-center justify-center mb-4">
              <span className="text-subtle-gold font-bold text-lg">{index + 1}</span>
            </div>
            <h3 className="text-lg font-semibold text-dark-text mb-2">{step.title}</h3>
            <p className="text-sm text-dark-text/70 leading-relaxed max-w-xs">{step.description}</p>
          </div>
        ))}
      </div>
      {note && (
        <p className="text-xs text-dark-text/50 text-center italic">{note}</p>
      )}
    </div>
  );
}

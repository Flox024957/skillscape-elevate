interface AnalysisResultProps {
  analysis: string;
}

export const AnalysisResult = ({ analysis }: AnalysisResultProps) => {
  if (!analysis) return null;

  return (
    <div className="mt-6 p-4 bg-card/30 rounded-lg border border-border">
      <h3 className="font-semibold mb-2">Conseils pour réaliser votre rêve :</h3>
      <p className="text-muted-foreground whitespace-pre-line">{analysis}</p>
    </div>
  );
};
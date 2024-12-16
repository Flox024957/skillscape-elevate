interface AnalysisResultProps {
  analysis: string;
}

export const AnalysisResult = ({ analysis }: AnalysisResultProps) => {
  if (!analysis) return null;

  console.log("Contenu de l'analyse:", analysis); // Debug log

  // Si l'analyse est une chaîne simple, l'afficher directement
  if (!analysis.includes('\n')) {
    return (
      <div className="mt-6">
        <div className="p-4 bg-card/30 rounded-lg border border-border">
          <h3 className="font-semibold mb-2 text-primary">Analyse</h3>
          <p className="text-muted-foreground whitespace-pre-line">{analysis}</p>
        </div>
      </div>
    );
  }

  // Sinon, traiter le format structuré
  const sections = analysis.split('\n\n').filter(Boolean);

  return (
    <div className="mt-6 space-y-4">
      {sections.map((section, index) => {
        const lines = section.split('\n');
        const title = lines[0];
        const content = lines.slice(1);

        if (!title) return null;

        return (
          <div 
            key={index} 
            className="p-4 bg-card/30 rounded-lg border border-border"
          >
            <h3 className="font-semibold mb-2 text-primary">
              {title.replace(':', '')}
            </h3>
            <div className="text-muted-foreground space-y-2">
              {content.map((line, i) => (
                <p key={i} className="whitespace-pre-line">
                  {line.trim()}
                </p>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};
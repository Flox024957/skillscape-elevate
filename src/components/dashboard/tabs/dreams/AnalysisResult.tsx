interface AnalysisResultProps {
  analysis: string;
}

export const AnalysisResult = ({ analysis }: AnalysisResultProps) => {
  if (!analysis) return null;

  return (
    <div className="mt-6 space-y-4">
      {analysis.split('\n\n').map((section, index) => {
        const [title, ...content] = section.split('\n');
        
        if (!title || !content.length) return null;

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
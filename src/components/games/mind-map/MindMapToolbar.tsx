import { Button } from "@/components/ui/button";
import { Brain, Save, Download, Upload, Trash2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface MindMapToolbarProps {
  onSave: () => void;
  onExport: () => void;
  onImport: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onReset: () => void;
}

export const MindMapToolbar = ({
  onSave,
  onExport,
  onImport,
  onReset,
}: MindMapToolbarProps) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Brain className="w-6 h-6 text-primary" />
        <h2 className="text-2xl font-bold text-primary">
          Mind Map Masters
        </h2>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outline" onClick={onReset} className="gap-2">
          <Trash2 className="w-4 h-4" />
          Réinitialiser
        </Button>
        <Button variant="outline" onClick={onExport} className="gap-2">
          <Download className="w-4 h-4" />
          Exporter
        </Button>
        <Button variant="outline" className="gap-2" onClick={() => document.getElementById('import-file')?.click()}>
          <Upload className="w-4 h-4" />
          Importer
          <input
            id="import-file"
            type="file"
            accept=".json"
            className="hidden"
            onChange={onImport}
          />
        </Button>
        <Button variant="default" onClick={onSave} className="gap-2">
          <Save className="w-4 h-4" />
          Sauvegarder
        </Button>
      </div>
    </div>
  );
};
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Brain, Save, Download, Upload, Trash2, Undo, Redo } from "lucide-react";

interface MindMapToolbarProps {
  title: string;
  onTitleChange: (title: string) => void;
  onSave: () => void;
  onExport: () => void;
  onImport: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onReset: () => void;
  onUndo: () => void;
  onRedo: () => void;
}

export const MindMapToolbar = ({
  title,
  onTitleChange,
  onSave,
  onExport,
  onImport,
  onReset,
  onUndo,
  onRedo,
}: MindMapToolbarProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Brain className="w-6 h-6 text-primary" />
        <Input
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
          className="text-2xl font-bold bg-transparent border-none focus-visible:ring-0 px-0"
          placeholder="Titre de la carte mentale"
        />
      </div>
      
      <div className="flex items-center gap-2">
        <Button variant="outline" onClick={onUndo} size="icon">
          <Undo className="w-4 h-4" />
        </Button>
        <Button variant="outline" onClick={onRedo} size="icon">
          <Redo className="w-4 h-4" />
        </Button>
        <div className="flex-1" />
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
import { Upload } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRef } from "react";

interface FileUploadZoneProps {
  label: string;
  accept?: string;
  multiple?: boolean;
  onFilesSelected: (files: File[]) => void;
  uploadedFiles?: string[];
}

export const FileUploadZone = ({
  label,
  accept,
  multiple = false,
  onFilesSelected,
  uploadedFiles = []
}: FileUploadZoneProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      onFilesSelected(files);
    }
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-foreground">{label}</label>
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className={cn(
          "w-full p-6 border-2 border-dashed rounded-lg transition-all duration-200",
          "hover:border-primary/50 hover:bg-primary/5",
          "border-border/40 bg-background/30"
        )}
      >
        <div className="flex flex-col items-center gap-2">
          <Upload className="w-6 h-6 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">
            Click to upload {multiple ? "files" : "file"}
          </p>
          {accept && (
            <p className="text-xs text-muted-foreground/60">{accept}</p>
          )}
        </div>
      </button>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={handleChange}
        className="hidden"
      />
      {uploadedFiles.length > 0 && (
        <div className="space-y-1">
          {uploadedFiles.map((file, index) => (
            <div key={index} className="text-xs text-muted-foreground flex items-center gap-2">
              <div className="w-1 h-1 rounded-full bg-primary" />
              {file}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

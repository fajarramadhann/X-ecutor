
import { useState } from 'react';
import { File, Upload, X, Check, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

interface DocumentUploaderProps {
  onDocumentContent: (content: string) => void;
}

const DocumentUploader = ({ onDocumentContent }: DocumentUploaderProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = (fileList: FileList) => {
    const newFiles = Array.from(fileList).filter(file => 
      file.type === 'application/pdf' || 
      file.type === 'text/plain' || 
      file.type === 'application/msword' ||
      file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    );
    
    if (newFiles.length === 0) {
      toast.error('Invalid file format', {
        description: 'Please upload PDF, TXT, DOC or DOCX files'
      });
      return;
    }
    
    setUploadedFiles([...uploadedFiles, ...newFiles]);
  };

  const removeFile = (index: number) => {
    setUploadedFiles(uploadedFiles.filter((_, i) => i !== index));
  };

  const processFiles = async () => {
    if (uploadedFiles.length === 0) return;
    
    setIsProcessing(true);
    
    try {
      // In a real app, you would process the file and extract the text
      // For demonstration, we'll simulate processing with a timeout
      // and extract text from simple file types
      
      const processFile = (file: File): Promise<string> => {
        return new Promise((resolve) => {
          if (file.type === 'text/plain') {
            const reader = new FileReader();
            reader.onload = (e) => {
              resolve(e.target?.result as string || '');
            };
            reader.readAsText(file);
          } else {
            // For non-text files, we'd typically use a backend service
            // For demo, simulate extracting some text based on filename
            setTimeout(() => {
              resolve(`Extracted content from ${file.name} (simulated)`);
            }, 1000);
          }
        });
      };
      
      const contentsPromises = uploadedFiles.map(processFile);
      const contents = await Promise.all(contentsPromises);
      
      const allContent = contents.join('\n\n');
      onDocumentContent(allContent);
      
      toast.success('Documents processed successfully', {
        description: `Extracted content from ${uploadedFiles.length} file(s)`
      });
      
    } catch (error) {
      toast.error('Error processing files', {
        description: 'There was an error extracting content from your documents'
      });
      console.error(error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium">Add Context from Documents</h3>
      
      <div 
        className={`border-2 border-dashed rounded-xl p-6 text-center transition-all ${
          isDragging 
            ? 'border-primary bg-primary/5' 
            : 'border-border hover:border-primary/50 hover:bg-accent/5'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center justify-center gap-2">
          <Upload className="w-8 h-8 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">
            Drag and drop your documents here, or{' '}
            <label className="text-primary cursor-pointer hover:underline">
              browse
              <input
                type="file"
                className="hidden"
                accept=".pdf,.txt,.doc,.docx"
                onChange={handleFileInputChange}
                multiple
              />
            </label>
          </p>
          <p className="text-xs text-muted-foreground">
            Supports PDF, TXT, DOC, DOCX up to 10MB
          </p>
        </div>
      </div>
      
      {uploadedFiles.length > 0 && (
        <div className="space-y-3">
          <div className="text-sm font-medium flex justify-between items-center">
            <span>Uploaded Files ({uploadedFiles.length})</span>
            <button 
              onClick={processFiles}
              disabled={isProcessing}
              className="px-3 py-1 text-xs bg-primary/10 text-primary rounded-full hover:bg-primary/20 transition-colors"
            >
              {isProcessing ? 'Processing...' : 'Process Files'}
            </button>
          </div>
          
          <div className="space-y-2 max-h-[200px] overflow-y-auto pr-2">
            {uploadedFiles.map((file, index) => (
              <div key={index} className="flex items-center justify-between bg-accent/10 p-2 rounded-lg text-sm">
                <div className="flex items-center gap-2">
                  <File className="w-4 h-4 text-primary" />
                  <span className="truncate max-w-[150px]">{file.name}</span>
                </div>
                <button 
                  onClick={() => removeFile(index)}
                  className="text-muted-foreground hover:text-destructive transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
          
          <div className="text-xs flex items-center gap-1 text-muted-foreground">
            <AlertCircle className="w-3 h-3" />
            <span>Files are processed locally in your browser</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentUploader;

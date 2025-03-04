
import { useState, useEffect } from "react";
import { Bot, Save, Trash2 } from "lucide-react";

interface AgentSettings {
  name: string;
  expertise: string[];
  tone: string;
  avatar: string;
  description: string;
}

interface CustomizationPanelProps {
  initialSettings?: Partial<AgentSettings>;
  onSave?: (settings: AgentSettings) => void;
}

const CustomizationPanel = ({ 
  initialSettings,
  onSave
}: CustomizationPanelProps) => {
  const [settings, setSettings] = useState<AgentSettings>({
    name: initialSettings?.name || "AgentX",
    expertise: initialSettings?.expertise || ["General", "Marketing"],
    tone: initialSettings?.tone || "professional",
    avatar: initialSettings?.avatar || "",
    description: initialSettings?.description || "AI assistant specialized in generating Twitter content",
  });

  const [expertiseInput, setExpertiseInput] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  
  useEffect(() => {
    if (settings.avatar) {
      setImagePreview(settings.avatar);
    }
  }, [settings.avatar]);

  const handleExpertiseAdd = () => {
    if (expertiseInput.trim() && !settings.expertise.includes(expertiseInput.trim())) {
      setSettings({
        ...settings,
        expertise: [...settings.expertise, expertiseInput.trim()]
      });
      setExpertiseInput("");
    }
  };

  const handleExpertiseRemove = (index: number) => {
    setSettings({
      ...settings,
      expertise: settings.expertise.filter((_, i) => i !== index)
    });
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setImagePreview(result);
        setSettings({
          ...settings,
          avatar: result
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    if (onSave) {
      onSave(settings);
    }
  };

  const toneOptions = [
    { value: "professional", label: "Professional" },
    { value: "casual", label: "Casual" },
    { value: "friendly", label: "Friendly" },
    { value: "humorous", label: "Humorous" },
    { value: "formal", label: "Formal" },
    { value: "enthusiastic", label: "Enthusiastic" },
  ];

  return (
    <div className="glass-card rounded-xl p-6 animate-fade-in">
      <h3 className="text-xl font-semibold mb-6">Customize Your AI Agent</h3>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Agent Name</label>
            <input
              type="text"
              value={settings.name}
              onChange={(e) => setSettings({ ...settings, name: e.target.value })}
              className="input-field w-full"
              placeholder="Give your agent a name"
              maxLength={20}
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              value={settings.description}
              onChange={(e) => setSettings({ ...settings, description: e.target.value })}
              className="input-field w-full resize-none"
              placeholder="Describe what your agent specializes in"
              rows={3}
              maxLength={100}
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Communication Tone</label>
            <select
              value={settings.tone}
              onChange={(e) => setSettings({ ...settings, tone: e.target.value })}
              className="input-field w-full"
            >
              {toneOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        <div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Agent Avatar</label>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full border-2 border-border overflow-hidden bg-accent flex items-center justify-center">
                {imagePreview ? (
                  <img 
                    src={imagePreview} 
                    alt="Avatar preview" 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Bot className="w-8 h-8 text-muted-foreground" />
                )}
              </div>
              <label className="button-outline cursor-pointer">
                <span>Upload Image</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="hidden"
                />
              </label>
            </div>
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Expertise Areas</label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={expertiseInput}
                onChange={(e) => setExpertiseInput(e.target.value)}
                className="input-field flex-grow"
                placeholder="Add expertise (e.g., Tech, Marketing)"
                onKeyPress={(e) => e.key === 'Enter' && handleExpertiseAdd()}
              />
              <button
                onClick={handleExpertiseAdd}
                className="button-outline py-2 px-3"
                disabled={!expertiseInput.trim()}
              >
                Add
              </button>
            </div>
            
            <div className="flex flex-wrap gap-2 mt-3">
              {settings.expertise.map((item, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-accent text-accent-foreground text-sm"
                >
                  {item}
                  <button
                    onClick={() => handleExpertiseRemove(index)}
                    className="w-4 h-4 rounded-full bg-muted-foreground/20 hover:bg-muted-foreground/30 flex items-center justify-center"
                  >
                    <Trash2 className="w-2 h-2" />
                  </button>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex justify-end mt-6">
        <button onClick={handleSave} className="button-primary">
          <Save className="w-4 h-4" />
          <span>Save Agent</span>
        </button>
      </div>
    </div>
  );
};

export default CustomizationPanel;

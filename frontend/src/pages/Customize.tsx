
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import CustomizationPanel from "../components/CustomizationPanel";
import AgentCard from "../components/AgentCard";
import { ArrowRight, MessageSquare } from "lucide-react";
import { toast } from "sonner";

interface AgentSettings {
  name: string;
  expertise: string[];
  tone: string;
  avatar: string;
  description: string;
}

const Customize = () => {
  const navigate = useNavigate();
  const [savedAgent, setSavedAgent] = useState<AgentSettings | null>(null);
  
  // Initial settings - in a real app, these would be loaded from the user's storage
  const initialSettings = {
    name: "AgentX",
    expertise: ["Content Creation", "Social Media"],
    tone: "professional",
    avatar: "",
    description: "AI Twitter content specialist"
  };
  
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSaveAgent = (settings: AgentSettings) => {
    // In a real app, this would save to a backend or local storage
    setSavedAgent(settings);
    
    // Show success toast
    toast.success("Agent customized successfully!", {
      description: "Your settings have been saved.",
      position: "top-center",
    });
  };

  return (
    <Layout>
      <div className="container px-4 py-8 mx-auto">
        <h1 className="text-3xl font-bold mb-2 font-display animate-fade-in">Customize Your AI Agent</h1>
        <p className="text-muted-foreground mb-8 animate-fade-in animate-delay-100">
          Personalize your AI assistant's personality, expertise, and appearance
        </p>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 animate-fade-in animate-delay-200">
            <CustomizationPanel 
              initialSettings={initialSettings}
              onSave={handleSaveAgent}
            />
          </div>
          
          <div className="lg:col-span-1 animate-fade-in animate-delay-300">
            <div className="sticky top-24">
              <h3 className="text-xl font-semibold mb-4">Agent Preview</h3>
              
              <AgentCard 
                name={savedAgent?.name || initialSettings.name}
                description={savedAgent?.description || initialSettings.description}
                avatar={savedAgent?.avatar || initialSettings.avatar}
                expertise={savedAgent?.expertise || initialSettings.expertise}
              />
              
              <div className="glass-card rounded-xl p-5 mt-6">
                <h3 className="font-medium mb-3">Why Customize?</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Customizing your AI agent allows it to better understand your brand voice and content needs, resulting in more relevant and engaging Twitter content.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary mt-1.5"></div>
                    <span>Generate content that matches your unique style</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary mt-1.5"></div>
                    <span>Focus on expertise areas relevant to your audience</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary mt-1.5"></div>
                    <span>Create consistent messaging across your social presence</span>
                  </li>
                </ul>
              </div>
              
              <div className="flex flex-col gap-3 mt-6">
                <button 
                  onClick={() => navigate("/chat")}
                  className="button-primary justify-center"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Start Chatting</span>
                </button>
                
                <button 
                  onClick={() => navigate("/generate")}
                  className="button-outline justify-center"
                >
                  <span>Go to Content Generator</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Customize;


import { useEffect } from "react";
import Layout from "../components/Layout";
import ChatInterface from "../components/ChatInterface";
import AgentCard from "../components/AgentCard";
import { useNavigate } from "react-router-dom";

const Chat = () => {
  const navigate = useNavigate();
  
  // Agent settings - in a real app, this would come from state or an API
  const agent = {
    name: "AgentX",
    description: "AI Twitter content specialist",
    avatar: "",
    expertise: ["Social Media", "Content Creation", "Engagement"]
  };
  
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleGenerate = (content: string) => {
    // Navigate to generate page and pass the content
    navigate("/generate", { state: { content } });
  };

  return (
    <Layout>
      <div className="container px-4 py-8 mx-auto">
        <h1 className="text-3xl font-bold mb-6 font-display animate-fade-in">Chat with Your AI Agent</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 animate-fade-in">
            <AgentCard 
              {...agent} 
              onCustomize={() => navigate("/customize")}
            />
            
            <div className="glass-card rounded-xl p-5 mt-6 animate-fade-in animate-delay-100">
              <h3 className="font-medium mb-3">Agent Capabilities</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                  <span>Draft tweets based on your ideas</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                  <span>Analyze trending topics</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                  <span>Suggest engagement strategies</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                  <span>Generate hashtag recommendations</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                  <span>Improve tweet readability</span>
                </li>
              </ul>
            </div>
            
            <div className="glass-card rounded-xl p-5 mt-6 animate-fade-in animate-delay-200">
              <h3 className="font-medium mb-3">Conversation Tips</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span>Be specific about your content needs</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span>Mention your target audience</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span>Try asking for multiple options</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span>Provide feedback to refine results</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="lg:col-span-2 h-[70vh] animate-fade-in animate-delay-300">
            <ChatInterface 
              agentName={agent.name}
              onGenerate={handleGenerate}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Chat;

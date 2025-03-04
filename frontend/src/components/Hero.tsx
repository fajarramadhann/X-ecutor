
import { ArrowRight, Bot } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="py-20 md:py-28">
      <div className="container px-4 mx-auto">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center px-3 py-1 mb-6 text-sm font-medium rounded-full bg-accent text-accent-foreground animate-fade-in">
            <span className="mr-2">Web3 Powered</span>
            <span className="inline-block w-2 h-2 rounded-full bg-primary"></span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 font-display animate-fade-in animate-delay-100">
            Your AI Agent for <span className="text-gradient">Engaging</span> Twitter Content
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto animate-fade-in animate-delay-200">
            Create, customize, and deploy your personal AI agent to generate high-quality Twitter content that resonates with your audience.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 animate-fade-in animate-delay-300">
            <button 
              onClick={() => navigate("/chat")} 
              className="button-primary"
            >
              <span>Start Chatting</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            
            <button 
              onClick={() => navigate("/customize")} 
              className="button-outline"
            >
              <Bot className="w-4 h-4" />
              <span>Customize Agent</span>
            </button>
          </div>
        </div>
      </div>
      
      {/* Floating elements (decorative) */}
      <div className="hidden md:block absolute top-1/3 -left-16 w-32 h-32 blur-3xl bg-primary/20 rounded-full animate-pulse-slow"></div>
      <div className="hidden md:block absolute top-2/3 -right-20 w-40 h-40 blur-3xl bg-blue-400/20 rounded-full animate-pulse-slow"></div>
    </section>
  );
};

export default Hero;

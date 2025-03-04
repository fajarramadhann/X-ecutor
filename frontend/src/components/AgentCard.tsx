
import { Bot, Settings, Sparkles } from "lucide-react";
import { useState } from "react";

interface AgentCardProps {
  name: string;
  description: string;
  avatar: string;
  expertise: string[];
  onCustomize?: () => void;
}

const AgentCard = ({ name, description, avatar, expertise, onCustomize }: AgentCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="glass-card rounded-2xl overflow-hidden transition-all duration-500 animate-fade-in hover:shadow-xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-24 bg-gradient-to-r from-blue-500 to-indigo-600 overflow-hidden">
        {/* Animated background particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(5)].map((_, i) => (
            <div 
              key={i}
              className="absolute rounded-full bg-white/10"
              style={{
                width: `${20 + Math.random() * 30}px`,
                height: `${20 + Math.random() * 30}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDuration: `${5 + Math.random() * 10}s`,
              }}
            />
          ))}
        </div>
        
        {onCustomize && (
          <button 
            onClick={onCustomize}
            className="absolute top-3 right-3 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300 hover:scale-105 z-10"
          >
            <Settings className="w-4 h-4" />
          </button>
        )}
        
        {/* Animated sparkle effect */}
        {isHovered && (
          <Sparkles 
            className="absolute top-3 left-3 w-5 h-5 text-white/70 animate-bounce-subtle" 
          />
        )}
      </div>
      
      <div className="px-6 pt-12 pb-6 relative">
        <div className="absolute -top-10 left-6 w-20 h-20 rounded-full border-4 border-background overflow-hidden bg-white shadow-lg transition-all duration-300 hover:scale-105">
          {avatar ? (
            <img 
              src={avatar} 
              alt={name} 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-primary/10 flex items-center justify-center">
              <Bot className="w-8 h-8 text-primary animate-pulse-slow" />
            </div>
          )}
        </div>
        
        <h3 className="text-xl font-semibold mb-1">{name}</h3>
        <p className="text-sm text-muted-foreground mb-4">{description}</p>
        
        <div className="flex flex-wrap gap-2">
          {expertise.map((skill, index) => (
            <span 
              key={skill} 
              className="text-xs px-2 py-1 rounded-full bg-accent text-accent-foreground transition-all duration-300 hover:scale-105 hover:bg-primary/20 hover:text-primary-foreground"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AgentCard;

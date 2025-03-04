import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { 
  Bot, Search, PlusCircle, Filter, ArrowUpDown, 
  Sparkles, User, Check, Star, StarOff
} from "lucide-react";
import { toast } from "sonner";

// Define the template interface
interface AgentTemplate {
  id: string;
  name: string;
  description: string;
  expertise: string[];
  rating: number;
  usageCount: number;
  isFavorite: boolean;
  isPremium: boolean;
  createdAt: Date;
}

const Templates = () => {
  const navigate = useNavigate();
  const [templates, setTemplates] = useState<AgentTemplate[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"popular" | "recent" | "rating">("popular");
  const [filterFavorites, setFilterFavorites] = useState(false);
  
  // Simulated data for templates
  useEffect(() => {
    // In a real app, this would be an API call
    const mockTemplates: AgentTemplate[] = [
      {
        id: "1",
        name: "Content Creator Pro",
        description: "Specialized in crafting engaging Twitter threads and viral tweets with high engagement potential.",
        expertise: ["Social Media", "Viral Content", "Engagement"],
        rating: 4.8,
        usageCount: 15420,
        isFavorite: true,
        isPremium: false,
        createdAt: new Date("2023-04-15")
      },
      {
        id: "2",
        name: "Growth Hacker",
        description: "Focuses on data-driven Twitter strategies to grow your follower count and engagement metrics.",
        expertise: ["Growth Hacking", "Analytics", "Metrics"],
        rating: 4.6,
        usageCount: 8765,
        isFavorite: false,
        isPremium: false,
        createdAt: new Date("2023-06-22")
      },
      {
        id: "3",
        name: "Industry Analyst",
        description: "Specialized in creating insightful content about industry trends with data-backed assertions.",
        expertise: ["Industry Analysis", "Trends", "Research"],
        rating: 4.5,
        usageCount: 6543,
        isFavorite: false,
        isPremium: true,
        createdAt: new Date("2023-08-10")
      },
      {
        id: "4",
        name: "News Summarizer",
        description: "Creates concise summaries of breaking news and current events, perfect for news-focused accounts.",
        expertise: ["News", "Summarization", "Current Events"],
        rating: 4.3,
        usageCount: 9876,
        isFavorite: true,
        isPremium: false,
        createdAt: new Date("2023-07-05")
      },
      {
        id: "5",
        name: "Personal Branding Expert",
        description: "Helps craft tweets that enhance your personal brand and professional identity.",
        expertise: ["Personal Branding", "Professional", "Identity"],
        rating: 4.7,
        usageCount: 7654,
        isFavorite: false,
        isPremium: true,
        createdAt: new Date("2023-09-18")
      },
      {
        id: "6",
        name: "Thought Leader",
        description: "Specialized in creating thought-provoking content that positions you as a leader in your field.",
        expertise: ["Thought Leadership", "Industry Insights", "Expertise"],
        rating: 4.4,
        usageCount: 5432,
        isFavorite: false,
        isPremium: false,
        createdAt: new Date("2023-10-30")
      }
    ];
    
    setTemplates(mockTemplates);
  }, []);
  
  // Filter and sort templates
  const filteredTemplates = templates
    .filter((template) => {
      // Filter by search query
      const matchesSearch = 
        template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        template.expertise.some(exp => exp.toLowerCase().includes(searchQuery.toLowerCase()));
      
      // Filter by favorites if enabled
      const matchesFavorite = filterFavorites ? template.isFavorite : true;
      
      return matchesSearch && matchesFavorite;
    })
    .sort((a, b) => {
      // Sort by selected criteria
      switch (sortBy) {
        case "popular":
          return b.usageCount - a.usageCount;
        case "recent":
          return b.createdAt.getTime() - a.createdAt.getTime();
        case "rating":
          return b.rating - a.rating;
        default:
          return 0;
      }
    });

  // Toggle favorite status
  const toggleFavorite = (id: string) => {
    setTemplates(prev => 
      prev.map(template => 
        template.id === id 
          ? { ...template, isFavorite: !template.isFavorite } 
          : template
      )
    );
  };

  // Handle using a template
  const useTemplate = (id: string) => {
    // In a real app, you would load the template and redirect to chat
    toast.success("Template applied successfully");
    navigate("/chat");
  };

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
      <div className="container px-4 py-8 mx-auto">
        <h1 className="text-3xl font-bold mb-6 font-display animate-fade-in">AI Agent Templates</h1>
        
        {/* Filters and Search */}
        <div className="flex flex-wrap gap-4 mb-6 animate-fade-in">
          <div className="flex-grow max-w-md relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search templates..."
              className="pl-10 pr-4 py-2 w-full rounded-xl border border-border bg-background/50 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            />
          </div>
          
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setSortBy("popular")}
              className={`px-3 py-2 text-sm rounded-xl flex items-center gap-1.5 transition-colors ${
                sortBy === "popular" 
                  ? "bg-primary text-primary-foreground" 
                  : "bg-accent/50 hover:bg-accent text-foreground"
              }`}
            >
              <ArrowUpDown className="w-4 h-4" />
              Popular
            </button>
            
            <button 
              onClick={() => setSortBy("recent")}
              className={`px-3 py-2 text-sm rounded-xl flex items-center gap-1.5 transition-colors ${
                sortBy === "recent" 
                  ? "bg-primary text-primary-foreground" 
                  : "bg-accent/50 hover:bg-accent text-foreground"
              }`}
            >
              <ArrowUpDown className="w-4 h-4" />
              Recent
            </button>
            
            <button 
              onClick={() => setSortBy("rating")}
              className={`px-3 py-2 text-sm rounded-xl flex items-center gap-1.5 transition-colors ${
                sortBy === "rating" 
                  ? "bg-primary text-primary-foreground" 
                  : "bg-accent/50 hover:bg-accent text-foreground"
              }`}
            >
              <ArrowUpDown className="w-4 h-4" />
              Rating
            </button>
            
            <button 
              onClick={() => setFilterFavorites(!filterFavorites)}
              className={`px-3 py-2 text-sm rounded-xl flex items-center gap-1.5 transition-colors ${
                filterFavorites 
                  ? "bg-primary text-primary-foreground" 
                  : "bg-accent/50 hover:bg-accent text-foreground"
              }`}
            >
              <Star className="w-4 h-4" />
              Favorites
            </button>
          </div>
        </div>
        
        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
          {/* Create New Template Card */}
          <div 
            onClick={() => navigate("/customize")}
            className="glass-card rounded-2xl p-6 border-2 border-dashed border-primary/30 flex flex-col items-center justify-center min-h-[300px] cursor-pointer hover:bg-primary/5 transition-all duration-300 animate-fade-in"
          >
            <PlusCircle className="w-12 h-12 text-primary mb-4" />
            <h3 className="text-xl font-semibold text-center mb-2">Create Custom Template</h3>
            <p className="text-sm text-center text-muted-foreground">
              Design your own AI agent with custom expertise and capabilities
            </p>
          </div>
          
          {/* Template Cards */}
          {filteredTemplates.map((template, index) => (
            <div 
              key={template.id}
              className="glass-card rounded-2xl p-6 hover:shadow-xl transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <Bot className="w-6 h-6 text-primary" />
                </div>
                <button 
                  onClick={() => toggleFavorite(template.id)}
                  className="p-2 hover:bg-accent/50 rounded-full transition-colors"
                >
                  {template.isFavorite ? (
                    <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  ) : (
                    <StarOff className="w-5 h-5 text-muted-foreground" />
                  )}
                </button>
              </div>
              
              <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                {template.name}
                {template.isPremium && (
                  <span className="px-2 py-0.5 bg-yellow-500/20 text-yellow-500 text-xs rounded-full">
                    Premium
                  </span>
                )}
              </h3>
              
              <p className="text-sm text-muted-foreground mb-4">
                {template.description}
              </p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {template.expertise.map((skill, i) => (
                  <span 
                    key={i}
                    className="px-2 py-1 bg-accent/50 text-xs rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
              
              <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  <span>{template.rating.toFixed(1)}</span>
                </div>
                <span>{template.usageCount.toLocaleString()} uses</span>
              </div>
              
              <button 
                onClick={() => useTemplate(template.id)}
                className="w-full button-primary py-2 rounded-xl transition-all duration-300 hover:scale-105"
              >
                <Sparkles className="w-4 h-4" />
                Use Template
              </button>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Templates;


import { useEffect } from "react";
import Layout from "../components/Layout";
import Hero from "../components/Hero";
import Features from "../components/Features";
import AgentCard from "../components/AgentCard";
import { ArrowRight, Bot, Twitter, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  
  // Sample agents for showcase
  const sampleAgents = [
    {
      name: "Marky",
      description: "Marketing content specialist with focus on engagement",
      avatar: "",
      expertise: ["Marketing", "Engagement", "Analytics"]
    },
    {
      name: "Techno",
      description: "Tech industry specialist with cutting-edge knowledge",
      avatar: "",
      expertise: ["Tech", "Innovation", "Gadgets"]
    },
    {
      name: "Inspira",
      description: "Motivational content creator for inspirational tweets",
      avatar: "",
      expertise: ["Motivation", "Growth", "Positivity"]
    }
  ];
  
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
      <Hero />
      <Features />
      
      {/* Agent templates section */}
      <section className="py-16 md:py-24">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-display">Agent Templates</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Start with a pre-configured agent or create your own custom assistant
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {sampleAgents.map((agent, index) => (
              <AgentCard 
                key={agent.name}
                {...agent}
                onCustomize={() => navigate("/customize")}
              />
            ))}
          </div>
          
          <div className="mt-10 text-center">
            <button
              onClick={() => navigate("/customize")}
              className="button-outline inline-flex"
            >
              <Bot className="w-4 h-4" />
              <span>Create Custom Agent</span>
            </button>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 md:py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-indigo-600/10 backdrop-blur-sm"></div>
        <div className="container px-4 mx-auto relative">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 font-display">
              Ready to Transform Your Twitter Content?
            </h2>
            <p className="text-lg mb-8 text-muted-foreground">
              Start creating engaging Twitter content with the help of AI today. No more writer's block or endless drafting.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={() => navigate("/chat")}
                className="button-primary"
              >
                <span>Start Creating</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => navigate("/generate")}
                className="button-outline"
              >
                <Twitter className="w-4 h-4" />
                <span>Try Content Generator</span>
              </button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Info Section */}
      <section className="py-16 md:py-20 bg-accent/50">
        <div className="container px-4 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass-card p-6 rounded-xl">
              <h3 className="text-xl font-semibold mb-4">How It Works</h3>
              <ul className="space-y-3">
                <li className="flex gap-2">
                  <ChevronRight className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span>Customize your AI agent's personality and expertise</span>
                </li>
                <li className="flex gap-2">
                  <ChevronRight className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span>Chat with your agent to brainstorm content ideas</span>
                </li>
                <li className="flex gap-2">
                  <ChevronRight className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span>Generate optimized Twitter posts with one click</span>
                </li>
                <li className="flex gap-2">
                  <ChevronRight className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span>Post directly to Twitter or save for later</span>
                </li>
              </ul>
            </div>
            
            <div className="glass-card p-6 rounded-xl">
              <h3 className="text-xl font-semibold mb-4">Web3 Integration</h3>
              <p className="text-muted-foreground mb-4">
                Our platform leverages web3 technology to provide:
              </p>
              <ul className="space-y-3">
                <li className="flex gap-2">
                  <ChevronRight className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span>Decentralized storage of your agent configurations</span>
                </li>
                <li className="flex gap-2">
                  <ChevronRight className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span>Enhanced privacy with wallet-based authentication</span>
                </li>
                <li className="flex gap-2">
                  <ChevronRight className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span>Full ownership of your data and content</span>
                </li>
              </ul>
            </div>
            
            <div className="glass-card p-6 rounded-xl">
              <h3 className="text-xl font-semibold mb-4">Why Choose Us</h3>
              <ul className="space-y-3">
                <li className="flex gap-2">
                  <ChevronRight className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span>Advanced AI trained on successful Twitter content</span>
                </li>
                <li className="flex gap-2">
                  <ChevronRight className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span>Seamless integration with Twitter for posting</span>
                </li>
                <li className="flex gap-2">
                  <ChevronRight className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span>Customizable agents that match your brand voice</span>
                </li>
                <li className="flex gap-2">
                  <ChevronRight className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span>Time-saving content generation workflow</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;

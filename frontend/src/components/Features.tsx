
import { MessageSquare, Edit3, Bot, Twitter, Sparkles, Share2 } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: MessageSquare,
      title: "AI Chat",
      description: "Have natural conversations with your AI agent to collaborate on content ideas.",
      color: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
    },
    {
      icon: Edit3,
      title: "Content Generation",
      description: "Generate Twitter posts optimized for engagement with a single click.",
      color: "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400",
    },
    {
      icon: Bot,
      title: "Agent Customization",
      description: "Tailor your AI agent's personality, tone, and expertise to match your brand.",
      color: "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400",
    },
    {
      icon: Twitter,
      title: "Twitter Integration",
      description: "Seamlessly post your generated content directly to Twitter.",
      color: "bg-sky-100 text-sky-600 dark:bg-sky-900/30 dark:text-sky-400",
    },
    {
      icon: Sparkles,
      title: "Smart Suggestions",
      description: "Get intelligent content recommendations based on your past performance.",
      color: "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400",
    },
    {
      icon: Share2,
      title: "Web3 Powered",
      description: "Secure, decentralized storage of your agent settings and preferences.",
      color: "bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-accent/50">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-display">Features & Capabilities</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to create engaging Twitter content with AI assistance
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <div 
              key={feature.title}
              className="glass-card p-6 rounded-xl transition-all duration-300 hover:shadow-xl animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className={`w-12 h-12 rounded-lg ${feature.color} flex items-center justify-center mb-4`}>
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;

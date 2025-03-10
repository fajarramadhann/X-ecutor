import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Layout from "../components/Layout";
import ContentEditor from "../components/ContentEditor";
import { ArrowLeft, Lightbulb, Rocket, Clock, Wallet } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useWallet } from "@aptos-labs/wallet-adapter-react";

const Generate = () => {
  const { connected } = useWallet();
  const location = useLocation();
  const navigate = useNavigate();
  const [initialContent, setInitialContent] = useState("");
  const [hasScrolled, setHasScrolled] = useState(false);
  
  // Get content from location state if available (from chat page)
  useEffect(() => {
    if (location.state && location.state.content) {
      setInitialContent(location.state.content);
    }
  }, [location.state]);
  
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Track scroll for animation
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100 && !hasScrolled) {
        setHasScrolled(true);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasScrolled]);

  if (!connected) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center min-h-[80vh]">
          <div className="w-full max-w-md mx-auto space-y-8 text-center">
            {/* Icon Container */}
            <div className="relative">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto ring-8 ring-primary/5">
                <Wallet className="w-10 h-10 text-primary" />
              </div>
              <div className="absolute -bottom-1 right-1/2 transform translate-x-1/2">
                <span className="flex h-4 w-4">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-20"></span>
                  <span className="relative inline-flex rounded-full h-4 w-4 bg-primary"></span>
                </span>
              </div>
            </div>

            {/* Text Content */}
            <div className="space-y-3">
              <h2 className="text-2xl font-semibold tracking-tight">
                Connect Your Wallet
              </h2>
              <p className="text-gray-500 dark:text-gray-400 max-w-sm mx-auto">
                Please connect your wallet to access the Content Generator and start creating engaging tweets.
              </p>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container px-4 py-8 mx-auto">
        <button 
          onClick={() => navigate('/chat')}
          className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors duration-300 mb-4 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
          <span>Back to chat</span>
        </button>
        
        <h1 className="text-3xl font-bold mb-2 font-display animate-fade-in">Content Generator</h1>
        <p className="text-muted-foreground mb-6 animate-fade-in animate-delay-100">
          Create, edit, and post Twitter content optimized for engagement
        </p>
        
        <div className="max-w-3xl mx-auto">
          <ContentEditor initialContent={initialContent} />
          
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div 
              className="glass-card rounded-2xl p-5 transition-all duration-500 hover:shadow-lg hover:border-primary/30 animate-fade-in animate-delay-200"
            >
              <div className="flex items-start gap-3 mb-3">
                <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                  <Lightbulb className="w-4 h-4 text-blue-400" />
                </div>
                <h3 className="font-medium">Tips for Effective Tweets</h3>
              </div>
              
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2 animate-fade-in" style={{ animationDelay: '300ms' }}>
                  <div className="w-2 h-2 rounded-full bg-primary mt-1.5"></div>
                  <span>Keep tweets concise and focused on a single idea</span>
                </li>
                <li className="flex items-start gap-2 animate-fade-in" style={{ animationDelay: '400ms' }}>
                  <div className="w-2 h-2 rounded-full bg-primary mt-1.5"></div>
                  <span>Use hashtags strategically (1-2 is often optimal)</span>
                </li>
                <li className="flex items-start gap-2 animate-fade-in" style={{ animationDelay: '500ms' }}>
                  <div className="w-2 h-2 rounded-full bg-primary mt-1.5"></div>
                  <span>Include a clear call-to-action when appropriate</span>
                </li>
                <li className="flex items-start gap-2 animate-fade-in" style={{ animationDelay: '600ms' }}>
                  <div className="w-2 h-2 rounded-full bg-primary mt-1.5"></div>
                  <span>Ask questions to encourage engagement</span>
                </li>
              </ul>
            </div>
            
            <div 
              className="glass-card rounded-2xl p-5 transition-all duration-500 hover:shadow-lg hover:border-primary/30 animate-fade-in animate-delay-300"
            >
              <div className="flex items-start gap-3 mb-3">
                <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center">
                  <Clock className="w-4 h-4 text-purple-400" />
                </div>
                <h3 className="font-medium">Optimal Posting Times</h3>
              </div>
              
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2 animate-fade-in" style={{ animationDelay: '400ms' }}>
                  <div className="w-2 h-2 rounded-full bg-primary mt-1.5"></div>
                  <span>Weekdays: 8-10am, 12-1pm, and 6-7pm</span>
                </li>
                <li className="flex items-start gap-2 animate-fade-in" style={{ animationDelay: '500ms' }}>
                  <div className="w-2 h-2 rounded-full bg-primary mt-1.5"></div>
                  <span>Weekends: 9am-12pm</span>
                </li>
                <li className="flex items-start gap-2 animate-fade-in" style={{ animationDelay: '600ms' }}>
                  <div className="w-2 h-2 rounded-full bg-primary mt-1.5"></div>
                  <span>Best days: Tuesday, Wednesday, and Thursday</span>
                </li>
                <li className="flex items-start gap-2 animate-fade-in" style={{ animationDelay: '700ms' }}>
                  <div className="w-2 h-2 rounded-full bg-primary mt-1.5"></div>
                  <span>Consider your specific audience demographics</span>
                </li>
              </ul>
            </div>
            
            <div className={`col-span-1 md:col-span-2 glass-card rounded-2xl p-5 transition-all duration-500 hover:shadow-lg hover:border-primary/30 ${hasScrolled ? 'animate-fade-in' : 'opacity-0'}`}>
              <div className="flex items-start gap-3 mb-3">
                <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                  <Rocket className="w-4 h-4 text-green-400" />
                </div>
                <h3 className="font-medium">Engagement Boosters</h3>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div className="space-y-2">
                  <h4 className="font-medium text-primary">Do's</h4>
                  <ul className="space-y-1">
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-500 mt-1.5"></div>
                      <span>Use emojis sparingly for emphasis</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-500 mt-1.5"></div>
                      <span>Share unique insights or perspectives</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-500 mt-1.5"></div>
                      <span>Respond to comments quickly</span>
                    </li>
                  </ul>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-medium text-destructive">Don'ts</h4>
                  <ul className="space-y-1">
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 rounded-full bg-destructive mt-1.5"></div>
                      <span>Overuse hashtags (no more than 2-3)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 rounded-full bg-destructive mt-1.5"></div>
                      <span>Post the same content repeatedly</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 rounded-full bg-destructive mt-1.5"></div>
                      <span>Engage in controversial topics randomly</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Generate;

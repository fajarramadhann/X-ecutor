
import React, { useState } from "react";
import { 
  Twitter, Copy, Check, RefreshCw, Send, Sparkles, 
  Edit, ThumbsUp, ThumbsDown, Loader2,
  User, MessageSquare, Heart, Zap
} from "lucide-react";
import { toast } from "sonner";
import VoiceDictation from "./VoiceDictation";
import DocumentUploader from "./DocumentUploader";

interface ContentEditorProps {
  initialContent?: string;
}

const ContentEditor = ({ initialContent = "" }: ContentEditorProps) => {
  const [content, setContent] = useState(initialContent);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isImproving, setIsImproving] = useState(false);
  const [isPosting, setIsPosting] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [characterCount, setCharacterCount] = useState(initialContent.length);
  const [tweetVariations, setTweetVariations] = useState<string[]>([]);
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [showHashtagSuggestions, setShowHashtagSuggestions] = useState(false);
  const [mood, setMood] = useState<string>("neutral");
  const [documentContext, setDocumentContext] = useState<string>("");
  const [showDocumentUploader, setShowDocumentUploader] = useState(false);
  
  const maxCharacters = 280;

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
    setContent(newContent);
    setCharacterCount(newContent.length);
  };

  const handleVoiceTranscript = (transcript: string) => {
    const newContent = content ? `${content} ${transcript}` : transcript;
    setContent(newContent);
    setCharacterCount(newContent.length);
    toast.success("Voice transcription added");
  };

  const handleDocumentContent = (extractedContent: string) => {
    setDocumentContext(extractedContent);
    toast.success("Document content extracted and added as context");
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
    toast.success("Copied to clipboard");
  };

  const handleImprove = () => {
    if (!content.trim()) {
      toast.error("Please enter some content to improve");
      return;
    }
    
    setIsImproving(true);
    
    // Simulate AI improvement
    setTimeout(() => {
      let improvedContent = content.trim();
      
      // If we have document context, use it to enhance the content
      if (documentContext) {
        improvedContent = `${improvedContent} (Enhanced with document insights) #ContentCreation`;
      } else {
        improvedContent = `${improvedContent} (Improved with clearer messaging and better engagement hooks) #AI #ContentCreation`;
      }
      
      setContent(improvedContent);
      setCharacterCount(improvedContent.length);
      setIsImproving(false);
      toast.success("Content improved successfully");
    }, 1500);
  };

  const generateVariations = () => {
    if (!content.trim() && !initialContent.trim()) {
      setIsGenerating(true);
      
      // Generate fresh content if nothing exists
      setTimeout(() => {
        let freshContent = "Just discovered how AI can revolutionize your Twitter presence. Engage more, post better, grow faster! #AITwitter #ContentCreation";
        
        // If document context exists, incorporate it
        if (documentContext) {
          freshContent = "Just analyzed key insights from my research documents and found something interesting: AI-powered content creation is 5x more effective for engagement. #DataDriven #AITwitter";
        }
        
        setContent(freshContent);
        setCharacterCount(freshContent.length);
        setIsGenerating(false);
        
        // Suggest hashtags
        suggestHashtags();
      }, 1500);
      return;
    }
    
    setIsGenerating(true);

    // Simulate variations based on existing content and document context
    setTimeout(() => {
      const variations = documentContext 
        ? [
            "Based on my document analysis, we're seeing a 40% increase in engagement when tweets include data-backed insights. This is huge for content creators! #DataDriven #ContentStrategy",
            "After reviewing my research, I found that the most successful Twitter accounts post insights from curated documents. Here's why it works... #ContentCuration #TwitterStrategy",
            "Document analysis reveals: tweets with statistics get 36% more engagement. Try including more data points in your next post! #EngagementTips #TwitterMetrics",
            "Just extracted key points from my latest research and found a pattern: quality over quantity is still the winner for Twitter growth. #ResearchBacked #SocialStrategy"
          ]
        : [
            "Just discovered an amazing Web3 project that's revolutionizing content creation. The future of Twitter engagement might just be AI-powered! #Web3 #AI #ContentCreation",
            "Hot take: AI agents for social media aren't just a trend, they're the future of authentic engagement. Here's why you should be paying attention... #AITwitter #DigitalMarketing",
            "Remember when we had to write all our tweets manually? Those days are ending. Just tried this new Web3 AI agent for Twitter and I'm honestly impressed. #FutureOfSocial",
            "Experimenting with AI for my Twitter content and seeing 2x engagement already. Anyone else trying AI content tools? Let me know your experience! #ContentStrategy"
          ];
      
      setTweetVariations(variations);
      setIsGenerating(false);
      
      // Suggest hashtags
      suggestHashtags();
    }, 1500);
  };

  const suggestHashtags = () => {
    // Generate hashtags based on content or document context
    const baseHashtags = [
      "AITwitter", "ContentCreation", "DigitalMarketing", 
      "SocialMedia", "ContentStrategy", "Web3", 
      "FutureOfSocial", "TweetSmarter", "TwitterTips"
    ];
    
    const documentHashtags = [
      "DataDriven", "ResearchBacked", "DocumentInsights",
      "ContentCuration", "AnalyticsDriven", "InformationAge",
      "KnowledgeSharing", "ResearchFindings", "InsightfulContent"
    ];
    
    const suggestedHashtags = documentContext
      ? [...documentHashtags, ...baseHashtags]
      : baseHashtags;
    
    setHashtags(suggestedHashtags.sort(() => 0.5 - Math.random()).slice(0, 5));
    setShowHashtagSuggestions(true);
  };

  const selectVariation = (variation: string) => {
    setContent(variation);
    setCharacterCount(variation.length);
    setTweetVariations([]);
    toast.success("Variation selected");
  };

  const addHashtag = (hashtag: string) => {
    if (!content.includes(`#${hashtag}`)) {
      const newContent = `${content} #${hashtag}`.trim();
      setContent(newContent);
      setCharacterCount(newContent.length);
      toast.success(`Added #${hashtag}`);
    } else {
      toast.info(`#${hashtag} already included`);
    }
  };

  const handlePostToTwitter = () => {
    if (!content.trim()) {
      toast.error("Please create some content before posting");
      return;
    }
    
    setIsPosting(true);
    
    // Simulate posting to Twitter
    setTimeout(() => {
      setIsPosting(false);
      toast.success("Posted to Twitter successfully!", {
        description: "Your post has been shared with your followers."
      });
    }, 2000);
  };

  const adjustMood = (newMood: string) => {
    setMood(newMood);
    let moodContent = content;
    
    // Simple mood-based content adjustment
    switch(newMood) {
      case "professional":
        moodContent = "Professional announcement: " + content.replace(/!+/g, '.');
        break;
      case "casual":
        moodContent = "Just thinking out loud... " + content;
        break;
      case "excited":
        moodContent = "I'm so excited to share that " + content + " 🎉";
        break;
      case "question":
        moodContent = content.replace(/\.$/, '') + "? What do you think?";
        break;
    }
    
    setContent(moodContent);
    setCharacterCount(moodContent.length);
    toast.success(`Content tone adjusted to ${newMood}`);
  };

  return (
    <div className="glass-card rounded-2xl p-6 animate-fade-in transition-all duration-300 hover:shadow-xl">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold">Tweet Editor</h3>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowDocumentUploader(!showDocumentUploader)}
            className={`text-xs px-3 py-1 rounded-full transition-colors duration-300 ${
              showDocumentUploader
                ? "bg-primary text-primary-foreground"
                : "bg-secondary/50 text-secondary-foreground hover:bg-secondary/80"
            }`}
          >
            {showDocumentUploader ? "Hide Document Upload" : "Add Document Context"}
          </button>
          <span className={`text-sm ${
            characterCount > maxCharacters ? "text-destructive" : "text-muted-foreground"
          }`}>
            {characterCount}/{maxCharacters}
          </span>
        </div>
      </div>
      
      {showDocumentUploader && (
        <div className="mb-4 animate-fade-in">
          <DocumentUploader onDocumentContent={handleDocumentContent} />
          
          {documentContext && (
            <div className="mt-4 p-3 border border-primary/20 rounded-lg bg-primary/5 animate-fade-in">
              <h4 className="text-xs font-medium mb-1 flex items-center gap-1">
                <Check className="w-3 h-3 text-green-500" />
                Document Context Added
              </h4>
              <p className="text-xs text-muted-foreground">
                {documentContext.length > 100
                  ? documentContext.substring(0, 100) + "..."
                  : documentContext}
              </p>
            </div>
          )}
        </div>
      )}
      
      <div className="mb-6">
        <div className="relative overflow-hidden mb-4">
          <textarea
            value={content}
            onChange={handleContentChange}
            placeholder="Write your tweet here or generate one with AI..."
            className="input-field w-full min-h-[120px] resize-none transition-all duration-300 focus:ring-2"
            maxLength={350} // Allow slightly over to show the warning
          />
          <div className="absolute bottom-3 right-3 flex gap-2">
            <VoiceDictation onTranscript={handleVoiceTranscript} />
            <button
              onClick={handleCopy}
              className="p-2 rounded-full bg-accent hover:bg-accent/80 transition-all duration-300 hover:scale-105"
              title="Copy to clipboard"
            >
              {isCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Content Mood Selector */}
        <div className="mb-4">
          <h4 className="text-sm font-medium mb-2">Content Tone</h4>
          <div className="flex flex-wrap gap-2">
            {['neutral', 'professional', 'casual', 'excited', 'question'].map((toneOption) => (
              <button
                key={toneOption}
                onClick={() => adjustMood(toneOption)}
                className={`px-3 py-1.5 text-xs rounded-full capitalize transition-all duration-300 ${
                  mood === toneOption 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-secondary/50 text-secondary-foreground hover:bg-secondary/80'
                }`}
              >
                {toneOption}
              </button>
            ))}
          </div>
        </div>

        {/* Preview */}
        <div className="border border-border rounded-2xl p-4 bg-background/10 transition-all duration-300 hover:border-primary/30">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center animate-float">
              <User className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="font-medium">Your Name</span>
                <span className="text-muted-foreground text-sm">@yourhandle</span>
              </div>
              <p className="mt-1 text-[15px] whitespace-pre-wrap break-words">
                {content || "Your tweet will appear here"}
              </p>
              {content && (
                <div className="mt-3 flex items-center gap-5 text-muted-foreground">
                  <div className="flex items-center gap-1 hover:text-blue-400 transition-colors duration-300 cursor-pointer">
                    <MessageSquare className="w-4 h-4" />
                    <span className="text-xs">0</span>
                  </div>
                  <div className="flex items-center gap-1 hover:text-green-400 transition-colors duration-300 cursor-pointer">
                    <RefreshCw className="w-4 h-4" />
                    <span className="text-xs">0</span>
                  </div>
                  <div className="flex items-center gap-1 hover:text-red-400 transition-colors duration-300 cursor-pointer">
                    <Heart className="w-4 h-4" />
                    <span className="text-xs">0</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Hashtag Suggestions */}
        {showHashtagSuggestions && (
          <div className="mt-4 animate-slide-up">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium">Suggested Hashtags</h4>
              <button 
                onClick={() => setShowHashtagSuggestions(false)}
                className="text-xs text-muted-foreground hover:text-foreground transition-colors duration-300"
              >
                Hide
              </button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {hashtags.map((hashtag) => (
                <button
                  key={hashtag}
                  onClick={() => addHashtag(hashtag)}
                  className="px-2 py-1 text-xs rounded-full border border-primary/30 bg-primary/5 hover:bg-primary/15 transition-all duration-300 hover:scale-105"
                >
                  #{hashtag}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Variations */}
        {tweetVariations.length > 0 && (
          <div className="mt-6 space-y-3 animate-slide-up">
            <h4 className="font-medium">Alternative versions:</h4>
            {tweetVariations.map((variation, index) => (
              <div 
                key={index}
                onClick={() => selectVariation(variation)}
                className="p-3 border border-border rounded-xl hover:bg-accent/10 cursor-pointer transition-all duration-300 hover:border-primary/30"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <p className="text-sm">{variation}</p>
                <div className="flex justify-end mt-2 gap-2">
                  <button className="p-1 rounded-full hover:bg-accent/20 transition-all duration-300">
                    <ThumbsUp className="w-3.5 h-3.5 text-muted-foreground" />
                  </button>
                  <button className="p-1 rounded-full hover:bg-accent/20 transition-all duration-300">
                    <ThumbsDown className="w-3.5 h-3.5 text-muted-foreground" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      <div className="flex flex-wrap gap-3">
        <button 
          onClick={generateVariations}
          className="button-outline group transition-all duration-300 hover:scale-105"
          disabled={isGenerating}
        >
          {isGenerating ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Sparkles className="w-4 h-4 group-hover:animate-pulse" />
          )}
          <span>{content.trim() ? "Generate Alternatives" : "Generate Content"}</span>
        </button>
        
        <button 
          onClick={handleImprove}
          className="button-outline group transition-all duration-300 hover:scale-105"
          disabled={isImproving || !content.trim()}
        >
          {isImproving ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Zap className="w-4 h-4 group-hover:text-yellow-400" />
          )}
          <span>Improve Content</span>
        </button>
        
        <button 
      onClick={handlePostToTwitter}
      className="button-outline group transition-all duration-300 hover:scale-105"
      disabled={isPosting || !content.trim()}
    >
      {isPosting ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : (
        <Twitter className="w-4 h-4 group-hover:text-[#1DA1F2]" />
      )}
      <span>Post to Twitter X-ecutor</span>
    </button>
    
    <button 
      onClick={handlePostToTwitter}
      className="button-primary group transition-all duration-300 hover:scale-105"
      disabled={isPosting || !content.trim()}
    >
      {isPosting ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : (
        <Twitter className="w-4 h-4 group-hover:text-white" />
      )}
      <span>Post to your Twitter</span>
    </button>
      </div>
    </div>
  );
};

export default ContentEditor;

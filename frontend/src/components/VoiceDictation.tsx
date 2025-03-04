
import { useState, useEffect } from 'react';
import { Mic, MicOff, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

interface VoiceDictationProps {
  onTranscript: (text: string) => void;
}

const VoiceDictation = ({ onTranscript }: VoiceDictationProps) => {
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);
  const [isSupported, setIsSupported] = useState(true);

  useEffect(() => {
    // Check if browser supports SpeechRecognition
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      // Get the appropriate constructor
      const SpeechRecognitionConstructor = 
        // @ts-ignore - Ignoring type checking for browser API detection
        window.SpeechRecognition || 
        // @ts-ignore - Ignoring type checking for browser API detection
        window.webkitSpeechRecognition;
        
      const recognitionInstance = new SpeechRecognitionConstructor();
      
      recognitionInstance.continuous = true;
      recognitionInstance.interimResults = true;
      recognitionInstance.lang = 'en-US';
      
      recognitionInstance.onresult = (event: SpeechRecognitionEvent) => {
        const transcript = Array.from(event.results)
          .map(result => result[0])
          .map(result => result.transcript)
          .join('');
        
        if (event.results[0].isFinal) {
          onTranscript(transcript);
        }
      };
      
      recognitionInstance.onerror = (event: SpeechRecognitionErrorEvent) => {
        console.error('Speech recognition error', event.error);
        setIsListening(false);
        toast.error('Speech recognition error', {
          description: event.error
        });
      };
      
      setRecognition(recognitionInstance);
    } else {
      setIsSupported(false);
      toast.error('Speech recognition not supported', {
        description: 'Your browser does not support speech recognition'
      });
    }
    
    return () => {
      if (recognition) {
        recognition.stop();
      }
    };
  }, [onTranscript]);

  const toggleListening = () => {
    if (!recognition) return;
    
    if (isListening) {
      recognition.stop();
      setIsListening(false);
      toast.success('Voice dictation stopped');
    } else {
      recognition.start();
      setIsListening(true);
      toast.success('Voice dictation started', {
        description: 'Speak clearly and I will transcribe your words'
      });
    }
  };

  if (!isSupported) {
    return null;
  }

  return (
    <button
      onClick={toggleListening}
      className={`p-2 rounded-full transition-all duration-300 ${
        isListening 
          ? 'bg-primary text-primary-foreground animate-pulse-glow' 
          : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
      }`}
      title={isListening ? 'Stop dictation' : 'Start voice dictation'}
    >
      {isListening ? (
        <MicOff className="w-5 h-5" />
      ) : (
        <Mic className="w-5 h-5" />
      )}
    </button>
  );
};

export default VoiceDictation;

import { useNavigate, useLocation } from "react-router-dom";
import {
  Menu,
  X,
  Twitter,
  User,
  MessageSquare,
  Edit3,
  LayoutTemplate,
} from "lucide-react";
import { useState, useEffect } from "react";
import ConnectButtons from "./ConnectButtons";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Chat", path: "/chat", icon: MessageSquare },
    { name: "Generate", path: "/generate", icon: Edit3 },
    { name: "Templates", path: "/templates", icon: LayoutTemplate },
    { name: "Customize", path: "/customize", icon: User },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-background/80 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 py-4 md:py-3 flex items-center justify-between">
        <div className="flex items-center">
          <button
            onClick={() => navigate("/")}
            className="font-display font-bold text-xl flex items-center gap-2"
          >
            <span className="flex items-center">
              X-<span className="text-primary">ecutor</span>
            </span>
          </button>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {navItems.map((item) => (
            <button
              key={item.name}
              onClick={() => navigate(item.path)}
              className={`nav-item ${
                location.pathname === item.path ? "nav-item-active" : ""
              }`}
            >
              <span className="flex items-center gap-1.5">
                {item.icon && <item.icon className="w-4 h-4" />}
                {item.name}
              </span>
            </button>
          ))}

          <div className="ml-4">
            <ConnectButtons />
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle Menu"
        >
          {isMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-background/95 backdrop-blur-md border-b border-border animate-fade-in">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-3">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => navigate(item.path)}
                  className={`flex items-center gap-2 p-2 rounded-md ${
                    location.pathname === item.path
                      ? "bg-primary/10 text-primary"
                      : "hover:bg-muted"
                  }`}
                >
                  {item.icon && <item.icon className="w-5 h-5" />}
                  {item.name}
                </button>
              ))}

              <div className="pt-3 border-t border-border">
                <ConnectButtons />
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;

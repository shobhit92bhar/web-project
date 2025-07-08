import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  SiCloudflare, 
  SiF5, 
  SiAkamai, 
  SiDell, 
  SiSonicwall
} from "react-icons/si";

// Custom Sophos logo component - accurate rounded shield with S
const SophosLogo = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
  <div className={className} style={style}>
    <svg viewBox="0 0 100 100" className="w-full h-full">
      {/* Accurate Sophos shield - flat top, curved bottom */}
      <path
        d="M20 15 L80 15 L80 45 C80 65, 50 90, 50 90 C50 90, 20 65, 20 45 L20 15 Z"
        fill="#00549F"
      />
      {/* Sophos-style "S" */}
      <text
        x="50"
        y="65"
        textAnchor="middle"
        fill="white"
        fontSize="44"
        fontWeight="800"
        fontFamily="'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif"
        style={{ fontStretch: 'condensed' }}
      >
        S
      </text>
    </svg>
  </div>
);

const companies = [
  { name: "Cloudflare", Icon: SiCloudflare, color: "#F48120", type: "icon" as const },
  { name: "F5", Icon: SiF5, color: "#DC143C", type: "icon" as const },
  { name: "Akamai", Icon: SiAkamai, color: "#0066CC", type: "icon" as const },
  { name: "Dell", Icon: SiDell, color: "#007DB8", type: "icon" as const },
  { name: "SonicWall", Icon: SiSonicwall, color: "#FF6600", type: "icon" as const },
  { name: "Sophos", Icon: SophosLogo, color: "#00549F", type: "icon" as const },
];

export default function CompanyCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);

  // Create extended array for smooth infinite scroll
  const extendedCompanies = [...companies, ...companies, ...companies];
  const startIndex = companies.length; // Start from the middle set

  const nextSlide = () => {
    setCurrentSlide((prev) => prev + 1);
  };

  const previousSlide = () => {
    setCurrentSlide((prev) => prev - 1);
  };

  // Handle infinite scroll logic
  useEffect(() => {
    if (currentSlide >= companies.length * 2) {
      setTimeout(() => {
        setIsTransitioning(false);
        setCurrentSlide(companies.length);
        setTimeout(() => setIsTransitioning(true), 50);
      }, 500);
    } else if (currentSlide < companies.length) {
      setTimeout(() => {
        setIsTransitioning(false);
        setCurrentSlide(companies.length * 2 - 1);
        setTimeout(() => setIsTransitioning(true), 50);
      }, 500);
    }
  }, [currentSlide]);

  // Auto-advance carousel
  useEffect(() => {
    const interval = setInterval(nextSlide, 4000);
    return () => clearInterval(interval);
  }, []);

  // Initialize to middle position
  useEffect(() => {
    setCurrentSlide(startIndex);
  }, []);

  return (
    <div className="relative overflow-hidden mb-16">
      <div 
        className={`flex ${isTransitioning ? 'transition-transform duration-500 ease-in-out' : ''}`}
        style={{ transform: `translateX(-${currentSlide * (192 + 64)}px)` }}
      >
        {extendedCompanies.map((company, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-48 h-32 mx-8 flex flex-col items-center justify-center bg-card border border-border rounded-lg hover:border-primary transition-all duration-300"
          >
            <company.Icon 
              className={`mb-2 ${company.name === 'Sophos' ? 'w-20 h-20' : 'text-8xl'}`} 
              style={{ color: company.color }} 
            />
            <div className="text-sm font-medium text-muted-foreground">
              {company.name}
            </div>
          </div>
        ))}
      </div>
      
      <Button
        variant="default"
        size="icon"
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-primary hover:bg-primary/90 rounded-full"
        onClick={previousSlide}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      
      <Button
        variant="default"
        size="icon"
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-primary hover:bg-primary/90 rounded-full"
        onClick={nextSlide}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}

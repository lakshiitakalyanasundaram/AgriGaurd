
import { cn } from "@/lib/utils";

interface PlantIconProps {
  className?: string;
}

const PlantIcon = ({ className }: PlantIconProps) => {
  return (
    <svg 
      className={cn("w-32 h-32", className)} 
      viewBox="0 0 100 125" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <g className="plant-leaves">
        {/* Main stem */}
        <path 
          d="M60,80c0,0-10-20-10-40s10-30,10-30s10,10,10,30S60,80,60,80z" 
          fill="#8bc34a"
          className="animate-[pulse_4s_ease-in-out_infinite]"
        />
        
        {/* Bottom left leaf */}
        <path 
          d="M50,70c0,0-10-15-25-15s-20,15-20,15s5,10,20,10S50,70,50,70z" 
          fill="#8bc34a"
          className="animate-[pulse_5s_ease-in-out_infinite]"
        />
        
        {/* Top left leaf */}
        <path 
          d="M48,50c0,0-5-10-15-10s-15,10-15,10s5,5,15,5S48,50,48,50z" 
          fill="#8bc34a"
          className="animate-[pulse_4.5s_ease-in-out_infinite]"
        />
        
        {/* Pot */}
        <rect fill="#d68b52" x="55" y="80" width="10" height="20" />
        <rect fill="#d68b52" x="45" y="95" width="30" height="5" />
      </g>
    </svg>
  );
};

export default PlantIcon;

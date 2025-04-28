
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="bg-[#8bc34a] text-white shadow-md">
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold tracking-tight">PlantDoctor</h1>
          </div>
          
          <ul className="hidden md:flex space-x-8">
            <li>
              <a 
                href="#" 
                className="font-medium hover:text-white/80 transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:origin-bottom-right after:scale-x-0 after:bg-white after:transition-transform hover:after:origin-bottom-left hover:after:scale-x-100"
              >
                Home
              </a>
            </li>
          </ul>
          
          <div className="flex items-center space-x-3">
            <Button variant="outline" className="bg-transparent border-white text-white hover:bg-white/10">
              Login
            </Button>
            <Button className="bg-white text-[#8bc34a] hover:bg-white/90">
              Sign Up
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;

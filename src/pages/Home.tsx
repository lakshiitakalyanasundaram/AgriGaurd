
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Header from "@/components/Header";
import PlantIcon from "@/components/PlantIcon";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f5f5f5] flex flex-col">
      <Header />
      
      <main className="flex-1">
        <section className="hero relative bg-[#8bc34a] text-white text-center py-24 px-4 mb-10">
          <div className="container mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">Detect Plant Diseases Instantly</h1>
            <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
              Our advanced AI-powered platform can identify plant diseases from images with high accuracy. 
              Protect your plants and crops with early detection and treatment recommendations.
            </p>
            <Button 
              onClick={() => navigate("/upload")} 
              className="bg-white text-[#8bc34a] hover:bg-white/90"
            >
              Try Disease Detection
            </Button>
          </div>
        </section>

        <div className="container mx-auto px-4">
          <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {features.map((feature, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                <div className="text-4xl text-[#8bc34a] mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-[#4caf50] mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </Card>
            ))}
          </section>

          <section className="bg-[#4caf50] text-white rounded-lg p-12 text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Start Protecting Your Plants Today</h2>
            <p className="mb-8 max-w-2xl mx-auto text-lg">
              Join thousands of gardeners and farmers who use our platform to keep their plants healthy. 
              Sign up for free and get 10 disease detections every month.
            </p>
            <Button 
              onClick={() => navigate("/login")} 
              variant="outline"
              className="bg-transparent border-white text-white hover:bg-white/10"
            >
              Sign Up for Free
            </Button>
          </section>

          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {stats.map((stat, index) => (
              <Card key={index} className="p-6 text-center">
                <div className="text-3xl font-bold text-[#4caf50] mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.title}</div>
              </Card>
            ))}
          </section>
        </div>
      </main>

      <footer className="bg-[#8bc34a] text-white py-12">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
          {footerSections.map((section, index) => (
            <div key={index} className="space-y-4">
              <h3 className="font-semibold text-lg">{section.title}</h3>
              {section.content}
            </div>
          ))}
        </div>
      </footer>
    </div>
  );
};

const features = [
  {
    icon: "📷",
    title: "Easy Upload",
    description: "Simply take a photo of your plant's affected area and upload it to our platform for instant analysis."
  },
  {
    icon: "🔍",
    title: "Accurate Detection",
    description: "Our AI model is trained on thousands of plant disease images to provide accurate diagnosis."
  },
  {
    icon: "💊",
    title: "Treatment Advice",
    description: "Get personalized treatment recommendations to help your plants recover quickly."
  }
];

const stats = [
  { number: "50+", title: "Plant Diseases Detected" },
  { number: "95%", title: "Detection Accuracy" },
  { number: "10,000+", title: "Happy Users" },
  { number: "24/7", title: "Customer Support" }
];

const footerSections = [
  {
    title: "PlantDoctor",
    content: (
      <p className="text-white/80">
        Your AI-powered plant disease detection solution. Helping gardeners and farmers protect their plants since 2023.
      </p>
    )
  },
  {
    title: "Quick Links",
    content: (
      <ul className="space-y-2">
        <li><a href="#" className="hover:underline">Home</a></li>
        <li><a href="#" className="hover:underline">About</a></li>
        <li><a href="#" className="hover:underline">Services</a></li>
        <li><a href="#" className="hover:underline">Contact</a></li>
      </ul>
    )
  },
  {
    title: "Resources",
    content: (
      <ul className="space-y-2">
        <li><a href="#" className="hover:underline">Blog</a></li>
        <li><a href="#" className="hover:underline">Plant Disease Library</a></li>
        <li><a href="#" className="hover:underline">Treatment Guide</a></li>
        <li><a href="#" className="hover:underline">FAQ</a></li>
      </ul>
    )
  },
  {
    title: "Contact Us",
    content: (
      <ul className="space-y-2 text-white/80">
        <li>Email: info@plantdoctor.com</li>
        <li>Phone: +1-234-567-8900</li>
        <li>Address: 123 Botany Lane, Green City</li>
      </ul>
    )
  }
];

export default Home;

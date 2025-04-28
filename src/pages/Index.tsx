
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Check, Upload, Image, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import Header from "@/components/Header";
import PlantIcon from "@/components/PlantIcon";

const Index = () => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [prediction, setPrediction] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (event) => {
        setPreview(event.target?.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5] flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="hero bg-[#8bc34a] rounded-lg shadow-lg overflow-hidden mb-10 transition-all hover:shadow-xl">
          <div className="py-10 px-6 text-white text-center">
            <h1 className="text-4xl font-bold tracking-tight mb-2 animate-fade-in">PLANT DISEASE PREDICTION</h1>
            <p className="text-lg opacity-90">Identify plant diseases quickly and accurately</p>
          </div>
        </div>
        
        <div className="app-container bg-[#333] text-[#f5f5f5] rounded-xl overflow-hidden shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-3">
            <DiagnosisSection />
            <UploadSection 
              file={file}
              preview={preview}
              prediction={prediction}
              fileInputRef={fileInputRef}
              handleFileChange={handleFileChange}
              triggerFileInput={triggerFileInput}
            />
            <DiseaseDetailsSection prediction={prediction} />
          </div>
        </div>
      </main>
      
      <footer className="bg-[#8bc34a] text-white py-4 text-center mt-auto">
        <div className="container mx-auto">
          <p>© 2025 PlantDoctor - All Rights Reserved</p>
        </div>
      </footer>
    </div>
  );
};

const DiagnosisSection = () => (
  <div className="p-8 flex flex-col items-center border-r border-[#444]">
    <div className="mb-6 transform hover:scale-105 transition-transform">
      <PlantIcon />
    </div>
    
    <h2 className="text-2xl font-bold mb-4 text-[#8bc34a]">Plant Disease Diagnosis</h2>
    
    <div className="text-center mb-6">
      <p className="mb-2">Is your plant affected by unknown disease?</p>
      <p className="text-xl font-medium">Don't Worry 😊</p>
    </div>
    
    <div className="w-full space-y-6 mt-4">
      <div className="step-card bg-[#3a3a3a] p-4 rounded-lg hover:shadow-lg transition-all">
        <div className="flex items-start">
          <div className="bg-[#8bc34a]/20 p-2 rounded-full mr-4">
            <Upload className="w-6 h-6 text-[#8bc34a]" />
          </div>
          <div>
            <h3 className="font-medium">Upload Image</h3>
            <p className="text-sm opacity-80">Upload the infected part of your plant</p>
          </div>
        </div>
      </div>
      
      <div className="step-card bg-[#3a3a3a] p-4 rounded-lg hover:shadow-lg transition-all">
        <div className="flex items-start">
          <div className="bg-[#8bc34a]/20 p-2 rounded-full mr-4">
            <Check className="w-6 h-6 text-[#8bc34a]" />
          </div>
          <div>
            <h3 className="font-medium">Get Diagnosis</h3>
            <p className="text-sm opacity-80">Get to know the name of the disease</p>
          </div>
        </div>
      </div>
      
      <div className="step-card bg-[#3a3a3a] p-4 rounded-lg hover:shadow-lg transition-all">
        <div className="flex items-start">
          <div className="bg-[#8bc34a]/20 p-2 rounded-full mr-4">
            <Info className="w-6 h-6 text-[#8bc34a]" />
          </div>
          <div>
            <h3 className="font-medium">Take Action</h3>
            <p className="text-sm opacity-80">Learn about preventive measures</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

interface UploadSectionProps {
  file: File | null;
  preview: string | null;
  prediction: string | null;
  fileInputRef: React.RefObject<HTMLInputElement>;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  triggerFileInput: () => void;
}

const UploadSection = ({ 
  file, 
  preview, 
  prediction, 
  fileInputRef, 
  handleFileChange, 
  triggerFileInput 
}: UploadSectionProps) => (
  <div className="p-8 flex flex-col items-center border-r border-[#444]">
    <h2 className="text-2xl font-bold mb-8 text-[#8bc34a]">Upload Plant Image</h2>
    
    <div className="w-full mb-6">
      <input
        type="file"
        id="file-upload"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        onChange={handleFileChange}
      />
      
      <Button 
        onClick={triggerFileInput}
        className="w-full bg-[#8bc34a] hover:bg-[#8bc34a]/90 text-white font-medium py-6"
      >
        <Upload className="mr-2 h-5 w-5" />
        Choose File
      </Button>
      
      <p className="text-center mt-3 text-sm opacity-80">
        {file ? file.name : "No file chosen"}
      </p>
    </div>
    
    <div className={cn(
      "w-full aspect-square border-2 border-dashed border-[#8bc34a] rounded-lg overflow-hidden flex items-center justify-center mb-6",
      "transition-all duration-300",
      preview ? "border-solid bg-[#8bc34a]/10" : "hover:border-[#9cd059] hover:bg-[#8bc34a]/5"
    )}>
      {preview ? (
        <img 
          src={preview} 
          alt="Preview" 
          className="max-w-full max-h-full object-contain animate-fade-in"
        />
      ) : (
        <div className="text-center p-6">
          <Image className="w-12 h-12 mx-auto opacity-50 mb-2" />
          <p className="text-sm opacity-70">Image preview will appear here</p>
        </div>
      )}
    </div>
    
    {prediction && (
      <div className="w-full p-4 bg-[#8bc34a]/20 rounded-lg animate-fade-in">
        <p className="text-center font-semibold">
          Predicted Disease: <span className="text-[#8bc34a]">{prediction}</span>
        </p>
      </div>
    )}
  </div>
);

interface DiseaseDetailsSectionProps {
  prediction: string | null;
}

const DiseaseDetailsSection = ({ prediction }: DiseaseDetailsSectionProps) => {
  // Example disease data (in a real app, this would come from an API)
  const diseaseDetails = {
    name: prediction || "-",
    causes: prediction ? "This disease is typically caused by fungal infection that spreads in humid conditions." : "-",
    prevention: prediction ? [
      "Ensure proper air circulation around plants",
      "Avoid overhead watering",
      "Remove and destroy infected plant parts",
      "Apply appropriate fungicides when necessary"
    ] : ["-"]
  };

  return (
    <div className="p-8 flex flex-col bg-[#444]">
      <h2 className="text-2xl font-bold mb-6 text-[#8bc34a] text-center">Disease Details</h2>
      
      <Card className="bg-[#333] border-none shadow-lg mb-4">
        <CardHeader className="pb-2">
          <h3 className="text-lg font-medium text-[#8bc34a]">Disease Name</h3>
        </CardHeader>
        <CardContent>
          <p className={cn(
            "font-medium",
            prediction ? "text-white" : "text-gray-400"
          )}>
            {diseaseDetails.name}
          </p>
        </CardContent>
      </Card>
      
      <Card className="bg-[#333] border-none shadow-lg mb-4">
        <CardHeader className="pb-2">
          <h3 className="text-lg font-medium text-[#8bc34a]">Possible Causes</h3>
        </CardHeader>
        <CardContent>
          <p className={cn(
            "text-sm leading-relaxed",
            prediction ? "text-white" : "text-gray-400"
          )}>
            {diseaseDetails.causes}
          </p>
        </CardContent>
      </Card>
      
      <Card className="bg-[#333] border-none shadow-lg flex-1">
        <CardHeader className="pb-2">
          <h3 className="text-lg font-medium text-[#8bc34a]">Preventive Measures</h3>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 list-disc pl-5">
            {diseaseDetails.prevention.map((item, index) => (
              <li 
                key={index}
                className={cn(
                  "text-sm",
                  prediction ? "text-white" : "text-gray-400"
                )}
              >
                {item}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default Index;

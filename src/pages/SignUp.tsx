
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Header from "@/components/Header";
import PlantIcon from "@/components/PlantIcon";

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, handle signup logic here
    console.log("SignUp attempt:", formData);
    alert("Sign up successful!");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5] flex flex-col">
      <Header />
      
      <main className="flex-1 flex justify-center items-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="text-center mb-6">
              <PlantIcon className="w-20 h-20 mx-auto" />
              <h2 className="text-2xl font-bold text-[#4caf50] mt-4">Create Your Account</h2>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  required
                />
              </div>
              
              <div className="space-y-4">
                <Button type="submit" className="w-full bg-[#4caf50] hover:bg-[#4caf50]/90">
                  Sign Up
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={() => navigate("/")}
                >
                  Continue as Guest
                </Button>
              </div>
            </form>
            
            <div className="text-center mt-6">
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <a 
                  href="/login"
                  className="text-[#4caf50] hover:underline font-medium"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate("/login");
                  }}
                >
                  Login
                </a>
              </p>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-[#8bc34a] text-white py-4 text-center">
        <div className="container mx-auto">
          <p>© 2025 PlantDoctor - All Rights Reserved</p>
        </div>
      </footer>
    </div>
  );
};

export default SignUp;


import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Header from "@/components/Header";
import PlantIcon from "@/components/PlantIcon";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, handle login logic here
    console.log("Login attempt:", { email, password });
    alert("Login successful!");
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
              <h2 className="text-2xl font-bold text-[#4caf50] mt-4">Login to Your Account</h2>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              
              <div className="text-right">
                <a href="#" className="text-sm text-[#4caf50] hover:underline">
                  Forgot Password?
                </a>
              </div>
              
              <div className="space-y-4">
                <Button type="submit" className="w-full bg-[#4caf50] hover:bg-[#4caf50]/90">
                  Login
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
                Don't have an account?{" "}
                <a href="#" className="text-[#4caf50] hover:underline font-medium">
                  Sign Up
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

export default Login;

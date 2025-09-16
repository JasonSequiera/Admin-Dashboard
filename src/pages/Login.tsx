import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const navigate = useNavigate();
  const { toast } = useToast();

  // Hardcoded credentials
  const VALID_CREDENTIALS = {
    username: "admin",
    password: "ahd5#DFw34H#fgug"
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (credentials.username === VALID_CREDENTIALS.username && 
        credentials.password === VALID_CREDENTIALS.password) {
      toast({
        title: "Login Successful",
        description: "Welcome to the admin dashboard!",
      });
      navigate("/dashboard");
    } else {
      toast({
        title: "Login Failed",
        description: "Invalid username or password",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-card relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-purple/10 rounded-full blur-3xl animate-glow-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-blue/10 rounded-full blur-3xl animate-glow-pulse animation-delay-1000"></div>
      </div>

      <Card className="w-full max-w-md mx-4 neon-border backdrop-blur-sm bg-card/80 relative z-10">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-neon-purple to-neon-blue rounded-full flex items-center justify-center glow-effect">
            <svg className="w-8 h-8 text-background" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
            </svg>
          </div>
          <h1 className="text-3xl font-bold gradient-text">Admin Portal</h1>
          <p className="text-muted-foreground">Enter your credentials to access the dashboard</p>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-foreground">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="Enter username"
                value={credentials.username}
                onChange={(e) => setCredentials({...credentials, username: e.target.value})}
                className="bg-input/50 border-border focus:border-neon-purple transition-colors"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password" className="text-foreground">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter password"
                value={credentials.password}
                onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                className="bg-input/50 border-border focus:border-neon-purple transition-colors"
                required
              />
            </div>

            <div className="space-y-4">
              <Button type="submit" variant="neon" className="w-full h-12 text-lg">
                Sign In
              </Button>
              
              {/* <div className="text-center text-sm text-muted-foreground">
                Demo credentials: admin / admin123
              </div> */}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
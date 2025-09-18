// src/pages/Login.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../supabaseClient"; // ✅ Supabase client
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [fetchedData, setFetchedData] = useState(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Fetch admin by email (case-insensitive)
      const { data, error } = await supabase
        .from("admins")
        .select("email, password")
        .ilike("email", credentials.email.trim())
        .maybeSingle();

      if (error) {
        console.error("Supabase error:", error);
        toast({
          title: "Error",
          description: "Database query failed.",
          variant: "destructive",
        });
        return;
      }

      if (!data) {
        toast({
          title: "Login Failed",
          description: "No account found with this email.",
          variant: "destructive",
        });
        return;
      }

      // ✅ Save fetched values to state (for testing UI)
      setFetchedData({ email: data.email, password: data.password });

      // Check password
      if (
        data.email.trim().toLowerCase() === credentials.email.trim().toLowerCase() &&
        data.password === credentials.password
      ) {
        toast({
          title: "Login Successful",
          description: "Welcome to the admin dashboard!",
        });
        navigate("/dashboard");
      } else {
        toast({
          title: "Login Failed",
          description: "Invalid email or password",
          variant: "destructive",
        });
      }
    } catch (err) {
      console.error("Login error:", err);
      toast({
        title: "Error",
        description: "Something went wrong. Try again later.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-card relative overflow-hidden">
      <Card className="w-full max-w-md mx-4 neon-border backdrop-blur-sm bg-card/80 relative z-10">
        <CardHeader className="text-center space-y-4">
          <h1 className="text-3xl font-bold gradient-text">Admin Portal</h1>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={credentials.email}
                onChange={(e) =>
                  setCredentials({ ...credentials, email: e.target.value })
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={credentials.password}
                onChange={(e) =>
                  setCredentials({ ...credentials, password: e.target.value })
                }
                required
              />
            </div>
            <Button type="submit" variant="neon" className="w-full h-12 text-lg">
              Sign In
            </Button>
            <div className="text-center">
              <Button
                variant="link"
                onClick={() => navigate("/forgot-password")}
              >
                Forgot Password?
              </Button>
            </div>
          </form>

          {/* Show fetched email + password for testing */}
          {fetchedData && (
            <div className="mt-6 p-3 bg-gray-100 rounded-md text-sm">
              <p>
                <span className="font-semibold">Fetched Email:</span>{" "}
                {fetchedData.email}
              </p>
              <p>
                <span className="font-semibold">Fetched Password:</span>{" "}
                {fetchedData.password}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;

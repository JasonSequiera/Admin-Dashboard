import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ADMIN_CREDENTIALS } from "@/config/credentials";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleResetPassword = () => {
    if (email !== ADMIN_CREDENTIALS.username) {
      setMessage("Email not recognized!");
      return;
    }

    // In production, send OTP email via Supabase
    setMessage("OTP sent to your email (demo only).");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-card">
      <Card className="w-full max-w-md neon-border bg-card/80 backdrop-blur-sm glow-effect">
        <CardHeader>
          <CardTitle className="text-xl gradient-text">Forgot Password</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded text-black"
          />
          {message && <p className="text-sm text-red-500">{message}</p>}
          <Button className="w-full" onClick={handleResetPassword}>
            Send OTP
          </Button>
          <Button variant="outline" className="w-full" onClick={() => navigate("/")}>
            Back to Login
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ForgotPassword;

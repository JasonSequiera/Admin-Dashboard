// src/pages/ForgotPassword.jsx
import { useState } from "react";
import { supabase } from "../../supabaseClient";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleForgot = async (e) => {
    e.preventDefault();

    // Check if email exists in admins
    const { data, error } = await supabase
      .from("admins")
      .select("id, email")
      .ilike("email", email.trim())
      .maybeSingle();

    if (error) {
      toast({
        title: "Error",
        description: "Database error.",
        variant: "destructive",
      });
      return;
    }

    if (!data) {
      toast({
        title: "Invalid Email",
        description: "No admin account with this email.",
        variant: "destructive",
      });
      return;
    }

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Save OTP in a table (password_resets)
    await supabase.from("password_resets").insert({
      email: data.email,
      otp,
    });

    toast({
      title: "OTP Sent",
      description: `OTP sent to ${data.email}. (For dev: ${otp})`,
    });

    // Redirect to Verify OTP page with email param
    navigate(`/verify-otp?email=${data.email}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="w-full max-w-md mx-4">
        <CardHeader>
          <h1 className="text-2xl font-bold text-center">Forgot Password</h1>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleForgot} className="space-y-4">
            <div>
              <Label htmlFor="email">Admin Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Send OTP
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ForgotPassword;

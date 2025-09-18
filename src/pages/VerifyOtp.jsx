// src/pages/VerifyOtp.jsx
import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { supabase } from "../../supabaseClient";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const VerifyOtp = () => {
  const [otp, setOtp] = useState("");
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleVerify = async (e) => {
    e.preventDefault();

    const { data, error } = await supabase
      .from("password_resets")
      .select("otp")
      .eq("email", email)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (error || !data) {
      toast({
        title: "Error",
        description: "OTP verification failed.",
        variant: "destructive",
      });
      return;
    }

    if (data.otp === otp.trim()) {
      toast({ title: "OTP Verified", description: "Proceed to reset password." });
      navigate(`/reset-password?email=${email}`);
    } else {
      toast({
        title: "Invalid OTP",
        description: "The OTP you entered is incorrect.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="w-full max-w-md mx-4">
        <CardHeader>
          <h1 className="text-2xl font-bold text-center">Verify OTP</h1>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleVerify} className="space-y-4">
            <div>
              <Label htmlFor="otp">Enter OTP</Label>
              <Input
                id="otp"
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Verify OTP
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default VerifyOtp;

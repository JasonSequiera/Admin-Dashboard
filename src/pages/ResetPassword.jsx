// src/pages/ResetPassword.jsx
import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { supabase } from "../../supabaseClient";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleReset = async (e) => {
    e.preventDefault();

    const { error } = await supabase
      .from("admins")
      .update({ password })
      .eq("email", email);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to reset password.",
        variant: "destructive",
      });
      return;
    }

    toast({ title: "Success", description: "Password reset successfully." });
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="w-full max-w-md mx-4">
        <CardHeader>
          <h1 className="text-2xl font-bold text-center">Reset Password</h1>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleReset} className="space-y-4">
            <div>
              <Label htmlFor="password">New Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Reset Password
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResetPassword;

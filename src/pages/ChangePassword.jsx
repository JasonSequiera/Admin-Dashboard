import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "../../supabaseClient";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const ChangePassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { toast } = useToast();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      toast({ title: "Error", description: "Passwords do not match", variant: "destructive" });
      return;
    }

    const { error } = await supabase
      .from("admins")
      .update({ password: newPassword })
      .eq("email", email);

    if (error) {
      toast({ title: "Error", description: "Failed to update password", variant: "destructive" });
      return;
    }

    toast({ title: "Success", description: "Password updated successfully" });
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="w-full max-w-md neon-border bg-card/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-xl gradient-text">Reset Password</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <Button className="w-full" onClick={handleChangePassword}>
            Change Password
          </Button>
          <Button variant="outline" className="w-full" onClick={() => navigate("/login")}>
            Back to Login
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChangePassword;

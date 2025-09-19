import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { supabase } from "../../supabaseClient";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [valid, setValid] = useState(false);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();
  const token = searchParams.get("token");

  useEffect(() => {
    const verifyToken = async () => {
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const { data, error } = await supabase
          .from("admins")
          .select("id")
          .eq("otp", token)
          .maybeSingle();

        if (error) throw error;
        if (data) setValid(true);
      } catch (err) {
        console.error("Token verification error:", err);
      } finally {
        setLoading(false);
      }
    };
    verifyToken();
  }, [token]);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match.",
        variant: "destructive",
      });
      return;
    }

    try {
      if (!token) return;

      const { error } = await supabase
        .from("admins")
        .update({
          password, // ⚠ plaintext, use hashing in production
          otp: null,
        })
        .eq("otp", token);

      if (error) throw error;

      toast({
        title: "Password Updated",
        description: "You can now log in with your new password.",
      });

      // ✅ Redirect to login page ("/") after short delay
      setTimeout(() => navigate("/"), 1500);
    } catch (err) {
      console.error("Reset error:", err);
      toast({
        title: "Error",
        description: "Failed to reset password.",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return <p className="text-center mt-10">Verifying reset link...</p>;
  }

  if (!token || !valid) {
    return (
      <p className="text-center mt-10 text-red-500">
        Invalid or expired reset link.
      </p>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <h1 className="text-2xl font-bold">Reset Password</h1>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleResetPassword} className="space-y-4">
            <div>
              <Label>New Password</Label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
              />
            </div>
            <div>
              <Label>Confirm Password</Label>
              <Input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                minLength={6}
              />
            </div>
            <Button type="submit" className="w-full">
              Update Password
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResetPassword;
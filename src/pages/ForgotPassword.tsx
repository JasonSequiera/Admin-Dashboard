import { useState } from "react";
import { supabase } from "../../supabaseClient";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // ✅ 1. Check if email exists
      const { data, error } = await supabase
        .from("admins")
        .select("id")
        .eq("email", email.trim())
        .maybeSingle();

      if (error || !data) {
        toast({
          title: "Error",
          description: "No account found with this email.",
          variant: "destructive",
        });
        setLoading(false);
        return;
      }

      // ✅ 2. Generate reset token
      const token = Math.random().toString(36).substring(2, 15);
      const { error: updateError } = await supabase
        .from("admins")
        .update({ otp: token })
        .eq("email", email.trim());

      if (updateError) throw updateError;

      // ✅ 3. Use HashRouter-compatible link
      const resetLink = `${window.location.origin}/#/reset-password?token=${token}`;


      // ✅ 4. Send reset email via backend
      const response = await fetch("http://localhost:5000/send-reset-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, resetLink }),
      });

      const result = await response.json();

      if (result.success) {
        toast({
          title: "Success",
          description:
            result.message || "Check your inbox for reset instructions.",
        });
        setEmail(""); // clear input
      } else {
        toast({
          title: "Error",
          description: result.error || "Failed to send reset email.",
          variant: "destructive",
        });
      }
    } catch (err) {
      console.error("Forgot password error:", err);
      toast({
        title: "Error",
        description: "Something went wrong while sending reset email.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <h1 className="text-2xl font-bold">Forgot Password</h1>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleForgotPassword} className="space-y-4">
            <div>
              <Label>Email</Label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Sending..." : "Send Reset Link"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ForgotPassword;

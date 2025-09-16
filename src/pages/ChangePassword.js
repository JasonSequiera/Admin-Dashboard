import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ADMIN_CREDENTIALS } from "@/config/credentials";

const ChangePassword = () => {
  const navigate = useNavigate();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleChangePassword = () => {
    setMessage("");
    if (currentPassword !== ADMIN_CREDENTIALS.password) {
      setMessage("Current password is incorrect!");
      return;
    }
    if (newPassword !== confirmPassword) {
      setMessage("New password and confirm password do not match!");
      return;
    }

    // Update environment variable locally (for demo only, won't persist)
    // In real apps, this should call an API or Supabase
    ADMIN_CREDENTIALS.password = newPassword;
    setMessage("Password changed successfully!");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-card">
      <Card className="w-full max-w-md neon-border bg-card/80 backdrop-blur-sm glow-effect">
        <CardHeader>
          <CardTitle className="text-xl gradient-text">Change Password</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <input
            type="password"
            placeholder="Current Password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded text-black"
          />
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded text-black"
          />
          <input
            type="password"
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded text-black"
          />
          {message && <p className="text-sm text-red-500">{message}</p>}
          <Button className="w-full" onClick={handleChangePassword}>
            Change Password
          </Button>
          <Button variant="outline" className="w-full" onClick={() => navigate("/dashboard")}>
            Back to Dashboard
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChangePassword;

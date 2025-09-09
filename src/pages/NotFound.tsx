import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-card relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-purple/10 rounded-full blur-3xl animate-glow-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-blue/10 rounded-full blur-3xl animate-glow-pulse animation-delay-1000"></div>
      </div>

      <div className="text-center relative z-10">
        <div className="mx-auto w-24 h-24 bg-gradient-to-br from-neon-purple to-neon-blue rounded-full flex items-center justify-center glow-effect mb-8">
          <span className="text-4xl font-bold text-background">404</span>
        </div>
        <h1 className="mb-4 text-6xl font-bold gradient-text">Page Not Found</h1>
        <p className="mb-8 text-xl text-muted-foreground max-w-md mx-auto">
          The page you're looking for doesn't exist in our futuristic system.
        </p>
        <Link to="/">
          <Button variant="neon" size="lg">
            Return to Portal
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useNavigate } from "react-router-dom";

// Static data for the dashboard
const queries = [
  {
    no: 1,
    name: "John Smith",
    email: "john.smith@company.com",
    subject: "Product Integration Query",
    query: "Need assistance with API integration for our e-commerce platform. Looking for detailed documentation."
  },
  {
    no: 2,
    name: "Sarah Johnson",
    email: "sarah.johnson@techcorp.com",
    subject: "Technical Support Request",
    query: "Experiencing performance issues with the dashboard. System becomes slow during peak hours."
  },
  {
    no: 3,
    name: "Michael Chen",
    email: "m.chen@startup.io",
    subject: "Feature Request",
    query: "Would like to request a bulk export feature for user data analysis and reporting purposes."
  },
  {
    no: 4,
    name: "Emma Wilson",
    email: "emma.w@consulting.net",
    subject: "Account Access Issue",
    query: "Unable to access premium features despite having an active subscription. Need immediate resolution."
  },
  {
    no: 5,
    name: "David Rodriguez",
    email: "david.r@marketing.co",
    subject: "Billing Inquiry",
    query: "Have questions about the recent billing cycle and charges. Need clarification on enterprise pricing."
  },
  {
    no: 6,
    name: "Lisa Anderson",
    email: "lisa.anderson@design.studio",
    subject: "UI/UX Feedback",
    query: "Suggestions for improving the user interface based on our team's experience with the platform."
  },
  {
    no: 7,
    name: "James Taylor",
    email: "j.taylor@enterprise.com",
    subject: "Security Compliance",
    query: "Need information about security certifications and compliance standards for enterprise deployment."
  },
  {
    no: 8,
    name: "Maria Garcia",
    email: "maria.garcia@agency.com",
    subject: "Training Request",
    query: "Looking for comprehensive training materials and workshops for our development team."
  }
];

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-card">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-gradient-to-br from-neon-purple to-neon-blue rounded-lg flex items-center justify-center glow-effect">
              <svg className="w-5 h-5 text-background" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
              </svg>
            </div>
            <h1 className="text-2xl font-bold gradient-text">Admin Dashboard</h1>
          </div>
          <Button variant="neon-outline" onClick={handleLogout}>
            Sign Out
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="neon-border bg-card/80 backdrop-blur-sm glow-effect">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Queries</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold gradient-text">{queries.length}</div>
            </CardContent>
          </Card>

          <Card className="neon-border bg-card/80 backdrop-blur-sm glow-effect">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Pending Review</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-neon-blue">5</div>
            </CardContent>
          </Card>

          <Card className="neon-border bg-card/80 backdrop-blur-sm glow-effect">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Resolved</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-neon-purple">3</div>
            </CardContent>
          </Card>

          <Card className="neon-border bg-card/80 backdrop-blur-sm glow-effect">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Response Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-neon-pink">98%</div>
            </CardContent>
          </Card>
        </div>

        {/* Queries Table */}
        <Card className="neon-border bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-xl gradient-text">User Queries</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-border">
                    <TableHead className="text-muted-foreground font-semibold">No.</TableHead>
                    <TableHead className="text-muted-foreground font-semibold">Name</TableHead>
                    <TableHead className="text-muted-foreground font-semibold">E-mail</TableHead>
                    <TableHead className="text-muted-foreground font-semibold">Subject</TableHead>
                    <TableHead className="text-muted-foreground font-semibold">Query</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {queries.map((query) => (
                    <TableRow key={query.no} className="border-border hover:bg-muted/30 transition-colors">
                      <TableCell className="font-medium text-neon-blue">{query.no}</TableCell>
                      <TableCell className="font-medium">{query.name}</TableCell>
                      <TableCell className="text-muted-foreground">{query.email}</TableCell>
                      <TableCell className="font-medium">{query.subject}</TableCell>
                      <TableCell className="max-w-xs truncate text-muted-foreground" title={query.query}>
                        {query.query}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Background effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-neon-purple/5 rounded-full blur-3xl animate-glow-pulse"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-neon-blue/5 rounded-full blur-3xl animate-glow-pulse animation-delay-1000"></div>
      </div>
    </div>
  );
};

export default Dashboard;
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../supabaseClient";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pencil } from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();
  const [queries, setQueries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [remarks, setRemarks] = useState({});
  const [editingId, setEditingId] = useState(null);

  // Fetch queries
  useEffect(() => {
    const fetchQueries = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from("contact_info")
          .select("*")
          .order("created_at", { ascending: false });
        if (error) throw error;
        setQueries(data || []);
      } catch (err) {
        console.error("Error fetching queries:", err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchQueries();
  }, []);

  // Update remarks and mark as resolved
  const updateRemarks = async (id) => {
    const remarkText = remarks[id] || "";
    try {
      const { error } = await supabase
        .from("contact_info")
        .update({
          admin_remarks: remarkText,
          is_resolved: true,
          resolved_at: new Date(),
        })
        .eq("id", id);
      if (error) throw error;

      setQueries((prev) =>
        prev.map((q) =>
          q.id === id
            ? { ...q, admin_remarks: remarkText, is_resolved: true, resolved_at: new Date() }
            : q
        )
      );
      setEditingId(null);
    } catch (err) {
      console.error("Error updating remark:", err.message);
    }
  };

  const handleLogout = () => navigate("/");
  const goChangePassword = () => navigate("/change-password");
  const goForgotPassword = () => navigate("/forgot-password");

  const totalQueries = queries.length;
  const resolvedCount = queries.filter((q) => q.is_resolved).length;
  const responseRate = totalQueries > 0 ? ((resolvedCount / totalQueries) * 100).toFixed(0) : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-card">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-gradient-to-br from-neon-purple to-neon-blue rounded-lg flex items-center justify-center glow-effect">
              <svg className="w-5 h-5 text-background" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold gradient-text">Admin Dashboard</h1>
          </div>

          <div className="flex space-x-2">
            <Button size="sm" variant="outline" onClick={goChangePassword}>Change Password</Button>
            <Button size="sm" variant="outline" onClick={goForgotPassword}>Forgot Password</Button>
            <Button variant="neon-outline" onClick={handleLogout}>Sign Out</Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="neon-border bg-card/80 backdrop-blur-sm glow-effect">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Queries
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold gradient-text">{totalQueries}</div>
            </CardContent>
          </Card>

          <Card className="neon-border bg-card/80 backdrop-blur-sm glow-effect">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Pending Review
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-neon-blue">
                {queries.filter((q) => !q.is_resolved).length}
              </div>
            </CardContent>
          </Card>

          <Card className="neon-border bg-card/80 backdrop-blur-sm glow-effect">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Resolved
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-neon-purple">{resolvedCount}</div>
            </CardContent>
          </Card>

          <Card className="neon-border bg-card/80 backdrop-blur-sm glow-effect">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Response Rate
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-neon-pink">{responseRate}%</div>
            </CardContent>
          </Card>
        </div>

        {/* Queries Table */}
        <Card className="neon-border bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-xl gradient-text">User Queries</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <p className="text-muted-foreground">Loading...</p>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-border">
                      <TableHead>No.</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Subject</TableHead>
                      <TableHead>Message</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Remarks</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {queries.map((query, index) => (
                      <TableRow key={query.id} className="border-border hover:bg-muted/30 transition-colors">
                        <TableCell className="cursor-default">{index + 1}</TableCell>
                        <TableCell className="cursor-default">{query.name}</TableCell>
                        <TableCell className="cursor-default">{query.email}</TableCell>
                        <TableCell className="cursor-default">{query.subject || ""}</TableCell>
                        <TableCell className="max-w-xs truncate text-muted-foreground cursor-default" title={query.message}>
                          {query.message}
                        </TableCell>
                        <TableCell className="cursor-default">
                          {query.is_resolved ? (
                            <span className="text-green-500 font-medium">Resolved</span>
                          ) : (
                            <span className="text-yellow-500 font-medium">Pending</span>
                          )}
                        </TableCell>
                        <TableCell className="cursor-default">
                          {editingId === query.id ? (
                            <div className="flex space-x-2">
                              <input
                                type="text"
                                className="px-2 py-1 border rounded text-sm text-black"
                                value={remarks[query.id] || ""}
                                onChange={(e) =>
                                  setRemarks(prev => ({ ...prev, [query.id]: e.target.value }))
                                }
                              />
                              <Button size="sm" onClick={() => updateRemarks(query.id)}>Save</Button>
                              <Button size="sm" variant="outline" onClick={() => setEditingId(null)}>Cancel</Button>
                            </div>
                          ) : (
                            <span>{query.admin_remarks || ""}</span>
                          )}
                        </TableCell>

                        {/* Actions */}
                        <TableCell className="flex items-center space-x-2">
                          {!query.is_resolved && (
                            <>
                              <Button size="sm" onClick={() => setEditingId(query.id)}>Resolve</Button>
                              {query.admin_remarks && (
                                <Pencil
                                  className="w-4 h-4 text-muted-foreground cursor-pointer hover:text-neon-blue"
                                  onClick={() => setEditingId(query.id)}
                                />
                              )}
                            </>
                          )}
                          {query.is_resolved && <span className="cursor-default">Resolved</span>}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Dashboard;

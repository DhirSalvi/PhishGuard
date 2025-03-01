import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LineChart, PieChart, BarChart } from "@/components/ui/charts";
import { Table, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { Globe } from "lucide-react";

export default function ThreatDashboard() {
  return (
    <div className="p-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
      {/* Threat Summary */}
      <Card>
        <CardContent className="p-4 flex flex-col">
          <h2 className="text-xl font-bold">Threat Summary</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
            <div>Total Detections: <span className="font-bold">1234</span></div>
            <div>Detection Rate: <span className="font-bold">95%</span></div>
            <div>Blocked: <span className="font-bold">85%</span></div>
            <div>Allowed: <span className="font-bold">10%</span></div>
          </div>
        </CardContent>
      </Card>
      
      {/* Real-Time Threat Map */}
      <Card>
        <CardContent className="p-4 flex flex-col items-center">
          <h2 className="text-xl font-bold mb-4">Real-Time Threat Map</h2>
          <Globe size={100} />
        </CardContent>
      </Card>
      
      {/* Time Series Analysis */}
      <Card className="col-span-2">
        <CardContent className="p-4">
          <h2 className="text-xl font-bold">Phishing Attempts Over Time</h2>
          <LineChart data={[5, 10, 15, 8, 12]} labels={["Jan", "Feb", "Mar", "Apr", "May"]} />
        </CardContent>
      </Card>
      
      {/* Phishing Types and Targeted Users */}
      <Card>
        <CardContent className="p-4">
          <h2 className="text-xl font-bold">Top Phishing Types</h2>
          <PieChart data={[30, 25, 20, 15, 10]} labels={["Email", "Link", "Malware", "Spoofing", "Other"]} />
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4">
          <h2 className="text-xl font-bold">Targeted Users</h2>
          <BarChart data={[50, 40, 30, 20]} labels={["John", "Jane", "Alice", "Bob"]} />
        </CardContent>
      </Card>
      
      {/* Filters */}
      <Card className="col-span-2">
        <CardContent className="p-4 flex gap-4">
          <Button>Last 24 Hours</Button>
          <Button>This Week</Button>
          <Button>This Month</Button>
        </CardContent>
      </Card>
      
      {/* Detailed Threat Table */}
      <Card className="col-span-2">
        <CardContent className="p-4">
          <h2 className="text-xl font-bold">Detailed Threat Table</h2>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Threat Type</TableCell>
                <TableCell>User</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Action Taken</TableCell>
              </TableRow>
            </TableHead>
            <tbody>
              <TableRow>
                <TableCell>Email Phishing</TableCell>
                <TableCell>John Doe</TableCell>
                <TableCell>2025-02-28</TableCell>
                <TableCell>Blocked</TableCell>
              </TableRow>
            </tbody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

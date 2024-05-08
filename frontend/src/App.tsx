import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./components/ui/card";

function App() {
  const [totalSent, setTotalSpent] = useState(0);

  useEffect(() => {
    async function fetchTotalSpent() {
      const response = await fetch("/api/expenses/total-spent");
      const data = await response.json();
      setTotalSpent(data.total);
    }
    fetchTotalSpent();
  }, []);

  return (
    <Card className="w-[350px] m-auto">
      <CardHeader>
        <CardTitle>Total Spent</CardTitle>
        <CardDescription>The total amount you have spent</CardDescription>
      </CardHeader>
      <CardContent>{totalSent}</CardContent>
    </Card>
  );
}

export default App;

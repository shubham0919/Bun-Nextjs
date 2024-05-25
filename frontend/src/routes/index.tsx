import { createFileRoute, FileRoutesByPath } from "@tanstack/react-router";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
export const Route = createFileRoute('/' as keyof FileRoutesByPath)({
  component: Index,
});
async function getTotalSepnt() {
  const response = await fetch("/api/expenses/total-spent");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();
  return data;
}

function Index() {
  const { isPending, error, data } = useQuery({
    queryKey: ["get-total-spent"],
    queryFn: getTotalSepnt,
  });

  if (error) {
    return "An error has occurred: " + error.message;
  }
  return (
    <Card className="w-[350px] m-auto">
      <CardHeader>
        <CardTitle>Total Spent</CardTitle>
        <CardDescription>The total amount you have spent</CardDescription>
      </CardHeader>
      <CardContent>{isPending ? "Loading..." : data.total}</CardContent>
    </Card>
  );
}

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { createFileRoute, FileRoutesByPath } from "@tanstack/react-router";

export const Route = createFileRoute("/expenses" as keyof FileRoutesByPath)({
  component: Expenses,
});
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";

async function getAllExpenses() {
  const response = await fetch("/api/expenses");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();
  return data;
}

function Expenses() {
  const { isPending, error, data } = useQuery({
    queryKey: ["get-all-expenses"],
    queryFn: getAllExpenses,
  });

  if (error) {
    return "An error has occurred: " + error.message;
  }
  return (
    <div className="p-2 max-w-3xl m-auto">
      <Table>
        <TableCaption>A list of all your expenses</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Id</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isPending
            ? Array(3)
                .fill(0)
                .map((_, i) => (
                  <TableRow key={i}>
                    <TableCell className="font-medium">
                      <Skeleton className="h-4" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4" />
                    </TableCell>
                  </TableRow>
                ))
            : data?.expenses.map((expense: any) => (
                <TableRow key={expense.id}>
                  <TableCell className="font-medium">{expense.id}</TableCell>
                  <TableCell>{expense.title}</TableCell>
                  <TableCell>{expense.amount}</TableCell>
                </TableRow>
              ))}
        </TableBody>
      </Table>
    </div>
  );
}

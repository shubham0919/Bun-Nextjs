import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createFileRoute, FileRoutesByPath } from "@tanstack/react-router";
import { useForm } from "@tanstack/react-form";

export const Route = createFileRoute(
  "/create-expenses" as keyof FileRoutesByPath
)({
  component: CreateExpenses,
});

function CreateExpenses() {
  const form = useForm({
    defaultValues: {
      title: "",
      amount: 0,
    },
    onSubmit: async ({ value }) => {
      console.log(value);
    },
  });
  return (
    <div className="p-2">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        className="max-w-xl m-auto"
      >
        <h2>Create Expenses</h2>

        <form.Field
          name="title"
          children={(field) => {
            // Avoid hasty abstractions. Render props are great!
            return (
              <>
                <Label htmlFor={field.name}>Title</Label>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                {field.state.meta.touchedErrors ? (
                  <em>{field.state.meta.touchedErrors}</em>
                ) : null}
                {field.state.meta.isValidating ? "Validating..." : null}
              </>
            );
          }}
        />
        <form.Field
          name="amount"
          children={(field) => {
            // Avoid hasty abstractions. Render props are great!
            return (
              <>
                <Label htmlFor={field.name}>Amount</Label>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  type="number"
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                {field.state.meta.touchedErrors ? (
                  <em>{field.state.meta.touchedErrors}</em>
                ) : null}
                {field.state.meta.isValidating ? "Validating..." : null}
              </>
            );
          }}
        />
        <Button className="mt-4" type="submit">
          Creat Expense
        </Button>
      </form>
    </div>
  );
}

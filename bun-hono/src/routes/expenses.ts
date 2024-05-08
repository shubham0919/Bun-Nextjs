import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";
type Expense = {
  id?: number;
  title: string;
  amount: number;
};
const fakeExpenses: Expense[] = [
  {
    id: 1,
    title: "rent",
    amount: 5000,
  },
  {
    id: 2,
    title: "food",
    amount: 1000,
  },
  {
    id: 3,
    title: "clothes",
    amount: 500,
  },
];

const expenseSchema = z.object({
  id: z.number().int().positive().min(1),
  title: z.string(),
  amount: z.number(),
});

type ExpenseSchema = z.infer<typeof expenseSchema>;

const createPostSchema = expenseSchema.omit({ id: true });

export const expensesRoute = new Hono()
  .get("/", async (c) => {
    return c.json({ expenses: fakeExpenses });
  })
  .post("/", zValidator("json", createPostSchema), async (c) => {
    const expenses = await c.req.valid("json");
    fakeExpenses.push({ ...expenses, id: fakeExpenses.length + 1 });
    c.status(201);
    return c.json(expenses);
  })
  .get("/total-spent", async (c) => {
    const total = fakeExpenses.reduce(
      (acc, expense) => acc + expense.amount,
      0
    );
    return c.json({ total });
  })
  .get("/:id{[0-9]+}", async (c) => {
    const id = Number(c.req.param("id"));
    const expense = fakeExpenses.find((expense) => expense.id === id);
    if (!expense) {
      return c.notFound();
    }
    return c.json(expense);
  })
  .delete("/:id{[0-9]+}", async (c) => {
    const id = Number(c.req.param("id"));
    const index = fakeExpenses.findIndex((expense) => expense.id === id);
    if (index === -1) {
      return c.notFound();
    }
    const deletedExpense = fakeExpenses.splice(index, 1)[0];
    return c.json({ expense: deletedExpense });
  });

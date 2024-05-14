import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { fakeExpenses, postExpenseSchema } from "../models/expense";

const expenses = new Hono();

// Get all expenses
expenses.get("/", (c) =>
  c.json({
    expenses: fakeExpenses,
  })
);

// Get total spent
expenses.get("/total-spent", (c) => {
  const total_spent = fakeExpenses.reduce((acc, exp) => acc + exp.amount, 0);
  return c.json({
    total_spent,
  });
});

// Post expense data
expenses.post("/", zValidator("json", postExpenseSchema), async (c) => {
  const data = c.req.valid("json");
  fakeExpenses.push({ id: fakeExpenses.length + 1, ...data });

  return c.json(data, 201);
});

// Get expense by id
expenses.get("/:id{[0-9]+}", (c) => {
  const id = Number(c.req.param("id"));
  const expense = fakeExpenses.find((data) => data.id === id);

  if (!expense) return c.notFound();

  return c.json(expense);
});

// Delete expense by id
expenses.delete("/:id{[0-9]+}", (c) => {
  const id = Number(c.req.param("id"));
  const expense = fakeExpenses.findIndex((data) => data.id === id);

  if (expense < 0) return c.notFound();

  const deletedExpense = fakeExpenses.splice(expense, 1)[0];

  return c.json(deletedExpense);
});

export default expenses;

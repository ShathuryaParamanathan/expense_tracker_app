"use client";
import { db } from "@/utils/dbconfig";
import { Budgets, Expenses } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { desc, eq, getTableColumns, sql } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import BudgetItem from "../../budgets/_components/budgetitem";
import AddExpenses from "../_components/addexpenses";
import Expenselist from "../_components/expenselist";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import Editbudget from "../../budgets/_components/editbudget";

function ExpenseScreen({ params }) {
  const { user } = useUser();
  const router = useRouter();

  const [budgetInfo, setBudgetInfo] = useState(null);
  const [expenseInfo, setExpenseInfo] = useState([]);
  useEffect(() => {
    if (user) {
      getBudgetInfo();
      getExpenseList();
    }
  }, [user]);

  const getBudgetInfo = async () => {
    try {
      const result = await db
        .select({
          ...getTableColumns(Budgets),
          totalSpend: sql`sum(${Expenses.amount})`.mapWith(Number),
          totalItem: sql`count(${Expenses.id})`.mapWith(Number),
        })
        .from(Budgets)
        .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
        .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
        .where(eq(Budgets.id, params.id))
        .groupBy(Budgets.id);

      setBudgetInfo(result[0]);
    } catch (error) {
      console.error("Error fetching budget info:", error);
    }
  };

  const getExpenseList = async () => {
    const expense = await db
      .select()
      .from(Expenses)
      .where(eq(Expenses.budgetId, params.id))
      .orderBy(desc(Expenses.id));
    // console.log(expense);
    setExpenseInfo(expense);
  };

  const deleteExpenses = async () => {
    const result = await db
      .delete(Expenses)
      .where(eq(Expenses.budgetId, params.id))
      .returning();
  };

  const deleteBudget = async () => {
    const deteteExpenseResult = deleteExpenses();
    if (deteteExpenseResult) {
      const result = await db
        .delete(Budgets)
        .where(eq(Budgets.id, params.id))
        .returning();

      router.replace("/dashboard/budgets");
    }
  };

  return (
    <div className="p-10 ">
      <h2 className="text-2xl font-bold text-black flex justify-between items-center">
        My Expenses
        <div className='flex gap-2 items-center'>
       <Editbudget budgetInfo={budgetInfo} refreshData={()=>getBudgetInfo()} />
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button className="flex gap-2" variant="destructive">
              <Trash /> Delete
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                current budget along with expenses.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={() => deleteBudget()}>
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        </div>
       
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 mt-6 gap-4">
        {budgetInfo ? (
          <BudgetItem budget={budgetInfo} />
        ) : (
          <>
            <div className="h-[150px] w-full bg-slate-200 rounded-lg animate-pulse"></div>
          </>
        )}

        <AddExpenses
          budgetId={params.id}
          user={user}
          refreshData={() => {
            getBudgetInfo();
            getExpenseList();
          }}
        />

        <div className="mt-4 w-full">
          <h2 className="text-black font-bold text-lg">Latest Expenses</h2>
          <Expenselist
            expenseInfo={expenseInfo}
            refreshData={() => {
              getBudgetInfo();
              getExpenseList();
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default ExpenseScreen;

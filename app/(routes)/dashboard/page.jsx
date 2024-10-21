"use client";
import { useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import CardInfo from "./_components/cardinfo";
import { db } from "@/utils/dbconfig";
import { Budgets, Expenses } from "@/utils/schema";
import { desc, eq, getTableColumns, sql } from "drizzle-orm";
import BarChartDashboard from "./_components/barchart";
import BudgetItem from "./budgets/_components/budgetitem";
import Expenseitem from "./expenses/_components/expenseitem";

function Dasboard() {
  const { user } = useUser();
  const [budgetList, setBudgetList] = useState([]);

  useEffect(() => {
    user && getBudgetInfo();
  }, [user]);

  const getBudgetInfo = async () => {
    const result = await db
      .select({
        ...getTableColumns(Budgets),
        totalSpend: sql`sum(${Expenses.amount})`.mapWith(Number),
        totalItem: sql`count(${Expenses.id})`.mapWith(Number),
      })
      .from(Budgets)
      .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
      .where(eq(Budgets.createdBy, user.primaryEmailAddress?.emailAddress))
      .groupBy(Budgets.id)
      .orderBy(desc(Budgets.id));
    setBudgetList(result);
  };

  return (
    <div className="p-5">
      <h2 className="font-bold text-3xl">Welcome!  {user? user.fullName:'User'} ✌️</h2>
      <p className="py-3 text-gray-500">
        Here's what happening with your money Lets Manage your expense
      </p>

      <CardInfo budgetList={budgetList} />
      <div className="grid grid-cols-1 md:grid-cols-3 mt-6 gap-5">
        <div className="md:col-span-2 py-6">
          <BarChartDashboard budgetList={budgetList} />

          <div className=" grid gap-3">
          <h2 className="font-bold text-lg">Latest Expenses</h2>

         <Expenseitem />
        </div>
        </div>
        
        <div className=" grid gap-3">
          <h2 className="font-bold text-lg">Latest Budgets</h2>

          {budgetList.map((budget, index) => (
            <BudgetItem budget={budget} key={index} />
          ))}
        </div>
        
      </div>
    </div>
  );
}

export default Dasboard;

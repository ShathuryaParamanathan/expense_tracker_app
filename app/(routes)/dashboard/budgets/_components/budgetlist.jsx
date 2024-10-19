"use client";
import React, { useEffect, useState } from "react";
import Createbudget from "./createbudget";
import { db } from "@/utils/dbconfig";
import { desc, eq, getTableColumns, sql } from "drizzle-orm";
import { Budgets, Expenses } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import BudgetItem from "./budgetitem";
function Budgetlist() {
  const { user } = useUser();
  const [budgetList, setBudgetList] = useState([]);

  useEffect(() => {
    user && getBudgetList();
  }, [user]);

  const getBudgetList = async () => {
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
    <div className="mt-7 bg-white h-max">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
        <Createbudget  refreshData ={()=>getBudgetList()} />

        {budgetList?.length > 0? budgetList.map((budget, index) => (
          <BudgetItem budget={budget} />
        )):
        [1,2,3,4,5,6,7,8].map((item,index)=>
        (
          <div key={index} className="w-full bg-slate-200 rounded-lg h-[170px] animate-pulse">
            
            </div>
        ))
        }
      </div>
    </div>
  );
}

export default Budgetlist;

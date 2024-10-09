import { db } from "@/utils/dbconfig";
import { Expenses } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { Trash } from "lucide-react";
import React from "react";
import { toast } from "sonner";


function Expenselist({ expenseInfo,refreshData }) {
  const handleDelete = async (expense) => {
    const result = await db
      .delete(Expenses)
      .where(eq(Expenses.id, expense.id))
      .returning();
    if (result) {
       refreshData();
      toast("Expense Deleted! ");

    }
  };

  

  return (
    <div className="mt-3">
      <div className="grid grid-cols-4 bg-slate-200 p-2 text-black font-bold">
        <h2>Name</h2>
        <h2>Amount</h2>
        <h2>Date</h2>
        <h2>Action</h2>
      </div>
      <div>
        {expenseInfo.map((expenses, index) => (
          <div
            key={index}
            className="grid grid-cols-4 bg-slate-100 p-2 text-black"
          >
            <h2>{expenses.name}</h2>
            <h2>{expenses.amount}</h2>
            <h2>{new Date(expenses.createdAt).toLocaleDateString()}</h2>
            <h2>
              <Trash
                className="text-red-600 cursor-pointer"
                onClick={() => handleDelete(expenses)}
              />
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Expenselist;

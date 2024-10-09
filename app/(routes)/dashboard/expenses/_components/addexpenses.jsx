import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { db } from "@/utils/dbconfig";
import { Expenses ,Budgets} from "@/utils/schema";
import moment from "moment";
import React, { useState } from "react";
import { toast } from "sonner";

function AddExpenses({ budgetId, user ,refreshData }) {
  const [name, setName] = useState();
  const [amount, setAmount] = useState();
  const addNewExpense = async () => {
    const result = await db
      .insert(Expenses)
      .values({
        name: name,
        amount: amount,
        budgetId: budgetId,
        createdAt: moment().format('DD/MM/YYYY')
      })
      .returning({ insertedId: Budgets.id });

    if (result) {
       refreshData();
      toast("New expense is created");
    }
  };

  return (
    <div className="border p-5 rounded-lg ">
      <h2 className="text-black text-lg font-bold"> Add Expense</h2>
      <div className="mt-2 text-black  ">
        <h2 className="font-medium my-1">Expense Name</h2>
        <Input
          placeholder="e.g. Bedroom Decor"
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
      </div>
      <div className="mt-2 text-black">
        <h2 className=" font-medium my-1">Expense Amount</h2>
        <Input
          placeholder="e.g. LKR 1000 "
          type="number"
          onChange={(e) => {
            setAmount(e.target.value);
          }}
        />
      </div>
      <Button
        disabled={!(name && amount)}
        className="mt-3 w-full"
        onClick={() => addNewExpense()}
      >
        Add New Expenses
      </Button>
    </div>
  );
}

export default AddExpenses;

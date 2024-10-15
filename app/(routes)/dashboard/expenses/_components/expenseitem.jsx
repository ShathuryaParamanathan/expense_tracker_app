'use client'
import { db } from '@/utils/dbconfig'
import { Budgets, Expenses } from '@/utils/schema'
import { useUser } from '@clerk/nextjs'
import { eq } from 'drizzle-orm'
import React,{useEffect,useState} from 'react'
import Expenselist from './expenselist'

function Expenseitem() {
const {user} =useUser();
const [allExpenses, setAllExpenses] = useState([]);
 
  const getAllExpenses = async()=>{
    const result = await db.select({id:Expenses.id,
      name:Expenses.name,
      amount:Expenses.amount,
      createdAt:Expenses.createdAt
    }).from(Budgets).rightJoin(Expenses,eq(Budgets.id,Expenses.budgetId)).where(eq(Budgets.createdBy,user?.primaryEmailAddress.emailAddress));
    setAllExpenses(result);
  }

  useEffect(()=>{
    user && getAllExpenses();
  },[user]);
  return (
    <div>
        <Expenselist expenseInfo={allExpenses} refreshData={()=>getAllExpenses()} />
    </div>
  )
}

export default Expenseitem
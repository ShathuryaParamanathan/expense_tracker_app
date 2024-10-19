import React from 'react'
import Expenseitem from './_components/expenseitem'

function Page() {
  return (
    <div className="p-10 h-[100vh] w-full"> <h2 className="text-2xl font-bold text-black flex justify-between items-center ">
        My Expenses</h2>
        <Expenseitem /> </div>
  )
}

export default Page
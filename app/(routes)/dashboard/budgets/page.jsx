import React from 'react'
import Budgetlist from './_components/budgetlist'

function page() {
  return (
    <div className='px-5 py-15 bg-white h-max'>
        <h2 className='text-black font-bold text-3xl py-5'>
            My Budgets
        </h2>
        <Budgetlist />
    </div>
  )
}

export default page
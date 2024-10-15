import { PiggyBank } from "lucide-react";
import React, { useEffect, useState } from "react";

function CardInfo({ budgetList }) {
  const [totalBudget, setTotalBudget] = useState(0);
  const [totalSpend, setTotalSpend] = useState(0);

  const calculateCardInfo = () => {
    let totalBudget_ = 0;
    let totalSpend_ = 0;
    budgetList.forEach((element) => {
      totalBudget_ = totalBudget_ + Number(element.amount);
      totalSpend_ = totalSpend_ + element.totalSpend;
      setTotalBudget(totalBudget_);
      setTotalSpend(totalSpend_);
    });
  };
  useEffect(() => {
    budgetList && calculateCardInfo();
  });
  return (
    <div>
      {budgetList ? (
        <div className="mt-7 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-5">
          <div className="p-7 border rounded-lg flex items-center justify-between">
            <div>
              <h2 className="text-sm">Total Budget</h2>
              <h2 className="font-bold text-2xl">LKR {totalBudget}</h2>
            </div>
            <PiggyBank className="bg-primary p-3 h-12 w-12 rounded-full text-white" />
          </div>
          <div className="p-7 border rounded-lg flex items-center justify-between">
            <div>
              <h2 className="text-sm">Total Expenses</h2>
              <h2 className="font-bold text-2xl">LKR {totalSpend} </h2>
            </div>
            <PiggyBank className="bg-primary p-3 h-12 w-12 rounded-full text-white" />
          </div>
          <div className="p-7 border rounded-lg flex items-center justify-between">
            <div>
              <h2 className="text-sm">No. Of Budget</h2>
              <h2 className="font-bold text-2xl">{budgetList?.length}</h2>
            </div>
            <PiggyBank className="bg-primary p-3 h-12 w-12 rounded-full text-white" />
          </div>
        </div>
      ) : (
        <div className="mt-7 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-5">
          {[1, 2, 3].map((item, index) => (
            <div
              key={index}
              className="w-full bg-slate-200 rounded-lg h-[150px] animate-pulse"
            ></div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CardInfo;

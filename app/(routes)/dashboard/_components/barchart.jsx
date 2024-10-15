import React from "react";
import {
  Bar,
  CartesianGrid,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
  BarChart,
  ResponsiveContainer,
} from "recharts";

function BarChartDashboard({ budgetList }) {
  return (
    <div className='border rounded-lg p-5'>
        <h2 className='font-bold text-lg'>
            Activity
        </h2>
        <ResponsiveContainer width={'80%'} height={300} >
        <BarChart
        width={730}
        height={300}
        data={budgetList}
        margin={{ top: 5, right: 5, left: 0, botton: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="totalSpend" fill="#4845d2" stackId="a"/>
        <Bar dataKey="amount"  stackId="b" fill="#90d8e6" />
      </BarChart>
        </ResponsiveContainer>  
    </div>
  );
}

export default BarChartDashboard;

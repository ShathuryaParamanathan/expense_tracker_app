import React from 'react';

function Upgrade() {
  return (
    <div className='h-[100vh] flex flex-col  px-10 py-10 items-center'>
      <h1 className='text-3xl font-bold'>Upgrade Your Expense Tracker</h1>
      <p className='mt-4 text-lg'>Unlock advanced features to better manage and track your finances.</p>

      <div className='mt-8 grid grid-cols-1 sm:grid-cols-2 gap-10'>
        <div className='border p-4 rounded-lg'>
          <h2 className='text-xl font-semibold'>Free Plan</h2>
          <ul className='mt-2 list-disc list-inside'>
            <li>Basic Expense Tracking</li>
            <li>Limited Analytics</li>
            <li>Ads Supported</li>
          </ul>
        </div>
        <div className='border p-4 rounded-lg'>
          <h2 className='text-xl font-semibold'>Premium Plan</h2>
          <ul className='mt-2 list-disc list-inside'>
            <li>Advanced Reports & Insights</li>
            <li>Custom Categories & Tags</li>
            <li>Ad-Free Experience</li>
            <li>Export Data (CSV/Excel)</li>
            <li>Email Notifications/Reminders</li>
          </ul>
          <p className='mt-4 text-2xl font-bold'>LKR 5000/month</p>
          <button className='mt-4 bg-green-500 text-white py-2 px-4 rounded-lg'>
            Upgrade Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default Upgrade;

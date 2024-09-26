import React from "react";
import Sidenav from "./_components/sidenav";
import DashboardHeader from "./_components/dashboardheader";

function layout({ children }) {
  return (
    <div>
      <div className="fixed md:w-64 hidden md:block bg-white" >
        <Sidenav />
      </div>
      <div className="md:ml-64 bg-white">
        <DashboardHeader />
        {children}</div>
    </div>
  );
}

export default layout;

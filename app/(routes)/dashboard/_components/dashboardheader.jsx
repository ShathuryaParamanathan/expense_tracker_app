import { UserButton } from "@clerk/nextjs";
import React from "react";
function DashboardHeader(){
    return (
    <div className="p-5 shadow-sm border-b flex justify-between ">
        <div>
        Search Bar
        </div>
       <div className="fixed right-10">
       <UserButton />
        </div>
       
    </div>
    )
}

export default DashboardHeader
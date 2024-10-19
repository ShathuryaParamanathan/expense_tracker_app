import { Input } from "@/components/ui/input";
import { UserButton } from "@clerk/nextjs";
import { SearchIcon } from "lucide-react";
import React from "react";
function DashboardHeader(){
    return (
    <div className=" px-5 py-3 shadow-sm border-b flex justify-between" >
        <div className="flex gap-2 items-center p-2 c">       
        <Input className='w-[450px]' />
        <SearchIcon />
        </div>
       <div className=" right-10">
       <UserButton />
        </div>
        
    </div>
    )
}

export default DashboardHeader
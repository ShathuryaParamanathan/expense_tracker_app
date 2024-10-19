import React, { useEffect } from "react";
import Image from "next/image";
import { LayoutGrid, PiggyBank, ReceiptText, ShieldCheck } from "lucide-react";
import { UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import Link from "next/link";

function Sidenavshort() {
    const menulist = [
        {
          id: 1,
          name: "Dashboard",
          icon: LayoutGrid,
          path: "/dashboard",
        },
        {
          id: 2,
          name: "Budgets",
          icon: PiggyBank,
          path: "/dashboard/budgets",
        },
        {
          id: 3,
          name: "Expenses",
          icon: ReceiptText,
          path: "/dashboard/expenses",
        },
        {
          id: 4,
          name: "Upgrade",
          icon: ShieldCheck,
          path: "/dashboard/upgrade",
        },
      ];
    
      const path = usePathname();
      useEffect(() => {
        // console.log(path);
      },[]);
    
      return (
        <div className="h-screen py-10 px-2 border shadow-sm">
          <Image src="/logo2.png" alt="logo" width={120} height={80} />
    
          <div className=" mt-2 w-18">
            {menulist.map((menu, index) => (
                <Link href={menu.path} >
              <h2 className={`flex gap-2 items-center text-gray-500 mb-2 p-5 cursor-pointer rounded-md hover:text-white hover:bg-blue-900 ${path==menu.path && 'text-primary bg-blue-100'}`}>
                <menu.icon />

              </h2></Link>
            ))}
          </div>
          <div className="fixed bottom-10 p-5 flex gap-2 items-center text-gray-500">
            <UserButton />          </div>
        </div>
      );
}

export default Sidenavshort
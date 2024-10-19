"use client";
import React, { useEffect, useState } from "react";
import Sidenav from "./_components/sidenav";
import DashboardHeader from "./_components/dashboardheader";
import { db } from "@/utils/dbconfig";
import { Budgets } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Sidenavshort from "./_components/sidenavshort";

function Layout({ children }) {
  const { user } = useUser();
  const router = useRouter();
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    if (user) {
      checkUserBudgets();
    }
  }, [user]);

  const handleResize = () => {
    if (window.innerWidth < 768) {
      setIsSmallScreen(true);
    } else {
      setIsSmallScreen(false);
    }
  };

  useEffect(() => {
    // Set initial screen size
    handleResize();

    // Add event listener to handle window resizing
    window.addEventListener("resize", handleResize);

    return () => {
      // Clean up the event listener when the component unmounts
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const checkUserBudgets = async () => {
    const result = await db
      .select()
      .from(Budgets)
      .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress));

    if (result?.length === 0) {
      router.replace("/dashboard/budgets");
    }
  };

  return (
    <div className="min-h-screen flex ">
      <div className={`fixed bg-white ${isSmallScreen ? "w-20" : "md:w-64"} md:block`}>
        {!isSmallScreen ? <Sidenav /> : <Sidenavshort />}
      </div>
      
      
      <div className={` flex-grow bg-white text-black ${isSmallScreen ? "ml-20" : "ml-64"}`}>
       
          <DashboardHeader />
      
        <main>{children}</main>
      </div>
    </div>
  );
}

export default Layout;

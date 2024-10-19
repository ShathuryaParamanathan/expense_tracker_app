"use client";
import { Button } from "@/components/ui/button";
import { UserButton, useUser } from "@clerk/nextjs";
import Image from "next/image";
import React from "react";

function Header() {
  const { user, isSignedIn } = useUser();

  return (
    <div className="bg-white p-5 flex justify-between items-center border shadow-md">
      <Image src="./logo.svg" alt="logo" width={180} height={100} />
      <div className="text-black flex gap-2">
      <p>
        {user ? user.firstName : ' '}
      </p>
      {isSignedIn ? <UserButton /> : <Button>Get Started</Button>}
      </div>
      
    </div>
  );
}

export default Header;

"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { UserButton, useUser, SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import Image from "next/image";

function Header() {
  const { user, isSignedIn } = useUser();

  return (
    <div className="bg-white p-5 flex justify-between items-center border shadow-md">
      <Image src="./logo.svg" alt="logo" width={180} height={100} />

      <SignedOut>
        <SignInButton className='bg-primary px-4 py-2 rounded-md'  />
      </SignedOut>
      <SignedIn>
        <div className="text-black flex gap-2">
          <p>{user ? user.firstName : " "}</p>
          {isSignedIn && <UserButton />}
        </div>
      </SignedIn>
    </div>
  );
}

export default Header;

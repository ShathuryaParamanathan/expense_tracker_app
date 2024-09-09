import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";

function Header() {
  return (
    <div className="bg-white p-5 flex justify-between items-center bordor shadow-md">
      <Image src={"./logo.svg"} alt="logo" width={180} height={100} />
      <Button>Get Started</Button>
    </div>
  );
}

export default Header;

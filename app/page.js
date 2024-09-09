import { Button } from "@/components/ui/button";
import Image from "next/image";
import Header from "./_components/header";
import LPBody from "./_components/lp_body";

export default function Home() {
  return (
   <div className="bg-red">
    <Header />
    <LPBody />
   </div>
  );
}

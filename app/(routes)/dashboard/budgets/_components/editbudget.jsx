"use client";
import React, { useState, useEffect } from "react";
import { PenBox } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "../../../../../components/ui/dialog";
import EmojiPicker from "emoji-picker-react";
import { Input } from "@/components/ui/input";
import { useUser } from "@clerk/nextjs";
import { db } from "@/utils/dbconfig";
import { eq } from "drizzle-orm";
import { Budgets } from "@/utils/schema";
import { toast } from "sonner";

function Editbudget({ budgetInfo, refreshData }) {
  const [emojiIcon, setEmojiIcon] = useState(budgetInfo?.icon);
  const [openEmojiPicker, setOpenEmojiPicker] = useState(false);
  const [name, setName] = useState(budgetInfo?.name);
  const [amount, setAmount] = useState(budgetInfo?.amount);
  const { user } = useUser();

  const onUpdateBudget = async () => {
    const result = await db
      .update(Budgets)
      .set({ name: name, amount: amount, icon: emojiIcon })
      .where(eq(Budgets.id, budgetInfo.id))
      .returning();
    if (result) {
      refreshData();
      toast("Budget Update Successfully");
    }
  };
  useEffect(() => {
    if (budgetInfo) {
      setEmojiIcon(budgetInfo.icon);
    }
  }, [budgetInfo]);
  return (
    <div>
      <Dialog>
        <DialogTrigger>
          <Button className="flex gap-2" onClick={() => {}}>
            <PenBox /> Edit
          </Button>
        </DialogTrigger>
        <DialogContent className="bg-white">
          <DialogHeader>
            <DialogTitle className="text-black">Edit Budget</DialogTitle>
            <DialogDescription>
              <div className="mt-5 p-2">
                <Button
                  size="lg"
                  className="text-lg p-3"
                  variant="outline"
                  onClick={() => setOpenEmojiPicker(!openEmojiPicker)}
                >
                  {emojiIcon}
                </Button>

                <div className="absolute z-20">
                  <EmojiPicker
                    height="300px"
                    open={openEmojiPicker}
                    onEmojiClick={(e) => {
                      setEmojiIcon(e.emoji);
                      setOpenEmojiPicker(false);
                    }}
                  />
                </div>
                <div className="mt-2">
                  <h2 className="text-black font-medium my-1">Budget Name</h2>
                  <Input
                    placeholder="e.g. Home Decor"
                    defaultValue={budgetInfo?.name}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                  />
                </div>
                <div className="mt-2">
                  <h2 className="text-black font-medium my-1">Budget Amount</h2>
                  <Input
                    placeholder="e.g. 5000 rs"
                    defaultValue={budgetInfo?.amount}
                    type="number"
                    onChange={(e) => {
                      setAmount(e.target.value);
                    }}
                  />
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button className="mt-5 w-full " onClick={() => onUpdateBudget()}>
                Update Budget
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Editbudget;

"use client";
import { signOut } from "next-auth/react";
import React from "react";
import { Button } from "./ui/button";

export const UserNav = () => {
  return (
    <Button
      onClick={() =>
        signOut({
          redirect: true,
          callbackUrl: `${window.location.origin}/sign-in`,
        })
      }
      className="text-white bg-red-500"
    >
      Sign Out
    </Button>
  );
};

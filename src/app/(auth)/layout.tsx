"use client";
import { FC, ReactNode } from "react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft } from "lucide-react";

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
  const router = useRouter();

  const goBackToMenu = () => {
    router.push("/");
  };
  return <div className=" p-10 rounded-md">{children}</div>;
};

export default AuthLayout;

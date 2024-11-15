"use client";
import React from "react";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Head from "next/head";
import { FlaskConical, CircleHelp } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export const Navbar = () => {
  const router = useRouter();
  return (
    <motion.nav
      className="bg-white shadow-md px-6 py-4"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100 }}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <motion.div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => router.push("/")}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FlaskConical className="text-blue-600" />
          <span className="font-kablammo text-xl">Lab</span>
        </motion.div>

        <div className="text-center flex-grow">
          <span className="text-lg">Welcome to English Virtual Lab</span>
        </div>
        <motion.div
          className="cursor-pointer"
          onClick={() => router.push("/profile")}
          whileHover={{ scale: 1.1, rotate: 10 }}
          whileTap={{ scale: 0.9 }}
        >
          <Link className={buttonVariants()} href="profile">
            Profile
          </Link>
        </motion.div>
      </div>
    </motion.nav>
  );
};

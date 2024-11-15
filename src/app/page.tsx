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
import { Navbar } from "@/components/Navbar";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

export default function Home() {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>English Learning Platform</title>
        <link
          href="https://fonts.googleapis.com/css2?family=Kablammo&display=swap"
          rel="stylesheet"
        />
      </Head>

      <div className="min-h-screen flex flex-col text-black">
        <Navbar />
        <motion.main
          className="flex-grow container mx-auto px-4 py-8 text-black min-h-screen flex items-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="grid md:grid-cols-3 gap-8 text-black">
            <motion.section
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center"
            >
              <div className="w-32 h-32 relative mb-4">
                <Image
                  src="/vocab.png"
                  alt="Vocabulary"
                  layout="fill"
                  objectFit="contain"
                  priority
                />
              </div>
              <motion.h2
                className="text-xl font-bold mb-3 cursor-pointer text-black"
                onClick={() => router.push("/vocabulary")}
                whileHover={{ color: "#2563EB" }}
              >
                Vocabulary Game
              </motion.h2>
              <p className="text-center text-gray-600">
                Test your vocabulary by matching words to their definitions.
                This game is designed to help you expand your vocabulary in a
                fun and interactive way.
              </p>
            </motion.section>

            <motion.section
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center"
            >
              <div className="w-32 h-32 relative mb-4">
                <Image
                  src="/grammar.png"
                  alt="Grammar"
                  layout="fill"
                  objectFit="contain"
                  priority
                />
              </div>
              <motion.h2
                className="text-xl font-bold mb-3 cursor-pointer"
                onClick={() => router.push("/grammar")}
                whileHover={{ color: "#2563EB" }}
              >
                Grammar Quiz
              </motion.h2>
              <p className="text-center text-black">
                Improve your grammar skills by taking quizzes on various grammar
                topics such as tenses, prepositions, sentence structure, and
                more.
              </p>
            </motion.section>

            <motion.section
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center"
            >
              <div className="w-32 h-32 relative mb-4">
                <Image
                  src="/reading.png"
                  alt="Reading"
                  layout="fill"
                  objectFit="contain"
                  priority
                />
              </div>
              <motion.h2
                className="text-xl font-bold mb-3 cursor-pointer"
                onClick={() => router.push("/reading")}
                whileHover={{ color: "#2563EB" }}
              >
                Reading Comprehension
              </motion.h2>
              <p className="text-center text-gray-600">
                Practice your reading comprehension by reading short passages
                and answering questions about the content. Strengthen your
                understanding of English texts.
              </p>
            </motion.section>
          </div>
        </motion.main>

        <motion.footer
          className="bg-gray-800 text-white py-4 text-center"
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <p className="italic">
            "The limits of my language mean the limits of my world." — Ludwig
            Wittgenstein
          </p>
        </motion.footer>
      </div>
    </>
  );
}

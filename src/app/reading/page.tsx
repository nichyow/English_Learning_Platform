"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

interface Question {
  question: string;
  answer: string;
}

interface ReadingData {
  passage: string;
  questions: Question[];
}

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      staggerChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: { duration: 0.3 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.3 },
  },
};

const ieltsReadingData: ReadingData = {
  passage: `The importance of reading cannot be overstated. It is a skill that opens doors to knowledge and 
  allows individuals to explore the world through words. In recent studies, researchers have found that 
  reading not only improves vocabulary but also enhances critical thinking. Through the process of reading, 
  one can gain a deeper understanding of different cultures and historical contexts. In a world dominated 
  by digital media, the significance of traditional reading habits continues to be emphasized.`,

  questions: [
    {
      question: "1. What does reading improve, according to recent studies?",
      answer: "vocabulary",
    },
    {
      question: "2. How does reading help individuals understand the world?",
      answer: "deeper understanding of different cultures",
    },
  ],
};

const ReadingComprehension: React.FC = () => {
  const router = useRouter();
  const [answers, setAnswers] = useState<string[]>(
    Array(ieltsReadingData.questions.length).fill("")
  );
  const [showResults, setShowResults] = useState<boolean>(false);
  const [correctAnswers, setCorrectAnswers] = useState<number>(0);
  const [showPassage, setShowPassage] = useState<boolean>(true);
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleAnswerChange = (index: number, value: string): void => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const checkAnswers = (): void => {
    let correct = 0;
    ieltsReadingData.questions.forEach((item, index) => {
      if (answers[index].toLowerCase().includes(item.answer.toLowerCase())) {
        correct++;
      }
    });
    setCorrectAnswers(correct);
    setShowResults(true);
    setShowPassage(false);
    setSubmitted(true);
  };

  const restartQuiz = (): void => {
    setAnswers(Array(ieltsReadingData.questions.length).fill(""));
    setShowResults(false);
    setShowPassage(true);
    setCorrectAnswers(0);
    setSubmitted(false);
  };

  return (
    <div className="min-h-screen  py-8 px-4 text-black">
      <div className="max-w-3xl mx-auto">
        <motion.div
          className="flex items-center gap-2 mb-6 cursor-pointer text-white hover:text-blue-700"
          onClick={() => router.push("/")}
          whileHover={{ x: -5 }}
        >
          <ArrowLeft />
          <span>Back</span>
        </motion.div>

        <motion.h1
          className="text-3xl font-bold text-center mb-8 text-white"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Reading Comprehension
        </motion.h1>

        <AnimatePresence mode="wait">
          {showResults ? (
            <motion.div
              key="results"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="bg-white rounded-lg shadow-lg p-8 text-center"
            >
              <motion.h3
                className="text-2xl font-bold mb-4"
                variants={itemVariants}
              >
                Quiz Results
              </motion.h3>
              <motion.p className="text-xl mb-6" variants={itemVariants}>
                You answered {correctAnswers}/
                {ieltsReadingData.questions.length} questions correctly.
              </motion.p>
              {ieltsReadingData.questions.map((item, index) => (
                <motion.div
                  key={index}
                  className="mb-4 text-left"
                  variants={itemVariants}
                >
                  <p className="font-medium">{item.question}</p>
                  <p className="text-gray-600">Your answer: {answers[index]}</p>
                  <p className="text-green-600">
                    Correct answer: {item.answer}
                  </p>
                </motion.div>
              ))}
              <motion.button
                onClick={restartQuiz}
                className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Try Again
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              key="quiz"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {showPassage && (
                <motion.div
                  className="bg-white rounded-lg shadow-lg p-6 mb-8"
                  variants={itemVariants}
                >
                  <p className="text-lg leading-relaxed">
                    {ieltsReadingData.passage}
                  </p>
                </motion.div>
              )}

              <motion.div className="space-y-6" variants={containerVariants}>
                {ieltsReadingData.questions.map((item, index) => (
                  <motion.div
                    key={index}
                    className="bg-white rounded-lg shadow-lg p-6"
                    variants={itemVariants}
                  >
                    <p className="text-lg mb-3">{item.question}</p>
                    <input
                      type="text"
                      value={answers[index]}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handleAnswerChange(index, e.target.value)
                      }
                      className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      placeholder="Type your answer here..."
                    />
                  </motion.div>
                ))}

                <motion.button
                  onClick={checkAnswers}
                  disabled={answers.some((answer) => answer.trim() === "")}
                  className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Submit
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ReadingComprehension;

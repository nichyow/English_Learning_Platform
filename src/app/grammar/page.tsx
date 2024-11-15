"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
}

const quizData: QuizQuestion[] = [
  {
    question:
      "What is the correct form of the verb in this sentence: She _____ to the store yesterday.",
    options: ["goes", "went", "going"],
    correctAnswer: 1,
  },
  {
    question:
      "Which preposition fits in the blank? He arrived _____ the airport on time.",
    options: ["in", "at", "on"],
    correctAnswer: 1,
  },
  // {
  //   question:
  //     "Choose the correct word: The lecture _____ at 9:00 AM every Monday.",
  //   options: ["begins", "begin", "beginning"],
  //   correctAnswer: 0,
  // },
  // {
  //   question: "Select the correct article: He is _____ engineer.",
  //   options: ["the", "a", "an"],
  //   correctAnswer: 2,
  // },
  // {
  //   question:
  //     "Complete the sentence: They have been _____ English for two years.",
  //   options: ["learned", "learning", "learn"],
  //   correctAnswer: 1,
  // },
  // {
  //   question:
  //     "Choose the correct verb form: By the time he arrived, the class _____.",
  //   options: ["had started", "has started", "started"],
  //   correctAnswer: 0,
  // },
  // {
  //   question:
  //     "Select the correct conjunction: I will stay here _____ you come back.",
  //   options: ["until", "because", "before"],
  //   correctAnswer: 0,
  // },
  // {
  //   question: "Choose the correct tense: She _____ her homework when I called.",
  //   options: ["does", "is doing", "was doing"],
  //   correctAnswer: 2,
  // },
  // {
  //   question: "Pick the correct pronoun: Everyone must bring _____ own lunch.",
  //   options: ["their", "his", "her"],
  //   correctAnswer: 0,
  // },
  // {
  //   question: "Select the correct form: He wishes he _____ more time to study.",
  //   options: ["has", "had", "have"],
  //   correctAnswer: 1,
  // },
  // {
  //   question:
  //     "Choose the correct word: This is the most _____ subject I have ever studied.",
  //   options: ["excited", "exciting", "excitement"],
  //   correctAnswer: 1,
  // },
  // {
  //   question:
  //     "Pick the correct phrase: He _____ finished the project by next week.",
  //   options: ["will have", "would have", "will"],
  //   correctAnswer: 0,
  // },
  // {
  //   question:
  //     "Complete the sentence: If I _____ you, I would accept the offer.",
  //   options: ["am", "was", "were"],
  //   correctAnswer: 2,
  // },
  // {
  //   question: "Pick the correct form: They have _____ for hours.",
  //   options: ["wait", "waiting", "waited"],
  //   correctAnswer: 2,
  // },
  // {
  //   question:
  //     "Choose the correct verb: The professor suggested that the student _____ more research.",
  //   options: ["do", "does", "did"],
  //   correctAnswer: 0,
  // },
  // ... rest of your quiz data
];

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

const slideIn = {
  initial: { x: 50, opacity: 0 },
  animate: { x: 0, opacity: 1 },
  exit: { x: -50, opacity: 0 },
};

const GrammarQuiz = () => {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [quizComplete, setQuizComplete] = useState(false);
  const [direction, setDirection] = useState(1); // 1 for forward, -1 for backward

  const handleOptionSelect = (optionIndex: number) => {
    setSelectedOption(optionIndex);
  };

  const handleNext = () => {
    if (selectedOption === null && currentQuestion < quizData.length) {
      // Shake animation for the container when no option is selected
      const container = document.querySelector(".options-container");
      container?.classList.add("shake");
      setTimeout(() => container?.classList.remove("shake"), 500);
      return;
    }

    setDirection(1);
    if (selectedOption === quizData[currentQuestion].correctAnswer) {
      setScore((prev) => prev + 1);
    }

    if (currentQuestion + 1 < quizData.length) {
      setCurrentQuestion((prev) => prev + 1);
      setSelectedOption(null);
    } else {
      setQuizComplete(true);
    }
  };

  const restartQuiz = () => {
    setDirection(-1);
    setCurrentQuestion(0);
    setScore(0);
    setSelectedOption(null);
    setQuizComplete(false);
  };

  const goBackToMenu = () => {
    router.push("/");
  };

  if (quizComplete) {
    return (
      <motion.div
        className="min-h-screen  py-8 px-4 text-black"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.main
          className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8"
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <motion.div
            className="flex items-center gap-2 mb-6 cursor-pointer hover:text-blue-500 transition-colors text-black"
            onClick={goBackToMenu}
            whileHover={{ x: -5 }}
          >
            <ArrowLeft size={24} />
            <span>Back</span>
          </motion.div>
          <motion.div
            className="results text-center"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <h2 className="text-2xl font-bold mb-4">Quiz Complete!</h2>
            <motion.div
              className="score text-xl mb-6"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              You answered {score}/{quizData.length} questions correctly
            </motion.div>
            <motion.button
              onClick={restartQuiz}
              className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Restart Quiz
            </motion.button>
          </motion.div>
        </motion.main>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="min-h-screen  py-8 px-4 text-black"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.main
        className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8"
        variants={fadeInUp}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <motion.div
          className="flex items-center gap-2 mb-6 cursor-pointer hover:text-blue-500 transition-colors"
          onClick={goBackToMenu}
          whileHover={{ x: -5 }}
        >
          <ArrowLeft size={24} />
          <span>Back</span>
        </motion.div>

        <motion.h1
          className="text-3xl font-bold text-center mb-6"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          Grammar Quiz
        </motion.h1>

        <motion.h2
          className="text-xl text-center mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <span>{currentQuestion + 1}</span> of <span>{quizData.length}</span>
        </motion.h2>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            className="mb-8"
            variants={slideIn}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-lg mb-4">
              {quizData[currentQuestion].question}
            </h3>
            <motion.div className="space-y-3 options-container">
              {quizData[currentQuestion].options.map((option, index) => (
                <motion.label
                  key={index}
                  className={`block p-4 border rounded-lg cursor-pointer transition-colors
                    ${
                      selectedOption === index
                        ? "bg-blue-50 border-blue-500"
                        : "hover:bg-gray-50"
                    }`}
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <input
                    type="radio"
                    name="quiz"
                    className="mr-3"
                    checked={selectedOption === index}
                    onChange={() => handleOptionSelect(index)}
                  />
                  {option}
                </motion.label>
              ))}
            </motion.div>
          </motion.div>
        </AnimatePresence>

        <motion.button
          onClick={handleNext}
          className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {currentQuestion === quizData.length - 1 ? "Finish" : "Next"}
        </motion.button>
      </motion.main>
    </motion.div>
  );
};

export default GrammarQuiz;

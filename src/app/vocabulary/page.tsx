"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  CheckCircle,
  XCircle,
  Award,
  RefreshCcw,
  ArrowLeft,
} from "lucide-react";
import { useRouter } from "next/navigation";

interface VocabItem {
  word: string;
  definition: string;
}

const Quiz = () => {
  const router = useRouter();
  const [score, setScore] = useState(0);
  const [results, setResults] = useState<boolean[]>([]);
  const [draggedWord, setDraggedWord] = useState<string | null>(null);
  const [isComplete, setIsComplete] = useState(false);
  const [usedWords, setUsedWords] = useState<Set<string>>(new Set());
  const [matchedDefinitions, setMatchedDefinitions] = useState<Set<string>>(
    new Set()
  );

  const vocab: VocabItem[] = [
    { word: "Abate", definition: "To reduce in amount, degree, or intensity" },
    { word: "Benevolent", definition: "Well-meaning and kindly" },
    {
      word: "Abates",
      definition: "To reduce in amount, degree, or intensity",
    },
    { word: "Benevolents", definition: "Well-meaning and kindly" },
  ];

  const handleDragStart = (word: string): void => {
    if (!usedWords.has(word)) {
      setDraggedWord(word);
    }
  };

  const handleDrop = (word: string, definition: string): void => {
    if (
      matchedDefinitions.has(definition) ||
      !draggedWord ||
      usedWords.has(draggedWord)
    ) {
      setDraggedWord(null);
      return;
    }

    const isCorrect = vocab.find(
      (v) => v.word === draggedWord && v.definition === definition
    );

    if (isCorrect) {
      setUsedWords((prev) => new Set([...prev, draggedWord]));
      setMatchedDefinitions((prev) => new Set([...prev, definition]));
    }

    setResults((prev) => [...prev, !!isCorrect]);
    if (isCorrect) setScore((prev) => prev + 1);
    setDraggedWord(null);

    if (results.length + 1 === vocab.length) {
      setTimeout(() => setIsComplete(true), 500);
    }
  };

  const handleDragOver = (e: React.DragEvent): void => {
    e.preventDefault();
  };

  const resetQuiz = (): void => {
    setScore(0);
    setResults([]);
    setIsComplete(false);
    setDraggedWord(null);
    setUsedWords(new Set());
    setMatchedDefinitions(new Set());
  };

  const getScoreMessage = (): string => {
    const percentage = (score / vocab.length) * 100;
    if (percentage === 100) return "Perfect Score! Amazing job! 🎉";
    if (percentage >= 80) return "Great work! Nearly perfect! 🌟";
    if (percentage >= 60) return "Good effort! Keep practicing! 💪";
    return "Keep learning! You'll get better! 📚";
  };
  const goBackToMenu = () => {
    router.push("/");
  };
  return (
    <div className="min-h-screen  p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8"
      >
        <motion.div
          className="flex items-center gap-2 mb-6 cursor-pointer hover:text-blue-500 transition-colors text-black"
          onClick={goBackToMenu}
          whileHover={{ x: -5 }}
        >
          <ArrowLeft size={24} />
          <span>Back</span>
        </motion.div>
        <motion.h1
          className="text-3xl font-bold text-center text-blue-800 mb-8"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          Vocabulary Quiz
        </motion.h1>

        {/* Words Section */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          {vocab.map((item) => (
            <motion.div
              key={item.word}
              draggable={!usedWords.has(item.word)}
              onDragStart={() => handleDragStart(item.word)}
              className={`p-4 rounded-lg text-center font-semibold transition-all
                       ${
                         usedWords.has(item.word)
                           ? "bg-gray-300 cursor-not-allowed opacity-60"
                           : "bg-blue-500 text-white cursor-move hover:bg-blue-600 active:scale-95"
                       }`}
              whileHover={!usedWords.has(item.word) ? { scale: 1.05 } : {}}
              whileTap={!usedWords.has(item.word) ? { scale: 0.95 } : {}}
            >
              {item.word}
            </motion.div>
          ))}
        </div>

        {/* Definitions Section */}
        <div className="space-y-4 mb-8 text-black">
          {vocab.map((item) => (
            <motion.div
              key={item.definition}
              onDragOver={handleDragOver}
              onDrop={() => handleDrop(draggedWord || "", item.definition)}
              className={`border-2 border-dashed p-4 rounded-lg transition-all
                       ${
                         matchedDefinitions.has(item.definition)
                           ? "bg-green-50 border-green-300"
                           : "border-gray-300 hover:border-blue-500 hover:bg-blue-50"
                       }`}
              whileHover={
                !matchedDefinitions.has(item.definition) ? { scale: 1.02 } : {}
              }
              transition={{ type: "spring", stiffness: 300 }}
            >
              {item.definition}
            </motion.div>
          ))}
        </div>

        {/* Score Display */}
        <motion.div
          className="text-center space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            className="inline-block bg-blue-100 text-blue-800 px-6 py-2 rounded-full font-semibold"
            whileHover={{ scale: 1.05 }}
          >
            Score: {score} / {vocab.length}
          </motion.div>

          {/* Results Icons */}
          <div className="flex justify-center gap-2">
            {results.map((result, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  delay: index * 0.1,
                }}
              >
                {result ? (
                  <CheckCircle className="w-6 h-6 text-green-500" />
                ) : (
                  <XCircle className="w-6 h-6 text-red-500" />
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Results Popup */}
        <AnimatePresence>
          {isComplete && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            >
              <motion.div
                initial={{ y: 50 }}
                animate={{ y: 0 }}
                className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl"
              >
                <div className="text-center space-y-6">
                  <Award className="w-16 h-16 text-yellow-500 mx-auto" />
                  <h2 className="text-2xl font-bold text-gray-800">
                    Quiz Complete!
                  </h2>
                  <p className="text-xl text-gray-600">{getScoreMessage()}</p>
                  <div className="text-4xl font-bold text-blue-600">
                    {score} / {vocab.length}
                  </div>
                  <p className="text-gray-600">
                    You got {score} out of {vocab.length} correct!
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={resetQuiz}
                    className="bg-blue-500 text-white px-6 py-3 rounded-full
                             font-semibold flex items-center justify-center gap-2
                             hover:bg-blue-600 mx-auto"
                  >
                    <RefreshCcw className="w-5 h-5" />
                    Try Again
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default Quiz;

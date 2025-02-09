"use client";
import { useState } from "react";
import { useTheme } from "@/components/ThemeProvider";

interface Question {
  question: string;
  options: string[];
  correctAnswer: string;
}

export default function Home() {
  const { isDarkMode, toggleDarkMode } = useTheme();
  const [topic, setTopic] = useState("");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(false);

  const generateQuiz = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/generate-quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic }),
      });
      const data = await response.json();
      setQuestions(data.questions);
      setUserAnswers([]);
      setCurrentQuestion(0);
      setShowResults(false);
    } catch (error) {
      console.error("Failed to generate quiz:", error);
    }
    setLoading(false);
  };

  const handleAnswer = (answer: string) => {
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestion] = answer;
    setUserAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const calculateScore = () => {
    return userAnswers.reduce((score, answer, index) => {
      return score + (answer === questions[index].correctAnswer ? 1 : 0);
    }, 0);
  };

  // Remove the isDarkMode state and useEffect for dark mode

  return (
    <main className="min-h-screen p-8 bg-white dark:bg-gray-900 transition-colors duration-200">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Quiz Generator
          </h1>
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors"
          >
            {isDarkMode ? "🌞" : "🌙"}
          </button>
        </div>

        <div className="mb-8">
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Enter quiz topic..."
            className="p-2 border rounded mr-4 bg-white text-gray-900 dark:bg-gray-800 dark:text-white dark:border-gray-700"
          />
          <button
            onClick={generateQuiz}
            disabled={loading}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-blue-600 dark:hover:bg-blue-700"
          >
            {loading ? "Generating..." : "Generate Quiz"}
          </button>
        </div>

        {questions.length > 0 && !showResults && (
          <div className="bg-white dark:bg-gray-800 p-6 rounded shadow-md border border-gray-200 dark:border-gray-700">
            <h2 className="text-xl mb-4 text-gray-900 dark:text-white">
              Question {currentQuestion + 1} of {questions.length}
            </h2>
            <p className="mb-4 text-gray-800 dark:text-gray-200">
              {questions[currentQuestion].question}
            </p>
            <div className="space-y-2">
              {questions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(option)}
                  className="block w-full text-left p-3 border rounded hover:bg-gray-50 text-gray-700 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 transition-colors"
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        )}

        {showResults && (
          <div className="bg-white dark:bg-gray-800 p-6 rounded shadow-md border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl mb-4 text-gray-900 dark:text-white">
              Quiz Results
            </h2>
            <p className="text-xl text-gray-800 dark:text-gray-200">
              You scored {calculateScore()} out of {questions.length}
            </p>
            <button
              onClick={() => {
                setCurrentQuestion(0);
                setShowResults(false);
                setUserAnswers([]);
              }}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 transition-colors"
            >
              Retry Quiz
            </button>
          </div>
        )}
      </div>
    </main>
  );
}

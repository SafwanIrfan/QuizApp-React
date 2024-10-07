import Question from "../components/Home";
import { useState, useEffect } from "react";

const HomePage = () => {
   const [questions, setQuestions] = useState([]);
   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      const fetchQuestions = async () => {
         try {
            const res = await fetch("http://localhost:8000/questions");
            const data = await res.json();
            setQuestions(data);
         } catch (error) {
            console.log("Error fetching data : ", error);
         } finally {
            setLoading(false);
         }
      };
      fetchQuestions();
   }, []);

   const handleNextQuestion = () => {
      if (currentQuestionIndex < questions.length) {
         setCurrentQuestionIndex((prev) => prev + 1);
         return true;
      }
   };

   const handlePreviousQuestion = () => {
      setCurrentQuestionIndex((prev) => prev - 1);
   };

   if (loading) {
      return <h1>Loading...</h1>;
   }

   if (questions.length === 0) {
      return <h1>No questions found</h1>;
   }

   return (
      <div>
         <Question
            questions={questions}
            handleNextQuestion={handleNextQuestion}
            handlePreviousQuestion={handlePreviousQuestion}
            isLastQuestion={currentQuestionIndex === questions.length - 1}
            currentQuestionIndex={currentQuestionIndex}
         />
      </div>
   );
};

export default HomePage;

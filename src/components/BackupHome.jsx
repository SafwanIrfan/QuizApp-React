import { useEffect, useState } from "react";
import Result from "./Result";

const Home = () => {
   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
   const [questions, setQuestions] = useState([]);
   const [loading, setLoading] = useState(true);
   const [correctOption, setCorrectOption] = useState(0);
   const [wrongOption, setWrongOption] = useState(0);
   const [btnClickOne, setBtnClickOne] = useState(false);
   const [btnClickTwo, setBtnClickTwo] = useState(false);
   const [btnClickThree, setBtnClickThree] = useState(false);
   const [btnClickFour, setBtnClickFour] = useState(false);

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
      if (currentQuestionIndex < questions.length - 1) {
         return setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
         alert("You have completed the quiz!");
      }
   };

   const anyOneOptionSelected = () => {
      if (btnClickOne || btnClickTwo || btnClickThree || btnClickFour) {
         return true;
      } else {
         alert("Please select an option");
         return false;
      }
   };

   const defaultButton = () => {
      setBtnClickOne(false);
      setBtnClickTwo(false);
      setBtnClickThree(false);
      setBtnClickFour(false);

      console.log("Correct Option : ", correctOption);
      console.log("Wrong Option : ", wrongOption);
   };

   if (loading) {
      return <div>Loading...</div>;
   }

   if (questions.length === 0) {
      return <div>No questions.</div>;
   }

   const handleCorrectOption = () => {
      if (
         btnClickOne &&
         questions[currentQuestionIndex].options[0] ===
            questions[currentQuestionIndex].correct
      ) {
         setCorrectOption(correctOption + 1);
      } else if (
         btnClickTwo &&
         questions[currentQuestionIndex].options[1] ===
            questions[currentQuestionIndex].correct
      ) {
         setCorrectOption(correctOption + 1);
      } else if (
         btnClickThree &&
         questions[currentQuestionIndex].options[2] ===
            questions[currentQuestionIndex].correct
      ) {
         setCorrectOption(correctOption + 1);
      } else if (
         btnClickFour &&
         questions[currentQuestionIndex].options[3] ===
            questions[currentQuestionIndex].correct
      ) {
         setCorrectOption(correctOption + 1);
      } else {
         setWrongOption(wrongOption + 1);
      }
   };

   const question = questions[currentQuestionIndex];

   return (
      <section>
         <p className="text-2xl mb-6 flex justify-center font-semibold">{`Question No: ${questions[currentQuestionIndex].id}`}</p>
         <div className="p-8">
            <p className="text-2xl flex justify-center">{question.ques}</p>
            <div className="mt-6 grid grid-cols-2 gap-4 max-w-xs mx-auto">
               <button
                  onClick={() => {
                     setBtnClickOne((prevState) => !prevState);
                     setBtnClickTwo(false);
                     setBtnClickThree(false);
                     setBtnClickFour(false);
                  }}
                  className={
                     btnClickOne
                        ? "bg-gray-400  border-2 border-black text-black py-2 px-4 rounded "
                        : "bg-gray-200 hover:bg-gray-300 border-2 border-black text-black py-2 px-4 rounded"
                  }
               >
                  {question.options[0]}
               </button>
               <button
                  onClick={() => {
                     setBtnClickTwo((prevState) => !prevState);
                     setBtnClickOne(false);
                     setBtnClickThree(false);
                     setBtnClickFour(false);
                  }}
                  className={
                     btnClickTwo
                        ? "bg-gray-400  border-2 border-black text-black py-2 px-4 rounded "
                        : "bg-gray-200 hover:bg-gray-300 border-2 border-black text-black py-2 px-4 rounded"
                  }
               >
                  {question.options[1]}
               </button>
               <button
                  onClick={() => {
                     setBtnClickThree((prevState) => !prevState);
                     setBtnClickOne(false);
                     setBtnClickTwo(false);
                     setBtnClickFour(false);
                  }}
                  className={
                     btnClickThree
                        ? "bg-gray-400  border-2 border-black text-black py-2 px-4 rounded "
                        : "bg-gray-200 hover:bg-gray-300 border-2 border-black text-black py-2 px-4 rounded"
                  }
               >
                  {question.options[2]}
               </button>
               <button
                  onClick={() => {
                     setBtnClickFour((prevState) => !prevState);
                     setBtnClickOne(false);
                     setBtnClickTwo(false);
                     setBtnClickThree(false);
                  }}
                  className={
                     btnClickFour
                        ? "bg-gray-400  border-2 border-black text-black py-2 px-4 rounded "
                        : "bg-gray-200 hover:bg-gray-300 border-2 border-black text-black py-2 px-4 rounded"
                  }
               >
                  {question.options[3]}
               </button>
            </div>
            <div className="mt-6 flex justify-center">
               <div
                  className={
                     currentQuestionIndex > 0 ? "grid grid-cols-2 gap-4" : ""
                  }
               >
                  {currentQuestionIndex > 0 && (
                     <button
                        onClick={() =>
                           setCurrentQuestionIndex(currentQuestionIndex - 1)
                        }
                        className="bg-gray-600 text-white py-2 px-6 rounded hover:bg-gray-700"
                     >
                        Previous
                     </button>
                  )}
                  <button
                     className="bg-red-500 text-white py-2 px-6 rounded hover:bg-red-600"
                     onClick={() => {
                        if (anyOneOptionSelected()) {
                           handleCorrectOption();
                           handleNextQuestion();
                           defaultButton();
                        }
                     }}
                  >
                     {currentQuestionIndex < questions.length - 1
                        ? "Submit and next"
                        : "Finish"}
                  </button>
               </div>
            </div>
         </div>
         <Result correct={correctOption} wrong={wrongOption} />;
      </section>
   );
};

export default Home;

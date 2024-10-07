import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const Question = ({
   questions,
   handleNextQuestion,
   handlePreviousQuestion,
   isLastQuestion,
   currentQuestionIndex,
}) => {
   const [correctOption, setCorrectOption] = useState(0);
   const [wrongOption, setWrongOption] = useState(0);
   const [btnClickOne, setBtnClickOne] = useState(false);
   const [btnClickTwo, setBtnClickTwo] = useState(false);
   const [btnClickThree, setBtnClickThree] = useState(false);
   const [btnClickFour, setBtnClickFour] = useState(false);

   const navigate = useNavigate();

   const question = questions[currentQuestionIndex];

   // useEffect(() => {
   //    if (quizFinished) {
   //       navigate("/result", {
   //          state: {
   //             selectedOptions: selectedOptions,
   //             correct: correctOption,
   //             wrong: wrongOption,
   //             questions: questions,
   //          },
   //       });
   //    }
   // }, [
   //    correctOption,
   //    wrongOption,
   //    quizFinished,
   //    navigate,
   //    questions,
   //    selectedOptions,
   // ]);

   const anyOneOptionSelected = () => {
      if (btnClickOne || btnClickTwo || btnClickThree || btnClickFour) {
         return true;
      } else {
         alert("Please select an option");
         return false;
      }
   };

   const nextDefaultButton = () => {
      if (question.selected === question.options[0]) {
         setBtnClickOne(false);
      } else if (question.selected === question.options[1]) {
         setBtnClickTwo(false);
      } else if (question.selected === question.options[2]) {
         setBtnClickThree(false);
      } else if (question.selected === question.options[3]) {
         setBtnClickFour(false);
      } else {
         setBtnClickOne(false);
         setBtnClickTwo(false);
         setBtnClickThree(false);
         setBtnClickFour(false);
      }
   };

   const prevQuestion = questions[currentQuestionIndex - 1];
   const previousDefaultButton = () => {
      console.log(questions[currentQuestionIndex - 1].selected);
      console.log(prevQuestion.options[0]);
      if (prevQuestion.selected === prevQuestion.options[0]) {
         setBtnClickOne((prev) => !prev);
      }
      if (prevQuestion.selected === prevQuestion.options[1]) {
         setBtnClickTwo((prev) => !prev);
      }
      if (prevQuestion.selected === prevQuestion.options[2]) {
         setBtnClickThree((prev) => !prev);
      }
      if (prevQuestion.selected === prevQuestion.options[3]) {
         setBtnClickFour((prev) => !prev);
      }
   };

   const handleCorrectOption = () => {
      if (btnClickOne && question.options[0] === question.correct) {
         setCorrectOption(correctOption + 1);
      } else if (btnClickTwo && question.options[1] === question.correct) {
         setCorrectOption(correctOption + 1);
      } else if (btnClickThree && question.options[2] === question.correct) {
         setCorrectOption(correctOption + 1);
      } else if (btnClickFour && question.options[3] === question.correct) {
         setCorrectOption(correctOption + 1);
      } else {
         setWrongOption(wrongOption + 1);
      }
   };

   const handleQuestionUpdate = () => {
      if (btnClickOne && question.options[0] === question.correct) {
         question.isCorrect = true;
      } else if (btnClickTwo && question.options[1] === question.correct) {
         question.isCorrect = true;
      } else if (btnClickThree && question.options[2] === question.correct) {
         question.isCorrect = true;
      } else if (btnClickFour && question.options[3] === question.correct) {
         question.isCorrect = true;
      } else {
         question.isCorrect = false;
      }
   };

   const quizFinished = currentQuestionIndex === questions.length;

   if (quizFinished) {
      navigate("/result", {
         state: {
            correct: correctOption,
            wrong: wrongOption,
            questions: questions,
         },
      });
   }

   return (
      <section className="pb-4">
         <p className="text-2xl my-4 flex justify-center font-semibold">{`Question No: ${question.id}`}</p>
         <div className="p-8">
            <p className="text-2xl flex justify-center">{question.ques}</p>
            <div className="mt-6 grid grid-cols-2 gap-4 max-w-xs mx-auto">
               <button
                  onClick={() => {
                     setBtnClickOne((prevState) => !prevState);
                     setBtnClickTwo(false);
                     setBtnClickThree(false);
                     setBtnClickFour(false);
                     question.selected = question.options[0];
                  }}
                  className={
                     question.selected === question.options[0]
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
                     question.selected = question.options[1];
                  }}
                  className={
                     question.selected === question.options[1]
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
                     question.selected = question.options[2];
                  }}
                  className={
                     question.selected === question.options[2]
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
                     question.selected = question.options[3];
                  }}
                  className={
                     question.selected === question.options[3]
                        ? "bg-gray-400  border-2 border-black text-black py-2 px-4 rounded "
                        : "bg-gray-200 hover:bg-gray-300 border-2 border-black text-black py-2 px-4 rounded"
                  }
               >
                  {question.options[3]}
               </button>
            </div>
            <div className="my-6 flex justify-center">
               <div
                  className={
                     currentQuestionIndex > 0 ? " grid grid-cols-2 gap-4" : ""
                  }
               >
                  {currentQuestionIndex > 0 && (
                     <button
                        onClick={() => {
                           handlePreviousQuestion();
                           handleQuestionUpdate();
                           previousDefaultButton();
                           questions[currentQuestionIndex - 1].isCorrect ===
                           true
                              ? setCorrectOption(correctOption - 1)
                              : setWrongOption(wrongOption - 1);
                        }}
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
                           handleQuestionUpdate();
                           handleNextQuestion();
                           nextDefaultButton();
                        }
                     }}
                  >
                     {!isLastQuestion ? "Submit and next" : "Finish"}
                  </button>
               </div>
            </div>
         </div>
      </section>
   );
};

Question.propTypes = {
   questions: PropTypes.array.isRequired,
   handleNextQuestion: PropTypes.func.isRequired,
   handlePreviousQuestion: PropTypes.func.isRequired,
   isLastQuestion: PropTypes.bool.isRequired,
   currentQuestionIndex: PropTypes.number.isRequired,
};
export default Question;

import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ResultPage = () => {
   const [showDetails, setShowDetails] = useState(false);
   const navigate = useNavigate();
   const location = useLocation();
   const { correct, wrong, questions } = location.state || {};

   const heading = () => {
      if (correct >= 7) {
         return "Excellent";
      } else if (correct >= 5 && correct < 7) {
         return "Good. It could have been better";
      } else {
         return "Fail ! You can try again";
      }
   };

   return (
      <div className="p-6 text-center">
         <h1 className="text-4xl">{heading()}</h1>
         <div>
            <button
               className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mt-4"
               onClick={() => setShowDetails((prevState) => !prevState)}
            >
               {showDetails ? "Hide Details" : "Show Details"}
            </button>
            {showDetails && (
               <div className="bg-slate-800 py-6 my-6 mx-20 text-white border-2 border-orange-600 rounded-lg ">
                  <p className="text-2xl">Correct Answers: {correct}</p>
                  <p className="text-2xl">Wrong Answers: {wrong}</p>
                  <div className="mt-4 flex justify-center">
                     <h2 className="text-2xl mr-4">Selected Options</h2>
                     <h2 className="text-2xl ml-4">Correct Options</h2>
                  </div>
                  <div className=" flex justify-center">
                     <ul>
                        {questions.map((question, index) => (
                           <li
                              className={
                                 question.selected === question.correct
                                    ? " bg-green-500 px-6 py-2 border-x-2 border-b-2 border-white"
                                    : " bg-red-500 px-6 py-2 border-x-2 border-b-2 border-white"
                              }
                              key={index}
                           >
                              {`${question.selected}`}
                           </li>
                        ))}
                     </ul>
                     <ul>
                        {questions.map((question, index) => (
                           <li
                              className={
                                 question.selected === question.correct
                                    ? " bg-green-500 px-6 py-2 border-x-2 border-b-2 border-white"
                                    : " bg-red-500 px-6 py-2 border-x-2 border-b-2 border-white"
                              }
                              key={index}
                           >
                              {`${question.correct}`}
                           </li>
                        ))}
                     </ul>
                  </div>
               </div>
            )}
            <div className="mt-6">
               <button
                  onClick={() => navigate("/")}
                  className="bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded"
               >
                  Try Again
               </button>
            </div>
         </div>
      </div>
   );
};

export default ResultPage;

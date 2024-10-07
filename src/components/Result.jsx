import PropTypes from "prop-types";

const Result = ({ correct, wrong }) => {
   return (
      <div className="flex justify-center">
         <h1>Correct : {correct}</h1>
         <h1>Wrong : {wrong}</h1>
      </div>
   );
};
Result.propTypes = {
   correct: PropTypes.number,
   wrong: PropTypes.number,
};

export default Result;

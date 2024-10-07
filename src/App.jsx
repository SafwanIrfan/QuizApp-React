import MainLayout from "./Layouts/MainLayout";
import HomePage from "./pages/HomePage";
import ResultPage from "./pages/ResultPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
   return (
      <Router>
         <Routes>
            <Route path="/" element={<MainLayout />}>
               <Route index element={<HomePage />} />
               <Route path="/result" element={<ResultPage />} />
            </Route>
         </Routes>
      </Router>
   );
};

export default App;

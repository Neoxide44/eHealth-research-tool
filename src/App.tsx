import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginForm from "./components/login form/LoginForm";
import "./index.css";
import PatientForm from "./components/info form/PatientForm";
import RegisterForm from "./components/login form/RegisterForm";
import OutcomesTable from "./components/end page/table";
import Quiz from "./components/questions/Quiz";

function App() {
    return (
        <div className="container min-vh-100 d-flex justify-content-center align-items-center">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<LoginForm />} />
                    <Route path="/register" element={<RegisterForm />} />
                    <Route path="/patient_form/:id" element={<PatientForm />} />
                    <Route
                        path="/quiz/:section/:q_id/:id"
                        element={<Quiz />}
                    ></Route>
                    <Route path="/outcome/:id" element={<OutcomesTable />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;

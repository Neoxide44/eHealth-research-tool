import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginForm from "./components/login form/LoginForm";
import PatientForm from "./components/info form/PatientForm";
import RegisterForm from "./components/login form/RegisterForm";
import OutcomesTable from "./components/end page/table";
import Quiz from "./components/questions/Quiz";
import ProjectCodeForm from "./components/login form/ProjectCodeForm";
import EyeQuestion from "./components/questions/circle page/CircleQuestion";

function App() {
    return (
        <div className="container min-vh-100 d-flex justify-content-center align-items-center">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<ProjectCodeForm />} />
                    <Route path="/login" element={<LoginForm />} />
                    <Route path="/register" element={<RegisterForm />} />
                    <Route path="/patient_form/:id" element={<PatientForm />} />
                    <Route
                        path="/quiz/:section/:q_id/:id"
                        element={<Quiz />}
                    ></Route>
                    <Route
                        path="/circle/:section/:q_id/:id"
                        element={<EyeQuestion />}
                    ></Route>
                    <Route path="/outcome/:id" element={<OutcomesTable />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;

import "./App.css";
import NavBar from "./component/NavBar";
import CompanyRegister from "./pages/CompanyRegister";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { BrowserRouter, Route } from "react-router-dom";
import CandidateRegister from "./pages/CandidateRegister";
import CandidateHome from "./pages/CandidateHome";
import CompanyHome from "./pages/CompanyHome";
import AppliedJobs from "./pages/AppliedJobs";
import Applicants from "./pages/Applicants";

function App() {
	return (
		<div className='App'>
			<BrowserRouter>
				<Route path='/' exact component={Home} />
				<Route path='/login' component={Login} />
				<Route path='/companyRegister' component={CompanyRegister} />
				<Route path='/candidateRegister' component={CandidateRegister} />
				<Route path='/candidateHome' component={CandidateHome} />
				<Route path='/companyHome' component={CompanyHome} />
				<Route path='/jobsApplied' component={AppliedJobs} />
				<Route path='/applicants' component={Applicants} />
			</BrowserRouter>
		</div>
	);
}

export default App;

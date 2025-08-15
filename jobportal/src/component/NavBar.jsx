import { useLocation } from "react-router-dom";
// eslint-disable-next-line
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
const NavBar = () => {
	const handleLogout = () => {
		localStorage.removeItem("token")
		localStorage.removeItem("UserDetails");
		localStorage.removeItem("type")
	};
	const location = useLocation();
	return (
		<nav className='navbar navbar-expand-md navbar-dark bg-dark mb-4'>
			<div className='container-fluid'>
				<Link to='/' className='navbar-brand mr-auto'>
					Home
				</Link>
				{localStorage.getItem("type") === "Candidate" ? (
					<>
						<Link className='navbar-brand nav-link active' to='/jobsApplied'>
							Applied Jobs
						</Link>
					</>
				):(<></>)}
				{localStorage.getItem("type") === "Company" ? (
					<>
						<Link className='navbar-brand  active' to='/addJob'>
							Add New Job
						</Link>
						<Link className='navbar-brand  active' to='/applicants'>
							Applicants
						</Link>
					</>
				):(<></>)}
				<div>
					<ul className='navbar-nav me-auto mb-3 mb-md-0'>
						<li className='nav-item'>
							{localStorage.getItem("token") == null ? (
								if (condition) {
									
								} else {
									
								} location.pathname === "/login" ? (
									<Link
										to='/'
										className='nav-link active'
										aria-current='page'>
										Register
									</Link>
									
									): (
									<>
										<Link to='/SignUp' 
										className='navbar-brand active' 
										aria-current='page'>
										Register
									</Link>
									<Link
										to='/login'
										className='navbar-brand active'
										aria-current='page'>
										Login
									</Link>
									</>
									)
							) : (
								<>
									<span className='nav-link active'>
										{localStorage.getItem("token").toLocaleUpperCase()}
									</span>
									<Link
										to='/login'
										className='nav-link active'
										aria-current='page'
										onClick={handleLogout}>
										LOGOUT
									</Link>
								</>
							)}
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
};

export default NavBar;

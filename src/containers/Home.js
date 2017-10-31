import React, { Component } from 'react';

import logo from '../images/logo.png';

class Home extends Component {
	render() {
		return (
			<div className="text-center container-fluid">
				<img src={logo} alt="Coffee Maker" className="logo mt-5"/>
				<div className="mt-3 mt-md-5">
					<button className="btn btn-outline-warning btn-lg col-sm-3 mt-3 nav-btn">
						<a href="/lab" className="nav-link">Lab</a>
					</button>
					<button className="btn btn-outline-warning btn-lg col-sm-3 ml-sm-3 mt-3 nav-btn">
						<a href="/recipes" className="nav-link">Recipes</a>
					</button>
					<button className="btn btn-outline-warning btn-lg col-sm-3 ml-sm-3 mt-3 nav-btn" disabled>
						<a href="" className="nav-link">Challenge</a>
					</button>
				</div>
			</div>
		);
	}
}

export default Home;
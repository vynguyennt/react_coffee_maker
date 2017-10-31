import React, { Component } from 'react';

import Header from '../components/Header';

import '../styles/Challenge.css';

class Challenge extends Component {
	constructor(props) {
		super(props);
		this.state = {
			stage: 0,
		};
	}
	startChallenge() {
		this.setState({stage: 1});
	}
	render() {
		return (
			<div className="text-center container-fluid recipes-wrapper">
				<Header />

				{this.state.stage === 0 ? 
					<div className="challenge-instruction">
						<h4>Challenge!</h4>
						<p>You have to make 5 cups of coffee. You will have 1 minute for each cup.</p>
						<button className="btn btn-warning btn-lg" onClick={() =>this.startChallenge()}>Start</button>
					</div>
					:
					<h1>Loading Game...</h1>
				}
			</div>
		);
	}
}

export default Challenge;
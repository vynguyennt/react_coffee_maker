import React, { Component } from 'react';

import '../styles/App.css'

import logo from '../images/logo.png';

class Header extends Component {
	render() {
		return <a href="/" className="clearfix"><img src={logo} alt="Coffee Maker" width="50" className="m-2 float-left"/></a>;
	}
}

export default Header;
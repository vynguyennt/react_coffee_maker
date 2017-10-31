import React, { Component } from 'react';
import { CSSTransitionGroup } from 'react-transition-group';

import '../styles/Cup.css'

class Cup extends Component {
	render() {
		let newPos = 0;
		let ingreHeight = this.props.ingredientHeight;
		let ingredients = this.props.ingredients.map(function(ingredient, index) {
			let style = {bottom: newPos};
			let className = 'ingredient ' + ingredient;
			newPos += ingreHeight;
			return (
				<div className={className} style={style} key={index}>{ingredient.split('-').join(' ')}</div>
			);
		});

		return (
			<div className={'cup ' + this.props.size }>
				<div className='cup-body'>
					<CSSTransitionGroup
						transitionName='ingredient'
						transitionEnterTimeout={500}
						transitionLeaveTimeout={300}>
						{ingredients}
        			</CSSTransitionGroup>
        		</div>
				<div className='cup-handle'></div>
			</div>
		);
	}
}

export default Cup;
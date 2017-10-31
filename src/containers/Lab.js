import React, { Component } from 'react';

import Cup from '../components/Cup';
import RecipeModal from '../components/RecipeModal';
import Header from '../components/Header';

class Lab extends Component {
	constructor(props) {
		super(props);
		this.state = {
			ingredients: ['espresso', 'chocolate', 'hot-water', 'whipped-cream', 'foamed-milk', 'steamed-milk', 'hot-milk'],
			history: [
				{
					ingredients: [],
					recipeMessage: 'Let\'s make a cup of coffee',
					recipeFound: true,
				}
			],
			step: 0,
			size: 'small',
			error: '',
			modalIsOpen: false,
		};
	}

	openModal() {
	    this.setState({modalIsOpen: true});
	}

	afterOpenModal() {
	    // references are now sync'd and can be accessed.
	}

	closeModal() {
	    this.setState({modalIsOpen: false});
	}
	addIngredient(ingredient) {
		const history = this.state.history.slice(0, this.state.step + 1);
		const current = history[history.length - 1];

		if (this.state.size === 'small' && current.ingredients.length >= 3) {
			this.setState({error: 'Too much for this cup! Please use big cup!'});
			return;
		} else if (this.state.size === 'big' && current.ingredients.length >= 6) {
			this.setState({error: 'Too much for this cup! '});
			return;
		}
		let newIngredients = current.ingredients.concat(ingredient);
		let checkResult = this.checkRecipe(newIngredients.slice(0).sort());
		let checkMessage = 'It\'s a new recipe. Name it!';
		let recipeFound = false;

		if(checkResult !== '') {
			checkMessage = 'It\'s ' + checkResult;
			recipeFound = true;
		} else {
			recipeFound = false;
		}

		this.setState({
			history: history.concat([
				{
				  ingredients: newIngredients,
				  recipeMessage: checkMessage,
				  recipeFound: recipeFound,
				}
			]),
			step: history.length
	    });
	}
	checkRecipe(ingredients) {
		let matched = '';
		let recipes = JSON.parse(localStorage.getItem('recipes'));
		for (let i = 0; i < recipes.length; i++) {
			let found = true;
			let bookIngredients = recipes[i].ingredients;
			if(ingredients.length !== bookIngredients.length) continue;
			for (let j = 0; j < ingredients.length; j++) {
				if(bookIngredients[j] !== ingredients[j]) {
					found = false;
					break;
				}
			}
			if(found === false) continue;
			matched = recipes[i].name;
		}
		return matched;
	}
	validateRecipeName(name) {
		name = name.trim().toLowerCase();
		let recipes = JSON.parse(localStorage.getItem('recipes'));
		if(name === '') return false;
		for (let i = 0; i < recipes.length; i++) {
			if(recipes[i].name.trim().toLowerCase() === name) return false;
		}
		return true;
	}
	addRecipe(name) {
		let recipes = JSON.parse(localStorage.getItem('recipes'));
		let currentIngredients = this.state.history[this.state.step].ingredients.slice(0);
		let currentSize = this.state.size;
		if(this.validateRecipeName(name) === true) {
			let newRecipes = recipes.concat([
				{
					name: name,
					ingredients: currentIngredients.slice(0),
					size: currentSize,
					isDefault: false,
				}
			]);
			localStorage.setItem('recipes', JSON.stringify(newRecipes));

			let updatedMessage = 'It\'s ' + name;

			const history = this.state.history.slice(0, this.state.step);

			this.setState({
				history: history.concat([
					{
					  ingredients: currentIngredients.slice(0),
					  recipeMessage: updatedMessage,
					  recipeFound: true,
					}
				])
		    });

		} else {

		}
	}
	changeCup(size) {
		this.setState({
			history: [
				{
					ingredients: [],
					recipeMessage: 'Let\'s make a cup of coffee',
					recipeFound: true,
				}
			],
			step: 0,
			size: size,
			error: '',
			});
	}
	undo() {
		if(this.state.step <= 0) return;
		this.setState({step: (this.state.step - 1), error: ''});

	}
	redo() {
		if((this.state.step + 1) >= this.state.history.length) return;
		this.setState({step: (this.state.step + 1), error: ''});
	}
	render() {
		const history = this.state.history;
   		const current = history[this.state.step];

   		let addButtons = this.state.ingredients.map((ingredient, index) => {
   			return (
   				<button key={index} className={'btn m-1 m-md-2 m-lg-3 ' + ingredient} 
   				onClick={() => this.addIngredient(ingredient)}>{ingredient.split('-').join(' ')}</button>
   			);
   		});

		return (
			<div className="text-center">
				<Header />
				
				<h4>{current.recipeMessage}</h4>
				<Cup ingredients={current.ingredients} size={this.state.size} ingredientHeight={40} />
				<div className="action-group">
					<p className="error-message">{this.state.error}</p>
					<div>
						{addButtons}
						<button className="btn btn-info m-1 m-md-2 m-lg-3" 
							onClick={() => this.changeCup(this.state.size === 'small' ? 'big' : 'small')}>
							{this.state.size === 'small' ? 'big cup' : 'small cup'}
						</button>
					</div>
					<div>
						<button className="btn btn-primary m-1 m-md-2 m-lg-3" onClick={() => this.undo()}
						disabled={this.state.step === 0}>Undo</button>
						<button className="btn btn-primary m-1 m-md-2 m-lg-3" onClick={() => this.redo()}
						disabled={(this.state.step + 1) === history.length}>Redo</button>
						<button className="btn btn-success m-1 m-md-2 m-lg-3" onClick={() => this.openModal()} 
						disabled={current.recipeFound}>Save</button>
					</div>
				</div>
		        
		        <RecipeModal modalIsOpen={this.state.modalIsOpen} 
		        afterOpenModal={() => this.afterOpenModal()} 
		        closeModal={() => this.closeModal()}
		        validateName={(name) => this.validateRecipeName(name)} 
		        addRecipe={(name) => this.addRecipe(name)}/>
			</div>
		);
	}
}

export default Lab;
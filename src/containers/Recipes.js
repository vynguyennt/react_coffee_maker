import React, { Component } from 'react';

import Header from '../components/Header';
import Cup from '../components/Cup';

import '../styles/Recipes.css';

class Recipes extends Component {
	constructor(props) {
		super(props);
		let recipes = JSON.parse(localStorage.getItem('recipes')).slice(0);
		this.state = {
			recipes: recipes,
		};
	}
	searchRecipes(event) {
		let recipes = JSON.parse(localStorage.getItem('recipes')).slice(0);
		let searchRecipes = [];
		const searchText = event.target.value.trim().toLowerCase();
		for (let i = 0; i < recipes.length; i++) {
			if(recipes[i].name.toLowerCase().indexOf(searchText) >= 0) {
				searchRecipes.push(recipes[i]);
			}
		}
		this.setState({recipes: searchRecipes});
	}
	filterRecipes(isDefault) {
		let recipes = JSON.parse(localStorage.getItem('recipes')).slice(0);
		let filteredRecipes = [];
		for (let i = 0; i < recipes.length; i++) {
			if(recipes[i].isDefault === isDefault) {
				filteredRecipes.push(recipes[i]);
			}
		}
		this.setState({recipes: filteredRecipes});
		if(isDefault) {
			this.defaultRecipeBtn.classList.add('active');
			this.customRecipeBtn.classList.remove('active');
			this.allRecipeBtn.classList.remove('active');
		} else {
			this.defaultRecipeBtn.classList.remove('active');
			this.customRecipeBtn.classList.add('active');
			this.allRecipeBtn.classList.remove('active');
		}
	}
	resetFilter() {
		this.setState({recipes: JSON.parse(localStorage.getItem('recipes')).slice(0)});
		this.defaultRecipeBtn.classList.remove('active');
		this.customRecipeBtn.classList.remove('active');
		this.allRecipeBtn.classList.add('active');
	}
	render() {
		let recipeItems = this.state.recipes.map((recipe, index) => {
			let recipeClass = (recipe.isDefault === true) ? "text-primary" : "text-success";
   			return (
   				<div className="text-center col-sm-6 col-md-4 col-lg-3 col-xl-2 mt-4 mb-3" key={index}>
   					<Cup ingredients={recipe.ingredients} size={recipe.size} ingredientHeight={30} />
   					<div className={"mt-3 recipe-name " + recipeClass}>{recipe.name}</div>
   				</div>
   			);
   		});

		return (
			<div className="text-center container-fluid recipes-wrapper">
				<Header />

				<form className="row justify-content-center">
					<div className="form-group col-md-8 col-lg-6">
					    <input type="text" className="form-control" placeholder="Search recipe" 
					    aria-label="Search recipe" onChange={(event) =>this.searchRecipes(event)}/>
					</div>
				</form>

				<div className="note">
					<span className="text-secondary m-2 m-md-3">Filter:</span>
					<p className="text-primary m-2 m-md-3" 
					onClick={() => this.filterRecipes(true)}
					ref={defaultRecipeBtn => this.defaultRecipeBtn = defaultRecipeBtn} >
						Default recipes are in blue
					</p>
					<p className="text-success m-2 m-md-3" 
					onClick={() => this.filterRecipes(false)}
					ref={customRecipeBtn => this.customRecipeBtn = customRecipeBtn} >
						Your recipes are in green
					</p>
					<p className="m-2 m-md-3 active" 
					onClick={() => this.resetFilter()}
					ref={allRecipeBtn => this.allRecipeBtn = allRecipeBtn} >
						All recipes
					</p>
				</div>

				<div className="row recipe-list align-items-end">{recipeItems}</div>
			</div>
		);
	}
}

export default Recipes;
import React, { Component } from 'react';
import Modal from 'react-modal';

import '../styles/Modal.css'

class RecipeModal extends Component {
	constructor(props) {
		super(props);
		this.state = {
			error: true,
			errorMessage: '',
			saveSuccess: false
		};
	}
	validateName(event) {
		if(this.props.validateName(event.target.value) === true) {
			this.setState({error: false});
		} else {
			this.setState({error: true});
			if(event.target.value.trim() === '') {
				this.setState({errorMessage: 'Please input recipe name'});
			} else {
				this.setState({errorMessage: 'This name is not available'});
			}
		}
	}
	addRecipe(event) {
		event.preventDefault();
		this.props.addRecipe(this.inputField.value);
		this.setState({saveSuccess: true});
		setTimeout(() => {
			this.props.closeModal();
			this.setState({
				error: true,
				errorMessage: '',
				saveSuccess: false
			});
		}, 1000);
	}
	render() {
		return (
			<Modal
				isOpen={this.props.modalIsOpen}
				onAfterOpen={this.props.afterOpenModal}
				onRequestClose={this.props.closeModal}
				className="Modal col-11 col-sm-6 col-md-4"
				overlayClassName="Overlay"
	        >
				<h3 className="text-center">New Recipe</h3>
				<button type="button" className="close" aria-label="Close" onClick={this.props.closeModal}>
					<span aria-hidden="true">&times;</span>
				</button>
				
				{
					!this.state.saveSuccess ? 
					<form className="mt-4" onSubmit={(event) => this.addRecipe(event)}>
						<div className="form-group">
							<input type="text" className="form-control" id="recipe-name" 
							placeholder="Name of new recipe" 
							onChange={(event) => this.validateName(event)} 
							ref={inputField => this.inputField = inputField}/>
							<small id="nameError" className={"form-text text-danger " + (!this.state.error ? 'hide' : '')}>
								{this.state.errorMessage}
							</small>
						</div>
					 	<button type="submit" className="btn btn-info btn-block" disabled={this.state.error}>Save</button>
					</form>
					: <p className="text-info mt-3 text-center">Your recipe was added successfully!</p>
		        }
	        </Modal>
		);
	}
}

export default RecipeModal;
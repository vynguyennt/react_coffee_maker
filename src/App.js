import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

import Home from './containers/Home';
import Lab from './containers/Lab';
import Recipes from './containers/Recipes';

import './styles/App.css';

class App extends Component {
  componentDidMount() {
    if(JSON.parse(localStorage.getItem('recipes')) === null) {
      let recipes = [
        {
          name: 'Espresso',
          ingredients: ['espresso'],
          size: 'small',
          isDefault: true,
        },
        {
          name: 'Doppio',
          ingredients: ['espresso', 'espresso'],
          size: 'small',
          isDefault: true,
        },
        {
          name: 'Café Noisette',
          ingredients: ['espresso', 'espresso', 'hot-milk'],
          size: 'small',
          isDefault: true,
        },
        {
          name: 'Cortado',
          ingredients: ['espresso', 'espresso', 'foamed-milk'],
          size: 'small',
          isDefault: true,
        },
        {
          name: 'Americano',
          ingredients: ['espresso', 'espresso', 'hot-water', 'hot-water', 'hot-water'],
          size: 'big',
          isDefault: true,
        },
        {
          name: 'Cappuccino',
          ingredients: ['espresso', 'espresso', 'steamed-milk', 'steamed-milk', 'foamed-milk', 'foamed-milk'],
          size: 'big',
          isDefault: true,
        },
        {
          name: 'Dry Cappuccino',
          ingredients: ['espresso', 'espresso', 'foamed-milk', 'foamed-milk', 'foamed-milk', 'foamed-milk'],
          size: 'big',
          isDefault: true,
        },
        {
          name: 'Flat White',
          ingredients: ['espresso', 'espresso', 'steamed-milk', 'steamed-milk', 'steamed-milk', 'steamed-milk'],
          size: 'big',
          isDefault: true,
        },
        {
          name: 'Mocha',
          ingredients: ['espresso', 'espresso', 'chocolate', 'chocolate', 'steamed-milk'],
          size: 'big',
          isDefault: true,
        },
        {
          name: 'Viennois',
          ingredients: ['espresso', 'espresso', 'hot-milk', 'hot-milk', 'whipped-cream', 'whipped-cream'],
          size: 'big',
          isDefault: true,
        },
        {
          name: 'Con Panna',
          ingredients: ['espresso', 'espresso', 'whipped-cream', 'whipped-cream', 'whipped-cream'],
          size: 'big',
          isDefault: true,
        },
      ];
      localStorage.setItem('recipes', JSON.stringify(recipes));
    }
  }
  render() {
    return (
     <Router>
        <div>
          <Route exact path="/" component={Home} />
          <Route exact path="/lab" component={Lab} />
          <Route exact path="/recipes" component={Recipes} />
        </div>
     </Router>
    );
  }
}

export default App;

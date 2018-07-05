import React, { Component } from 'react';

import visualizations from './visualizations.json';
import HomeItem from './HomeItem';
import logo from '../../assets/images/logo.svg';

import './Home.css';

const Home = () => {
  const items = visualizations.map(viz => <HomeItem key={viz.key} info={viz} />);
  const particlesJS = window.particlesJS;

  if (particlesJS) {
    particlesJS.load('particles-js', './js/particle.json');
  }
  
  return (
    <div  id="particles-js" className="Home">
      <div className="logo">
        <img src={logo} />
      </div>
      <div class="Home-grid">
        { items }
      </div>
    </div>
  );
};
 
export default Home;
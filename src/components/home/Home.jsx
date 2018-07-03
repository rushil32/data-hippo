import React, { Component } from 'react';

import visualizations from './visualizations.json'
import HomeItem from './HomeItem';

import './Home.css';

const Home = () => {
  const items = visualizations.map(viz => <HomeItem key={viz.key} info={viz} />);
  
  return (
    <div className="Home">
      { items }
    </div>
  );
};
 
export default Home;
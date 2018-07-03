
import React from 'react';
import { Link } from 'react-router-dom';

import NbaDynasties from '../nba-dynasties';
import NbaDraft from '../nba-draft';
import './VizContainer.css';

const VizContainer = ({ match }) => {
  let key = match.params.vizKey;
  let viz;
  
  switch(key) {
    case 'nba-dynasties':
      viz = <NbaDynasties />; break;
    case 'nba-draft': 
      viz = <NbaDraft />; break;
    default:
      viz = <p>No Viz selected</p>;
  }

  return (
    <div className="VizContainer animated fadeIn">
      <Link to="/" className="close-icon">
        <i className="material-icons">close</i>
      </Link>
      {viz}
    </div>
  )
}
 
export default VizContainer;
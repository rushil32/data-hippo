import React from 'react';
import { withRouter } from 'react-router-dom';

import './HomeItem.css';

function HomeItem({ info, history }) {
  function navigateToViz(key) {
    history.push(`/viz/${key}`)
  }
  return (
    <div className="HomeItem" onClick={() => navigateToViz(info.key)}>
      <div className="HomeItem__content">
        <p className="HomeItem__category">
          <i className="material-icons">{info.icon}</i>
          {info.category}
        </p>
        <span></span>
        <h3 className="HomeItem__title">{info.title}</h3>
        <p className="HomeItem__desc">{info.description}</p>
      </div>
    </div>
  )
}

export default withRouter(HomeItem);
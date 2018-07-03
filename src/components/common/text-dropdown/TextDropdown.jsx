import React from 'react';
import './TextDropdown.css';

const TextDropdown = ({ options, active, handleClick }) => {
  return (
    <div class="dropdown TextDropdown">
      <button class="dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        {active}
        <i class="material-icons">keyboard_arrow_down</i>
      </button>
      <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
        { options.map((option, index) => (<a 
            key={index}
            onClick={() =>
            handleClick(option)}
            class="dropdown-item"
            href="#"
          >
          {option}
          </a>)
        )}
      </div>
    </div>
  );
};

export default TextDropdown;

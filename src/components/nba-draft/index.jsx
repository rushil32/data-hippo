import React, { Component } from 'react';

import ScatterPlot from '../graphs/scatter-plot';
import TextDropdown from '../common/text-dropdown/TextDropdown';
import data from '../../assets/nba-draft/data/nba-draft.json';
import './index.css';

class NbaDraft extends Component {
  state = {
    selected: 'made an all star team'
  }

  constructor() {
    super();
    this.options = [
      {
        text: 'made an all star team',
        field: 'all_star',
        label: 'All Star Selections',
        gt: 0
      },
      {
        text: 'averaged 10+ PPG',
        field: 'points_per_game',
        label: 'Points per game',
        gt: 14.9
      },
      {
        text: 'played 10+ years',
        field: 'yrs',
        label: 'Years in league',
        gt: 9,
      },
      {
        text: 'averaged 5+ APG',
        field: 'assists_per_game',
        label: 'Assists per game',
        gt: 4.9
      },
      {
        text: 'averaged 8+ RPG',
        field: 'trb_per_game',
        label: 'Total rebounds per game',
        gt: 7.9
      },
      {
        text: 'made an all NBA team',
        field: 'all_nba',
        label: 'All NBA team selections',
        gt: 0
      }
    ]
  }

  setOption = selected => this.setState({ selected })

  getData = (selected) => {
    const option = this.options.find(option => option.text === selected);
    return data.filter(player => player[option.field] > option.gt);
  }

  render() {
    const { selected } = this.state;
    const option = this.options.find(option => option.text === selected);

    return ( 
      <div className="NbaDraft">
        <h1>
          Draft picks who
          <TextDropdown
            options={this.options.map(option => option.text)}
            active={selected}
            handleClick={this.setOption} 
          /> 
        </h1>
        <div class="dash-card">
          <ScatterPlot
            data={this.getData(selected)}
            height={550}
            width={800}
            xField={'pk'}
            xLabel={'Draft Pick'}
            yField={option.field}
            yLabel={option.label}
          />
        </div>
      </div>
    )
  }
}
 
export default NbaDraft;
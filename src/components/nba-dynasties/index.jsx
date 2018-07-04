import React, { Component } from 'react';

import { getList } from './helpers';
import teamLogos from './teamLogos';
import TextDropdown from '../common/text-dropdown/TextDropdown';
import TinyBarChart from '../graphs/tiny-bar-chart/TinyBarChart';
import Table from '../graphs/table';
import './index.css';

class NbaDynasties extends Component {
  constructor() {
    super();
    this.yearOptions = [2, 4, 6, 10];
    this.typeOptions = ['best', 'worst'];
    this.headers = ['Team', 'From', 'To', 'Total Wins', 'Avg Wins Per Season', 'Avg Wins per season (All Time)'];
    this.state = {
      type: 'best',
      years: 4,
      data: []
    }
  }

  componentDidMount() {
    const { years, type } = this.state;
    this.refreshData(years, type);
  }

  refreshData = (years, type) => this.setData(this.getData(years, type));
  
  setYears = years => {
    this.setState({ years });
    this.refreshData(years, this.state.type)
  };

  setType = type => {
    this.setState({ type });
    this.refreshData(this.state.years, type)
  };

  getData = (years, type) => getList(years, type);

  setData = (data) => {
    this.setState({ data });
  }

  formatData = (data) => {
    if (!data.length) return [];

    const formattedData = data.map(team => Object.values(team));
    const barColor = this.state.type === 'best' ? '#1e90ff' : '#ff6b81';

    formattedData.map((team, index) => {
      team[0] = (
        <div>
          <img src={teamLogos[team[0]]} />
          <span>{team[0]}</span>
        </div>
      )
      team[4] = (
        <div>
          <TinyBarChart data={[parseInt(team[4])]} max={82} height={20} width={110} index={index} color={barColor} />
        </div>
      )
      team[5] = (
        <div>
          <TinyBarChart data={[parseInt(team[5])]} max={82} height={20} width={110} index={index} color={'#ffa502'} />
        </div>
      )
    });

    return formattedData;
  }

  render() { 
    const formattedData = this.formatData(this.state.data);
    const { years, type } = this.state;
    const { yearOptions, typeOptions } = this;

    return ( 
      <div className="NbaDynasties">
        <h1>
          The 
          <TextDropdown options={typeOptions} active={type} handleClick={this.setType} /> 
          streches over 
          <TextDropdown options={yearOptions} active={years} handleClick={this.setYears} /> 
          years
        </h1>
        <div class="card">
          <Table headers={this.headers} data={formattedData} />
        </div>
      </div>
    )
  }
}
 
export default NbaDynasties;
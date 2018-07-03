import teamData from './teamData';

function getSum(arr, startIndex, numberOfVals) {
  let sum = 0;

  for (let i = startIndex; i < startIndex + numberOfVals; i++) {
    sum += parseInt(arr[i]);
  }
  return sum;
}

function getHigh(arr, numberOfVals) {
  let sum = 0;
  let currentSum;
  let index = 0;

  for (let i = 0; i < arr.length - numberOfVals; i++) {
    currentSum = getSum(arr, i, numberOfVals);

    if (currentSum > sum) {
      index = i + 1;
      sum = currentSum;
    }
  }
  return {
    index,
    sum
  };
}

function getLow(arr, numberOfVals) {
  let sum = 9999;
  let currentSum;
  let index = 0;

  for (let i = 0; i < arr.length - numberOfVals; i++) {
    currentSum = getSum(arr, i, numberOfVals);

    if (currentSum < sum) {
      index = i + 1;
      sum = currentSum;
    }
  }

  return {
    index,
    sum
  };
}

export function getList(years, type) {
  let list = [];

  for (let i in teamData) {
    const team = teamData[i];
    const teamWinPct = team.map(stat => stat['W']);

    const totalWinsAllTime = team
      .map(stat => stat['W'])
      .reduce((total, num) => total + num);

    const { index, sum } = type === 'best' 
      ? getHigh(teamWinPct, years) 
      : getLow(teamWinPct, years);

    list.push({
      team: team[team.length - 1]['Team'],
      start: team[index]['Season'],
      end: team[index + years - 1]['Season'],
      total: sum,
      avg: (sum / years).toFixed(1),
      avgAllTime: (totalWinsAllTime / team.length).toFixed(1)
    });
  }

  return type === 'best'
    ? list.sort((a, b) => b.total - a.total)
    : list.sort((a, b) => a.total - b.total);
}

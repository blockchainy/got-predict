import React, { Component } from 'react'
import md5 from 'md5';
import axios from 'axios';
import test from '../questions/questions';
import DonutChart from "react-d3-donut";

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class PersonalStats extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      d3data: [],
      showMessage: false,
      answers: [],
    };
    this.getUserData = this.getUserData.bind(this);
    this.format = this.format.bind(this);
    this.formatD3Data = this.formatD3Data.bind(this);
    this.splitName = this.splitName.bind(this);
  }

  format(data) {
    const answers = [];
    Object.keys(data).forEach((key) => {
      const value = data[key];
      if (key.indexOf('question') !== -1) {
        const number = parseInt(key.substr('question'.length), 10);
        answers[number - 1] = value;
      }
    })
    return answers
  }
  
  async getUserData() {
    let hash = md5(this.state.email);
    let { data } = await axios.get(`https://cors-anywhere.herokuapp.com/https://j297mfbwv8.execute-api.us-west-1.amazonaws.com/test/stats/${hash}`)
    let { name, house } = data.Item;
    let { questions } = test
    let answers = this.format(data.Item)
    for (let i = 0; i < answers.length; i++) {
      if (answers[i] === 'a') {
        this.setState({ answers: [...this.state.answers, `${questions[i].title} : ALIVE`] })
        console.log(`${questions[i].title} : ALIVE`);
      } else if (answers[i] === 'b') {
        this.setState({ answers: [...this.state.answers, `${questions[i].title} : DEAD`] })
        console.log(`${questions[i].title} : DEAD`);
      } else {
        this.setState({ answers: [...this.state.answers, `${questions[i].title} : WHITEWALKER`] })
        console.log(`${questions[i].title} : WHITEWALKER`);
      }
    }
  }

  splitName(name) {
    // format name based off db response
    let fullName = name.split(' ');
    this.setState({
      name: `${fullName[0]} of House ${fullName[1]}`
    })
  }

  async formatD3Data() {
    let aliveCount = 0 
    let deadCount = 0
    let whiteWalkerCount = 0
    let hash = md5(this.state.email);
    let { questions } = test
    let { data } = await axios.get(`https://cors-anywhere.herokuapp.com/https://j297mfbwv8.execute-api.us-west-1.amazonaws.com/test/stats/${hash}`)
    let { name, house } = data.Item;
    this.splitName(name);
    let answers = this.format(data.Item)

    // go through the answers, and count how many dead/alive/ww 
    // also sets the question + answer to state
    for (let i = 0; i < answers.length; i++) {
      if (answers[i] === 'a') {
        this.setState({ answers: [...this.state.answers, `${questions[i].title} : ALIVE`] })
        aliveCount++
      } else if (answers[i] === 'b') {
        this.setState({ answers: [...this.state.answers, `${questions[i].title} : DEAD`] })
        deadCount++
      } else {
        this.setState({ answers: [...this.state.answers, `${questions[i].title} : WHITEWALKER`] })
        whiteWalkerCount++
      }
    }
    this.setState({d3data: [
      {
        count: aliveCount,
        color: "#00ccff",
        name: "ALIVE"
      },
      {
        count: deadCount,
        color: "#0000b3",
        name: "DEAD"
      },
      {
        count: whiteWalkerCount,
        color: "#b3c6ff",
        name: "WHITEWALKER"
      }
    ], showMessage: true, house: `Bannerman of House ${house}`})
    console.log(this.state.answers)
  }
  
  render() {

    const answers = this.state.answers.map(answer => <div class="outerAlign"><div class="answers">{answer}</div></div>);
    return (
      <div class="gameOfThrones">

        <TextField
          id="standard-name"
          label="Enter email"
          onChange={event => this.setState({ email: event.target.value })}
          margin="normal"
        />
        <br/>
        <Button onClick={this.formatD3Data}>Search stats</Button> <br/>
        {this.state.name}<br/>
        {this.state.house} <br/> <br/>
        {this.state.showMessage && (<DonutChart
          innerRadius={70}
          outerRadius={100}
          transition={true}
          svgClass="example1"
          pieClass="pie1"
          displayTooltip={true}
          strokeWidth={3}
          data={this.state.d3data}
        />)} 
        <br/>
        {answers}
        {/* <Questions questions={test.questions}/> */}
      </div>
    )
  }
}

export default PersonalStats;
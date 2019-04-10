import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { routes } from '../constants'
import crown from '../images/crown.jpg';
import sword from '../images/swords.jpg';
import graph from '../images/graph.jpg';

export default class HomePage extends Component {
  render() {
    return (
      <div>
        <br/>
        <div className="title">
          Winter is here. 
        </div><br/>
        <div className="tagline">
          Compete with your friends on GoT predictions
        </div>
        <br/><br/><br/><br/><br/>
        <div class="flex-container">
          <div class="item"></div>
          <div class="item">
          <Link to={routes.STATS}>
            <img src={graph} class="hvr-grow" width="80" height="80" alt=""/><br/>
          </Link>
          </div>
          <div class="item">
            <img src={sword} class="hvr-grow" width="80" height="80" alt=""/>
          </div>
          <div class="item">
            <img src={crown} class="hvr-grow" width="80" height="80" alt=""/>
            </div>
          <div class="item"></div>
        </div>
        <br/><br/>
        <div class="flex-container">
          <div class="item"></div>
          <div class="item">
            Check data
          </div>
          <div class="item">
            Bet friends
          </div>
          <div class="item">
            Become king
          </div>
          <div class="item"></div>
        </div>
      </div>
    )
  }
}

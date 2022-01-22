import React from 'react'
import { FaUserFriends, FaFighterJet, FaTrophy } from 'react-icons/fa'
import PlayerPreview from "./PlayerPreview";
import Results from "./Results";
import {battle} from "./../utils/api"
import PropTypes from 'prop-types';


class PlayerInput extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            userName: ""
        }
    }

    

    handleOnSubmit = (e) => {
        e.preventDefault();
        this.props.onSubmit(this.state.userName);
    }

    handleChange = (e) => {
        this.setState( 
            {userName: e.target.value}
        );
    }

    render(){
        return (
            <form className='column player' onSubmit={this.handleSubmit}>
              <label htmlFor='username' className='player-label'>
                {this.props.label}
              </label>
              <div className='row player-inputs'>
                <input
                  type='text'
                  id='username'
                  className='input-light'
                  placeholder='github username'
                  autoComplete='off'
                  value={this.state.userName}
                  onChange={this.handleChange}
                />
                <button
                  className='btn dark-btn'
                  type='submit'
                  disabled={!this.state.userName}
                  onClick={this.handleOnSubmit}
                >
                  Submit
                </button>
              </div>
            </form>
          )
    }
}

function Instructions () {
  return (
    <div className='instructions-container'>
      <h1 className='center-text header-lg'>
        Instructions
      </h1>
      <ol className='container-sm grid center-text battle-instructions'>
        <li>
          <h3 className='header-sm'>Enter two Github users</h3>
          <FaUserFriends className='bg-light' color='rgb(255, 191, 116)' size={140} />
        </li>
        <li>
          <h3 className='header-sm'>Battle</h3>
          <FaFighterJet className='bg-light' color='#727272' size={140} />
        </li>
        <li>
          <h3 className='header-sm'>See the winners</h3>
          <FaTrophy className='bg-light' color='rgb(255, 215, 0)' size={140} />
        </li>
      </ol>
    </div>
  )
}

export default class Battle extends React.Component {

    constructor(props) {
        super(props)
    
        this.state = {
          playerOne: null,
          playerTwo: null,
          battle: false
        }
      }

      handleSubmit = (id, player) => {
        this.setState({
          [id]: player
        })
      }

      handleReset = (id) => {
        this.setState({
          [id]: null
        })
      }

  render() {
    const { playerOne, playerTwo, battle } = this.state

    if(battle)
      return <Results 
              playerOne={playerOne} 
              playerTwo={playerTwo} 
              onReset={()=> {
                this.setState({
                playerOne: null,
                playerTwo: null,
                battle: false
              })}}/>

    return (
      <React.Fragment>
        <Instructions />

        <div className='players-container'>
          <h1 className='center-text header-lg'>Players</h1>
          <div className='row space-around'>
            {playerOne === null 
                ? <PlayerInput
                      label='Player One'
                      onSubmit={(player) => this.handleSubmit('playerOne', player)}
                    />
                    
                : <PlayerPreview 
                    label='Player One'
                    userName={playerOne}
                    onReset={()=> this.handleReset('playerOne')}/>
              }

            {playerTwo === null 
                ? <PlayerInput
                      label='Player Two'
                      onSubmit={(player) => this.handleSubmit('playerTwo', player)}
                    />
                : <PlayerPreview 
                    label='Player Two'
                    userName={playerTwo}
                    onReset={()=> this.handleReset('playerTwo')}/>
              }
          </div>

          {playerTwo && playerOne && 
          (
            <button className="btn dark-btn btn-space" onClick={()=> this.setState({battle:true})}>
              Battle
            </button>
          )}
        </div>
      </React.Fragment>
    )
  }
}


PlayerInput.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    label: PropTypes.string
}
import React, { Component } from 'react'
import {battle} from "./../utils/api"
import Card from "./Card";
import Loading from "./Loading";
import Tooltip from "./ToolTip";
import PropTypes from "prop-types";
import { FaCompass, FaBriefcase, FaUsers, FaUserFriends, FaUser } from 'react-icons/fa'

function ProfileList ({ profile }) {
    return (
      <ul className='card-list'>
        <li>
          <FaUser color='rgb(239, 115, 115)' size={22} />
          {profile.name}
        </li>
        {profile.location && (
          <li>
            <Tooltip text="User's location">
              <FaCompass color='rgb(144, 115, 255)' size={22} />
              {profile.location}
            </Tooltip>
          </li>
        )}
        {profile.company && (
          <li>
            <Tooltip text="User's company">
              <FaBriefcase color='#795548' size={22} />
              {profile.company}
            </Tooltip>
          </li>
        )}
        <li>
          <FaUsers color='rgb(129, 195, 245)' size={22} />
          {profile.followers.toLocaleString()} followers
        </li>
        <li>
          <FaUserFriends color='rgb(64, 183, 95)' size={22} />
          {profile.following.toLocaleString()} following
        </li>
      </ul>
    )
  }
  
  ProfileList.propTypes = {
    profile: PropTypes.object.isRequired,
  }

export default class Results extends Component {
    constructor(props) {
        super(props);
        this.state = {
            winner: null,
            loser: null,
            errors: null,
            loading: true
        }
    }

    componentDidMount () {
        const { playerOne, playerTwo } = this.props
    
        battle([ playerOne, playerTwo ])
          .then((players) => {
            this.setState(
                {
                    winner: players[0],
                    loser: players[1],
                    loading: false
                }
            )
          })
          .catch(({message})=>{
            this.setState(
                {
                    loading: false,
                    errors: message
                }
            )
        }) 
      }

    render() {
        const {winner, loser, errors, loading} = this.state;
        console.log(this.state);
        
        if(loading) {
            return (
                <Loading />
            )
        }
        if(errors) {
            return (
            <p className="error">
                {errors}
            </p>)
        }
        return (
            <>
            <div className="grid spacearound">
            <Card
                    header={winner.score === loser.score ? 'Tie' : 'Winner'}
                    subheader={`Score: ${winner.score.toLocaleString()}`}
                    avatar={winner.profile.avatar_url}
                    href={winner.profile.html_url}
                    name={winner.profile.login}
                    >
                    <ProfileList profile={winner.profile}/>
                </Card>
                
                <Card
                        header={loser.score === winner.score ? 'Tie' : 'Loser'}
                        subheader={`Score: ${loser.score.toLocaleString()}`}
                        avatar={loser.profile.avatar_url}
                        href={loser.profile.html_url}
                        name={loser.profile.login}
                        >
                       <ProfileList profile={loser.profile}/>
                </Card>
            </div>
            <button className="btn dark-btn btn-space" onClick={this.props.onReset}>
                Reset
            </button>
            </>
        )
    }
}

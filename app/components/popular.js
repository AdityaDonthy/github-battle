import React from 'react';
import PropTypes from 'prop-types';
import {fetchPopularRepos} from '../utils/api';
import { FaUser, FaStar, FaCodeBranch, FaExclamationTriangle } from 'react-icons/fa'

LanguagesNav.propTypes = {
    selectedLanguage : PropTypes.string.isRequired,
    onUpdateLanguage : PropTypes.func.isRequired
}

function LanguagesNav({selectedLanguage, onUpdateLanguage}) {

    const languages = ['All', 'Javascript', 'C#', 'Ruby', 'Java', 'Python']

    return(
        <ul className="flex-center">
            {
                languages.map((language) => {
                    return (
                            <li key={language}>
                                <button className="btn-clear nav-link" onClick={()=>{onUpdateLanguage(language)}}
                                style= {selectedLanguage === language ?  {color: 'red'}: null}>
                                    {language}
                                </button>
                            </li>
                    )
                })
            }
        </ul>
    )
}

function ReposGrid({repos}){
   
    return(
        <ul className="grid spacearound">
            {
                repos.map( (repo, index) => {
                    const {name, owner, html_url, stargazers_count, forks, open_issues} = repo;
                    const {login, avatar_url} = owner;

                    return(
                        <li key={html_url} >
                            <Card
                                header={`#${index + 1}`}
                                avatar={avatar_url}
                                href={html_url}
                                name={login}
                                >
                                <ul className='card-list'>
                                    <li>
                                        <FaUser color='rgb(255, 191, 116)' size={22} />
                                        <a href={`https://github.com/${login}`}>
                                        {login}
                                        </a>
                                    </li>
                                    <li>
                                        <FaStar color='rgb(255, 215, 0)' size={22} />
                                        {stargazers_count.toLocaleString()} stars
                                    </li>
                                    <li>
                                        <FaCodeBranch color='rgb(129, 195, 245)' size={22} />
                                        {forks.toLocaleString()} forks
                                    </li>
                                    <li>
                                        <FaExclamationTriangle color='rgb(241, 138, 147)' size={22} />
                                        {open_issues.toLocaleString()} open
                                    </li>
                                </ul>
                            </Card>
                        </li>
                    )
                })
            }
        </ul>
    )
}

class Popular extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            selectedLanguage : 'All',
            error: null,
            repos: {}
        }
        
    }

    componentDidMount(){
        this.updateLanguage(this.state.selectedLanguage);
    }

    isLoading = () => {
        const {selectedLanguage,repos,error} = this.state;
        return error === null && !repos[selectedLanguage];
    }

    updateLanguage = (selectedLanguage) => {
        console.log(selectedLanguage);
        console.log(this.state.repos[selectedLanguage]);
        
        this.setState({
            selectedLanguage,
            error: null,
          })
      
        if (!this.state.repos[selectedLanguage]) {
            fetchPopularRepos(selectedLanguage)
              .then((data) => {
                this.setState(({ repos }) => ({
                  repos: {
                    ...repos,
                    [selectedLanguage]: data
                  }
                }))
              })
            .catch( (error) => {
                console.log(error);
                
                this.setState(()=>{
                    return {
                        error
                    }
                })
                }
            )
        }
    }
    render(){
        const {repos, selectedLanguage} = this.state;
        return(
            <>
                <LanguagesNav 
                selectedLanguage={this.state.selectedLanguage} 
                onUpdateLanguage = {this.updateLanguage} />

                {this.isLoading() && <p>Loading ...</p>}
                
                {this.state.error && <p>error</p>}

                {repos[selectedLanguage] && <ReposGrid repos={repos[selectedLanguage]} />}
            </>
        )
    }

}

export default Popular;
import React from 'react'
import PropTypes from 'prop-types'

function Card({header, subHeader, avatar, href, name, children}) {
    console.log('dfjh');
    
    return (
        <div className="card bg-light">
            <h4 className="header-lg center-text">
                {header}
            </h4>
            <img 
                className="avatar"  
                src={avatar} 
                alt={`avatar for ${name}`}/>
            <h2 className="center-text">
                <a className="link" href={href}>
                    {name}
                </a>
            </h2>
            {subHeader && (<h4 className='center-text'>
                Score: {winner.score.toLocaleString()}
            </h4>)}
            {children}
        </div>
    )
}

Card.propTypes = {
    header: PropTypes.string.isRequired,
    subheader: PropTypes.string,
    avatar: PropTypes.string.isRequired,
    href: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }

export default Card

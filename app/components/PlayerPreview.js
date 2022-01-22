import React from 'react'
import { FaTimesCircle } from 'react-icons/fa'

const PlayerPreview = ({userName, onReset, label}) => {

    return (
        <div className="column player">
            <h3 className="player-label">{label}</h3>
            <div className="row bg-light">
                <div className="player-info">
                    <img className="avatar-small"
                        src={`https://github.com/${userName}.png?size=200`}
                        alt={`avatar for ${userName}`}/>
                    <a className="link"
                        href={`https://github.com/${userName}`}>
                        {userName}
                    </a>
                    <button className="btn-clear flex-center" onClick={onReset}>
                        <FaTimesCircle size={26} color='green'/>
                    </button>
                </div>
            </div>
        </div>
    )
}
export default PlayerPreview;
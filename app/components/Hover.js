import React, { Component } from 'react'
import PropTypes from 'prop-types'

export class Hover extends Component {
    constructor(props){
        super(props);
        this.state={
            hovering: false
        }
    }
    onMouseOver = () => {
        this.setState(
            {
                hovering: true
            }
        )
    }

    onMouseOut = () => {
        this.setState(
            {
                hovering: false
            }
        )
    }

    render() {
        return (
            <div onMouseOver={this.onMouseOver} onMouseOut={this.onMouseOut}>
                {this.props.children(this.state.hovering)}
            </div>
        )
    }
}

Hover.propTypes = {
    hovering: PropTypes.bool.isRequired
}

export default Hover

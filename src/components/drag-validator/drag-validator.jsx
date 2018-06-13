import React, { Component } from 'react';

import './drag-validator.less';


export default class DragValidator extends Component {

    constructor (props) {
        super(props);
        this.state = {
            StartPointX: null,
            EndPointX: null,
            StyleWidth: '0px'
        }
    }

    handleTouchStart (e) {
        this.setState({
            StartPointX: e.changedTouches[0].clientX
        });
    }

    handleTouchEnd (e) {
        this.setState({
            EndPointX: e.changedTouches[0].clientX
        }, () => {
            this.handleChangeWidth();
        });
        console.log(this.slider);
    }

    handleChangeWidth () {
        this.setState({
            StyleWidth: this.state.EndPointX - this.state.StartPointX + 'px'
        });
    }

    render () {
        return (
            <div className="Validator">
                <div className="validatorBlock">
                    <div className="validatorProcess" style={{width: this.state.StyleWidth}}></div>
                    <div className="validatorSlider" ref={slider => this.slider = slider}
                        onTouchStart={this.handleTouchStart.bind(this)}
                        onTouchMove={this.handleTouchEnd.bind(this)}
                    >
                        ->
                    </div>
                </div>
            </div>
        );
    }

}

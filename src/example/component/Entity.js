import React from "react";

export default class Entity extends React.Component {
    constructor(props) {
        super(props);

        this.className = "entity";
        this.state = {};
    }

    render() {
        var pos = this.state.pos;
        var style = {};
        
        if ( pos ) {

        }

        return React.DOM.div(
            {
                className: this.className,
                style: style
            }
        );
    }
}
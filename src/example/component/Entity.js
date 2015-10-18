import React from "react";

export default class Entity extends React.Component {
    constructor(props) {
        super(props);

        this.className = "entity";
    }

    render() {
        var pos = this.props.pos;

        return React.DOM.div(
            {
                className: this.className,
                style: {
                    left: pos.x + "px",
                    top: pos.y + "px"
                }
            }
        );
    }
}
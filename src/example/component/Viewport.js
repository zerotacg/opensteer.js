import React from "react";

export default class Viewport extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        var children = this.props.children;
        var props = this.createProps();

        return React.DOM.div(props, children);
    }

    createProps() {
        var size = this.props.size;

        return {
            className: "viewport",
            style: {
                width: size.width,
                height: size.height
            }
        };
    }
}

Viewport.propTypes = {
    size: React.PropTypes.shape({
        width: React.PropTypes.number,
        height: React.PropTypes.number
    })
};

Viewport.defaultProps = {
    size: {
        width: 640,
        height: 480
    }
};

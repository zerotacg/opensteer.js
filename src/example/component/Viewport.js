import React from "react";

export default class Viewport extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        var size = this.props.size;

        return React.DOM.div(
            {
                className: "viewport",
                style: {
                    width: size.width,
                    height: size.height
                }
            }
        );
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

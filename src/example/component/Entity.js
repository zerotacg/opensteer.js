import React from "react";
import Rx from "rx";

export default class Entity extends React.Component {
    constructor( props ) {
        super(props);

        this.className = "entity";
        this.state = {};
        this.subscription = null;
    }

    componentWillMount() {
        var position = this.props.position;
        this.subscription = position.subscribeOnNext(this.setPosition, this);
    }

    setPosition( position ) {
        this.setState({ position: position });
    }

    componentWillUnmount() {
        this.subscription.dispose();
        this.subscription = null;
    }

    componentWillReceiveProps( nextProps ) {
        this.componentWillUnmount();
        this.props = nextProps;
        this.componentWillMount();
    }

    render() {
        var position = this.state.position;
        var style = {};

        if ( position ) {
            style.left = position.x;
            style.top = position.y;
        }

        return React.DOM.div({
            className: this.className,
            style: style
        });
    }
}

Entity.propTypes = {
    position: React.PropTypes.instanceOf(Rx.Observable)
};

Entity.defaultProps = {
    position: Rx.Observable.empty()
};

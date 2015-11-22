import ReactDOM from "react/lib/ReactDOM";
import React from "react";

import Viewport from "example/component/Viewport";
import Factory from "example/physic/Factory";

export default class Example {
    constructor() {
        this.viewPort = this.createViewport();
        this.factory = new Factory();
    }

    createViewport() {
        var body = document.body;
        var div = document.createElement("div");
        body.appendChild(div);

        return div;
    }

    main() {
        this.render();
    }

    render() {
        var viewport = this.renderViewport();
        ReactDOM.render(viewport, this.viewPort);
    }

    renderViewport() {
        var props = {};
        var children = this.renderChildren();
        return React.createElement(Viewport, props, children);
    }

    renderChildren() {
        return [];
    }
}
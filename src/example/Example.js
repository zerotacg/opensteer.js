import ReactDOM from "react/lib/ReactDOM";
import React from "react";

import Viewport from "example/component/Viewport";
import Factory from "example/physic/Factory";

export default class Example {
    constructor() {
        this.renderTarget = this.createRenderTarget();
        this.factory = new Factory();
    }

    createRenderTarget() {
        var body = document.body;
        var div = document.createElement("div");
        body.appendChild(div);

        return div;
    }

    reset() {
        this.render();
    }

    main() {
        this.render();
    }

    render() {
        var viewport = this.createViewport();
        ReactDOM.render(viewport, this.renderTarget);
    }

    createViewport() {
        var props = {};
        var children = this.createChildren();
        return React.createElement(Viewport, props, children);
    }

    createChildren() {
        return [];
    }
}
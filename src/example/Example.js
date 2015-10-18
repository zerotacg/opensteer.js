import ReactDOM from "react/lib/ReactDOM";
import React from "react";

export default class Example {
    constructor() {
        this.renderTarget = this.createRenderTarget();
        this.viewport = {};
    }

    createRenderTarget() {
        var body = document.body;
        var div = document.createElement("div");
        body.appendChild(div);

        return div;
    }

    main() {
        this.render();
    }

    render() {
        var viewport = React.DOM.div(this.viewport, this.children);
        ReactDOM.render(viewport, this.renderTarget);
    }
}
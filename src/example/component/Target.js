import Entity from "example/component/Entity";

export default class Target extends Entity {
    constructor(props) {
        super(props);

        this.className += " target";
    }
}
import Entity from "example/component/Entity";

export default class Vehicle extends Entity {
    constructor(props) {
        super(props);

        this.className += " vehicle";
    }
}
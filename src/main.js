import Engine from "./engine";

const engine = new Engine()

document.addEventListener('DOMContentLoaded', () => {
    engine.init(document.getElementById('canvas'))
})

import { getCanvas } from "./kontra.mjs"

const canvas = getCanvas()

const resize = () => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
}

window.onload = resize
window.onresize = resize
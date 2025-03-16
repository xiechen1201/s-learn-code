export default class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    static distance = distance;
}

export function distance(p1, p2) {
    return Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2);
}

export { Point as 'module.exports' } 
class Point {
    constructor(x, y) {
        this.x = +x
        this.y = +y
        this.coordinates = [+x, +y]
    }

    equals(other) {
        return (this.x == other.x) && (this.y == other.y)
    }

    toString() {
        return `(${this.x}, ${this.y})`
    }

    distance_to(other_point){
        return Math.sqrt(Math.pow(this.x - other_point.x, 2) +  Math.pow(this.y - other_point.y, 2))
    }
}

class Circle{
    constructor(point_1, point_2) {
        this.center_point = point_1;
        this.radius = Math.round(point_1.distance_to(point_2))
    }
}
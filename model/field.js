class Field {
    constructor(height, width) {
        this.change_size(height, width)

        this.clear()
    }

    change_size(height, width) {
        this.height = height
        this.width = width
        this.decomposed_field = null
    }

    clear(){
        this.robot = null
        this.places = []
        this.barriers = []

        this.decomposed_field = null
    }

    is_decomposed() {
        return this.decomposed_field != null
    }

    place_robot(x, y) {
        let point = new Point(x, y)
        if (this.point_is_free(point)) {
            this.robot = new Point(x, y)
            return true
        }
        return false
    }

    add_barrier(point_1, point_2) {
        let barrier = new Circle(point_1, point_2)
        this.barriers.push(barrier)
        this.decomposed_field = null
    }

    add_place(x, y) {
        let new_place = new Point(x, y)
        if (this.point_is_free(new_place)) {
            this.places.push(new_place)
            return true
        }
        return false
    }

    is_valid_point(point) {
        return (point.x >= 0) && (point.x < this.width) && (point.y >= 0) && (point.y < this.height)
    }

    point_is_free(point) {
        if (!this.is_valid_point(point)) {
            return false
        }

        for (let item of this.barriers) {
            if (point.distance_to(item.center_point) <= item.radius) {
                return false
            }
        }
        return true
    }

    decompose(cell_width, cell_height, use_all_algorithm = false) {
        let decomposed_field = new DecomposedField(this, cell_width, cell_height, use_all_algorithm)

        if (decomposed_field.composing_error_message) {
            return decomposed_field.composing_error_message
        }

        this.decomposed_field = decomposed_field
        return null
    }


}


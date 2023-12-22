class FieldView {
    constructor(canvas_id, field) {
        let canvas = document.getElementById(canvas_id)
        this.context = canvas.getContext('2d')
        this.field = field
    }

    resize_canvas() {
        this.context.canvas.width = this.field.width
        this.context.canvas.height = this.field.height
    }

    draw_barriers() {
        for (let item of this.field.barriers) {
            this.draw_circle(item)
        }
    }

    draw_robot() {
        if (this.field.robot != null) {
            this.draw_point(this.field.robot, this.get_point_radius(), "black", "red")

        }
    }

    draw_places() {
        for (let item of this.field.places) {
            this.draw_place(item, 1)
        }
    }

    draw_new_places() {
        let decomposed_field = this.field.decomposed_field;

        if (!field.is_decomposed()) return

        let cell_width = this.field.decomposed_field.cell_width
        let cell_height = this.field.decomposed_field.cell_height

        let radius = Math.max(Math.min(cell_height, cell_width) / 2, this.get_point_radius())

        this.context.fillStyle = "rgb(243,10,10, 1)";
        for (let place of decomposed_field.places) {
            let new_point = new Point(place.x * cell_width + (cell_width / 2), place.y * cell_height + (cell_height / 2))
            this.draw_point(new_point, radius, "", "yellow", 0)
        }

        if (decomposed_field.robot != null) {
            const [x, y] = decomposed_field.robot.coordinates
            let new_point = new Point(x * cell_width + (cell_width / 2), y * cell_height + (cell_height / 2))
            this.draw_point(new_point, radius, "", "red", 0)
        }
    }

    draw_grid_and_areas(show_grid = true, show_areas = true) {
        if (!show_areas && !show_grid) return

        let decomposed_field = this.field.decomposed_field

        let cell_width = decomposed_field.cell_width
        let cell_height = decomposed_field.cell_height

        this.context.lineWidth = 2;
        this.context.strokeStyle = "rgba(0,21,255,0.3)";

        for (let row_id = 0; row_id < decomposed_field.rows; row_id++) {
            for (let col_id = 0; col_id < decomposed_field.cols; col_id++) {

                this.context.beginPath()

                if (show_areas) {
                    if (decomposed_field.field[row_id][col_id]) {
                        this.context.fillStyle = "rgba(255,0,35,0.2)";

                    } else {
                        this.context.fillStyle = "rgba(0,255,60,0.2)";
                    }
                }

                this.context.rect(col_id * cell_width, row_id * cell_height, cell_width, cell_height)
                if (show_grid) this.context.stroke()
                if (show_areas) this.context.fill()

                this.context.closePath()
            }
        }
    }

    draw_grid(cell_height, cell_width) {
        let number_of_cols = Math.floor(this.field.width / cell_width)
        let number_of_rows = Math.floor(this.field.height / cell_height)

        this.context.lineWidth = 2;
        this.context.strokeStyle = "rgba(0,21,255,0.3)";

        for (let row_id = 0; row_id < number_of_rows; row_id++) {
            for (let col_id = 0; col_id < number_of_cols; col_id++) {
                this.context.beginPath()
                this.context.rect(col_id * cell_width, row_id * cell_height, cell_width, cell_height)
                this.context.stroke()
                this.context.closePath()
            }
        }
    }

    draw_path(path) {
        let cell_width = this.field.decomposed_field.cell_width
        let cell_height = this.field.decomposed_field.cell_height

        this.context.beginPath()
        this.context.strokeStyle = "rgb(243,10,10, 0.5)";

        for (let i = 0; i < path.length - 1; i++) {
            this.context.moveTo(path[i].x * cell_width + (cell_width / 2), path[i].y * cell_height + (cell_height / 2))
            this.context.lineTo(path[i + 1].x * cell_width + (cell_width / 2), path[i + 1].y * cell_height + (cell_height / 2))
            this.context.stroke()

        }
        this.context.closePath()
    }

    draw_place(place, is_last_place = false) {
        let arc_color = "yellow"
        if (is_last_place) {
            arc_color = "darkgoldenrod"
        }
        this.draw_point(place, this.get_point_radius(), arc_color, "yellow")

    }

    draw_point(point, radius, arc_color, fill_color, line_width = 10) {
        this.context.beginPath()
        this.context.lineWidth = line_width
        if (radius > 0 && radius < 10) {
            this.context.lineWidth = 1
        }
        this.context.arc(point.x, point.y, radius, 0, 6.28)
        if (line_width > 0) {
            this.context.strokeStyle = arc_color
            this.context.stroke()
        }
        this.context.fillStyle = fill_color
        this.context.fill()
        this.context.closePath()
    }

    draw_circle(circle) {
        this.draw_point(circle.center_point, circle.radius, "black", "black", 0)
    }


    get_point_radius(k = 1) {
        return view.field.height * 0.005 * k
    }

}

state = {

}

function setup() {
    const w = 750;
    const h = 750;
    createCanvas(w, h)

    frameRate(60)
    angleMode(DEGREES)

    // Assuming you have an array of points

    const n = 50

    state.polygonColors = []
    state.points = []
    while (state.points.length < n) {
        const p = {
            pos: createVector(random(0, w), random(0, h)),
            vel: createVector(0, 1).rotate(random(0, 360))
        }
        state.points.push(p)
    }

}

function renderVoronoi() {
    const delaunay = d3.Delaunay.from(state.points.map(p => [p.pos.x, p.pos.y]));
    const voronoi = delaunay.voronoi([0, 0, width, height]); // Bounds of the Voronoi diagram
    strokeWeight(1)
    let i = 0
    for (const polygon of voronoi.cellPolygons()) {
        beginShape();

        if (state.polygonColors[i] == undefined) {
            state.polygonColors.push([random(50, 255), random(50, 255), random(50, 255)])
        }

        fill(state.polygonColors[i][0], state.polygonColors[i][1], state.polygonColors[i][2])

        for (let i = 0; i < polygon.length; i++) {
            vertex(polygon[i][0], polygon[i][1]);
        }
        endShape(CLOSE);

        i++
    }
}

function updatePoints() {
    const center = createVector(250, 250)
    for (let i = 0; i < state.points.length; i++) {
        const p = state.points[i]

        p.pos.add(p.vel)

        // p.pos = p.pos.copy().sub(center).rotate(1).add(center)

        if (p.pos.x > width) {
            p.pos.x = 0
        }

        if (p.pos.x < 0) {
            p.pos.x = width
        }

        if (p.pos.y > height) {
            p.pos.y = 0
        }

        if (p.pos.y < 0) {
            p.pos.y = height
        }
    }
}

function draw() {
    background(120, 120, 120)
    renderVoronoi()
    updatePoints()
}
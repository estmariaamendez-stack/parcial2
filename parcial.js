const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const WIDTH = canvas.width;
const HEIGHT = canvas.height;

const centerX = WIDTH / 2;
const centerY = HEIGHT / 2;

let time = 0;

const R = 200;
const N = 6;

/** PIXEL */
function plotPixel(x, y, color = "white") {
    ctx.fillStyle = color;
    ctx.fillRect(Math.floor(x), Math.floor(y), 1, 1);
}

/** PUNTO MEDIO (CÍRCULO) */
function drawCircleMidpoint(r) {
    let x = 0;
    let y = r;
    let p = 1 - r;

    function drawSym(cx, cy, x, y) {
        plotPixel(cx + x, cy + y, "#444");
        plotPixel(cx - x, cy + y, "#444");
        plotPixel(cx + x, cy - y, "#444");
        plotPixel(cx - x, cy - y, "#444");
        plotPixel(cx + y, cy + x, "#444");
        plotPixel(cx - y, cy + x, "#444");
        plotPixel(cx + y, cy - x, "#444");
        plotPixel(cx - y, cy - x, "#444");
    }

    while (x <= y) {
        drawSym(centerX, centerY, x, y);

        x++;

        if (p < 0) {
            p += 2 * x + 1;
        } else {
            y--;
            p += 2 * (x - y) + 1;
        }
    }
}

/** POSICIONES */
function getPoints(r, n, offset) {
    let arr = [];

    for (let i = 0; i < n; i++) {
        let a = (2 * Math.PI * i) / n + offset;

        arr.push({
            x: centerX + r * Math.cos(a),
            y: centerY + r * Math.sin(a)
        });
    }

    return arr;
}

/** LÍNEA */
function drawLine(x0, y0, x1, y1) {
    let dx = Math.abs(x1 - x0);
    let dy = Math.abs(y1 - y0);

    let sx = x0 < x1 ? 1 : -1;
    let sy = y0 < y1 ? 1 : -1;

    let err = dx - dy;

    while (true) {
        plotPixel(x0, y0, "white");

        if (x0 === x1 && y0 === y1) break;

        let e2 = 2 * err;

        if (e2 > -dy) {
            err -= dy;
            x0 += sx;
        }

        if (e2 < dx) {
            err += dx;
            y0 += sy;
        }
    }
}

/** POLÍGONO */
function drawPolygon(points) {
    for (let i = 0; i < points.length; i++) {
        let j = (i + 1) % points.length;

        drawLine(
            points[i].x, points[i].y,
            points[j].x, points[j].y
        );
    }
}

/** ORBITA */
function drawOrbit() {
    const points = getPoints(R, N, time);

    for (let p of points) {
        plotPixel(p.x, p.y, "red");
    }

    drawPolygon(points);
}

/** LOOP */
function render() {
    ctx.clearRect(0, 0, WIDTH, HEIGHT);

    drawCircleMidpoint(R);
    drawOrbit();

    time += 0.02;

    requestAnimationFrame(render);
}
/**EVIDENCIA DE CHAT PARA CONSULTA 
 *  https://chatgpt.com/c/69ebb65e-f30c-83e9-8700-879e2f8f45f6 
 * https://chatgpt.com/c/69ebb65e-f30c-83e9-8700-879e2f8f45f6
 * https://chatgpt.com/c/69ebaf19-9158-83e9-9d1f-f3575ca35446
 * https://chatgpt.com/c/69ebaa17-c3d0-83e9-b792-a9abf54b7c1f
*/

render();

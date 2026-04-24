/**
 * Parcial 2 - Sistema de Dispersión Geométrica Orbital
 * Computación Gráfica
 * Universidad Militar Nueva Granada
 * Estudiante: Maria Alejandra Mendez Roncancio
 */

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// dimensiones
const WIDTH = canvas.width;
const HEIGHT = canvas.height;

// centro (SOLO UNO, BIEN DEFINIDO)
const centerX = WIDTH / 2;
const centerY = HEIGHT / 2;

// tiempo animación
let time = 0;

/** pixel base */
function plotPixel(x, y, color = "#d6159c") {
    ctx.fillStyle = color;
    ctx.fillRect(Math.floor(x), Math.floor(y), 1, 1);
}

// parámetros
const R = 200;
const N = Math.floor(Math.random() * 7) + 4;

/** =========================
 * 🔥 PUNTO MEDIO (CÍRCULO)
 * ========================= */
function drawCircleMidpoint(r) {
    let x = 0;
    let y = r;
    let p = 1 - r;

    function plotSymmetric(cx, cy, x, y) {
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
        plotSymmetric(centerX, centerY, x, y);

        x++;

        if (p < 0) {
            p += 2 * x + 1;
        } else {
            y--;
            p += 2 * (x - y) + 1;
        }
    }
}

/** posiciones orbitales */
function getOrbitalPositions(r, n, offset) {
    let positions = [];

    for (let i = 0; i < n; i++) {
        let angle = (2 * Math.PI * i) / n + offset;

        let x = centerX + r * Math.cos(angle);
        let y = centerY + r * Math.sin(angle);

        positions.push({ x, y });
    }

    return positions;
}

/** línea (Bresenham) */
function drawLine(x0, y0, x1, y1, color = "white") {
    let dx = Math.abs(x1 - x0);
    let dy = Math.abs(y1 - y0);

    let sx = (x0 < x1) ? 1 : -1;
    let sy = (y0 < y1) ? 1 : -1;

    let err = dx - dy;

    while (true) {
        plotPixel(x0, y0, color);

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

/** polígono */
function drawPolygon(points) {
    for (let i = 0; i < points.length; i++) {
        let next = (i + 1) % points.length;

        drawLine(
            points[i].x, points[i].y,
            points[next].x, points[next].y,
            "white"
        );
    }
}

/** sistema orbital */
function drawOrbit() {
    const points = getOrbitalPositions(R, N, time);

    for (let p of points) {
        plotPixel(p.x, p.y, "red");
    }

    drawPolygon(points);
}

/** render */
function render() {
    ctx.clearRect(0, 0, WIDTH, HEIGHT);

    drawCircleMidpoint(R);
    drawOrbit();

    time += 0.02;

    requestAnimationFrame(render);
}

render();

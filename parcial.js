/**
 * Parcial 2 - Sistema de Dispersión Geométrica Orbital
 * Computación Gráfica
 *  Universidad Militar Nueva Granada - Ingenieria Multimedia 
 * Asignatura: Introducción a la Computación Gráfica
 * Estudiante: Maria Alejandra Mendez Roncancio 

 */

/**se crea el canvas*/
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Dimensiones
const WIDTH = canvas.width;
const HEIGHT = canvas.height;

// Centro del canvas (base del sistema orbital)
const CX = WIDTH / 2;
const CY = HEIGHT / 2;

/**se crea la unica funcion permitida para dibujar un pixel */
function plotPixel(x, y, color = "#d6159c") {
    ctx.fillStyle = color;
    ctx.fillRect(Math.floor(x), Math.floor(y), 1, 1);
}

/**valores aleatorios de N*/
const R = 200; // radio órbita
const N = Math.floor(Math.random() * 7) + 4; // 4 a 10 polígonos

/** =========================
 * una guia geometrica
 * CÍRCULO GUÍA (NUEVO)
 * *@param {number} r - Radio de la órbita
 * ========================= */
function drawCircleGuide(r) {
    let steps = 360;

    for (let i = 0; i < steps; i++) {
        let angle = (i * Math.PI * 2) / steps;

        let x = centerX + r * Math.cos(angle);
        let y = centerY + r * Math.sin(angle);

        plotPixel(x, y, "#444444"); // gris guía
    }
}

const centerX = canvas.width / 2;
const centerY = canvas.height / 2;

/**
POSICIONES ORBITALES segun trigonometria
*@param {number} r - Radio de la órbita
 * @param {number} n - Cantidad de polígonos
 * return retorna la posicon de el punto
*/

function getOrbitalPositions(r, n) {
    let positions = [];

    for (let i = 0; i < n; i++) {
        let angle = (2 * Math.PI * i) / n;

        let x = centerX + r * Math.cos(angle);
        let y = centerY + r * Math.sin(angle);

        positions.push({ x, y });
    }

    return positions;
}

/** =========================
 *  de manera manual ,RASTERIZACIÓN DE LÍNEAS (BRESENHAM SIMPLIFICADO)
 * ========================= */
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

/** =========================
 * DIBUJAR POLÍGONO ORBITAL
 * ========================= */
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

// -----------------------------
// DIBUJAR ORBITE (puntos)
// -----------------------------
function drawOrbit() {
    const points = getOrbitalPositions(R, N);

    for (let p of points) {
        plotPixel(p.x, p.y, "red");
    }
    drawPolygon(points);// se conecta con la fncion de dibujar poligonos
}

/**se incia el funcionamiento */
function inicializar() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawCircleGuide(R);
    drawOrbit();
}
inicializar();

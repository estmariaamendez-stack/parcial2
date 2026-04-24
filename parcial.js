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

const centerX = canvas.width / 2;
const centerY = canvas.height / 2;

/**
POSICIONES ORBITALES
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

// -----------------------------
// DIBUJAR ORBITE (puntos)
// -----------------------------
function drawOrbit() {
    const points = getOrbitalPositions(R, N);

    for (let p of points) {
        plotPixel(ctx, p.x, p.y, "red");
    }
}

/**se incia el funcionamiento */
function inicializar() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawOrbit();
}

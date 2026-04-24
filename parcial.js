/**
 * Parcial 2 - Sistema de Dispersión Geométrica Orbital
 * Computación Gráfica
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

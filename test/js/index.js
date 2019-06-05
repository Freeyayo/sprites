const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

c.beginPath();
c.moveTo(300,300);
c.lineTo(330,330);
c.stroke();
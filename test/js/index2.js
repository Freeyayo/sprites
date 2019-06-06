const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const scale = .2;
const offsetleft2 = 100;
const offsetleft3 = 200;
const offsetleft4 = 300;

let DirX = 0,DirY = 0;
let Speed = 5;
let lLeg = 25,rLeg = 0;
let mouse = 0;
let isrLegUp = true;
let isBoxShow = 0;

createGirl()

function createGirl(){
	requestAnimationFrame(createGirl);
	c.fillStyle = `rgba(255,255,255,.35)`;
	c.fillRect(0,0,canvas.width,canvas.height);
	defaultBoy(DirX,DirY,Speed,"what's your name");
}

function defaultBoy(dirx,diry,speed,txt){
	c.fillStyle = "#f6e1c3";	//face
	c.fillRect(200*scale+dirx*speed,200*scale+diry*speed,100*scale,100*scale);

							//hair
	c.fillStyle = "#ffeb3b";
	c.fillRect(200*scale+dirx*speed,170*scale+diry*speed,100*scale,30*scale);
	c.fillRect(180*scale+dirx*speed,200*scale+diry*speed,30*scale,80*scale);
	c.fillRect(290*scale+dirx*speed,200*scale+diry*speed,30*scale,80*scale);
							//brows
	c.fillStyle = "black";
	c.fillRect(215*scale+dirx*speed,220*scale+diry*speed,20*scale,5*scale);
	c.fillRect(265*scale+dirx*speed,220*scale+diry*speed,20*scale,5*scale);
							//eyes
	c.fillRect(220*scale+dirx*speed,230*scale+diry*speed,10*scale,10*scale);
	c.fillRect(270*scale+dirx*speed,230*scale+diry*speed,10*scale,10*scale);
							//mouse
	c.fillRect(235*scale+dirx*speed,270*scale+diry*speed,30*scale,(5+mouse)*scale);
							//body
	c.fillStyle = "pink";
	c.fillRect(200*scale+dirx*speed,300*scale+diry*speed,100*scale,100*scale);
							//arms
	c.fillStyle = "#f6e1c3";	
	c.fillRect(180*scale+dirx*speed,300*scale+diry*speed,20*scale,100*scale);
	c.fillRect(300*scale+dirx*speed,300*scale+diry*speed,20*scale,100*scale);
							//legs
	c.fillRect(210*scale+dirx*speed,400*scale+diry*speed,30*scale,(50-lLeg)*scale);
	c.fillRect(260*scale+dirx*speed,400*scale+diry*speed,30*scale,(50-rLeg)*scale);
							//box
	strokeRoundRect(c, 360*scale+dirx*speed, -100*scale+diry*speed, 600*scale, 150*scale, 30*scale);
							//text
	let text = txt;
	c.font="13px Georgia";
	c.fillStyle = `rgba(0,0,0,${isBoxShow})`;
	c.fillText(text,400*scale+dirx*speed, 0*scale+diry*speed);
	//console.log(c.measureText(text))	//104-best	r: 600/104 lenOfBox = textLength * r 

}

window.addEventListener("keydown", event => {
	let e = event || window.event;
	if(e.keyCode === 87 || e.keyCode === 65 || e.keyCode === 83 || e.keyCode === 68 ){
		isrLegUp = !isrLegUp;
	}
	if (isrLegUp) {
		lLeg = 25;
		rLeg = 0;
	}else{
		lLeg = 0;
		rLeg = 25;
	}

	switch (e.keyCode){
		case 87:     //up
			DirY += -1;
			break;
		case 65:    //left
			DirX += -1;
			break;
		case 83:    //down
			DirY += 1;
			break;
		case 68:    //right
			DirX += 1;
			break;
		case 32:    //speak
			isBoxShow = 1;
			if(mouseTimer)return;
			var mouseTimer = setInterval(() => {
				mouse = mouse===15?mouse=0:mouse=15;
			},100);
			setTimeout(() => {
				isBoxShow = 0;
				clearTimeout(mouseTimer);
			},2000)
			break;
		default:
			return false;
	}
})

window.addEventListener("keyup", () => {
	rLeg = 0;
	lLeg = 0;
},false)


function fillRoundRect(cxt, x, y, width, height, radius, /*optional*/ fillColor) {
        //圆的直径必然要小于矩形的宽高          
        if (2 * radius > width || 2 * radius > height) { return false; }
 
        cxt.save();
        cxt.translate(x, y);
        //绘制圆角矩形的各个边  
        drawRoundRectPath(cxt, width, height, radius);
        cxt.fillStyle = fillColor || `white`; //若是给定了值就用给定的值否则给予默认值  
        cxt.fill();
        cxt.restore();
    }
 
 
    /**该方法用来绘制圆角矩形 
     *@param cxt:canvas的上下文环境 
     *@param x:左上角x轴坐标 
     *@param y:左上角y轴坐标 
     *@param width:矩形的宽度 
     *@param height:矩形的高度 
     *@param radius:圆的半径 
     *@param lineWidth:线条粗细 
     *@param strokeColor:线条颜色 
     **/
    function strokeRoundRect(cxt, x, y, width, height, radius, /*optional*/ lineWidth, /*optional*/ strokeColor) {
        //圆的直径必然要小于矩形的宽高          
        if (2 * radius > width || 2 * radius > height) { return false; }
 
        cxt.save();
        cxt.translate(x, y);
        //绘制圆角矩形的各个边  
        drawRoundRectPath(cxt, width, height, radius);
        cxt.lineWidth = lineWidth || 2; //若是给定了值就用给定的值否则给予默认值2  
        cxt.strokeStyle = strokeColor || `rgba(100,110,110,${isBoxShow})`;
        cxt.stroke();
        cxt.restore();
    }
 
    function drawRoundRectPath(cxt, width, height, radius) {
        cxt.beginPath(0);
        //从右下角顺时针绘制，弧度从0到1/2PI  
        cxt.arc(width - radius, height - radius, radius, 0, Math.PI / 2);
 
        //矩形下边线  
        cxt.lineTo(radius, height);
 
        //左下角圆弧，弧度从1/2PI到PI  
        cxt.arc(radius, height - radius, radius, Math.PI / 2, Math.PI);
 
        //矩形左边线  
        cxt.lineTo(0, radius);
 
        //左上角圆弧，弧度从PI到3/2PI  
        cxt.arc(radius, radius, radius, Math.PI, Math.PI * 3 / 2);
 
        //上边线  
        cxt.lineTo(width - radius, 0);
 
        //右上角圆弧  
        cxt.arc(width - radius, radius, radius, Math.PI * 3 / 2, Math.PI * 2);
 
        //右边线  
        cxt.lineTo(width, height - radius);
        cxt.closePath();
    }
 











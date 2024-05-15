//top elemts
const colorPicker = document.getElementById("colorPicker");
const canvasColor = document.getElementById("canvaColor");
const fontPicker = document.getElementById("fontPicker");
//canvas
const canvas = document.getElementById("myCanvas");
//buttons
const clearButton = document.getElementById("clearButton");
const saveButton = document.getElementById("saveButton");
const retrieveButton = document.getElementById("retrieveButton")

const ctx = canvas.getContext('2d')

colorPicker.addEventListener('change',(e) => {
    ctx.strokeStyle = e.target.value;
    ctx.fillStyle = e.target.value;
})

//canvas 
canvas.addEventListener('mousedown',(e) => {
    isDrawing = true;
    lastX = e.offsetX;
    lastY = e.offsetY;
})

canvas.addEventListener('mousemove', (e) =>{
    if(isDrawing){
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();

        lastX = e.offsetX;
        lastY = e.offsetY;
    }
})

canvas.addEventListener('mouseup',() =>{
    isDrawing = false;
})

//background color
canvasColor.addEventListener('change', (e) =>{
    ctx.fillStyle = e.target.value;
    ctx.fillRect(0,0,600,350);
})

//font Size
fontPicker.addEventListener('change',(e) =>{
    ctx.lineWidth = e.target.value;    
})

//clear Button
clearButton.addEventListener('click',() =>{
    ctx.clearRect(0,0,canvas.width,canvas.height);
})

//save button
saveButton.addEventListener('click',() =>{
    //data will save to local sotage
    localStorage.setItem('canvasContents',canvas.toDataURL());

    let link = document.createElement('a');
    // a = anchor tag, my-canvas.png will be name of image which we download
    link.download = 'my-canvas.png';
    link.href = canvas.toDataURL();
    link.click();
})

//retrieve button
retrieveButton.addEventListener('click', ()=>{
    //retrieve the image which we have saved in local storage.
    let savedCanvas = localStorage.getItem('canvasContents');

    if(savedCanvas){
        let img = new Image();
        //taking image through url
        img.src = savedCanvas;
        ctx.drawImage(img,0,0);
    }
})


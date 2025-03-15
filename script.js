
const canvas = document.getElementById("canvas")
const ctx = canvas.getContext('2d')
canvas.width = 801
canvas.height = 501

let score = 0
let gameFrame = 0
ctx.font = '50px Georgia'

let canvasPosition = canvas.getBoundingClientRect()

const mouse = {
    x: canvas.width / 2,
    y: canvas.height /2,
    is_clicked: false
}

canvas.addEventListener('mousedown', function(event) {
    mouse.x = event.x - canvasPosition.left
    mouse.y = event.y - canvasPosition.top
    mouse.is_clicked = true
})

canvas.addEventListener('mouseup', function(event) {
    is_clicked = false
})

const fishSwimLeft = new Image()
fishSwimLeft.src = "fish_swim_left.png"
const fishSwimRight = new Image()
fishSwimRight.src = "fish_swim_right.png"

class Player {
    constructor() {
        this.x = canvas.width / 2
        this.y = canvas.height / 2
        this.radius = 50
        this.angle = 0
        this.frameX = 0
        this.frameY = 0
        this.frame = 0
        this.spriteWidth = 498
        this.spriteHeight = 327
    }

    update(){
        const dx = this.x - mouse.x
        const dy = this.y - mouse.y

        if (mouse.x != this.x) {
            this.x -= dx / 30 
        }

        if (mouse.y != this.y) {
            this.y -= dy / 30
        }
    }

    draw() {
        if (mouse.is_clicked) {
            ctx.lineWidth = 0.2
            ctx.beginPath()
            ctx.moveTo(this.x, this.y)
            ctx.lineTo(mouse.x, mouse.y)
            ctx.stroke()
        }

        ctx.fillStyle = 'red'
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        ctx.fill()
        ctx.closePath()
        ctx.fillRect(this.x, this.y, this.radius, 10)
    }
}

const bubbles = []

const bubbleSound = document.createElement('audio')
bubbleSound.src = "sound1.wav"
const bubblePopSound = document.createElement('audio')
bubblePopSound.src = "sound2.ogg"

class Bubble {
    constructor() {
        this.x = Math.random() * canvas.width
        this.y = canvas.height + Math.random() * canvas.height
        this.radius = 50
        this.speed = Math.random() * 5 + 1
        this.distance
        this.touched = false
        this.sound = Math.random() <= 0.5 ? bubbleSound : bubblePopSound
    }

    update() {
        this.y -= this.speed
        const dx = this.x - player.x
        const dy = this.y - player.y
        this.distance = Math.sqrt(dx * dx + dy * dy)
    }

    draw() {
        ctx.fillStyle = 'blue'
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        ctx.fill()
        ctx.closePath()
        ctx.stroke()
    }
}



function updateBubbles() {
    if(gameFrame % 50 == 0) {
        bubbles.push(new Bubble())    
    }

    for(i = 0; i< bubbles.length; i++) {        
        bubbles[i].update()
        bubbles[i].draw()

        if (bubbles[i].distance < bubbles[i].radius + player.radius) {
            bubbles[i].sound.play()
            score ++
            bubbles.splice(i, 1)

        }
    }

    for(i = 0; i< bubbles.length; i++) {      
        if (bubbles[i].y < - canvas.height) {
            bubbles.splice(i, 1)
        }
    }

    console.log(bubbles.length)
}

const player = new Player()


function animate() {
    gameFrame += 1
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    
    ctx.fillStyle = 'black'
    ctx.fillText('score: ' + score, 10, 50)
    player.update()
    player.draw()
    updateBubbles()
    requestAnimationFrame(animate)
}

animate()
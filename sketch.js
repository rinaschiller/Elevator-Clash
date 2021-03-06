var elevators = [];
var people = [];
//global floor variable
var floorY; 
var open;
var elevImg;
var lastOpen = 0;
var openInterval = 500;
var lastClose = 0;
var closeInterval = 400;

function setup() {
	createCanvas(windowWidth, windowHeight);
	background(255);
    floorY = height/3 *2; //floor variable
    elevators.push(new Elevator(width/3-100,floorY));
    elevators.push(new Elevator(width/2-100, floorY));
    elevators.push(new Elevator(width - width/3-100, floorY));
    people.push(new Person());
    elevImg = loadImage("assets/v.png")
}

function draw() {
	background(255);
    
    //floor for person to step on and elevators to sit on 
    fill(200,200)
    floorY = height/3 *2;
    strokeWeight(10)
    stroke(55)
    rect(0, floorY , width, height)


    //update elevators
    for(var i = 0; i < elevators.length; i++) {
        elevators[i].display();

        //open a new random elevator at every interval
        if(millis() > lastOpen + openInterval){
            lastOpen = millis();
            rElevator = int(random(0,3))
            elevators[rElevator].isOpen = true; 
            console.log(rElevator)        
        }   
            
        //if isOpen is true, open elevator 
        if (elevators[i].isOpen== true){
            elevators[i].open();
        }      

        //close elevator 
        //TODO : Need to figure out how to closeIntervale elevator after delay in time
        elevators[i].isOpen = false; 
    }

    //update person 
    for(var i=0;i<people.length; i++){
        people[i].display();
    }
}


//elevator object
function Elevator(x,y){
    rectMode(CORNERS)
    this.x1 = x;
    this.y1= y;
    this.xDistance = this.x1+200;
    this.yDistance = this.y1 - 350
    this.floorY = height/3 * 2;
    this.col = color(200);
    this.isOpen = false;
    this.display = function(){
        //drawing out the elevator
        fill(this.col)
        stroke(55);
        strokeWeight(10)
        rect(this.x1, this.y1,this.xDistance, this.yDistance)
        // this.isOpen = false;
        strokeWeight(7)
        line(this.x1+100, this.y1-350, this.x1+100, this.y1); 
     
    }   

    this.open = function(){
        // image of open elevator 
        this.isOpen = true;
        stroke(0);
        strokeWeight(1)
        fill(200)
        stroke(55);
        strokeWeight(10)
        rect(this.x1, this.y1,this.xDistance, this.yDistance)  
        image(elevImg,this.x1,this.y1-350);
    }
}

function mousePressed(){
    //update elevators

    for(var i = 0; i < elevators.length; i++) {
        //detect mouse click on elevator
        if (mouseX < elevators[i].xDistance && mouseX>elevators[i].x1 && mouseY>elevators[i].yDistance){
            console.log('here')
            //need to keep track of which elevator is open 
            elevators[i].isOpen = true;

        }
        
    }
}

//person object
function Person(){
    this.x = mouseX;
    this.y = height/3 * 2;
    this.headY = this.y;
    this.feetY = this.y+100;
    this.armsY = this.y +50;

    //drawing out person 
    this.display = function(){
        //body
        strokeWeight(4)
        stroke(55,0,0)
        line(mouseX ,this.feetY ,mouseX,this.headY)
        //feet
        line(mouseX, this.feetY, mouseX-20, this.feetY+20)
        line(mouseX, this.feetY, mouseX+20, this.feetY+20)
        //arms
        line(mouseX, this.armsY, mouseX+20, this.armsY -15)
        line(mouseX, this.armsY, mouseX-20, this.armsY -15)
        //head
        noStroke();
        fill(255,0,0)
        ellipse(mouseX, this.headY, 50)

    }
}


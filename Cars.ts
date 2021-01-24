 // Gib deinen Code hier ein

enum CarPosition {
    Left,
    Right
}

class Cars {
    public carSprite : Sprite;
    public speed : number;
    public cycle : number;
    public position: CarPosition;

    private mappingYtoStreetIndexArray :Sprite[] =[];
    private steeringSpeed = 80;
    private controllerTopOffset :number;

    constructor(streetListe: Sprite[], controllerTopOffset: number){
        this.controllerTopOffset = controllerTopOffset
        this.carSprite = sprites.create(img`
            . . . . . . 8 8 c c 8 8 . . . .
            . . . . . 8 6 6 6 6 6 6 8 . . .
            . . . . 6 c 6 6 6 6 6 6 c 6 . .
            . . . 8 6 c 9 6 6 6 6 6 c 6 8 .
            . . . f 6 6 9 6 6 6 6 6 c 6 f .
            . . . f 6 6 9 6 6 6 6 6 6 6 f .
            . . . f 6 6 9 6 6 6 6 6 6 6 f .
            . . . f 6 c 6 9 9 6 6 6 c 6 f .
            . . . 8 6 c 8 c c c c 8 c 6 8 .
            . . . 8 6 8 c b b b b c 8 6 8 .
            . . . 8 6 8 b b b b b b 8 6 8 .
            . . . 8 8 8 8 8 8 8 8 8 8 8 8 .
            . . . f 8 d 8 8 8 8 8 8 d 8 f .
            . . . f 8 6 d 8 8 8 8 d 6 8 f .
            . . . f f 8 8 8 8 8 8 8 8 f f .
            . . . . f f . . . . . . f f . .
        `, SpriteKind.Car)
        this.speed = 0
        this.cycle = 0

        

        for (const streetSprite of streetListe)
        {
            for (let index = Math.round(streetSprite.top);index <streetSprite.bottom;index++)
            {
                this.mappingYtoStreetIndexArray[index]=streetSprite
                console.log("index: "+ index.toString()+ " streetSprite:"+streetSprite.height.toString())
            }
        }

        this.position = CarPosition.Left
        this.carSprite.y = this.controllerTopOffset
        this.speed = -1

    }

    public updateInterval()
    {
        this.cycle +=1;
        if (this.cycle == 10)
        {
            this.cycle = 0;
            let temp = randint(0,100)
            if (temp>90)
            {
                this.speed = -10
            }
            else if (temp>30)
            {
                this.speed = 10
            }
            else
            {
                this.speed = 0
            }
        }
        
        

        if ((this.carSprite.y<this.controllerTopOffset) || (this.carSprite.y>scene.screenHeight()+10))
        {
            this.carSprite.y=this.controllerTopOffset
            this.speed = 15
        }
        this.carSprite.vy = this.speed

        console.logValue("speed", this.speed)
        let y = Math.round(this.carSprite.y)
        console.logValue("y", y)


        let streetSprite = this.mappingYtoStreetIndexArray[y]
        if (streetSprite!=null)
        {
            let targetPosition = streetSprite.left-20
            if (this.position == CarPosition.Left)
            {
                targetPosition = streetSprite.left+20
            }
            console.logValue("targetPosition", targetPosition)
            console.logValue("carSprite.x", this.carSprite.x)

            if (this.carSprite.x < targetPosition-5)
            {
                this.carSprite.vx = this.steeringSpeed 
            }
            else if (this.carSprite.x > targetPosition+5)
            {
                this.carSprite.vx= (-this.steeringSpeed)
            }
            else
            {
                this.carSprite.vx=0
            }
            
            console.logValue("carSprite.vx", this.carSprite.vx)


        }
        else
        {
            console.log("Null")
        }
    }


}
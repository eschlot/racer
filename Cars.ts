 // Gib deinen Code hier ein

enum CarPosition {
    Left,
    Right
}

class Cars {
    public carSprite : Sprite;
    public speed : number;
    public cycle : number;
    private offsetSpeed : number;
    public position: CarPosition;

    private mappingYtoStreetIndexArray :Sprite[] =[];
    private steeringSpeed = 100;
    private horizont :number;

    constructor(streetListe: Sprite[], horizont: number){
        this.horizont = horizont
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
        this.carSprite.bottom = this.horizont
        this.speed = -1

    }

    public updateInterval(inverseGameSpeed:number)
    {
        this.offsetSpeed=-3*((inverseGameSpeed-57)+2)

        //console.logValue("inverseGameSpeed", inverseGameSpeed)
        //console.logValue("offsetSpeed", this.offsetSpeed)
        this.speed = this.offsetSpeed

        //console.logValue("speed", this.speed)
        

        if ((this.carSprite.bottom<this.horizont) || (this.carSprite.bottom>scene.screenHeight()+11))
        {
            this.carSprite.bottom=this.horizont
            info.setScore(info.score()+400)
        }
        this.carSprite.vy = this.speed

        let y = Math.round(this.carSprite.bottom)
        //console.logValue("y", y)

        let streetSprite = this.mappingYtoStreetIndexArray[y]
        if (streetSprite!=null)
        {
            let targetPosition = streetSprite.left-20
            if (this.position == CarPosition.Left)
            {
                targetPosition = streetSprite.left+20
            }
            //console.logValue("targetPosition", targetPosition)
            //console.logValue("carSprite.x", this.carSprite.x)

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
        }
        else
        {
            console.logValue("Null: y", y)
        }
    }


}
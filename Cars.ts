 // Gib deinen Code hier ein

enum CarPosition {
    Left,
    Right
}

class Cars {
    public carSprite : Sprite;
    public speed :int32;
    private offsetSpeed : int32;
    public position: CarPosition;

    private mappingYtoStreetIndexArray :Sprite[] =[];
    private steeringSpeed = 100;
    private horizont :number;

    constructor(streetListe: Sprite[], horizont: number, intialPosition:number, intialCarPosition:CarPosition){
        this.horizont = horizont
        this.carSprite = sprites.create(img`
            . . . . 2 2 2 2 2 2 2 2 . . . .
            . . . f f 8 8 5 5 8 8 f f . . .
            . . . f f 8 5 8 8 5 8 f f . . .
            . . . f f 5 8 8 8 8 5 f f . . .
            . . . . . 5 8 6 6 8 5 . . . . .
            . . . . . 5 8 5 5 8 5 . . . . .
            . . . . . 8 8 5 5 8 8 . . . . .
            . . . . . 8 8 8 8 8 8 . . . . .
            . . . . 8 5 8 f f 8 5 8 . . . .
            . . f f 8 5 8 f f 8 5 8 f f . .
            . . f f 8 5 8 f f 8 5 8 f f . .
            . . f f 8 5 8 8 8 8 5 8 f f . .
            . . f f 8 5 2 2 2 2 5 8 f f . .
            . . . . . . f f f f . . . . . .
            . . 8 8 8 8 f f f f 8 8 8 8 . .
            . . 2 2 2 2 f f f f 2 2 2 2 . .
        `, SpriteKind.Car)
        this.speed = 0
        

        

        for (const streetSprite of streetListe)
        {
            for (let index = Math.round(streetSprite.top);index <streetSprite.bottom;index++)
            {
                this.mappingYtoStreetIndexArray[index]=streetSprite
                //console.log("index: "+ index.toString()+ " streetSprite:"+streetSprite.height.toString())
            }
        }

        this.position = intialCarPosition
        this.carSprite.bottom = intialPosition
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
            info.changeScoreBy(400)
            if (this.position == CarPosition.Left)
            { 
                this.position= CarPosition.Right
            }
            else
            {
                this.position= CarPosition.Left
            }
            let streetSprite = this.mappingYtoStreetIndexArray[this.carSprite.bottom]
            this.carSprite.x = streetSprite.left+20
        }
        this.carSprite.vy = this.speed

        let y = Math.round(this.carSprite.bottom)
        //console.logValue("y", y)

        let streetSprite = this.mappingYtoStreetIndexArray[y]
        if (streetSprite!=null)
        {
            let targetPosition:number;
            if (this.position == CarPosition.Left)
            {
                targetPosition = streetSprite.left+20
            }
            else
            {
                targetPosition = streetSprite.right-20
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
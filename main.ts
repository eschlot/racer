namespace SpriteKind {
    export const WandTeilLinks = SpriteKind.create()
    export const WandTeilRechts = SpriteKind.create()
    export const Street = SpriteKind.create()
    export const Car = SpriteKind.create()
}

// enum Color
enum Color {
    Transparent, // 0
    White, // 1 = RGB(255, 255, 255)
    Red, // 2 = RGB(255, 33, 33)
    Pink, // 3 = RGB(255, 147, 196)
    Orange, // 4 = RGB(255, 129, 53)
    Yellow, // 5 = RGB(255, 246, 9)
    Aqua, // 6 = RGB(36, 156, 163)
    BrightGreen, // 7 = RGB(120, 220, 82)
    Blue, // 8 = RGB(0, 63, 173)
    LightBlue, // 9 = RGB(135, 242, 255)
    Purple, // 10 = RGB(142, 46, 196)
    RoseBouquet, // 11 = RGB(164, 131, 159)
    Wine, // 12 = RGB(92, 64, 108)
    Bone, // 13 = RGB(229, 205, 196)
    Brown, // 14 = RGB(145, 70, 61)
    Black // 15 = RGB(0, 0, 0)
}

info.onLifeZero(function() {
    controller.vibrate(0)   
    game.over(false)
})

sprites.onOverlap(SpriteKind.Player, SpriteKind.WandTeilLinks, function (sprite, otherSprite) {
    Rennauto.x += 10
    Rennauto.y += 10
    scene.cameraShake(4, 300)
    if (info.life()>0)
    {
        controller.vibrate(200)
    }
    info.changeLifeBy(-1)
})

sprites.onOverlap(SpriteKind.Player, SpriteKind.WandTeilRechts, function (sprite, otherSprite) {
    Rennauto.x += -10
    Rennauto.y += 10
    scene.cameraShake(4, 300)
    if (info.life()>0)
    {
        controller.vibrate(200)
    }
    info.changeLifeBy(-1)
})

let bumpOffset : int16 = 5

sprites.onOverlap(SpriteKind.Player, SpriteKind.Car, function(player: Sprite, carSprite: Sprite) {
    if (player.x<carSprite.x)
    {
        player.x-=bumpOffset
        carSprite.x+=bumpOffset
    }
    else
    {
        player.x+=bumpOffset
        carSprite.x-=bumpOffset
    }
    
    if (player.y<carSprite.y)
    {
        player.y-=bumpOffset
        carSprite.y+=bumpOffset
    }
    else
    {
        player.y+=bumpOffset
        carSprite.y-=bumpOffset
    }

    info.changeScoreBy(-10)
})

function calcLine (pos: number, linkeWandTeil: Sprite, rechteWandTeil: Sprite, streetSprite: Sprite) {
    streetSprite.x = pos
    linkeWandTeil.right = pos-streetOffset
    rechteWandTeil.left = pos+streetOffset
}

function calcWalls (offset: number) {
    for (let Index3 = AnzahlWandteile; Index3 >0 ; Index3--) {
            linkeWandTeil = linkeWandListe[Index3]
            rechteWandTeil = rechteWandListe[Index3]
            streetSprite = streetListe[Index3]

            linkeWandTeil.right = linkeWandListe[Index3-1].right
            rechteWandTeil.left = rechteWandListe[Index3-1].left
            streetSprite.x = streetListe[Index3-1].x
        }
    rechteWandTeil = rechteWandListe[0]
    linkeWandTeil = linkeWandListe[0]
    streetSprite = streetListe[0]

    streetOffset = (strassenbreite/2)
    pos = streetSprite.x + offset

    if ((pos > streetOffset) && (pos < scene.screenWidth()-streetOffset )) {
        calcLine(pos, linkeWandTeil, rechteWandTeil, streetSprite)
    }
}

let Rennauto: Sprite = null
let car1 : Cars = null
let car2 : Cars = null
let streetImage: Image = null
let tempLw: Image = null

let rechteWandTeil: Sprite = null
let linkeWandTeil: Sprite = null
let streetSprite: Sprite = null

let streetListe: Sprite[] = []
let linkeWandListe: Sprite[] = []
let rechteWandListe: Sprite[] = []

let startStrassenbreite: int16 = 70
let strassenbreite:int16 = startStrassenbreite

let scoreAddition : int16 = 0
let speed: int16 = 30
let controllerTopOffset : int16 = 80
let horizont : int16 =20
let kurve : int16 = 0


linkeWandListe = sprites.allOfKind(SpriteKind.WandTeilLinks)
rechteWandListe = sprites.allOfKind(SpriteKind.WandTeilRechts)
streetListe = sprites.allOfKind(SpriteKind.Street)

let AnzahlWandteile:int16 = 14
let hoehe : int16 = 1
let y : int16 = horizont

let pos :int32 = scene.screenWidth() /2
let streetOffset :int32 = strassenbreite/2

for (let Index = 0; Index <= AnzahlWandteile; Index++) {
    tempLw = image.create(scene.screenWidth(), hoehe)
    tempLw.fill(Color.BrightGreen)
    
    streetImage = image.create(startStrassenbreite, hoehe)
    streetImage.fill(Color.Bone)
    if (Index % 2 == 0) {
        streetImage.drawLine(startStrassenbreite / 2, 0, startStrassenbreite / 2, hoehe + 1, Color.White)
    }
    streetSprite = sprites.create(streetImage, SpriteKind.Street)
    streetListe.push(streetSprite)
    linkeWandTeil = sprites.create(tempLw, SpriteKind.WandTeilLinks)
    linkeWandListe.push(linkeWandTeil)
    rechteWandTeil = sprites.create(tempLw, SpriteKind.WandTeilRechts)
    rechteWandListe.push(rechteWandTeil)
    
    linkeWandTeil.y = y
    rechteWandTeil.y = y
    streetSprite.y = y
    calcLine(pos, linkeWandTeil, rechteWandTeil, streetSprite)

    y = y + hoehe
    hoehe += 1
}
Rennauto = sprites.create(img`
    . . . . . . e e c c e e . . . .
    . . . . . e 2 2 2 2 2 2 e . . .
    . . . . 2 c 2 2 2 2 2 2 c 2 . .
    . . . e 2 c 4 2 2 2 2 2 c 2 e .
    . . . f 2 2 4 2 2 2 2 2 c 2 f .
    . . . f 2 2 4 2 2 2 2 2 2 2 f .
    . . . f 2 2 4 2 2 2 2 2 2 2 f .
    . . . f 2 c 2 4 4 2 2 2 c 2 f .
    . . . e 2 c e c c c c e c 2 e .
    . . . e 2 e c b b b b c e 2 e .
    . . . e 2 e b b b b b b e 2 e .
    . . . e e e e e e e e e e e e .
    . . . f e d e e e e e e d e f .
    . . . f e 2 d e e e e d 2 e f .
    . . . f f e e e e e e e e f f .
    . . . . f f . . . . . . f f . .
`, SpriteKind.Player)
Rennauto.setFlag(SpriteFlag.StayInScreen, true)
Rennauto.y = 110
controller.moveSprite(Rennauto, 120, 40)
info.setLife(6)
car1 = new Cars(streetListe,horizont,horizont,CarPosition.Left)
car2 = new Cars(streetListe,horizont,horizont*4,CarPosition.Right)

scene.setBackgroundColor(Color.LightBlue)


game.onUpdateInterval(2500, function () {
    if (strassenbreite > 50) {
        strassenbreite = strassenbreite - 1
    }
})
forever(function () {
    if (controllerTopOffset > Rennauto.y) {
        Rennauto.y = controllerTopOffset
    }
    speed = Rennauto.y - controllerTopOffset + 25
    
    pause(speed)
    calcWalls(kurve)
    car1.updateInterval(speed)
    car2.updateInterval(speed)
})

game.onUpdateInterval(800, function () {
    kurve = Math.round((randint(0, 7)-3)*1.7)
    scoreAddition = scene.screenHeight() -  Rennauto.y
    info.changeScoreBy(scoreAddition)
})


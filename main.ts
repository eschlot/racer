namespace SpriteKind {
    export const WandTeilLinks = SpriteKind.create()
    export const WandTeilRechts = SpriteKind.create()
    export const Street = SpriteKind.create()
}

// Standard palette
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
}   // enum Color


sprites.onOverlap(SpriteKind.Player, SpriteKind.WandTeilLinks, function (sprite, otherSprite) {
    Rennauto.x += 10
    scene.cameraShake(4, 300)
    info.changeLifeBy(-1)
})

sprites.onOverlap(SpriteKind.Player, SpriteKind.WandTeilRechts, function (sprite, otherSprite) {
    Rennauto.x += -10
    scene.cameraShake(4, 300)
    info.changeLifeBy(-1)
})

function calcLine(newX: number, linkeWandTeil: Sprite, rechteWandTeil: Sprite, streetSprite: Sprite)
{
    let streetPos = newX + linkeWandTeil.width
    let posR =  streetPos + strassenbreite
    
    linkeWandTeil.x = newX
    rechteWandTeil.x = posR
    streetSprite.x = streetPos

    console.logValue("linkeWandTeil.x",linkeWandTeil.x)
    console.logValue("rechteWandTeil.x",rechteWandTeil.x)
    console.logValue("streetSprite.x",streetSprite.x)


}

function calcWalls (offset: number) {
    for (let Index3 = AnzahlWandteile; Index3 >0 ; Index3--) {
            linkeWandTeil = linkeWandListe[Index3]
            rechteWandTeil = rechteWandListe[Index3]
            streetSprite = streetListe[Index3]

            linkeWandTeil.x = linkeWandListe[Index3-1].x
            rechteWandTeil.x = rechteWandListe[Index3-1].x
            streetSprite.x = streetListe[Index3-1].x
        }

    rechteWandTeil = rechteWandListe[0]
    linkeWandTeil = linkeWandListe[0]
    streetSprite = streetListe[0]

    newX = linkeWandTeil.x + offset
    if (newX > 0 - linkeWandTeil.width + strassenbreite && 
        newX < linkeWandTeil.width - strassenbreite - strassenbreite) 
    {
        calcLine(newX,linkeWandTeil,rechteWandTeil,streetSprite)
    }
}


let scoreAddition = 0
let kurvenzufallszahl = 0
let kurve = 0
let updateExecutionCtr = 0
let posR = 0
let newX = 0
let posR2 = 0
let posL = 0
let streetSprite: Sprite = null
let streetImage: Image = null
let tempLw: Image = null
let Rennauto: Sprite = null

let startStrassenbreite = 90
let strassenbreite = startStrassenbreite
let rechteWandListe: Sprite[] = []
let linkeWandListe: Sprite[] = []
let linkeWandTeil: Sprite = null
let rechteWandTeil: Sprite = null
let speed = 5



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
Rennauto.y = 120
controller.moveSprite(Rennauto, 100, 20)
linkeWandListe = sprites.allOfKind(SpriteKind.WandTeilLinks)
rechteWandListe = sprites.allOfKind(SpriteKind.WandTeilRechts)
let streetListe = sprites.allOfKind(SpriteKind.Street)
let AnzahlWandteile = 12
let hoehe = 1
let y = 20
for (let Index = 0; Index <= AnzahlWandteile; Index++) {
    tempLw = image.create(scene.screenWidth(), hoehe+1)
    tempLw.fill(Color.BrightGreen)
    streetImage = image.create(startStrassenbreite, hoehe+1)
    streetImage.fill(Color.Black)
    if (Index % 2 == 0) {
        streetImage.drawLine(startStrassenbreite / 2, 0, startStrassenbreite / 2, hoehe + 1, Color.White)
    }

    streetSprite = sprites.create(streetImage, SpriteKind.Street)
    streetListe.push(streetSprite)
    linkeWandTeil = sprites.create(tempLw, SpriteKind.WandTeilLinks)
    linkeWandListe.push(linkeWandTeil)
    rechteWandTeil = sprites.create(tempLw, SpriteKind.WandTeilRechts)
    rechteWandListe.push(rechteWandTeil)

    calcLine(newX,linkeWandTeil,rechteWandTeil,streetSprite)

    linkeWandTeil.y=y
    rechteWandTeil.y=y
    streetSprite.y=y

    posL = -50
    calcLine(posL, linkeWandTeil, rechteWandTeil, streetSprite)
    y = y + hoehe
    hoehe += 1
}
info.setLife(6)
let controllerTopOffset = 90
game.onUpdateInterval(2500, function () {
    if (strassenbreite > 40) {
        strassenbreite = strassenbreite - 1
    }
})
game.onUpdateInterval(10, function () {
    speed = Math.floor((Rennauto.y - controllerTopOffset) / 10)
    if (speed < 0) {
        speed = 0
    }
    // console.logValue("speed", speed)
    // console.logValue("Rennauto.y",Rennauto.y)
    if (updateExecutionCtr >= speed) {
        updateExecutionCtr = 0
        if (1 == kurve) {
            calcWalls(3)
        } else {
            if (-1 == kurve) {
                calcWalls(-3)
            } else {
                calcWalls(0)
            }
        }
    } else {
        updateExecutionCtr += 1
    }
})
game.onUpdateInterval(500, function () {
    kurvenzufallszahl = randint(-1, 1)
    if (0.2 < kurvenzufallszahl) {
        kurve = 1
    } else {
        if (-0.2 > kurvenzufallszahl) {
            kurve = -1
        } else {
            kurve = 0
        }
    }
    scoreAddition = 10 - speed
    info.changeScoreBy(scoreAddition)
})

namespace SpriteKind {
    export const WandTeilLinks = SpriteKind.create()
    export const WandTeilRechts = SpriteKind.create()
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.WandTeilLinks, function (sprite, otherSprite) {
    Rennauto.x += 10
    info.changeLifeBy(-1)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.WandTeilRechts, function (sprite, otherSprite) {
    Rennauto.x += -10
    info.changeLifeBy(-1)
})
function calcWalls (offset: number) {
    for (let Index3 = AnzahlWandteile; Index3 >0 ; Index3--) {
            linkeWandTeil = linkeWandListe[Index3]
            rechteWandTeil = rechteWandListe[Index3]

            linkeWandTeil.x = linkeWandListe[Index3-1].x
            rechteWandTeil.x = rechteWandListe[Index3-1].x
        }
rechteWandTeil = rechteWandListe[0]
    linkeWandTeil = linkeWandListe[0]
    newX = linkeWandTeil.x + offset
    if (newX > 0 - linkeWandTeil.width + strassenbreite && newX < linkeWandTeil.width - strassenbreite - strassenbreite) {
        posR = newX + linkeWandTeil.width + strassenbreite
        linkeWandTeil.x = newX
        rechteWandTeil.x = posR
    }
}
let kurvenzufallszahl = 0
let kurve = 0
let speed = 5
let updateExecutionCtr = 0
let posR = 0
let newX = 0
let y = 0
let posR2 = 0
let posL = 0
let Rennauto: Sprite = null
let strassenbreite = 0
let rechteWandTeil: Sprite = null
let linkeWandTeil: Sprite = null
let linkeWandListe: Sprite[] = []
let rechteWandListe: Sprite[] = []
strassenbreite = 90
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
Rennauto.y=120
controller.moveSprite(Rennauto, 100, 100)
linkeWandListe = sprites.allOfKind(SpriteKind.WandTeilLinks)
rechteWandListe = sprites.allOfKind(SpriteKind.WandTeilRechts)
let AnzahlWandteile = 24
for (let Index = 0; Index <= AnzahlWandteile; Index++) {
    linkeWandTeil = sprites.create(img`
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        `, SpriteKind.WandTeilLinks)
    linkeWandListe.push(linkeWandTeil)
    rechteWandTeil = sprites.create(img`
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        `, SpriteKind.WandTeilRechts)
    rechteWandListe.push(rechteWandTeil)
    posL = -50
    posR2 = posL + linkeWandTeil.width + strassenbreite
    y = Index * 120 / AnzahlWandteile
    linkeWandTeil.setPosition(posL, y)
    rechteWandTeil.setPosition(posR2, y)
}
info.setLife(6)
game.onUpdateInterval(2500, function () {
    if (strassenbreite > 60) {
        strassenbreite = strassenbreite - 1
    }
    
})
let controllerTopOffset=90

game.onUpdateInterval(10, function () {

    speed=Math.floor(((Rennauto.y-controllerTopOffset)/10))
    if (speed<0)
    {
        speed=0
    }
//    console.logValue("speed", speed)
//    console.logValue("Rennauto.y",Rennauto.y)
    if (updateExecutionCtr >= speed) 
    {
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
    }
    else
    {
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

    
    let scoreAddition = (10-speed)
    info.changeScoreBy(scoreAddition)
})

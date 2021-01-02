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

    let newX= linkeWandTeil.x + offset

    if (newX > -linkeWandTeil.width+strassenbreite && newX <linkeWandTeil.width-strassenbreite-strassenbreite)
    {
        let posR = newX+linkeWandTeil.width+strassenbreite
        console.logValue("newX", newX)
        console.logValue("posR", posR)

        linkeWandTeil.x = newX
        rechteWandTeil.x = posR
    }
}


let updateExecutionCtr =0
let kurvenzufallszahl = 0
let kurve = 0
let strassenbreite = 70
let rechteWandListe: Sprite[] = []
let linkeWandListe: Sprite[] = []
let Rennauto: Sprite = null
let linkeWandTeil: Sprite = null
let rechteWandTeil: Sprite = null
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

    let posL = -50 
    let posR = posL+linkeWandTeil.width+strassenbreite
    let y = Index * 120 / AnzahlWandteile
    linkeWandTeil.setPosition(posL, y)
    rechteWandTeil.setPosition(posR, y)

}
info.setLife(6)


game.onUpdateInterval(10,function () {

    updateExecutionCtr++

    let speed = ((Rennauto.y-50)*3) / 120 
    if (updateExecutionCtr>=speed)
    {   
        updateExecutionCtr=0
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
})

game.onUpdateInterval(2500, function () {
    if (strassenbreite>60)
    {
        strassenbreite=strassenbreite-1
    }
    info.changeScoreBy(1)
})
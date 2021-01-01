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
let kurve = 0
let kurvenzuffallszahl = 0
let rechteWandTeil: Sprite = null
let linkeWandTeil: Sprite = null
let Rennauto: Sprite = null
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
let linkeWandListe = sprites.allOfKind(SpriteKind.WandTeilLinks)
let rechteWandListe = sprites.allOfKind(SpriteKind.WandTeilRechts)
controller.moveSprite(Rennauto, 100, 100)
let AnzahlWandteile = 8
for (let Index = 0; Index <= AnzahlWandteile; Index++) {
    linkeWandTeil = sprites.create(img`
        7777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777
        `, SpriteKind.WandTeilLinks)
    linkeWandListe.push(linkeWandTeil)
    linkeWandTeil.setPosition(0, 0 + Index * 16)
}
for (let Index = 0; Index <= AnzahlWandteile; Index++) {
    rechteWandTeil = sprites.create(img`
        7777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777
        `, SpriteKind.WandTeilRechts)
    rechteWandListe.push(rechteWandTeil)
    rechteWandTeil.setPosition(160, 0 + Index * 16)
}
info.setLife(6)
game.onUpdateInterval(1000, function () {
    kurvenzuffallszahl = randint(-1, 1)
    if (0.3 < kurvenzuffallszahl) {
        kurve = 1
    } else {
        if (-0.3 > kurvenzuffallszahl) {
            kurve = -1
        } else {
            kurve = 0
        }
    }
})
game.onUpdateInterval(100, function () {
    if (1 == kurve) {
        for (let Index = 0; Index <= AnzahlWandteile; Index++) {
            rechteWandTeil = rechteWandListe[Index]
            rechteWandTeil.x += 3
            linkeWandTeil = linkeWandListe[Index]
            linkeWandTeil.x += 3
        }
    } else {
        if (-1 == kurve) {
            for (let Index = 0; Index <= AnzahlWandteile; Index++) {
                rechteWandTeil = rechteWandListe[Index]
                rechteWandTeil.x += -3
                linkeWandTeil = linkeWandListe[Index]
                linkeWandTeil.x += -3
            }
        } else {
        	
        }
    }
})

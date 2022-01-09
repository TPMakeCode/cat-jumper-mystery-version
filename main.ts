namespace SpriteKind {
    export const coin = SpriteKind.create()
    export const badguy = SpriteKind.create()
    export const nemesis = SpriteKind.create()
    export const firey = SpriteKind.create()
    export const god = SpriteKind.create()
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile0`, function (sprite, location) {
    game.over(false, effects.melt)
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile1`, function (sprite, location) {
    current_level += 1
    startLevel()
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (paws.vy == 0) {
        paws.vy = -160
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.firey, function (sprite, otherSprite) {
    info.changeLifeBy(-2)
    otherSprite.destroy()
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.badguy, function (sprite, otherSprite) {
    otherSprite.destroy()
    if (paws.y < otherSprite.y) {
        info.changeScoreBy(3)
    } else {
        info.changeLifeBy(-1)
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.coin, function (sprite, otherSprite) {
    info.changeScoreBy(1)
    otherSprite.destroy()
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.nemesis, function (sprite, otherSprite) {
    otherSprite.destroy()
    realdetecbad = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . f f f . . . . . . . 
        . . . . . f 2 f 2 f . . . . . . 
        . . . . f f f f f f f . . . . . 
        . . . . . f a a a f . . . . . . 
        . . . . . f a a a f . . . . . . 
        . . . . . f a a a f . . . . . . 
        . . . . . f a a a f . . . . . . 
        . . . . f f . . . f f . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.badguy)
    animation.runImageAnimation(
    realdetecbad,
    [img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . f f f . . . . . . . 
        . . . . . f 2 f 2 f . . . . . . 
        . . . . f f f f f f f . . . . . 
        . . . . . f a a a f . . . . . . 
        . . . . . f a a a f . . . . . . 
        . . . . . f a a a f . . . . . . 
        . . . . . f a a a f . . . . . . 
        . . . . f f . . . f f . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `,img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . f f f . . . . . . . 
        . . . . . f 2 f 2 f . . . . . . 
        . . . . f f f f f f f . . . . . 
        . . . . . f a a a f . . . . . . 
        . . . . . f a a a f . . . . . . 
        . . . . . f a a a f . . . . . . 
        . . . . . f a a a f . . . . . . 
        . . . . . f . . . f . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `],
    100,
    true
    )
    realdetecbad.setPosition(paws.x + 80, paws.y - 80)
    realdetecbad.follow(paws, 100)
})
function startLevel () {
    if (current_level == 0) {
        tiles.setTilemap(tilemap`level1`)
    } else if (current_level == 1) {
        tiles.setTilemap(tilemap`level2`)
    } else if (current_level == 2) {
        tiles.setTilemap(tilemap`level3`)
    } else if (current_level == 3) {
        tiles.setTilemap(tilemap`level4`)
    } else if (current_level == 4) {
        tiles.setTilemap(tilemap`level5`)
    } else {
        game.over(true, effects.smiles)
    }
    tiles.placeOnRandomTile(paws, assets.tile`myTile5`)
    for (let value of tiles.getTilesByType(assets.tile`myTile5`)) {
        tiles.setTileAt(value, assets.tile`transparency16`)
    }
    scene.cameraFollowSprite(paws)
    info.setLife(5)
    for (let value of sprites.allOfKind(SpriteKind.badguy)) {
        value.destroy()
    }
    for (let value of sprites.allOfKind(SpriteKind.coin)) {
        value.destroy()
    }
    for (let value of sprites.allOfKind(SpriteKind.nemesis)) {
        value.destroy()
    }
    for (let value of tiles.getTilesByType(assets.tile`myTile2`)) {
        cion = sprites.create(img`
            . . b b b b . . 
            . b 5 5 5 5 b . 
            b 5 d 3 3 d 5 b 
            b 5 3 5 5 1 5 b 
            c 5 3 5 5 1 d c 
            c d d 1 1 d d c 
            . f d d d d f . 
            . . f f f f . . 
            `, SpriteKind.coin)
        animation.runImageAnimation(
        cion,
        [img`
            . . b b b b . . 
            . b 5 5 5 5 b . 
            b 5 d 3 3 d 5 b 
            b 5 3 5 5 1 5 b 
            c 5 3 5 5 1 d c 
            c d d 1 1 d d c 
            . f d d d d f . 
            . . f f f f . . 
            `,img`
            . . b b b . . . 
            . b 5 5 5 b . . 
            b 5 d 3 d 5 b . 
            b 5 3 5 1 5 b . 
            c 5 3 5 1 d c . 
            c 5 d 1 d d c . 
            . f d d d f . . 
            . . f f f . . . 
            `,img`
            . . . b b . . . 
            . . b 5 5 b . . 
            . b 5 d 1 5 b . 
            . b 5 3 1 5 b . 
            . c 5 3 1 d c . 
            . c 5 1 d d c . 
            . . f d d f . . 
            . . . f f . . . 
            `,img`
            . . . b b . . . 
            . . b 5 5 b . . 
            . . b 1 1 b . . 
            . . b 5 5 b . . 
            . . b d d b . . 
            . . c d d c . . 
            . . c 3 3 c . . 
            . . . f f . . . 
            `,img`
            . . . b b . . . 
            . . b 5 5 b . . 
            . b 5 1 d 5 b . 
            . b 5 1 3 5 b . 
            . c d 1 3 5 c . 
            . c d d 1 5 c . 
            . . f d d f . . 
            . . . f f . . . 
            `,img`
            . . . b b b . . 
            . . b 5 5 5 b . 
            . b 5 d 3 d 5 b 
            . b 5 1 5 3 5 b 
            . c d 1 5 3 5 c 
            . c d d 1 d 5 c 
            . . f d d d f . 
            . . . f f f . . 
            `],
        100,
        true
        )
        tiles.placeOnTile(cion, value)
        tiles.setTileAt(value, assets.tile`transparency16`)
    }
    for (let value of tiles.getTilesByType(assets.tile`myTile4`)) {
        baddetective = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . f f f f . . . . . . 
            . . . . . f f f f f f . . . . . 
            . . . f f f f f f f f f . . . . 
            . . . f f f f f f f f f . . . . 
            . . . . . . e 2 2 e . . . . . . 
            . . . . . 2 e e e e 2 . . . . . 
            . . . . . 2 2 e e 2 2 2 . . . . 
            . . . . 2 2 2 e e e 2 2 . . . . 
            . . . . 2 2 e e 2 e 2 2 2 . . . 
            . . . 2 2 e 2 2 2 2 e 2 2 2 . . 
            . . . 2 e 2 2 2 2 2 2 e e 2 2 . 
            . . . e e 2 2 2 2 2 2 2 e e 2 . 
            . . . . . . . . . . . . . e . . 
            `, SpriteKind.nemesis)
        tiles.placeOnTile(baddetective, value)
        tiles.setTileAt(value, assets.tile`transparency16`)
    }
    for (let value of tiles.getTilesByType(assets.tile`myTile8`)) {
        fireball = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . 2 2 . . . . . . . . 
            . . . . . 2 2 2 2 2 2 2 2 . . . 
            . . . 2 2 2 . . . 2 2 . 2 2 . . 
            . . 2 2 . 2 . 2 4 5 . 2 . 2 . . 
            . . 2 . 2 2 2 4 4 4 4 2 2 5 . . 
            . 2 2 a 2 5 5 4 4 4 2 . 2 5 . . 
            . 2 2 . 2 4 4 2 4 2 2 . 2 2 . . 
            . 2 2 . 4 4 a 2 4 . 1 . 2 . . . 
            . 2 2 2 4 4 2 4 . . 2 . 2 . . . 
            . 2 2 2 2 4 4 8 8 . 2 2 a . . . 
            . 2 . 2 . 2 8 8 . 2 2 . 2 . . . 
            . 2 2 . . . 2 8 8 2 . 2 . . . . 
            . 2 2 2 8 8 8 2 2 2 2 . . . . . 
            . . . . . . . . . . . . . . . . 
            `, SpriteKind.firey)
        tiles.placeOnTile(fireball, value)
        animation.runMovementAnimation(
        fireball,
        "c 0 -100 0 100 0 0 ",
        2000,
        true
        )
        tiles.setTileAt(value, assets.tile`transparency16`)
    }
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile11`, function (sprite, location) {
    tiles.placeOnRandomTile(sprite, assets.tile`myTile12`)
})
let fireball: Sprite = null
let baddetective: Sprite = null
let cion: Sprite = null
let realdetecbad: Sprite = null
let paws: Sprite = null
let current_level = 0
scene.setBackgroundColor(15)
scene.setBackgroundImage(img`
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffff5ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffff55ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffff5fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff5fffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff5ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff5fffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffff9fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff9ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffff9fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff9fffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffff9fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff9fffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffff9fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff9ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1fffffffffffddfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffdddfffffffffdddffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1dddfffffffffdddffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffdddddddffffffdddddfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffdddddddddfffffffffffffffffffffffffffdddddddffffffdddddffffffffffffffffffffffffffffffffffffffffffddddddddddfffffffffffff
    fffffffffffffffffffffffffffffffffffffffffdddddddddfffffffffffffffffffffffffffdddddddffffffdddddffffffffffffffffffffffffffffffffffffffffffddddddddddfffffffffffff
    fffffffffffffffffffdddfffffffffffffffffffd11ddddddfffffffffffffffffffffffffffd11ddddfffffdddddddffffffffffffffffffffddfffffffffffffffffffdd1d1dddddfffffffffffff
    ffffffffffffffffffdddddffffffffffffffffffddddddd1dfffffffffffffffffffffffffffdddddddfffffdddddddfffffffffffffffffffddddffffffffffffffffffdddddd11ddfffffffffffff
    fffffffffffffffffddddddffffffffffffffffffdddddddddffffffffffdffffffffdddddfffd1dddddfffffdddddddfffffffffffffffffddddddffffffffffffffffffddddddddddfffffffffffff
    fffffffffffffffffddd1dffffffdffffffffffffdddddddddfffffffffddffffffffdddddfffdddddddfffffdddddddfffffffffffffffffddd1dffffffddfffffffffffdddd1dddddffffffffddfff
    fffffffffffffffffddddddfffffdffffffffffffddddddd1dfffffffffddffffffffdddddfffdddddddfffffdddddddfffffffffffffffffddddddfffffddfffffffffffddddddd1ddffffffffddfff
    ffffffffdddffffffdd11dfffffdddfffffffffffdddddddddffddddddfddffffffffdddddfffdddddddfffffdddddddfffffffffddffffffddd1dfffffdddfffffffffffddddddddddfdddddddddfff
    dfddffffddddddddddd1dddfffdddddffffffffffddddddd1dffd11dddfddfffffffffdd1ddffdddddddfffddddddddddfddffffddddddddddddd1dffffddddffffffffffdddddd11ddfd11ddddddfff
    ddddfffffd1dd1dddddddddfffdddddffffffffffdddddddddffdddd1dfddffffffffddddddffdd1ddddfffdddddddddddddffffdd1ddd1ddddddddffffddddffffffffffddddddddddfdddd1ddddfff
    dd1dfffffddd1111dddddddfffdddddffffffffffdddddddddffdddd1ddddffffffffddddddffdddddddfffddddddddddd1dffffdddd1d11dddddddffffddddffffffffffddddddddddfdddd1ddddfff
    ddddffffddddddddddddddddffddddddffddfddfdddddddddddfd11ddddddffffffffddddddffdddddddfffdddddddddddddffffddddddddddddddddffddddddfffdffdddddddddddddfd11ddddddfff
    dd1dffffddddddddddddddddffddddddffdddddddddddddddddfdddddddddffdffdffddddddffdddddddfffddddddddddd1dffffddddddddddddddddffddddddfffddddddddddddddddfdddddddddfff
    dddddfdd1d1dddddddddddddffdddddddfdddd11ddddddddddddd11bbdddddddfdddffdd1ddffdddddddfffdddddddddddddddfddd1dddddddddddddffdddddddfffd11ddddddbddddddd11bbbdddfdd
    dddddfdddddddddddddddddddd1ddddddfdddddddddbbbdddddddddbbbddddddfdddfddddddffdddddddfffdddddddddddddddfddddddddddddddddddddddddddfddddddddddbbdddddddddbbbdddfdd
    dddddfdddddddddddddddddddddddddddfdddddddddbbbdddddddddbbbddddddddddddddddddddddddddfffdddddddddddddddfddddddddddddddddddddddddddfddddddddddbbdddddddddbbbdddddd
    dddddfdddddddddddddddddddddddddddfdddddddbbbbbbbddddddbbbbbdddddddddddddddddddddddddddfdddddddddddddddfddddddddddddddddddddddddddfd1ddddddbbbbbbbdddddbbbbbddddd
    dddddbbbbbbbbbdddddddddddddddddddfdddddddbbbbbbbddddddbbbbbdddddddddddddddddddddddddddfddddddddddddddbbbbbbbbbbddddddddddddddddddfddddddddbbbbbbbdddddbbbbbddddd
    dddddbbbbbbbbbdddddddddddddddddddfdddddddbbbbbbbddddddbbbbbdddddddddddddddddddddddddddfddddddddddddddbbbbbbbbbbddddddddddddddddddfddddddddbbbbbbbdddddbbbbbddddd
    dddddbddbbbbbbdddddddddddddddddddfdddddddbddbbbbdddddbbbbbbbdd111dddddddddddddddbbddddfddddddddddddddbbdbdbbbbbddddddddddddddddddfddddddddbbbbbbbddddbbbbbbbb11d
    dddddbbbbbbbdbdddddddddddddddddddfdddddddbbbbbbbdddddbbbbbbbddd11ddddddddddddddbbbbdddfddddddddddddddbbbbbbddbbddddddddddddddddddfddddddddbbbbbbbddddbbbbbbbbddd
    dddddbbbbbbbbbddddddddddbddddddddbbbbbdddbdbbbbbdddddbbbbbbbddddddddddd1dddddbbbbbbdddfddddddddddddddbbbbbbbbbbdddddddddddddddddddbbbbddddbbbdbbbddddbbbbbbbbddd
    dddddbbbbbbbbbdddddddddbbddddddddbbbbbdddbbbbbbbdddddbbbbbbbdd1ddddddddddddddbbbdbddddddbbdddddddddddbbbbdbbbbbddddddddbbdddddddddbbbbddddbbbdbbbddddbbbbbbbbd1d
    dddddbbbbbbbdbdddddddddbbddddddddbbbbbdddbbbbbbbdddddbbbbbbbdd111ddddddddddddbbbbbbdddddbbdddddddddddbbbbbbbdbbddddddddbbddddddddbbbbbbdddbbbbbbbddddbbbbbbbb11d
    dddddbbbbbbbbbddbbbbbbdbbddddddddbbbbbdddbbbbbbbdddddbbbbbbbdddddddddbb1dddddbbbdbdddddbbbdddddddddddbbbbbbbbbbdbbbbbbbbbddddddddbbbbbbdddbbbdbbbddddbbbbbbbbddd
    dddddbbbbbbbdbddbddbbbdbbdddddddddbbdbbddbbbbbbbdddbbbbbbbbbbdbbddddbbbbbbbbbbbbbdbddddbbbbddddddddddbbbbbbddbbdbddbbbbbbddddddddbbbbbbbddbbbbbbbddbbbbbbbbbbbbb
    dddddbbbbbbbbbddbbbbdbdbbddddddddbbbbbbddbbdbbbbdddbbbbbbbbbbbbbddddbbdbbbdbbbbbbbbddddbbbbddddddddddbbbbbbbbbbdbbbbdbbbbddddddddbbbbbbbddbbbbdbbddbbbbbbbbbbbbb
    dddddbbbbbbbbbddbbbbdbbbbddddddddbbbbbbddbbbbbbbdddbbbbbbbbbbbdbddddbbbbdbddbbbbbbbddddbbbbddddddddddbbbbbbbbbbdbbbbdbbbbddddddddbbbbbbbddbbbbbbbddbbbbbbbbbbbbb
    dbbdbbbbbbbbbbbdbddbbbbbbddddddddbbbbbbddbbbbbbbdddbbbbbbbbbbbbbddddbbbbbbbbbbbbbbbbddbbbbbbdddbddbbbbbbbbbbbbbdbddbbbbbbddddddddbbbbbbbddbbbbbbbddbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbdbbbbbbbbbddbddbddbbbbbbddbbbbbbbdddbbbbbbbbbbbdbddddbbbbbbbbbbbbbbbbddbbbbbbdddbbbbbbbbbbbbbbbbdbbbbbbbbbdddddbddbbbbbbbddbbbbbbbddbbbbbbbbbbbbb
    bbddbbbbbbbbbbbbbddddbbbbbbbdbbbddbbdbbddbbbbbbbdddbbbbbbbbbbbbbbbdbbbdbbbbbbbbbbbbbddbbbbbbbdddbddbbbbbbbbbbbbbbddbdbbbbdbbdbbbdbbbbbbbddbbbbbbbddbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbdbbbdbbbbbbddbbbbbbbdddbbbbbbbbbbbbbbbdbbbbbbbbbbbbbbbbbbbbbbbbbbdbbbbbbbbbbbbbbbbbbbbbbbbbbbdbbdbbbbbbbbbbbddbbbbdbbddbbbbbbbbbbbbb
    bbb8bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbdddbbbbbbbbbbbbbbbdbbbbbbbbbbbbbbbbbbbbbbbbbbdbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbddbbbbbbbbbbbbb
    bb8888888888bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbdbbbbbbbbbbbbbbbdbbbbbbbbbbbbbbbbbbbbbbbbbbdbdbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbdbbbbbbbbbbbbb
    bb88bbbb8bbb888bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbdbbbbbbbbbbbbbbbdbbbbbbbbbbbbbbbbbbbbbbbbbbdbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbdbbbbbbbbbbbbbbbbbbbdbbbbbbbbbbbbb
    bbb8bbbb8bbbbb8bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbdbbbbbbbbbbbbbbbdbbbbbbbbbbbbbbbbbbbbbbbbbbdbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbdbbbbbbbbbbbbb
    bbb8bbb88bbbbbb8bbbbbbbbbbdddbbbbbbbbbbbbbbbbbbbbbdbbbbbbbbbbbbbbbdbbbbbbbbbbbbbbbbbbbbbbbbbbdbbbbbbbbbbbbbbbbbbbbbbbbbbbddbdbdbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbb88bb88bbbbbb8bbbbbbbbbbbddbbbbbbbbbbbbbbbbbbbbbdbbbbbbbbbbbbbbbdbbbbbbbbbbbbbbbbbbbbbbbbbbdbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbdbdbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbb88b8b888bbbb8bbbbbbbbbbbbbbbbbbbdbbbbbbbbbbbbbbdbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbdbbbbdbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbb888b88bb88bb8bbbbbbbbbbdbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbdbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbb888bbbbbbb888bbbbbbbbbbdddbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbddbdbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbb888bbbbbbbbb8bbbbbbbbbbbbbbbbbbbdbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbb8bbbbbbbbbbb88fbbbbbbbbbbbbbbbbfbbbbbbbbbbbbbbbbbbbbbbfbbbbbbbbbbbbbbbbfbbbbbbbbbbbbbbbbbbbbbbfbbbbbbbbbbbbbbbbfbbbbbbbbbbbbbbbbbbbbbbfbbbbbbbbbbbbbbbbfbbbbb
    bbb8bb7bbb77bbb8bffbbbbfbbbfbbbbfbffbbbfbbbbbbfbbbffbbbbbffbbbbfbbbfbbbbfbffbbbfbbbbbbfbbbffbbbbbffbbbbfbbbfbbbbfbffbbbfbbbbbbfbbbffbbbbbffbbbbfbbbfbbbbfbffbbbf
    bbf8bb77b77bb7b8bffbbbffbbbffbbbfbbffbffbbfbbbffbffbbfbbbffbbbffbbbffbbbfbbffbffbbfbbbffbffbbfbbbffbbbffbbbffbbbfbbffbffbbfbbbffbffbbfbbbffbbbffbbbffbbbfbbffbff
    bbf8bb77b7788888bbffbffbbbbffbfbffbffffbbbffbbffbffbbffbbbffbffbbbbffbfbffbffffbbbffbbffbffbbffbbbffbffbbbbffbfbffbffffbbbffbbffbffbbffbbbffbffbbbbffbfbffbffffb
    fff88888888fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    `)
let good = sprites.create(img`
    ...............................................................
    ...............................................................
    ...............................................................
    ...............................................................
    .................a.............................................
    ................aa..................aa..........aa.............
    ...............aaaa......aaaa......aaaa........aaa.............
    ...............aaaa.....aaaaa.....aaaaa......aaaaa.............
    ..............aaaaaa..aaaaaaa....aaaaaa....aaaaaaa.............
    .............aaaaaaaaaaaaaaaaa..aaaaaaa...aaaaaaaaa............
    ............aaaaaaaaaaaaaaaaaaaaaaaaaaaa.aaaaaaaaaa............
    .............aaaa5555555555555555555aaaaaaaaaaaaaaa............
    .............aaaaaaaaaaa1111111111155555555aaaaaaa.............
    ..............aaaaaaaa11ccccccccccc11aaaaaaaaaaa...............
    ...............aaaaa11ccccccccccccccc11aaaaaa..................
    ................aaa1ccccccccccccccccccc1aaaa...................
    .................a1ccccccccccccccccccccc1a.....................
    .................1ccccccccccccccccccccccc1.....................
    .................1cccfccccccccccccccccccc1.....................
    ................1ccccfccccccccccccccccfccc1....................
    ................1cccccffcccccccccccccffccc1....................
    ...............1ccccccccfccccccccccccfccccc1...................
    ...............1cccccccccfccccccccccfcccccc1...................
    ...............1ccccccccccffccccccccfcccccc1...................
    ...............1ccccccccccccfccccccfccccccc1...................
    ...............1cccccccccccccfccccccccccccc1...................
    ...............1ccccccccccccccccccccccccccc1...................
    ...............1ccccccccccccccccccccccccccc1...................
    ...............1ccccccccccccccccccccccccccc1...................
    ...............1ccccccccccccccccccccccccccc1...................
    ...............1ccccccccccccccccccccccccccc1...................
    ...............1cccccccccccffcccccccccccccc1...................
    ................1cccccccccccffcccccccccccc1....................
    ................1ccccccccccccfffcccccccccc1....................
    .................1cccccccccccccfffccccccc1.....................
    .................1cccccccccccccccffcccccc1.....................
    ..................1ccccccccccccccccccccc1......................
    ...................1ccccccccccccccccccc1.......................
    ....................11ccccccccccccccc11........................
    ......................11ccccccccccc11..........................
    ........................11111111111............................
    ...............................................................
    .............111...............................................
    ............11111111111111.....................................
    ...........1..111111111111........11111111111111...............
    .................111111111........111111111111.................
    ..................11111111........1111111111...................
    ....................111111............1111.....................
    .......................111.....................................
    ...............................................................
    ...............................................................
    ...............................................................
    ...............................................................
    ...............................................................
    ...............................................................
    `, SpriteKind.god)
good.setPosition(134, 17)
story.spriteSayText(good, "detective kitty I god of detective spies , I want you to go to get the crown ")
scroller.scrollBackgroundWithCamera(scroller.CameraScrollMode.OnlyHorizontal)
current_level = 4
paws = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . f . . . 
    . . . . . . . . . . . . f f f . 
    . . . . . . . . . . . . f 5 f f 
    a f a f a f a f a f a f a f f f 
    . . . . f f f f f f f f f f . . 
    . . . . f a f a f a f a f . . . 
    . . . . f . f . . . f . f . . . 
    . . . . f . f . . . f . f . . . 
    `, SpriteKind.Player)
controller.moveSprite(paws, 100, 0)
paws.setFlag(SpriteFlag.BounceOnWall, false)
startLevel()
game.onUpdate(function () {
    paws.setImage(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . f . . . 
        . . . . . . . . . . . . f f f . 
        . . . . . . . . . . . . f 5 f f 
        a f a f a f a f a f a f a f f f 
        . . . . f f f f f f f f f f . . 
        . . . . f a f a f a f a f . . . 
        . . . . f . f . . . f . f . . . 
        . . . . f . f . . . f . f . . . 
        `)
    if (paws.vy < 0) {
        paws.setImage(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . f . . . . . 
            . . . . . . . . . . f f . . . . 
            . . . . . . . . . . f 5 . . . . 
            . . . . . . . . . . f f f f . . 
            . . . . . . . . . a f . . . . . 
            . . a a . . . . . a f . . . . . 
            . . a . . . . a f a f f f f f f 
            . . a . . . . a f a f . . . . . 
            . . . f f . f a f a f . . . . . 
            . . . . a f f a f a f f f f f f 
            . . . . . a f a f . a . . . . . 
            . . . . . . f . . . a . . . . . 
            . . . . . f f . . a a . . . . . 
            . . . f f f . . . a . . . . . . 
            . . . f . . . . a a . . . . . . 
            `)
    } else if (paws.vy > 0) {
        paws.setImage(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . f 
            . . . . . . . . . . . . . . f f 
            . . . . . . . . . . . . f f . . 
            . . f . . . . . f f . f f . . . 
            . . f f f . f f f f f . . . . . 
            . . . . f f f f f . . . . . . . 
            . . . . . . f f f . . . . . . . 
            . . . . . . f f f . . . . . . . 
            . . . . . . f f f . . . . . . . 
            . . f f f f f f f . . . . . . . 
            . . f . . . f f f f f . . . . . 
            . . . . . . f f f f . . . . . . 
            . . . . . . f 5 f . . . . . . . 
            . . . . . . f f f . . . . . . . 
            . . . . . . f f . . . . . . . . 
            `)
    } else if (paws.x % 2 == 0) {
        paws.setImage(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . f . . . 
            . . . . . . . . . . . . f f f . 
            . . . . . . . . . . . . f 5 f f 
            a f a f a f a f a f a f a f f f 
            . . . . f f f f f f f f f f . . 
            . . . . f f f a f a f f f . . . 
            . . . . f f . . . . . f f . . . 
            . . . . f f . . . . . f f . . . 
            `)
    } else {
    	
    }
    if ((paws.isHittingTile(CollisionDirection.Left) || paws.isHittingTile(CollisionDirection.Right)) && paws.vy >= 0) {
        paws.vy = 0
        paws.ay = 0
        paws.setImage(img`
            . . . . . . . . . . f f . . . . 
            . . . . . . . . . f f f . . . . 
            . . . . . . . . . f 5 f f . . . 
            . . . . . . . . f f f a f f f f 
            . . . . . . . . . . . f f a . . 
            . . . . . . . . . . . a f f f f 
            . . . . . . . . . . . f f a . . 
            . . . . . . . . . . . a f f . . 
            . . . . . . . . . . . f f a . . 
            . . . . . . . . . . . a f f f f 
            . . . . . . . . . . . f f a . . 
            . . . . . . . . . . . a f f f f 
            . . . . . . . . . . . f . . . . 
            . . . . . . . . . . . a . . . . 
            . . . . . . . . . . . f . . . . 
            . . . . . . . . . . . a . . . . 
            `)
    } else {
        paws.ay = 350
    }
    if (paws.vx < 0 || paws.isHittingTile(CollisionDirection.Left)) {
        paws.image.flipX()
        paws.setImage(paws.image)
    }
    if (paws.isHittingTile(CollisionDirection.Top) && paws.vy == 0) {
        paws.setImage(img`
            . . . . f . f . . . f . f . . . 
            . . . . f . f . . . f . f . . . 
            . . . . f a f a f a f a f . . . 
            . . . . f f f f f f f f f f . . 
            a f a f a f a f a f a f a f f f 
            . . . . . . . . . . . . f 5 f f 
            . . . . . . . . . . . . f f f . 
            . . . . . . . . . . . . f . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `)
        paws.ay = 0
        controller.moveSprite(paws, 100, 0)
    }
})

import test from 'ava'
import { Vector2 } from './vector.js'

test('Vector2 creation via initial x/y', t => {
    const v = new Vector2(1.234, 5.678)
    
    if (v.x === 1.234 && v.y === 5.678) {
        t.pass()
    }
})

test('Vector2 creation from existing Vector2', t => {
    const v = new Vector2(1.234, 5.678)
    const v2 = new Vector2(v)

    if (v2.x === 1.234 && v2.y === 5.678 && v !== v2) {
        t.pass()
    }
})

test('Vector2 add', t => {
    const v = new Vector2(5, 4)
    const v2 = new Vector2(1, 2)
    const v3 = v.add(v2)

    if (v3.x === 6 && v3.y == 6) {
        t.pass()
    }
})

test('Vector2 subtract', t => {
    const v = new Vector2(5, 4)
    const v2 = new Vector2(1, 2)
    const v3 = v.subtract(v2)

    if (v3.x === 4 && v3.y == 2) {
        t.pass()
    }
})

test('Vector2 not', t => {
    const v = new Vector2(1, 2)
    const iV = v.not

    if (iV.x == -1 && iV.y == -2 && v !== iV) {
        t.pass()
    }
})

test('Vector2 scale', t => {
    const v = new Vector2(2,3)
    const v2 = v.scale(2)

    if (v2.x == 4 && v2.y === 6 && v !== v2) {
        t.pass()
    }
})

test('Vector2 equals', t => {
    const v1 = new Vector2(1,2)
    const v2 = new Vector2(3,4)
    const v3 = new Vector2(1,2)

    if (!v1.equals(v2) && v1.equals(v3)) { 
        t.pass()
    }
})

test('Vector2 size', t => {
    const v = new Vector2(2, 4)
    
    if (v.size === Math.sqrt(20)) {
        t.pass()
    } 
})

test('Vector2 Normalize', t => {
    const v = new Vector2(4,4)
    v.normalize()

    if (v.x === 0.7071067811865475 && v.y === 0.7071067811865475) {
        t.pass()
    }
})

test('Vector2 Static Identity', t => {
    const v = Vector2.Identity()
    
    if (v.x === 0 && v.y === 0) {
        t.pass()
    }
})

test('Vector2 Static Normalize', t => {
    const v = new Vector2(4, 4)
    const nV = Vector2.Normalize(v)

    if (v !== nV && nV.x === 0.7071067811865475 && nV.y === 0.7071067811865475) {
        t.pass()
    }
})

test('Vector2 Static Min', t => {
    const v = new Vector2(1,2)
    const v2 = new Vector2(2,1)
    const v3 = Vector2.Min(v, v2)

    if (v3.x === 1 && v3.y === 1) {
        t.pass()
    }
})

test('Vector2 Static Max', t => {
    const v = new Vector2(1,2)
    const v2 = new Vector2(2,1)
    const v3 = Vector2.Max(v, v2)

    if (v3.x === 2 && v3.y === 2) {
        t.pass()
    }
})

test('Vector2 Static Transform', t => {
    
})

/*
test('', t => {

})
*/
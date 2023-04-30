import { test } from 'node:test'
import assert from 'node:assert'

import * as Spoons from '../spoons.js'

test('convert returns a string representation', () => {
  const result = Spoons.convert(1)
  assert.strictEqual(result, '1 tsp')
})

test('convert 1/2', () => {
  const result = Spoons.convert(0.5)
  assert.strictEqual(result, '½ tsp')
})

test('convert 4.5 to 1 tbsp, 1.5 tsp', () => {
  const result = Spoons.convert(4.875)
  assert.strictEqual(result, '1 tbsp, 1⅞ tsp')
})

test('convert 0 to 0 tsp', () => {
  const result = Spoons.convert(0)
  assert.strictEqual(result, '0 tsp')
})

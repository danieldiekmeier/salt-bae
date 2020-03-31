import test from 'ava'

import * as Spoons from '../spoons'

test('convert returns a string representation', t => {
  const result = Spoons.convert(1)
  t.is(result, '1 tsp')
})

test('convert 1/2', t => {
  const result = Spoons.convert(0.5)
  t.is(result, '½ tsp')
})

test('convert 4.5 to 1 tbsp, 1.5 tsp', t => {
  const result = Spoons.convert(4.875)
  t.is(result, '1 tbsp, 1⅞ tsp')
})

test('convert 0 to 0 tsp', t => {
  const result = Spoons.convert(0)
  t.is(result, '0 tsp')
})

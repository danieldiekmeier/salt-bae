const signs = [
  [0.125, '⅛'],
  [0.25, '¼'],
  [0.375, '⅜'],
  [0.5, '½'],
  [0.625, '⅝'],
  [0.75, '¾'],
  [0.875, '⅞'],
]

export function convert(amount, showUnit = true) {
  let result = []
  let remainingAmount = amount

  if (remainingAmount === 0) {
    return '0 tsp'
  }

  if (remainingAmount >= 3) {
    const [quotient, remainder] = integerDivision(amount, 3)
    remainingAmount = remainder
    result.push(`${quotient} tbsp`)
  }

  let teaSpoons = ''
  if (remainingAmount >= 1) {
    const fullTeaSpoons = Math.floor(remainingAmount)
    teaSpoons += fullTeaSpoons
    remainingAmount -= fullTeaSpoons
  }

  // remainingAmount is < 1 now
  const matchingSign = signs.find((sign) => sign[0] === remainingAmount)
  if (matchingSign) {
    teaSpoons += matchingSign[1]
  }

  if (teaSpoons.length) {
    if (showUnit) {
      result.push(`${teaSpoons} tsp`)
    } else {
      result.push(teaSpoons)
    }
  }

  return result.join(', ')
}

function integerDivision(x, y) {
  var quotient = Math.floor(x / y)
  var remainder = x % y
  return [quotient, remainder]
}

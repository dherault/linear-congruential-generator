function linaerCongruentialGenerator(a, c, m) {
  let x = Date.now()

  return () => {
    x = (a * x + c) % m

    return x / m
  }
}

function displayPoints(lcg, n = 12) {
  console.log('___')

  for (let i = 0; i < n; i++) {
    console.log(lcg())
  }
}

function pad(x, n) {
  let result = x.toString()

  for (let i = Math.log10(x); i < n; i++) {
    result = '0' + result
  }

  return result
}

function assertEquilibrium(lcg) {
  const data = {}
  const step = 100

  for (let i = 0; i < 100000; i++) {
    const point = lcg()
    const roundedPoint = Math.round(point * step) / step

    if (!data[roundedPoint]) data[roundedPoint] = 1
    else  data[roundedPoint]++
  }

  const line = []

  for (let k = 0; k < step; k++) {
    if (data[k / step]) line.push(data[k / step])
    else line.push(0)
  }

  console.log(line.map(x => pad(x, 3)).join('-'))
}

const randu = linaerCongruentialGenerator(65539, 0, 2 ** 31)

displayPoints(randu)
assertEquilibrium(randu)

const randomMicrosoftWindows = linaerCongruentialGenerator(214013, 2531011, 2 ** 16)

displayPoints(randomMicrosoftWindows)
assertEquilibrium(randomMicrosoftWindows)

const hooleCentralRandomizer = linaerCongruentialGenerator(9301, 49297, 233280)

displayPoints(hooleCentralRandomizer)
assertEquilibrium(hooleCentralRandomizer)

const randomCLibrary = linaerCongruentialGenerator(1103515245, 12345, 2 ** 16)

displayPoints(randomCLibrary)
assertEquilibrium(randomCLibrary)

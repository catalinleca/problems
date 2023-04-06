const conditions = new Map([
  [3, 'Fizz'],
  [5, 'Buzz'],
  [7, 'Pop'],
  [8, 'Whack'],
  [11, 'Zing'],
  [13, 'Chop']
])

function checkFizzBuzz(x) {
  let element = "";


  conditions.forEach((val, key) => {
    if (x % key === 0) {
      element += val;
    }
  })

  return element || x;
}

function fizzBuzz(n) {
    for (let i = 1; i <=n; i++) {
        const printVal = checkFizzBuzz(i)
        console.log(printVal)
    }
}

fizzBuzz(100)
console.log(checkFizzBuzz(120120))

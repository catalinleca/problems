const getMaxDifference = arr => {
  let currentMaxDif = arr[1] - arr[0];
  let min = arr[0];

  for (let i = 1; i < arr.length; i++) {
    const currentDif = arr[i] - min
    if(currentDif > currentMaxDif) {
      currentMaxDif = currentDif
    }

    if (arr[i] < min) {
      min = arr[i]
    }
  }

  return currentMaxDif;
}

console.log(
  getMaxDifference([7, 9, 5, 6, 3, 2])
)



/**
 * To be optimised
 */

function getArrSum(arr) {
  return arr.reduce((acc, cur) => acc + cur, 0)
}

function getEatenArray(arr, d) {
  const weightsArr = [...arr];
  for (let i = 0; i < d; i++) {
    const max = Math.max(...weightsArr)
    const leftAfterAte = Math.ceil(max/2)

    const maxIndex = weightsArr.indexOf(max);
    weightsArr[maxIndex] = leftAfterAte
  }

  return weightsArr;
}

function findMinWeight(weights, d) {
  const eatenArr = getEatenArray(weights, d);

  const sum = getArrSum(eatenArr);

  return sum
}

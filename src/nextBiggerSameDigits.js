const sortedDigits = n => {
  let arr = n.toString().split('');
  arr.sort((a, b) => b - a);
  return arr;
};

function nextBigger(n) {
  let arr = sortedDigits(n);
  let max = parseInt(arr.join(''), 10);

  for(let i = n + 1; i <= max; i++){
    const sortedNumbers = sortedDigits(i)

    // check if arrays are identical [3,2,1,0] and [3,2,2,0] -> false
    const containsAllNumbers = sortedNumbers.every((x, j) => x === arr[j])

    if(containsAllNumbers) {
      return i;
    }
  }

  return -1;
}

console.log(nextBigger(20753121))

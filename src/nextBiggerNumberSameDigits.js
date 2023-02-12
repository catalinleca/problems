const sortedDigits = n => {
  const arr = n.toString().split('');
  arr.sort((a, b) => b - a);
  return arr;
};

function nextBigger(n) {
  const arr = sortedDigits(n);
  const max = parseInt(arr.join(''), 10);

  for(let i = n + 1; i <= max; i++){
    const sortedNumbers = sortedDigits(i)
    const currentMax = parseInt(sortedNumbers.join(''), 10)

    // const containsAllNumbers = sortedNumbers.every((x, j) => x === arr[j])

    // if the same max can be formed -> they have the same digits
    if(currentMax === max) {
      return i;
    }
  }

  return -1;
}

console.log(nextBigger(20753121))


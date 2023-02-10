/**
 * Given two arrays a and b write a function comp(a, b) (orcompSame(a, b)) that checks whether the two arrays have the "same" elements, with the same multiplicities (the multiplicity of a member is the number of times it appears). "Same" means, here, that the elements in b are the elements in a squared, regardless of the order.
 */

let a1 = [121, 144, 19, 161, 19, 144, 19, 11]; // [2, 2, 3]
let a2 = [11*11, 121*121, 144*144, 19*19, 161*161, 19*19, 144*144, 19*19]; // [4, 9, 9]

// ugly
function comp(array1, array2){
  if (!array1 || !array2) {
    return false;
  }

  const map = {};
  let k = true;

  array1.forEach( item => {
    if (!map.hasOwnProperty(item)) {
      map[item] = 1;
    } else {
      map[item] = map[item] + 1
    }
  })

  for (let x of array2) {
    const sqrtVal = Math.sqrt(x);
    if (!Number.isInteger(sqrtVal)) {
      k = false;
      break
    }
    if (!map.hasOwnProperty(sqrtVal.toString())) {
      k = false;
      break
    }

    map[sqrtVal] = map[sqrtVal] - 1
  }

  return !Object.values(map).some( x => x !== 0 )
}

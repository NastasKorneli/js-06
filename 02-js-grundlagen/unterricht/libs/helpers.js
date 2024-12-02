// Helper Funktion - times aus Class
const times = (n, fn) => {
  const results = Array(n).fill(0); // => [0, 0, 0]
  results.forEach((x, i, r) => (r[i] = fn(i))); // => ['*','*','*' ]
  return results;
};

// Helper range aus Class
const rangeFromStartToEnd = (start, end, step = 1) => {
  const length = Math.max(Math.ceil((end - start) / step), 0);
  const results = Array(length).fill(0);
  results.forEach((x, i, r) => (r[i] = start + i * step));
  return results;
};

const range = (startOrEnd, end, step) =>
  end ? rangeFromStartToEnd(startOrEnd, end, step) : rangeFromStartToEnd(0, startOrEnd);

// times von lodash baseTimes wird in lodash über die _.times() - Funktion referenziert
// function baseTimes(n, iteratee) {
//   var index = -1,
//     result = Array(n);

//   while (++index < n) {
//     result[index] = iteratee(index);
//   }
//   return result;
// }

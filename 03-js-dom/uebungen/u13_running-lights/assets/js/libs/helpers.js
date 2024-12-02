// Helper DOM Selektion mit $ & $$
const $ = (qs) => document.querySelector(qs);
const $$ = (qs) => Array.from(document.querySelectorAll(qs));

Node.prototype.on = function(name, fn) {
  this.addEventListener(name, fn);
  return this;
};

// // anstatt
// document.querySelector('button').addEventListener('click', (event) => { });
// // wird zu:
// document.querySelector('button').on('click', (event) => { });

Array.prototype.on = Array.prototype.addEventListener = function(name, fn) {
  this.forEach((elem) => elem.on(name, fn));
  return this;
};

// anstatt
// Array.from(document.querySelectorAll('.menu-main li a')).forEach((elem) =>
//   elem.addEventListener('click', (event) => {
//     console.log(event);
//   })
// );
// // wird zu
// Array.from(document.querySelectorAll('.menu-main  li a')).on(
//   'click',
//   (event) => {
//     console.log(event);
//   }
// );



// helper
const $on = (el, ev, fn) => {
  Array.isArray(el) ? el.forEach(ae => $on(ae, ev, fn)) :
    el.addEventListener(ev, fn);
  return el;
};

// times - funktion
function times(n, fn) {
  const result = Array(n);
  for (let i = 0; i < n; i++) {
    result[i] = fn(i);
  }
  return result;
}
// oder von lodash
function baseTimes(n, iteratee) {
  var index = -1,
    result = Array(n);

  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}

/*
  * range(zahl bis wohin array befüllt werden soll) : array
  * - array von 0 bis
  parameterzahl (nicht inklusive)
  *
  * range(anfangswert, endwert) : array
  * - array von anfangswert bis endwert (nicht inklusive)
  *
  * range(nfangswert, endwert, übersprungswert) : : array
  * - array von anfangswert bis endwert (nicht inklusive), zwischenwerte durch übersprungswert entfallen
*/
function rangeFromStartToEnd(start, end, step = 1) {
  const length = Math.max(Math.ceil((end - start) / step), 0);
  const result = new Array(length);
  const sign = step / Math.abs(step);

  let index = 0;
  for (let value = start; value * sign < end * sign; value += step) {
    result[index++] = value;
  }
  return result;
};


function range(startOrEnd, end, step) {
  if (end) {
    return rangeFromStartToEnd(startOrEnd, end, step);
  } else {
    return rangeFromStartToEnd(0, startOrEnd);
  }
};

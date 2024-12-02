const $ = (qs) => document.querySelector(qs);
const $$ = (qs) => Array.from(document.querySelectorAll(qs));

const $on = (el, ev, fn) => {
  Array.isArray(el) ? el.forEach((ae) => $on(ae, ev, fn)) : el.addEventListener(ev, fn);
  return el;
};

Node.prototype.on = function (name, fn) {
  this.addEventListener(name, fn);
  return this;
};

Array.prototype.on = Array.prototype.addEventListener = function (name, fn) {
  this.forEach((elem) => elem.addEventListener(name, fn));
  return this;
};

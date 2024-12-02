'use strict';

const r = () => $('#red').value;
const g = () => $('#green').value;
const b = () => $('#blue').value;

$on(
  $$("input[type='range']"),
  'input',
  () => ($('body').style.backgroundColor = `rgb(${r()}, ${g()}, ${b()})`)
);

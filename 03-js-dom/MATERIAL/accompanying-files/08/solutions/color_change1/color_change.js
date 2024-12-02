'use strict';

$on(
  $$('button'),
  'click',
  (e) => ($('body').style.backgroundColor = e.target.innerHTML)
);

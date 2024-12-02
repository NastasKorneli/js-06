'use strict';

{
  const init = () => {
    $on($('#inc'), 'click', incFontSize);
    $on($('#dec'), 'click', decFontSize);
  };

  const incFontSize = () => setFontSizeTo(currentFontSize() + 5);
  const decFontSize = () => setFontSizeTo(currentFontSize() - 5);

  const currentFontSize = () => parseInt(getComputedStyle($('p')).fontSize);

  const setFontSizeTo = (size) => ($('p').style.fontSize = size + 'px');

  init();
}

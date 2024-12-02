export const Example = () => {
  console.log('Example init');
};

export const Example2 = () => {
  console.log('Example2 init');
};

export const DEFAULT_LANG = 'de';

const example3 = 'Testwert';

export default {
  methode: Example,
  methode2: Example2,
  methode3: () => {
    return 'anweisung';
  },
  eigenschaft: 'wert',
  // example3: example3
  example3,
};

const sentence = 'The pyramid of doom growing.';

// setTimeout(() => {
//   console.log('The');

//   setTimeout(() => {
//     console.log('pyramid');

//     setTimeout(() => {
//       console.log('of');

//       setTimeout(() => {
//         console.log('doom');

//         setTimeout(() => {
//           console.log('keeps');

//           setTimeout(() => {
//             console.log('growing.');
//           }, 1000);
//         }, 1000);
//       }, 1000);
//     }, 1000);
//   }, 1000);
// }, 1000);

const printWords = (str, index = 0) => {
  const words = str.split(' ');
  // Guard
  if (index === words.length) return;

  console.log(words[index]);
  setTimeout(() => printWords(str, index + 1), 1000);
};

const printWords2 = (str, index = 0) => {
  const words = str.split(' ');

  words.forEach((word, idx) => {
    setTimeout(() => {
      console.log(word);
    }, idx * 1000);
  });
};

printWords2(sentence);

// Übung 12: Die Pyramide abbrechen

// Schreibe das Codebeispiel 89 so um, dass keine Pyramide entsteht. Benutze dazu, wie im Text angedeutet, eine Funktion, die das n-te Wort ausgibt und sich per setTimeout(…) mit n + 1 als Parameter aufruft, solange noch Wörter im Satz vorhanden sind.

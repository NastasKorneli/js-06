import slugify from 'slugify';

const text = 'Ich bin ein /Text/ & enthalte mehrere Sonderzeichen!';

const slug = slugify(text, { lower: true });

const encodedText = encodeURIComponent(text);
const decodedText = decodeURIComponent(encodedText);

console.log(slug);
console.log(encodedText);
console.log(decodedText);

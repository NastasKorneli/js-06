// const validator = require('validator')
import validator from 'validator';

// JavaScript: The Definitive Guide, 6th Edition
console.log(validator.isISBN('978-0596805524')); //=> true | false

// Hoppla Zahlendreher
console.log(validator.isISBN('987-0596805524')); //=> true | false

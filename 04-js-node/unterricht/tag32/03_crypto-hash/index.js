//const crypto = require('crypto');
import crypto from 'node:crypto';

const data = 'Ich werde verschlüsselt!';
const hash = crypto.createHash('sha256').update(data).digest('hex'); // 256-bit SHA-2 hash algorithm

console.log(hash); // 4803bce8b78d10b6bae3224c041f7c7311dedc056386870e50e6b56a109f4ee8

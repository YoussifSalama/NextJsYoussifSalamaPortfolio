// Usage: npm run hash-password -- "your-new-password"
// Prints a bcrypt hash to paste into .env.local as ADMIN_PASSWORD_HASH.
const bcrypt = require('bcrypt');

const password = process.argv[2];
if (!password) {
  console.error('Usage: npm run hash-password -- "your-password"');
  process.exit(1);
}

bcrypt.hash(password, 12).then((hash) => {
  console.log(hash);
});

import bcrypt from 'bcrypt';
const SALT_ROUNDS = 12;
function generateHash(password) {
    console.log("in generate hash");
    console.log('password');
    console.log(password);
    return bcrypt.hash(password, SALT_ROUNDS);
}

async function checkPassword(password, hash) { //plaintext password & the pass coming from the db
    return bcrypt.compare(password, hash);
}

export { generateHash, checkPassword }
import bcrypt from 'bcrypt';
const SALT_ROUNDS = 12;
function generateHash(password) {
    return bcrypt.hash(password, SALT_ROUNDS);
}

async function checkPassword(password, hash) { //plaintext password & the pass coming from the db
    console.log(password);
    console.log(hash);
    console.log(await bcrypt.compare("Samwyse6553426t", "$2b$12$arTbjBSVQSFSM3ygrw9YguxOeW0nBp6.GFLZi6UTb9MH00oTAlaLO"));
    return bcrypt.compare(password, hash);
}

export { generateHash, checkPassword }
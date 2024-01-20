const config = require('config');
const crypto = require('crypto');
const { v4: uuidv4 } = require('uuid');
const {
    saveUser,
    deleteUserIfExists,
    getUserByAuthToken,
    getUserByUsername,
    getAllUsers,
    updateAuthToken
} = require('./database');

const algorithm = 'aes-256-cbc';
const key = config.crypto.key;
const iv = config.crypto.iv;

function getAuthToken(password, passwordConf) {
    return uuidv4();
}

//Encrypting text
function encrypt(text) {
    let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), iv);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return { iv: iv.toString('hex'), encryptedData: encrypted.toString('hex') };
}

// Decrypting text
function decrypt(text) {
    let iv = Buffer.from(text.iv, 'hex');
    let encryptedText = Buffer.from(text.encryptedData, 'hex');
    let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key), iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
}

async function getUser(req, res, next) {
    const authToken = req.cookies['gatekeeper-authtoken'];
    if (authToken) {
        const user = await getUserByAuthToken(authToken);
        if (user) {
            res.send(getSafeUser(user));
            return;
        }
    }
    res.status(400).send({ message: 'User not found' });
}

function passwordsMatch(p1, p2) {
    return (p1.encryptedData === p2.encryptedData) && (p1.iv === p2.iv);
}

function getSafeUser(user) {
    return {
        username: user.username,
        gatecode: user.gatecode
    }
}

module.exports = (app) => {
    app.post('/register', async (req, res, next) => {
        const { username, gatecode, password, confirm_password } = req.body;

        if (password != confirm_password) {
            res.status(500).send({ message: 'Password and Password Confirmation do not match' });
            return;
        }

        const user = {
            username,
            gatecode,
            password: encrypt(password),
            authToken: getAuthToken()
        };

        try {
            await deleteUserIfExists(gatecode);
            const response = await saveUser(user);
            res.cookie('gatekeeper-authtoken', user.authToken, { maxAge: 1000 * 60 * 60 * 8, httpOnly: true });
            res.send(getSafeUser(user));
        }
        catch (err) {
            res.status(500).send({ message: 'Error saving user' });
            return;
        }
    });

    app.post('/login', async (req, res, next) => {
        const user = await getUserByUsername(req.body.username);
        const password = encrypt(req.body.password);
        if (user && passwordsMatch(password, user.password)) {
            const authToken = getAuthToken();
            await updateAuthToken(user._id, authToken);
            res.cookie('gatekeeper-authtoken', authToken, { maxAge: 1000 * 60 * 60 * 8, httpOnly: true });
            res.send(getSafeUser(user));
            return
        }
        else {
            res.status(401).send({ message: 'Invalid username or password' });
        };

    });

    app.get('/user', getUser);

    app.get('/users', async (req, res, next) => {
        res.send(await getAllUsers());
    });

}
const config = require('config');
const crypto = require('crypto');
const { v4: uuidv4 } = require('uuid');
const { saveUser, getUserByAuthToken, getUserByUsername, getAllUsers, updateAuthToken } = require('./database');

const algorithm = 'aes-256-cbc';
const key = config.cryptoKey;
const iv = crypto.randomBytes(16);

function getAuthToken(password, passwordConf) {
    return uuidv4();
}

function checkAuthToken(username, password) {
    return true;
}

function encrypt(text) {
    const cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);
    let encrypted = cipher.update(text, 'utf-8', 'hex');
    encrypted += cipher.final('hex');
    return { iv: iv.toString('hex'), encryptedData: encrypted };
}
  
function decrypt(encryptedData, inputIV) {
    const decipher = crypto.createDecipheriv(algorithm, Buffer.from(key), Buffer.from(inputIV, 'hex'));
    let decrypted = decipher.update(encryptedData, 'hex', 'utf-8');
    decrypted += decipher.final('utf-8');
    return decrypted;
}

module.exports = (app) => {

    app.post('/register', async (req, res, next) => {
        const { username, gatecode, password, passwordConf } = req.body;
        
        if (password != passwordConf) {
            res.status(500).send({message: 'Password and Password Confirmation do not match'});
            return;
        }

        const user = {
            username,
            gatecode,
            password: encrypt(password),
            authToken: getAuthToken()
        };

        saveUser(user);

        res.cookie('gatekeeper-authtoken', user.authToken, { maxAge: 1000 * 60 * 60 * 8, httpOnly: true });
        res.redirect('/control.html');
    });

    app.post('/login', async (req, res, next) => {
        const user = getUserByUsername(req.body.username);
        if (user && encrypt(req.body.password) === user.password ) {
            const authToken = getAuthToken();
            await updateAuthToken(user._id, authToken);
            res.cookie('gatekeeper-authtoken', authToken, { maxAge: 1000 * 60 * 60 * 8, httpOnly: true });
            res.redirect('/control.html');
            return
        }
        else {
            res.status(401).send({message: 'Invalid username or password'});
        };

    });

    app.post('/validate', async (req, res, next) => {
        const authToken = req.cookies['gatekeeper-authtoken'];
        if (authToken) {
            const user = getUserByAuthToken(authToken);
            if (user) {
                res.status(200).send({ status: 'ok' });
                return;
            }
        }
        res.redirect('/login.html');
    })

    app.get('/users', async (req, res, next) => {
        res.send(await getAllUsers());
    });

}
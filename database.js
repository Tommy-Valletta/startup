const config = require('config');
const { MongoClient } = require("mongodb");

const uri = `mongodb+srv://${config.db.username}:${config.db.password}@development.g6gcuhk.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri);

const saveUser = async (user) => {
    try {
        await client.connect();
        const db = client.db('gatekeeper');
        const users = db.collection('users');
        const result = await users.insertOne(user);
        console.log(`User created with the following id: ${result.insertedId}`);
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.close();
    }
};

const deleteUserIfExists = async (gatecode) => {
    const user = await getUserByGateCode(gatecode);
    if (!user) return;
    try {
        await client.connect();
        const db = client.db('gatekeeper');
        const users = db.collection('users');
        const result = await users.deleteMany({ gatecode });
        console.log(`Deleted ${result.deletedCount} users with gatecode ${gatecode}`);
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.close();
    }
};

const getUserByAuthToken = async (authToken) => {
    try {
        await client.connect();
        const db = client.db('gatekeeper');
        const users = db.collection('users');
        const user = await users.findOne({ authToken });
        return user;
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.close();
    }
};

const getUserByGateCode = async (gatecode) => {
    try {
        await client.connect();
        const db = client.db('gatekeeper');
        const users = db.collection('users');
        const user = await users.findOne({ gatecode });
        return user;
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.close();
    }
};

const getUserByUsername = async (username) => {
    try {
        await client.connect();
        const db = client.db('gatekeeper');
        const users = db.collection('users');
        const user = await users.findOne({ username });
        return user;
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.close();
    }
};

const updateAuthToken = async (_id, authToken) => {
    try {
        await client.connect();
        const db = client.db('gatekeeper');
        const users = db.collection('users');
        const filter = { _id };
        const update = { $set: { authToken } };
        const options = { upsert: false };
        const response = await users.updateOne(filter, update, options);
        console.log(`Updated ${response.modifiedCount} user`);
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.close();
    }
};

const getAllUsers = async () => {
    try {
        await client.connect();
        const db = client.db('gatekeeper');
        const users = db.collection('users');
        const response = await users.find({}).limit(25);
        return await response.toArray();
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.close();
    }
}

module.exports = {
    saveUser,
    deleteUserIfExists,
    getUserByAuthToken,
    getUserByGateCode,
    getUserByUsername,
    updateAuthToken,
    getAllUsers
}
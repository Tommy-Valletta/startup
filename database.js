const config = require('config');
const { MongoClient } = require("mongodb");

const client = null;
const uri = `mongodb+srv://${config.db.username}:${config.db.password}@development.g6gcuhk.mongodb.net/?retryWrites=true&w=majority`;

module.exports = {
    getClient: () => {
        if (client) {
            return client;
        }
        client = new MongoClient(uri, {
            serverApi: {
                version: ServerApiVersion.v1,
                strict: true,
                deprecationErrors: true,
            }
        });
        return client;
    }, 

    saveUser: async (user) => {
        try {
            const client = this.getClient();
            await client.connect();
            await client.db('gatekeeper').collection('users').insertOne(user);
        } finally {
            await client.close();
        }
    },

    getUserByUsername: async (username) => {
        try {
            const client = this.getClient();
            await client.connect();
            const user = await client.db('gatekeeper').collection('users').findOne({ username });
            return user;
        } finally {
            await client.close();
        }
    },

    getUserByAuthToken: async (authToken) => {
        try {
            const client = this.getClient();
            await client.connect();
            const user = await client.db('gatekeeper').collection('users').findOne({ authToken });
            return user;
        } finally {
            await client.close();
        }
    },

    updateAuthToken: async (_id, authToken) => {
        try {
            const client = this.getClient();
            await client.connect();
            await client.db('gatekeeper').collection('users').updateOne({ _id }, { authToken });
        } finally {
            await client.close();
        }
    },

    getAllUsers: async () => {
        try {
            const client = this.getClient();
            await client.connect();
            const users = await client.db('gatekeeper').collection('users').find({}).limit(25);
            return users;
        } finally {
            await client.close();
        }
    }
}
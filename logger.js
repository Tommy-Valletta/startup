module.exports = (app, wss) => {
    const gateURL = 'http://67.2.189.173/gate/open/a-series-of-words-that-dont-make-sense-to-anyone-else-but-we-can-remember';

    app.ws('/', (ws, req) => {
        ws.on('message', msg => {
            console.log(msg);
        });
    });

    app.post('/open-gate', (req, res, next) => {
        const user = req.body.username;

        fetch(gateURL)
            .catch(err => {
                console.log("Fetch failure. It will never respond. It's fine.");
            });

        console.log('Gate opened!');
        wss.clients.forEach((client) => {
            client.send(JSON.stringify({ user, action: 'opened', timestamp: +new Date }));
        });
        setTimeout(() => {
            console.log('Gate closed!');
            wss.clients.forEach((client) => {
                client.send(JSON.stringify({ user, action: 'closed', timestamp: +new Date }));
            });
        }, 30000)
    });
}
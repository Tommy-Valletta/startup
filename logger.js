module.exports = (app, wss) => {

    app.ws('/', (ws, req) => {
        ws.on('message', msg => {
            console.log(msg);
        });
        console.log('socket', req.testing);
    });

    app.post('/open-gate', (req, res, next) => {
        const user = req.body.username;

        console.log('Gate opened!');
        wss.clients.forEach((client) => {
            client.send(JSON.stringify({user, action: 'opened', timestamp: +new Date}));
        });
        setTimeout(() => {
            console.log('Gate closed!');
            wss.clients.forEach((client) => {
                client.send(JSON.stringify({user, action: 'closed', timestamp: +new Date}));
            });
        }, 3000)
    });
}
// Import modules
const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');

// Create a server
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, { cors: { origin: '*' } });

// Serve static files (mainly for index.html)
// index.html can now be accessed at http://localhost:PORT/
app.use(express.static('public'));

// Listen for new connections from different clients
io.on('connection', socket => {
    console.log('New user connected');

    // Listen for 'message' event
    socket.on('message', data => {
        io.emit('message', data); // Emit the same event back to all connected clients
    });
});

// Start the server
const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => console.log(`Listening at port ${PORT}`));

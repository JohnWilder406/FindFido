const express = require('express');
const cors = require('cors');
const socketio = require('socket.io')
const app = express();
const port = 8000

require('./config/mongoose.config');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

require('./routes/pets.routes')(app);


const server = app.listen(port, () => console.log(`Listening on port: ${port}`));

const io = socketio(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST'],
        allowedHeaders: ['*'],
        credentials: true,
    }
});

io.on("connection", (socket)=> {
    console.log('socket id:' + socket.id)
    // socket.on("DELETE", data => {
    //     socket.broadcast.emit("FILTER", data);
    // });
});


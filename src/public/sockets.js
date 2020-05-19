module.exports = (io) => {

    let nickNames = [];

    io.on('connection', (socket) => { //Que se quede escuchando cuando hay una conexión
        console.log('New User Connected');

        socket.on('nuevo usuario', (data, callback) => {
            console.log(data);
            
            if(nickNames.indexOf(data) != -1) {
                callback(false);
            }else{
                callback(true);
                socket.nickName = data;
                nickNames.push(socket.nickName);
                updateNickNames()
            }
        });

        socket.on('mensaje enviado', function(data) {
            io.emit('nuevo mensaje', {
                msg: data,
                nick: socket.nickName
            });
            
        });
        
        socket.on('disconnect', data => {
            if(!socket.nickName) return;
            nickNames.splice(nickNames.indexOf(socket.nickName), 1);
            updateNickNames()
            
        });

        function updateNickNames() {
            io.emit('usernames', nickNames);
        }
    });
}
$(function() {
    const socket = io();
    //Obteniendo los elementos del DOM desde la interfaz
    const messageForm = $('#message-form');
    const message = $('#message');
    const chat = $('#chat');
    //Obtener el DOM desde el nickname form
    const nickForm = $('#nickForm');
    const nickError = $('#nickError');
    const nickName = $('#nickName');

    const users = $('#usernames');

    nickForm.submit(e => {
        e.preventDefault();
        socket.emit('nuevo usuario', nickName.val(), data => {
            if(data) {
                $('#nickWrap').hide();
                $('#contentWrap').show();
            }
            else{
                nickError.html(`
                    <div class="alert alert-danger">
                    El usuario ya existe
                    </div>
                `);
            }
            nickName.val('');
        });
        
    });
    //Eventos
    messageForm.submit(e => {
        e.preventDefault();
        socket.emit('mensaje enviado', message.val());
        message.val('');
        
        
    });

    socket.on('nuevo mensaje', function(data) {
        chat.append('<b>' + data.nick + '</b>: ' + data.msg + '<br/>')
    });

    socket.on('usernames', data => {
        let html = '';
        for(let i = 0; i < data.length; i++) {
            html += `<p><i class="fas fa-user"></i>${data[i]}</p>`
        }
        users.html(html)
    });
});
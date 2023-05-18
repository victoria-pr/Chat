import React, { useState } from 'react';


const ChatFooter = ({ socket }) => {
    const [message, setMessage] = useState('');
    
    const handleTyping = () =>
    socket.emit('typing', `${localStorage.getItem('userName')} is typing`);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim() && localStorage.getItem('userName')) { //si el mensaje no esta vacio y el usuario esta logueado, se envia el mensaje
        socket.emit('message', {
          text: message,
          name: localStorage.getItem('userName'),
          id: `${socket.id}${Math.random()}`, //se crea un id para el mensaje con el id del socket y un numero aleatorio para que sea unico 
          socketID: socket.id,
        });
      }
      socket.emit('typing', '');
      setMessage('');
    };
  return (
    <div className="chat__footer">
      <form className="form" onSubmit={handleSendMessage}>
        <input
          type="text"
          placeholder="Write message"
          className="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleTyping}
        />
        <button className="sendBtn">SEND</button>
      </form>
    </div>
  );
};

export default ChatFooter;
// Establish connection to socket.io server running on same domain
const socket = io();

// Select required DOM elements
const chatBox = document.querySelector('.chats');
const form = document.querySelector('.action-center');
const textField = document.querySelector('.writer');

// Listen for 'message' event
// Create markup and append it on the UI
socket.on('message', data => {
    const markup = `<div class="message message--${data.id === socket.id ? 'left' : 'right'}">${data.message}</div>`; // Check the sender of the message
    chatBox.insertAdjacentHTML('beforeend', markup);
});

// Add event listner to form
form.addEventListener('submit', e => {
    e.preventDefault(); // Prevent form from getting submitted

    socket.emit('message', { id: socket.id, message: textField.value }); // Emit 'message' event

    textField.value = ''; // Empty contents of input field
});
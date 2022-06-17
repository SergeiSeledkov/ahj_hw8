import CreateMessage from './CreateMessage';
import CreateUser from './CreateUser';
import API from './API';

const api = new API('https://ahj-hw8-server.herokuapp.com');
let ws = new WebSocket('wss://ahj-hw8-server.herokuapp.com');
const inputPopup = document.querySelector('.popup__input');
const inputMessage = document.querySelector('.wrapper__input-text');
const popupError = document.querySelector('.popup__error');
const popup = document.querySelector('.popup');
const wrapperUl = document.querySelector('.wrapper__ul');
const wrapperMessages = document.querySelector('.wrapper__messages');
const main = document.querySelector('.main');
const exit = document.querySelector('.wrapper__li-exit');

async function start() {
  const resUser = await api.allUser();
  const resMessage = await api.allMessage();
  const responseUser = await resUser.json();
  const responseMessage = await resMessage.json();

  if (responseUser.length > 0) {
    for (const i of responseUser) {
      const createUser = new CreateUser(i.name);
      const newUser = createUser.createElement();
      const name = newUser.querySelector('.wrapper__li-name');

      if (name.textContent === main.dataset.name) {
        name.classList.add('you-name');
        name.textContent = 'You';
      }

      wrapperUl.append(newUser);
    }
  }

  if (responseMessage.length > 0) {
    for (const i of responseMessage) {
      const createMessage = new CreateMessage(i.userName, i.date, i.message);
      const newMessage = createMessage.createElement();
      const name = newMessage.querySelector('.wrapper__message-title-name');

      if (name.textContent === main.dataset.name) {
        const newMessageTitle = newMessage.querySelector('.wrapper__message-title');

        newMessage.classList.add('you-message');
        newMessageTitle.classList.add('you-title');
        name.textContent = 'You';
      }

      wrapperMessages.append(newMessage);
    }
  }
}

function connectWs() {
  ws = new WebSocket('wss://ahj-hw8-server.herokuapp.com');

  ws.addEventListener('open', () => { });

  ws.addEventListener('message', async (evt) => {
    const messageData = JSON.parse(evt.data);

    if (messageData.type === 'send') {
      if (main.dataset.id !== messageData.id) {
        const res = await api.newMessage(messageData.id, messageData.name, messageData.message);

        if (res.status === 200) {
          const data = await res.json();
          const createMessage = new CreateMessage(data.userName, data.date, data.message);
          const newMessage = createMessage.createElement();

          wrapperMessages.append(newMessage);
        }
      }
    }

    if (messageData.type === 'close') {
      const wrapperLiName = document.querySelectorAll('.wrapper__li-name');

      for (const i of [...wrapperLiName]) {
        if (i.textContent === messageData.name) {
          i.closest('.wrapper__li').remove();
        }
      }
    }

    if (messageData.type === 'connect') {
      if (main.dataset.name !== messageData.name && typeof main.dataset.name !== 'undefined') {
        const createUser = new CreateUser(messageData.name);
        const newUser = createUser.createElement();

        wrapperUl.append(newUser);
      }
    }
  });

  ws.addEventListener('close', (evt) => {
    if (!evt.wasClean) {
      connectWs();
    }
  });

  ws.addEventListener('error', () => { });
}

inputPopup.addEventListener('keydown', async (e) => {
  if (e.key === 'Enter') {
    const response = await api.newUser(inputPopup.value);

    if (response.status === 200) {
      const data = await response.json();

      if (!popupError.classList.contains('hidden')) {
        popupError.textContent = '';
        popupError.classList.add('hidden');
      }

      popup.classList.add('hidden');
      main.dataset.id = data.id;
      main.dataset.name = data.name;
      start();
      ws.send(JSON.stringify({
        type: 'connect',
        name: data.name,
      }));
    } else {
      popupError.textContent = 'User Already Exist';
      popupError.classList.remove('hidden');
    }
  }
});

inputMessage.addEventListener('keydown', async (e) => {
  if (e.key === 'Enter') {
    const response = await api.newMessage(main.dataset.id, main.dataset.name, inputMessage.value);

    if (response.status === 200) {
      const data = await response.json();
      const createMessage = new CreateMessage(data.userName, data.date, data.message);
      const newMessage = createMessage.createElement();
      const messageTitle = newMessage.querySelector('.wrapper__message-title');
      const messageName = newMessage.querySelector('.wrapper__message-title-name');

      newMessage.classList.add('you-message');
      messageTitle.classList.add('you-title');
      messageName.textContent = 'You';

      wrapperMessages.append(newMessage);

      ws.send(JSON.stringify({
        type: 'send',
        id: main.dataset.id,
        name: main.dataset.name,
        message: inputMessage.value,
      }));
    }

    inputMessage.value = '';
  }
});

exit.addEventListener('click', async () => {
  const { name } = exit.closest('.main').dataset;
  const { id } = exit.closest('.main').dataset;

  ws.send(JSON.stringify({
    type: 'close',
    name,
  }));
  ws.close(1000);

  await api.deleteUser(id);

  window.location.reload();
});

wrapperMessages.addEventListener('DOMSubtreeModified', () => {
  if (wrapperMessages.scrollHeight > wrapperMessages.clientHeight) {
    wrapperMessages.scrollTop = wrapperMessages.scrollHeight - wrapperMessages.clientHeight;
  }
}, false);

connectWs();

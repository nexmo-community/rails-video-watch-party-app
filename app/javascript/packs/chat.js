import { formatChatMsg } from './app_helpers.js';

export default class Chat {
  constructor(session) {
    this.session = session;
    this.form = document.querySelector('form');
    this.msgTxt = document.querySelector('#message');
    this.msgHistory = document.querySelector('#history');
    this.setupEventListeners();
  }

  setupEventListeners() {
    let self = this;
    this.form.addEventListener('submit', function(event) {
      event.preventDefault();

      self.session.signal({
        type: 'msg',
        data: formatChatMsg(self.msgTxt.value)
      }, function(error) {
        if (error) {
          console.log('Error sending signal:', error.name, error.message);
        } else {
          self.msgTxt.value = '';
        }
      });
    });

    this.session.on('signal:msg', function signalCallback(event) {
      var msg = document.createElement('p');
      msg.textContent = event.data;
      msg.className = event.from.connectionId === self.session.connection.connectionId ? 'mine' : 'theirs';
      self.msgHistory.appendChild(msg);
      msg.scrollIntoView();
    });
  }
}

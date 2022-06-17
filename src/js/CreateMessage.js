export default class CreateMessage {
  constructor(userName, date, message) {
    this.userName = userName;
    this.date = date;
    this.message = message;
  }

  createElement() {
    const wrapperMessage = document.createElement('div');
    const wrapperMessageTitle = document.createElement('div');
    const wrapperMessageTitleName = document.createElement('div');
    const wrapperMessageTitleDate = document.createElement('div');
    const wrapperMessageText = document.createElement('div');

    wrapperMessage.classList.add('wrapper__message');
    wrapperMessageTitle.classList.add('wrapper__message-title');
    wrapperMessageTitleName.classList.add('wrapper__message-title-name');
    wrapperMessageTitleDate.classList.add('wrapper__message-title-date');
    wrapperMessageText.classList.add('wrapper__message-text');

    wrapperMessageTitleName.textContent = this.userName;
    wrapperMessageTitleDate.textContent = this.date;
    wrapperMessageText.textContent = this.message;

    wrapperMessageTitle.append(wrapperMessageTitleName);
    wrapperMessageTitle.append(wrapperMessageTitleDate);
    wrapperMessage.append(wrapperMessageTitle);
    wrapperMessage.append(wrapperMessageText);

    return wrapperMessage;
  }
}

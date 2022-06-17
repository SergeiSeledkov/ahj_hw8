export default class CreateUser {
  constructor(name) {
    this.name = name;
  }

  createElement() {
    const wrapperLi = document.createElement('li');
    const wrapperLiStatus = document.createElement('div');
    const wrapperLiStatusCircle = document.createElement('span');
    const wrapperLiName = document.createElement('div');

    wrapperLi.classList.add('wrapper__li');
    wrapperLiStatus.classList.add('wrapper__li-status');
    wrapperLiStatusCircle.classList.add('wrapper__li-status-circle');
    wrapperLiName.classList.add('wrapper__li-name');

    wrapperLiName.textContent = this.name;

    wrapperLiStatus.append(wrapperLiStatusCircle);
    wrapperLi.append(wrapperLiStatus);
    wrapperLi.append(wrapperLiName);

    return wrapperLi;
  }
}

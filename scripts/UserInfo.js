export default class UserInfo {
  constructor(name, description) {
    this.name = document.querySelector(name);
    this.description = document.querySelector(description);
  }

  getUserInfo() {
    return {
      name: this.name.textContent,
      description: this.description.textContent,
    };
  }

  setUserInfo(name, description) {
    this.name.textContent = name;
    this.description.textContent = description;
  }
}

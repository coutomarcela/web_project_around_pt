export default class UserInfo {
  constructor(name, description, avatar) {
    this.name = document.querySelector(name);
    this.description = document.querySelector(description);
    this.avatar = document.querySelector(avatar);
  }

  getUserInfo() {
    return {
      name: this.name.textContent,
      description: this.description.textContent,
      avatar: this.avatar.src,
    };
  }

  setUserInfo(name, description, avatar) {
    this.name.textContent = name;
    this.description.textContent = description;
    this.avatar.src = avatar;
  }
}

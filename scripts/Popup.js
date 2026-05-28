export default class Popup {
  constructor(popupSelector) {
    this._selector = document.querySelector(popupSelector);
    this._closeButton = this._selector.querySelector(".popup__close");
  }

  open() {
    this._selector.classList.add("popup_is-opened");
    document.addEventListener("keydown", (event) =>
      this._handleEscClose(event),
    );
  }

  close() {
    this._selector.classList.remove("popup_is-opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose(event) {
    if (event.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    this._selector.addEventListener("click", (event) => {
      if (event.target === this._selector) this.close();
    });
    this._closeButton.addEventListener("click", () => {
      this.close();
    });
  }
}

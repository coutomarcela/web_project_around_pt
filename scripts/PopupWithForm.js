import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(
    popupSelector,
    handleProfileFormSubmit,
    resetForm,
    handleAvatarFormSubmit,
  ) {
    super(popupSelector);
    this.handleProfileFormSubmit = handleProfileFormSubmit;
    this.popupForm = this._selector.querySelector(".popup__form");
    this.inputsList = Array.from(
      this.popupForm.getElementsByClassName("popup__input"),
    );
    this.resetForm = resetForm;
    this.handleAvatarFormSubmit = handleAvatarFormSubmit;
  }

  _getInputValues() {
    const inputValues = {};
    this.inputsList.forEach((input) => {
      inputValues[input.name] = input.value;
    });
    return inputValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this.popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      //variável que pega o retorno da _getInputValues
      const inputValues = this._getInputValues();
      this.handleProfileFormSubmit(inputValues);
      this.close();
    });
  }

  close() {
    super.close();

    if (this.resetForm) {
      this.resetForm();
    }
  }
}

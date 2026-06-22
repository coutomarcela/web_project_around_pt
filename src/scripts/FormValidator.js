export class FormValidator {
  constructor(buttonSelector, errorClassSelector, formSelector) {
    this._buttonSelector = buttonSelector;
    this._errorClassSelector = errorClassSelector;
    this._formSelector = formSelector;
    this._inputList = Array.from(
      formSelector.querySelectorAll(".popup__input"),
    );
  }

  _showInputError(input) {
    const errorSpan = this._formSelector.querySelector(
      `#${input.id}-input-error`,
    );
    errorSpan.textContent = input.validationMessage;
    errorSpan.classList.add("popup__input-error_active");
    this._toggleButtonState();
  }

  _hideInputError(input) {
    const errorSpan = this._formSelector.querySelector(
      `#${input.id}-input-error`,
    );
    errorSpan.classList.remove("popup__input-error_active");
    errorSpan.textContent = "";
    this._toggleButtonState();
  }

  _inputValidator(input) {
    if (!input.validity.valid) {
      this._showInputError(input);
    } else {
      this._hideInputError(input);
    }
  }

  _hasInvalidInput() {
    return this._inputList.some((input) => !input.validity.valid);
  }

  _toggleButtonState() {
    this._buttonSelector.disabled = this._hasInvalidInput();
  }

  setEventListeners() {
    this._inputList.forEach((input) => {
      input.addEventListener("input", () => this._inputValidator(input));
    });
  }

  resetValidation() {
    //método para resetar todas as validações dos formulários
    this._toggleButtonState();
    this._inputList.forEach((input) => {
      this._hideInputError(input);
    });
    this._formSelector.reset();
  }
}

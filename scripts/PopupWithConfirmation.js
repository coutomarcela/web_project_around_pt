import Popup from "./Popup.js";

//quando clicar no botão de deletar, o popup deve abrir - preciso identificar o botão, colocar um ouvidor de evento e apenas depois que o botão for clicado, executar a função de deletar

export default class PopupWithConfirmation extends Popup {
  //qual é a ordem? super primeiro ou constructor primeiro?
  constructor(popupSelector, handleDeleteCard, confirmButton) {
    super(popupSelector);
    this._confirmButton = this._selector.querySelector(
      ".popup__confirm-button",
    );
    this._handleDeleteCard = handleDeleteCard;
  }

  setEventListeners() {
    super.setEventListeners();
    this._confirmButton.addEventListener("click", () => {
      this._handleDeleteCard(this._card);
    });
  }
  open(card) {
    this._card = card;
    super.open();
  }
}

import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    //não precisa vir de fora porque a referência é sempre a mesma
    this.name = this._selector.querySelector(".popup__caption");
    this.link = this._selector.querySelector(".popup__image");
  }

  open(name, link) {
    this.name.textContent = name;
    this.link.src = link;
    this.link.alt = name;
    super.open();
  }
}

//constructor: dados que vem de fora da classe
//qndo precisamos ter um constructor na classe filha: quando criamos novas propriedades
//chamamos super para conseguir acessar todas as propriedades e métodos da classe pai
//super: constructor da classe pai

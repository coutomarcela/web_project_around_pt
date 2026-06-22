export default class Card {
  constructor(
    name,
    link,
    templateSelector,
    handleImageClick,
    isLiked,
    handleLikeClick,
    handleDeleteClick,
    id,
  ) {
    this._name = name;
    this._link = link;
    this._templateSelector = templateSelector;
    this._handleImageClick = handleImageClick;
    this._isLiked = isLiked;
    this._handleLikeClick = handleLikeClick;
    this._handleDeleteClick = handleDeleteClick;
    this._id = id;
  }

  _getTemplate() {
    return document
      .querySelector(this._templateSelector)
      .content.querySelector(".card")
      .cloneNode(true);
  }

  //só vai ser chamada se a api retornar um sucesso, caso não retorne ela não executa
  updateLikesView() {
    if (this._isLiked === true) {
      this._likeButton.classList.add("card__like-button_is-active");
    } else {
      this._likeButton.classList.remove("card__like-button_is-active");
    }
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", () => this._handleLikeClick());

    this._deleteButton.addEventListener("click", () =>
      this._handleDeleteClick(),
    );
    this._image.addEventListener("click", () => this._handleImageClick());
  }

  generateCard() {
    this._element = this._getTemplate();

    this._title = this._element.querySelector(".card__title");
    this._image = this._element.querySelector(".card__image");
    this._likeButton = this._element.querySelector(".card__like-button");
    this._deleteButton = this._element.querySelector(".card__delete-button");

    this._title.textContent = this._name;
    this._image.src = this._link;
    this._image.alt = this._name;

    this._setEventListeners();
    this.updateLikesView();

    return this._element;
  }

  toggleLike() {
    this._isLiked = !this._isLiked;
  }

  removeCard() {
    this._element.remove();
    this._element = null;
  }

  //serve para que outras partes do código acessem esse id
  getId() {
    return this._id;
  }
}

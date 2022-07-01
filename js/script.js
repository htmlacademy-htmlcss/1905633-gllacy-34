const body = document.querySelector('body');
const contactsPopup = document.querySelector('.contacts__popup');
const toggleButton = document.querySelector('.contacts__button');
const outsideSpace = document.querySelector('.popup__container');
const menuButton = document.querySelector('.header-menu__catalogue');
const menuPopup = document.querySelector('.dropdown-menu');
const searchButton = document.querySelector('.header__search-container');
const searchPopup = document.querySelector('.search-popup');
const loginButton = document.querySelector('.header__login-container');
const loginPopup = document.querySelector('.login-popup');
const basketButton = document.querySelector('.header__basket-container');
const basketPopup = document.querySelector('.basket-popup');
const nextButton = document.querySelector('.next');
const previousButton = document.querySelector('.previous');
const sliderList = document.querySelector('.slider__list');
const buttonList = document.querySelectorAll('.marker-list__item');

// const imageList = ["a", "b", "c", "d"];

const sliderSorting = (list, slideNumber) => {
  const newList = list.slice(slideNumber);
  for (let i = 0; i < slideNumber; i++) {
    newList.push(list[i])
  }
  if (slideNumber >= list.length) {
    return list;
  }
  return newList;
};


const hideElementOnESC = (element, hideClass, button, highlightedClass) => {
  const callbackOnEsc = (evt) => {
    if (evt.key === 'Escape') {
      element.classList.add(hideClass);
      button.classList.remove(highlightedClass);
      body.classList.remove('stop-scrolling');
      document.removeEventListener('keydown', callbackOnEsc);
    }
  };
  document.addEventListener('keydown', callbackOnEsc);
};

const hideElementOnClickOutside = (clickElement, hideElement, hideClass) => {
  // toggleButton.addEventListener('click', (evt) => {
  //   console.log("CLICK NA KNOPKU");
  //   evt.preventDefault()
  // });
  document.addEventListener('click', (evt) => {
    if (!evt.target.classList.contains('contacts__button') && evt.target.classList.contains('popup__window')) {
      hideElement.classList.add(hideClass);
    }
    console.log(evt.target);
  });
  clickElement.addEventListener('click', (evt) => {
    evt.preventDefault();
    console.log("CLICK W POLE");
  });
};

const hideElementOnButtonClick = (element, hideClass) => {
  const button = element.querySelector('.popup__close-button');
  button.addEventListener('click', (evt) => {
    evt.preventDefault();
    element.classList.add(hideClass);
    body.classList.remove('stop-scrolling');
  });
};

toggleButton.addEventListener('click', function () {
  body.classList.add('stop-scrolling');
  contactsPopup.classList.remove('popup--closed');
  hideElementOnESC(contactsPopup, 'popup--closed');
  // hideElementOnClickOutside(outsideSpace, contactsPopup, 'popup--closed');
  hideElementOnButtonClick(contactsPopup, 'popup--closed');
});

menuButton.addEventListener('click', function () {
  menuPopup.classList.remove('popup--closed');
  menuButton.classList.add('header-menu__item--selected');
  hideElementOnESC(menuPopup, 'popup--closed', menuButton, 'header-menu__item--selected');
  // hideElementOnClickOutside(outsideSpace, searchPopup, 'popup--closed');
});

searchButton.addEventListener('click', function () {
  searchPopup.classList.remove('popup--closed');
  hideElementOnESC(searchPopup, 'popup--closed');
  // hideElementOnClickOutside(outsideSpace, searchPopup, 'popup--closed');
});

loginButton.addEventListener('click', function () {
  loginPopup.classList.remove('popup--closed');
  hideElementOnESC(loginPopup, 'popup--closed');
  // hideElementOnClickOutside(outsideSpace, searchPopup, 'popup--closed');
});

basketButton.addEventListener('click', function () {
  basketPopup.classList.remove('popup--closed');
  hideElementOnESC(basketPopup, 'popup--closed');
  // hideElementOnClickOutside(outsideSpace, searchPopup, 'popup--closed');
});

let screen = 0;
const interfaceList = ['index-body--pink', 'index-body--blue', 'index-body--yellow'];

nextButton.addEventListener('click', () => {
  const sliderItems = document.querySelectorAll('.slider__item');
  let saved = sliderItems[0];
  sliderItems[0].remove();
  sliderItems[1].classList.remove('slider__item--inactive');
  saved.classList.add('slider__item--inactive');
  sliderList.append(saved);
  for (let j = 0; j <= interfaceList.length - 1; j++) {
    body.classList.remove(interfaceList[j]);
    buttonList[j].querySelector('.marker-list__button').classList.remove('marker-list__button--active');
  }
  if (screen == 2) {
    screen = -1;
    body.classList.add(interfaceList[screen + 1]);
    buttonList[screen + 1].querySelector('.marker-list__button').classList.add('marker-list__button--active');
    screen++;
  } else {
    body.classList.add(interfaceList[screen + 1]);
    buttonList[screen + 1].querySelector('.marker-list__button').classList.add('marker-list__button--active');
    screen++;
  }
});

previousButton.addEventListener('click', () => {
  const sliderItems = document.querySelectorAll('.slider__item');
  let saved = sliderItems[sliderItems.length - 1];
  sliderItems[sliderItems.length - 1].remove();
  sliderItems[sliderItems.length - 1].classList.remove('slider__item--inactive');
  sliderItems[0].classList.add('slider__item--inactive');
  sliderList.prepend(saved);
  for (let j = 0; j <= interfaceList.length - 1; j++) {
    body.classList.remove(interfaceList[j]);
    buttonList[j].querySelector('.marker-list__button').classList.remove('marker-list__button--active');
  }
  if (screen == 0) {
    screen = 3;
    body.classList.add(interfaceList[screen - 1]);
    buttonList[screen - 1].querySelector('.marker-list__button').classList.add('marker-list__button--active');
    screen--;
  } else {
    body.classList.add(interfaceList[screen - 1]);
    buttonList[screen - 1].querySelector('.marker-list__button').classList.add('marker-list__button--active');
    screen--;
  }
});


const slides = document.querySelectorAll('.slider__item');
for (let i = 0; i <= (buttonList.length - 1); i++) {
  buttonList[i].addEventListener('click', () => {
    const sliderCircle = buttonList[i].querySelector('.marker-list__button');
    const slideArray = [];
    for (let z = 0; z <= slides.length - 1; z++) {
      slideArray.push(slides[z]);
    }
    const reshuffledArray = sliderSorting(slideArray, i);

    for (let j = 0; j <= interfaceList.length - 1; j++) {
      body.classList.remove(interfaceList[j]);
      buttonList[j].querySelector('.marker-list__button').classList.remove('marker-list__button--active');
    }
    body.classList.add(interfaceList[i]);
    sliderCircle.classList.add('marker-list__button--active');

    if (i !== screen) {
      screen = i;
      for (let k = 0; k <= slides.length - 1; k++) {
        slides[k].remove();
      };
      reshuffledArray.forEach(element => element.classList.remove('slider__item--inactive'));
      for (let m = 1; m <= reshuffledArray.length - 1; m++) {
        reshuffledArray[m].classList.add('slider__item--inactive');
      };
      for (let l = 0; l <= reshuffledArray.length - 1; l++) {
        sliderList.append(reshuffledArray[l]);
      };
    };
    console.log(screen);
  });
};

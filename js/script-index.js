const body = document.querySelector('body');
const contactsPopup = document.querySelector('.contacts__popup');
const toggleButton = document.querySelector('.contacts__button');
const outsideSpace = document.querySelector('.popup__container');
const menuButton = document.querySelector('.header-menu__catalogue');
const menuText = document.querySelector('.text-catalogue');
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
  if (!menuText.classList.contains('header-menu__text--selected')) {
    menuPopup.classList.remove('popup--closed');
    menuText.classList.add('header-menu__text--selected');
  } else {
    menuPopup.classList.add('popup--closed');
    menuText.classList.remove('header-menu__text--selected');
  }
  hideElementOnESC(menuPopup, 'popup--closed', menuText, 'header-menu__text--selected');
  // hideElementOnClickOutside(outsideSpace, searchPopup, 'popup--closed');
});

searchButton.addEventListener('click', function () {
  if (!searchButton.classList.contains('header__search-container--selected')) {
    searchPopup.classList.remove('popup--closed');
    if (!loginPopup.classList.contains('popup--closed')) {
      loginPopup.classList.add('popup--closed')
      loginButton.classList.remove('header__login-container--selected')
    };
    if (!basketPopup.classList.contains('popup--closed')) {
      basketPopup.classList.add('popup--closed')
      basketPopup.classList.remove('header__basket-container--selected')
    };
    searchButton.classList.add('header__search-container--selected')
  } else {
    searchPopup.classList.add('popup--closed');
    searchButton.classList.remove('header__search-container--selected')
  }
  hideElementOnESC(searchPopup, 'popup--closed', searchButton, 'header__search-container--selected');
  // hideElementOnClickOutside(outsideSpace, searchPopup, 'popup--closed');
});

loginButton.addEventListener('click', function () {
  if (!loginButton.classList.contains('header__login-container--selected')) {
    loginPopup.classList.remove('popup--closed');
    if (!searchPopup.classList.contains('popup--closed')) {
      searchPopup.classList.add('popup--closed')
      searchButton.classList.remove('header__search-container--selected')
    };
    if (!basketPopup.classList.contains('popup--closed')) {
      basketPopup.classList.add('popup--closed')
      basketButton.classList.remove('header__basket-container--selected')
    };
    loginButton.classList.add('header__login-container--selected')
  } else {
    loginPopup.classList.add('popup--closed');
    loginButton.classList.remove('header__login-container--selected')
  }
  hideElementOnESC(loginPopup, 'popup--closed', loginButton, 'header__login-container--selected');
  // hideElementOnClickOutside(outsideSpace, searchPopup, 'popup--closed');
});

basketButton.addEventListener('click', function () {
  if (!basketButton.classList.contains('header__basket-container--selected')) {
    basketPopup.classList.remove('popup--closed');
    if (!searchPopup.classList.contains('popup--closed')) {
      searchPopup.classList.add('popup--closed')
      searchButton.classList.remove('header__search-container--selected')
    };
    if (!loginPopup.classList.contains('popup--closed')) {
      loginPopup.classList.add('popup--closed')
      loginButton.classList.remove('header__login-container--selected')
    };
    basketButton.classList.add('header__basket-container--selected')
  } else {
    basketPopup.classList.add('popup--closed');
    basketButton.classList.remove('header__basket-container--selected')
  };
  hideElementOnESC(basketPopup, 'popup--closed', basketButton, 'header__basket-container--selected');
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

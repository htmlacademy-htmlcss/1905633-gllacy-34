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
const scrollCover = document.querySelector('.index-body__scroll-cover');

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

const childnessCheck = (elementChild, elementParent) => {
  while (elementChild.parentElement !== null) {
    if (elementChild.parentElement == elementParent) {
      return true;
    } else {
      elementChild = elementChild.parentElement;
    }
  }
  return false;
}

const hideElementOnESC = (element, hideClass, button, highlightedClass) => {
  const callbackOnEsc = (evt) => {
    if (evt.key === 'Escape') {
      element.classList.add(hideClass);
      body.classList.remove('stop-scrolling');
      scrollCover.classList.add('visually-hidden');
      button.classList.remove(highlightedClass);
      document.removeEventListener('keydown', callbackOnEsc);
    }
  };
  document.addEventListener('keydown', callbackOnEsc);
};

const hideElementOnButtonClick = (element, hideClass) => {
  const button = element.querySelector('.popup__close-button');
  button.addEventListener('click', (evt) => {
    evt.preventDefault();
    element.classList.add(hideClass);
    body.classList.remove('stop-scrolling');
    scrollCover.classList.add('visually-hidden');
  });
};

if (body.classList.contains('index-body')) {
  toggleButton.addEventListener('click', function () {
    const popupWindow = document.querySelector('.popup__window');
    body.classList.add('stop-scrolling');
    scrollCover.classList.remove('visually-hidden');
    contactsPopup.classList.remove('popup--closed');
    hideElementOnESC(contactsPopup, 'popup--closed');
    hideElementOnButtonClick(contactsPopup, 'popup--closed');
    if (!contactsPopup.classList.contains('popup--closed')) {
      contactsPopup.addEventListener('click', (evt) => {
        if (evt.target == popupWindow || childnessCheck(evt.target, popupWindow)) {
          evt.stopPropagation();
        } else {
          contactsPopup.classList.add('popup--closed');
          body.classList.remove('stop-scrolling');
          scrollCover.classList.add('visually-hidden');
        }
      })
    }
  });
}


menuButton.addEventListener('click', function (evt) {
  if (!menuText.classList.contains('header-menu__text--selected')) {
    menuPopup.classList.remove('popup--closed');
    menuText.classList.add('header-menu__text--selected');
  } else {
    if (evt.target == menuPopup || childnessCheck(evt.target, menuPopup)) {
      evt.stopPropagation();
    } else {
      menuPopup.classList.add('popup--closed');
      menuText.classList.remove('header-menu__text--selected');
    }
  }
  hideElementOnESC(menuPopup, 'popup--closed', menuText, 'header-menu__text--selected');
});

searchButton.addEventListener('click', function (evt) {
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
    if (evt.target == searchPopup || childnessCheck(evt.target, searchPopup)) {
      evt.stopPropagation();
    } else {
      searchPopup.classList.add('popup--closed');
      searchButton.classList.remove('header__search-container--selected')
    }
  }
  hideElementOnESC(searchPopup, 'popup--closed', searchButton, 'header__search-container--selected');
});

loginButton.addEventListener('click', function (evt) {
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
    if (evt.target == loginPopup || childnessCheck(evt.target, loginPopup)) {
      evt.stopPropagation();
    } else {
      loginPopup.classList.add('popup--closed');
      loginButton.classList.remove('header__login-container--selected')
    }
  }
  hideElementOnESC(loginPopup, 'popup--closed', loginButton, 'header__login-container--selected');
});

basketButton.addEventListener('click', function (evt) {
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
    if (evt.target == basketPopup || childnessCheck(evt.target, basketPopup)) {
      evt.stopPropagation();
    } else {
      basketPopup.classList.add('popup--closed');
      basketButton.classList.remove('header__basket-container--selected')
    }
  };
  hideElementOnESC(basketPopup, 'popup--closed', basketButton, 'header__basket-container--selected');
});

if (body.classList.contains('index-body')) {
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
}

// const clickManager = () => {
//   document.addEventListener('click', (evt) => {
//     console.log(evt.target);
//   })
// }

// clickManager();

// const searchInnerButton = document.querySelector('.header__search-button');
// const hideElementOnClickOutside = (popupElement, popupOpenButton, hideClass) => {
//   if (!popupElement.classList.contains(hideClass)) {
//     document.addEventListener ('click', (evt) => {
//       console.log("123");
//       if (evt.target !== popupElement && evt.target !== popupOpenButton) {
//         popupElement.classList.add(hideClass);
//       }
//     })
//   }
// };

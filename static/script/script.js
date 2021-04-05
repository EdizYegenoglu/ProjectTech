// hamburger menu
const navbar = document.querySelector('header nav');
const ham = document.querySelector('header button');
const hamClose = document.querySelector('header ul li');
const x = document.getElementById('overlayDing');

ham.addEventListener('click', toggleHamburger);
hamClose.addEventListener('click', toggleHamburger);
x.addEventListener('click', toggleHamburger);

// hamburger menu in en uit klappen
function toggleHamburger() {
  navbar.classList.toggle('showNav');
  ham.classList.toggle('showClose');
  hamClose.classList.toggle('showClose');
}

const menuLinks = document.querySelectorAll('.menuLink');

menuLinks.forEach(function (menuLink) {
  menuLink.addEventListener('click', toggleHamburger);
});

// overlay ding
ham.addEventListener('click', myFunction);
hamClose.addEventListener('click', myFunction);
x.addEventListener('click', myFunction);

const body = document.querySelector('body');

function myFunction() {
  if (x.style.display === 'block') {
    x.style.display = 'none';
    body.style.overflowY = 'scroll';
  } else {
    x.style.display = 'block';
    body.style.overflowY = 'hidden';
  }
}

// dropdown inmenu/
const dropDown = document.querySelector('nav ul li ul');
const pijl = document.querySelector('nav ul li svg');

pijl.addEventListener('click', toggleDropDown);

function toggleDropDown() {
  if (dropDown.style.display === 'block') {
    dropDown.style.display = 'none';
    pijl.style.transform = 'rotate(0deg)';
  } else {
    dropDown.style.display = 'block';
    pijl.style.transform = 'rotate(180deg)';
    pijl.style.transition = '.6s';
  }
}

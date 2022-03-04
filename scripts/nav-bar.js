const navBarItems = [
  {
    title: "Home",
    icon: "home-outline",
    link: "#",
    id: "home",
  },
  {
    title: "Products",
    icon: "pricetag-outline",
    link: "#",
    id: "products",
  },
  {
    title: "About",
    icon: "people-outline",
    link: "#",
    id: "about",
  },
  {
    title: "Order",
    icon: "cart-outline",
    link: "#",
    id: "order",
  },
  {
    title: "Contact",
    icon: "call-outline",
    link: "#",
    id: "contact",
  },
];

const defaultActiveItemId = "products";
let currentActiveItemId = defaultActiveItemId;

function initNavBarItems(items) {
  const navBarListEl = document.getElementById("navBarList");
  const activeCircleIconEl = document.getElementById("activeCircleIcon");

  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    navBarListEl.innerHTML += `
            <a href="${item.link}" id="${item.id}" onmouseenter="placeActiveCircle('${item.id}')" onmouseleave="placeActiveCircle('${defaultActiveItemId}')">
                <li class="nav-bar__item" id="${item.id}Item">${item.title}</li>
            </a>
        `;
  }

  let item = navBarItems.filter((item) => item.id === currentActiveItemId)[0];
  activeCircleIconEl.innerHTML = `<ion-icon name="${item.icon}"></ion-icon>`;
}

function placeActiveCircle(elementId) {
  const navBarEl = document.getElementById("navBar");
  const linkEl = document.getElementById(elementId);
  const activeCircleEl = document.getElementById("activeCircle");
  const linkItemEl = document.getElementById(`${elementId}Item`);

  const navBarElLeftPosition = navBarEl.getBoundingClientRect().left;
  const linkElLeftPosition = linkEl.getBoundingClientRect().left;
  const linkElWidth = linkEl.getBoundingClientRect().width;
  const activeCircleElWidth = activeCircleEl.getBoundingClientRect().width;

  linkItemEl.classList.add("active");

  if (currentActiveItemId !== elementId) {
    const previousActiveNavBarEl = document.getElementById(
      `${currentActiveItemId}Item`
    );
    const activeCircleIconEl = document.getElementById("activeCircleIcon");

    previousActiveNavBarEl.classList.remove("active");

    let item = navBarItems.filter((item) => item.id === elementId)[0];
    activeCircleIconEl.innerHTML = `<ion-icon name="${item.icon}"></ion-icon>`;
  }

  currentActiveItemId = elementId;

  const distanceFromStart =
    linkElLeftPosition -
    navBarElLeftPosition +
    linkElWidth / 2 -
    activeCircleElWidth / 2;
  activeCircleEl.style.marginLeft = `${distanceFromStart}px`;
}

initNavBarItems(navBarItems);
placeActiveCircle(currentActiveItemId);

setTimeout(() => {
  const activeCircleEl = document.getElementById("activeCircle");
  activeCircleEl.style.transition = "margin-left ease-in-out 0.3s";
}, 0);

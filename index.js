const pagination = document.querySelector('#pagination')
const productlist = document.querySelector("#productlist");
let currenpage = 1
let itemsPage = 6
let allProducts = []

const observer = new MutationObserver(mutations => {
  mutations.forEach(mutation => {
    if (mutation.type === "childList") {
      console.log("Товар добавлен")
    }
  })

})

const config = { childList: true }
observer.observe(productlist, config)

function getAllFunc() {
  fetch("https://fakestoreapi.com/products")
    .then((res) => res.json())
    .then((products) => {
      allProducts = products
      renderPage(currenpage)
      createPagination()
    });
}
function createPagination() {
  pagination.innerHTML = ''
  let pageCount = allProducts.length / itemsPage
  for (let i = 1; i <= pageCount; i++) {
    const pageBtn = document.createElement('button')
    pageBtn.textContent = i
    pageBtn.addEventListener('click', () => {
      currenpage = i
      renderPage(currenpage)
    })
    pagination.appendChild(pageBtn)
  }
}
getAllFunc();
function renderPage(page) {
  productlist.innerHTML = ''
  const startIndex = (page - 1) * itemsPage
  const endIndex = startIndex + itemsPage
  let productsTooRender = allProducts.slice(startIndex, endIndex)
  productsTooRender.forEach(product => {
    renderItem(product)
  })
}
function renderItem(product) {
  const listItem = document.createElement("div");
  productlist.appendChild(listItem);

  const imgItem = document.createElement("img");
  imgItem.src = product.image;
  listItem.appendChild(imgItem);

  const deleteItem = document.createElement("button");
  deleteItem.innerHTML = "&#x2715;";
  deleteItem.className = "btn";
  listItem.appendChild(deleteItem);

  const deleteBtns = document.querySelectorAll(".btn");

  deleteBtns.forEach((btn) => {
    btn.addEventListener("click", deleteFunction);
  });

  const titleItem = document.createElement("h2");
  titleItem.innerHTML = product.title;
  listItem.appendChild(titleItem);

  const descItem = document.createElement("h3");
  descItem.innerHTML = product.description;
  listItem.appendChild(descItem);

  const priceItem = document.createElement("h2");
  priceItem.innerHTML = `price: ${product.price} $`;
  listItem.appendChild(priceItem);
}
function deleteFunction() {
  fetch("https://fakestoreapi.com/products/5", {
    method: "DELETE",
  })
    .then((res) => res.json())
    .then((json) => console.log(json));
}
const addBtn = document.querySelector("#addBtn");
addBtn.addEventListener("click", addBtnFunc);

function addBtnFunc() {
  fetch("https://fakestoreapi.com/products", {
    method: "POST",
    body: JSON.stringify({
      title: document.querySelector("#title").value,
      price: document.querySelector("#price").value,
      description: document.querySelector("#description").value,
      category: document.querySelector("#category").value,
    }),
  })
    .then((res) => res.json())
    .then((json) => console.log(json));
}

const itemsPerPage = 3;
const container = document.querySelector("#container");
const items = document.querySelectorAll(".item");
const pagination = document.querySelector("#pagination");

let currentPage = 1;

export function showPage(page) {
  let startIndex = (page - 1) * itemsPerPage;
  let endIndex = startIndex + itemsPerPage;
  for (let i = 0; i < items.length; i++) {
    if (i >= startIndex && i < endIndex) {
      items[i].style.display = "block";
    } else {
      items[i].style.display = "none";
    }
  }
}

export function createPagination() {
  for (let i = 0; i < items.length / itemsPerPage; i++) {
    let pageNumber = i + 1;
    let pageLink = document.createElement("a");
    pageLink.href = "#";
    pageLink.textContent = pageNumber;
    pageLink.addEventListener("click", function () {
      currentPage = pageNumber;
      showPage(currentPage);
    });
    pagination.appendChild(pageLink);
  }
}

showPage(currentPage);
createPagination();
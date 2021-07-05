(function () {
  let onlineStatus = window.navigator.onLine;
  let jsonUrl =
    "https://raw.githubusercontent.com/Rajavasanthan/jsondata/master/pagenation.json";
  let jsonTempData = "data.json";
  jsonUrl = onlineStatus ? jsonUrl : jsonTempData;
  let xhrObj = new XMLHttpRequest();
  xhrObj.onload = function () {
    const jsonData = JSON.parse(this.response);
    createTableData(jsonData);
    createPagination(jsonData);
  };
  xhrObj.open("GET", jsonUrl, true);
  xhrObj.send();
})();

function createElement(ele, className, content) {
  let element = document.createElement(ele);
  className ? (element.className = className) : null;
  content ? (element.innerText = content) : null;
  return element;
}

let container, table, thead, tbody, buttonContainer, tr1, th1, th2, th3;
let first, previous, sessionPage;

container = createElement("div", "container");
document.body.append(container);

table = createElement("table", "table");
buttonContainer = createElement("div", "button-container");
container.append(table, buttonContainer);

thead = createElement("thead");
tbody = createElement("tbody");
table.append(thead, tbody);

tr1 = createElement("tr");
thead.append(tr1);

th1 = createElement("th", false, "ID");
th2 = createElement("th", false, "Name");
th3 = createElement("th", false, "Email");
thead.append(th1, th2, th3);

first = createElement("span", "button", "First");
previous = createElement("span", "button", "Previous");
buttonContainer.append(first, previous);

function createTableData(data, page = 0) {
  let tr2, td1, td2, td3;
  let recordsPerPage = 10;
  let starting = page ? (page - 1) * recordsPerPage : 0;
  let length = page ? starting + 10 : recordsPerPage;
  page ? (tbody.innerHTML = "") : null;
  for (let key = starting; key < length; key++) {
    let { id, name, email } = data[key];
    tr2 = createElement("tr");
    tbody.append(tr2);
    td1 = createElement("td", false, id);
    td2 = createElement("td", false, name);
    td3 = createElement("td", false, email);
    tr2.append(td1, td2, td3);
  }

  sessionStorage.setItem("page", page);
}

function createPagination(data) {
  let totalPages = data.length / 10;
  previous.addEventListener("click", () => {
    let temp = sessionStorage.getItem("page");
    temp = temp - 1 || 1;
    createTableData(data, parseInt(temp));
  });
  first.addEventListener("click", () => createTableData(data, 1));
  for (let key = 0; key < totalPages; key++) {
    let span,
      page = key + 1;
    span = createElement("span", "button", page);
    span.addEventListener("click", () => {
      createTableData(data, page);
    });
    buttonContainer.append(span);
  }
}

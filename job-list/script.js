const clearBtn = document.getElementById("clearFilter");
const itemParent = document.getElementById("itemList");
const filterParent = document.getElementById("filters");
const filterContent = document.getElementById("filterContent");

let data;
let filter = [];

window.addEventListener("load", async () => {
  await fetch("data.json")
    .then((res) => res.json())
    .then((v) => (data = v))
    .catch((err) => console.log(err));
  loadData();
});

const loadData = () => {
  data.forEach((e) => {
    if (filter.length > 0) {
      let founds = 0;
      filter.forEach((f, i) => [e.role, e.level, ...e.tools, ...e.languages].includes(f) && founds++);
      if (founds === filter.length) createItem(e);
    } else createItem(e);
  });
  if (filter.length > 0) {
    filter.forEach((e) => createFilter(e));
  }
};

function reloadData() {
  itemParent.innerHTML = null;
  filterParent.innerHTML = null;
  console.log(filterContent);
  if (!filter.length > 0) filterContent.classList.add("hidden");
  else filterContent.classList.remove("hidden");
  loadData();
}

const createItem = (cont) => {
  const _filters = [cont.role, cont.level, ...cont.languages, ...cont.tools];
  let _filterString = "";

  const container = `
    <div class="itemContent${cont.new ? " new" : ""}">
      <div class="accImage">
        <img src="${cont.logo}" alt="${cont.company}">
      </div>
      <div class="infoAccount">
        <span class="nameContent">
          <span class="name">${cont.company}</span>
          ${cont.new ? '<span class="new">NEW!</span>' : ""}
          ${cont.new ? '<span class="featured">FEATURED</span>' : ""}
        </span>
        <span class="details">
          ${cont.position}
        </span>
        <span class="extras">
          ${cont.postedAt} <span>·</span> ${cont.contract} <span>·</span> ${cont.location}
        </span>
      </div>
      <hr>
      <div class="filters">${_filters.map((f) => {
        _filterString += `<span class="filterAccount" onclick="addFilter('${f.toString()}')">${f}</span>`;
        if (_filters[_filters.length - 1] === f) return _filterString;
      })}</div>
    </div>
  `;

  itemParent.innerHTML += container.replaceAll(",", "");
};

const createFilter = (filt) => {
  const container = `
    <div class="filterItem">
      <span class="title">${filt}</span>
      <span class="remove" onclick="removeFilter('${filt}')"><img src="images/icon-remove.svg" alt="Remove filters" /></span>
    </div>
  `;

  filterParent.innerHTML += container.replaceAll(",", "");
};

function addFilter(f) {
  if (filter.includes(f)) return
  filter.push(f)
  reloadData();
}

function removeFilter(f) {
  filter = filter.filter((e) => e !== f);
  reloadData();
}

clearBtn.addEventListener("click", () => {
  filter = [];
  reloadData();
});
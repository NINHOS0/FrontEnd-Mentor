
let jobList;
getJSON().then((data) => {
  jobList = data;
  createComponent()
});
async function getJSON(){
    let json = await fetch("./data.json")
    .then((res) => res.json());
    return json;
}

function getTags(element) {
    let tags = [];
    tags.push(element.role);
    tags.push(element.level);
    element.languages.forEach(v => tags.push(v));
    element.tools.forEach(v => tags.push(v));
    return tags;
}

function createComponent() {
  document.querySelector(".jobList").innerHTML = ''.trim();
  let jobsComponent = ''.trim();

  jobList.forEach(job => {
    const tags = getTags(job)
    
    if (filter.length > 0 && !inFilter(tags)) return;
    
    let tagsComponent = "";
    tags.forEach(element => {
        tagsComponent += `<span class="tag" onclick="setFilter('${element}')">${element}</span> \n`;
    });
    
    jobsComponent += `
    <div class="item">
    <img src="${job.logo}" alt="Logo ${job.company}" class="company-img">
    <div class="description">
    <div class="top-desc">
    <span class="company">${job.company}</span>
    ${(job.new) && '<span class="new">new!</span>' || "".trim()}
    ${(job.featured) && '<span class="featured">featured</span>' || "".trim()}
    </div>
    <div class="mid-desc">
    <span class="title">${job.position}</span>
    </div>
    <div class="bottom-desc"> ${job.postedAt} <span class="dot"></span> ${job.contract} <span class="dot"></span> ${job.location} </div>
    </div>
    <hr>
    <div class="tags">
    ${tagsComponent.trim()}
    </div>
    </div>`;
  }) 
  document.querySelector(".jobList").innerHTML = jobsComponent;
};

const filter = [];
function setFilter(filter_){
  if (filter.indexOf(filter_) != -1) return;
  filter.push(filter_);
  updateFilter();
  if (filter.length === 1) document.querySelector(".filter-container").classList.remove("hidden");
;}

function removeFilter(filter_){
  filter.splice(filter.indexOf(filter_), 1);
  updateFilter();
  if (filter.length === 0) document.querySelector(".filter-container").classList.add("hidden");
}

function clearFilter(){
  filter.splice(0, filter.length);
  updateFilter()
  document.querySelector(".filter-container").classList.add("hidden");
}

function inFilter(data){
  let i = 0
  for (let index = 0; index < data.length; index++) {
    const element = data[index];
    if (filter.includes(element)) {
      i++;
    };
  };
  if (filter.length === i) return true;
  else return false;
}

function updateFilter() {
  let filterComp = ""
  filter.map(element => {
    filterComp += `
      <div class="filter">
        <span class="f-name">${element}</span>
        <span class="f-btn" onclick="removeFilter('${element}')">
          <img src="images/icon-remove.svg" alt="Remove filter">
        </span>
      </div>`;
  });
  document.querySelector(".filters").innerHTML = filterComp;
  createComponent()
}
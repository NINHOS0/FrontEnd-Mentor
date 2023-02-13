async function getJSON(){
    let json = await fetch("./data.json")
    .then((res) => {return res.json()})
    .then((res_) => res_);
    return json;
}

getJSON().then((json) => {
    json.forEach(element => {
        createComponent(element);
    });
});

function createComponent(comp) {
    console.log(comp);
};
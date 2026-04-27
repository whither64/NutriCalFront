const { token } = require("morgan");
const nutr = require("../../routes/nutrical");

window.onload = init;
var headers = {};
var url = "http://localhost:3000";

function init() {
    if(localStorage.getItem("token")) {
        token = localStorage.getItem("token")
        headers = {
            headers: {
                'Authorization' : 'bearer' + localStorage.getItem("token")
            }
        }
    }
    else {
        window.location.href = "index.html";
    }
}

function loadNutrical() {
    axios.get(url + "/nutrical", headers)
    .then(function(res) {
        console.log(res);
        displayPokemon(res.data.message);
    }).catch(function(err) {
        console.log(err)
    })
}

function displayNutrical(nutrical) {
    var body = document.querySelector("body");
    for(var i = 0; i < nutrical.length; i++) {
        body.innerHTML += `<h3>${nutrical[i].nut_name}</h3>`
    }
}
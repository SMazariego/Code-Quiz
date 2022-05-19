var highScore = document.querySelector("#highScore");
var reset = document.querySelector("#reset");
var returns = document.querySelector("#returns");


reset.addEventListener("click", function () {
    localStorage.reset();
    location.reload();
});

var allScores = localStorage.getItem("allScores");
allScores = JSON.parse(allScores);

if (allScores !== null) {

    for (var i = 0; i < allScores.length; i++) {

        var createLi = document.createElement("li");
        createLi.textContent = allScores[i].initials + " " + allScores[i].score;
        highScore.appendChild(createLi);

    }
}

returns.addEventListener("click", function () {
    window.location.replace("./index.html");
});

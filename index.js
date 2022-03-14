storedTracker = localStorage.getItem("tracker")
if (storedTracker) {
    storedTracker = JSON.parse(storedTracker)

    let dateArray = Date().split(" ");
    let currTime = dateArray[4];

    let sec = hmsToSecondsOnly(currTime);

    let leftTime = (storedTracker.trackerTime - (sec - storedTracker.startTime))
    setTimeout(function() {
        console.log("Times up");
        localStorage.clear()
        var audio = new Audio('sound/fire_pager_alert_bee.mp3');
        audio.play();
        alert("your screen time is over!!! go and take rest..");

    }, leftTime * 1000)
}

let height = document.getElementById("height");
let weight = document.getElementById("weight");
let bmiText = document.getElementById("bmiText");
let bmiButton = document.getElementById("bmiButton");
let sleepText = document.getElementById("sleepText");
let sleepButton = document.getElementById("sleepButton");
let sleepInput = document.getElementById("sleepInput");
let screenTimeButton = document.getElementById("screenTimeButton");
let screenTimeInput = document.getElementById("screenTimeInput");
let calWeight = document.getElementById("calWeight");
let calHeight = document.getElementById("calHeight");
let age = document.getElementById("age");
let activity = document.getElementById("activity");
let calButton = document.getElementById("calButton");


calButton.addEventListener("click", function() {
    let BMR = 655.0955 + (9.5634 * calWeight.value) + (1.8496 * calHeight.value * 100) - (4.6756 * age.value);

    let calories;

    if (activity == "Little to no exercise") {
        calories = BMR * 1.2;

    } else if (activity == "Light exercise (1–3 days per week)") {
        calories = BMR * 1.375;
    } else if (activity == "Moderate exercise (3–5 days per week)") {
        calories = BMR * 1.55;
    } else if (activity == "Heavy exercise (6–7 days per week)") {
        calories = BMR * 1.725;
    } else {
        calories = BMR * 1.9;
    }
    calText.innerText = calories + " " + "Kcal/day";

})

bmiButton.addEventListener("click", function(event) {

    let bmi = (weight.value / ((height.value) * (height.value)));
    bmi = bmi.toFixed(2)



    let category;

    if (bmi < 18.5)
        category = "You are underweight. Put on some healthy calories!";
    else if (bmi > 18.5 && bmi < 24.9)
        category = "You are healthy. Going strong!";
    else if (bmi > 25 && bmi < 29.9)
        category = "You are slightly overweight. But don't worry, a healthy diet and exercise can fix everything.";
    else
        category = "It's high time to improve your lifestyle!";

    console.log(bmi, category);
    bmiText.innerText = bmi + " " + category;
})

var convertSeconds = function(sec) {
    sec = sec % 86400;
    var hrs = Math.floor(sec / 3600);
    var min = Math.floor((sec - (hrs * 3600)) / 60);
    var seconds = sec - (hrs * 3600) - (min * 60);
    seconds = Math.round(seconds * 100) / 100

    var result = (hrs < 10 ? "0" + hrs : hrs);
    result += ":" + (min < 10 ? "0" + min : min);
    return result;
}



sleepButton.addEventListener("click", function(event) {
    let inputTime = sleepInput.value + ':00';
    console.log(inputTime);
    var a = inputTime.split(':');

    var seconds = (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2]);
    let times = [];

    for (let i = 1; i <= 6; i++) {
        times.push(seconds + i * 5400);
    }

    for (let i = 0; i < 6; i++) {
        times[i] = convertSeconds(times[i]);
    }

    console.log(times);

    let str = "You should wake up at: \n \n "
    for (x in times) {
        if (x != times.length - 1)
            str += times[x] + " or "
        else
            str += times[x];
    }
    sleepText.innerText = str;

})

function hmsToSecondsOnly(str) {
    var p = str.split(':'),
        s = 0,
        m = 1;

    while (p.length > 0) {
        s += m * parseInt(p.pop(), 10);
        m *= 60;
    }

    return s;
}


screenTimeButton.addEventListener("click", function(event) {
    let time = "00:" + screenTimeInput.value + ":00";

    let dateArray = Date().split(" ");
    let startTime = dateArray[4];

    let sec = hmsToSecondsOnly(startTime);
    let inputSeconds = hmsToSecondsOnly(time);

    let tracker = {
        startTime: sec,
        trackerTime: inputSeconds
    }
    localStorage.setItem("tracker", JSON.stringify(tracker))
    console.log(sec);
    console.log(inputSeconds);

    setTimeout(function() {
        localStorage.clear()
        console.log("Times up");
        
        var audio = new Audio('sound/fire_pager_alert_bee.mp3');
        audio.play();
        
    }, inputSeconds * 1000);





})
const firebaseConfig = {
    apiKey: "AIzaSyDTFUKrYHccbm_oLluMDagkgTuoQS1PmMY",
    authDomain: "web-dht11-87d1a.firebaseapp.com",
    databaseURL: "https://web-dht11-87d1a-default-rtdb.firebaseio.com",
    projectId: "web-dht11-87d1a",
    storageBucket: "web-dht11-87d1a.appspot.com",
    messagingSenderId: "4466665731",
    appId: "1:4466665731:web:737e1a816049e77409e136",
    measurementId: "G-6HP308J839",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Realtime Database and get a reference to the service
const database = firebase.database();

// ======= Fan =======
var btnOn = document.getElementById("fan_on");
var btnOff = document.getElementById("fan_off");

btnOn.onclick = function () {
    //document.getElementById("fan").src = "./assets/img/fan_on.svg";

    database.ref("/Do An 1").update({
        Relay: 1,
    });
};

btnOff.onclick = function () {
    //document.getElementById("fan").src = "./assets/img/fan_off.svg";

    database.ref("/Do An 1").update({
        Relay: 0,
    });
};

//get temp from firebase (auto update when data changes)
database.ref("/Do An 1/Nhiet do").on("value", function (snapshot) {
    if (snapshot.exists()) {
        var temp = snapshot.val();
        document.getElementById("nhietdo").innerHTML = temp;
    } else console.log("No data available!");
});

//get humidity from firebase (auto update when data changes)
database.ref("/Do An 1/Do am").on("value", function (snapshot) {
    if (snapshot.exists()) {
        var temp = snapshot.val();
        document.getElementById("doam").innerHTML = temp;
    } else console.log("No data available!");
});

//auto update img
database.ref("/Do An 1/Relay").on("value", function (snapshot) {
    if (snapshot.exists()) {
        var relay = snapshot.val();
        if (relay == 1)
            document.getElementById("fan").src = "./assets/img/fan_on.svg";
        else document.getElementById("fan").src = "./assets/img/fan_off.svg";
    } else console.log("No data available!");
});

//get data once
database
    .ref("/Do An 1")
    .get()
    .then((snapshot) => {
        if (snapshot.exists()) console.log(snapshot.val());
        else console.log("No data available!");
    });

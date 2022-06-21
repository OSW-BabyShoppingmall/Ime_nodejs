//지도
var map;
var markerdata;
var marker = new Array;
var value;
function myMap() {
    markerdata = [
        new google.maps.LatLng(36.62563026275683, 127.4544004838527), //과건물
        new google.maps.LatLng(36.63426936439814, 127.48757506306855), //성안길점
        new google.maps.LatLng(36.642919630018554, 127.42666365026183), //지웰시티점
    ];

    var mapCanvas = document.getElementById("map");
    var myCenter = new google.maps.LatLng(36.629324678692065, 127.45740173322012); //충북대중앙
    var mapOptions = {
        center: myCenter,
        zoom: 13
    };
    map = new google.maps.Map(mapCanvas, mapOptions);



    var infocontent = [
        "chungbuk university brach", "Seongangil brach", "gwell city brach"
    ]


    for (var i = 0; i < markerdata.length; i++) {
        marker[i] = new google.maps.Marker({
            position: markerdata[i],
            map: map
        });

        infowindow = new google.maps.InfoWindow({
            content: infocontent[i],
        });
        infowindow.open(map, marker[i]);
    }
    marker[0].addListener('click', () => {
        map.setZoom(18);
        map.setCenter(markerdata[0]);
        show_explain(0);
        value=0;
    });
    marker[1].addListener('click', () => {
        map.setZoom(18);
        map.setCenter(markerdata[1]);
        show_explain(1);
        value=1;
    });
    marker[2].addListener('click', () => {
        map.setZoom(18);
        map.setCenter(markerdata[2]);
        show_explain(2);
        value=2;
    });
}

//사용자 위치 정보
const API_KEY = "";

function onGeOk(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
    fetch(url).then(response => response.json()).then(data => {
        const weather = document.querySelector("#weather span:first-child");
        const city = document.querySelector("#weather span:last-child");
    })
    var user_location = new google.maps.LatLng(lat, lon)
    var user_marker = new google.maps.Marker({
        position: user_location,
        map: map
    });
    var user_near;
    var x = new Array;
    x[0] = Math.sqrt((36.62563026275683 - lat) ** 2 + (127.4544004838527 - lon) ** 2);
    x[1] = Math.sqrt((36.63426936439814 - lat) ** 2 + (127.48757506306855 - lon) ** 2);
    x[2] = Math.sqrt((36.642919630018554 - lat) ** 2 + (127.42666365026183 - lon) ** 2);

    if (x[0] < x[1]) {
        if (x[0] < x[2]) {
            user_near = markerdata[0];
        }
        else if (x[0] > x[2]) {
            user_near = markerdata[2];
        }
    }
    else if (x[1] < x[0]) {
        if (x[1] < x[2]) {
            user_near = markerdata[1];
        }
        else if (x[1] > x[2]) {
            user_near = markerdata[2];
        }
    }
    var near_path = new google.maps.Polyline({
        path: [user_location, user_near],
        strokeColor: "yellow",
        strokeOpacity: 0.8,
        strokeWeight: 2
    })
    near_path.setMap(map);
};

function onGeoError() {
    alert("Can't find you. No position with you");
}


var locate_info = [
    ["../img/s4-1.jpg", "Chungbuk", "1, Chungdae-ro, Seowon-gu, Cheongju-si, Chungcheongbuk-do, Republic of Korea", "000-000-0000", "10:00AM ~ 06:00PM", "index.html",0],
    ["../img/seongangil.jpg", "SeongAngil", "66, Sangdang-ro, Sangdang-gu, Cheongju-si, Chungcheongbuk-do, Republic of Korea", "111-111-1111", "10:00AM ~ 06:00PM", "index.html",1],
    ["../img/gwellcity.jpg", "GwellCity", "43, Daenong-ro, Heungdeok-gu, Cheongju-si, Chungcheongbuk-do, Republic of Korea", "222-222-2222", "10:00AM ~ 06:00PM", "index.html",2]
];

function show_explain(n) {   
    var x = document.getElementsByClassName("col-sm-4");
    x[0].style.visibility = "visible";
    var x = document.querySelectorAll("img.explain");
    x[0].src = locate_info[n][0];
    var x = document.querySelectorAll("h1.explain");
    x[0].innerHTML = locate_info[n][1];

    var x = document.querySelectorAll("h3.glyphicon");
    x[0].innerHTML = locate_info[n][2];
    x[1].innerHTML = locate_info[n][3];
    x[2].innerHTML = locate_info[n][4];
    x[3].innerHTML = locate_info[n][5];
    return n;
}

function left(){
    value-=1;
    if(value<0){
        value=2;
    }
    var x = document.getElementsByClassName("col-sm-4");
    x[0].style.visibility = "visible";
    var x = document.querySelectorAll("img.explain");
    x[0].src = locate_info[value][0];
    var x = document.querySelectorAll("h1.explain");
    x[0].innerHTML = locate_info[value][1];

    var x = document.querySelectorAll("h3.glyphicon");
    x[0].innerHTML = locate_info[value][2];
    x[1].innerHTML = locate_info[value][3];
    x[2].innerHTML = locate_info[value][4];
    x[3].innerHTML = locate_info[value][5];
    map.setCenter(18);
    map.setCenter(markerdata[value]);
}

function right(){
    value+=1;
    if(value>2){
        value=0;
    }
    var x = document.getElementsByClassName("col-sm-4");
    x[0].style.visibility = "visible";
    var x = document.querySelectorAll("img.explain");
    x[0].src = locate_info[value][0];
    var x = document.querySelectorAll("h1.explain");
    x[0].innerHTML = locate_info[value][1];

    var x = document.querySelectorAll("h3.glyphicon");
    x[0].innerHTML = locate_info[value][2];
    x[1].innerHTML = locate_info[value][3];
    x[2].innerHTML = locate_info[value][4];
    x[3].innerHTML = locate_info[value][5];
    map.setCenter(18);
    map.setCenter(markerdata[value]);
}
$(function () {
  // AOS ANIMATION
  AOS.init();

  // About_Carousel
  $('.owl-carousel').owlCarousel({
    stagePadding: 50,
    loop: true,
    margin: 30,
    nav: false,
    autoplay: true,
    autoplayTimeout: 2000,
    autoplayHoverPause: true,
    responsive: {
      0: {
        items: 1
      },
      768: {
        items: 2
      },
      992: {
        items: 3
      }
    }
  });
})

// navbar-collapse-hide
$('.js-scroll-trigger').click(function () {
  $('.navbar-collapse').collapse('hide');
});

// SCHEDULE
$("#Muscle_Sculpting").click(function () {
  let weeklytd = $("#table td:nth-child(n+2)")

  weeklytd.each(function (e) {
    let cName = $("#table td:nth-child(n+2)")[e].innerHTML
    let Muscle_Sculpting = '<img class="mx-2" src="./images/SCHEDULE/Muscle_Sculpting.png" alt="">體態雕塑'

    if (cName == Muscle_Sculpting) {
      $(this).toggleClass(false);
      $(this).toggleClass("scheduleChange");
    } else {
      $(this).toggleClass(false);
    }
  })
});

$("#Pilates").click(function () {
  let weeklytd = $("#table td:nth-child(n+2)")
  let Pilates = '<img class="mx-2" src="./images/SCHEDULE/Pilates.png" alt="">皮拉提斯'

  weeklytd.each(function (e) {
    let cName = $("#table td:nth-child(n+2)")[e].innerHTML
    if (cName == Pilates) {
      $(this).toggleClass(false);
      $(this).toggleClass("scheduleChange");
    } else {
      $(this).toggleClass(false);
    }
  })
});

$("#kettlebell").click(function () {
  let weeklytd = $("#table td:nth-child(n+2)")
  let kettlebell = '<img class="mx-2" src="./images/SCHEDULE/kettlebell.png" alt="">燃脂壺鈴'

  weeklytd.each(function (e) {
    let cName = $("#table td:nth-child(n+2)")[e].innerHTML
    if (cName == kettlebell) {
      $(this).toggleClass(false);
      $(this).toggleClass("scheduleChange");
    } else {
      $(this).toggleClass(false);
    }
  })
});

$("#Thump_Boxing").click(function () {
  let weeklytd = $("#table td:nth-child(n+2)")
  let Thump_Boxing = '<img class="mx-2" src="./images/SCHEDULE/Thump_Boxing.png" alt="">互動式拳擊'

  weeklytd.each(function (e) {
    let cName = $("#table td:nth-child(n+2)")[e].innerHTML
    if (cName == Thump_Boxing) {
      $(this).toggleClass(false);
      $(this).toggleClass("scheduleChange");
    } else {
      $(this).toggleClass(false);
    }
  })
});

$("#Body_Combat").click(function () {
  let weeklytd = $("#table td:nth-child(n+2)")
  let Body_Combat = '<img class="mx-2" src="./images/SCHEDULE/Body_Combat.png" alt="">戰鬥拳擊有氧'

  weeklytd.each(function (e) {
    let cName = $("#table td:nth-child(n+2)")[e].innerHTML
    if (cName == Body_Combat) {
      $(this).toggleClass(false);
      $(this).toggleClass("scheduleChange");
    } else {
      $(this).toggleClass(false);
    }
  })
});

$("#TRX").click(function () {
  let weeklytd = $("#table td:nth-child(n+2)")
  let TRX = '<img class="mx-2" src="./images/SCHEDULE/TRX.png" alt="">TRX'

  weeklytd.each(function (e) {
    let cName = $("#table td:nth-child(n+2)")[e].innerHTML
    if (cName == TRX) {
      $(this).toggleClass(false);
      $(this).toggleClass("scheduleChange");
    } else {
      $(this).toggleClass(false);
    }
  })
});


// Google map
// 設定Location
function Location(name, address, tel, lat, lng) {
  this.name = name
  this.address = address
  this.tel = tel
  this.lat = lat
  this.lng = lng
  this.center = { lat: parseFloat(lat), lng: parseFloat(lng) }
}

// jQuery AJAX
function usejQuery() {
  $.ajax({
    url: "https://gist.githubusercontent.com/EuripidesLee/bb447ac85fc0996081b7b675767ced10/raw/53dc371b03d1cb6b6000e48b9eb063a9fe4b210c/GYM.json",
    success: function (result) {
      let jsonString = result;
      let jsonObj = JSON.parse(jsonString);
      let records = []
      jsonObj["records"].forEach(function (rd) {
        records.push(new Location(rd.name, rd.address, rd.tel, rd.lat, rd.lng))
      })
      pinMarkersCluster(records)
    }
  });
}
window.onload = function () {
  usejQuery()
}


// google map 開啟預設位子
let map;
let currentPosition;

function initMap() {
  let center = { lat: 23.9742, lng: 120.9798 }
  map = new google.maps.Map(document.getElementById("map"), {
    center: center,
    zoom: 7,
  });

  // 取得當前位子
  navigator.geolocation.getCurrentPosition(function (position) {
    currentPosition = {
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    }
    map.setCenter(currentPosition);
    map.setZoom(15);
    new google.maps.Marker({
      position: currentPosition,
      map: map,
      title: "Your Location",
      icon: {
        path: google.maps.SymbolPath.CIRCLE,
        fillColor: '#f13a11',
        fillOpacity: 1,
        strokeColor: '#FFFFFF',
        strokeWeight: 2,
        scale: 10
      }
    });
  });
}


// 標記
function pinMarkersCluster(records) {
  let markers = [];
  let infowindow = new google.maps.InfoWindow(); // 只建立一個 infowindow 物件
  records.forEach(function (rd) {
    let marker = new google.maps.Marker({
      position: rd.center,
      map: map,
    });
    marker.set('title', rd.name); // 設定標記的標題
    marker.set('address', rd.address); // 設定標記的地址
    marker.set('tel', rd.tel); // 設定標記的電話號碼
    markers.push(marker);

    marker.addListener("click", function () {
      let contentString =
        "<div><h3>" +
        marker.get('title') +
        "</h3><p>" +
        marker.get('address') +
        "</p><p>" +
        marker.get('tel') +
        "</p></div>";
      infowindow.setContent(contentString); // 更新 infowindow 的內容
      infowindow.open(map, marker);
    });
  });
  // 叢林標記
  new markerClusterer.MarkerClusterer({ markers, map })
}

window.initMap = initMap;

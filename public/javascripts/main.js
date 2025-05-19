const mapOptions = {
    center: new naver.maps.LatLng(37.3595704, 127.105399),
    zoom: 10
};

const map = new naver.maps.Map('map', mapOptions);

const data = [
  {
    title: "서울역",
    address: "서울",
    lat: 37.52,
    lng: 126.94
  }
]

let markerList = [];
let infowindowList = [];

const getClickHandler = (i) => () => {
  const marker = markerList[i];
  const infowindow = infowindowList[i];
  if (infowindow.getMap()){
    infowindow.close();
  }
  else{
    infowindow.open(map, marker);
  }
}

const getClickMap = (i) => () => {
  const infowindow = infowindowList[i];
  infowindow.close();
}

for(let i in data) {
  const target = data[i];
  const latlng = new naver.maps.LatLng(target.lat, target.lng);

  let marker = new naver.maps.Marker({
    map: map,
    position: latlng,
    icon: {
      content : `<div class="marker"></div>`,
      anchor : new naver.maps.Point(7.5,7.5),
    },
  });

  const content = `
    <div class="infowindow_wrap">
      <div class="infowindow_title">${target.title}</div>
      <div class="infowindow_address">${target.address}</div>
    </div>
  `;

  const infowindow = new naver.maps.InfoWindow({
    content : content,
    backgroundColor : "#00ff0000",
    borderColor : "#00ff0000",
    anchorSize : new naver.maps.Size(0,0),  //정보창 화살표 크기, (0,0)으로 지우기
  });

  markerList.push(marker);
  infowindowList.push(infowindow);
}

for(let i = 0, ii = markerList.length; i<ii; i++){
  naver.maps.Event.addListener(markerList[i], "click", getClickHandler(i));
  naver.maps.Event.addListener(map, "click", getClickMap(i));
}
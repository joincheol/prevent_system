const mapOptions = {
    center: new naver.maps.LatLng(37.3595704, 127.105399),
    zoom: 10
};

const map = new naver.maps.Map('map', mapOptions);

$.ajax({
  url: "/location",
  type: "GET"
}).done((response) => {
  if(response.message !== "success") return;
  const data = response.data;

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
  };

  const getClickMap = (i) => () => {
    const infowindow = infowindowList[i];
    infowindow.close();
  }

  for(let i in data) {
    const target = data[i];
    const latlng = new naver.maps.LatLng(target.lat, target.lng);

    // status 값에 따라 클래스 결정
    let markerColorClass = '';
    switch (target.status) {
      case '병해충':
        markerColorClass = 'marker-green';
        break;
      case '구제역':
        markerColorClass = 'marker-yellow';
        break;
      case '아프리카돼지열병':
        markerColorClass = 'marker-red';
        break;
      case '조류인플루엔자':
        markerColorClass = 'marker-blue';
        break;
      default:
        markerColorClass = 'marker-default';
        break;
    }

    let marker = new naver.maps.Marker({
      map: map,
      position: latlng,
      icon: {
        content : `<div class="marker ${markerColorClass}"></div>`,
        anchor : new naver.maps.Point(7.5,7.5),
      },
    });

    const content = `
    <div class="infowindow_wrap">
      <div class="infowindow_title">${target.title}</div>
      <div class="infowindow_status">${target.status}</div>
      <div class="infowindow_status">${target.count}</div>
      <div class="infowindow_status">${target.date}</div>
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
});
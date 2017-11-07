var map;

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 4,
    center: {lat: -25.363, lng: 131.044}
  });

  renderMarkers();

  map.addListener('click', function(e) {
    var lat = e.latLng.lat();
    var lng = e.latLng.lng();    
    var id = 'id_' + Date.now() + lat.toFixed(2) + lng.toFixed(2);
    generateMarker(lat, lng, id);    
  });  
}

function getMarkersFromLocalStorage() {
  return localStorage.markers ? JSON.parse(localStorage.markers) : {};
};

function addMarkerToLocalStorage(lat, lng, id) {
  var markers = getMarkersFromLocalStorage();
  markers[id] = {
    lat: lat, 
    lng: lng
  };
  localStorage.markers = JSON.stringify(markers);
};

function removeMarkerFromLocalStorage(id) {
  console.log('removeMarkerFromLocalStorage');
  var markers = getMarkersFromLocalStorage();
  delete markers[id];
  localStorage.markers = JSON.stringify(markers);
};

function renderMarkers() {
  var markers = getMarkersFromLocalStorage();  

  for(prop in markers) {
    generateMarker(markers[prop].lat, markers[prop].lng, prop);
  };
};

function generateMarker(lat, lng, id) {  
  var marker = new google.maps.Marker({
    position: {lat: lat, lng: lng},
    map: map
  }); 
  marker.id = id;
  addMarkerToLocalStorage(lat, lng, id);

  marker.addListener('rightclick', function(e) {
    var m = this;
    console.log(e, m['id']);    
    removeMarkerFromLocalStorage(m['id']);
    this.setMap(null);
  });   

};




// https://jsfiddle.net/xomena/fyma08ov/
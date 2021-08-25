mapboxgl.accessToken =
  "pk.eyJ1IjoidGhhcm1hcmFqYWhzYXJhbnlhbiIsImEiOiJja2prZWd5bXk4NXkxMnZyeDdiYmx3Y3hkIn0.nIXnL2eGNCig12T4QPFUmw";

const myLocation = navigator.geolocation.getCurrentPosition(
  successLocation,
  errorLocation,
  { enableHighAccuracy: true }
);

function successLocation(position) {
  console.log(position);
  setupMap([position.coords.longitude, position.coords.latitude]);
}

function errorLocation() {
  setupMap[(23, 34)];
}

function setupMap(center) {
  const map = new mapboxgl.Map({
    container: "map", // container ID
    style: "mapbox://styles/mapbox/streets-v11", // style URL
    // center: [-74.5, 40], // starting position [lng, lat]
    center: center,
    zoom: 14, // starting zoom
  });

  const nav = new mapboxgl.NavigationControl();
  map.addControl(nav, "top-left");
}

console.log(myLocation);

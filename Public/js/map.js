maptilersdk.config.apiKey = mapToken;
const map = new maptilersdk.Map({
  container: "map", // Container's Id or The HTML Element To Render The Map
  style: "streets-v2",
  center: [78.6569, 22.9734], // Starting Position [lng, lat]
  zoom: 3, // Starting Zoom
});

const marker = new maptilersdk.Marker({ color: "black" })
  .setLngLat([78.6569, 22.9734])
  .setPopup(new maptilersdk.Popup({ offset: 25 }).setHTML("<h5>Wlcome :)<h5>"))
  .addTo(map);

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const destinations = [
  { id: 1, name: "Srimangal Fountain, Bangladesh", coords: [24.3065, 91.7296] },
  { id: 2, name: "Bandarban Hill Tract, Bangladesh", coords: [21.8310, 92.3687] },
  { id: 3, name: "Cox's Bazar, Bangladesh", coords: [21.4272, 92.0058] },
  { id: 4, name: "Sundarbans Mangrove Forest, Bangladesh", coords: [21.9497, 89.1833] },
  { id: 5, name: "Rangamati, Bangladesh", coords: [22.4640, 92.1773] },
  { id: 6, name: "Sylhet Tea Gardens, Bangladesh", coords: [24.8944, 91.8272] },
  { id: 7, name: "Nafakhum Waterfall, Bangladesh", coords: [22.9833, 89.1333] },
  { id: 8, name: "Sreemangal, Bangladesh", coords: [24.3167, 91.7333] },
  { id: 9, name: "Dhaka City, Bangladesh", coords: [23.8103, 90.4125] },
  { id: 10, name: "Paharpur, Bangladesh", coords: [25.0612, 88.9435] }
];

const InteractiveMap = () => {
  return (
    <div className="bg-sky-200">
      <div className="text-2xl lg:text-3xl font-semibold mb-4 text-center">
        <h2>Interactive Map of Bangladesh: Must-Visit Spots</h2>
      </div>
      <MapContainer
      center={[23.685, 90.3563]} // Center of Bangladesh
      zoom={7} // Increased zoom to focus on Bangladesh
      style={{ height: "500px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {destinations.map((dest) => (
        <Marker key={dest.id} position={dest.coords}>
          <Popup>{dest.name}</Popup>
        </Marker>
      ))}
    </MapContainer>
    </div>
  );
};

export default InteractiveMap;

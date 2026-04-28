import { useEffect } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Site } from "@/data/sites";

const venueIcon = L.divIcon({
  className: "",
  html: `<div style="
    width:36px;height:36px;border-radius:50% 50% 50% 0;
    background:linear-gradient(135deg,hsl(28 100% 50%),hsl(42 100% 50%));
    transform:rotate(-45deg);box-shadow:0 4px 14px hsl(28 100% 50% / .5);
    display:flex;align-items:center;justify-content:center;border:2px solid #fff;">
    <span style="transform:rotate(45deg);font-size:16px;">🏟️</span>
  </div>`,
  iconSize: [36, 36],
  iconAnchor: [18, 36],
  popupAnchor: [0, -32],
});

const selectedVenueIcon = L.divIcon({
  className: "",
  html: `<div style="
    width:40px;height:40px;border-radius:50% 50% 50% 0;
    background:linear-gradient(135deg,hsl(16 100% 52%),hsl(42 100% 52%));
    transform:rotate(-45deg);box-shadow:0 8px 20px hsl(16 100% 50% / .55);
    display:flex;align-items:center;justify-content:center;border:3px solid #fff;">
    <span style="transform:rotate(45deg);font-size:18px;">📍</span>
  </div>`,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -34],
});

const userIcon = L.divIcon({
  className: "",
  html: `<div style="
    width:18px;height:18px;border-radius:50%;
    background:#2563eb;border:3px solid #fff;
    box-shadow:0 0 0 6px rgba(37,99,235,.25),0 2px 8px rgba(0,0,0,.25);"></div>`,
  iconSize: [18, 18],
  iconAnchor: [9, 9],
});

const Recenter = ({ center }: { center: [number, number] | null }) => {
  const map = useMap();
  useEffect(() => {
    if (center) map.flyTo(center, 14, { duration: 1.2 });
  }, [center, map]);
  return null;
};

const FitToMarkers = ({
  userPos,
  markers,
}: {
  userPos: [number, number] | null;
  markers: Site[];
}) => {
  const map = useMap();

  useEffect(() => {
    const points: [number, number][] = markers.map((s) => [s.lat, s.lng]);
    if (userPos) points.push(userPos);
    if (!points.length) return;

    if (points.length === 1) {
      map.flyTo(points[0], 13, { duration: 0.8 });
      return;
    }

    const bounds = L.latLngBounds(points);
    map.fitBounds(bounds, { padding: [28, 28], maxZoom: 13 });
  }, [map, markers, userPos]);

  return null;
};

type Props = {
  userPos: [number, number] | null;
  selected: Site | null;
  sites: Site[];
  onSelect: (s: Site) => void;
};

export const VenueMap = ({ userPos, selected, sites, onSelect }: Props) => {
  return (
    <MapContainer
      center={userPos ?? [14.7167, -17.3]}
      zoom={11}
      scrollWheelZoom={false}
      className="h-full w-full"
    >
      <TileLayer
        attribution='&copy; OpenStreetMap'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {userPos && (
        <Marker position={userPos} icon={userIcon}>
          <Popup>Vous êtes ici</Popup>
        </Marker>
      )}
      {sites.map((s) => (
        <Marker
          key={s.id}
          position={[s.lat, s.lng]}
          icon={selected?.id === s.id ? selectedVenueIcon : venueIcon}
          eventHandlers={{ click: () => onSelect(s) }}
        >
          <Popup>
            <div style={{ minWidth: 140 }}>
              <strong>{s.emoji} {s.nom}</strong>
              <div style={{ fontSize: 11, opacity: 0.7 }}>{s.sport}</div>
            </div>
          </Popup>
        </Marker>
      ))}
      <FitToMarkers userPos={userPos} markers={sites} />
      <Recenter center={selected ? [selected.lat, selected.lng] : null} />
    </MapContainer>
  );
};

import React, { useState } from "react";
import { GoogleMap, LoadScript, Marker, InfoWindow } from "@react-google-maps/api";
import { MapProps } from "../types/types";


const Map: React.FC<MapProps> = ({ style, locationVehicles }) => {

    const validVehicles = locationVehicles.filter((v) => {
        return typeof v.lat === "number" && typeof v.lng === "number";
    });

    const center = validVehicles.length
        ? { lat: validVehicles[0].lat, lng: validVehicles[0].lng }
        : { lat: -3.745, lng: -38.523 };

    const iconUrl = "/icons/caminhao.png";

    const [selectedVehicle, setSelectedVehicle] = useState<any | null>(null);

    return (
        <LoadScript googleMapsApiKey="AIzaSyDL2HgAFRCQspUr-X_ZSAqRmaZox7Gif-I">
            <GoogleMap
                mapContainerStyle={style || { width: "100%", height: "400px" }}
                center={center}
                zoom={10}
            >
                {validVehicles.map((vehicle) => (
                    <Marker
                        key={`location-${vehicle.id}-${vehicle.lat}-${vehicle.lng}`}
                        position={{ lat: vehicle.lat, lng: vehicle.lng }}
                        icon={{
                            url: iconUrl,
                            scaledSize: new window.google.maps.Size(32, 32),
                        }}
                        onClick={() => setSelectedVehicle(vehicle)}
                    />
                ))}

                {selectedVehicle ? (
                    <InfoWindow
                        position={{
                            lat: selectedVehicle.lat,
                            lng: selectedVehicle.lng,
                        }}
                        onCloseClick={() => setSelectedVehicle(null)}
                    >
                        <div>
                            <h4>{selectedVehicle.name}</h4>
                            <p><strong>Status:</strong> {selectedVehicle.ignition}</p>
                            <p><strong>Placa:</strong> {selectedVehicle.plate}</p>
                            <p><strong>Frota:</strong> {selectedVehicle.fleet}</p>
                            <p>
                                <a
                                    href={`https://www.google.com/maps?q=${selectedVehicle.lat},${selectedVehicle.lng}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{ color: '#002D44', textDecoration: 'underline' }}
                                >
                                    Ver no Google Maps
                                </a>
                            </p>
                        </div>
                    </InfoWindow>
                ) : null}
            </GoogleMap>
        </LoadScript>
    );
};

export default Map;

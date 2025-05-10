// src/types/types.ts

export interface Vehicle {
    id: string;
    plate: string;
    fleet: string | null;
    type: string;
    status: string;
    model: string;
    createdAt: string;
}

export interface LocationVehicle {
    id: string;
    fleet: string;
    plate: string;
    lat: number;
    lng: number;
    createdAt: string;
    ignition: string;
    name: string;
}



export interface VehiclesData {
    vehicles: Vehicle[];
    locationVehicles: LocationVehicle[];
    page: number;
    perPage: string;
    totalPages: number;
}
export interface Vehicle {
    id: string;
    plate: string;
    fleet: string | null;
    type: string;
    status: string;
    model: string;
    createdAt: string;
}

export interface VehicleTableProps {
    vehicles: Vehicle[];

}

export interface SearchComponentProps {
    onSearch: (plate: string, fleet: string, type: string) => void;
}

export interface MapProps {
    style?: React.CSSProperties;
    locationVehicles: any[];
}

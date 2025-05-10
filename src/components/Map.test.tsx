// src/components/Map.test.tsx
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Map from "./Map";

const mockLocationVehicles = [
    { lat: 40.7128, lng: -74.0060, id: 1 },
    { lat: 34.0522, lng: -118.2437, id: 2 },
];

describe("Map Component", () => {
    it("deve renderizar o mapa com os veículos", async () => {
        render(<Map locationVehicles={mockLocationVehicles} />);
        await waitFor(() => screen.getByText("Mapa"));
        expect(screen.getByText("Mapa")).toBeInTheDocument();
    });

    it("deve exibir o InfoWindow ao clicar em um marcador", async () => {
        render(<Map locationVehicles={mockLocationVehicles} />);
        await waitFor(() => screen.getByText("Marcador do veículo"));
        fireEvent.click(screen.getByText("Marcador do veículo"));
        expect(screen.getByText("InfoWindow aberto")).toBeInTheDocument();
    });

    it("deve fechar o InfoWindow ao clicar no botão de fechar", async () => {
        render(<Map locationVehicles={mockLocationVehicles} />);
        await waitFor(() => screen.getByText("Fechar InfoWindow"));
        fireEvent.click(screen.getByText("Fechar InfoWindow"));
        expect(screen.queryByText("InfoWindow aberto")).not.toBeInTheDocument();
    });
});

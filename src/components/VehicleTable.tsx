import React from "react";
import { VehicleTableProps } from "../types/types";

const VehicleTable: React.FC<VehicleTableProps> = ({ vehicles }) => {
    return (
        <div className="w-full overflow-x-auto overflow-y-auto">
            <table
                className="w-full min-w-full text-white text-sm"
                style={{
                    backgroundColor: "#001622",
                    width: "100%",
                    margin: "0 auto",
                    height: "100px",
                }}
            >
                <thead>
                    <tr style={{ color: "#FFFFFF" }}>
                        <th className="px-4 py-3 border-b text-left">Placa</th>
                        <th className="px-4 py-3 border-b text-left">Frota</th>
                        <th className="px-4 py-3 border-b text-left">Tipo</th>
                        <th className="px-4 py-3 border-b text-left">Modelo</th>
                        <th className="px-4 py-3 border-b text-left">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {vehicles.length > 0 ? (
                        vehicles.map((vehicle) => (
                            <tr
                                key={vehicle.id}
                                className="border-b"
                                style={{
                                    borderColor: "#002D44",
                                    color: "#C8C8C8",
                                    textAlign: "center",
                                }}
                            >
                                <td className="px-4 py-3">{vehicle.plate}</td>
                                <td className="px-4 py-3">{vehicle.fleet || '-'}</td>
                                <td className="px-4 py-3">{vehicle.type}</td>
                                <td className="px-4 py-3">{vehicle.model}</td>
                                <td className="px-4 py-3">{vehicle.status}</td>
                            </tr>
                        ))
                    ) : (
                        null
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default VehicleTable;

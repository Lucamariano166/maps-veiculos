import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Map from "./components/Map";
import VehicleTable from "./components/VehicleTable";
import SearchComponent from "./components/SearchComponent";
import useVehicles from "./hooks/useVehicles";
import { Vehicle } from './types/types';

const App: React.FC = () => {
  const perPage = 20;
  const [page, setPage] = useState(1);
  const [type, setType] = useState("tracked");
  const [plate, setPlate] = useState("");
  const [fleet, setFleet] = useState("");

  const [vehicles, setVehicles] = useState<Vehicle[]>([]);

  // Custom Hook para pegar os veículos
  const { data, refetch } = useVehicles(type, page, perPage, plate, fleet);

  const filterVehicles = (vehicles: Vehicle[]) => {
    const searchPlate = plate?.trim().toUpperCase().replace(/[-\s]/g, "");
    const searchFleet = fleet?.trim();

    return vehicles.filter((vehicle) => {
      const matchPlate = plate ? vehicle.plate?.replace(/[-\s]/g, "").toUpperCase() === searchPlate : true;
      const matchFleet = fleet ? vehicle.fleet === searchFleet : true;
      return matchPlate && matchFleet;
    });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
    }, 120000);

    return () => clearInterval(interval);
  }, [refetch]);

  useEffect(() => {
    if (data?.vehicles) {
      const filteredVehicles = filterVehicles(data.vehicles);

      if (page === 1) {
        setVehicles(filteredVehicles);
      } else {
        setVehicles((prev) => [...prev, ...filteredVehicles]);
      }
    }
  }, [data, plate, fleet, page]);

  const fetchMoreVehicles = () => {
    if (data && page < data.totalPages) {
      setPage((prev) => prev + 1);
    }
  };

  const handleSearch = (newPlate: string, newFleet: string, newType: string) => {
    setPage(1);
    setType(newType);
    setPlate(newPlate);
    setFleet(newFleet);
    setVehicles([]);
  };

  return (
    <div className="bg-black min-h-screen text-white flex flex-col w-full">
      <h3 style={{ color: "#FFFFFF", marginLeft: "70px" }}>Lucas Mariano</h3>
      <div style={{ height: "100px", width: "90%", margin: "0 auto" }}>
        <SearchComponent onSearch={handleSearch} />
      </div>
      <div className="flex flex-col h-screen bg-black text-white w-full" style={{ height: "100px", width: "90%", margin: "0 auto" }}>
        <div style={{ border: "2px solid #002D44", marginBottom: "20px", borderRadius: "8px" }}>
          <h3 style={{ color: "#FFFFFF", marginLeft: "70px" }}>Mapa rastreador</h3>
          <Map locationVehicles={data?.locationVehicles || []} />
        </div>
        <div
          id="scrollableDiv"
          className="overflow-x-auto h-[400px] w-full top-[70px] left-[1168px] rounded-[8px]"
          style={{
            background: "transparent",
            scrollbarWidth: "thin",
            scrollbarColor: "#002D44 transparent",
          }}
        >
          <InfiniteScroll
            dataLength={vehicles.length}
            next={fetchMoreVehicles}
            hasMore={!!data && page < data.totalPages}
            loader={<h4>Carregando...</h4>}

            scrollableTarget="scrollableDiv"
          >
            <VehicleTable vehicles={vehicles} />
          </InfiniteScroll>
        </div>
      </div>
    </div>
  );
};

export default App;

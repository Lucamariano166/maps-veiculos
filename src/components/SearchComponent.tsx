import React, { useState, useEffect } from "react";
import { SearchComponentProps } from "../types/types";


const SearchComponent: React.FC<SearchComponentProps> = ({ onSearch }) => {
    const [search, setSearch] = useState("");
    const [type, setType] = useState("tracked");

    useEffect(() => {
        handleSearch();
    }, [search, type]);

    const handleSearch = () => {
        const cleanedSearch = search.trim().toUpperCase().replace(/[-\s]/g, "");

        const isNewPlate = /^[A-Z]{3}[0-9][A-Z][0-9]{2}$/.test(cleanedSearch);
        const isOldPlate = /^[A-Z]{3}[0-9]{4}$/.test(cleanedSearch);
        const isPlate = isNewPlate || isOldPlate;
        const isFleet = /^\d+$/.test(cleanedSearch);

        if (isPlate) {
            onSearch(cleanedSearch, "", type);
        } else if (isFleet) {
            onSearch("", cleanedSearch, type);
        } else {
            onSearch("", "", type);
        }
    };


    const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setType(event.target.value);
    };

    return (
        <div className="bg-black p-4" style={{ marginTop: "50px" }}>
            <div className="flex items-center justify-between mb-6">
                <div style={{ display: "flex", alignItems: "center", color: "#FFFFFF" }}>
                    <span style={{ marginRight: "64px", marginLeft: "44px" }}>Lista</span>

                    <label style={{ display: "flex", alignItems: "center", marginRight: "6px" }}>
                        <input
                            type="radio"
                            value="tracked"
                            checked={type === "tracked"}
                            onChange={handleRadioChange}
                        />
                        Rastreados
                    </label>

                    <label style={{ display: "flex", alignItems: "center" }}>
                        <input
                            type="radio"
                            value="others"
                            checked={type === "others"}
                            onChange={handleRadioChange}
                        />
                        Outros
                    </label>
                </div>

                <div style={{
                    display: "flex",
                    alignItems: "center",
                    marginLeft: "auto",
                    justifyContent: "flex-end",
                }}>
                    <input
                        type="text"
                        placeholder="Pesquisar por placa ou frota"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        style={{
                            padding: "8px 16px",
                            border: "2px solid #0095E4",
                            borderRadius: "4px",
                            color: "#FFFFFF",
                            backgroundColor: "transparent",
                            width: "220px",
                        }}
                    />
                    <button
                        style={{
                            padding: "8px 16px",
                            backgroundColor: "#0095E4",
                            color: "#FFFFFF",
                            border: "none",
                            borderRadius: "4px",
                            cursor: "pointer",
                            marginLeft: "10px",
                        }}
                    >
                        Novo
                    </button>
                </div>
            </div>
            <div style={{ height: "2px", backgroundColor: "#002D44", width: "100%", marginTop: "50px" }} />
        </div>
    );
};

export default SearchComponent;

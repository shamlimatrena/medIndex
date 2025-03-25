import React, { useState, useEffect } from "react";

//Component section
import Header from "../components/Header";
import MedicineList from "../components/MedicineList";
import axios from "axios";

//Dummy Data
import Data from "../data/med.json";

// API Route
const API_URL = import.meta.env.VITE_API_URL;

const MedicineIndexApp = () => {
  const [medicines, setMedicines] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    //loading state
    setIsLoading(true);

    axios
      .get(API_URL)
      .then((response) => {
        setMedicines(response.data);
        localStorage.setItem("medicines", JSON.stringify(response.data));
      })
      .catch((error) => {
        console.error("Error fetching medicines:", error);

        const storedMedicines =
          JSON.parse(localStorage.getItem("medicines")) || [];
        setMedicines(storedMedicines);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const filteredMedicines = medicines.filter(
    (med) =>
      med.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      med.genericName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Header
        isAdmin={isAdmin}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      <MedicineList
        filteredMedicines={filteredMedicines}
        isAdmin={isAdmin}
        isLoading={isLoading}
      />
    </>
  );
};

export default MedicineIndexApp;

import React, { useState, useEffect } from "react";

//Component section
import Header from "../components/Header";
import MedicineList from "../components/MedicineList";

//Dummy Data
import Data from "../data/med.json";

const MedicineIndexApp = () => {
  const [medicines, setMedicines] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const storedMedicines =
      JSON.parse(localStorage.getItem("medicines")) || Data;
    setMedicines(storedMedicines);
    localStorage.setItem("medicines", JSON.stringify(storedMedicines));
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

      <MedicineList filteredMedicines={filteredMedicines} isAdmin={isAdmin} />
    </>
  );
};

export default MedicineIndexApp;

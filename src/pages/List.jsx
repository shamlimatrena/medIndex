import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Grid2,
} from "@mui/material";

const dummyMedicines = [
  {
    name: "Paracetamol",
    genericName: "Acetaminophen",
    manufacturer: "ABC Pharma",
    description: "Pain reliever and fever reducer",
    price: "$5",
    batchNumber: "12345",
  },
  {
    name: "Ibuprofen",
    genericName: "Ibuprofen",
    manufacturer: "XYZ Pharma",
    description: "Anti-inflammatory pain reliever",
    price: "$8",
    batchNumber: "67890",
  },
  {
    name: "Amoxicillin",
    genericName: "Amoxicillin",
    manufacturer: "MediCorp",
    description: "Antibiotic for bacterial infections",
    price: "$12",
    batchNumber: "11223",
  },
  {
    name: "Cetirizine",
    genericName: "Cetirizine Hydrochloride",
    manufacturer: "HealthPlus",
    description: "Antihistamine for allergies",
    price: "$6",
    batchNumber: "44556",
  },
  {
    name: "Metformin",
    genericName: "Metformin Hydrochloride",
    manufacturer: "DiabetiCare",
    description: "Medication for type 2 diabetes",
    price: "$15",
    batchNumber: "77889",
  },
];

const MedicineIndexApp = () => {
  const [medicines, setMedicines] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const storedMedicines =
      JSON.parse(localStorage.getItem("medicines")) || dummyMedicines;
    setMedicines(storedMedicines);
    localStorage.setItem("medicines", JSON.stringify(storedMedicines));
  }, []);

  const handleAddMedicine = () => {
    const newMedicine = {
      name: "New Medicine",
      genericName: "Generic Name",
      manufacturer: "Unknown",
      description: "Description here",
      price: "$0",
      batchNumber: "00000",
    };
    const updatedMedicines = [...medicines, newMedicine];
    setMedicines(updatedMedicines);
    localStorage.setItem("medicines", JSON.stringify(updatedMedicines));
  };

  const filteredMedicines = medicines.filter(
    (med) =>
      med.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      med.genericName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div style={{ padding: "20px" }}>
        <Typography variant="h4" gutterBottom>
          Medicine Index
        </Typography>
        <div
          style={{
            position: "sticky",
            top: 0,
            background: "white",
            zIndex: 1000,
            paddingBottom: "10px",
          }}
        >
          <TextField
            fullWidth
            label="Search by name or generic name..."
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ marginBottom: "20px" }}
          />
          {isAdmin && (
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddMedicine}
              style={{ marginBottom: "20px" }}
            >
              Add Medicine
            </Button>
          )}
        </div>
        <Grid2 container spacing={3}>
          {filteredMedicines.map((med, index) => (
            <Grid2 item xs={12} sm={6} md={4} key={index}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h6">{med.name}</Typography>
                  <Typography>
                    <strong>Generic Name:</strong> {med.genericName}
                  </Typography>
                  <Typography>
                    <strong>Manufacturer:</strong> {med.manufacturer}
                  </Typography>
                  <Typography>
                    <strong>Description:</strong> {med.description}
                  </Typography>
                  <Typography>
                    <strong>Price:</strong> {med.price}
                  </Typography>
                  <Typography>
                    <strong>Batch Number:</strong> {med.batchNumber}
                  </Typography>
                </CardContent>
              </Card>
            </Grid2>
          ))}
        </Grid2>
      </div>
    </>
  );
};

export default MedicineIndexApp;

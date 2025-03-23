import React, { useState, useEffect } from "react";

//Component section
import Header from "../components/Header";
import MedicineList from "../components/MedicineList";
import MedicineFormDialog from "../components/MedicineFormDialog";
import DeleteConfirmationDialog from "../components/DeleteConfirmationDialog";
import Notification from "../components/Notification";

//Dummy Data
import Data from "../data/med.json";

const initialFormValues = {
  id: "",
  name: "",
  genericName: "",
  manufacturer: "",
  description: "",
  price: "",
  batchNumber: "",
  image: "",
};

const MedicineIndexApp = () => {
  const [medicines, setMedicines] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [formValues, setFormValues] = useState(initialFormValues);
  const [isAdmin, setIsAdmin] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [deleteConfirmation, setDeleteConfirmation] = useState({
    open: false,
    medicineId: null,
  });

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

  const handleDialogOpen = (isEdit = false, medicine = null) => {
    if (isEdit && medicine) {
      setFormValues(medicine);
      setIsEditing(true);
      setPreviewUrl(medicine.image);
    } else {
      setFormValues({
        ...initialFormValues,
        id: Date.now().toString(),
      });
      setIsEditing(false);
      setPreviewUrl("");
    }
    setImageFile(null);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFormValues({
      ...formValues,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveMedicine = async () => {
    try {
      let imagePath = formValues.image;

      if (imageFile) {
        // In a real app, you would upload the file to your server here
        // For this example, we'll simulate saving the file by generating a path

        /*
        
        const fileName = `med_${Date.now()}_${imageFile.name.replace(
          /\s+/g,
          "_"
        )}`;
        imagePath = `/img/${fileName}`;
        
        */

        const options = ["napa1", "napa2", "lumona"];
        const randomString =
          options[Math.floor(Math.random() * options.length)];

        imagePath = `src/img/${randomString}.jpg`;

        // In a real application, you would do something like this:
        // const formData = new FormData();
        // formData.append('image', imageFile);
        // await fetch('/api/upload', { method: 'POST', body: formData });

        console.log(`Image would be saved to: ${imagePath}`);
        // For demonstration purposes, we're just setting the path without actually saving the file
      }

      const updatedFormValues = {
        ...formValues,
        image: imagePath || "/img/default-medicine.jpg",
      };

      let updatedMedicines;

      if (isEditing) {
        updatedMedicines = medicines.map((med) =>
          med.id === formValues.id ? updatedFormValues : med
        );
      } else {
        updatedMedicines = [...medicines, updatedFormValues];
      }

      setMedicines(updatedMedicines);
      localStorage.setItem("medicines", JSON.stringify(updatedMedicines));
      handleDialogClose();

      setSnackbar({
        open: true,
        message: isEditing
          ? "Medicine updated successfully!"
          : "Medicine added successfully!",
        severity: "success",
      });
    } catch (error) {
      console.error("Error saving medicine:", error);
      setSnackbar({
        open: true,
        message: "Error saving medicine. Please try again.",
        severity: "error",
      });
    }
  };

  const handleDeleteConfirm = (id) => {
    setDeleteConfirmation({
      open: true,
      medicineId: id,
    });
  };

  const handleDeleteCancel = () => {
    setDeleteConfirmation({
      open: false,
      medicineId: null,
    });
  };

  const handleDeleteMedicine = () => {
    const id = deleteConfirmation.medicineId;
    const updatedMedicines = medicines.filter((med) => med.id !== id);
    setMedicines(updatedMedicines);
    localStorage.setItem("medicines", JSON.stringify(updatedMedicines));
    setSnackbar({
      open: true,
      message: "Medicine deleted successfully!",
      severity: "success",
    });
    setDeleteConfirmation({
      open: false,
      medicineId: null,
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <>
      <Header
        isAdmin={isAdmin}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        handleDialogOpen={handleDialogOpen}
      />

      <MedicineList
        filteredMedicines={filteredMedicines}
        isAdmin={isAdmin}
        handleDialogOpen={handleDialogOpen}
        handleDeleteConfirm={handleDeleteConfirm}
      />

      <MedicineFormDialog
        dialogOpen={dialogOpen}
        handleDialogClose={handleDialogClose}
        isEditing={isEditing}
        formValues={formValues}
        handleInputChange={handleInputChange}
        handleImageChange={handleImageChange}
        imageFile={imageFile}
        previewUrl={previewUrl}
        handleSaveMedicine={handleSaveMedicine}
      />

      <DeleteConfirmationDialog
        open={deleteConfirmation.open}
        handleDeleteCancel={handleDeleteCancel}
        handleDeleteMedicine={handleDeleteMedicine}
      />

      <Notification
        snackbar={snackbar}
        handleCloseSnackbar={handleCloseSnackbar}
      />
    </>
  );
};

export default MedicineIndexApp;

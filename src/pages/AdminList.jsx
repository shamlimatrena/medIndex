import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

//Component section
import Header from "../components/Header";
import MedicineList from "../components/MedicineList";
import MedicineFormDialog from "../components/MedicineFormDialog";
import DeleteConfirmationDialog from "../components/DeleteConfirmationDialog";
import Notification from "../components/Notification";
import LoginPopup from "../components/LoginPopup";

import axios from "axios";

// API Route
const API_URL = import.meta.env.VITE_API_URL;

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
  const [isAdmin, setIsAdmin] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [authHeader, setAuthHeader] = useState("");
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [deleteConfirmation, setDeleteConfirmation] = useState({
    open: false,
    medicineId: null,
  });

  const navigate = useNavigate();

  useEffect(() => {
    const storedIsAdmin = sessionStorage.getItem("isAdmin");
    if (storedIsAdmin === "true") {
      setIsAdmin(true);
    }

    //Creds
    const encodedAuth = sessionStorage.getItem("adminAuth");
    const decodedAuth = atob(encodedAuth);
    const [storedUsername, storedPassword] = decodedAuth.split(":::");

    const storedAuthHeader =
      "Basic " + btoa(`${storedUsername}:${storedPassword}`);
    setAuthHeader(storedAuthHeader);

    if (!storedIsAdmin || !encodedAuth) {
      setShowLoginPopup(true);
    }

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
      });
  }, [navigate]);

  const handleCloseLogin = () => {
    const isNowAdmin = sessionStorage.getItem("isAdmin") === "true";

    if (!isNowAdmin) {
      navigate("/");
    } else {
      setIsAdmin(true);
    }

    setShowLoginPopup(false);
  };

  const filteredMedicines = medicines.filter(
    (med) =>
      med.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      med.genericName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDialogOpen = (isEdit = false, medicine = null) => {
    if (isEdit && medicine) {
      setFormValues(medicine);
      setIsEditing(true);
      setPreviewUrl(medicine.image_url);
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
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveMedicine = async () => {
    try {
      const formData = new FormData();
      formData.append("name", formValues.name);
      formData.append("genericName", formValues.genericName);
      formData.append("manufacturer", formValues.manufacturer);
      formData.append("batchNumber", formValues.batchNumber);
      formData.append("description", formValues.description);
      formData.append("price", formValues.price);

      if (imageFile) {
        formData.append("image", imageFile);
      }

      let response;

      if (isEditing) {
        response = await axios.put(`${API_URL}${formValues.id}/`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: authHeader,
          },
        });
      } else {
        response = await axios.post(API_URL, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: authHeader,
          },
        });
      }

      const newMedicine = response.data;

      setMedicines((prevMedicines) =>
        isEditing
          ? prevMedicines.map((med) =>
              med.id === formValues.id ? newMedicine : med
            )
          : [...prevMedicines, newMedicine]
      );

      localStorage.setItem(
        "medicines",
        JSON.stringify(
          isEditing
            ? medicines.map((med) =>
                med.id === formValues.id ? newMedicine : med
              )
            : [...medicines, newMedicine]
        )
      );

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

  const handleDeleteMedicine = async () => {
    try {
      const id = deleteConfirmation.medicineId;

      await axios.delete(`${import.meta.env.VITE_API_URL}${id}/`, {
        headers: {
          Authorization: authHeader,
        },
      });

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
    } catch (error) {
      console.error("Error deleting medicine:", error);
      setSnackbar({
        open: true,
        message: "Error deleting medicine. Please try again.",
        severity: "error",
      });
    }
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

      {showLoginPopup && (
        <LoginPopup
          openLogin={showLoginPopup}
          handleCloseLogin={handleCloseLogin}
        />
      )}
    </>
  );
};

export default MedicineIndexApp;

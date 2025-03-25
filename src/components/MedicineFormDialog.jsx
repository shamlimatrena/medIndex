import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    FormHelperText,
    Input,
    TextField,
    Typography,
  } from "@mui/material";
  import UploadIcon from "@mui/icons-material/Upload";
  
  const MedicineFormDialog = ({
    dialogOpen,
    handleDialogClose,
    isEditing,
    formValues,
    handleInputChange,
    handleImageChange,
    imageFile,
    previewUrl,
    handleSaveMedicine,
    isLoadingButton,
  }) => {
    return (
      <Dialog
        open={dialogOpen}
        onClose={handleDialogClose}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          {isEditing ? "Edit Medicine" : "Add New Medicine"}
        </DialogTitle>
        <DialogContent>
          <Box
            sx={{
              display: "flex",
              mt: 2,
              flexDirection: { xs: "column", md: "row" },
            }}
          >
            <Box sx={{ flex: 1, pr: { md: 2 } }}>
              <TextField
                fullWidth
                margin="dense"
                name="name"
                label="Medicine Name"
                value={formValues.name}
                onChange={handleInputChange}
              />
              <TextField
                fullWidth
                margin="dense"
                name="genericName"
                label="Generic Name"
                value={formValues.genericName}
                onChange={handleInputChange}
              />
              <TextField
                fullWidth
                margin="dense"
                name="manufacturer"
                label="Manufacturer"
                value={formValues.manufacturer}
                onChange={handleInputChange}
              />
              <TextField
                fullWidth
                margin="dense"
                name="price"
                label="Price"
                type="number"
                value={formValues.price}
                onChange={handleInputChange}
              />
              <TextField
                fullWidth
                margin="dense"
                name="batchNumber"
                label="Batch Number"
                value={formValues.batchNumber}
                onChange={handleInputChange}
              />
            </Box>
            <Box sx={{ flex: 1, mt: { xs: 2, md: 0 } }}>
              <TextField
                fullWidth
                margin="dense"
                name="description"
                label="Description"
                multiline
                rows={4}
                value={formValues.description}
                onChange={handleInputChange}
              />
              <FormControl fullWidth margin="dense">
                <Typography variant="subtitle2" gutterBottom>
                  Medicine Image
                </Typography>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  sx={{ display: "none" }}
                  id="image-upload"
                />
                <label htmlFor="image-upload">
                  <Button
                    variant="outlined"
                    component="span"
                    startIcon={<UploadIcon />}
                    fullWidth
                  >
                    Upload Image
                  </Button>
                </label>
                <FormHelperText>
                  {imageFile ? `Selected: ${imageFile.name}` : "No file selected"}
                </FormHelperText>
                {previewUrl && (
                  <Box sx={{ mt: 2, textAlign: "center" }}>
                    <img
                      src={previewUrl}
                      alt="Medicine preview"
                      style={{
                        maxWidth: "100%",
                        maxHeight: "150px",
                        objectFit: "contain",
                      }}
                    />
                  </Box>
                )}
              </FormControl>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleSaveMedicine}
            loading={isLoadingButton}
            color="primary"
            variant="contained"
            disabled={!formValues.name}
          >
            {isEditing ? "Update" : "Save"}
          </Button>
        </DialogActions>
      </Dialog>
    );
  };
  
  export default MedicineFormDialog;
  
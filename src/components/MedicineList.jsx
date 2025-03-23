import { Box, Container, Typography, Grid2 } from "@mui/material";
import MedicineCard from "./MedicineCard";

const MedicineList = ({
  filteredMedicines,
  isAdmin,
  handleDialogOpen,
  handleDeleteConfirm,
}) => {
  return (
    <Box
      sx={{
        position: "fixed",
        top: "200px", // Push below header
        left: 0,
        right: 0,
        bottom: 0,
        overflowY: "auto",
        padding: "20px",
      }}
    >
      <Container maxWidth="lg">
        <Grid2 container spacing={5} justifyContent="center">
          {filteredMedicines.length > 0 ? (
            filteredMedicines.map((item, index) => (
              <Grid2 key={index}>
                <MedicineCard
                  medicine={item}
                  isAdmin={isAdmin}
                  onEdit={() => handleDialogOpen(true, item)}
                  onDelete={() => handleDeleteConfirm(item.id)}
                />
              </Grid2>
            ))
          ) : (
            <Typography
              variant="h6"
              sx={{ mt: 4, textAlign: "center", width: "100%" }}
            >
              No medicines found. Try a different search or add a new medicine.
            </Typography>
          )}
        </Grid2>
      </Container>
    </Box>
  );
};

export default MedicineList;

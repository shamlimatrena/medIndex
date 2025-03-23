import React from "react";
import {
  Card,
  CardContent,
  Typography,
  CardMedia,
  CardActionArea,
  IconButton,
  Box,
} from "@mui/material";
import {
  Search as SearchIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  LocalPharmacy as MedicineIcon,
} from "@mui/icons-material";

const MedicineCard = ({ medicine, isAdmin, onEdit, onDelete }) => {
  return (
    <Card
      sx={{
        maxWidth: 300,
        minWidth: 300,
        minHeight: 300,
        borderRadius: 3,
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        transition: "0.3s",
        "&:hover": {
          boxShadow: "0 6px 20px rgba(0,0,0,0.2)",
          transform: "translateY(-4px)",
        },
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          height="160"
          image={medicine.image}
          alt={medicine.name}
          sx={{ borderTopLeftRadius: 12, borderTopRightRadius: 12 }}
        />
        <CardContent sx={{ padding: 2, userSelect: "text" }}>
          <Typography
            gutterBottom
            variant="h6"
            component="div"
            sx={{ fontWeight: "bold" }}
          >
            {medicine.name}
          </Typography>
          <Typography
            variant="subtitle2"
            sx={{ color: "text.secondary", mb: 1 }}
          >
            {medicine.genericName} | {medicine.manufacturer}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary", mb: 1 }}>
            {medicine.description}
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: "primary.main", fontWeight: 600 }}
          >
            Unit Price: {medicine.price}
          </Typography>
          <Typography
            variant="caption"
            sx={{ display: "block", color: "text.disabled", mt: 0.5 }}
          >
            Batch #{medicine.batchNumber}
          </Typography>
        </CardContent>
      </CardActionArea>
      {isAdmin && (
        <Box sx={{ mt: 1, display: "flex", justifyContent: "flex-end" }}>
          <IconButton
            size="small"
            color="primary"
            onClick={() => onEdit(medicine)}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            size="small"
            color="error"
            onClick={() => onDelete(medicine.id)}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      )}
    </Card>
  );
};

export default MedicineCard;

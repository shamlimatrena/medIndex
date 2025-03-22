import React from "react";
import { Card, CardContent, Typography, Button, Grid } from "@mui/material";

const MedicineGrid = ({ medicines, isAdmin, onEditClick, onDeleteClick }) => {
  return (
    <Grid container spacing={3} sx={{ mt: 3 }}>
      {medicines.map((med) => (
        <Grid item xs={12} sm={6} md={4} key={med.id}>
          <Card>
            <CardContent>
              <Typography variant="h6">{med.name}</Typography>
              <Typography>Brand: {med.brand}</Typography>
              <Typography>Price: ${med.price}</Typography>
              <Typography color={med.inStock ? "green" : "red"}>
                {med.inStock ? "In Stock" : "Out of Stock"}
              </Typography>
              {isAdmin && (
                <>
                  <Button
                    onClick={() => onEditClick(med.id, {})}
                    color="primary"
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => onDeleteClick(med.id)}
                    color="secondary"
                  >
                    Delete
                  </Button>
                </>
              )}
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default MedicineGrid;

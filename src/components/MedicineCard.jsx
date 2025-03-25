import React, { useRef, useState, useEffect, useMemo } from "react";
import {
  Card,
  CardContent,
  Typography,
  CardMedia,
  CardActionArea,
  IconButton,
  Box,
  Tooltip,
} from "@mui/material";
import {
  Search as SearchIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  LocalPharmacy as MedicineIcon,
} from "@mui/icons-material";

// Image Route
const IMG_PATH = import.meta.env.VITE_IMG_PATH;

const TruncatedText = ({ text, variant, sx, lines = 1 }) => {
  const textRef = useRef(null);
  const [isTruncated, setIsTruncated] = useState(false);

  useEffect(() => {
    const checkTruncation = () => {
      const element = textRef.current;
      if (!element) return;

      if (lines === 1) {
        setIsTruncated(element.scrollWidth > element.clientWidth);
      } else {
        setIsTruncated(element.scrollHeight > element.clientHeight);
      }
    };

    checkTruncation();
    window.addEventListener("resize", checkTruncation);
    return () => window.removeEventListener("resize", checkTruncation);
  }, [text, lines]);

  const textStyle =
    lines === 1
      ? {
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          ...sx,
        }
      : {
          display: "-webkit-box",
          WebkitBoxOrient: "vertical",
          WebkitLineClamp: lines,
          overflow: "hidden",
          textOverflow: "ellipsis",
          ...sx,
        };

  return (
    <Tooltip title={text} placement="top" disableHoverListener={!isTruncated}>
      <Typography variant={variant} sx={textStyle} ref={textRef}>
        {text}
      </Typography>
    </Tooltip>
  );
};

const MedicineCard = ({ medicine, isAdmin, onEdit, onDelete }) => {
  const defaultImage = useMemo(() => {
    const randomIndex = Math.floor(Math.random() * 3) + 1;
    return `/img/default_med_${randomIndex}.jpg`;
  }, []);

  const full_img_path = med.image_url ? IMG_PATH + med.image_url : null;
  const imageUrl = full_img_path || defaultImage;

  return (
    <Card
      sx={{
        maxWidth: 300,
        minWidth: 300,
        height: 415,
        borderRadius: 3,
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        transition: "0.3s",
        "&:hover": {
          boxShadow: "0 6px 20px rgba(0,0,0,0.2)",
          transform: "translateY(-4px)",
        },
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
        <Box sx={{ position: "relative" }}>
          <CardMedia
            component="img"
            height="160"
            image={imageUrl}
            alt={medicine.name}
            sx={{ borderTopLeftRadius: 12, borderTopRightRadius: 12 }}
          />

          <CardActionArea
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
            }}
          />
        </Box>

        <CardContent
          sx={{
            padding: 2,
            userSelect: "text",
            overflow: "hidden",
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <TruncatedText
            text={medicine.name}
            variant="h6"
            sx={{ fontWeight: "bold", mb: 1 }}
          />

          <TruncatedText
            text={`${medicine.genericName} | ${medicine.manufacturer}`}
            variant="subtitle2"
            sx={{ color: "text.secondary", mb: 1 }}
          />

          <Box sx={{ flex: 1, overflow: "hidden", mb: 1 }}>
            <TruncatedText
              text={medicine.description}
              variant="body2"
              sx={{ color: "text.secondary", height: "100%" }}
              lines={2}
            />
          </Box>

          <Box>
            <TruncatedText
              text={`Unit Price: ${medicine.price}`}
              variant="body2"
              sx={{ color: "primary.main", fontWeight: 600 }}
            />

            <TruncatedText
              text={`Batch #${medicine.batchNumber}`}
              variant="caption"
              sx={{ display: "block", color: "text.disabled", mt: 0.5 }}
            />
          </Box>
        </CardContent>
      </Box>

      {isAdmin && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            p: 1,
            borderTop: "1px solid rgba(0,0,0,0.05)",
          }}
        >
          <IconButton
            size="small"
            color="primary"
            onClick={(e) => {
              e.stopPropagation();
              onEdit(medicine);
            }}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            size="small"
            color="error"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(medicine.id);
            }}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      )}
    </Card>
  );
};

export default MedicineCard;

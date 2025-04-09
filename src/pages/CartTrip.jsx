import { reduce, addToCart, remove } from "../features/cartSlice";
import { useDispatch } from "react-redux";
import { Box, Button, Typography, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const CartTrip = ({ trip }) => {
  const disp = useDispatch();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        border: "1px solid #ddd",
        borderRadius: "10px",
        padding: "16px",
        boxShadow: 2,
        textAlign: "center",
        maxWidth: 300, // הגבלת רוחב
        marginBottom: 2,
      }}
    >
      {/* תמונה */}
      <img
        style={{
          width: "100%",
          height: "200px",
          borderRadius: "10px",
          objectFit: "cover",
        }}
        src={trip.img}
        alt={trip.name}
      />

      {/* פרטי טיול */}
      <Typography variant="h6" sx={{ fontWeight: "bold", marginTop: 2 }}>
        {trip.name}
      </Typography>
      <Typography variant="body1" color="textSecondary">
        Price: ${trip.price}
      </Typography>
      <Typography variant="body1" color="textSecondary">
        Qty: {trip.qty}
      </Typography>
      <Typography variant="h6" sx={{ fontWeight: "bold", marginTop: 1 }}>
        Total: ${trip.price * trip.qty}
      </Typography>

      {/* כפתורים */}
      <Box sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}>
        <IconButton
          sx={{ color: "#d32f2f", marginRight: 1 }}
          onClick={() => disp(reduce(trip))}
        >
          <RemoveIcon />
        </IconButton>
        <IconButton
          sx={{ color: "#4caf50", marginRight: 1 }}
          onClick={() => disp(addToCart(trip))}
        >
          <AddIcon />
        </IconButton>
        <IconButton
          sx={{ color: "#f44336" }}
          onClick={() => disp(remove(trip))}
        >
          <DeleteIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default CartTrip;

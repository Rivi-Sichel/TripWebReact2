import { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/cartSlice";
import { useNavigate } from "react-router-dom";
import SlideCart from "../pages/SlideCart";
import { deleteTrip } from "../api/tripService";
import { useSelector } from "react-redux";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';

const Trip = ({ trip, onDelete }) => {
    const [showSlideCart, setShowSlideCart] = useState(false);
    let disp = useDispatch();
    let navigate = useNavigate();
    const user = useSelector((state) => state.user.currentUser);

    const handleAddToCart = (e) => {
        e.preventDefault();
        disp(addToCart(trip));
        setShowSlideCart(true);
        setTimeout(() => {
            setShowSlideCart(false);
        }, 5000);
    };

    const handleDelete = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (window.confirm("Are you sure you want to delete this trip?")) {
            deleteTrip(trip._id, user.token);
            onDelete(trip._id);
        }
    };

    return (
        <Link to={"details/" + trip._id} style={{ textDecoration: 'none' }}>
            <Card sx={{ maxWidth: 345, height: '100%', display: 'flex', flexDirection: 'column', position: 'relative' }}>
                <CardMedia
                    component="img"
                    height="200"
                    image={trip.img}
                    alt={trip.name}
                    sx={{ objectFit: 'cover' }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="div">
                        {trip.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Price: {trip.price}
                    </Typography>
                </CardContent>
                <CardActions sx={{ display: 'flex', justifyContent: 'space-between' }}> {/* הוספת Flexbox */}
                    <Box sx={{ display: 'flex' }}> {/* הוספת Box למיקום הכפתורים */}
                        {user?.userRole === "admin" && (
                            <>
                                <IconButton onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    navigate("/AddTrip", { state: { status: "EDIT", trip } });
                                }}>
                                    <EditIcon />
                                </IconButton>
                                <IconButton onClick={handleDelete}>
                                    <DeleteIcon />
                                </IconButton>
                            </>
                        )}
                    </Box>
                    {user?.userRole !== "admin" && (
                        <IconButton onClick={handleAddToCart}>
                            <ShoppingCartIcon />
                        </IconButton>
                    )}
                </CardActions>
                {showSlideCart && <SlideCart />}
            </Card>
        </Link>
    );
}

export default Trip;
import { useNavigate, useParams } from "react-router-dom";
import { reduce, addToCart } from "../features/cartSlice";
import { useDispatch } from "react-redux";
import { getById } from "../api/tripService";
import { useEffect, useState } from "react";
import { Box, Typography, Button, IconButton, Grid, Card, CardMedia } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const OneTrip = () => {
    let navigate = useNavigate();
    const [trip, setTrip] = useState();
    let id = useParams().id;
    let disp = useDispatch();

    useEffect(() => {
        getById(id).then(res => {
            setTrip(res.data);
        }).catch(err => {
            console.log(err);
            alert("Error in getting the trips");
        });
    }, [id]);

    return (
        <Box sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            bgcolor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
            padding: 2
        }}>
            <Card sx={{
                width: '100%',
                maxWidth: '1200px',
                p: 3,
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: 'white',
                borderRadius: '10px',
                boxShadow: 24
            }}>
                <IconButton
                    sx={{
                        position: 'absolute',
                        top: 16,
                        right: 16,
                        zIndex: 2
                    }}
                    onClick={() => navigate(-1)}
                >
                    <CloseIcon />
                </IconButton>

                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <CardMedia
                            component="img"
                            image={trip?.img}
                            alt={trip?.name}
                            sx={{
                                width: '100%',
                                height: 'auto',
                                borderRadius: '8px',
                                boxShadow: 3
                            }}
                        />
                    </Grid>

                    <Grid item xs={12} md={6} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#333' }}>
                            {trip?.name}
                        </Typography>
                        <Typography variant="h5" gutterBottom sx={{ color: '#00796b' }}>
                            Price: ${trip?.price}
                        </Typography>
                        <Typography variant="h6" gutterBottom sx={{ color: '#555' }}>
                            City: {trip?.city}
                        </Typography>
                        <Typography variant="h6" gutterBottom sx={{ color: '#555' }}>
                            Type: {trip?.type}
                        </Typography>

                        <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
                            <Button
                                variant="outlined"
                                sx={{ flex: 1, minWidth: 120 }}
                                onClick={() => disp(reduce(trip))}
                            >
                                -
                            </Button>
                            <Button
                                variant="outlined"
                                sx={{ flex: 1, minWidth: 120 }}
                                onClick={() => disp(addToCart(trip))}
                            >
                                +
                            </Button>
                            <Button
                                variant="contained"
                                sx={{
                                    flex: 1,
                                    minWidth: 120,
                                    bgcolor: '#00796b',
                                    '&:hover': {
                                        bgcolor: '#004d40'
                                    }
                                }}
                                onClick={() => disp(addToCart(trip))}
                            >
                                <ShoppingCartIcon sx={{ mr: 1 }} />
                                Add to Cart
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </Card>
        </Box>
    );
}

export default OneTrip;

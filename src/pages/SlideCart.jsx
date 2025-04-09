import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CartTrip from "./CartTrip";
import { Box, Typography, Button, Paper, Divider, Slide} from '@mui/material';

const SlideCart = () => {
    const count = useSelector(state => state.cart.count);
    const totalSum = useSelector(state => state.cart.sum);
    let navigate = useNavigate();

    const [showCart, setShowCart] = useState(false);
    const [cartItems, setCartItems] = useState([]);

    // שליפת הסל מהלוקל סטורג' בכל הצגת הרכיב
    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem("BigCartArr")) || [];
        setCartItems(storedCart);

        if (storedCart.length > 0) {
            setShowCart(true);
            const timer = setTimeout(() => setShowCart(false), 5000);
            return () => clearTimeout(timer);
        }
    }, [count]);

    return (
        <Slide direction="up" in={showCart} mountOnEnter unmountOnExit>
            <Paper sx={{
                position: 'fixed',
                bottom: 0,
                right: 0,
                width: '100%',
                maxWidth: '400px',
                padding: 2,
                backgroundColor: 'white',
                boxShadow: 4,
                borderRadius: '16px 16px 0 0',
                zIndex: 1200,
                transition: 'all 0.3s ease',
            }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 2 }}>
                    <Typography variant="h6" sx={{ textAlign: 'center', mb: 2, fontWeight: 'bold', color: 'primary.main' }}>
                        🛒 {count} {count > 1 ? "Trips" : "Trip"} in Cart
                    </Typography>
                    <Typography variant="h6" sx={{ textAlign: 'center', mb: 2, fontWeight: 'bold', color: 'primary.main' }}>
                        Total: ${totalSum.toFixed(2)}
                    </Typography>

                    <Divider sx={{ width: '100%', mb: 2 }} />

                    <Box sx={{ overflowY: 'auto', maxHeight: 300, width: '100%' }}>
                        {cartItems.length > 0 ? (
                            cartItems.map(item => (
                                <div key={item._id}>
                                    <CartTrip trip={item} />
                                </div>
                            ))
                        ) : (
                            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                                <Typography variant="body2" color="text.secondary" align="center">Cart is empty</Typography>
                            </Box>
                        )}
                    </Box>

                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ mt: 2 }}
                        onClick={() => navigate("/BigCart")}
                    >
                        Go To Cart
                    </Button>
                </Box>
            </Paper>
        </Slide>
    );
}

export default SlideCart;

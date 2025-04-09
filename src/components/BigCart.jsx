import { useSelector } from "react-redux";
import CartTrip from "../pages/CartTrip";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Button, Container, Grid, Divider } from '@mui/material';

const BigCart = () => {
    const allCart = useSelector(state => state.cart.arr);
    const count = useSelector(state => state.cart.count);
    const s = useSelector(state => state.cart.sum);
    let currentUser = useSelector(state => state.user.currentUser);
    let navigate = useNavigate();

    return (
        <Container maxWidth="lg" sx={{ mt: 16 }}>
            <Box sx={{ mb: 4 }}>
                <Typography variant="h4" align="center">Your Cart</Typography>
                <Typography variant="h6" align="center" sx={{ mt: 2 }}>
                    {`${count} ${count > 1 ? 'trips' : 'trip'} in the cart`}
                </Typography>
                <Typography variant="h6" align="center" sx={{ mt: 1 }}>
                    {`Total: $${s}`}
                </Typography>
            </Box>

            <Divider sx={{ mb: 4 }} />

            <Grid container spacing={3}>
                <Grid item xs={12}>
                    {allCart.map(item => (
                        <Box key={item._id} sx={{ mb: 2 }}>
                            <CartTrip trip={item} />
                        </Box>
                    ))}
                </Grid>
            </Grid>

            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    onClick={() => {
                        console.log("Navigating to:", currentUser ? "/CheckOut" : "/LogIn");
                        if (!currentUser) {
                            navigate("/LogIn");
                        } else {
                            navigate("/CheckOut");
                        }
                    }}
                >
                    Proceed to Checkout
                </Button>
            </Box>
        </Container>
    );
};

export default BigCart;
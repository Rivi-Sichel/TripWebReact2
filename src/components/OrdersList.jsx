import { useState, useEffect } from "react";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Container, Typography } from '@mui/material';

import { getAllOrders } from "../api/OrderService";
import { useSelector } from "react-redux";

import SingleOrder from "../pages/SingleOrder";

const OrdersList = () => {
    const [ordersList, setOrdersList] = useState([]);
    const user = useSelector((state) => state.user.currentUser);
    let [status, setStatus] = useState("init");

    useEffect(() => {
        setStatus("pending");
        getAllOrders().then(res => {
            // Filter orders by user
            const filteredOrders = res.data.filter(order => user && order.orderUserId === user._id);
            setOrdersList(filteredOrders);
        }).catch(err => {
            console.log(err);
            alert("Error getting orders");
        }).finally(() => {
            setStatus("finish");
        });
    }, [user]);

    useEffect(() => {
        if (!user) { // If user is null or undefined
            setOrdersList([]); // Clear the orders list
        }
    }, [user]);

    return (
        <Container sx={{ paddingTop: 12 }}>
            <Typography variant="h4" gutterBottom>
                MY ORDERS:
            </Typography>
            {status === "pending" ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', margin: 4 }}>
                    <CircularProgress />
                </Box>
            ) : (
                ordersList.length > 0 ? (
                    <Grid container spacing={3} direction="column">
                        {ordersList.map(item => (
                            <Grid item xs={12} key={item._id}>
                                <SingleOrder order={item} />
                            </Grid>
                        ))}
                    </Grid>
                ) : (
                    <Typography variant="body1">
                        You have no orders.
                    </Typography>
                )
            )}
        </Container>
    );
};

export default OrdersList;
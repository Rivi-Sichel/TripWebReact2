import { useState, useEffect } from "react";
import { getOrderById } from "../api/orderService";
import { Card, CardContent, Typography, Grid } from "@mui/material";

const SingleOrder = ({ order }) => {
    const [matchOrder, setMatchOrder] = useState({});

    useEffect(() => {
        if (order?._id) {
            getOrderById(order._id)
                .then((data) => setMatchOrder(data))
                .catch((error) => console.error("Error fetching order:", error));
        }
    }, [order?._id]);

    const totalTickets = order?.orderedTrip?.reduce((sum, trip) => sum + trip.quantity, 0);

    return (
        <Card sx={{ marginBottom: 2 }}>
            <CardContent>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={4}>
                        <Typography variant="body1">
                            Order Date: {new Date(order?.orderDate).toLocaleDateString()}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Typography variant="body1">
                            Total Price: ${order?.totalPrice}
                        </Typography>
                    </Grid>
                    {totalTickets !== undefined && (
                        <Grid item xs={12} sm={4}>
                            <Typography variant="body1">
                                Total Tickets: {totalTickets}
                            </Typography>
                        </Grid>
                    )}
                </Grid>
            </CardContent>
        </Card>
    );
};

export default SingleOrder;





// import { useState, useEffect } from "react";
// import { getOrderById } from "../api/orderService";

// const SingleOrder = ({ order }) => {
//     const [matchOrder, setMatchOrder] = useState(null);

//     useEffect(() => {
//         if (order?._id) {
//             getOrderById(order._id)
//                 .then((data) => setMatchOrder(data))
//                 .catch((error) => console.error("Error fetching order:", error));
//         }
//     }, [order?._id]);

//     if (!matchOrder) {
//         return <h1>Loading order...</h1>;
//     }

//     return (
//         <>
//             <h1>This is a single order:</h1>
//             <h3>Order Date: {matchOrder.orderDate ? new Date(matchOrder.orderDate).toLocaleDateString() : "N/A"}</h3>
//             <h3>Total Price: ${matchOrder.totalPrice || "N/A"}</h3>
//             <h2>Ordered Trips:</h2>
//             <ul>
//                 {matchOrder.orderedTrip?.map((trip) => (
//                     <li key={trip._id} style={{ listStyle: "none", marginBottom: "10px" }}>
//                         <h3>{trip.name || "Unknown Trip"}</h3>
//                         <p><strong>Tickets:</strong> {trip.quantity || 0}</p>
//                         {trip.imageUrl && <img src={trip.imageUrl} alt={trip.name} style={{ width: "200px", height: "150px", borderRadius: "10px" }} />}
//                     </li>
//                 ))}
//             </ul>
//         </>
//     );
// };

// export default SingleOrder;
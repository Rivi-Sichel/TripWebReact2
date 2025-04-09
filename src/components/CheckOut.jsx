//Not Using MUI:
// import { useSelector } from "react-redux";
// import { saveOrderServer } from "../api/orderService";
// const CheckOut = () => {
//     const user = useSelector(state => state.user.currentUser)
//     const trip = useSelector(state => state.cart.arr)
//     const count = useSelector(state => state.cart.count);
//     const s = useSelector(state => state.cart.sum);
//     const save = (e) => {
//         e.preventDefault();
//         // המרת המידע של trips בצורה שמתאימה לשרת
//         const orderedTrip = trip.map(item => ({
//             tripId: item._id,  // שים לב אם _id הוא השדה הנכון (תלוי במבנה של ה-trip שלך)
//             quantity: item.qty  // לוודא שהכמות קיימת ב-trip
//         }));
//         // const orderUserId ={userId:user._id}
//         const orderUserId = user._id;
//         const orderData = {
//             orderUserId: orderUserId,
//             orderedTrip: orderedTrip
//         };
//         // המרת ה-userId כך שיישלח כ-`userId`
//         // שליחת ההזמנה עם המידע המעודכן
//         saveOrderServer(orderData).then(res => {
//             console.log(res);
//         }).catch(err => {
//             console.log(err);
//         });
//     };
//     return (<>
//         <h1>You're in checkout page</h1>
//         <h3>Total: {s}</h3>
//         <h3>{count} Items</h3>
//         <form onSubmit={save}>
//             <input type="text" placeholder="הכנס מספר כרטיס" required />
//             <input type="date" placeholder="הכנס תאריך" required />
//             <input type="text" placeholder="הכנס 3 ספרות בגב הכרטיס" required />
//             <input type="text" required defaultValue={user.userName} disabled />
//             <input type="submit" value="Enter to save order" />
//         </form>
//     </>);
// }
// export default CheckOut;






//Using MUI:
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { saveOrderServer } from "../api/OrderService";
import {
    Container,
    Typography,
    TextField,
    Button,
    Paper,
    Grid,
    Stepper,
    Step,
    StepLabel,
    List,
    ListItem,
    ListItemText,
    Checkbox,
    FormControlLabel,
    Box,
} from "@mui/material";
import { HdrWeak } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const steps = [
    "Personal Details",
    "Select Trips and Passengers",
    "Optional Add-ons",
    "Payment Details",
    "Confirm Order",
];


const CheckOut = () => {
    const user = useSelector((state) => state.user.currentUser);
    const trip = useSelector((state) => state.cart.arr);
    const count = useSelector((state) => state.cart.count);
    const s = useSelector((state) => state.cart.sum);
    const [activeStep, setActiveStep] = useState(0);

    const [fullNameError, setFullNameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [phoneError, setPhoneError] = useState("");
    const [cardNumberError, setCardNumberError] = useState("");
    const [expiryDateError, setExpiryDateError] = useState("");
    const [cvvError, setCvvError] = useState("");
    const [cardholderNameError, setCardholderNameError] = useState("");

    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [cardNumber, setCardNumber] = useState("");
    const [expiryDate, setExpiryDate] = useState("");
    const [cvv, setCvv] = useState("");
    const [cardholderName, setCardholderName] = useState("");

    let navigate = useNavigate();

    const handleNext = () => {
        if (activeStep === 0) {
            if (!fullName) {
                setFullNameError("Full Name is required");
                return;
            } else {
                setFullNameError("");
            }
            if (!email || !/\S+@\S+\.\S+/.test(email)) {
                setEmailError("Invalid email address");
                return;
            } else {
                setEmailError("");
            }
            if (!phone || !/^\d{10}$/.test(phone)) {
                setPhoneError("Invalid phone number");
                return;
            } else {
                setPhoneError("");
            }
        }
        if (activeStep === 3) {
            if (!cardNumber || !/^\d{16}$/.test(cardNumber)) {
                setCardNumberError("Invalid card number");
                return;
            } else {
                setCardNumberError("");
            }
            if (!expiryDate) {
                setExpiryDateError("Expiry date is required");
                return;
            } else {
                setExpiryDateError("");
            }
            if (!cvv || !/^\d{3,4}$/.test(cvv)) {
                setCvvError("Invalid CVV");
                return;
            } else {
                setCvvError("");
            }
            if (!cardholderName) {
                setCardholderNameError("Cardholder name is required");
                return;
            } else {
                setCardholderNameError("");
            }
        }
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const save = (e) => {
        e.preventDefault();

        const orderedTrip = trip.map((item) => ({
            tripId: item._id,
            quantity: item.qty,
        }));

        const orderUserId = user._id;

        const orderData = {
            orderUserId: orderUserId,
            orderedTrip: orderedTrip,
        };

        saveOrderServer(orderData)
            .then((res) => {
                console.log(res);
                alert("Order Saved Successfully")
                navigate("/")
                // Add actions after saving the order, like navigating to confirmation page
            })
            .catch((err) => {
                console.log(err);
                // Add error handling
            });
    };

    const getStepContent = (step) => {
        switch (step) {
            case 0:
                return (
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Full Name"
                                required
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                error={!!fullNameError}
                                helperText={fullNameError}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Email Address"
                                required
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                error={!!emailError}
                                helperText={emailError}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Phone Number"
                                required
                                type="tel"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                error={!!phoneError}
                                helperText={phoneError}
                            />
                        </Grid>
                    </Grid>
                );
            case 1:
                return (
                    <List>
                        {trip.map((item) => (
                            <ListItem key={item._id}>
                                <ListItemText primary={item.name} secondary={`Passengers: ${item.qty}`} />
                            </ListItem>
                        ))}
                    </List>
                );
            case 2:
                return (
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <FormControlLabel control={<Checkbox />} label="Travel Insurance" />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel control={<Checkbox />} label="Special Meals" />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel control={<Checkbox />} label="Guided Tours" />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel control={<Checkbox />} label="Seat Upgrades" />
                        </Grid>
                    </Grid>
                );
            case 3:
                return (
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Credit Card Number"
                                required
                                type="text"
                                value={cardNumber}
                                onChange={(e) => setCardNumber(e.target.value)}
                                error={!!cardNumberError}
                                helperText={cardNumberError}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Expiration Date"
                                required
                                type="date"
                                value={expiryDate}
                                onChange={(e) => setExpiryDate(e.target.value)}
                                error={!!expiryDateError}
                                helperText={expiryDateError}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="CVV"
                                required
                                type="text"
                                value={cvv}
                                onChange={(e) => setCvv(e.target.value)}
                                error={!!cvvError}
                                helperText={cvvError}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Cardholder Name"
                                required
                                value={cardholderName}
                                onChange={(e) => setCardholderName(e.target.value)}
                                error={!!cardholderNameError}
                                helperText={cardholderNameError}
                            />
                        </Grid>
                    </Grid>
                );
            case 4:
                return (
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Typography variant="h5" gutterBottom>
                                Order Summary
                            </Typography>
                            <Typography variant="body1">
                                {count} items, Total: ${s}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="h6" gutterBottom>
                                Terms and Conditions
                            </Typography>
                            <Typography variant="body2">
                                By confirming this order, you agree to our terms and conditions.
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

                            {/* <Button variant="contained" color="primary" onClick={save}>
                                    Confirm Order
                                </Button> */}
                            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', mt: 3, mb: -4.5 }}>
                                <Button variant="contained" color="primary" onClick={save}>
                                    Confirm Order
                                </Button>
                            </Grid>


                        </Grid>
                    </Grid>
                );
            default:
                return "Unknown step";
        }
    };
    return (

        <Container maxWidth="md" sx={{ mt: '190px' }}>
            <Paper elevation={3} sx={{ p: 3 }}>
                <Typography variant="h4" gutterBottom>
                    Checkout
                </Typography>
                <Stepper activeStep={activeStep} alternativeLabel>
                    {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
                {getStepContent(activeStep)}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                    <Button disabled={activeStep === 0} onClick={handleBack}>Back</Button>
                    {activeStep === steps.length - 1 ? null : (
                        <Button variant="contained" color="primary" onClick={handleNext}>Next</Button>
                    )}
                </Box>
            </Paper>
        </Container>
    );
};


export default CheckOut;
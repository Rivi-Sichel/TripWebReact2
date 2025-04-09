import { useForm } from "react-hook-form";
import { addTripServer, update } from "../api/tripService";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button, Container, Grid, TextField, Typography, Paper } from '@mui/material';

const AddTrip = () => {
    let currentUser = useSelector(state => state.user.currentUser);
    const location = useLocation();
    const [tripData, setTrip] = useState(location.state?.trip || {});
    const isEditMode = location.state?.status === "EDIT";
    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        defaultValues: isEditMode ? tripData : {}, 
    });
    const navigate = useNavigate();

    const save = (data) => {
        console.log(isEditMode);
        console.log(data);
        console.log(currentUser);

        isEditMode
            ? update(data, currentUser.token).then(res => {
                alert("Successfully Changed");
                navigate("/"); 
            }).catch(err => {
                console.log(err);
                alert("Error in edit trip: " + err.response.data.title);
            })
            : addTripServer(data,currentUser.token)
                .then(res => {
                    alert("trip added successfully");
                    reset(); 
                    navigate("/"); 
                })
                .catch(err => {
                    console.log(err);
                    alert("Error in adding trip: " + err.response.data.title);
                });

        console.log(data);
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 15 }}>
            <Paper elevation={3} sx={{ p: 3 }}>
                <Typography variant="h5" gutterBottom align="center">
                    {isEditMode ? "EditTrip" : "Add A New Trip"}
                </Typography>

                <form onSubmit={handleSubmit(save)}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                label={isEditMode ? "" : "Enter name"}
                                variant="outlined"
                                fullWidth
                                {...register("name", { required: "Name is required" })}
                                error={!!errors.name}
                                helperText={errors.name?.message}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                label={isEditMode ? "" : "Enter city"}
                                variant="outlined"
                                fullWidth
                                {...register("city", { required: "City is required" })}
                                error={!!errors.city}
                                helperText={errors.city?.message}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                label={isEditMode ? "" : "Enter price"}
                                variant="outlined"
                                fullWidth
                                type="number"
                                {...register("price", { required: "Price is required" })}
                                error={!!errors.price}
                                helperText={errors.price?.message}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                label={isEditMode ? "" : "Enter type"}
                                variant="outlined"
                                fullWidth
                                {...register("type", { required: "Type is required" })}
                                error={!!errors.type}
                                helperText={errors.type?.message}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                label={isEditMode ? "" : "Enter img URL"}
                                variant="outlined"
                                fullWidth
                                {...register("img", { required: "Image URL is required" })}
                                error={!!errors.img}
                                helperText={errors.img?.message}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Button variant="contained" color="primary" fullWidth type="submit">
                                {isEditMode ? "Update Trip" : "Save Changes"}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    );
};

export default AddTrip;

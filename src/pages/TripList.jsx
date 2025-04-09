// import { useEffect, useState } from "react";
// import { getAll, getTotalPages } from "../api/tripService";
// import {Outlet } from "react-router-dom";
// import Trip from '../components/Trip';
// import CircularProgress from '@mui/material/CircularProgress';
// import Grid from '@mui/material/Grid';
// import Pagination from '@mui/material/Pagination';
// import Box from '@mui/material/Box';
// import Typography from '@mui/material/Typography';

// const TripList = () => {
//     let [arr, setArr] = useState([]);
//     let [thisPage, setThisPage] = useState(1);
//     let [status, setStatus] = useState("init");
//     let [totalPages, setTotalPages] = useState(0);

//     useEffect(() => {
//         setStatus("pending");
//         getAll(thisPage).then(res => {
//             setArr(res.data);
//         }).catch(err => {
//             console.log(err);
//             alert("Error in getting the trips");
//         }).finally(() => {
//             setStatus("finish");
//         });
//     }, [thisPage]);

//     useEffect(() => {
//         getTotalPages().then(res => {
//             setTotalPages(res.data.pages);
//         }).catch(err => {
//             console.log(err);
//             alert("Error in getting pages");
//         });
//     }, []);

//     const handleDeleteTrip = (id) => {
//         setArr((prevArr) => prevArr.filter((trip) => trip._id !== id));
//     };

//     return (
//         <Box sx={{ paddingTop: 8, paddingX: 3 }}>
//             <Typography variant="h4" gutterBottom sx={{ marginBottom: 4 }}>
//                 Explore the World with Our Amazing Trips
//             </Typography>
//             {status === "pending" ? (
//                 <Box sx={{ display: 'flex', justifyContent: 'center', margin: 4 }}>
//                     <CircularProgress />
//                 </Box>
//             ) : (
//                 <Grid container spacing={3}>
//                     {arr.map(item => (
//                         <Grid item xs={12} sm={6} md={4} key={item._id}>
//                             <Trip trip={item} onDelete={handleDeleteTrip} /> 
//                         </Grid>
//                     ))}
//                 </Grid>
//             )}
//             <Box sx={{ display: 'flex', justifyContent: 'center', margin: 4 }}>
//                 <Pagination
//                     count={totalPages}
//                     page={thisPage}
//                     onChange={(event, value) => setThisPage(value)}
//                     color="primary"
//                 />
//             </Box>
//             <Outlet />
//         </Box>
//     );
// }

// export default TripList;



import { useEffect, useState } from "react";
import { getAll, getTotalPages } from "../api/tripService";
import { Outlet } from "react-router-dom";
import Trip from '../components/Trip';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';
import Pagination from '@mui/material/Pagination';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const TripList = () => {
    let [arr, setArr] = useState([]);
    let [thisPage, setThisPage] = useState(1);
    let [status, setStatus] = useState("init");
    let [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        setStatus("pending");
        getAll(thisPage).then(res => {
            setArr(res.data);
        }).catch(err => {
            console.log(err);
            alert("Error in getting the trips");
        }).finally(() => {
            setStatus("finish");
        });
    }, [thisPage]);

    useEffect(() => {
        getTotalPages().then(res => {
            setTotalPages(res.data.pages);
        }).catch(err => {
            console.log(err);
            alert("Error in getting pages");
        });
    }, []);

    const handleDeleteTrip = (id) => {
        setArr((prevArr) => prevArr.filter((trip) => trip._id !== id));
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
                paddingTop: 8,
                paddingX: 3
            }}
        >
            <Typography variant="h4" gutterBottom sx={{ marginBottom: 4 }}>
                Explore the World with Our Amazing Trips
            </Typography>
            {status === "pending" ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', margin: 4 }}>
                    <CircularProgress />
                </Box>
            ) : (
                <Grid container spacing={{ xs: 4, md: 4 }} rowSpacing={{ xs: 5, md: 5 }} sx={{ justifyContent: 'flex-start', width: '100%', paddingLeft: 4 }}> {/* שינוי spacing ו-paddingLeft */}
                    {arr.map(item => (
                        <Grid item xs={12} sm={6} md={4} key={item._id}>
                            <Trip trip={item} onDelete={handleDeleteTrip} />
                        </Grid>
                    ))}
                </Grid>
            )}
            <Box sx={{ display: 'flex', justifyContent: 'center', margin: 4 }}>
                <Pagination
                    count={totalPages}
                    page={thisPage}
                    onChange={(event, value) => setThisPage(value)}
                    color="primary"
                />
            </Box>
            <Outlet />
        </Box>
    );
}

export default TripList;
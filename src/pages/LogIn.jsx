import { Link } from "react-router-dom";
import { signInWithUserNameAndPasswordServer } from "../api/UserService";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { userIn } from "../features/userSlice";
import {
  Box,
  Button,
  Paper,
  TextField,
  Typography,
  Alert,
} from "@mui/material";

const LogIn = () => {
  const dispatch = useDispatch();
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [errMsg, setErrMsg] = useState(null);

  const save = async (data) => {
    try {
      const user = await signInWithUserNameAndPasswordServer(data);
      console.log(user);
      dispatch(userIn(user.data));
      setErrMsg(null);
    } catch (err) {
      console.log("Login failed");
      setErrMsg(err.response?.data?.message || "Login failed");
    }
    reset();
  };

  return (
    <Box 
      display="flex" 
      justifyContent="center" 
      alignItems="flex-start" 
      minHeight="70vh" 
      mt={14} // דוחף למטה מהטופ
    >
      <Paper elevation={4} sx={{ padding: 4, width: 350, backgroundColor: '#e3f2fd' }}>
        <Typography variant="h4" textAlign="center" color="primary" mb={2}>
          Login
        </Typography>

        <form onSubmit={handleSubmit(save)}>
          <TextField
            fullWidth
            label="User Name"
            variant="outlined"
            margin="normal"
            {...register("userName", { required: "User Name is required" })}
            error={!!errors.userName}
            helperText={errors.userName?.message}
          />

          <TextField
            fullWidth
            type="password"
            label="Password"
            variant="outlined"
            margin="normal"
            {...register("userPassword", { required: "Password is required" })}
            error={!!errors.userPassword}
            helperText={errors.userPassword?.message}
          />

          <Button 
            type="submit" 
            variant="contained" 
            fullWidth 
            sx={{ mt: 2, backgroundColor: '#1976d2' }}
          >
            Login
          </Button>
        </form>

        {errMsg && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {errMsg}
          </Alert>
        )}

        <Typography variant="body1" mt={3} textAlign="center">
          Don't have an account?
        </Typography>
        <Typography variant="body1" textAlign="center" mb={1}>
          Sign up for free ⬇️
        </Typography>
        <Box textAlign="center">
          <Button 
            component={Link} 
            to="/SignIn" 
            variant="outlined" 
            sx={{ borderColor: '#1976d2', color: '#1976d2' }}
          >
            Sign Up
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default LogIn;

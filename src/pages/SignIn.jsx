import { useForm } from "react-hook-form";
import { signupServer  } from "../api/UserService";
import { useDispatch } from "react-redux";
import { userIn } from "../features/userSlice";
import { useState } from "react";
import {
  Box,
  Paper,
  TextField,
  Typography,
  Button,
  Alert
} from "@mui/material";

const SignIn = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState("");

  const save = async (data) => {
    console.log("📤 שולח נתונים לשרת:", data);
    try {
      console.log("נכנסתי לtry");
      console.log(data);
      
      let z = await signupServer (data);
    
      console.log("✅ משתמש נרשם בהצלחה:", z.data);
      reset();
      dispatch(userIn(z.data));
      setErrorMessage("");
    } catch (error) {
      if (error.response?.status === 409) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("❌ שגיאה בלתי צפויה. נסה שוב.");
      }
    }
  };

  return (
    <Box 
      display="flex" 
      justifyContent="center" 
      alignItems="flex-start" 
      minHeight="70vh" 
      mt={12} // דחיפה מעט למטה מה-Navbar
    >
      <Paper elevation={4} sx={{ padding: 4, width: 400, backgroundColor: '#e3f2fd' }}>
        <Typography variant="h4" textAlign="center" color="primary" mb={2}>
          Sign Up
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
            {...register("userPassword", {
              required: "Password is required",
              minLength: {
                value: 7,
                message: "Password must be at least 7 characters long."
              },
              pattern: {
                value: /^(?=.*[A-Za-z])(?=.*\d).*$/,
                message: "Password must contain at least one letter and one number."
              }
            })}
            error={!!errors.userPassword}
            helperText={errors.userPassword?.message}
          />

          <TextField
            fullWidth
            label="Email Address"
            type="email"
            variant="outlined"
            margin="normal"
            {...register("userEmail", {
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Invalid email address"
              }
            })}
            error={!!errors.userEmail}
            helperText={errors.userEmail?.message}
          />

          <TextField
            fullWidth
            label="Phone Number"
            variant="outlined"
            margin="normal"
            {...register("userPhone", {
              required: "Phone number is required",
              minLength: {
                value: 7,
                message: "Phone number must be at least 7 digits"
              }
            })}
            error={!!errors.userPhone}
            helperText={errors.userPhone?.message}
          />

          <Button 
            type="submit" 
            variant="contained" 
            fullWidth 
            sx={{ mt: 2, backgroundColor: '#1976d2' }}
          >
            Sign Up
          </Button>
        </form>

        {errorMessage && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {errorMessage}
          </Alert>
        )}
      </Paper>
    </Box>
  );
};

export default SignIn;

import React, { useEffect, useState } from "react";
import axios from 'axios';
import {
  TextField,
  Button,
  Box,
  Typography,
  Stack,
  InputAdornment,
  IconButton,
  Alert,
} from "@mui/material";
import Grid from '@mui/material/Grid2';
import {
  Visibility,
  VisibilityOff,
  Person,
  Email,
  Phone,
  Lock,
} from "@mui/icons-material";
import Header from "../components/header";

const Adduser = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    mobile: "",
    password: ""
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);


  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://unpkg.com/@dotlottie/player-component@latest/dist/dotlottie-player.mjs";
    script.type = "module";
    document.body.appendChild(script);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    let newErrors = {};

    if (!formData.username) newErrors.username = "Username is required";
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Valid email is required";
    if (!formData.mobile || !/^\d{10}$/.test(formData.mobile))
      newErrors.mobile = "Valid 10-digit mobile number is required";
    if (!formData.password) newErrors.password = "Password is required";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      try {
        const { confirmPassword, ...dataToSend } = formData;
        console.log("Data being sent:", dataToSend);
        // Uncomment below line and set the appropriate backend URL
        const response = await axios.post("http://localhost:5000/users/addUser", dataToSend);
        console.log(response.data)
        alert(`Signup Successful! \n${JSON.stringify(dataToSend, null, 2)}`);
        setFormSubmitted(true);
      } catch (error) {
        console.error("Error during signup:", error);
      }
    }
  };

  const renderPasswordVisibilityToggle = () => (
    <InputAdornment position="end">
      <IconButton
        onClick={() => setShowPassword((prev) => !prev)}
        edge="end"
        style={{ color: "#fc7a46" }}
      >
        {showPassword ? <Visibility /> : <VisibilityOff />}
      </IconButton>
    </InputAdornment>
  );

  // Password Visibility Toggle for Confirm Password Field
  const renderConfirmPasswordVisibilityToggle = () => (
    <InputAdornment position="end">
      <IconButton
        onClick={() => setShowConfirmPassword((prev) => !prev)}
        edge="end"
        style={{ color: "#fc7a46" }}
      >
        {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
      </IconButton>
    </InputAdornment>
  );

  return (
    <div>
      <Header />     
      {/* <img
        src={Logo}
        alt="Logo"
        style={{
          position: "absolute",
          top: "16px",
          right: "16px",
          width: "200px",
          height: "100px",
          zIndex: 2,
        }}
        className="logo"
      />

      <div
        style={{
          position: "absolute",
          width: "100vh",
          height: "100vh",
          borderRadius: "50%",
          backgroundColor: "#0c83c8",
          top: "50%",
          right: "40%",
          transform: "translateY(-50%)",
          zIndex: 1,
          padding: "20%",
          paddingTop: "9%",
        }}
        className="half-circle"
      ></div> */}

      <Grid
        container
        justifyContent="center"
        alignItems="center"
        sx={{
          Height: "100vh",
          padding: { xs: "8px", sm: "16px" },
          position: "static",
          zIndex: 2,
        }}
      >
        <Grid item xs={12} md={6}>
          <Box
            className="form-container"
            sx={{
              width: "100%",
              maxWidth: 400,
              padding: 4,
              borderRadius: 10,
              backgroundColor: "white",
              margin: "auto",
              marginTop:'5%',
              boxShadow:'2px 5px 10px grey'
            }}
          >
            <Typography
              variant="h4"
              align="center"
              sx={{ color: "#0c83c8" }}
              gutterBottom
            >
              <b>ADD USER</b>
            </Typography>

            {formSubmitted && (
              <Alert severity="success" sx={{ mb: 2 }}>
                User Added successful!
              </Alert>
            )}

            <TextField
              label="Username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              error={!!errors.username}
              helperText={errors.username}
              variant="outlined"
              fullWidth
              margin="dense"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start" style={{ color: "#fc7a46" }}>
                    <Person />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
              variant="outlined"
              fullWidth
              margin="dense"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start" style={{ color: "#fc7a46" }}>
                    <Email />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              label="Mobile Number"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              error={!!errors.mobile}
              helperText={errors.mobile}
              variant="outlined"
              fullWidth
              margin="dense"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start" style={{ color: "#fc7a46" }}>
                    <Phone />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              label="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              error={!!errors.password}
              helperText={errors.password}
              type={showPassword ? "text" : "password"}
              variant="outlined"
              fullWidth
              margin="dense"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start" style={{ color: "#fc7a46" }}>
                    <Lock />
                  </InputAdornment>
                ),
                endAdornment:
                  formData.password && renderPasswordVisibilityToggle(),
              }}
            />

            <TextField
              label="Confirm Password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword}
              type={showConfirmPassword ? "text" : "password"}
              variant="outlined"
              fullWidth
              margin="dense"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start" style={{ color: "#fc7a46" }}>
                    <Lock />
                  </InputAdornment>
                ),
                endAdornment:
                  formData.confirmPassword &&
                  renderConfirmPasswordVisibilityToggle(),
              }}
            />

            <Button
              variant="contained"
              fullWidth
              sx={{ mt: 2, borderRadius: "50px", backgroundColor: "#0c83c8" }}
              onClick={handleSubmit}
            >
              ADD USER
            </Button>

            <Button
              variant="contained"
              fullWidth
              sx={{ mt: 2, borderRadius: "50px", backgroundColor: "#fc7a46" }}
            >
             clear
            </Button>

            <Stack
              direction="row"
              alignItems="center"
              spacing={2}
              sx={{ my: 2 }}
            >
            </Stack>
          </Box>
        </Grid>

        <Grid
          item
          xs={12}
          md={6}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* <div className="lottie-container">
            <dotlottie-player
              src="https://lottie.host/7d7bd372-b18a-4e59-8f83-b14085361089/0pJ3tTLgxM.json"
              background="transparent"
              speed="1"
              style={{
                width: "100%",
                maxWidth: "500px",
                transform: "translateX(90px)",
              }}
              loop
              autoplay
            />
          </div> */}
        </Grid>
      </Grid>
    </div>
  );
};

export default Adduser;
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  CardMedia,
  Divider,
  Grid,
  Paper,
  styled,
  TextField,
} from "@mui/material";
import Slide from "@mui/material/Slide";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import fetchApi from "../../api";
import "./Join.css";
import logo from "../../icons/corn.png";

const StyledTextField = styled(TextField)({
  "& label": {
    color: "white",
  },
  "&:hover label": {
    fontWeight: 700,
  },
  "& label.Mui-focused": {
    color: "white",
  },
});

export default function SignIn() {
  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(true);
  const history = useHistory();
  const handleSubmit = async () => {
    let res = await fetchApi("users/login", "post", { username });
    if (res && res.error) setError(res.error);
    if (res && res.detail && res.detail._id) {
      history.push(`/dashboard?user_id=${res.detail._id}`);
    }
  };

  return (
    <Box className="joinOuterContainer">
      <Slide direction="down" in={showForm} mountOnEnter unmountOnExit>
        <Paper
          sx={{
            bgcolor: "#3E4042",
            px: "80px",
            py: "30px",
            pb: "40px",
            width: "25vw",
            borderRadius: "5px",
            boxShadow: 1,
            position: "absolute",
          }}
        >
          {error && (
            <Alert severity="error">
              <AlertTitle sx={{ textAlign: "left" }}>Error</AlertTitle>
              {error}
            </Alert>
          )}
          <Grid
            container
            spacing={1}
            alignItems="center"
            justifyContent="center"
          >
            <h1 className="heading mb-0">Join</h1>
            <Box width="40px" height="40px">
              <CardMedia
                component="img"
                alt="logo"
                height="40"
                src={logo}
              />
            </Box>
          </Grid>
          <Divider sx={{borderColor: 'white', borderWidth: '2px'}}/>
          <StyledTextField
            id="standard-basic"
            label="Username"
            variant="standard"
            className="joinInput"
            onChange={(event) => setUsername(event.target.value)}
            sx={{
              input: {
                color: "#fff",
              },
              mt: "10px",
            }}
          />
          <Button
            sx={{
              bgcolor: "primary.main",
              mt: "20px",
              width: "100%",
              height: "50px",
              color: "primary.contrastText",
              "&:hover": {
                bgcolor: "rgba(64, 78, 237, 0.5)",
              },
            }}
            onClick={handleSubmit}
          >
            Sign In
          </Button>
          <Box
            sx={{ textDecoration: "underline", color: "white", mt: "20px" }}
            onClick={() => setShowForm(false)}
          >
            Go to sign up
          </Box>
        </Paper>
      </Slide>
      <Slide direction="up" in={!showForm} mountOnEnter unmountOnExit>
        <Paper
          sx={{
            bgcolor: "#3E4042",
            px: "80px",
            py: "30px",
            pb: "40px",
            width: "25vw",
            borderRadius: "5px",
            boxShadow: 1,
            position: "absolute",
          }}
        >
          {error && (
            <Alert severity="error">
              <AlertTitle sx={{ textAlign: "left" }}>Error</AlertTitle>
              {error}
            </Alert>
          )}
                    <Grid
            container
            spacing={1}
            alignItems="center"
            justifyContent="center"
          >
            <h1 className="heading mb-0">Join</h1>
            <Box width="40px" height="40px">
              <CardMedia
                component="img"
                alt="logo"
                height="40"
                src={logo}
              />
            </Box>
          </Grid>
          <Divider sx={{borderColor: 'white', borderWidth: '2px'}}/>
          <Button
            sx={{
              bgcolor: "primary.main",
              mt: "20px",
              width: "100%",
              height: "50px",
              color: "primary.contrastText",
              "&:hover": {
                bgcolor: "rgba(64, 78, 237, 0.5)",
              },
            }}
            onClick={handleSubmit}
          >
            Sign In
          </Button>
          <Box
            sx={{ textDecoration: "underline", color: "white", mt: "20px" }}
            onClick={() => setShowForm(true)}
          >
            Go to login
          </Box>
        </Paper>
      </Slide>
    </Box>
  );
}

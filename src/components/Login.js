import React, { useState } from "react";
import { TextField, Button, Grid, Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import "./Login.css";
import { signInWithEmailAndPassword } from "firebase/auth";
import db, { auth } from "../firebase";
import { current } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { loginUser } from "../features/userSlice";

const useStyles = makeStyles((theme) => ({
  root: {
    alignItems: "center",
    margin: 0,
    flexDirection: "column",
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
  submit: {
    marginTop: "20px",
    width: "90%",
    marginLeft: "10px",
  },
}));

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const classes = useStyles();

  const handleSubmit = (event) => {
    event.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then(
        loginUser({
          uid: auth.uid,
          username: auth.displayName,
          email: auth.email,
        })
      )
      .then((authUser) => {
        Cookies.set("user", authUser, { expires: 7 });
        console.log(authUser.user);
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <Grid id="login" className="login" container justify="center">
      <Box m={5}>
        <label className="login__label">Hyni ne Platform</label>
        <form className={classes.root} onSubmit={handleSubmit}>
          <TextField
            style={{ width: "90%" }}
            id="email"
            label="Email"
            variant="outlined"
            value={email}
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            style={{ width: "90%" }}
            id="password"
            label="Password"
            type="password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            className={classes.submit}
            variant="contained"
            color="primary"
            type="submit"
          >
            Hyr
          </Button>
        </form>
      </Box>
    </Grid>
  );
};

export default Login;

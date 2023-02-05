import React, { useState } from "react";
import { TextField, Button, Grid, Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import "./Login.css";

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
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const classes = useStyles();

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Username:", username);
    console.log("Password:", password);
  };

  return (
    <Grid className="login" container justify="center">
      <Box m={5}>
        <label className="login__label">Hyni ne Platform</label>
        <form className={classes.root} onSubmit={handleSubmit}>
          <TextField
            style={{ width: "90%" }}
            id="username"
            label="Username"
            variant="outlined"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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

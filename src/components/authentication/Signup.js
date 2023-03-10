import React, { useState } from "react";
import { TextField, Button, Grid, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import "./Signup.css";
import db, { auth } from "../../firebase";
import { setDoc, doc } from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import AlertBox from "../utils/AlertBox";

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

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [alert, setAlert] = useState({});
  const classes = useStyles();

  const handleSubmit = (event) => {
    event.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((authUser) => {
        signInWithEmailAndPassword(auth, email, password)
          .then(
            updateProfile(auth.currentUser, {
              displayName: username,
              orders: [],
              balance: 0,
            })
          )
          .then(
            setDoc(doc(db, "usersData", auth.currentUser.uid), {
              orders: [],
              balance: 0,
              payments: [],
            })
          );
      })
      .catch((err) => {
        const errorCode = err.code;
        let errorMessage = "";

        switch (errorCode) {
          case "auth/email-already-in-use":
            errorMessage =
              "Ky email eshte perdorur nje here, ju lutem perdorni nje tjeter.";
            break;
          case "auth/invalid-email":
            errorMessage = "Emaili nuk eshte i sakte.";
            break;
          case "auth/weak-password":
            errorMessage = "Passwordi duhet te jete 6 ose me shume karaktere.";
            break;
          default:
            errorMessage =
              "Ndodhi nje gabim gjate regjistrimit, provoni me vone.";
            break;
        }
        setAlert({ error: errorMessage });
      });
  };

  return (
    <Grid className="login" container justify="center">
      <Box m={5}>
        <label id="signup" className="login__label">
          Regjistrohu ne Platform
        </label>
        <AlertBox alert={alert} setAlert={setAlert} />
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
            id="email"
            label="Email"
            type="email"
            variant="outlined"
            value={email}
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
            Regjistrohu
          </Button>
        </form>
      </Box>
    </Grid>
  );
};

export default Signup;

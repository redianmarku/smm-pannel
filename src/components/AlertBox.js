import { Alert } from "@mui/material";
import React from "react";
import "./AlertBox.css";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  costumBox: {
    margin: 0,
    padding: 0,
    right: 0,
    width: "100%",
  },
});

function AlertBox({ alert, setAlert }) {
  const classes = useStyles();
  const handleButton = () => {
    setAlert({});
  };

  return (
    <div>
      {alert ? (
        <div>
          {alert.error ? (
            <div className="alert__box">
              <Alert className={classes.costumBox} severity="error">
                {alert.error}
              </Alert>
              <button onClick={handleButton} className="alert__button">
                OK
              </button>
            </div>
          ) : (
            <div>
              {" "}
              {alert.success ? (
                <div className="alert__box">
                  <Alert className={classes.costumBox} severity="success">
                    {alert.success}
                  </Alert>
                  <button onClick={handleButton} className="alert__button">
                    OK
                  </button>
                </div>
              ) : (
                ""
              )}{" "}
            </div>
          )}
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default AlertBox;

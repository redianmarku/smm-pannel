import { Alert } from "@mui/material";
import React, { useEffect, useRef } from "react";
import "./AlertBox.css";
import { makeStyles } from "@material-ui/core/styles";
import ErrorIcon from "@material-ui/icons/Error";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";

const useStyles = makeStyles({
  costumBox: {
    margin: 1,
    padding: 10,
    right: 0,
    width: "100%",
  },
});

function AlertBox({ alert, setAlert }) {
  const alertRef = useRef(null);

  useEffect(() => {
    if (alertRef.current) {
      alertRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [alertRef]);

  const classes = useStyles();
  const handleButton = () => {
    setAlert({});
  };

  return (
    <div>
      {alert ? (
        <div ref={alertRef}>
          {alert.error ? (
            <div className="alert__box_e">
              <div className="box__icon">
                <ErrorIcon />
              </div>
              <div className="box__message">{alert.error}</div>
              <div className="box__button">
                <button onClick={handleButton} className="alert__button">
                  OK
                </button>
              </div>
            </div>
          ) : (
            <div>
              {" "}
              {alert.success ? (
                <div className="alert__box_s">
                  <div className="box__icon">
                    <CheckCircleIcon />
                  </div>
                  <div className="box__message">{alert.success}</div>
                  <div className="box__button">
                    <button onClick={handleButton} className="alert__button">
                      OK
                    </button>
                  </div>
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

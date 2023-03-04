import { CircularProgress } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { selectServices } from "../../features/servicesSlice";
import "./Services.css";
import CustomizedTables from "./Table";

function Services() {
  const services = useSelector(selectServices);
  const isLoading = useSelector((state) => state.data.services.isLoading);
  return (
    <div>
      <h2>Te gjitha sherbimet</h2>
      {isLoading ? (
        <CircularProgress
          style={{
            display: "flex",
            alignItems: "center",
            margin: "auto",
            flexDirection: "column",
          }}
        />
      ) : (
        <CustomizedTables services={services} />
      )}
    </div>
  );
}

export default Services;

import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#d1e3ee",
    color: "black",
    fontWeight: "bolder",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "#f1f7fb",
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function CustomizedTables({ services }) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>ID</StyledTableCell>
            <StyledTableCell>Emri Sherbimit</StyledTableCell>
            <StyledTableCell>Cmimi per 100</StyledTableCell>
            <StyledTableCell>Limiti Porosise</StyledTableCell>
            <StyledTableCell>Kategoria</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {services.map((service) => (
            <StyledTableRow key={service.service}>
              <StyledTableCell component="th" scope="row">
                {service.service}
              </StyledTableCell>
              <StyledTableCell>{service.name}</StyledTableCell>
              <StyledTableCell>${service.rate}</StyledTableCell>
              <StyledTableCell>
                {service.min}-{service.max}
              </StyledTableCell>
              <StyledTableCell>{service.category}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

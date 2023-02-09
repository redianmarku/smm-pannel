import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { connect, useSelector } from "react-redux";

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

const CustomizedTableOrders = () => {
  const orders = useSelector((state) => state.data.user.orders);
  console.log(orders);
  return (
    <>
      {orders == [] ? (
        "Loading"
      ) : (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>ID</StyledTableCell>
                <StyledTableCell>ID e Sherbimit</StyledTableCell>
                <StyledTableCell>Linku</StyledTableCell>
                <StyledTableCell>Sasia</StyledTableCell>
                <StyledTableCell>Date/Ora e porosise</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => (
                <StyledTableRow key={order.orderId}>
                  <StyledTableCell component="th" scope="row">
                    {order.orderId}
                  </StyledTableCell>
                  <StyledTableCell>{order.serviceId}</StyledTableCell>
                  <StyledTableCell>{order.link}</StyledTableCell>
                  <StyledTableCell>{order.quantity}</StyledTableCell>
                  <StyledTableCell>{order.timestamp}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
};

// const mapStateToProps = (state) => ({
//   orders: state.orders,
// });

export default CustomizedTableOrders;

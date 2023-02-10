import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useSelector } from "react-redux";

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

const PaymentsTable = () => {
  const payments = useSelector((state) => state.data.user.payments);
  const countpayments = payments.length;

  return (
    <>
      {countpayments == 0 ? (
        'Ju nuk keni krijuar akoma ndonje porosi, per te krijuar porosi klikoni "Krijo Porosi" ne menu.'
      ) : (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>ID e pageses</StyledTableCell>
                <StyledTableCell>Metoda</StyledTableCell>
                <StyledTableCell>Sasia</StyledTableCell>
                <StyledTableCell>Data</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {payments.map((payment) => (
                <StyledTableRow key={payment.id}>
                  <StyledTableCell component="th" scope="row">
                    {payment.id}
                  </StyledTableCell>
                  <StyledTableCell>{payment.method}</StyledTableCell>
                  <StyledTableCell>${payment.amount}</StyledTableCell>
                  <StyledTableCell>{payment.date}</StyledTableCell>
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

export default PaymentsTable;

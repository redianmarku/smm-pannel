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
import { instance_order, instance_orderStatus, url } from "../../axios";

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
  const [statuses, setStatuses] = React.useState({});
  const [remains, setRemains] = React.useState({});

  const countorder = orders.length;

  // API Request
  const getApiOData = async (orderId) => {
    let status = "";
    let remains = 0;
    const data_order = {
      key: process.env.REACT_APP_SMMPANEL_API,
      action: "status",
      order: orderId,
    };

    const request = await instance_orderStatus.post("/", data_order);
    status = request.data.status;
    remains = request.data.remains;

    return { status, remains };
  };

  React.useEffect(() => {
    const fetchStatuses = async () => {
      const newStatuses = {};
      const newRemains = {};
      for (const order of orders) {
        const { status, remains } = await getApiOData(order.orderId);
        newStatuses[order.orderId] = status;
        newRemains[order.orderId] = remains;
      }
      setStatuses(newStatuses);
      setRemains(newRemains);
    };
    fetchStatuses();
  }, [orders]);

  return (
    <>
      {countorder == 0 ? (
        'Ju nuk keni krijuar akoma ndonje porosi, per te krijuar porosi klikoni "Krijo Porosi" ne menu.'
      ) : (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>ID e porosise</StyledTableCell>
                <StyledTableCell>ID e Sherbimit</StyledTableCell>
                <StyledTableCell>Linku</StyledTableCell>
                <StyledTableCell>Sasia</StyledTableCell>

                <StyledTableCell>Sasia e mbetur</StyledTableCell>
                <StyledTableCell>Statusi</StyledTableCell>
                <StyledTableCell>Pagesa e bere</StyledTableCell>
                <StyledTableCell>Date/Ora e krijimit</StyledTableCell>
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

                  <StyledTableCell>{remains[order.orderId]}</StyledTableCell>
                  <StyledTableCell>{statuses[order.orderId]}</StyledTableCell>
                  <StyledTableCell>${order.charge.toFixed(3)}</StyledTableCell>
                  <StyledTableCell>{order.timestamp}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <br />
      <br />
      <br />
      <br />
    </>
  );
};

// const mapStateToProps = (state) => ({
//   orders: state.orders,
// });

export default CustomizedTableOrders;

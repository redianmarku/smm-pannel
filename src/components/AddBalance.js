import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./AddBalance.css";
import CountUp from "react-countup";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import db, { auth } from "../firebase";
import { uuidv4 } from "@firebase/util";
import { setBalance, setPayment } from "../features/userSlice";
import PaymentsTable from "./PaymentsTable";

function AddBalance() {
  const [method, setMethod] = useState("");
  const [addbalance, setaddBalance] = useState(0);
  const user = auth.currentUser;
  const balance = useSelector((state) => state.data.user.balance);
  const payments = useSelector((state) => state.data.user.payments);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setMethod(e.target.value);
  };
  // console.log("Method: " + method + " Funds: " + addbalance);
  const date = new Date();
  const addBalanceDB = async (balancetoadd) => {
    console.log(typeof balance);
    console.log(typeof balancetoadd);
    const upadatedBalance = Number(balance) + Number(balancetoadd);
    await updateDoc(doc(db, "usersData", user.uid), {
      balance: upadatedBalance,
      payments: [
        ...payments,
        {
          id: uuidv4().substring(0, 4),
          date: date.toLocaleString(),
          amount: balancetoadd,
          method: method,
        },
      ],
    });
  };

  const updateState = async () => {
    const userDataSnap = await getDoc(doc(db, "usersData", user.uid));

    if (userDataSnap.exists()) {
      dispatch(setBalance(userDataSnap.data().balance));
      dispatch(setPayment(userDataSnap.data().payments));
    }
  };
  const handleConfirm = () => {
    addBalanceDB(addbalance);
    updateState();
  };

  return (
    <div className="addbalance">
      <h2>Shto balance ne llogari</h2>
      <div className="addbalance__balanca">
        <p>
          Balanca: $<CountUp end={balance} duration={1} />
        </p>
      </div>
      <hr />
      <div className="addbalance__add">
        <label htmlFor="">Metoda e pageses</label>
        <div className="addbalance__selctor">
          <select required name="" id="" onChange={handleChange}>
            <option key={1} value="Paypal">
              Paypal
            </option>
            <option key={2} value="Stripe">
              Stripe
            </option>
          </select>
        </div>
        <label htmlFor="">Sasia e parave qe doni te shtoni</label>
        <div className="addbalance__field">
          <input
            placeholder="Sasia e parave..."
            value={addbalance}
            onChange={(e) => {
              setaddBalance(e.target.value);
            }}
            type="number"
          />
        </div>
        <button
          onClick={handleConfirm}
          className="button__submit"
          type="submit"
          style={{ marginTop: "25px" }}
        >
          Paguaj
        </button>
      </div>
      <PaymentsTable />
      <br />
      <br />
      <br />
    </div>
  );
}

export default AddBalance;

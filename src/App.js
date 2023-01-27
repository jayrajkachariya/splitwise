import "./styles.css";
import data from "../data.json";
import { useEffect, useState } from "react";

const dataHeader = [
  "Date",
  "Narration",
  "Withdrawal Amt.",
  "Deposit Amt.",
  "Closing Balance"
];

const listOfWithdrawal = [
  "INDMONEY US STOCKS",
  "PAYMENT ON CRED",
  "INDIAN CLEARING",
  "SLICE",
  "FINZOOMERS SERVICES",
  "ACH D- HDFCLTD",
  "PAYTM"
];

const listOfCredit = ["BRIGHTCHAMPS", "ACH C"];

const filterWithdrawalAmountByKeyWord = (keyword, type) => {
  let total = 0;
  for (let i = 0; i < data.length; i++) {
    const curr = data[i];
    total += curr["Narration"].includes(keyword)
      ? +curr[type === "withdrawal" ? "Withdrawal Amt." : "Deposit Amt."]
      : 0;
  }
  return total;
};

export default function App() {
  const [creditList, setCreditList] = useState({});
  const [withdrawalList, setWithdrawalList] = useState({});
  useEffect(() => {
    setWithdrawalList(
      listOfWithdrawal.reduce(
        (acc, curr) => ({
          ...acc,
          [curr]: filterWithdrawalAmountByKeyWord(curr, "withdrawal")
        }),
        {}
      )
    );
    setCreditList(
      listOfCredit.reduce(
        (acc, curr) => ({
          ...acc,
          [curr]: filterWithdrawalAmountByKeyWord(curr, "credit")
        }),
        {}
      )
    );
  }, []);
  return (
    <div className="App">
      <div className="flex">
        <div>
          <h2>Split Wise</h2>
          <table>
            <tbody>
              <tr className="dark">
                {dataHeader.map((item) => (
                  <th key={item}>{item}</th>
                ))}
              </tr>
              {data.map((item, index) => (
                <tr key={item["Closing Balance"] + "_" + index}>
                  {dataHeader.map((curr) => (
                    <th key={item}>{item[curr]}</th>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div>
          <h2>Withdrawal</h2>
          <table>
            <tbody>
              <tr className="dark">
                <th>Item</th>
                <td>Amount</td>
              </tr>
              {Object.keys(withdrawalList).map((item) => (
                <tr key={item}>
                  <th>{item}</th>
                  <td>{withdrawalList[item]}</td>
                </tr>
              ))}
              <tr className="dark">
                <th>Total</th>
                <td>
                  {Object.values(withdrawalList).reduce(
                    (curr, acc) => curr + acc,
                    0
                  )}
                </td>
              </tr>
            </tbody>
          </table>
          <h2>Credit</h2>
          <table>
            <tbody>
              <tr className="dark">
                <th>Item</th>
                <td>Amount</td>
              </tr>
              {Object.keys(creditList).map((item) => (
                <tr key={item}>
                  <th>{item}</th>
                  <td>{creditList[item]}</td>
                </tr>
              ))}
              <tr className="dark">
                <th>Total</th>
                <td>
                  {Object.values(creditList).reduce(
                    (curr, acc) => curr + acc,
                    0
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

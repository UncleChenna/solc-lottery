import React, { useEffect, useState } from "react";
import "./App.css";
import web3 from "./web3";
import lottery from "./lottery";

function App() {
  const [manager, setManager] = useState("");
  const [players, setPlayers] = useState("");
  const [balance, setBalance] = useState("");
  const [value, setValue] = useState(0);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchManager = async () => {
	  const managerAccount = await lottery.methods.manager().call();
	  console.log(managerAccount)
      const playersAccounts = await lottery.methods.getPlayers().call();
      const getBalance = await web3.eth.getBalance(lottery.options.address);
      setPlayers(playersAccounts);
      setManager(managerAccount);
      setBalance(web3.utils.fromWei(getBalance, "ether"));
    };

    fetchManager();
  }, []);

  const onEnter = async (e) => {
    e.preventDefault();

    const accounts = await web3.eth.getAccounts();
    setMessage("Your request is being processed");

    await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei(value, "ether"),
    });

    setMessage("Transaction processed succcessfully");
  };

  const onPickWinner = async (e) => {
    const accounts = await web3.eth.getAccounts();
    setMessage("Selecting lottery winner");

    await lottery.methods.pickWinner().send({
      from: accounts[0]
    });

    setMessage("A winner has been picked");
  };

  const classes = {
	container: {
		width: '80%',
		margin: 'auto',
		paddingTop: '20px'
	},
	header: {
		textAlign: 'center',
		borderBottom: '1px solid gray',
		paddingBottom: '12px'
	}
  }

  return (
    <div style={classes.container}>
      <h2 style={classes.header}>Lottery Contract</h2>
      <p>this contract is managed by {manager}</p>
      <p>there are currently {players.length} people in the lottery </p>
      <p>price to be won is {balance} Ether!!! </p>

      <hr />

      <form onSubmit={onEnter}>
        <h3>Want to try your luck ?</h3>

        <div>
          <label>Amount of Ether to enter: </label>
          <input
            value={value}
            onChange={(event) => setValue(event.target.value)}
            type="text"
          />
        </div>
        <input type="submit" value="Enter" />
      </form>
      <hr />
      <h4>Ready to pick a winner ?</h4>
      <button onClick={onPickWinner}>Pick a winner</button>
      <hr />
      <p>{message}</p>
    </div>
  );
}

export default App;

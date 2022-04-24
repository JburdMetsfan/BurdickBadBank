
function Withdraw() {
  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState("");
  const ctx = React.useContext(UserContext);
  const [balance, setBalance] = React.useState(ctx.users[0].balance);

  return (
    <Card
      txtcolor="white"
      bgcolor="warning"     
      header="Withdrawal"
      status={status}
      body={
        show ? (
          <WithdrawForm setShow={setShow} />
        ) : (
          <WithdrawMessage setShow={setShow} />
        )
      }
    />
  );

  //Form to enter withdrawal amount and track the state of the balance
  function WithdrawForm(props) {
    const [withdraw, setWithdraw] = React.useState("");
    const [disabled, setDisabled] = React.useState(true);

    function handleWithdraw() {
      if (!validate(Number(withdraw), balance)) return;

      setBalance(balance - withdraw);
      ctx.users[0].balance = balance - Number(withdraw);
      setWithdraw("");
      setShow(false);
    }

    return (
      <>
        <span className="balance-information">Account Balance ${balance}</span>
        <br />
        <br />
        Withdraw Amount
        <input
          type="input"
          className="form-control"
          id="withdraw"
          placeholder="Withdrawal Amount"
          value={withdraw}
          onChange={(e) => {
            setWithdraw(e.currentTarget.value);
            setDisabled(false);
          }}
        />
        <br />
        <button
          type="submit"
          className="btn btn-light"
          onClick={handleWithdraw}
          disabled={disabled}
        >
          Withdraw
        </button>
      </>
    );
  }

  //Show success message and option to make another withdrawal
  function WithdrawMessage(props) {
    return (
      <>
        <span className="balance-information">Balance ${balance}</span>
        <br />
        <br />
        <h5>Successful Withdrawal</h5>
        <button
          type="submit"
          className="btn btn-light"
          onClick={() => props.setShow(true)}
        >
          Withdraw Again
        </button>
      </>
    );
  }

//Validate the different fields upon submit

  function validate(withdraw, balance) {
    if (isNaN(withdraw)) {
      setStatus("Error: did not enter a valid number");
      setTimeout(() => setStatus(""), 3000);
      return false;
    }
    if (withdraw > balance) {
      setStatus("Error: Insuffienct funds");
      setTimeout(() => setStatus(""), 8000);
      return false;
    }
    if (withdraw < 1) {
      setStatus("Error: Must withdraw $1 or higher");
      setTimeout(() => setStatus(""), 8000);
      return false;
    }
    return true;
  }
}
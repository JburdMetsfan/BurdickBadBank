
function Home(){
  return (
    <Card
      txtcolor="white"
      bgcolor="primary"
      header="Bad Bank"
      title="Welcome And Proceed With Caution"
      text="Utilization of this banking app is at your own risk. Bad Bank is not liable for any miscalculation of funds."
      body={(<img src="bank.png" className="img-fluid" alt="Responsive image"/>)}
    />    
  );  
}

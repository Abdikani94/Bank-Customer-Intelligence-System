import CustomerForm from "./CustomerForm";

function PredictionForm(props) {
  return <CustomerForm {...props} mode="prediction" />;
}

export default PredictionForm;

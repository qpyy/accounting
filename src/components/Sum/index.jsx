import "./style.css";

const Sum = ({ totalAmount }) => {
  return (
    <p className="sum">
      Итог: <span>{totalAmount}</span>
    </p>
  );
};

export default Sum;

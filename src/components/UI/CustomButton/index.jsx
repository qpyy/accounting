const CustomButton = ({
  labelButtonText,
  type,
  handleClickButton = null,
  icon = null,
}) => {
  return (
    <button onClick={handleClickButton} type={type}>
      {icon && <img src={icon} alt="icon" className="icon" />}
      {labelButtonText}
    </button>
  );
};

export default CustomButton;

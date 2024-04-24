const CustomInput = ({
  name,
  value,
  handleChangeInput,
  labelInputText,
  className,
}) => {
  return (
    <div className="custom-input">
      <p>{labelInputText}</p>
      <input
        className={className}
        name={name}
        type="text"
        value={value}
        onChange={handleChangeInput}
      />
    </div>
  );
};

export default CustomInput;

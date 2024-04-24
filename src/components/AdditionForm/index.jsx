import CustomInput from "../UI/CustomInput";
import CustomButton from "../UI/CustomButton";
import "./style.css";

const AdditionForm = ({ costData, handleChangeInput, validationAddCost }) => {
  return (
    <form className="accounting-form" onSubmit={validationAddCost}>
      <CustomInput
        className="accounting-form__input-place"
        labelInputText="Куда было потрачено?"
        handleChangeInput={handleChangeInput}
        name="place"
        value={costData.place}
      />
      <CustomInput
        className="accounting-form__input-amount"
        labelInputText="Сколько было потрачено?"
        name="amount"
        handleChangeInput={handleChangeInput}
        value={costData.amount}
      />
      <CustomButton labelButtonText="Добавить" type="submit" />
    </form>
  );
};

export default AdditionForm;

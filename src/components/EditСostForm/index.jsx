import CustomButton from "../UI/CustomButton";
import CustomInput from "../UI/CustomInput";
import closeIcon from "../../images/close.svg";
import refreshIcon from "../../images/refresh.svg";
import "./style.css";

const EditСostForm = ({
  index,
  editedCost,
  cancelEditCost,
  handleEditChangeInput,
  editCost,
}) => {
  return (
    <div className="editing-form">
      <div className="editing-form__item">
        <p>{index + 1 + ")"}</p>
        <CustomInput
          name="place"
          value={editedCost.place}
          handleChangeInput={handleEditChangeInput}
          className="editing-form__input"
        />
        <div className="editing-form__description">
          <CustomInput
            name="date"
            value={editedCost.date}
            handleChangeInput={handleEditChangeInput}
            className="editing-form__input"
          />
          <CustomInput
            name="money"
            value={editedCost.money}
            handleChangeInput={handleEditChangeInput}
            className="editing-form__input"
          />
          <div className="editing-form__button">
            <CustomButton
              icon={refreshIcon}
              type="button"
              handleClickButton={editCost}
            />
            <CustomButton
              icon={closeIcon}
              type="button"
              handleClickButton={cancelEditCost}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditСostForm;

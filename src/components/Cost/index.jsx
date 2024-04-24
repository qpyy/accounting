import CustomButton from "../UI/CustomButton";
import formatDate from "../helpers/formatDate";
import deleteIcon from "../../images/delete.svg";
import editIcon from "../../images/edit.svg";
import "./style.css";

const Cost = ({ cost, deleteCost, index, handleEditCost }) => {
  return (
    <div className="cost">
      <div className="cost__item">
        <p>{index + 1 + ")"}</p>
        <p>{cost.place}</p>
      </div>
      <div className="cost__description">
        <p>{formatDate(cost.date, "DD.MM.YYYY")}</p>
        <p>{cost.money}</p>
        <div className="cost__buttons">
          <CustomButton
            icon={editIcon}
            type="button"
            handleClickButton={() => handleEditCost(cost._id)}
          />
          <CustomButton
            icon={deleteIcon}
            type="button"
            handleClickButton={() => deleteCost(cost._id)}
          />
        </div>
      </div>
    </div>
  );
};

export default Cost;

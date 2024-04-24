import { useState, useEffect } from "react";
import AdditionForm from "../AdditionForm";
import EditСostForm from "../EditСostForm";
import Sum from "../Sum";
import Error from "../Error";
import Cost from "../Cost";
import formatDate from "../helpers/formatDate";
import {
  fetchCostsService,
  deleteCostService,
  editCostService,
  addCostService,
} from "../../services";
import "./style.css";

const Main = () => {
  const [costs, setCosts] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [errorMessage, setErrorMessage] = useState(null);
  const [costData, setCostData] = useState({ place: "", amount: "" });
  const [editingCostId, setEditingCostId] = useState(null);
  const [editedCost, setEditInputValue] = useState({
    place: "",
    date: "",
    amount: "",
  });

  useEffect(() => {
    fetchCosts();
  }, []);

  useEffect(() => {
    calculateTotalAmount();
  }, [costs]);

  const calculateTotalAmount = () => {
    let total = 0;
    costs.forEach((cost) => {
      total += parseFloat(cost.money);
    });
    setTotalAmount(total);
  };

  const fetchCosts = async () => {
    try {
      const costs = await fetchCostsService();
      setCosts(costs);
      setErrorMessage("");
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const validationAddCost = (event) => {
    event.preventDefault();
    const amount = parseFloat(costData.amount);
    setErrorMessage("");

    if (!costData.place.trim() || !costData.amount.trim()) {
      setErrorMessage("Заполните все поля.");
      return;
    }

    if (isNaN(amount) || amount <= 0) {
      setErrorMessage("Введите корректную сумму.");
      return;
    }

    addCost();
  };

  const addCost = async () => {
    try {
      const newCost = await addCostService(
        costData.place.trim(),
        costData.amount.trim()
      );
      setCosts([...costs, newCost]);
      setErrorMessage("");
      setCostData({ place: "", amount: "" });
    } catch (error) {
      setErrorMessage("Ошибка добавления расхода!");
    }
  };

  const deleteCost = async (id) => {
    try {
      const deletedCount = await deleteCostService(id);
      if (deletedCount.status === 200) {
        setCosts(costs.filter((cost) => cost._id !== id));
        setErrorMessage("");
      }
    } catch (error) {
      setErrorMessage("Ошибка удаления расхода!");
    }
  };

  const editCost = async () => {
    try {
      const formattedEditInputValue = {
        ...editedCost,
        date: formatDate(editedCost.date, "ISO"),
      };
      const editedItem = await editCostService(
        editingCostId,
        formattedEditInputValue
      );
      const updatedCosts = [...costs];
      const index = updatedCosts.findIndex(
        (cost) => cost._id === editedItem._id
      );

      if (index !== -1) {
        updatedCosts[index] = editedItem;
        setCosts(updatedCosts);
      }

      setEditingCostId(null);
      setErrorMessage("");
    } catch (error) {
      setErrorMessage("Ошибка редактирования расхода!");
    }
  };

  const handleEditChangeInput = (event) => {
    setEditInputValue({
      ...editedCost,
      [event.target.name]: event.target.value,
    });
  };

  const handleEditCost = (id) => {
    const editedAmount = costs.find((cost) => cost._id === id);

    if (!editedAmount) {
      return;
    }

    setEditingCostId(id);
    setEditInputValue({
      ...editedAmount,
      date: formatDate(editedAmount.date, "DD.MM.YYYY"),
    });
  };

  const handleChangeInput = (event) => {
    const { name, value } = event.target;
    setCostData((state) => ({ ...state, [name]: value }));
  };

  const cancelEditCost = () => {
    setEditingCostId(null);
  };

  return (
    <div className="main">
      <h1>Учет моих расходов</h1>
      <AdditionForm
        handleChangeInput={handleChangeInput}
        handleChangeInputAmount={handleChangeInput}
        validationAddCost={validationAddCost}
        costData={costData}
      />
      <Sum totalAmount={totalAmount} />
      <Error errorMessage={errorMessage} />
      {costs.map((cost, index) =>
        cost._id === editingCostId ? (
          <EditСostForm
            key={cost._id}
            index={index}
            cost={cost}
            editedCost={editedCost}
            cancelEditCost={cancelEditCost}
            handleEditChangeInput={handleEditChangeInput}
            editCost={editCost}
          />
        ) : (
          <Cost
            key={cost._id}
            index={index}
            cost={cost}
            deleteCost={deleteCost}
            handleEditCost={handleEditCost}
          />
        )
      )}
    </div>
  );
};

export default Main;

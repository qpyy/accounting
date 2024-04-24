import $api from "../http";

const baseUrl = process.env.REACT_APP_URL;

const fetchCostsService = async () => {
  const response = await $api.get(`${baseUrl}/costs/`);
  return response.data;
};

const addCostService = async (place, money) => {
  const response = await $api.post(`${baseUrl}/costs/`, {
    place,
    money,
  });
  return response.data;
};

const deleteCostService = async (id) => {
  const response = await $api.delete(`${baseUrl}/costs/${id}`);
  return response;
};

const editCostService = async (id, editedCost) => {
  const response = await $api.patch(`${baseUrl}/costs/${id}`, editedCost);
  return response.data;
};

export {
  editCostService,
  deleteCostService,
  addCostService,
  fetchCostsService,
};

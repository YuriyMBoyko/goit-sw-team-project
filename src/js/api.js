import axios from 'axios';
import { sleep } from './helpers.js';

const ApiBaseURL = 'https://deserts-store.b.goit.study/api';
const ApiMethods = [
  '/categories',
  '/desserts',
  '/feedbacks',
  '/orders',
];

axios.defaults.baseURL = ApiBaseURL;

export async function fetchCategories() {
  await await sleepToTest();

  const response = await axios.get(ApiMethods[0]);
  return response.data;
}

export async function fetchDessertsByCategory(category, page = 1, limit = 10) {
  await sleepToTest();

  const parameters = {
    params: {
      page: page,
      limit: limit,
    },
  };
  if ((category) && (category !== '')) {
    parameters.params.category = category;
  }

  const response = await axios.get(ApiMethods[1], parameters);
  return response.data;
}

export async function fetchDessert(id) {
  await sleepToTest();

  const response = await axios.get(`${ApiMethods[1]}/${id}`);
  return response.data;
}

export async function fetchFeedbacks(page = 1, limit = 10) {
  await sleepToTest();

  const parameters = {
    params: {
      page: page,
      limit: limit,
    },
  };

  const response = await axios.get(ApiMethods[2], parameters);
  return response.data;
}

export async function postOrder({ name, phone, dessertId, comment }) {
  const formData = {
    name: name,
    phone: phone,
    dessertId: dessertId,
    comment: comment,
  };

  const response = await axios.post(ApiMethods[3], formData);
  return response.data;
}

export async function getPopularDesserts(page = 1, limit = 10) {
  await sleepToTest();

  const parameters = {
    params: {
      page: page,
      limit: limit,
      type: 'popular',
    },
  };

  const response = await axios.get(ApiMethods[1], parameters);
  return response.data;
}

async function sleepToTest() {
  await sleep(500);
}
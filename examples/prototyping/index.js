import DogApi from './DogApi.js';

try {
  const api = new DogApi();
  const breeds = await api.getAllBreeds();

  console.log(breeds);
} catch (err) {
  console.log(err)
}
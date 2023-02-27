import fetch from 'node-fetch';
import prototypeProperties from './prototypeProperties.js'
import helpers from './helpers.js'


class DogApi {
  constructor() {
    this.baseUrl = 'https://dog.ceo/api';
    this.expiresIn = 300;
  }

  async getAllBreeds() {
    try {
      let cached;
      const cacheKey = 'breeds-list-all';
      cached = await this.getCache(cacheKey)
      if (cached) {
        console.log('Reading cached result.');
        return cached;
      }


      const response = await fetch(`${this.baseUrl}/breeds/list/all`);

      cached = await response.json();

      const cacheStatus = await this.setCache(cacheKey, cached.message, this.expiresIn);


      return cached.message
    } catch (err) {
      console.log("Error", err.message)
      console.log(err)
    }

  }
}

prototypeProperties(DogApi, helpers)

export default DogApi;

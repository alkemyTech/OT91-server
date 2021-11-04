import axios from 'axios'
const baseURL = 'http://ongapi.alkemy.org/public/api'

export const getCategories = async () => {
  try {
    const response = await axios.get(
      'http://ongapi.alkemy.org/public/api/categories'
    )
    return response.data.data
  } catch (error) {
    console.log(error)
  }
}

export const getCategory = async (id) => {
  const response = await axios.get(`${baseURL}/categories/${id}`)
  const data = response.data.data
  return data
}

const headers = {
  'Content-Type': 'application/json',
}

export const createOrUpdateNews = async (id, categorieData) => {
  try {
    if (id) {
      await axios.put(`${baseURL}/categories/${id}`, categorieData, {
        headers: headers,
      })
    } else {
      axios.post(`${baseURL}/categories`, categorieData, { headers: headers })
    }
  } catch (err) {
    console.error(err)
  }
}

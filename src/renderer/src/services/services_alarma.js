import axios from 'axios'

export const fetchData = async () => {
  try {
    const response = await axios.get('http://localhost:3005/api/alerts/getAlerts')
    return [...response.data.data]
  } catch (error) {
    console.error('Error obteniendo datos:', error)
  }
}

export const putResolve = async (id) => {
  try {
    const response = await axios.put(`http://localhost:3005/api/alerts/resolveAlert/${id}`)
  } catch (error) {
    console.error('Error ingresando los datos:', error)
  }
}

export const putReopen = async (id) => {
  try {
    const response = await axios.put(`http://localhost:3005/api/alerts/reopenAlert/${id}`)
  } catch (error) {
    console.error('Error ingresando los datos', error)
  }
}

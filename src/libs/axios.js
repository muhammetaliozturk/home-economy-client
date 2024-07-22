import Vue from 'vue'

// axios
import axios from 'axios'

const axiosIns = axios.create({
  baseURL: 'http://localhost:5167/',
  headers: {
    'Content-type': 'application/json'
  }
});

Vue.prototype.$http = axiosIns

export default axiosIns

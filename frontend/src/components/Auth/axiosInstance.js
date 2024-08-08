import axios from 'axios';


const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000',
  timeout: 10000, // Optional: Set a timeout
  headers: { 'Content-Type': 'application/json' } // Optional: Set default headers
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); 
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && ( error.response.status === 401 || error.response.status === 403)) {
      // Redirect to login page on unauthorized error
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('userEmail');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;

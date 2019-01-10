import { decorate, observable } from "mobx";
import axios from "axios";
import jwt_decode from "jwt-decode";

// My Imports

class AuthStore {
  constructor() {
    this.user = null;
  }

  checkForToken() {
    const token = localStorage.getItem("token");
    if (token) {
      const currentTime = Date.now() / 1000;
      const user = jwt_decode(token);
      if (user.exp >= currentTime) {
        this.setAuthToken(token);
        console.log(user);
      } else {
        this.setAuthToken();
      }
    }
  }

  setAuthToken(token) {
    if (token) {
      localStorage.setItem("token", token);
      axios.defaults.headers.common.Authorization = `jwt ${token}`;
      this.user = jwt_decode(token);
    } else {
      localStorage.removeItem("token");
      delete axios.defaults.headers.common.Authorization;
      this.user = null;
    }
  }

  signUp(userData) {
    axios
      .post("https://the-index-api.herokuapp.com/signup/", userData)
      .then(res => res.data)
      .then(user => {
        this.user = jwt_decode(user.token);
        this.setAuthToken(user.token);
      })
      .catch(err => console.error(err.response.data));
  }

  login(userData) {
    axios
      .post("https://the-index-api.herokuapp.com/login/", userData)
      .then(res => res.data)
      .then(user => {
        this.user = jwt_decode(user.token);
        this.setAuthToken(user.token);
      })
      .catch(err => console.error(err.response.data));
  }

  logout() {
    this.setAuthToken();
  }
}

decorate(AuthStore, {
  user: observable
});

const authStore = new AuthStore();
authStore.checkForToken();

export default authStore;

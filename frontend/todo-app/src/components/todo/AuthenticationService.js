import axios from 'axios'
import {API_URL} from '../../Constants'

export const USER_NAME_SESSION_ATTRIBUTE_NAME='authenticatedUser'
class AuthenticationService {

  createBasicAuthToken(username,password){
    return 'Basic '+window.btoa(username+":"+password)
  }

  createJWTToken(token){
    return 'Bearer '+token
  }

  executeBasicAuthenticationService(username,password){
    return axios.get(`${API_URL}/basicauth`,{headers:{authorization:this.createBasicAuthToken(username,password)}})
  }

  executeJWTAuthenticationService(username,password){
    return axios.post(`${API_URL}/authenticate`,{username,password})
  }

  registerSuccessfulLogin(username, password) {
    this.createBasicAuthToken(username,password)
    sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, username);
    this.setupAxiosInterceptor(this.createBasicAuthToken(username,password))
  }

  registerSuccessfulLoginForJWT(username, token) {
    sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, username);
    this.setupAxiosInterceptor(this.createJWTToken(token))
  }

  logout() {
    sessionStorage.removeItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
    if (user === null) return false;
    return true;
  }

  getLoggedInUserName() {
    let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
    if (user === null) return "";
    return user;
  }

  setupAxiosInterceptor(token){
    axios.interceptors.request.use(
      (config)=>{
        if(this.isUserLoggedIn())
     config.headers.authorization=token
       return config
      }

    )

  }
}
export default new AuthenticationService();

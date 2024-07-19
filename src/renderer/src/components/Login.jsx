import { Navigate, useNavigate } from 'react-router-dom'
import logo from '../assets/svg/tiny-Codelco_logo.svg'
import * as data from '../services/userDev.json'

export const Login = () => {
  const navigate = useNavigate()

  const authUser = () => {
    const inputEmail = document.querySelector('#email')
    const inputPassword = document.querySelector('#password')
    if (data.user === inputEmail.value) {
      if (data.pass === inputPassword.value) {
        navigate('alarma-lista')
        //return (window.location.href = location.href + '#/alarma-lista')
      }
      return 'Contraseña incorrecta'
    }
    return
  }

  return (
    <div className="container">
      <img className="backgroundImage"></img>
      <div className="login">
        <div className="logoCircle">
          <img className="logo" src={logo} />
        </div>
        <div className="formLogin" action="" method="">
          <label htmlFor="email">Usuario</label>
          <input name="email" id="email" type="email" placeholder="Inserte texto..."></input>
          <div className="space"></div>
          <label htmlFor="password">Contraseña</label>
          <input
            name="password"
            id="password"
            type="password"
            placeholder="Inserte texto..."
          ></input>
          <div className="space"></div>
          <button id="authUser" type="button" onClick={authUser}>
            Ingresar
          </button>
        </div>
      </div>
    </div>
  )
}

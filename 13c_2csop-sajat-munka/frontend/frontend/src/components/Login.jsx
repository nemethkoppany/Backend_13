import { useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const emailInput = useRef("");
  const passwordInput = useRef("");

  async function login() {
    const email = emailInput.current.value;
    const password = passwordInput.current.value;

    try {
      const response = await fetch("http://localhost:3000/user/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log(data);

      if (data.token) {
        localStorage.setItem("token", data.token);
        navigate("/chat");
      } else {
        alert("Hibás jelszó vagy felhasználónév");
      }
    } catch (err) {
      alert("Hiba a bejelentkezés során");
      console.error(err);
    }
  }

  function goToRegister() {
    navigate("/register");
  }

  return (
    <div className="login-body">
      <h2>Bejelentkezés</h2>
      <div className="login-inputs">
        <div>
          <label htmlFor="email">Email: </label>
          <input ref={emailInput} type="email" id="email" placeholder="Email" />
        </div>
        <div>
          <label htmlFor="password">Jelszó: </label>
          <input
            ref={passwordInput}
            type="password"
            id="password"
            placeholder="Jelszó"
          />
        </div>
      </div>
      <button id="login-btn" onClick={login}>
        Belépés
      </button>
      <button id="register-btn" onClick={goToRegister}>
        Regisztráció
      </button>
    </div>
  );
}

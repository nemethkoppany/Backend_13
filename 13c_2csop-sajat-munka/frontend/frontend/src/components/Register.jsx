import { useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const emailInput = useRef("");
  const passwordInput = useRef("");
  const avatarInput = useRef(null);

  async function register() {
    const email = emailInput.current.value;
    const password = passwordInput.current.value;
    const avatar = avatarInput.current.files[0];

    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    if (avatar) {
      formData.append("avatar", avatar);
    }

    try {
      const response = await fetch("http://localhost:3000/user/signup", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("Sikeres regisztráció!");
        navigate("/login");
      } else {
        const err = await response.text();
        alert(err);
      }
    } catch (err) {
      alert("Hiba a regisztráció során");
      console.error(err);
    }
  }

  return (
    <div className="register-body">
      <h2>Regisztráció</h2>
      <div className="login-inputs">
        <input
          ref={emailInput}
          type="email"
          id="email"
          placeholder="Email"
        />
        <br />
        <br />
        <input
          ref={passwordInput}
          type="password"
          id="password"
          placeholder="Jelszó"
        />
        <br />
        <br />
        <div className="avatar-inputs">
          <label>Avatar:</label>
          <input ref={avatarInput} type="file" id="avatar" accept="image/*" />
          <br />
          <br />
        </div>
      </div>
      <button id="register-register-btn" onClick={register}>
        Regisztráció
      </button>
    </div>
  );
}

import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
export default function Authentication(props) {
  const { handleCloseModal } = props;
  const [isReg, setIsReg] = useState(false);
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [error, setError] = useState(null);

  const { signup, login } = useAuth();

  async function handleAuth() {
    if (
      !email ||
      !email.includes("@") ||
      !pass ||
      pass.length < 6 ||
      isAuthenticating
    ) {
      return;
    }
    try {
      setIsAuthenticating(true);
      setError(null);
      if (isReg) {
        await signup(email, pass);
      } else {
        await login(email, pass);
      }
      handleCloseModal();
    } catch (error) {
      console.error(error.message);
      setError(error.message);
    } finally {
      setIsAuthenticating(false);
    }
  }
  return (
    <>
      <h2 className="sign-up-text">{isReg ? "Sign up" : "Login"}</h2>
      <p>{isReg ? "Create an account!" : "Log in your account"}</p>
      {error && <p>&#10060; {error}</p>}
      <input
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        placeholder="Email"
      />
      <input
        value={pass}
        onChange={(e) => {
          setPass(e.target.value);
        }}
        type="password"
        placeholder="*******"
      />
      <button onClick={handleAuth}>
        {isAuthenticating ? "Authenticating.." : "Submit"}
      </button>
      <hr />
      <div className="register-content">
        <p>{isReg ? "Already have an account" : "Don't have an account?"}</p>
        <button
          onClick={() => {
            setIsReg(!isReg);
          }}
        >
          <p>{isReg ? "Log in" : "Sign up"}</p>
        </button>
      </div>
    </>
  );
}

import React, { useState } from "react";
import { useCssHandles } from "vtex.css-handles";
import './style.css'

const CSS_form = [
    "container__newslatter-lp",
    "container__newslatter-title",
    "container__newslatter-input",
    "container__newslatter-input--container",
    "container__newslatter-form",
    "container__newslatter-button"
  ] as const;

const NewsletterFormLp = () => {
  const [email, setEmail] = useState("");
  const [isSuccessVisible, setIsSuccessVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
    const { handles } = useCssHandles(CSS_form);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault(); 

    if (email.trim() === "") {
      setErrorMessage("Por favor, insira um e-mail válido.");
      return;
    }

    const formData = {
      email: email,
      modal: true
    };

    try {
      const response = await fetch("/api/dataentities/--/documents", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsSuccessVisible(true);
        setErrorMessage(""); 
        localStorage.setItem("newsletter", "ativo");
        setEmail(""); 
      } else {
        setErrorMessage("Erro ao enviar o formulário. Tente novamente.");
      }
    } catch (error) {
      setErrorMessage("Erro ao conectar ao servidor.");
    }
  };

  return (
    <div className={handles["container__newslatter-lp"]} >
      <h3 className={handles["container__newslatter-title"]}>Inscreva-se e receba<br/>
      <strong>5% OFF</strong> na primeira compra</h3>
      <form className={handles["container__newslatter-form"]} onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px"}}>
      <div className={handles["container__newslatter-input--container"]}>
        <input
        className={handles["container__newslatter-input"]}
        type="email"
        placeholder="Insira seu e-mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        />
        </div>
        <button className={handles["container__newslatter-button"]} type="submit" >
        Eu quero
        </button>
      </form>

      {isSuccessVisible && <p style={{ color: "green", marginTop: "10px" }}>Cadastro realizado com sucesso!</p>}
      {errorMessage && <p style={{ color: "red", marginTop: "10px" }}>{errorMessage}</p>}
    </div>
  );
};

export default NewsletterFormLp;

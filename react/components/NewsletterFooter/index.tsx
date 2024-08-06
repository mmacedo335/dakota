import React, { useEffect, useState } from "react";
//@ts-ignore
import styles from "./style.css";

const ContactForm: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    nome: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/dataentities/NL/documents", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormData({
          email: "",
          nome: "",
        });
        const box = document.getElementById("mensagemsucesso");
        const content = document.getElementById("contentnewsletter");
        if (box != null) {
          box.style.display = "block";
        }
        if (content != null) { 
          content.style.display = "none";
        }
      } else {
        console.error("Ocorreu um erro ao enviar os dados."); 
      }
    } catch (error) {
      console.error("Ocorreu um erro ao enviar os dados.", error);
    }
  };

  useEffect(() => {
    setLoading(true);
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      {loading === true
        ? (
          <div className={styles.footernewsletter}>
            <div id="contentnewsletter"> 
              <div>
                <input
                  type="text"
                  id="name"
                  name="nome" 
                  value={formData.nome}
                  onChange={handleChange}
                  placeholder="Digite seu nome..."
                  required
                />
              </div>
              <div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Insira seu e-mail e receba as novidades.."
                  required
                />
              </div>
              <div className={styles.info}>
                <p>Ao clicar em ASSINAR declaro que concordo em receber novidades e promoções da Dakota e suas marcas. <br></br> Confira nossa <a href="/">Política de privacidade</a> </p>
              </div>
              <div className={styles.btn}>
                <button type="submit">ASSINAR</button>
              </div>
            </div> 
            <div
              id="mensagemsucesso"
              style={{ display: "none" }}
              className={styles.sucessomensagem}
            >
              <p>Parabéns! Seu cadastro na newsletter foi realizado com sucesso</p>
            </div>
          </div>
        )
        : (
          null
        )}
    </form>
  );
};

export default ContactForm;

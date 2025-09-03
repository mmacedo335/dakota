import React, { useEffect, useState } from "react";
import GoogleRecaptcha from "../../GoogleRecaptcha";
import safeFetch from "../../utils/safeFetch";
//@ts-ignore
import styles from "./style.css";
interface ContactFormProps {
  recaptchaTokenSE?:string | null
}
const ContactForm: React.FC = ({recaptchaTokenSE = "6LeXqLsrAAAAAE2-DcjeG44YgwaDBTHmK0GcITsM"}:ContactFormProps) => {
  const [loading, setLoading] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(recaptchaTokenSE);
  const [recaptchaError, setRecaptchaError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    email: "",
    nome: "",
    footer: true,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    const nome = formData.nome.trim();
    const email = formData.email.trim();

    if (!nome || !email) {
      setRecaptchaError("Preencha nome e e-mail.");
      setTimeout(() => setRecaptchaError(null), 4000);
      return;
    }

    if (!recaptchaToken) {
      setRecaptchaError("Por favor, confirme que você não é um robô.");
      setTimeout(() => setRecaptchaError(null), 5000);
      return;
    }

    setRecaptchaError(null);
    setIsSubmitting(true);

    const RECAPTCHA_ENDPOINT = "/_v/recaptcha";
    const NEWSLETTER_ENDPOINT = "/api/dataentities/NL/documents";

  
    try {
      const recaptchaRes = await safeFetch(RECAPTCHA_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: recaptchaToken }),
      });

      if (!recaptchaRes.ok) {
        setRecaptchaError("Falha ao validar reCAPTCHA. Tente novamente.");
        return;
      }

      const { success } = await recaptchaRes.json().catch(() => ({ success: false }));
      if (!success) {
        setRecaptchaError("Validação do reCAPTCHA inválida. Recarregue e tente novamente.");
        return;
      }

      const response = await safeFetch(NEWSLETTER_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData }),
      });

      if (!response.ok) {
        setRecaptchaError("Erro ao cadastrar e-mail. Tente novamente em instantes.");
        return;
      }

      setFormData({ email: "", nome: "", footer: true });
      setRecaptchaToken(null);

      const successBox = document.getElementById("mensagemsucesso");
      const content = document.getElementById("contentnewsletter");
      if (successBox) successBox.style.display = "block";
      if (content) content.style.display = "none";
    } catch (err) {
      if ((err as any)?.name === "AbortError") {
        setRecaptchaError("Tempo excedido. Verifique sua conexão.");
      } else {
        setRecaptchaError("Ocorreu um erro inesperado. Tente novamente.");
      }
    } finally {
      setIsSubmitting(false);
      if (recaptchaError) setTimeout(() => setRecaptchaError(null), 6000);
    }
  };

  useEffect(() => {
    setLoading(true);
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      {loading === true ? (
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
            <GoogleRecaptcha
              sitekey={recaptchaToken ?? ''}
              onVerify={(token) => {
                setRecaptchaToken(token);
                if (token) setRecaptchaError(null);
              }}
            />
            {recaptchaError && (
              <div
                style={{ color: "#FFF", fontSize: "12px", marginTop: "4px" }}
              >
                {recaptchaError}
              </div>
            )}
            <div className={styles.info}>
              <p>
                Ao clicar em ASSINAR declaro que concordo em receber novidades e
                promoções da Dakota e suas marcas. <br></br> Confira nossa{" "}
                <a href="/institucional/politica-privacidade">
                  Política de privacidade
                </a>{" "}
              </p>
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
            <p>
              Parabéns! Seu cadastro na newsletter foi realizado com sucesso
            </p>
          </div>
        </div>
      ) : null}
    </form>
  );
};

export default ContactForm;


;(ContactForm as any).schema = {
  title: 'Footer Newsletter',
  description: 'Formulário de newsletter com suporte a reCAPTCHA',
  type: 'object',
  properties: {
    recaptchaTokenSE: {
      title: 'Token reCAPTCHA',
      description: 'Token reCAPTCHA',
      type: 'string',
      default: ''
    }
  }
}
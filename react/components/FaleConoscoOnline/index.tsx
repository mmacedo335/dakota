import React, { useState } from "react";
import "./style.css"; 

const FaleConoscoOnline: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [isFormVisible, setIsFormVisible] = useState<boolean>(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState<boolean>(false);
  const [attachmentFile, setAttachmentFile] = useState<File | null>(null);

  const initialFormData = {
    fullName: "",
    email: "",
    phone: "",
    birthDate: "",
    city: "",
    state: "",
    productReference: "",
    cpf: "",
    stateRegistration: "",
    message: "",
    purchaseDate: "",
    storeName: "",
    formulario: "" // Campo para armazenar o nome do formulário
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    setSelectedOption(selectedValue);
    setIsFormVisible(!!selectedValue);
    setIsFormSubmitted(false); // Reset the submission state when a new option is selected

    // Atualiza o campo formulario com base na opção selecionada
    let formularioName = "";
    switch (selectedValue) {
      case "option1":
        formularioName = "Entrega";
        break;
      case "option2":
        formularioName = "Formas de pagamento";
        break;
      case "option3":
        formularioName = "Dúvidas, Críticas, Elogios ou Sugestões";
        break;
      case "option4":
        formularioName = "Informações sobre o Produto";
        break;
      default:
        formularioName = "";
    }

    setFormData({ ...formData, formulario: formularioName });
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAttachmentFile(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const dataToSubmit = {
      ...formData
    };

    try {
      const response = await fetch("/api/dataentities/FL/documents", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSubmit),
      });

      if (response.ok) {
        setFormData(initialFormData);
        setIsFormSubmitted(true);
        const responseData = await response.json();
        const DocumentId = responseData.DocumentId;

        if (attachmentFile != null) {

          const formData = new FormData();
          formData.append('anexo', attachmentFile);

          await fetch(`/api/dataentities/FL/documents/${DocumentId}/anexo/attachments`, {
            method: 'POST',
            body: formData,
          })

        }

      } else {
        console.error("Erro ao enviar o formulário");
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
    }
  };

  const renderForm = () => {
    switch (selectedOption) {
      case "option1":
        return (
          <div>
            <div>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
                placeholder="Mensagem"
              />
            </div>
          </div>
        );
      case "option2":
        return (
          <div>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              required
              placeholder="Mensagem"
            />
          </div>
        );
      case "option3":
        return (
          <>
            <div>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
                placeholder="Mensagem"
              />
            </div>
          </>
        );
      case "option4":
        return (
          <>
            <div className="anexo">
              <input
                type="file"
                name="attachment"
                onChange={handleFileChange}
              />
            </div>
            <div>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
                placeholder="Mensagem"
              />
            </div>

          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="fale-conosco">
      <select value={selectedOption} onChange={handleSelectChange}>
        <option value="">Assunto</option>
        <option value="option1">Entrega</option>
        <option value="option2">Formas de Pagamento</option>
        <option value="option3">Dúvidas, Críticas, Elogios ou Sugestões</option>
        <option value="option4">Informações sobre o Produto</option>
      </select>

      {isFormVisible && (
        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              placeholder="Nome Completo"
              required
            />
          </div>
          <div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="E-mail"
              required
            />
          </div>

          <div>
            <input
              type="text"
              name="cpf"
              value={formData.cpf}
              onChange={handleInputChange}
              required
              placeholder="CPF"
            />
          </div>

          <div>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="Telefone"
              required
            />
          </div>

          <div>
            <input
              type="text"
              name="productReference"
              value={formData.productReference}
              onChange={handleInputChange}
              required
              placeholder="Número do pedido"
            />
          </div>

          {renderForm()}

          <button type="submit">Enviar Formulário</button>
        </form>
      )}

      {isFormSubmitted && <p className="success-message">Mensagem enviada com sucesso!</p>}
    </div>
  );
};

export default FaleConoscoOnline;
 
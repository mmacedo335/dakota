import React, { useState } from "react";
import "./style.css";

const DynamicForms: React.FC = () => {
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
    cnpj: "",
    stateRegistration: "",
    message: "",
    purchaseDate: "",
    storeName: "",
    formulario: "",
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    setSelectedOption(selectedValue);
    setIsFormVisible(!!selectedValue);
    setIsFormSubmitted(false);

    let formularioName = "";
    switch (selectedValue) {
      case "option1":
        formularioName = "Onde Comprar";
        break;
      case "option2":
        formularioName = "Elogios, Dúvidas e Sugestões";
        break;
      case "option3":
        formularioName = "Lojistas e Representantes";
        break;
      case "option4":
        formularioName = "Reclamações/Críticas";
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

    if (name === "birthDate") {
      setFormData({ ...formData, [name]: formatDate(value) });
    } else if (name === "cnpj") {
      setFormData({ ...formData, [name]: formatCNPJ(value) });
    } else if (name === "phone") {
      setFormData({ ...formData, [name]: formatPhone(value) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAttachmentFile(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const entityMap: { [key: string]: string } = {
      "Onde Comprar": "OC",
      "Elogios, Dúvidas e Sugestões": "ED",
      "Lojistas e Representantes": "LR",
      "Reclamações/Críticas": "RC",
    };

    const entity = entityMap[formData.formulario] || "FL";
    const endpoint = `/api/dataentities/${entity}/documents`;

    const dataToSubmit = { ...formData };

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSubmit),
      });

      if (response.ok) {
        const responseData = await response.json();
        const documentId = responseData.DocumentId;

        if (attachmentFile) {
          const formDataToSend = new FormData();
          formDataToSend.append("anexo", attachmentFile);

          await fetch(
            `/api/dataentities/${entity}/documents/${documentId}/anexo/attachments`,
            {
              method: "POST",
              body: formDataToSend,
            }
          );
        }

        setFormData(initialFormData);
        setIsFormSubmitted(true);
      } else {
        console.error("Erro ao enviar o formulário.");
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
    }
  };

  // Funções de mascaras inputs

  const formatDate = (value: string) => {
    value = value.replace(/\D/g, "");
    if (value.length <= 2) return value;
    if (value.length <= 4) return `${value.slice(0, 2)}/${value.slice(2)}`;
    return `${value.slice(0, 2)}/${value.slice(2, 4)}/${value.slice(4, 8)}`;
  };

  const formatCNPJ = (value: string) => {
    value = value.replace(/\D/g, "");
    value = value.replace(/^(\d{2})(\d)/, "$1.$2");
    value = value.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3");
    value = value.replace(/\.(\d{3})(\d)/, ".$1/$2");
    value = value.replace(/(\d{4})(\d)/, "$1-$2");
    return value;
  };

  const formatPhone = (value: string) => {
    value = value.replace(/\D/g, "");
    if (value.length <= 2) return `(${value}`;
    if (value.length <= 7) return `(${value.slice(0, 2)}) ${value.slice(2)}`;
    if (value.length <= 11)
      return `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`;
    return `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7, 11)}`;
  };

  const renderForm = () => {
    switch (selectedOption) {
      case "option1":
        return (
          <div>
            <input
              type="text"
              name="productReference"
              value={formData.productReference}
              onChange={handleInputChange}
              required
              placeholder="Referência do produto"
            />
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
          </div>
        );
      case "option2":
        return (
          <div>
            <input
              type="text"
              name="productReference"
              value={formData.productReference}
              onChange={handleInputChange}
              required
              placeholder="Referência do produto"
            />
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
      case "option3":
        return (
          <>
            <div>
              <input
                type="text"
                name="cnpj"
                value={formData.cnpj}
                onChange={handleInputChange}
                required
                placeholder="CNPJ"
              />
            </div>
            <div>
              <input
                type="text"
                name="stateRegistration"
                value={formData.stateRegistration}
                onChange={handleInputChange}
                required
                placeholder="Inscrição Estadual"
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
      case "option4":
        return (
          <>
            <div>
              <input
                type="text"
                name="productReference"
                value={formData.productReference}
                onChange={handleInputChange}
                required
                placeholder="Referência do produto"
              />
            </div>
            <div>
              <input
                type="text"
                name="purchaseDate"
                value={formData.purchaseDate}
                onChange={handleInputChange}
                required
                placeholder="Data da Compra"
              />
            </div>
            <div>
              <input
                type="text"
                name="storeName"
                value={formData.storeName}
                onChange={handleInputChange}
                required
                placeholder="Nome e endereço da loja"
              />
            </div>
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
        <option value="option1">Onde Comprar</option>
        <option value="option2">Elogios, Dúvidas e Sugestões</option>
        <option value="option3">Lojistas e Representantes</option>
        <option value="option4">Reclamações/Críticas</option>
      </select>

      {isFormVisible && (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            required
            placeholder="Nome Completo"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            placeholder="E-mail"
          />
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            required
            placeholder="Telefone"
          />
          <input
            type="text"
            name="birthDate"
            value={formData.birthDate}
            onChange={handleInputChange}
            required
            placeholder="Data de Nascimento"
          />
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleInputChange}
            required
            placeholder="Cidade"
          />
          <input
            type="text"
            name="state"
            value={formData.state}
            onChange={handleInputChange}
            required
            placeholder="Estado"
          />
          {renderForm()}
          <button type="submit">Enviar Formulário</button>
        </form>
      )}

      {isFormSubmitted && <p className="success-message">Mensagem enviada com sucesso!</p>}
    </div>
  );
};

export default DynamicForms;

import React, { useState } from "react";
import "./style.css";

const DynamicForms: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [isFormVisible, setIsFormVisible] = useState<boolean>(false);

  const [formData, setFormData] = useState({
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
  });

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    setSelectedOption(selectedValue);
    setIsFormVisible(!!selectedValue);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log(formData)

    try {
      const response = await fetch("/api/dataentities/FL/documents", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("Formulário enviado com sucesso");
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
              name="birthDate"
              value={formData.birthDate}
              onChange={handleInputChange}
              placeholder="Data de Nascimento"
              required
            />
          </div>
          <div>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              required
              placeholder="Cidade"
            />
          </div>
          <div>
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleInputChange}
              required
              placeholder="Estado"
            />
          </div>

          {renderForm()}

          <button type="submit">Enviar Formulário</button>
        </form>
      )}
    </div>
  );
};

export default DynamicForms;
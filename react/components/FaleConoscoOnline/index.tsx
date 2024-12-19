import React, { useState } from "react";
import "./style.css";

const FaleConoscoOnline: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [isFormVisible, setIsFormVisible] = useState<boolean>(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState<boolean>(false);
  const [attachmentFile, setAttachmentFile] = useState<File[]>([]);
  const [subOption, setSubOption] = useState<string>("");

  const initialFormData = {
    fullName: "",
    email: "",
    phone: "",
    productReference: "",
    cpf: "",
    message: "",
    devolucao: "",
    escolha: "",
    desejo: "",
    formulario: "",
  };

  const [formData, setFormData] = useState(initialFormData);

  const entityMap: { [key: string]: string } = {
    Entrega: "ET",
    "Formas de pagamento": "FP",
    "Dúvidas, Críticas, Elogios ou Sugestões": "DE",
    "Informações sobre o Produto": "IP",
    "Troca/Devolução": "TD",
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    setSelectedOption(selectedValue);
    setIsFormVisible(!!selectedValue);
    setIsFormSubmitted(false);
    setSubOption("");

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
      case "option5":
        formularioName = "Troca/Devolução";
        break;
      default:
        formularioName = "";
    }

    setFormData({ ...formData, formulario: formularioName });
  };

  const handleSubOptionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSubOption(e.target.value);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (name === "phone") {
      setFormData({ ...formData, [name]: formatPhone(value) });
    } else if (name === "cpf") {
      setFormData({ ...formData, [name]: formatCPF(value) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const file = e.target.files?.[0];
    if (file) {
      const updatedFiles = [...attachmentFile];
      updatedFiles[index] = file;
      setAttachmentFile(updatedFiles);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const entityCode = entityMap[formData.formulario];
    if (!entityCode) {
      console.error("Entidade não encontrada para o formulário selecionado");
      return;
    }

    const dataToSubmit = {
      ...formData,
    };

    try {
      const response = await fetch(`/api/dataentities/${entityCode}/documents`, {
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

        for (const file of attachmentFile) {
          if (file) {
            const formDataToSend = new FormData();
            formDataToSend.append("anexo", file);

            await fetch(
              `/api/dataentities/${entityCode}/documents/${DocumentId}/anexo/attachments`,
              {
                method: "POST",
                body: formDataToSend,
              }
            );
          }
        }
      } else {
        console.error("Erro ao enviar o formulário");
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
    }
  };

  const formatCPF = (value: string) => {
    value = value.replace(/\D/g, "");
    value = value.replace(/^(\d{3})(\d)/, "$1.$2");
    value = value.replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3");
    value = value.replace(/\.(\d{3})(\d)/, ".$1-$2");
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

  const renderSubForm = () => {
    switch (subOption) {
      case "subOption1":
        return (
          <div className="options">
            <label>
              <input type="radio" name="escolha" value="Calçado ficou grande" onChange={handleInputChange} />
              Calçado ficou grande
            </label>
            <label>
              <input type="radio" name="escolha" value="Calçado ficou pequeno" onChange={handleInputChange} />
              Calçado ficou pequeno
            </label>
          </div>
        );
      case "subOption2":
        return (
          [0, 1, 2].map((index) => (
            <div className="anexo" key={index}>
              <input
                type="file"
                name={`attachment${index}`}
                onChange={(e) => handleFileChange(e, index)}
              />
            </div>
          ))
        );
      case "subOption3":
        return (
          <div className="options">
            <label>
              <input type="radio" name="escolha" value="Tamanho errado" onChange={handleInputChange} />
              Tamanho errado
            </label>
            <label>
              <input type="radio" name="escolha" value="Modelo errado" onChange={handleInputChange} />
              Modelo errado
            </label>
            <label>
              <input type="radio" name="escolha" value="Produto diferente do site (foto ou descrição)" />
              Produto diferente do site (foto ou descrição)
            </label>
          </div>
        );
      case "subOption4":
        return (
          [0, 1, 2].map((index) => (
            <div className="anexo" key={index}>
              <input
                type="file"
                name={`attachment${index}`}
                onChange={(e) => handleFileChange(e, index)}
              />
            </div>
          ))
        );
      default:
        return null;
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
            {[0, 1, 2].map((index) => (
              <div className="anexo" key={index}>
                <input
                  type="file"
                  name={`attachment${index}`}
                  onChange={(e) => handleFileChange(e, index)}
                />
              </div>
            ))}
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
            {[0, 1, 2].map((index) => (
              <div className="anexo" key={index}>
                <input
                  type="file"
                  name={`attachment${index}`}
                  onChange={(e) => handleFileChange(e, index)}
                />
              </div>
            ))}
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
      case "option5":
        return (
          <>
            <div>
              <input
                type="text"
                name="devolucao"
                value={formData.devolucao}
                onChange={handleInputChange}
                required
                placeholder="Produto a ser devolvido (Modelo/Cor/Número)"
              />
            </div>
            <div>
              <select value={subOption} onChange={handleSubOptionChange} required className="option">
                <option value="">Selecione um motivo</option>
                <option value="subOption1">Troca de Numeração</option>
                <option value="subOption2">Produto com Defeito</option>
                <option value="subOption3">Recebi o produto errado</option>
                <option value="subOption4">Produto não ficou bom</option>
              </select>
            </div>
            {renderSubForm()}
            <div className="options">
              <label>O que deseja?</label>
              <label>
                <input type="radio" name="desejo" value="Cupom Desconto" onChange={handleInputChange} />
                Cupom Desconto
              </label>
              <label>
                <input type="radio" name="desejo" value="Estorno" onChange={handleInputChange} />
                Estorno
              </label>
              <label>
                <input type="radio" name="desejo" value="Reembolso" onChange={handleInputChange} />
                Reembolso
              </label>
              <label>
                <input type="radio" name="desejo" value="Troca por outro número" onChange={handleInputChange} />
                Troca por outro número
              </label>
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
        <option value="option5">Troca/Devolução</option>
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

      {isFormSubmitted && (
        <p className="success-message">Mensagem enviada com sucesso!</p>
      )}
    </div>
  );
};

export default FaleConoscoOnline;

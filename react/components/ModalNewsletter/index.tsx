import React, { useEffect, useState, useRef } from 'react';
import './ModalNewsletter.css';

type PropsNewsletter = {
    valor: string,
    ativo: boolean,
    imagem: string,
    imagemFundo: string
}

function ModalNewsletter({ valor, ativo, imagem, imagemFundo }: PropsNewsletter) {

    if (ativo != true) {
        return null;
    }

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isSuccessVisible, setIsSuccessVisible] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [couponCopied, setCouponCopied] = useState(false);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    // Exibir o modal se o item 'newsletter' não estiver no localStorage
    useEffect(() => {
        if (!localStorage.getItem('newsletter')) {
            setIsModalVisible(true);
        }
    }, []);

    const handleCloseModal = () => {
        setIsModalVisible(false);
        localStorage.setItem('newsletter', 'ativo');
    };

    const handleCopyCoupon = () => {
        if (textareaRef.current) {
            textareaRef.current.select();
            document.execCommand('copy');
            setCouponCopied(true);
        }
    };

    const handleSubmit = async () => {
        if (name.trim() !== '' && email.trim() !== '') {
            const formData = {
                nome: name,
                email: email,
                modal: true
            };

            try {
                const response = await fetch('/api/dataentities/NL/documents', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });

                if (response.ok) {
                    setIsSuccessVisible(true);
                    // setIsModalVisible(false); 
                    localStorage.setItem('newsletter', 'ativo');
                } else {
                    console.log('Erro ao enviar dados:', response.statusText);
                }
            } catch (error) {
                console.error('Erro ao enviar o formulário:', error);
            }
        }
    };

    return (
        isModalVisible && (
            <div className="overlay-pop-dakota">
                <div className="fundo" onClick={handleCloseModal}></div>
                <div className="container-pop-dakota">
                    <span className="close" onClick={handleCloseModal}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512" width="24" height="24" fill="white"><path d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-28.28-28.28c-12.28-12.28-32.19-12.28-44.48 0L170 183.72 69.93 83.66c-12.28-12.28-32.19-12.28-44.48 0L-2.83 111.93c-12.28 12.28-12.28 32.19 0 44.48L97.24 256 0 353.24c-12.28 12.28-12.28 32.19 0 44.48l28.28 28.28c12.28 12.28 32.19 12.28 44.48 0L170 328.28l100.07 100.07c12.28 12.28 32.19 12.28 44.48 0l28.28-28.28c12.28-12.28 12.28-32.19 0-44.48L242.72 256z" /></svg></span>
                    <img
                        src={isSuccessVisible ? imagemFundo : imagem}
                        alt="Cadastre-se!"
                    />
                    <div id="container-buttons" style={{ display: isSuccessVisible ? 'none' : 'block' }}>
                        <input
                            type="text"
                            id="pop-dakota-name"
                            placeholder="Seu nome"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <input
                            type="email"
                            id="pop-dakota-email"
                            placeholder="Qual o seu email?"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <button id="send-cadastro" onClick={handleSubmit}>
                            ENVIAR!
                        </button>
                    </div>
                    <div id="container-sucesso" style={{ display: isSuccessVisible ? 'block' : 'none' }}>
                        <p>
                            <br />
                            <textarea
                                id="cupom-pop"
                                readOnly
                                value={valor}
                                ref={textareaRef}
                            />
                            <i
                                id="get-copy"
                                onClick={handleCopyCoupon}
                            >
                                {couponCopied ? <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="16px"><path fill="#db3d68" d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" /></svg> : <svg xmlns="http://www.w3.org/2000/svg" width="16px" viewBox="0 0 448 512"><path fill="#db3d68" d="M433.9 65.9l-51.9-51.9A48 48 0 0 0 348.1 0H176c-26.5 0-48 21.5-48 48v48H48c-26.5 0-48 21.5-48 48v320c0 26.5 21.5 48 48 48h224c26.5 0 48-21.5 48-48v-48h80c26.5 0 48-21.5 48-48V99.9a48 48 0 0 0 -14.1-33.9zM266 464H54a6 6 0 0 1 -6-6V150a6 6 0 0 1 6-6h74v224c0 26.5 21.5 48 48 48h96v42a6 6 0 0 1 -6 6zm128-96H182a6 6 0 0 1 -6-6V54a6 6 0 0 1 6-6h106v88c0 13.3 10.7 24 24 24h88v202a6 6 0 0 1 -6 6zm6-256h-64V48h9.6c1.6 0 3.1 .6 4.2 1.8l48.4 48.4a6 6 0 0 1 1.8 4.2V112z" /></svg>}
                            </i>
                            <br />
                        </p>
                    </div>
                </div>
            </div>
        )
    );
};


ModalNewsletter.schema = {
    title: "Modal newsletter",
    description: "Modal newsletter",
    type: "object",
    properties: {
        ativo: {
            title: 'Ativo?',
            type: 'boolean',
            default: null
        },
        valor: {
            title: 'Código cupom',
            type: 'string',
            default: null
        },
        imagem: {
            type: 'string',
            title: 'Banner',
            minItems: 0,
            default: null,
            widget: {
                'ui:widget': 'image-uploader',
            },
        },
        imagemFundo: {
            type: 'string',
            title: 'Segundo banner',
            minItems: 0,
            default: null,
            widget: {
                'ui:widget': 'image-uploader',
            },
        },
    }
}


export default ModalNewsletter;

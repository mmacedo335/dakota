import * as React from 'react';
import { useState } from 'react';

import styles from './CadastroBF.css';

function CadastroBF() {

    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [enviado, setEnviado] = useState(false);
    const [emailError, setEmailError] = useState('');

    const handleInputNome = (e: { target: { value: React.SetStateAction<string>; }; }) => {
        setNome(e.target.value);
    }
    const handleInputEmail = (e: { target: { value: React.SetStateAction<string>; }; }) => {
        const value = String(e.target.value);
        setEmail(value);
        // se já havia um erro e o novo valor é válido, limpa o erro para permitir envio
        if (emailError && isValidEmail(value.trim())) {
            setEmailError('');
        }
    }
    const handleInputFone = (e: { target: { value: React.SetStateAction<string>; }; }) => {
        setPhone(e.target.value);
    }

    const isValidEmail = (value: string) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(value);
    }

    const EnvioFormulario = () => {
        const trimmedEmail = email.trim();
        if (!isValidEmail(trimmedEmail)) {
            setEmailError('Por favor insira um e-mail válido');
            return;
        }

        // clear previous error
        setEmailError('');

        const data = {
            nome: nome.trim(),
            email: trimmedEmail,
            telefone: phone.trim(),
            origem: 'dakota'
        };

        window.fetch('/api/dataentities/BF/documents', {
            method: 'POST',
            headers: {
                "content-type": 'application/json',
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(() => {
                setEnviado(true);
            });
    };

    const isFormValid = nome.trim() !== '' && email.trim() !== '' && phone.trim() !== '' && emailError === '';

    return (
        <div className={styles.contentforms}>
            <div className={styles.content}>
                {!enviado ? (
                    <>
                        <div className={styles.texto}>
                            <strong>A promoção mais esperada do ano já está chegando.</strong>
                            <p>Entre para a lista vip e desbloqueie o cupom exclusivo de <strong>5% OFF*</strong> para usar em todo o site.</p>
                        </div>
                        <div className={styles.item}>
                            <input type="text" placeholder="Nome" onChange={handleInputNome} value={nome} />
                        </div>
                        <div className={styles.item}>
                            <input type="text" placeholder="Telefone" onChange={handleInputFone} value={phone} />
                        </div>
                        <div className={styles.item}>
                            <input type="text" placeholder="E-mail" onChange={handleInputEmail} value={email} />
                            {emailError && <div className={styles.error}>{emailError}</div>}
                        </div>
                        <button type="submit" onClick={EnvioFormulario} disabled={!isFormValid}>Cadastre-se</button>
                    </>
                ) : (
                    <div className={styles.textoConcluido}>
                        <strong>CADASTRO EFETUADO COM SUCESSO. oBRIGADO!</strong>
                        <p>aPROVEITE O PRESENTE EXCLUSIVO E ESCOLHA O SEU NOVO DAKOTA FAVORITO.</p>
                        <a href="/">Aproveitar Agora</a>
                    </div>
                )}
            </div>
            
            <div className={styles.valido}>*Válido em todo o site, de 05/11 à 30/11.</div>
            
        </div>
    );
}

export default CadastroBF;

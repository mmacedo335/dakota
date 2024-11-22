import * as React from 'react';
import { useState } from 'react';
/* @ts-ignore */
import styles from './CadastroBF.css';

function CadastroBF() {

    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [enviado, setEnviado] = useState(false);

    const handleInputNome = (e: { target: { value: React.SetStateAction<string>; }; }) => {
        setNome(e.target.value);
    }
    const handleInputEmail = (e: { target: { value: React.SetStateAction<string>; }; }) => {
        setEmail(e.target.value);
    }
    const handleInputFone = (e: { target: { value: React.SetStateAction<string>; }; }) => {
        setPhone(e.target.value);
    }

    const EnvioFormulario = () => {
        let data = {
            nome: nome,
            email: email,
            telefone: phone,
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

    const isFormValid = nome && email && phone;

    return (
        <div className={styles.contentforms}>
            <div className={styles.contentHeader}>
                <img src="https://dakota.vtexassets.com/assets/vtex.file-manager-graphql/images/f83a65a8-a031-4949-ad81-af6c6d8dc5d3___1f59d50d0c3834dad52939c7e2ae0544.png" className={styles.logobf} alt="Logo BF" />
                <div className={styles.divImg}>
                    <img src="https://dakota.vtexassets.com/assets/vtex.file-manager-graphql/images/0ae82206-9751-4678-ac9b-f36847a7eef6___a6f7817e504e9b0f6a05cf975c095e4e.png" className={styles.logoDakotabf} alt="Logo Dakota" />
                </div>

                {!enviado ? (
                    <>
                        <p className={styles.sub}>Descubra em primeira mão as ofertas da Dakota.</p>
                        <p className={styles.tit}>Cadastre-se e aproveite!</p>
                    </>
                ) : (
                    <p className={styles.pronto}>Pronto!</p>
                )}
            </div>

            <div className={styles.content}>
                {!enviado ? (
                    <>
                        <div className={styles.item}>
                            <input type="text" placeholder="Nome" onChange={handleInputNome} value={nome} />
                        </div>
                        <div className={styles.item}>
                            <input type="text" placeholder="E-mail" onChange={handleInputEmail} value={email} />
                        </div>
                        <div className={styles.item}>
                            <input type="text" placeholder="Telefone" onChange={handleInputFone} value={phone} />
                        </div>
                    </>
                ) : (
                    <p className={styles.clube}>Agora você já faz parte do clube exclusivo Dakota e pode aproveitar os melhores produtos com as melhores ofertas!</p>
                )}
            </div>
            <div className={styles.contentFooter}>
                {!enviado &&
                    <button type="submit" onClick={EnvioFormulario} disabled={!isFormValid}></button>
                }
            </div>
        </div>
    );
}

export default CadastroBF;

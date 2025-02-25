import React, { useState } from 'react';
//@ts-ignore
import { useProduct } from "vtex.product-context";
//@ts-ignore
import styles from "./style.css";

const CustomShip = () => {
    const [isValues, setIsValues] = useState<any>(null);
    const [isCep, setIsCep] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [isAddress, setIsAddress] = useState({
        logradouro: "",
        bairro: "",
        localidade: "",
        uf: "",
    });

    console.log(isAddress)

    const productContextValue = useProduct();
    // console.log('Product Context:', productContextValue);
    
    const product = productContextValue?.selectedItem;
    // console.log('Selected Product:', product);

    const isValidCep = (cep: string) => {
        const cleanedCep = cep.replace(/\D/g, "");
        // console.log('Cleaned CEP:', cleanedCep);
        const regex = /^[0-9]{8}$/;
        const isValid = regex.test(cleanedCep);
        // console.log('Is CEP valid?', isValid);
        return isValid;
    };

    async function requestCep() {
        try {
            // console.log('Requesting CEP info for:', isCep);
            const respCep = await fetch(`https://viacep.com.br/ws/${isCep}/json/`);
            // console.log('ViaCEP Response Status:', respCep.status);
            
            const dataCep = await respCep.json();
            // console.log('ViaCEP Response Data:', dataCep);
            
            if (dataCep.erro) {
                throw new Error('CEP não encontrado');
            }
            
            setIsAddress(dataCep);
        } catch (error) {
            // console.error('Error in requestCep:', error);
            setError("Erro ao buscar endereço. Verifique o CEP.");
        }
    }

    async function requestCheck() {
        setIsLoading(true);
        setError("");
        try {
            // Verificar se temos os dados necessários
            if (!product) {
                throw new Error('Produto não disponível');
            }

            const currentObjectPass = [{
                id: product.itemId,
                quantity: 1,
                seller: product.sellers[0].sellerId,
            }];

            // console.log('Shipping calculation request object:', currentObjectPass);

            const body = JSON.stringify({
                items: currentObjectPass,
                country: "BRA",
                postalCode: isCep,
            });

            // console.log('Request Body:', body);

            const respCep = await fetch("/api/checkout/pub/orderForms/simulation?RnbBehavior=1", {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                },
                body: body,
            });

            // console.log('Shipping API Response Status:', respCep.status);

            if (!respCep.ok) {
                throw new Error(`Error ${respCep.status}: ${respCep.statusText}`);
            }

            const dataCheck = await respCep.json();
            // console.log('Shipping API Response Data:', dataCheck);

            setIsValues(dataCheck);
        } catch (error) {
            // console.error('Error in requestCheck:', error);
            setError("Erro ao calcular o frete. Tente novamente.");
        } finally {
            setIsLoading(false);
        }
    }

    function HandleSubmit() {
        // console.log('Handle Submit Called');
        // console.log('Current CEP:', isCep);
        // console.log('Current Product:', product);

        if (!product) {
            console.error('Product not available');
            setError("Erro: Produto não encontrado");
            return;
        }

        if (!isValidCep(isCep)) {
            setError("Por favor, insira um CEP válido.");
            return;
        }

        requestCheck();
        requestCep();
    }

    return (
        <div className={styles.container}>
            <h3 className={styles.title}>SIMULE FRETE E PRAZO</h3>
            <div className={styles.inputContainer}>
                <input
                    type="text"
                    placeholder="Digite seu CEP"
                    value={isCep}
                    onChange={(e) => setIsCep(e.target.value)}
                    className={styles.input}
                    maxLength={8}
                />
                <button 
                    onClick={HandleSubmit} 
                    className={`${styles.button} ${isLoading ? styles.loading : ""}`}
                    disabled={isLoading}
                >
                    {isLoading ? <span className={styles.dotsAnimation}></span> : "OK"}
                </button>
            </div>

            {error && <p className={styles.error}>{error}</p>}

            <a
                className={styles.shipping_cepLink}
                href="https://buscacepinter.correios.com.br/app/endereco/index.php?t"
                target="_blank"
                rel="noreferrer"
            >
                Não sei meu CEP
            </a>

            {isLoading && (
                <div className={styles.loading}>Calculando frete...</div>
            )}

            {(() => {
                if (!isValues?.logisticsInfo?.[0]?.slas) return null;

                const slas = isValues.logisticsInfo[0].slas;

                // Encontrar a mais barata
                const cheapest = slas.reduce((prev, curr) =>
                    curr.price < prev.price ? curr : prev
                );

                // Encontrar a mais rápida
                const fastest = slas.reduce((prev, curr) =>
                    parseInt(curr.shippingEstimate.replace(/\D/g, "")) <
                    parseInt(prev.shippingEstimate.replace(/\D/g, ""))
                        ? curr
                        : prev
                );

                // Garantir que só exibiremos opções únicas
                const selectedSlas = [cheapest, fastest].filter(
                    (item, index, self) =>
                        index === self.findIndex((t) => t.name === item.name)
                );

                return selectedSlas.map((el: any, index: number) => (
                    <div className={styles.shippingCard} key={index}>
                        {el.deliveryChannel === "delivery" ? (
                            <div className={styles.coluna1}>
                                <div className={styles.boxInput}>
                                    <input
                                        type="radio"
                                        name="shippingMethod"
                                        value={el.id}
                                        className={styles.radio}
                                    />
                                    <span className={styles.shippingCard_name}>
                                        {el.name}
                                    </span>
                                </div>
                                <span className={styles.shippingCard_day}>
                                    {el.shippingEstimate.replace(
                                        "bd",
                                        " Dias úteis"
                                    )}
                                </span>
                            </div>
                        ) : (
                            <div className={styles.coluna1}>
                                <span className={styles.shippingCard_name}>
                                    Retirar Mercadoria
                                </span>
                                <span className={styles.shippingCard_day}>
                                    {el.shippingEstimate.replace(
                                        "bd",
                                        " Dias úteis"
                                    )}
                                </span>
                            </div>
                        )}
                        <span className={styles.shippingCard_value}>
                            {el.price !== 0
                                ? (el.price / 100).toLocaleString("pt-br", {
                                    style: "currency",
                                    currency: "BRL",
                                })
                                : "Grátis"}
                        </span>
                    </div>
                ));
            })()}

        
        </div>
    );
};

export default CustomShip;
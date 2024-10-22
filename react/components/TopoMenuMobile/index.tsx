import React, { useState } from 'react';
import "./style.css";

const TopoMenuMobile = () => {
    const [activeTab, setActiveTab] = useState(null);

    const toggleTab = (tabName) => {
        if (activeTab === tabName) {
            setActiveTab(null); // Fecha a aba se for clicada novamente
        } else {
            setActiveTab(tabName); // Abre a aba correspondente 
        }
    };

    return (
        <div className='topoMenuMobile'>
            <div className='content'>
                <div className='marcas' onClick={() => toggleTab('atendimentoTab')}>
                    + Marcas
                </div>
                <div>
                    <a href='https://blog.dakota.com.br/' target="_blank" rel="noopener noreferrer">Blog</a>
                </div>
                <div>
                    <a href='/' target="_blank" rel="noopener noreferrer">Sustentabilidade</a>
                </div>
                <div className='atendimento' onClick={() => toggleTab('lojasTab')}>
                    + Atendimento
                </div>
            </div>

            {/* Abas */}
            {activeTab === 'atendimentoTab' && (
                <div className='atendimentoTab'>
                    <div className='contents'>
                        <a href='https://kolosh.dakota.com.br/?o=d/' className='kolosh'>

                        </a>
                        <a href='https://mississipi.dakota.com.br/?o=d/' className='mississipi'>

                        </a>
                        <a href='https://www.tanarabrasil.com.br/?o=d/' className='tanara'>

                        </a>
                        <a href='https://campesi.dakota.com.br/?o=d/' className='campesi'>

                        </a>
                        <a href='https://pinkcats.dakota.com.br/?o=d/' className='pinkcats'>

                        </a>
                    </div>
                </div>
            )}

            {activeTab === 'lojasTab' && (
                <div className='lojasTab'>
                    <div className='contents'>
                        <a href="https://www.clubedeaguias.com.br/" target="_blank" rel="noopener noreferrer">Clube de Águias</a> |
                        <a href="https://pedidofacil.dakota.com.br/" target="_blank" rel="noopener noreferrer">Área do lojista</a> |
                        <a href="/central-de-atendimento" target="_blank" rel="noopener noreferrer">Atendimento</a>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TopoMenuMobile;

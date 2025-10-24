import React from "react";
import "./SizeGuide.css";

const GuiaMedidas: React.FC = () => {
  return (
    <div className="guia-tamanhos">
      <div className="tabelas">
        <h4>GUIA DE MEDIDAS</h4>
        <h6>Compare as medidas e identifique o seu número.<br />Medir o tamanho em centímetros (cm).</h6>
        <table>
          <tbody>
            <tr>
              <td colSpan={9}></td>
            </tr>
            <tr>
              <td className="border">
                Numeração <br />(BRASIL)
              </td>
              <td className="border">
                Tamanho do pé <br />(cm)
              </td>
              <td rowSpan={20}></td>
              <td rowSpan={8}>
                <img style={{ width: '200px' }} src="https://dakota.vtexassets.com/assets/vtex.file-manager-graphql/images/93c0b55d-74de-4861-9041-67475e0d3fff___7ea638b8cdc2435492fd66760464a9d1.png" />
              </td>
              <td rowSpan={7}>
                <span className="spanTitle">Como medir o tamanho do seu pé?<br /></span>
                <span className="spanSub">
                  1. Centralize seu pé em uma folha de papel.<br />
                  2. Faça um risco a partir do seu calcanhar.<br />
                  3. Repita o risco na frente do dedão.<br />
                  4. Meça o comprimento entre as linhas.
                </span>
              </td>
            </tr>
            <tr><td className="border">33</td><td className="border">21,8 a 22,3</td><td></td><td></td><td></td><td></td></tr>
            <tr><td className="border">34</td><td className="border">22,4 a 23,0</td><td></td><td></td><td></td><td></td></tr>
            <tr><td className="border">35</td><td className="border">23,1 a 23,6</td><td></td><td></td><td></td><td></td></tr>
            <tr><td className="border">36</td><td className="border">23,7 a 24,3</td></tr>
            <tr><td className="border">37</td><td className="border">24,4 a 25,0</td></tr>
            <tr><td className="border">38</td><td className="border">25,1 a 25,6</td></tr>
            <tr><td className="border">39</td><td className="border">25,7 a 26,3</td></tr>
            <tr><td className="border">40</td><td className="border">26,4 a 27,0</td></tr>
            <tr><td className="border">41</td><td className="border">27,1 a 27,6</td></tr>
            <tr><td className="border">42</td><td className="border">27,7 a 28,3</td></tr>
            <tr><td className="border">43</td><td className="border">28,4 a 29,0</td></tr>
            <tr><td className="border">44</td><td className="border">29,1 a 29,8</td></tr>
            <tr><td colSpan={9}></td></tr>
          </tbody>
        </table>

        <div className="contentLembramos">
          <span className="lembramos first">
            * Lembramos que pelo fato do pé ser tridimensional, nenhuma medida de tamanho é totalmente exata.
            A nossa tabela é sugestão para que você obtenha uma medida aproximada do seu pé, facilitando assim a escolha da sua numeração.
          </span>
          <span className="lembramos">
            Se precisar de ajuda?<br />
            Fale via Whatsapp com o nosso SAC
          </span>
        </div>

      </div>
    </div>
  );
};

export default GuiaMedidas;

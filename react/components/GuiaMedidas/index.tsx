import React from "react";
import "./SizeGuide.css";


const GuiaMedidas: React.FC = () => {
  
  return (
    <div className="guia-tamanhos">
     <h4>DESCUBRA SEU TAMANHO</h4>
      <div className="tabelas">
        <h5>NUMERAÇÃO ADULTO FEMININA</h5>
        <table>
          <tbody>
            <tr className="background-cinza">
              <th>COMPRIMENTO DO PÉ (cm)</th>
              <td>21,8 - 22,3</td>
              <td>22,4 - 23,0</td>
              <td>23,1 - 23,6</td>
              <td>23,7 - 24,3</td>
              <td>24,4 - 25,0</td>
              <td>25,1 - 25,6</td>
              <td>25,7 - 26,3</td>
              <td>26,4 - 27,0</td>
            </tr>
            <tr>
              <th>NUMERAÇÃO (BRASIL)</th>
              <td>33</td>
              <td>34</td>
              <td>35</td>
              <td>36</td>
              <td>37</td>
              <td>38</td>
              <td>39</td>
              <td>40</td>
            </tr>
          </tbody>
        </table>

        <h5>NUMERAÇÃO INFANTIL</h5>
        <table>
          <tbody>
            <tr className="background-cinza">
              <th>COMPRIMENTO DO PÉ (cm)</th>
              <td>17,0 - 17,6</td>
              <td>17,7 - 18,3</td>
              <td>18,4 - 19,0</td>
              <td>19,1 - 19,7</td>
              <td>19,8 - 20,3</td>
              <td>20,4 - 21,0</td>
              <td>21,1 - 21,7</td>
              <td>21,8 - 22,3</td>
              <td>22,4 - 23,0</td>
              <td>23,1 - 23,6</td>
              <td>23,7 - 24,3</td>
            </tr>
            <tr>
              <th>NUMERAÇÃO (BRASIL)</th>
              <td>26</td>
              <td>27</td>
              <td>28</td>
              <td>29</td>
              <td>30</td>
              <td>31</td>
              <td>32</td>
              <td>33</td>
              <td>34</td>
              <td>35</td>
              <td>36</td>
            </tr>
          </tbody>
        </table>

        <div className="informacoes-guia">
          <p>
            <b>Como medir o tamanho do seu pé?</b>
            <br />
            1. Centralize seu pé em uma folha de papel.
            <br />
            2. Faça um risco a partir do seu calcanhar.
            <br />
            3. Repita o risco na frente do dedão.
            <br />
            4. Meça o comprimento entre as linhas.
            <br />
          </p>
          <p>
            * Lembramos que pelo fato do pé ser tridimensional, nenhuma
            <br />
            medida de tamanho é totalmente exata. Abaixo da nossa tabela de
            <br />
            medidas está nossa sugestão para que você obtenha uma medida
            <br />
            aproximada do seu pé, facilitando assim a escolha da sua
            <br />
            numeração. Se ficar com dúvida, nos contate através do chat
            <br />
          </p>
           <img
            src="https://dakota.vtexassets.com/assets/vtex.file-manager-graphql/images/3515d5b1-4926-4d1e-bfed-a1e9d7674988___08b45d43453bac7726a25ca30445f01d.jpg"
            alt="Tamanho pé"
          />
        </div>
      </div>
    </div>
  );
};

export default GuiaMedidas;

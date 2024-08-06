import React from "react";
import "./SizeGuide.css"; 

const GuiaMedidas: React.FC = () => {
  return (
    <div className="guia-tamanhos">
      <h4>DESCUBRA SEU TAMANHO</h4> 
      <div className="tabelas">
        <h5>NUMERAÇÃO ADULTA</h5>
        <table>
          <tbody>
            <tr className="background-cinza">
              <th>COMPRIMENTO DO PÉ</th>
              <td>21,7 - 22,5</td>
              <td>22,6 - 23,3</td>
              <td>23,4 - 24</td>
              <td>24,1 - 24,8</td>
              <td>24,9 - 25,3</td>
              <td>25,4 - 26</td>
              <td>26,1 - 26,6</td>
              <td>26,7 - 27,3</td>
              <td>27,4 - 28</td>
              <td>28,1 - 28,6</td>
              <td>28,7 - 29,3</td>
              <td>29,4 - 30</td>
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
              <td>41</td>
              <td>42</td>
              <td>43</td>
              <td>44</td>
            </tr>
          </tbody>
        </table>
        <h5>NUMERAÇÃO INFANTIL</h5>
        <table>
          <tbody>
            <tr className="background-cinza">
              <th>COMPRIMENTO DO PÉ</th>
              <td>18,6 - 19,2</td>
              <td>19,3 - 19,9</td>
              <td>20 - 20,6</td>
              <td>20,7 - 21,2</td>
              <td>21,3 - 21,9</td>
              <td>22 - 22,6</td>
              <td>22,7 - 23,3</td>
              <td>23,4 - 23,9</td>
            </tr>
            <tr>
              <th>NUMERAÇÃO (BRASIL)</th>
              <td>28</td>
              <td>29</td>
              <td>30</td>
              <td>31</td>
              <td>32</td>
              <td>33</td>
              <td>34</td>
              <td>35</td>
            </tr>
          </tbody>
        </table>
        <div className="informacoes-guia">
          <img
            src="https://dakota.vtexassets.com/assets/vtex.file-manager-graphql/images/3515d5b1-4926-4d1e-bfed-a1e9d7674988___08b45d43453bac7726a25ca30445f01d.jpg"
            alt="Tamanho pé" 
          /> 
          <p> 
            <b>Como medir o tamanho do seu pé:</b>
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
        </div> 
      </div>
    </div>
  );
};

export default GuiaMedidas;

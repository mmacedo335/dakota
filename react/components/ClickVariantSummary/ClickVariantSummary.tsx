// import * as React from 'react';
import { useEffect } from 'react';

function ClickVariantSummary() {
  useEffect(() => {
    // Seleciona os links pelos seus seletores
    const link1Elements = document.querySelectorAll(
      ".vtex-product-summary-2-x-clearLink"
    );
    const link2Elements = document.querySelectorAll(
      ".vtex-similar-products-variants-0-x-img_wrap"
    );

    // Adiciona listeners para link1
    link1Elements.forEach((link1) => {
      link1.addEventListener("click", handleLink1Click);
    });

    // Adiciona listeners para link2
    link2Elements.forEach((link2) => {
      link2.addEventListener("click", handleLink2Click);
    });

    // Cleanup - Remove os listeners quando o componente desmontar
    return () => {
      link1Elements.forEach((link1) => {
        link1.removeEventListener("click", handleLink1Click);
      });
      link2Elements.forEach((link2) => {
        link2.removeEventListener("click", handleLink2Click);
      });
    };
  }, []);

  const handleLink1Click = () => {
    console.log("Clique no Link 1");
    // Comportamento padrão do Link 1
  };

  const handleLink2Click = (event) => {
    console.log("Clique no Link 2");
    event.stopPropagation(); // Interrompe a propagação para Link 1
    // Comportamento padrão do Link 2
  };

  return null;
}

export default ClickVariantSummary;

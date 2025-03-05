import React, { useEffect, useState } from 'react';
import { Helmet, useRuntime } from 'vtex.render-runtime';

function InputHelmet() {
  const { route } = useRuntime();
  // const isDepartmentPage = page === 'store.search#department';
  const departmentName = route?.params?.department;

  const [titlePagina, setTitlePagina] = useState('');

  useEffect(() => {
    const handlePageLoad = () => {
      console.log("departamento: ", departmentName);
      console.log("route: ", route);
      const element = document.querySelector('.vtex-rich-text-0-x-paragraph--title-da-pagina');
      if (element) {
        setTitlePagina(element.textContent || '');
        console.log('Título da página customizado:', element.textContent);
      } else {
        console.log('Não foi encontrado title customizado.');
        setTitlePagina('');
      }
    };


    if (departmentName) {
      handlePageLoad();
    }
  }, [departmentName]);

  return (
    <>
      {titlePagina && (
        <Helmet>
          <title>{titlePagina}</title>          
        </Helmet>
      )}
      <Helmet>
        <script type="text/partytown" async src="https://www.googletagmanager.com/gtm.js?id=GTM-KTQZW3R"></script>
        <script type="text/javascript" src="//cdn-4.convertexperiments.com/v1/js/10045798-10046444.js"></script>
      </Helmet>
    </>       
  );
}

export default InputHelmet;

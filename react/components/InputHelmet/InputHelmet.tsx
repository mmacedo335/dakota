import React, { useEffect, useState } from 'react';
import { Helmet, useRuntime } from 'vtex.render-runtime';

function InputHelmet() {
  const { route } = useRuntime();
  // const isDepartmentPage = page === 'store.search#department';
  const departmentName = route?.params?.department;

  const [titlePagina, setTitlePagina] = useState('');
  const [metaDescription, setMetaDescription] = useState('');

  useEffect(() => {
    const handlePageLoad = () => {
      //console.log("departamento: ", departmentName);
      //console.log("route: ", route);
      const element = document.querySelector('.vtex-rich-text-0-x-paragraph--title-da-pagina');
      const descriptionElement = document.querySelector('.vtex-rich-text-0-x-paragraph--meta-description');
      if (element) {
        setTitlePagina(element.textContent || '');
        console.log('Título da página customizado:', element.textContent);
      } else {
        console.log('Não foi encontrado title customizado.');
        setTitlePagina('');
      };

      if (descriptionElement) {
        setMetaDescription(descriptionElement.textContent || '');
        //console.log('Meta description customizada:', descriptionElement.textContent);
      } else {
        //console.log('Não foi encontrada meta description customizada.');
        setMetaDescription('');
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
      {metaDescription && (
        <Helmet>
          <meta name="description" content={metaDescription}/>
        </Helmet>
      )}
      <Helmet>       
        <script type="text/javascript" src="//cdn-4.convertexperiments.com/v1/js/10045798-10046444.js"></script>
      </Helmet>
    </>       
  );
}

export default InputHelmet;

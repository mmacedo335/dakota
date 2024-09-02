export const getCookie = (cookieName: string): string | null => {
    const cookies = document.cookie.split('; ');

    console.log('testeee', cookies); 
    
    // Procura o cookie com o nome fornecido
    const targetCookie = cookies.find(cookie => cookie.startsWith(`${cookieName}=`));
    
    // Retorna o valor do cookie, se encontrado
    return targetCookie ? targetCookie.split('=')[1] : null;
  };
  
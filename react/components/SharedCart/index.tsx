import React, { useEffect, useState } from 'react';
import { getCookie } from './cookies';

const SharedCart: React.FC = () => {
  const [myCookieValue, setMyCookieValue] = useState<string | null>(null);

  useEffect(() => {
    // Recupera o valor do cookie quando o componente monta
    const value = getCookie('checkout.vtex.com');
    setMyCookieValue(value);
  }, []);

  return (
    <div>
      <p>O valor do cookie é: {myCookieValue ? myCookieValue : 'Cookie não encontrado'}</p>
    </div>
  );
};
 
export default SharedCart;



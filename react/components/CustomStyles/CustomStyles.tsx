import React, { useEffect } from 'react';
import './CustomStyles.css'

const CustomStyles = () => {
  useEffect(() => {
    const externalDiv = document.querySelector('.vtex-flex-layout-0-x-flexCol--filterCol .vtex-disclosure-layout-1-x-trigger') as HTMLElement | null;

    const handleScroll = () => {
      if (externalDiv) {
        const scrollPosition = window.scrollY;
        const hideHeight = 200; 

        if (scrollPosition > hideHeight) {
          externalDiv.style.display = 'none'; 
        } else {
          externalDiv.style.display = 'block'; 
        }
      }
    };
 
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []); 

  return (
    <div>
    </div>
  );
};

export default CustomStyles;
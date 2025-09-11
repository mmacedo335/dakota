import React, { useEffect, useRef, useState } from 'react';

declare global {
    interface RecaptchaRenderParams {
        sitekey: string;
        callback: (token: string) => void;
        'expired-callback'?: () => void;
    }
    interface Window {
    grecaptcha?: {
      render: (container: HTMLElement, params: RecaptchaRenderParams) => number; // returns widget id
      reset?: (widgetId?: number) => void;
      getResponse?: (widgetId?: number) => string;
    };
        onloadRecaptchaCallback?: () => void;
    }
}

interface GoogleRecaptchaProps {
  sitekey: string;
  onVerify: (token: string | null) => void;
}

const GoogleRecaptcha: React.FC<GoogleRecaptchaProps> = ({ sitekey, onVerify }) => {
  const recaptchaRef = useRef<HTMLDivElement | null>(null);
  const [recaptchaLoaded, setRecaptchaLoaded] = useState(false);
  const widgetIdRef = useRef<number | null>(null);

  useEffect(() => {
    if (window.grecaptcha) {
      setRecaptchaLoaded(true);
    } else {
      window.onloadRecaptchaCallback = () => {
        setRecaptchaLoaded(true);
      };
    }
  }, []);

  useEffect(() => {
    if (recaptchaLoaded && recaptchaRef.current && window.grecaptcha && widgetIdRef.current === null) {
      try {
        widgetIdRef.current = window.grecaptcha.render(recaptchaRef.current, {
          sitekey,
          callback: (token: string) => onVerify(token),
          'expired-callback': () => onVerify(null),
        });
      } catch (e) {
      }
    }
  }, [recaptchaLoaded, sitekey]); 

  return <div ref={recaptchaRef}></div>;
};

export default GoogleRecaptcha;
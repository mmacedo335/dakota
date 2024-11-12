import React from 'react';
import { Helmet } from 'vtex.render-runtime';

function Beonly() {
  return (
    <>
      <Helmet>
        <style>
          {`
            :root {
              --bnly-store-main-color: #db3d68;
            }
          `}
        </style>

        <script defer type="text/javascript">
          {`
            (function(i, s, o, g, r, a, m, d) {
              i['beonobject'] = r;
              i[r] = i[r] || function() {
                (i[r].q = i[r].q || []).push(arguments) 
              }, i[r].l = 1 * new Date();
              a = s.createElement(o),
                  m = s.getElementsByTagName(o)[0];
              a.async = 1;
              a.src = g; 
              a.setAttribute('data-cookiedomain', d);      
              a.id = 'beon-' + r;
              m.parentNode.insertBefore(a, m)
            })(window, document, 'script', 'https://c.usebeon.io/loader/v5.js', 'beon', null, null, 'dakota.com.br');

            beon('create', '57184a67-919f-4377-8e58-7376b5743d7c', 'linx');
          `}
        </script>
      </Helmet>
    </>
  );
}

export default Beonly;

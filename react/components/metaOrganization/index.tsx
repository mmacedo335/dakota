import React from "react";
import { Helmet } from "vtex.render-runtime";

export function MetaOrganization() {
  const schemaOrganization = {
    "@context": "https://schema.org/",
    "@type": "Organization",
    url: "https://dakota.myvtex.com/",
    logo: "https://dakota.vtexassets.com/assets/vtex/assets-builder/dakota.dakota-theme/1.0.3/svg/logo-dakota___9e5024e768762611d1260e2e2d5e1aa5.svg",
    name: "Dakota",
    address: {
      "@type": "PostalAddress",
      postalCode: "95150-000",
      streetAddress:
        "Av. 15 de Novembro, 3667– Bairro Piá – Nova Petrópolis/RS",
    },
    telephone: "(54) 3281-8070",
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schemaOrganization)}
      </script>
    </Helmet>
  );
}

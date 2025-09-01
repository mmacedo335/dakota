import React from "react";
import { useCsshandles } from "vtex.css-handles";

import type { SchemaFC } from "../../typings/storefront";

interface GreetingProps {
  name: string;
}

const CSS_HANDLES = ["message"] as const;

const Greeting: SchemaFC<GreetingProps> = ({ name }) => {
  const { handles } = useCsshandles(CSS_HANDLES);

  return <div className={handles.message}>Hey, {name}</div>;
};

Greeting.schema = {
  title: "Greeting title in Site Editor",
  type: "object",
  properties: {
    name: {
      type: "string",
      title: "Nome",
    },
  },
};

export default Greeting;

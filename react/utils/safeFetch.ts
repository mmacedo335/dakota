   const safeFetch = async (input:  string, init?: RequestInit) => {
      const controller = new AbortController();
      const id = setTimeout(() => controller.abort(), 15000);
      try {
        const res = await fetch(input, { ...init, signal: controller.signal });
        return res;
      } finally {
        clearTimeout(id);
      }
    };

    export default safeFetch
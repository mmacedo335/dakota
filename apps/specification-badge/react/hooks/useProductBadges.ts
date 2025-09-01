import { useMemo } from "react";
import { useProduct } from "vtex.product-context";

import type { SpecificationBadge } from "./useSettings";
import { useSettings } from "./useSettings";

type ProductProperties = {
  name: string;
  values: string[];
};

type ProductBadge = {
  productBadges: SpecificationBadge[];
  loading: boolean;
};

export const useProductBadges = (): ProductBadge => {
  const { product } = useProduct();
  const { data, loading } = useSettings();

  const badges = useMemo(() => {
    return data?.badges ?? [];
  }, [data]);

  const productBadges = useMemo(() => {
    const { properties } = product;

    if (!properties || !properties.length) return [];
    const techSpecification = (properties as ProductProperties[]).find(
      (property) => property.name === "Tecnologias"
    );

    if (!techSpecification || !techSpecification.values.length) return [];

    const { values } = techSpecification;

    const filteredBadges = badges.filter(({ specificationName }) =>
      values.includes(specificationName)
    );

    return filteredBadges;
  }, [badges, product]);

  return { productBadges, loading };
};

import React from "react";
import { useCssHandles } from "vtex.css-handles";

import { useProductBadges } from "../../hooks/useProductBadges";

const CSS_HANDLES = [
  "specificationsBadgesWrapper",
  "specificationBadgesList",
  "specificationBadgesListItem",
  "specificationBadgesListItemImage",
] as const;

const SpecificationBadge = () => {
  const { handles } = useCssHandles(CSS_HANDLES);

  const { productBadges } = useProductBadges();

  if (!productBadges || !productBadges.length) return null;

  return (
    <div className={handles.specificationsBadgesWrapper}>
      <ul className={handles.specificationBadgesList}>
        {productBadges.map(
          ({ specificationBadge, specificationName }, index) => (
            <li
              className={handles.specificationBadgesListItem}
              key={`${specificationName}-${index}`}
            >
              <img
                title={specificationName}
                aria-label={specificationName}
                src={specificationBadge}
              />
            </li>
          )
        )}
      </ul>
    </div>
  );
};

export default SpecificationBadge;

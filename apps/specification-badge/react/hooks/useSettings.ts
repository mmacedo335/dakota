import { useMemo } from "react";
import { useQuery } from "react-apollo";

import getSettings from "../graphql/getSettings.gql";

export type SpecificationBadge = {
  specificationName: string;
  specificationBadge: string;
};

interface SettingsQueryResult {
  publicSettingsForApp?: {
    message?: string;
  };
}

interface Settings {
  badges: SpecificationBadge[];
}

export const useSettings = () => {
  const { data: rawData, loading } = useQuery<SettingsQueryResult>(
    getSettings,
    {
      ssr: false,
      fetchPolicy: "cache-first",
    }
  );

  const data = useMemo(() => {
    try {
      return rawData?.publicSettingsForApp?.message
        ? (JSON.parse(rawData.publicSettingsForApp.message) as Settings)
        : null;
    } catch (error) {
      console.error(error);

      return null;
    }
  }, [rawData]);

  return {
    data,
    loading,
  };
};

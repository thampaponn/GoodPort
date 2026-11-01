import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useRef, useState } from "react";

// Loads on every focus so lists stay current after returning from a form.
export const useFocusFetch = <T>(fetcher: () => Promise<T>) => {
  const fetcherRef = useRef(fetcher);
  fetcherRef.current = fetcher;

  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);

  const reload = useCallback(async () => {
    setLoading(true);
    try {
      setData(await fetcherRef.current());
      setFailed(false);
    } catch (error) {
      console.error(error);
      setFailed(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      reload();
    }, [reload])
  );

  return { data, loading, failed, reload };
};

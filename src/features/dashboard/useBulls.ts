import { useState, useCallback, useEffect } from 'react';
import { getBulls, Bull, BullsListOptions, toggleFavorite } from '@/lib/api';

interface UseBullsState {
  bulls: Bull[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  loading: boolean;
  error: string | null;
  togglingFavorites: Set<number>;
}

export function useBulls(initialOptions?: BullsListOptions) {
  const [state, setState] = useState<UseBullsState>({
    bulls: [],
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 0,
    loading: false,
    error: null,
    togglingFavorites: new Set(),
  });

  const [filters, setFilters] = useState<BullsListOptions>(
    initialOptions || { page: 1, limit: 10 }
  );

  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  const getToken = useCallback(() => {
    return document.cookie
      .split('; ')
      .find((row) => row.startsWith('access_token='))
      ?.split('=')[1];
  }, []);

  const fetchBulls = useCallback(async (options: BullsListOptions = filters) => {
    setState((prev) => ({ ...prev, loading: true, error: null }));
    try {
      const token = getToken();

      const response = await getBulls(options, token);
      setState((prev) => ({
        ...prev,
        bulls: response.data,
        total: response.total,
        page: response.page,
        limit: response.limit,
        totalPages: response.totalPages,
        loading: false,
        error: null,
      }));
    } catch (err) {
      setState((prev) => ({
        ...prev,
        loading: false,
        error: err instanceof Error ? err.message : 'Error fetching bulls',
      }));
    }
  }, [filters, getToken]);

  const toggleBullFavorite = useCallback(async (bullId: number) => {
    setState((prev) => ({
      ...prev,
      togglingFavorites: new Set([...prev.togglingFavorites, bullId]),
    }));

    try {
      const token = getToken();
      if (!token) throw new Error('No token available');

      await toggleFavorite(bullId, token);

      setState((prev) => {
        const updatedBulls = prev.bulls.map((bull) =>
          bull.id === bullId ? { ...bull, isFavorite: !bull.isFavorite } : bull
        );

        return {
          ...prev,
          bulls: updatedBulls,
          togglingFavorites: new Set([...prev.togglingFavorites].filter(id => id !== bullId)),
        };
      });
    } catch (err) {
      setState((prev) => ({
        ...prev,
        togglingFavorites: new Set([...prev.togglingFavorites].filter(id => id !== bullId)),
        error: err instanceof Error ? err.message : 'Error toggling favorite',
      }));
    }
  }, [getToken]);

  const updateFilters = useCallback((newFilters: BullsListOptions) => {
    setFilters(newFilters);
  }, []);

  const goToPage = useCallback((page: number) => {
    const newOptions = { ...filters, page };
    setFilters(newOptions);
  }, [filters]);

  const toggleFavoritesFilter = useCallback(() => {
    setShowFavoritesOnly(prev => !prev);
  }, []);

  // Fetch bulls when filters change
  useEffect(() => {
    fetchBulls();
  }, [filters, fetchBulls]);

  return {
    ...state,
    limit: filters.limit || state.limit,
    page: filters.page || state.page,
    filters,
    updateFilters,
    goToPage,
    refetch: fetchBulls,
    toggleBullFavorite,
    showFavoritesOnly,
    toggleFavoritesFilter,
    isBullFavorited: (bullId: number) => state.bulls.find(bull => bull.id === bullId)?.isFavorite ?? false,
  };
}

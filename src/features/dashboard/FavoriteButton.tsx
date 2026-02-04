'use client';

import { Heart } from 'lucide-react';
import { useState } from 'react';

interface FavoriteButtonProps {
  bullId: number;
  isFavorited: boolean;
  onToggleFavorite: (bullId: number) => Promise<void>;
  isLoading?: boolean;
}

export default function FavoriteButton({
  bullId,
  isFavorited,
  onToggleFavorite,
  isLoading = false,
}: FavoriteButtonProps) {
  const [isOptimistic, setIsOptimistic] = useState(isFavorited);

  const handleClick = async () => {
    // Optimistic update
    setIsOptimistic(!isOptimistic);

    try {
      await onToggleFavorite(bullId);
    } catch (error) {
      // Revert on error
      setIsOptimistic(isFavorited);
      console.error('Error toggling favorite:', error);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={isLoading}
      className="p-2 rounded-full hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      aria-label={isOptimistic ? 'Remove from favorites' : 'Add to favorites'}
    >
      <Heart
        size={20}
        className={isOptimistic ? 'fill-red-500 text-red-500' : 'text-gray-400'}
      />
    </button>
  );
}

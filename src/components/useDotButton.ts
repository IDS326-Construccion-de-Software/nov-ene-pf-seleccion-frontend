import { useState, useEffect } from 'react';

export function useDotButton(
  emblaApi: any,
  onNavButtonClick: (emblaApi: any) => void
) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  useEffect(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on('select', onSelect);
    onSelect();
    return () => emblaApi.off('select', onSelect);
  }, [emblaApi]);

  const onDotButtonClick = (index: number) => {
    if (!emblaApi) return;
    emblaApi.scrollTo(index);
    onNavButtonClick(emblaApi);
  };

  return { selectedIndex, scrollSnaps, onDotButtonClick };
}

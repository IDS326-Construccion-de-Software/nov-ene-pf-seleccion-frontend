import React, { useCallback } from 'react';
import { EmblaOptionsType, EmblaCarouselType } from 'embla-carousel';
import { DotButton } from './EmblaCarouselDotButton';
import { PrevButton, NextButton } from './EmblaCarouselArrowButtons';
import { useDotButton } from './useDotButton';
import { usePrevNextButtons } from './usePrevNextButtons';
import Autoplay from 'embla-carousel-autoplay';
import useEmblaCarousel from 'embla-carousel-react';

type SlideType = number | string;
type PropType = {
  slides: SlideType[];
  options?: EmblaOptionsType;
};

const EmblaCarousel: React.FC<PropType> = (props) => {
  const { slides, options } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [Autoplay()]);

  const onNavButtonClick = useCallback((emblaApi: EmblaCarouselType) => {
    const autoplay = emblaApi?.plugins()?.autoplay;
    if (!autoplay) return;
    const resetOrStop =
      autoplay.options.stopOnInteraction === false ? autoplay.reset : autoplay.stop;
    resetOrStop();
  }, []);

  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(emblaApi, onNavButtonClick);

  const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } =
    usePrevNextButtons(emblaApi, onNavButtonClick);

  return (
    <section className="max-w-6xl mx-auto mb-5">
      <div className="relative overflow-hidden" ref={emblaRef}>
        <div className="flex touch-pan-y touch-pinch-zoom -ml-4">
          {slides.map((slide, idx) => (
            <div className="flex-[0_0_100%] min-w-0 pl-4" key={idx}>
              {typeof slide === 'string' ? (
                <img
                  src={slide}
                  alt={`slide-${idx}`}
                  className="rounded-3xl object-cover w-600px h-65"
                />
              ) : (
                <div className="rounded-3xl text-6xl font-semibold flex items-center justify-center h-80 bg-gradient-to-br from-primary to-primary text-white shadow-lg">
                  {slide + 1}
                </div>
              )}
            </div>
          ))}
        </div>
        {/* Toggles centrados y superpuestos en la parte inferior */}
        <div className="absolute left-1/2 -translate-x-1/2 bottom-4 z-10 flex flex-wrap justify-center items-center gap-3 bg-white/70 rounded-full px-3 py-1 shadow-xl">
          {Array.from({ length: slides.length }).map((_, index) => (
            <DotButton
              key={index}
              onClick={() => onDotButtonClick(index)}
              className={`w-5 h-5 flex items-center justify-center rounded-full border border-primary-900/30 bg-white/80 hover:bg-primary-100 transition after:content-[''] after:w-2 after:h-2 after:rounded-full after:shadow-[inset_0_0_0_0.2rem_theme(colors.primary.900)] ${
                index === selectedIndex ? 'after:bg-primary' : 'after:bg-primary-200'
              }`}
            />
          ))}
        </div>
      </div>

      {/* <div className="grid grid-cols-[auto_1fr] justify-between gap-5 mt-7">
        <div className="grid grid-cols-2 gap-2 items-center">
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>
      </div> */}
    </section>
  );
};

export default EmblaCarousel;

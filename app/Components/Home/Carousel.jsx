'use client'
import { motion, useAnimation } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

export default function Carousel({ images, currentSlide, setCurrentSlide }) {
  const controls = useAnimation();

  const handleDragEnd = (event, info) => {
    const swipeThreshold = 50;
    if (Math.abs(info.offset.x) > swipeThreshold) {
      if (info.offset.x > 0) {
        setCurrentSlide(prev => (prev === 0 ? images.length - 1 : prev - 1));
      } else {
        setCurrentSlide(prev => (prev === images.length - 1 ? 0 : prev + 1));
      }
    }
    controls.start({ x: 0 });
  };

  return (
    <div className="relative w-full overflow-hidden rounded-2xl">
      <motion.div 
        className="relative h-[200px] sm:h-[300px] md:h-[400px] lg:h-[500px]"
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.2}
        onDragEnd={handleDragEnd}
        animate={controls}
      >
        {images.map((image, index) => (
          <motion.div
            key={image.id}
            className={`absolute w-full h-full transition-opacity duration-500 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover rounded-2xl"
              priority={index === 0}
              draggable="false"
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Indicateurs de navigation */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 bg-black/20 p-2 rounded-full">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? 'bg-white w-4' 
                : 'bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`Aller à la diapositive ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
} 
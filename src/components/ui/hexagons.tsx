'use client';

import { useEffect, useState, useRef, JSX } from 'react';
import { motion } from 'framer-motion';

export default function HexagonPattern({ color, className }: { color: string, className?: string }) {
  const hexContainerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);
  const [hexagons, setHexagons] = useState<JSX.Element[]>([]);

  useEffect(() => {
    const handleResize = () => {
      if (hexContainerRef.current) {
        setContainerWidth(hexContainerRef.current.clientWidth);
        setContainerHeight(hexContainerRef.current.clientHeight);
      }
    };

    if (hexContainerRef.current) {
      handleResize();
      generateHexagons();
      window.addEventListener('resize', handleResize);
    }

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (containerWidth > 0 && containerHeight > 0) {
      generateHexagons();
    }
  }, [containerWidth, containerHeight]);

  const generateHexagons = () => {
    if (!hexContainerRef.current) return;
    
    const hexSize = 100;
    const hexWidth = hexSize;
    const hexHeight = hexSize;
    
    const hexagonsPerRow = Math.ceil(containerWidth / (hexWidth * 0.75)) + 1;
    const rows = Math.ceil(containerHeight / hexHeight) + 1;
    
    const newHexagons: JSX.Element[] = [];
    
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < hexagonsPerRow; col++) {
        const offsetX = row % 2 === 0 ? 0 : hexWidth * 0.375;
        
        newHexagons.push(
          <motion.div
            key={`hex-${row}-${col}`}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 0.5, scale: 1 }}
            transition={{ duration: 0.25, delay: (row * hexagonsPerRow + col) * 0.01 }}
            className="absolute"
            style={{
              left: `${col * hexWidth + offsetX}px`,
              top: `${row * hexHeight}px`,
              width: `${hexWidth}px`,
              height: `${hexSize}px`
            }}
          >
            <svg className="m-0 opacity-50" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1.5 4.5V10.5L7.5 14L13.5 10.5V4.5L7.5 1L1.5 4.5Z" stroke={color} strokeWidth={0.5}/>
            </svg>
          </motion.div>
        );
      }
    }
    
    setHexagons(newHexagons);
  };

  return (
    <div ref={hexContainerRef} className={`absolute h-full left-0 overflow-hidden ${className}`}>
      {hexagons}
    </div>
  );
}
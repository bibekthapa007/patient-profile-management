import React from 'react';
import { Box } from '@chakra-ui/layout';
import { IconButton } from '@chakra-ui/button';

import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface ArrowProps {
  className?: string;
  currentSlide?: number;
  slideCount?: number;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export function PrevArrow({
  className,
  currentSlide,
  slideCount,
  onClick,
  ...props
}: ArrowProps) {
  const noMore = className && className.includes('slick-disabled');

  return (
    <Box position="absolute" bottom="50%" zIndex={10}>
      <IconButton
        aria-label="Previous slide"
        onClick={onClick}
        borderRadius="100%"
        boxShadow="lg"
        opacity={!noMore ? 1 : 0}
        disabled={!!noMore}
      >
        <FiChevronLeft fontSize="32px" fontWeight="600" />
      </IconButton>
    </Box>
  );
}

export function NextArrow({ className, onClick }: ArrowProps) {
  const noMore = className && className.includes('slick-disabled');

  return (
    <Box position="absolute" bottom="50%" right={0} zIndex={10}>
      <IconButton
        aria-label="Next slide"
        onClick={onClick}
        borderRadius="100%"
        boxShadow="lg"
        opacity={!noMore ? 1 : 0}
      >
        <FiChevronRight fontSize="32px" fontWeight="600" />
      </IconButton>
    </Box>
  );
}

import {
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  Img,
  SimpleGrid,
  Text,
} from '@chakra-ui/react';
import { useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { useAppDispatch, useAppSelector } from 'store/hook';
import Slider from 'components/Slider';
import { NextArrow, PrevArrow } from 'components/SliderArrow';
import DashboardLayout from 'components/DashboardLayout';
import { selectTranslations, setLang } from 'features/i18n/i18nSlice';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ProtectedRoute from 'components/ProtectedRoute';

function InfoCard() {
  return (
    <Box bg="white" width="100%" borderRadius="4" p="2">
      Info
    </Box>
  );
}

export default function Home() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { user } = useAppSelector((state) => state.auth);

  const settings = {
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: true,
    infinite: true,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
  };

  return (
    <ProtectedRoute>
      <DashboardLayout>
        <Head>
          <title>Zendanta Patient tracking app</title>
          <meta
            name="description"
            content="Zendanta track the patients appointments, precreptions, payment."
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Box mx="auto" maxW="6xl" pb={14}>
          <SimpleGrid columns={[1, 2, 2, 3, 3]} spacing={5} my={2}>
            {Array(5)
              .fill(5)
              .map((data, index) => {
                return <InfoCard key={index} />;
              })}
          </SimpleGrid>
        </Box>
      </DashboardLayout>
    </ProtectedRoute>
  );
}

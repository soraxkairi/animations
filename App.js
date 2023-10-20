import React, { useState, useEffect, useRef } from 'react';
import { Animated,TextInput } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { AppLoading } from 'expo';
import { useFonts } from 'expo-font';
import { LinearGradient } from 'expo-linear-gradient';
import styled from 'styled-components/native';
import Rating from './components/Rating';
import Genre from './components/Genre';
import { getMovies } from './api';
import * as CONSTANTS from './constants/constants';
import {Container,PosterContainer,Poster,PosterImage,PosterTitle,PosterDescription,DummyContainer,} from './constants/styledConstant';
import Backdrop from './constants/backdrop';

export default function App() {
  const [movies, setMovies] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const scrollX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const fetchData = async () => {
      const data = await getMovies();
      const moviesWithSpacers = [
        { key: 'left-spacer' },
        ...data,
        { key: 'right-spacer' },
      ];
      setMovies(moviesWithSpacers);
      setLoaded(true);
    };
    fetchData();
  }, []);

  let [fontLoaded] = useFonts({
    'Syne-Mono': require('./assets/fonts/SyneMono-Regular.ttf'),
  });

  if (!loaded || !fontLoaded) {
    return <AppLoading />;
  }

  return (
    <Container>
      <Backdrop movies={movies} scrollX={scrollX} />
      <StatusBar />
      <TextInput
        placeholder="Buscar películas..."
        value={searchQuery}
        onChangeText={(text) => filterMovies(text)}
      />
      <Animated.FlatList
        showsHorizontalScrollIndicator={false}
        data={movies}
        keyExtractor={(item) => item.key}
        horizontal
        contentContainerStyle={{
          alignItems: 'center',
        }}
        renderItem={({ item, index }) => {
          if (!item.originalTitle) {
            return <DummyContainer />;
          }
          const inputRange = [
            (index - 2) * CONSTANTS.ITEM_SIZE,
            (index - 1) * CONSTANTS.ITEM_SIZE,
            index * CONSTANTS.ITEM_SIZE,
          ];

          const translateY = scrollX.interpolate({
            inputRange,
            outputRange: [0, -50, 0],
          });

          return (
            <PosterContainer>
              <Poster as={Animated.View} style={{ transform: [{ translateY }] }}>
                <PosterImage source={{ uri: item.posterPath }} />
                <PosterTitle numberOfLines={1}>{item.originalTitle}</PosterTitle>
                <Rating rating={item.voteAverage} />
                <Genre genres={item.genres} />
                <PosterDescription numberOfLines={5}>{item.description}</PosterDescription>
              </Poster>
            </PosterContainer>
          );
        }}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
      />
    </Container>
  );
}
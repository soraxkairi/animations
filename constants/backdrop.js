import React from 'react';
import { Animated, FlatList } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Container, PosterContainer, Poster, PosterImage, PosterTitle, PosterDescription, DummyContainer, ContentContainer, BackdropContainer, BackdropImage } from './styledConstant';
import Rating from './components/Rating';
import Genre from './components/Genre';
import * as CONSTANTS from './constants';

const Backdrop = ({ movies, scrollX }) => {
  return (
    <ContentContainer>
      <FlatList
        data={movies}
        keyExtractor={item => `${item.key}-back`}
        removeClippedSubviews={false}
        contentContainerStyle={{ width: CONSTANTS.WIDTH, height: CONSTANTS.BACKDROP_HEIGHT }}
        renderItem={({ item, index }) => {
          if (!item.backdropPath) {
            return null;
          }
          const translateX = scrollX.interpolate({
            inputRange: [(index - 1) * CONSTANTS.ITEM_SIZE, index * CONSTANTS.ITEM_SIZE],
            outputRange: [0, CONSTANTS.WIDTH],
          });

          return (
            <BackdropContainer as={Animated.View} style={{ transform: [{ translateX: translateX }] }}>
              <BackdropImage source={{ uri: item.backdropPath }} />
            </BackdropContainer>
          );
        }}
      />
      <LinearGradient
        colors={['rgba(0,0,0,0)', 'black']}
        style={{
          height: CONSTANTS.BACKDROP_HEIGHT,
          width: CONSTANTS.WIDTH,
          position: 'absolute',
          bottom: 0,
        }}
      />
    </ContentContainer>
  );
};

export default Backdrop;

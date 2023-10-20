import styled from 'styled-components/native';
import * as CONSTANTS from './constants/constants'


export const Container = styled.View`
flex: 1;
padding-top: 50px;
background-color: #000;
`
export const PosterContainer = styled.View`
width:${CONSTANTS.ITEM_SIZE}px;
margin-top: ${CONSTANTS.TOP}px;
`

export const Poster = styled.View`
margin-horizontal: ${CONSTANTS.SPACING}px;
padding: ${CONSTANTS.SPACING * 2}px;
align-items: center;
background-color: rgba(255,255,255,0.1);
border-radius: 10px;
`
export const PosterImage = styled.Image`
 width: 100%;
 height: ${CONSTANTS.ITEM_SIZE * 1.2}px;
 resize-mode: cover;
 border-radius: 10px;
 margin: 0 0 10px 0;
`
export const PosterTitle = styled.Text`
font-family:Syne-Mono;
font-size: 18px;
color: #FFF;
`
export const PosterDescription = styled.Text`
font-family:Syne-Mono;
font-size: 12px;
color: #FFF;
`
export const DummyContainer = styled.View`
 width: ${CONSTANTS.SPACER_ITEM_SIZE}px;
`
export const ContentContainer = styled.View`
position: absolute;
width: ${CONSTANTS.WIDTH}px;
height: ${CONSTANTS.BACKDROP_HEIGHT}px;
`

export const BackdropContainer = styled.View`
width: ${CONSTANTS.WIDTH}px;
position:absolute;
height: ${CONSTANTS.BACKDROP_HEIGHT}px;
overflow:hidden;
`

export const BackdropImage = styled.Image`
position:absolute;
width: ${CONSTANTS.WIDTH}px;
height: ${CONSTANTS.BACKDROP_HEIGHT}px;
`
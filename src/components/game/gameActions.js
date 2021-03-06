import { GAME_LOAD, IMAGE_LOAD, getGame } from './gameReducers';
import { getUser } from '../app/reducers';
import { gamesRef, movesRef } from '../../services/firebaseRef';
import { pokeImages } from '../../services/images';

export const loadGame = gameKey => {
  return dispatch => {
    gamesRef.child(gameKey).on('value', snapshot => { 
      const game = snapshot.val();
      game.key = gameKey;

      dispatch({
        type: GAME_LOAD,
        payload: game
      });
    });
  };
};

export const unloadGame = gameKey => {
  gamesRef.child(gameKey).off('value'); 
  return {
    type: GAME_LOAD,
    payload: null
  };
};

export const loadImages = () => {
  return {
    type: IMAGE_LOAD,
    payload: pokeImages
  };
};

export const move = play => {
  return (dispatch, getState) => {
    const state = getState();
    const game = getGame(state);
    const user = getUser(state);
    movesRef.child(game.key).child(user.uid).set(play);
  };
};
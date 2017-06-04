import {connect} from 'react-redux'
import {Dispatch} from 'redux'
import {Props as PresentationProps, GuessingGame as GuessingGameComponent} from '../components/guessing-game'
import {State, GameState} from '../state'
import {AssertAssignable} from '../../helpers';

import {guessSubmitted} from '../actions'
import flow from 'lodash-es/flow';

type StateProps = Pick<PresentationProps, 'showCongratulations'|'currentGuess'|'lastGuess'>
type DispatchProps = Pick<PresentationProps, 'onGuess'>
type Props = {}
type _check = AssertAssignable<PresentationProps, StateProps & DispatchProps>

function mapStateToProps(state: State, ownProps: Props): StateProps {
  const gameState = State.gameState(state);
  return {
    showCongratulations: GameState.gameWon(gameState),
    currentGuess: GameState.guessSequence(gameState),
    lastGuess: GameState.lastGuess(gameState),
  }
}

function mapDispatchToProps(dispatch: Dispatch<any>, ownProps: Props): DispatchProps {
  return {
    onGuess: (n: number) => dispatch(guessSubmitted(n)),
  }
}

export const GuessingGame = connect(
  mapStateToProps,
  mapDispatchToProps
)<Props>(GuessingGameComponent)
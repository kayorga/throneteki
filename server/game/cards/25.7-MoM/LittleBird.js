import GameActions from '../../GameActions/index.js';
import DrawCard from '../../drawcard.js';

class LittleBird extends DrawCard {
    setupCardAbilities() {
        this.reaction({
            when: {
                onCardOutOfShadows: (event) => event.card === this
            },
            chooseOpponent: (opponent) => opponent.drawDeck.length > 0,
            message: "{player} uses {source} to look at the top card of an opponent's deck",
            handler: (context) => {
                this.game.resolveGameAction(
                    GameActions.lookAtDeck((context) => ({
                        player: context.player,
                        lookingAt: context.opponent,
                        amount: 1
                    })).then({
                        gameAction: GameActions.simultaneously((context) =>
                            // TODO: Add a 'decline message' to GameActions.may
                            context.game.getPlayersInFirstPlayerOrder().map((player) =>
                                GameActions.may({
                                    player,
                                    title: (context) =>
                                        'Draw 1 card from ' + context.source.name + '?',
                                    message: '{choosingPlayer} chooses to draw 1 card',
                                    gameAction: GameActions.drawCards((context) => ({
                                        player: context.choosingPlayer,
                                        amount: 1
                                    }))
                                })
                            )
                        )
                    }),
                    context
                );
            }
        });
    }
}

LittleBird.code = '25602';
LittleBird.version = '1.2';

export default LittleBird;

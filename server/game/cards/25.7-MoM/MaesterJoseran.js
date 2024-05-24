import DrawCard from '../../drawcard';
import GameActions from '../../GameActions';
import { flatten } from '../../../Array';

class MaesterJoseran extends DrawCard {
    setupCardAbilities() {
        this.reaction({
            when: {
                onFirstPlayerDetermined: (event) =>
                    this.controller === event.player &&
                    this.game.getPlayers().every((player) => player.agenda)
            },
            message:
                '{player} uses {source} to have each player put the top card of their decks under their agenda',
            gameAction: GameActions.simultaneously(() =>
                flatten(this.game.getPlayers().map((player) => player.drawDeck.slice(0, 1))).map(
                    (card) =>
                        GameActions.placeCard({
                            player: card.controller,
                            card,
                            location: 'conclave'
                        })
                )
            )
        });
    }
}

MaesterJoseran.code = '25517';
MaesterJoseran.version = '1.1';

export default MaesterJoseran;

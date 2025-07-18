import DrawCard from '../../drawcard.js';
import GameActions from '../../GameActions/index.js';

class Bribery extends DrawCard {
    setupCardAbilities() {
        this.xValue({
            min: () => this.getMinXValue(),
            max: () => 99
        });

        this.action({
            target: {
                cardCondition: (card, context) =>
                    card.isMatch({ location: 'play area', type: 'character', kneeled: false }) &&
                    (!context.xValue || card.getPrintedCost() <= context.xValue) &&
                    card.allowGameAction('kneel')
            },
            message: {
                format: '{player} plays {source} and pays {xValue} gold to kneel {target}',
                args: { xValue: (context) => context.xValue }
            },
            handler: (context) => {
                this.game.resolveGameAction(
                    GameActions.kneelCard((context) => ({ card: context.target })).then({
                        condition: (context) =>
                            context.parentContext.target.isMatch({
                                trait: ['Ally', 'Mercenary'],
                                hasAttachments: false
                            }),
                        gameAction: GameActions.may({
                            title: (context) =>
                                `Take control of ${context.parentContext.target.name}?`,
                            message: {
                                format: 'Then, {player} takes control of {card}',
                                args: { card: (context) => context.event.card }
                            },
                            gameAction: GameActions.takeControl((context) => ({
                                player: context.player,
                                card: context.parentContext.target
                            }))
                        })
                    }),
                    context
                );
            }
        });
    }

    getMinXValue() {
        const characters = this.game.filterCardsInPlay((card) =>
            card.isMatch({ type: 'character', kneeled: false })
        );
        const costs = characters.map((card) => card.getPrintedCost());
        return Math.min(...costs);
    }
}

Bribery.code = '17146';

export default Bribery;

import DrawCard from '../../drawcard.js';

class NorthernPyre extends DrawCard {
    setupCardAbilities(ability) {
        this.action({
            title: 'Sacrifice to set STR to 3',
            condition: () => this.game.anyPlotHasTrait('Winter'),
            cost: [ability.costs.kneelSelf(), ability.costs.sacrificeSelf()],
            target: {
                cardCondition: {
                    location: 'play area',
                    type: 'character',
                    participating: true
                }
            },
            message:
                "{player} kneels and sacrifices {costs.kneel} to set {target}'s STR to 3 until the end of the challenge",
            handler: (context) => {
                this.untilEndOfChallenge((ability) => ({
                    match: context.target,
                    effect: ability.effects.setStrength(3)
                }));
            }
        });
    }
}

NorthernPyre.code = '26510';
NorthernPyre.version = '1.0.0';

export default NorthernPyre;

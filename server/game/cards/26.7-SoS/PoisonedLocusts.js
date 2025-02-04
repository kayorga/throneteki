import DrawCard from '../../drawcard.js';

class PoisonedLocusts extends DrawCard {
    setupCardAbilities(ability) {
        this.attachmentRestriction({ controller: 'opponent' });
        this.whileAttached({
            condition: () => this.parent.isParticipating(),
            effect: ability.effects.killByDynamicStrength(() => this.parent.attachments.length)
        });
    }
}

PoisonedLocusts.code = '26580';
PoisonedLocusts.version = '1.0.1';

export default PoisonedLocusts;

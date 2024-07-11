class Player {
    constructor(name) {
        this.name = name //Initialize player's name
        this.frames = Array(10).fill(null).map(() => []) //Will stock each roll of the player
        this.currentFrame = 0
        this.bonuses = []
    }

    addRoll(pins) {
        if (this.frames[this.currentFrame].length < 2 || (this.currentFrame === 9 && (this.frames[this.currentFrame][0] === 10 || this.frames[this.currentFrame].length < 3))) { //First roll
            this.frames[this.currentFrame].push(pins)
            this.applyBonuses(pins)
        }
        if (this.frames[this.currentFrame][0] === 10) { // Strike
            this.bonuses.push({ rolls: 2, multiply: 2 }); // Double the next two throws
        } else if (this.frames[this.currentFrame].length === 2 && this.frames[this.currentFrame][0] + this.frames[this.currentFrame][1] === 10) { // Spare
            this.bonuses.push({ rolls: 1, multiply: 2 }); // Double the next throws
            if (this.frames[this.currentFrame][0] === 10 || this.frames[this.currentFrame].length === 2) {
                if (this.currentFrame < 9) this.currentFrame++;
            }
        }

        if (this.frames[this.currentFrame][0] === 10 || this.frames[this.currentFrame].length === 2) {
            if (this.currentFrame < 9) this.currentFrame++;
        }
    }
    
    applyBonuses(pins) {
        this.bonuses = this.bonuses.map(bonus => {
            if (bonus.rolls > 0) {
                bonus.rolls--;
                bonus.pins += pins * (bonus.multiply - 1);
            }
            return bonus;
        }).filter(bonus => bonus.rolls > 0);
    }

    calculateScore() {
        var score = 0
        for (var i = 0; i < 10; i++) {
            var frame = this.frames[i]
            score += frame.reduce((a, b) => a + b, 0) //update score for each roll
            if (frame[0] === 10) { // Strike
                score += this.getBonusForStrike(i)
            } else if (frame[0] + frame[1] === 10) { // Spare
                score += this.getBonusForSpare(i)
            }
        }
        return score
    }

    getBonusForStrike(frameIndex) { //Handle strike bonus
        if (frameIndex >= 9) return 0
        var nextFrame = this.frames[frameIndex + 1]
        if (nextFrame[0] === 10 && frameIndex < 8) {
            return 10 + this.frames[frameIndex + 2][0]
        }
        return nextFrame[0] + (nextFrame[1] || 0)
    }

    getBonusForSpare(frameIndex) { //Handle spare bonus
        if (frameIndex >= 9) return 0
        return this.frames[frameIndex + 1][0]
    }
}

module.exports = Player //Export class Player to be used in every files
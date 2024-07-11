const Player = require('./player')//Link to player.js

class BowlingGame {
    constructor() {
        this.players = []//Stock game players
    }

    addPlayer(name) { //Add Player to players
        this.players.push(new Player(name))
    }

    roll(playerIndex, pins) { //
        this.players[playerIndex].addRoll(pins)
    }

    getScores() { //Return the score of every player
        return this.players.map(player => ({
            name: player.name,
            score: player.calculateScore()
        }))
    }

    getWinner() { //Return the player(s) with the highest score
        const scores = this.getScores()
        const maxScore = Math.max(...scores.map(s => s.score))
        return scores.filter(s => s.score === maxScore)
    }
}

module.exports = BowlingGame //Export class BowlingGame to be used in every files
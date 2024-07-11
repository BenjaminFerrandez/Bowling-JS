const readline = require('readline') //Reads keyboard entries
const BowlingGame = require('./bowling')//Link to bowling.js

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

const game = new BowlingGame() //Create a new game

//async function = asynchrone function = function not executed immediately
async function askQuestion(query) {
    return new Promise(resolve => rl.question(query, resolve))
}

async function main() {
    var numPlayers
    while (true) {
        numPlayers = await askQuestion('How many player(s) ? (1-6): ')
        numPlayers = parseInt(numPlayers, 10)
        if (numPlayers >= 1 && numPlayers <= 6) {
            break;
        }
        console.log('The number of players must be between 1 and 6. Please try again.')
    }
    for (var i = 0; i < numPlayers; i++) {
        const name = await askQuestion(`Name of player ${i + 1}: `)
        game.addPlayer(name)
        console.log(`Player ${i + 1}: ${name}`)
    }

    for (var frame = 0; frame < 10; frame++) { //10 frames for one game
        console.log(`Frame ${frame + 1}`)
        for (var i = 0; i < game.players.length; i++) { //2 roll for each frames
            const player = game.players[i]
            for (var roll = 0; roll < 2; roll++) { //score for each roll
                let pins
                while (true) {
                    pins = await askQuestion(`${player.name}, how many pins did you knock down? `)
                    pins = parseInt(pins, 10)
                    if (pins >= 0 && pins <= 10) {
                        break
                    }
                    console.log('The number of pins knocked down must be between 0 and 10. Please try again.')
                }
                game.roll(i, pins);
                console.log(`${player.name} knocked down ${pins} pins.`);
                
                if (frame === 9 && (player.frames[frame][0] === 10 || player.frames[frame][0] + player.frames[frame][1] === 10)) {
                    if (player.frames[frame].length < 3) roll--; // Allow extra rolls in the 10th frame
                }
                
                // If it's a strike and it's not the 10th frame, move on to the next player.
                if (player.frames[frame][0] === 10 && frame < 9) {
                    break;
                }

                if (player.frames[frame][0] === 10 || player.frames[frame].length === 2) {
                    break;
                }
            }
        }
    }

    console.log('Final score:')
    game.getScores().forEach(score => {
        console.log(`${score.name}: ${score.score}`)
    })

    const winners = game.getWinner()
    if (winners.length === 1) {
        console.log(`${winners[0].name} is the winner !`)
    } else {
        console.log(`Equality ! The winners are : ${winners.map(w => w.name).join(', ')} !`)
    }

    rl.close()//Doesn't reads keyboard entries anymore
}

main()//Start the game
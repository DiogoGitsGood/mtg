define(function () {
  let externals = {};
  const players = []; const totalPlayers = 7;
  externals.startDraftGame = async function (setCode, callbackFunction) {

    const userPlayerName = 'User';

    let boostersCreated = 0;

    for (let i = 1; i <= totalPlayers; i++) {
      const player = {
        name: `Player ${i}`,
        booster: null,
        pickedCards: [],
        id: `${i}-1`
      };
      await generateBoosterForPlayer(player);
      players.push(player);
    }

    const userPlayer = {
      name: userPlayerName,
      booster: null,
      pickedCards: [],
      id: 7
    };
    await generateBoosterForPlayer(userPlayer);
    players.push(userPlayer);

    if (boostersCreated === (totalPlayers + 1)) {
      callbackFunction(userPlayer.booster);
    }

    async function generateRandomBooster(setCode) {
      return new Promise((resolve) => {
        fetch(`https://api.scryfall.com/cards/search?q=set:${setCode}`)
          .then(response => response.json())
          .then(response => response.data)
          .then(cards => {
            const rareMythic = cards.filter(card => card.rarity === 'rare' || card.rarity === 'mythic');
            const uncommons = cards.filter(card => card.rarity === 'uncommon');
            const commons = cards.filter(card => card.rarity === 'common' &&
              card.name.toLowerCase() !== 'forest' &&
              card.name.toLowerCase() !== 'island' &&
              card.name.toLowerCase() !== 'swamp' &&
              card.name.toLowerCase() !== 'mountain' &&
              card.name.toLowerCase() !== 'plains');
            const booster = [];
            if (rareMythic.length > 0) {
              booster.push(mapCard(rareMythic[Math.floor(Math.random() * rareMythic.length)]));
            } else {
              booster.push(mapCard(commons[Math.floor(Math.random() * commons.length)]));
            }

            for (let i = 0; i < 3; i++) {
              booster.push(mapCard(uncommons[Math.floor(Math.random() * uncommons.length)]));
            }

            for (let i = 0; i < 11; i++) {
              booster.push(mapCard(commons[Math.floor(Math.random() * commons.length)]));
            }

            boostersCreated++;
            resolve(booster);
          });
      });
    }

    function mapCard(card) {
      return {
        name: card.name,
        id: card.id,
        card: card.image_uris ? card.image_uris.normal : card.card_faces[0].image_uris.normal,
        rarity: card.rarity,
        colors: card.colors
      };
    }


    async function generateBoosterForPlayer(player) {
      player.booster = await generateRandomBooster(setCode);
      console.log(`Player ${player.name} received a booster:`, player.booster);
    }

  };

  externals.pickCard = function (cardId) {
    let selectedPlayer = players[7];
    let card;



    for (var i = 0; i <= selectedPlayer.booster.length; i++) {
      if (selectedPlayer.booster[i].id === cardId) {
        card = selectedPlayer.booster[i];
        break;
      }
    }

    if (selectedPlayer && card) {
      selectedPlayer.booster.splice(cardId, 1);
      selectedPlayer.pickedCards.push(card);

      console.log(`Player ${selectedPlayer.name} picked card: ${card.name}`);

      passBoosterToNextPlayer(selectedPlayer);
    }


  }













  function passBoosterToNextPlayer(player) {
    console.log("pass")
    const nextPlayerId = (player.id + 1) % players.length; // Calculate next player ID, handling wrapping around
    const pickedCard = player.booster[0]; // Pick the first card from the booster

    // Call the pickCardFromBooster function with the next player and the picked card
    pickCardFromBooster(players[nextPlayerId], pickedCard);

    // Remove the picked card from the current player's booster
    player.booster.shift();
  }

  // Loop through each player (except the user player) and simulate picking a card and passing the booster
  for (let i = 0; i < players.length; i++) {
    if (players[i].id !== 7) { // Skip the user player with ID 7
      const pickedCard = players[i].booster[0]; // Pick the first card from the booster
      pickCardFromBooster(players[i], pickedCard);
      passBoosterToNextPlayer(players[i]); // Pass the booster to the next player
    }
  }






  return externals;
});

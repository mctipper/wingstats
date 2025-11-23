# Wingstats

![Typescript 5.8.3](https://img.shields.io/badge/Typescript-5.8.3-3178C6)
![Vite 7.1.0](https://img.shields.io/badge/Vite-7.1.0-7F00FF)

Simple resource for finding the probabilties of success for rolling Wingspan dice.

- Dice Activations Types

  - Reset the birdfeeder\*.
  - Roll dice not in birdfeeder\*.
  - Push your luck.
  - Roll any _X_ dice\*.
  - Roll dice for _X_ birds in habitat\*.
  - Philippine Eagle.
  - Masked Lapwing.

Pre-filled in bird dice activations configurations are provided as a dropdown. Able to 'modify' the conditions just for fun.

\* these types strongly overlap in logic, however as they are different 'behaviours' will list them out separately

## Data

Uses images constructed by [navarog](https://github.com/navarog) from their nifty [Wingsearch](https://navarog.github.io/wingsearch/) page. Shamelessly lifted in whole, hence the same licencing in play to ensure all's above board. This data was in turn transformed from [TawnyFrogmouth](https://boardgamegeek.com/filepage/193164/wingspan-bird-card-spreadsheet) on BGG.

[Wingsearch](https://navarog.github.io/wingsearch/) is a fantastic resource, and really well engineered also, the code [repo](https://github.com/navarog/wingsearch/tree/master) itself is fun to explore on it's own.

## Development

I have kinda-purposefully completely over-engineered this as a means of sandpit playtime with frontend / TS development. I'm predominantly a backend/system design engineer so getting hands over with this frontend stuff is just for kicks really.

Tried to avoid 'frameworks' but when with `vite` because it really "just works" as they say. And picked TS instead of JS because types make me happy.

There is a `devcontainer` setup to make things easy, else using the versions from the badges up top for `vite` and `TS` can just give it a `npm install` and `npm run dev` to get it going. Haven't bothered with dev/prod splits or anything.

# Future Enhancements

- Mobile design layout fixes. Yueck.
- Provide 'run experiment' section for custom dice activations. Pick food, dice version, number of dice etc... and get probablities of outcomes.
- Dice-Roller Sim. Exercise in graphics and animations.
- Build out similar probabilities of success for drawing bird cards.
- Complete a 'bird cards' statistics, counts, analysis section
- Complete a 'bonus cards' statistics, counts, analysis section
- Provide 'run experiment' section for custom dice activations. Pick food, dice version, number of dice etc... and get probablities of outcomes.

# Versioning

## v0.1.0

Pre-release funtimes - basic controls functionality, nothing more

## Licence

GNU General Public Licence v3.0 for the code and whatnot.

Everything "Wingspan" related is obvs owned wholly by Stonemeier and all those associated with its development and publishing thereof. Thanks to _everyone_ involved in creating this great game.

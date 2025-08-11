import { describe, it, expect, vi, beforeEach } from 'vitest';
import { loadBirdCards } from '@data/loadBirdCards';
import * as transformModule from '@data/transform/transformBirdCard';
import type {
    BaseGameDeck,
    EuropeanDeck,
    OceaniaDeck,
    AsiaDeck,
    AllBirdDecks
} from '@customTypes/BirdCardDeck';


function assertType<T>(_value: T): void {
    // helper func to assert type (as per name duh)
}

// sample subset of actual master.json data
const sampleBirdCards = [
    {
        "id": 263,
        "Common name": "Abbott's Booby",
        "Scientific name": "Papasula abbotti",
        "Expansion": "oceania",
        "Color": "White",
        "PowerCategory": null,
        "Power text": "Draw 3 bonus cards, then discard 2. You may discard bonus cards you did not draw this turn.",
        "Predator": null,
        "Flocking": null,
        "Bonus card": "X",
        "Victory points": 5.0,
        "Nest type": "Platform",
        "Egg capacity": 1.0,
        "Wingspan": "190",
        "Forest": null,
        "Grassland": null,
        "Wetland": "X",
        "Invertebrate": null,
        "Seed": null,
        "Fish": 2.0,
        "Fruit": null,
        "Rodent": null,
        "Nectar": null,
        "Wild (food)": null,
        "\/ (food cost)": null,
        "* (food cost)": null,
        "Total food cost": 2.0,
        "Anatomist": null,
        "Cartographer": null,
        "Historian": "X",
        "Photographer": null,
        "Backyard Birder": null,
        "Bird Bander": null,
        "Bird Counter": null,
        "Bird Feeder": null,
        "Diet Specialist": null,
        "Enclosure Builder": null,
        "Falconer": null,
        "Fishery Manager": "X",
        "Food Web Expert": null,
        "Forester": null,
        "Large Bird Specialist": "X",
        "Nest Box Builder": null,
        "Omnivore Expert": null,
        "Passerine Specialist": null,
        "Platform Builder": "X",
        "Prairie Manager": null,
        "Rodentologist": null,
        "Viticulturalist": null,
        "Wetland Scientist": "X",
        "Wildlife Gardener": null,
        "Caprimulgiform Specialist": null,
        "Small Clutch Specialist": "X",
        "Endangered Species Protector": "X",
        "Beak Pointing Left": "X",
        "Beak Pointing Right": null,
        "Note": "This temporarily adds 3 bonus cards to your hand of bonus cards, then from that hand you discard any 2 bonus cards.",
        "rulings": [

        ],
        "additionalRulings": [
            {
                "text": "Whenever you are entitled to gain resources, you may choose to take some but not all of the quantity specified.",
                "source": "https:\/\/www.stonemaiergames.com\/games\/wingspan\/rules\/#comment-37710"
            }
        ]
    },
    {
        "id": 2,
        "Common name": "Acorn Woodpecker",
        "Scientific name": "Melanerpes formicivorus",
        "Expansion": "originalcore",
        "Color": "Brown",
        "PowerCategory": "Caching Food",
        "Power text": "Gain 1 [seed] from the birdfeeder, if available. You may cache it on this bird.",
        "Predator": null,
        "Flocking": null,
        "Bonus card": null,
        "Victory points": 5.0,
        "Nest type": "Cavity",
        "Egg capacity": 4.0,
        "Wingspan": "46",
        "Forest": "X",
        "Grassland": null,
        "Wetland": null,
        "Invertebrate": null,
        "Seed": 3.0,
        "Fish": null,
        "Fruit": null,
        "Rodent": null,
        "Nectar": null,
        "Wild (food)": null,
        "\/ (food cost)": null,
        "* (food cost)": null,
        "Total food cost": 3.0,
        "Anatomist": null,
        "Cartographer": null,
        "Historian": null,
        "Photographer": null,
        "Backyard Birder": null,
        "Bird Bander": null,
        "Bird Counter": null,
        "Bird Feeder": "X",
        "Diet Specialist": "X",
        "Enclosure Builder": null,
        "Falconer": null,
        "Fishery Manager": null,
        "Food Web Expert": null,
        "Forester": "X",
        "Large Bird Specialist": null,
        "Nest Box Builder": "X",
        "Omnivore Expert": null,
        "Passerine Specialist": null,
        "Platform Builder": null,
        "Prairie Manager": null,
        "Rodentologist": null,
        "Viticulturalist": null,
        "Wetland Scientist": null,
        "Wildlife Gardener": null,
        "Caprimulgiform Specialist": null,
        "Small Clutch Specialist": null,
        "Endangered Species Protector": null,
        "Beak Pointing Left": "X",
        "Beak Pointing Right": null,
        "Note": "The birds with these powers are known for caching extra food and saving it for later. As noted on these cards, you can cache exactly 1 food token when their power is activated by placing it on a bird card. Once a food token is cached on a bird card, you cannot spend it. Each token on the card at the end of the game is worth 1 point. If the same dice are showing in the birdfeeder, you may reroll to see if you meet the condition of the bird. If you run out of food tokens, you can cache cards instead.",
        "rulings": [

        ],
        "additionalRulings": [
            {
                "text": "Regular reroll rules apply whenever you have the opportunity to gain food from the birdfeeder.",
                "source": "https:\/\/www.stonemaiergames.com\/games\/wingspan\/rules\/"
            },
            {
                "text": "Whenever you are entitled to gain resources, you may choose to take some but not all of the quantity specified.",
                "source": "https:\/\/www.stonemaiergames.com\/games\/wingspan\/rules\/#comment-37710"
            }
        ]
    },
    {
        "id": 3,
        "Common name": "American Avocet",
        "Scientific name": "Recurvirostra americana",
        "Expansion": "originalcore",
        "Color": "Pink",
        "PowerCategory": "Egg-laying",
        "Power text": "When another player takes the \"lay eggs\" action, lay 1 [egg] on another bird with a [ground] nest.",
        "Predator": null,
        "Flocking": null,
        "Bonus card": null,
        "Victory points": 6.0,
        "Nest type": "Ground",
        "Egg capacity": 2.0,
        "Wingspan": "79",
        "Forest": null,
        "Grassland": null,
        "Wetland": "X",
        "Invertebrate": 2.0,
        "Seed": 1.0,
        "Fish": null,
        "Fruit": null,
        "Rodent": null,
        "Nectar": null,
        "Wild (food)": null,
        "\/ (food cost)": null,
        "* (food cost)": null,
        "Total food cost": 3.0,
        "Anatomist": null,
        "Cartographer": "X",
        "Historian": null,
        "Photographer": null,
        "Backyard Birder": null,
        "Bird Bander": null,
        "Bird Counter": null,
        "Bird Feeder": "X",
        "Diet Specialist": "X",
        "Enclosure Builder": "X",
        "Falconer": null,
        "Fishery Manager": null,
        "Food Web Expert": null,
        "Forester": null,
        "Large Bird Specialist": "X",
        "Nest Box Builder": null,
        "Omnivore Expert": null,
        "Passerine Specialist": null,
        "Platform Builder": null,
        "Prairie Manager": null,
        "Rodentologist": null,
        "Viticulturalist": null,
        "Wetland Scientist": "X",
        "Wildlife Gardener": null,
        "Caprimulgiform Specialist": null,
        "Small Clutch Specialist": "X",
        "Endangered Species Protector": null,
        "Beak Pointing Left": "X",
        "Beak Pointing Right": null,
        "Note": "These birds are all nest parasites in the wild: they lay eggs in other birds\u2019 nests. Cowbirds don\u2019t even build their own nests.<br>When another player uses the [grassland] action to lay eggs, you may lay 1 egg. You may do this only once between your turns, no matter how many other players lay eggs. The cowbird can lay eggs on star nests.",
        "rulings": [
            {
                "text": "You may not use this bird's power to lay an [egg] on another player's bird.",
                "source": "https:\/\/www.boardgamegeek.com\/thread\/2146296\/article\/33747572#33747572"
            }
        ],
        "additionalRulings": [
            {
                "text": "You may use a pink power during another player's turn after your last turn of the game.",
                "source": "https:\/\/www.boardgamegeek.com\/thread\/2145421\/article\/31177235#31177235"
            },
            {
                "text": "You may activate each <i>\"once between turns\"<\/i> power on a bird on your player mat once between each of your turns.",
                "source": "https:\/\/www.facebook.com\/groups\/wingspanboardgame\/permalink\/312352352801707\/?comment_id=312354036134872&reply_comment_id=312437246126551"
            },
            {
                "text": "You may not use a pink power during your turn (when an opponent performs an action that would otherwise enable using such a power).",
                "source": "https:\/\/www.facebook.com\/groups\/wingspanboardgame\/permalink\/499161054120835\/?comment_id=499167897453484"
            },
            {
                "text": "If a pink power is triggered by a player using the <i>\"gain food\"<\/i>, <i>\"lay eggs\"<\/i>, or <i>\"draw bird cards\"<\/i> action, the pink power is resolved after the player collects the resources indicated on the player mat but before any brown powers in the corresponding row are activated. If a pink power is triggered by another bird's power, the pink power is resolved after the other bird's power has been resolved.",
                "source": "https:\/\/www.boardgamegeek.com\/thread\/2397920\/article\/34412077#34412077"
            },
            {
                "text": "Whenever you are entitled to gain resources, you may choose to take some but not all of the quantity specified.",
                "source": "https:\/\/www.stonemaiergames.com\/games\/wingspan\/rules\/#comment-37710"
            }
        ]
    },
    {
        "id": 10,
        "Common name": "American Redstart",
        "Scientific name": "Setophaga ruticilla",
        "Expansion": "swiftstart",
        "Color": "Brown",
        "PowerCategory": null,
        "Power text": "Gain 1 [die] from the birdfeeder.",
        "Predator": null,
        "Flocking": null,
        "Bonus card": null,
        "Victory points": 4.0,
        "Nest type": "Bowl",
        "Egg capacity": 2.0,
        "Wingspan": "20",
        "Forest": "X",
        "Grassland": null,
        "Wetland": null,
        "Invertebrate": 1.0,
        "Seed": null,
        "Fish": null,
        "Fruit": 1.0,
        "Rodent": null,
        "Nectar": null,
        "Wild (food)": null,
        "\/ (food cost)": null,
        "* (food cost)": null,
        "Total food cost": 2.0,
        "Anatomist": null,
        "Cartographer": "X",
        "Historian": null,
        "Photographer": "X",
        "Backyard Birder": null,
        "Bird Bander": null,
        "Bird Counter": null,
        "Bird Feeder": null,
        "Diet Specialist": null,
        "Enclosure Builder": null,
        "Falconer": null,
        "Fishery Manager": null,
        "Food Web Expert": null,
        "Forester": "X",
        "Large Bird Specialist": null,
        "Nest Box Builder": null,
        "Omnivore Expert": null,
        "Passerine Specialist": "X",
        "Platform Builder": null,
        "Prairie Manager": null,
        "Rodentologist": null,
        "Viticulturalist": "X",
        "Wetland Scientist": null,
        "Wildlife Gardener": "X",
        "Caprimulgiform Specialist": null,
        "Small Clutch Specialist": "X",
        "Endangered Species Protector": null,
        "Beak Pointing Left": null,
        "Beak Pointing Right": "X",
        "Note": null,
        "rulings": [
            {
                "text": "This bird's power lets you take 1 food from the birdfeeder, as if [wild] were replaced by [die] in the power text.",
                "source": "https:\/\/www.facebook.com\/groups\/wingspanboardgame\/permalink\/447732882596986\/?comment_id=447733369263604"
            },
            {
                "text": "This bird does not count toward the <strong applink=\"\/card\/1000\">Anatomist<\/strong> bonus card.",
                "source": "https:\/\/www.facebook.com\/groups\/wingspanboardgame\/permalink\/453193798717561\/?comment_id=453409608695980&reply_comment_id=455637778473163"
            }
        ],
        "additionalRulings": [
            {
                "text": "Regular reroll rules apply whenever you have the opportunity to gain food from the birdfeeder.",
                "source": "https:\/\/www.stonemaiergames.com\/games\/wingspan\/rules\/"
            },
            {
                "text": "Whenever you are entitled to gain resources, you may choose to take some but not all of the quantity specified.",
                "source": "https:\/\/www.stonemaiergames.com\/games\/wingspan\/rules\/#comment-37710"
            }
        ]
    },
    {
        "id": 264,
        "Common name": "Australasian Pipit",
        "Scientific name": "Anthus novaeseelandiae",
        "Expansion": "oceania",
        "Color": "Yellow",
        "PowerCategory": "Flocking",
        "Power text": "Tuck 1 [card] from the deck behind each bird in your [grassland], including this one.",
        "Predator": null,
        "Flocking": "X",
        "Bonus card": null,
        "Victory points": 3.0,
        "Nest type": "Ground",
        "Egg capacity": 4.0,
        "Wingspan": "31",
        "Forest": null,
        "Grassland": "X",
        "Wetland": null,
        "Invertebrate": 1.0,
        "Seed": 1.0,
        "Fish": null,
        "Fruit": null,
        "Rodent": null,
        "Nectar": null,
        "Wild (food)": null,
        "\/ (food cost)": null,
        "* (food cost)": null,
        "Total food cost": 2.0,
        "Anatomist": null,
        "Cartographer": "X",
        "Historian": null,
        "Photographer": null,
        "Backyard Birder": "X",
        "Bird Bander": null,
        "Bird Counter": "X",
        "Bird Feeder": "X",
        "Diet Specialist": null,
        "Enclosure Builder": "X",
        "Falconer": null,
        "Fishery Manager": null,
        "Food Web Expert": null,
        "Forester": null,
        "Large Bird Specialist": null,
        "Nest Box Builder": null,
        "Omnivore Expert": null,
        "Passerine Specialist": null,
        "Platform Builder": null,
        "Prairie Manager": "X",
        "Rodentologist": null,
        "Viticulturalist": null,
        "Wetland Scientist": null,
        "Wildlife Gardener": null,
        "Caprimulgiform Specialist": null,
        "Small Clutch Specialist": null,
        "Endangered Species Protector": null,
        "Beak Pointing Left": null,
        "Beak Pointing Right": "X",
        "Note": null,
        "rulings": [

        ],
        "additionalRulings": [

        ]
    },
    {
        "id": 265,
        "Common name": "Australasian Shoveler",
        "Scientific name": "Spatula rhynchotis",
        "Expansion": "oceania",
        "Color": "Brown",
        "PowerCategory": "Egg-laying",
        "Power text": "Choose 1 other player. You both draw 1 [card] from the deck.",
        "Predator": null,
        "Flocking": null,
        "Bonus card": null,
        "Victory points": 4.0,
        "Nest type": "Ground",
        "Egg capacity": 4.0,
        "Wingspan": "75",
        "Forest": null,
        "Grassland": null,
        "Wetland": "X",
        "Invertebrate": 1.0,
        "Seed": 1.0,
        "Fish": null,
        "Fruit": null,
        "Rodent": null,
        "Nectar": null,
        "Wild (food)": null,
        "\/ (food cost)": null,
        "* (food cost)": null,
        "Total food cost": 2.0,
        "Anatomist": null,
        "Cartographer": "X",
        "Historian": null,
        "Photographer": null,
        "Backyard Birder": null,
        "Bird Bander": null,
        "Bird Counter": null,
        "Bird Feeder": "X",
        "Diet Specialist": null,
        "Enclosure Builder": "X",
        "Falconer": null,
        "Fishery Manager": null,
        "Food Web Expert": null,
        "Forester": null,
        "Large Bird Specialist": "X",
        "Nest Box Builder": null,
        "Omnivore Expert": null,
        "Passerine Specialist": null,
        "Platform Builder": null,
        "Prairie Manager": null,
        "Rodentologist": null,
        "Viticulturalist": null,
        "Wetland Scientist": "X",
        "Wildlife Gardener": null,
        "Caprimulgiform Specialist": null,
        "Small Clutch Specialist": null,
        "Endangered Species Protector": null,
        "Beak Pointing Left": "X",
        "Beak Pointing Right": null,
        "Note": null,
        "rulings": [

        ],
        "additionalRulings": [
            {
                "text": "Whenever you are entitled to gain resources, you may choose to take some but not all of the quantity specified.",
                "source": "https:\/\/www.stonemaiergames.com\/games\/wingspan\/rules\/#comment-37710"
            }
        ]
    },
    {
        "id": 360,
        "Common name": "Azure Tit",
        "Scientific name": "Cyanistes cyanus",
        "Expansion": "asia",
        "Color": "Brown",
        "PowerCategory": null,
        "Power text": "Gain 1 [invertebrate], [seed], or [fruit] from the supply.",
        "Predator": null,
        "Flocking": null,
        "Bonus card": null,
        "Victory points": 2.0,
        "Nest type": "Cavity",
        "Egg capacity": 4.0,
        "Wingspan": 22,
        "Forest": "X",
        "Grassland": null,
        "Wetland": null,
        "Invertebrate": 1.0,
        "Seed": 1.0,
        "Fish": null,
        "Fruit": null,
        "Rodent": null,
        "Nectar": null,
        "Wild (food)": null,
        "\/ (food cost)": null,
        "* (food cost)": null,
        "Total food cost": 2.0,
        "Anatomist": null,
        "Cartographer": null,
        "Historian": null,
        "Photographer": "X",
        "Backyard Birder": "X",
        "Bird Bander": null,
        "Bird Counter": null,
        "Bird Feeder": "X",
        "Diet Specialist": null,
        "Enclosure Builder": null,
        "Falconer": null,
        "Fishery Manager": null,
        "Food Web Expert": null,
        "Forester": "X",
        "Large Bird Specialist": null,
        "Nest Box Builder": "X",
        "Omnivore Expert": null,
        "Passerine Specialist": "X",
        "Platform Builder": null,
        "Prairie Manager": null,
        "Rodentologist": null,
        "Viticulturalist": null,
        "Wetland Scientist": null,
        "Wildlife Gardener": null,
        "Caprimulgiform Specialist": null,
        "Small Clutch Specialist": null,
        "Endangered Species Protector": null,
        "Beak Pointing Left": null,
        "Beak Pointing Right": "X",
        "Note": null,
        "rulings": [

        ],
        "additionalRulings": [
            {
                "text": "You may only reroll dice when gaining food from the birdfeeder and not when gaining food from the supply.",
                "source": "https:\/\/www.boardgamegeek.com\/thread\/2208584\/article\/32288825#32288825"
            },
            {
                "text": "Whenever you are entitled to gain resources, you may choose to take some but not all of the quantity specified.",
                "source": "https:\/\/www.stonemaiergames.com\/games\/wingspan\/rules\/#comment-37710"
            }
        ]
    }
];

vi.stubGlobal('fetch', vi.fn(async () => ({
    ok: true,
    json: async () => sampleBirdCards,
})));

describe('loadBirdCards integration', () => {
    beforeEach(() => {
        vi.restoreAllMocks();
    });

    it('calls transformBirdCard for each raw card', async () => {
        const transformSpy = vi.spyOn(transformModule, 'transformBirdCard');

        await loadBirdCards();

        expect(transformSpy).toHaveBeenCalledTimes(sampleBirdCards.length);
    });

    it('allocates transformed cards into correct decks', async () => {
        const decks: AllBirdDecks = await loadBirdCards();

        // types first
        assertType<AllBirdDecks>(decks);
        assertType<BaseGameDeck>(decks.BaseGame)
        assertType<EuropeanDeck>(decks.European)
        assertType<OceaniaDeck>(decks.Oceania)
        assertType<AsiaDeck>(decks.Asia)

        // count the number of cards loaded into each deck
        // both 'originalcore' and 'swiftstart' to be counted as BaseGame
        expect(decks.BaseGame.cards.length).toBe(3);
        expect(decks.European.cards.length).toBe(0); // purposefully did not put in any European birds in the sample
        expect(decks.Oceania.cards.length).toBe(3);
        expect(decks.Asia.cards.length).toBe(1);
    });
});

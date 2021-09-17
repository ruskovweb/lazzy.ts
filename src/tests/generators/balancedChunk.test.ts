import { expect } from "chai";
import Lazy from "../..";
import { asyncIterator } from "../helpers";

describe("ƒ balancedChunk()", function () {
    it("should split 10 numbers into chunks with total sum 10", function () {
        const chunks = Lazy.from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]).balancedChunk(10).toArray();
        expect(chunks).to.be.deep.eq([[10], [6, 4], [7, 3], [8, 2], [9, 1], [5]]);
    });

    it("should balance the cargo", function () {
        const ships = Lazy.range({ from: 100, to: 1000, step: 20 })
            .map((weight) => new Cargo(weight))
            .balancedChunk(8000, (cargo) => cargo.weight)
            .map((cargos) => new Ship(cargos))
            .toArray();

        expect(ships).to.be.deep.eq(expectedShips);
    });
});

describe("ƒ balancedChunkAsync()", function () {
    it("should split 10 numbers into chunks with total sum 10", async function () {
        const chunks = await Lazy.fromAsync(asyncIterator(10)).balancedChunk(10).toArray();
        expect(chunks).to.be.deep.eq([[10], [6, 4], [7, 3], [8, 2], [9, 1], [5]]);
    });

    it("should balance the cargo", async function () {
        const generator = function () {
            let n = 80;
            return function () {
                return Promise.resolve(n += 20);
            };
        };
        
        const ships = await Lazy.generateAsync(generator())
            .take(46)
            .map((weight) => new Cargo(weight))
            .balancedChunk(8000, (cargo) => cargo.weight)
            .map((cargos) => new Ship(cargos))
            .toArray();

        expect(ships).to.be.deep.eq(expectedShips);
    });
});

class Cargo {
    weight: number;

    constructor(weight: number) {
        this.weight = weight;
    }
}

class Ship {
    cargos: Cargo[] = [];

    constructor(cargos: Cargo[]) {
        this.cargos = cargos;
    }
}

const expectedShips = [
    new Ship([{ weight: 1000 }, { weight: 980 }, { weight: 960 }, { weight: 940 }, { weight: 920 }, { weight: 900 }, { weight: 880 }, { weight: 860 }, { weight: 560 }]),
    new Ship([
        { weight: 840 },
        { weight: 820 },
        { weight: 800 },
        { weight: 780 },
        { weight: 760 },
        { weight: 740 },
        { weight: 720 },
        { weight: 700 },
        { weight: 680 },
        { weight: 660 },
        { weight: 500 },
    ]),
    new Ship([
        { weight: 640 },
        { weight: 620 },
        { weight: 600 },
        { weight: 580 },
        { weight: 540 },
        { weight: 520 },
        { weight: 480 },
        { weight: 460 },
        { weight: 440 },
        { weight: 420 },
        { weight: 400 },
        { weight: 380 },
        { weight: 360 },
        { weight: 340 },
        { weight: 320 },
        { weight: 300 },
        { weight: 280 },
        { weight: 260 },
    ]),
    new Ship([{ weight: 240 }, { weight: 220 }, { weight: 200 }, { weight: 180 }, { weight: 160 }, { weight: 140 }, { weight: 120 }, { weight: 100 }]),
];

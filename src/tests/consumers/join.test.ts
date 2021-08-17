import { expect } from "chai";
import Lazy from "../..";

describe("ƒ join()", function () {
    it("should join numbers with comma and space", function () {
        const result = Lazy.from([1, 2, 3]).join(", ");
        expect(result).to.be.equal("1, 2, 3");
    });

    it("should join booleans with comma and space", function () {
        const result = Lazy.from([true, false, true]).join(", ");
        expect(result).to.be.equal("true, false, true");
    });

    it("should join strings with comma and space", function () {
        const result = Lazy.from(["value1", "value 2", "value, 3"]).join(", ");
        expect(result).to.be.equal("value1, value 2, value, 3");
    });

    it("should join numbers with comma and space from objects", function () {
        const result = Lazy.from([{ n: true }, { n: false }, { n: true }, { n: false }]).join(", ", (obj) => obj.n);
        expect(result).to.be.equal("true, false, true, false");
    });

    it("should join booleans with comma and space from objects", function () {
        const result = Lazy.from([{ n: 2 }, { n: 4 }, { n: 1 }, { n: 3 }]).join(", ", (obj) => obj.n);
        expect(result).to.be.equal("2, 4, 1, 3");
    });

    it("should join strings with comma and space from objects", function () {
        const result = Lazy.from([{ n: "value1" }, { n: "value 2" }, { n: "value, 3" }]).join(", ", (obj) => obj.n);
        expect(result).to.be.equal("value1, value 2, value, 3");
    });
});

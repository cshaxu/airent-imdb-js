"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemoryDatabaseError = exports.InMemoryDatabase = exports.InMemoryCollection = void 0;
exports.createInMemoryDatabase = createInMemoryDatabase;
var utils_1 = require("./utils");
var InMemoryDatabaseError = /** @class */ (function (_super) {
    __extends(InMemoryDatabaseError, _super);
    function InMemoryDatabaseError(message) {
        var _this = _super.call(this, message) || this;
        _this.name = "InMemoryDatabaseError";
        return _this;
    }
    return InMemoryDatabaseError;
}(Error));
exports.InMemoryDatabaseError = InMemoryDatabaseError;
function cloneValue(value) {
    return structuredClone(value);
}
function isInFilter(value) {
    return (typeof value === "object" &&
        value !== null &&
        "in" in value &&
        Array.isArray(value.in));
}
function isEqualityFilter(value) {
    return (typeof value === "object" &&
        value !== null &&
        "equals" in value);
}
function isNotFilter(value) {
    return (typeof value === "object" &&
        value !== null &&
        "not" in value);
}
function isComparableFilter(value) {
    return (typeof value === "object" &&
        value !== null &&
        (("gt" in value && value.gt !== undefined) ||
            ("gte" in value && value.gte !== undefined) ||
            ("lt" in value && value.lt !== undefined) ||
            ("lte" in value && value.lte !== undefined)));
}
function isStringFilter(value) {
    return (typeof value === "object" &&
        value !== null &&
        (("contains" in value &&
            typeof value.contains === "string") ||
            ("startsWith" in value &&
                typeof value.startsWith === "string") ||
            ("endsWith" in value &&
                typeof value.endsWith === "string")));
}
function isOperatorFilter(value) {
    return (isInFilter(value) ||
        isEqualityFilter(value) ||
        isNotFilter(value) ||
        isComparableFilter(value) ||
        isStringFilter(value));
}
function normalizeString(value, mode) {
    return mode === "insensitive" ? value.toLowerCase() : value;
}
function matchesStringFilter(actual, expected) {
    if (typeof actual !== "string") {
        return false;
    }
    var current = normalizeString(actual, expected.mode);
    if (expected.contains !== undefined) {
        return current.includes(normalizeString(expected.contains, expected.mode));
    }
    if (expected.startsWith !== undefined) {
        return current.startsWith(normalizeString(expected.startsWith, expected.mode));
    }
    if (expected.endsWith !== undefined) {
        return current.endsWith(normalizeString(expected.endsWith, expected.mode));
    }
    return true;
}
function matchesComparableFilter(actual, expected) {
    if (expected.gt !== undefined &&
        compareOrderValues(actual, expected.gt) <= 0) {
        return false;
    }
    if (expected.gte !== undefined &&
        compareOrderValues(actual, expected.gte) < 0) {
        return false;
    }
    if (expected.lt !== undefined &&
        compareOrderValues(actual, expected.lt) >= 0) {
        return false;
    }
    if (expected.lte !== undefined &&
        compareOrderValues(actual, expected.lte) > 0) {
        return false;
    }
    return true;
}
function matchesField(actual, expected) {
    if (isOperatorFilter(expected)) {
        if (isInFilter(expected)) {
            return expected.in.some(function (candidate) { return (0, utils_1.compare)(candidate, actual); });
        }
        if (isEqualityFilter(expected)) {
            return (0, utils_1.compare)(actual, expected.equals);
        }
        if (isNotFilter(expected)) {
            return !matchesField(actual, expected.not);
        }
        if (isComparableFilter(expected)) {
            return matchesComparableFilter(actual, expected);
        }
        if (isStringFilter(expected)) {
            return matchesStringFilter(actual, expected);
        }
    }
    return (0, utils_1.compare)(actual, expected);
}
function matchesWhere(row, where) {
    if (where === undefined) {
        return true;
    }
    var AND = where.AND, NOT = where.NOT, OR = where.OR, conditions = __rest(where, ["AND", "NOT", "OR"]);
    var isMatch = Object.entries(conditions).every(function (_a) {
        var field = _a[0], expected = _a[1];
        return matchesField(row[field], expected);
    });
    if (!isMatch) {
        return false;
    }
    if (AND !== undefined &&
        !AND.every(function (clause) { return matchesWhere(row, clause); })) {
        return false;
    }
    if (NOT !== undefined) {
        var clauses = Array.isArray(NOT) ? NOT : [NOT];
        if (clauses.some(function (clause) { return matchesWhere(row, clause); })) {
            return false;
        }
    }
    if (OR === undefined || OR.length === 0) {
        return true;
    }
    return OR.some(function (clause) { return matchesWhere(row, clause); });
}
function normalizeOrderBy(orderBy) {
    if (orderBy === undefined) {
        return [];
    }
    var array = Array.isArray(orderBy) ? orderBy : [orderBy];
    return array.flatMap(function (item) {
        return Object.entries(item).filter(function (entry) { return entry[1] !== undefined; });
    });
}
function compareOrderValues(a, b) {
    if ((0, utils_1.compare)(a, b)) {
        return 0;
    }
    if (a === undefined || a === null) {
        return -1;
    }
    if (b === undefined || b === null) {
        return 1;
    }
    if (a instanceof Date && b instanceof Date) {
        return a.getTime() - b.getTime();
    }
    if (typeof a === "number" && typeof b === "number") {
        return a - b;
    }
    if (typeof a === "bigint" && typeof b === "bigint") {
        return a > b ? 1 : -1;
    }
    var valueA = JSON.stringify(a);
    var valueB = JSON.stringify(b);
    return valueA < valueB ? -1 : 1;
}
function applyQuery(rows, args) {
    var _a;
    if (args === void 0) { args = {}; }
    var filtered = rows.filter(function (row) { return matchesWhere(row, args.where); });
    var orderEntries = normalizeOrderBy(args.orderBy);
    if (orderEntries.length > 0) {
        filtered.sort(function (a, b) {
            for (var _i = 0, orderEntries_1 = orderEntries; _i < orderEntries_1.length; _i++) {
                var _a = orderEntries_1[_i], field = _a[0], direction = _a[1];
                var result = compareOrderValues(a[field], b[field]);
                if (result !== 0) {
                    return direction === "desc" ? -result : result;
                }
            }
            return 0;
        });
    }
    var skip = Math.max(0, (_a = args.skip) !== null && _a !== void 0 ? _a : 0);
    var take = args.take === undefined ? undefined : Math.max(0, args.take);
    return filtered.slice(skip, take === undefined ? undefined : skip + take);
}
function requireOne(row, methodName) {
    if (row === undefined) {
        throw new InMemoryDatabaseError("".concat(methodName, " failed: record not found."));
    }
    return row;
}
function findMatchingIndexes(rows, where) {
    return rows.reduce(function (acc, row, index) {
        if (matchesWhere(row, where)) {
            acc.push(index);
        }
        return acc;
    }, []);
}
function findUniqueIndex(rows, where, methodName) {
    var indexes = findMatchingIndexes(rows, where);
    if (indexes.length === 0) {
        return null;
    }
    if (indexes.length > 1) {
        throw new InMemoryDatabaseError("".concat(methodName, " failed: expected a unique match but found ").concat(indexes.length, "."));
    }
    return indexes[0];
}
var InMemoryCollection = /** @class */ (function () {
    function InMemoryCollection(seedRows) {
        if (seedRows === void 0) { seedRows = []; }
        var _this = this;
        this.reset = function (rows) {
            if (rows === void 0) { rows = []; }
            _this.rows = rows.map(function (row) { return cloneValue(row); });
        };
        this.exportRows = function () {
            return _this.rows.map(function (row) { return cloneValue(row); });
        };
        this.findMany = function () {
            var args_1 = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args_1[_i] = arguments[_i];
            }
            return __awaiter(_this, __spreadArray([], args_1, true), void 0, function (args) {
                if (args === void 0) { args = {}; }
                return __generator(this, function (_a) {
                    return [2 /*return*/, applyQuery(this.rows, args).map(function (row) { return cloneValue(row); })];
                });
            });
        };
        this.findOne = function () {
            var args_1 = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args_1[_i] = arguments[_i];
            }
            return __awaiter(_this, __spreadArray([], args_1, true), void 0, function (args) {
                if (args === void 0) { args = {}; }
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.findFirst(args)];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        this.findUnique = function (args) { return __awaiter(_this, void 0, void 0, function () {
            var index;
            return __generator(this, function (_a) {
                index = findUniqueIndex(this.rows, args.where, "findUnique");
                return [2 /*return*/, index === null ? null : cloneValue(this.rows[index])];
            });
        }); };
        this.findFirst = function () {
            var args_1 = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args_1[_i] = arguments[_i];
            }
            return __awaiter(_this, __spreadArray([], args_1, true), void 0, function (args) {
                var row;
                if (args === void 0) { args = {}; }
                return __generator(this, function (_a) {
                    row = applyQuery(this.rows, __assign(__assign({}, args), { take: 1 }))[0];
                    return [2 /*return*/, row === undefined ? null : cloneValue(row)];
                });
            });
        };
        this.create = function (args) { return __awaiter(_this, void 0, void 0, function () {
            var row;
            return __generator(this, function (_a) {
                row = cloneValue(args.data);
                this.rows.push(row);
                return [2 /*return*/, cloneValue(row)];
            });
        }); };
        this.update = function (args) { return __awaiter(_this, void 0, void 0, function () {
            var index, next;
            return __generator(this, function (_a) {
                index = findUniqueIndex(this.rows, args.where, "update");
                if (index === null) {
                    throw new InMemoryDatabaseError("update failed: record not found.");
                }
                next = __assign(__assign({}, this.rows[index]), cloneValue(args.data));
                this.rows[index] = next;
                return [2 /*return*/, cloneValue(next)];
            });
        }); };
        this.delete = function (args) { return __awaiter(_this, void 0, void 0, function () {
            var index, deleted;
            return __generator(this, function (_a) {
                index = findUniqueIndex(this.rows, args.where, "delete");
                if (index === null) {
                    throw new InMemoryDatabaseError("delete failed: record not found.");
                }
                deleted = this.rows.splice(index, 1)[0];
                return [2 /*return*/, cloneValue(deleted)];
            });
        }); };
        this.rows = seedRows.map(function (row) { return cloneValue(row); });
    }
    return InMemoryCollection;
}());
exports.InMemoryCollection = InMemoryCollection;
var InMemoryDatabase = /** @class */ (function () {
    function InMemoryDatabase(seed) {
        if (seed === void 0) { seed = {}; }
        this.collections = new Map();
        this.seed(seed);
    }
    InMemoryDatabase.prototype.table = function (name) {
        if (!this.collections.has(name)) {
            var collection = new InMemoryCollection();
            this.collections.set(name, collection);
        }
        return this.collections.get(name);
    };
    InMemoryDatabase.prototype.seed = function (seed) {
        for (var _i = 0, _a = Object.entries(seed); _i < _a.length; _i++) {
            var _b = _a[_i], name_1 = _b[0], rows = _b[1];
            this.table(name_1).reset(rows);
        }
    };
    InMemoryDatabase.prototype.clear = function () {
        for (var _i = 0, _a = Array.from(this.collections.values()); _i < _a.length; _i++) {
            var collection = _a[_i];
            collection.reset();
        }
    };
    InMemoryDatabase.prototype.exportData = function () {
        return Array.from(this.collections.entries()).reduce(function (acc, _a) {
            var name = _a[0], collection = _a[1];
            acc[name] = collection.exportRows();
            return acc;
        }, {});
    };
    return InMemoryDatabase;
}());
exports.InMemoryDatabase = InMemoryDatabase;
function createInMemoryDatabase(seed) {
    if (seed === void 0) { seed = {}; }
    var database = new InMemoryDatabase(seed);
    return new Proxy(database, {
        get: function (target, property, receiver) {
            if (typeof property === "string" && !(property in target)) {
                return target.table(property);
            }
            return Reflect.get(target, property, receiver);
        },
    });
}
//# sourceMappingURL=imdb.js.map
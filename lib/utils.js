"use strict";
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
exports.batchLoad = batchLoad;
exports.batchLoadTopMany = batchLoadTopMany;
exports.buildWhere = buildWhere;
exports.compare = compare;
exports.entityCompare = entityCompare;
exports.omit = omit;
var consts_1 = require("./consts");
function batchLoad(loader_1, keys_1) {
    return __awaiter(this, arguments, void 0, function (loader, keys, batchSize, topSize) {
        var result, where, offset, batch, take, query;
        if (batchSize === void 0) { batchSize = consts_1.DEFAULT_BATCH_SIZE; }
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (keys.length === 0) {
                        return [2 /*return*/, []];
                    }
                    result = [];
                    where = buildWhere(keys);
                    offset = 0;
                    batch = [];
                    take = topSize === undefined ? batchSize : Math.min(batchSize, topSize);
                    _a.label = 1;
                case 1:
                    query = { where: where, skip: offset, take: take };
                    return [4 /*yield*/, loader(query)];
                case 2:
                    batch = _a.sent();
                    if (topSize === undefined || result.length + batch.length <= topSize) {
                        result.push.apply(result, batch);
                    }
                    else {
                        if (result.length < topSize) {
                            result.push.apply(result, batch.slice(0, topSize - result.length));
                        }
                        return [3 /*break*/, 4];
                    }
                    offset += batch.length;
                    _a.label = 3;
                case 3:
                    if (batch.length === batchSize) return [3 /*break*/, 1];
                    _a.label = 4;
                case 4: return [2 /*return*/, result];
            }
        });
    });
}
function batchLoadTopMany(loader_1, matcher_1, keys_1, topSize_1) {
    return __awaiter(this, arguments, void 0, function (loader, matcher, keys, topSize, batchSize) {
        var result, where, counts, offset, batch, _i, batch_1, entity, index, key;
        if (batchSize === void 0) { batchSize = consts_1.DEFAULT_BATCH_SIZE; }
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    result = [];
                    if (keys.length === 0 || topSize <= 0) {
                        return [2 /*return*/, result];
                    }
                    where = buildWhere(keys, false);
                    counts = keys.map(function () { return 0; });
                    offset = 0;
                    batch = [];
                    _a.label = 1;
                case 1: return [4 /*yield*/, loader({
                        where: where,
                        skip: offset,
                        take: batchSize,
                    })];
                case 2:
                    batch = _a.sent();
                    for (_i = 0, batch_1 = batch; _i < batch_1.length; _i++) {
                        entity = batch_1[_i];
                        for (index = 0; index < keys.length; index += 1) {
                            key = keys[index];
                            if (counts[index] >= topSize) {
                                continue;
                            }
                            if (matcher(key, entity)) {
                                result.push(entity);
                                counts[index] += 1;
                                break;
                            }
                        }
                    }
                    offset += batch.length;
                    _a.label = 3;
                case 3:
                    if (batch.length === batchSize && counts.some(function (count) { return count < topSize; })) return [3 /*break*/, 1];
                    _a.label = 4;
                case 4: return [2 /*return*/, result];
            }
        });
    });
}
function compareObjects(a, b) {
    var keysA = Object.keys(a);
    var keysB = Object.keys(b);
    if (keysA.length !== keysB.length) {
        return false;
    }
    return keysA.every(function (key) { return Object.prototype.hasOwnProperty.call(b, key) && compare(a[key], b[key]); });
}
function buildWhere(loadKeys, allowIn) {
    if (allowIn === void 0) { allowIn = true; }
    if (loadKeys.length === 0) {
        return {};
    }
    var map = loadKeys.reduce(function (acc, loadKey) {
        Object.entries(loadKey).forEach(function (entry) {
            var _a;
            var array = ((_a = acc[entry[0]]) !== null && _a !== void 0 ? _a : []);
            if (!array.some(function (value) { return compare(value, entry[1]); })) {
                array.push(entry[1]);
            }
            acc[entry[0]] = array;
        });
        return acc;
    }, {});
    var allKeys = Object.keys(map);
    var entries = Object.entries(map);
    var singleKeys = entries
        .filter(function (entry) { return entry[1].length === 1; })
        .map(function (entry) { return entry[0]; });
    var singleKeySet = new Set(singleKeys);
    var multiKeys = allKeys.filter(function (key) { return !singleKeySet.has(key); });
    var where = Object.entries(loadKeys[0])
        .filter(function (entry) { return singleKeySet.has(entry[0]); })
        .reduce(function (acc, entry) {
        acc[entry[0]] = entry[1];
        return acc;
    }, {});
    if (multiKeys.length === 0) {
        return where;
    }
    if (allowIn && multiKeys.length === 1) {
        var onlyMultiKey = multiKeys[0];
        var values = map[onlyMultiKey];
        if (!["function", "object"].includes(typeof values[0])) {
            where[onlyMultiKey] = { in: values };
            return where;
        }
    }
    where["OR"] = loadKeys.map(function (loadKey) { return omit(loadKey, singleKeys); });
    return where;
}
function entityCompare(original, updated, fields) {
    return fields.filter(function (field) {
        var value1 = original[field];
        var value2 = updated[field];
        return !compare(value1, value2);
    });
}
function compare(a, b) {
    if (Object.is(a, b)) {
        return true;
    }
    var typeA = typeof a;
    var typeB = typeof b;
    if (typeA !== typeB) {
        return false;
    }
    if (a === null || b === null) {
        return false;
    }
    if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime();
    }
    if (Array.isArray(a) || Array.isArray(b)) {
        if (!Array.isArray(a) || !Array.isArray(b) || a.length !== b.length) {
            return false;
        }
        return a.every(function (value, index) { return compare(value, b[index]); });
    }
    if (typeA !== "object") {
        return false;
    }
    return compareObjects(a, b);
}
function omit(object, keys) {
    var keyList = (typeof keys === "string" ? [keys] : __spreadArray([], keys, true));
    var result = {};
    for (var _i = 0, _a = Object.keys(object); _i < _a.length; _i++) {
        var key = _a[_i];
        if (!keyList.includes(key)) {
            result[key] = object[key];
        }
    }
    return result;
}
//# sourceMappingURL=utils.js.map
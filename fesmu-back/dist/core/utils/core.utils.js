"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbFilters = dbFilters;
function dbFilters(obj) {
    return Object.fromEntries(Object.entries(obj).filter(([_, value]) => value !== undefined));
}
//# sourceMappingURL=core.utils.js.map
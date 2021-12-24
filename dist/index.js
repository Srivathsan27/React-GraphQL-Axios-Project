"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const constants_1 = __importDefault(require("./constants"));
const express_graphql_1 = require("express-graphql");
const gqlSchema_1 = __importDefault(require("./schemas/gqlSchema"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use("/graphql", (0, express_graphql_1.graphqlHTTP)({
    schema: gqlSchema_1.default,
    graphiql: true,
}));
app.listen(constants_1.default);

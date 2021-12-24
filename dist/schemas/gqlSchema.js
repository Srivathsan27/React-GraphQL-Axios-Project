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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const axios_1 = __importDefault(require("axios"));
// import { type } from "os";
const RocketType = new graphql_1.GraphQLObjectType({
    name: "Rocket",
    fields: () => ({
        id: { type: graphql_1.GraphQLString },
        name: { type: graphql_1.GraphQLString },
        first_flight: { type: graphql_1.GraphQLString },
        description: { type: graphql_1.GraphQLString },
        boosters: { type: graphql_1.GraphQLInt },
        stages: { type: graphql_1.GraphQLInt },
    }),
});
const LaunchType = new graphql_1.GraphQLObjectType({
    name: "Launch",
    fields: () => ({
        id: { type: graphql_1.GraphQLString },
        name: { type: graphql_1.GraphQLString },
        date_local: { type: graphql_1.GraphQLString },
        success: { type: graphql_1.GraphQLBoolean },
        details: { type: graphql_1.GraphQLString },
        rocket: { type: graphql_1.GraphQLString },
    }),
});
const LaunchData = new graphql_1.GraphQLObjectType({
    name: "LaunchData",
    fields: () => ({
        id: { type: graphql_1.GraphQLString },
        name: { type: graphql_1.GraphQLString },
        date_local: { type: graphql_1.GraphQLString },
        success: { type: graphql_1.GraphQLBoolean },
        details: { type: graphql_1.GraphQLString },
        rocket: { type: graphql_1.GraphQLString },
        rocket_data: { type: RocketType },
    }),
});
// Root Queries:
const RootQuery = new graphql_1.GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        launches: {
            type: new graphql_1.GraphQLList(LaunchType),
            resolve(parent, args) {
                return __awaiter(this, void 0, void 0, function* () {
                    const res = yield axios_1.default.get("https://api.spacexdata.com/v4/launches");
                    return res.data;
                });
            },
        },
        rockets: {
            type: new graphql_1.GraphQLList(RocketType),
            resolve(parent, args) {
                return __awaiter(this, void 0, void 0, function* () {
                    const res = yield axios_1.default.get("https://api.spacexdata.com/v4/rockets");
                    return res.data;
                });
            },
        },
        rocket: {
            type: RocketType,
            args: {
                rocket_id: { type: graphql_1.GraphQLString },
            },
            resolve(parent, args) {
                return __awaiter(this, void 0, void 0, function* () {
                    const rocketRes = yield axios_1.default.get(`https://api.spacexdata.com/v4/rockets/${args.rocket_id}`);
                    return rocketRes.data;
                });
            },
        },
        launch: {
            type: LaunchData,
            args: {
                launch_id: { type: graphql_1.GraphQLString },
            },
            resolve(parent, args) {
                return __awaiter(this, void 0, void 0, function* () {
                    const launchRes = yield axios_1.default.get(`https://api.spacexdata.com/v4/launches/${args.launch_id}`);
                    const rocketRes = yield axios_1.default.get(`https://api.spacexdata.com/v4/rockets/${launchRes.data.rocket}`);
                    return Object.assign(Object.assign({}, launchRes.data), { rocket_data: Object.assign({}, rocketRes.data) });
                });
            },
        },
    },
});
exports.default = new graphql_1.GraphQLSchema({
    query: RootQuery,
});

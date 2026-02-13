import { HasMissionPubSub } from "@lv/entity";
import { PubSub } from "graphql-subscriptions";

export type DeskPubSub = PubSub<HasMissionPubSub>;

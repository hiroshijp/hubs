import { HubsWorld } from "../app";
import { Held, HatenaMsg } from "../bit-components";
import { defineQuery, enterQuery } from "bitecs";
import { SOUND_QUACK, SOUND_SPECIAL_QUACK } from "../systems/sound-effects-system";

const heldHatenaQuery = defineQuery([HatenaMsg, Held]);
const heldHatenaEnterQuery = enterQuery(heldHatenaQuery);

export function hatenaMsgSystem(world: HubsWorld) {
  heldHatenaEnterQuery(world).forEach(() => {
    APP.scene?.systems["hubs-systems"].soundEffectsSystem.playSoundOneShot(SOUND_SPECIAL_QUACK);
  });
}
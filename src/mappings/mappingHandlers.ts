import { SubstrateEvent } from "@subql/types";
import {AccountVote} from "@polkadot/types/interfaces";
import {Voted} from "../types";

export async function handleEvent(event: SubstrateEvent): Promise<void> {
    const voter = event.event.data[0];
    const referenda_index = event.event.data[1];
    const accountVote = event.event.data[2] as AccountVote;
    const standardAccountVote = accountVote.asStandard;

    const voted = new Voted(
        `${event.block.block.header.number.toNumber()}-${event.idx}`
    );
    voted.voter = voter.toString();
    voted.referenda = BigInt(referenda_index.toString());
    voted.vote = standardAccountVote.vote.isAye;
    voted.balance = standardAccountVote.balance.toBigInt();
    await voted.save();
}


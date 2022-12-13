import {Party} from "./party";

export class Speaker {
  id: number;
  name: string;
  party: Party;
  status: string;
  placement: string;
  selected: boolean;

  prepare(input: any) {
    Object.assign(this, input);
    if (input.party) {
      this.party = new Party().prepare(input.party.data);
    }
    this.selected = false;
    return this;
  }
}

export class Party{
  id: number;
  name: string;
  short_name: string;
  president: string;

  selected: boolean;

  prepare(input: any){
    Object.assign(this, input);
    this.selected = false;
    return this;
  }
}

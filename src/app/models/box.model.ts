export class Box {
  id: string;
  checked: boolean;
  value: string;

  constructor(id: string) {
    this.id = id;
    this.checked = false;
  }
}

export class Player {
  name: string;
  value: string;
  isNPC: boolean;

  constructor(name: string, value: string, isNPC: boolean) {
    this.name = name;
    this.value = value;
    this.isNPC = isNPC;
  }
}

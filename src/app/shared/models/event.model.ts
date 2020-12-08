export class Event {
  public date: string;
  public recipe_name: string;

  constructor(date: string, recipe_name: string) {
    this.date = date;
    this.recipe_name = recipe_name;
  }
}
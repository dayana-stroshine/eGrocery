export class Ingredient {
  public ingredient_id: number;
  public name: string;
  public quantity: number;
  public category: string;
  public unit: string;

  constructor(id: number, name: string, quantity: number, unit: string, category: string) {
    this.ingredient_id = id;
    this.name = name;
    this.quantity = quantity;
    this.unit = unit;
    this.category = category;
  }
}
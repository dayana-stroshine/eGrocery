export class Ingredient {
    public name: string;
    public quantity: number;
    public unit: string;

    constructor(name: string, quantity: number, unit:string) {
        this.name = name;
        this.quantity = quantity;
        this.unit = unit;
    }
}
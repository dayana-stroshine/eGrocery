import { Ingredient } from "./ingredient.model";

export class Recipe {
    public name: string;
    public ingredients: Ingredient[];
    public directions: string;
    public rating: number;

    constructor(name: string, ingredients:Ingredient[], directions: string, rating: number) {
        this.name = name;
        this.ingredients = ingredients;
        this.directions = directions;
        this.rating = rating;
    }
}
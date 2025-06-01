"use strict"

import dayjs from "dayjs"

type Recipe = {
    id: number;
    name: string;
    ingredients: string[];
    instructions: string[];
    prepTimeMinutes: number;
    cookTimeMinutes: number;
    servings: number;
    difficulty: string;
    cuisine: string;
    caloriesPerServing: number;
    tags: string[];
    userId: number;
    image: string;
    rating: number;
    reviewCount: number;
    mealType: string[];
};

type Chef = {
    id: number;
    firstName: string;
    lastName: string;
    maidenName: string;
    age: number;
    gender: string;
    email: string;
    username: string;
    password: string;
    birthDate: string;
    image: string;
    bloodGroup: string;
    height: number;
    weight: number;
    eyeColor: string;
    hair: {
        color: string;
        type: string;
    };
    domain?: string;
    ip: string;
    address: {
        address: string;
        city: string;
        state: string;
        stateCode: string;
        postalCode: string;
        coordinates?: {
            lat: number;
            lng: number;
        };
    };
    macAddress: string;
    university: string;
    bank: {
        cardExpire: string;
        cardNumber: string;
        cardType: string;
        currency: string;
        iban: string;
    };
    company: {
        department: string;
        name: string;
        title: string;
        address: {
            address: string;
            city: string;
            state: string;
            stateCode: string;
            postalCode: string;
            coordinates?: {
                lat: number;
                lng: number;
            };
        };
    };
    ein: string;
    ssn: string;
    userAgent: string;
    role: string;
    phone: string;
    crypto: {
        coin: string;
        wallet: string;
        network: string;
    };
};


function isRecipe(data: unknown): data is Recipe {
    if (
        data && typeof data === "object" &&
        "id" in data && typeof data.id === "number" &&
        "name" in data && typeof data.name === "string" &&
        "ingredients" in data && Array.isArray(data.ingredients) &&
        "instructions" in data && Array.isArray(data.instructions) &&
        "prepTimeMinutes" in data && typeof data.prepTimeMinutes === "number" &&
        "cookTimeMinutes" in data && typeof data.cookTimeMinutes === "number" &&
        "servings" in data && typeof data.servings === "number" &&
        "difficulty" in data && typeof data.difficulty === "string" &&
        "cuisine" in data && typeof data.cuisine === "string" &&
        "caloriesPerServing" in data && typeof data.caloriesPerServing === "number" &&
        "tags" in data && Array.isArray(data.tags) &&
        "userId" in data && typeof data.userId === "number" &&
        "image" in data && typeof data.image === "string" &&
        "rating" in data && typeof data.rating === "number" &&
        "reviewCount" in data && typeof data.reviewCount === "number" &&
        "mealType" in data && Array.isArray(data.mealType)
    ) {
        return true;
    }
    return false;
}

function isChef(data: unknown): data is Chef {
    if (
        data && typeof data === "object" &&
        // id always first
        "id" in data && typeof data.id === "number" &&
        "address" in data && typeof data.address === "object" &&
        "age" in data && typeof data.age === "number" &&
        "bank" in data && typeof data.bank === "object" &&
        "birthDate" in data && typeof data.birthDate === "string" &&
        "bloodGroup" in data && typeof data.bloodGroup === "string" &&
        "company" in data && typeof data.company === "object" &&
        "crypto" in data && typeof data.crypto === "object" &&
        "ein" in data && typeof data.ein === "string" &&
        "email" in data && typeof data.email === "string" &&
        "eyeColor" in data && typeof data.eyeColor === "string" &&
        "firstName" in data && typeof data.firstName === "string" &&
        "gender" in data && typeof data.gender === "string" &&
        "hair" in data && typeof data.hair === "object" &&
        "height" in data && typeof data.height === "number" && "image" in data && typeof data.image === "string" &&
        "ip" in data && typeof data.ip === "string" &&
        "lastName" in data && typeof data.lastName === "string" &&
        "macAddress" in data && typeof data.macAddress === "string" &&
        "maidenName" in data && typeof data.maidenName === "string" &&
        "password" in data && typeof data.password === "string" &&
        "phone" in data && typeof data.phone === "string" &&
        "role" in data && typeof data.role === "string" &&
        "ssn" in data && typeof data.ssn === "string" &&
        "university" in data && typeof data.university === "string" &&
        "userAgent" in data && typeof data.userAgent === "string" &&
        "username" in data && typeof data.username === "string" &&
        "weight" in data && typeof data.weight === "number"
    ) {
        return true;
    }
    return false;
}

async function fetchRecipeData(url: string) {
    try {

    } catch { }
    const response = await fetch(url)
    if (!response.ok) {
        throw new Error("errore HTTP:" + response.status + response.statusText)
    }
    const data: unknown = await response.json()
    if (!isRecipe(data)) {
        throw new Error("formato dei dati non valido")
    }
    console.clear()
    console.log(data)
    return data
}


async function fetchChefData(url: string) {
    try {

    } catch { }
    const response = await fetch(url)
    if (!response.ok) {
        throw new Error("errore HTTP:" + response.status + response.statusText)
    }
    const data: unknown = await response.json()
    if (!isChef(data)) {
        throw new Error("formato dei dati non valido")
    }
    console.clear()
    console.log(data)
    return data
}

async function getChefBirthday(id: number) {

    let recipe
    console.log(recipe)

    try {
        recipe = await fetchRecipeData(`https://dummyjson.com/recipes/${id}`)

    } catch (error) {
        throw new Error(`non posso effettuare la chiamata per la ricetta`)
    }

    if (!recipe) {
        console.error("error:", recipe, `chiamata effettuata ma non esiste una ricetta con id: ${id}`)
    }

    let chef
    console.log(chef)

    try {
        chef = await fetchChefData(`https://dummyjson.com/users/${recipe.userId}`)
    } catch (error) {
        throw new Error(`non posso effettuare la chiamata per l'utente`)
    }

    if (!chef) {
        console.error("error:", recipe, `La chiamata è effettuama ma non trovo nessuno chef poiche non esiste una ricetta con id: ${id}`)
        return { chef: undefined }
    }

    return { chef_birth_date: dayjs(chef.birthDate, "YYYY/MM/DD").format("DD/MM/YYYY") }

}



(async () => {

    try {
        const birthDate = await getChefBirthday(1)
        console.log(birthDate)
    } catch (error) {
        console.error(error)
    } finally {
        console.log("data fetch completed")
    }

})()
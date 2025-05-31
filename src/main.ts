"use strict"

async function fetchData(url) {
    const fetchData = await fetch(url)
    const obj = await fetchData.json()
    console.clear()
    return obj
}

async function getChefBirthday(id) {

    let recipe
    try {
        recipe = await fetchData(`https://dummyjson.com/recipes/${id}`)

    } catch (error) {
        throw new Error(`non posso effettuare la chiamata per la ricetta`)
    }

    if (recipe.message) {
        console.error("error:", recipe.message, `chiamata effettuata ma non esiste una ricetta con id: ${id}`)
    }

    let user
    try {
        user = await fetchData(`https://dummyjson.com/users/${recipe.userId}`)
    } catch (error) {
        throw new Error(`non posso effettuare la chiamata per l'utente`)
    }

    if (user.message) {
        console.error("error:", recipe.error, `La chiamata è effettuama ma non trovo nessun'utente poiche non esiste una ricetta con id: ${id}`)
        return { user: undefined }
    }

    return { chef_birth_date: dayjs(user.birthDate, "YYYY/MM/DD").format("DD/MM/YYYY") }

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
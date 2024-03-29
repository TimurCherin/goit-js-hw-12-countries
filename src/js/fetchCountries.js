const BASE_URL = "https://restcountries.com/v3.1/name"
export default function fetchCountries(searchQuery){
    const data = fetch(`${BASE_URL}/${searchQuery}`)
    return data
}
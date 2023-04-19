const urls = {
  planets: 'https://swapi.dev/api/planets/',
};
export async function getPlanets() {
  const response = await fetch(urls.planets);
  const jsonData = await response.json(); 
  return jsonData.results;
}
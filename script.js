const apiUrl = 'https://api.magicthegathering.io/v1/sets';
const baseCardUrl = 'https://api.magicthegathering.io/v1/cards?set='; // URL de base pour récupérer les cartes par set

async function fetchSets() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        displaySets(data.sets);
    } catch (error) {
        console.error('Erreur lors de la récupération des sets:', error);
    }
}
https://codepen.io/slyka85/pen/EojWbB

https://codepen.io/mardisstudio/pen/ExBqRqE

async function getFirstLandImage(setCode) {
    try {
        const response = await fetch(`${baseCardUrl}${setCode}`);
        const data = await response.json();
        // Trouve le premier terrain
        const land = data[0];
        console.log(land)
        return land ? land.imageUrl : null; // Retourne l'URL de l'image du terrain
    } catch (error) {
        console.error(`Erreur lors de la récupération des cartes pour le set ${setCode}:`, error);
        return null;
    }
}

async function displaySets(sets) {
    const setList = document.getElementById('set-list');
    for (const set of sets) {
        const listItem = document.createElement('li');

        // Récupère l'image du premier terrain
        const landImageUrl = await getFirstLandImage(set.code);
        const img = document.createElement('img');
        img.src = landImageUrl || 'https://via.placeholder.com/50'; // Image par défaut si pas de terrain trouvé
        img.alt = `${set.name} Terrain`;
        img.style.width = '50px'; // Ajuste la taille selon tes préférences
        img.style.height = '50px'; // Ajuste la taille selon tes préférences
        img.style.marginRight = '10px'; // Espace entre l'image et le texte

        // Ajoute l'image et le texte au listItem
        listItem.appendChild(img);
        listItem.appendChild(document.createTextNode(`${set.name} (${set.code})`));

        setList.appendChild(listItem);
    }
}

// Appelle la fonction pour récupérer et afficher les sets
fetchSets();

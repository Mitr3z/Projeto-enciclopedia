// Substitua 'YOUR_API_KEY' pela sua chave de API do Pexels
const API_KEY = 'QO21gaMsramXxsp4ruc2gC7Zd3yMnBL69evuYx6NBCbvkCMi2xWbqweM';
const endpoint = 'https://api.pexels.com/v1/search?per_page=4';

const galleryElement = document.getElementById('gallery');
const searchInput = document.getElementById('searchInput');

// Função para buscar imagens da API do Pexels
async function searchImages() {
    const query = searchInput.value.trim();

    try {
        const response = await fetch(`${endpoint}&query=${query}`, {
            headers: {
                Authorization: API_KEY
            }
        });
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        const photos = data.photos;

        // Limpar a galeria antes de adicionar novas imagens
        galleryElement.innerHTML = '';

        // Exibir as imagens na galeria
        photos.forEach(photo => {
            const imgElement = document.createElement('img');
            imgElement.src = photo.src.large;
            imgElement.alt = photo.url;
            galleryElement.appendChild(imgElement);
        });
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Associar a função searchImages à tecla Enter no campo de entrada
searchInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        searchImages();
    }
});

  import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonImg } from '@ionic/react';
  import { useEffect, useState } from 'react';

  interface Pokemon {
    name: string;
    url: string;
    id: number;
    sprite: string;
    description: string;
  }

  const PokedexPage: React.FC = () => {
    const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);

    useEffect(() => {
      const fetchPokemonData = async () => {
        const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=10');
        const data = await res.json();

        const pokemonDetails = await Promise.all(
          data.results.map(async (poke: { name: string; url: string }, index: number) => {
            const id = index + 1;
            const detailsRes = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
            const detailsData = await detailsRes.json();
            const descriptionEntry = detailsData.flavor_text_entries.find(
              (entry: any) => entry.language.name === 'en'
            );

            return {
              name: poke.name,
              url: poke.url,
              id,
              sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
              description: descriptionEntry ? descriptionEntry.flavor_text.replace(/\f/g, ' ') : 'No description.'
            };
          })
        );

        setPokemonList(pokemonDetails);
      };

      fetchPokemonData();
    }, []);

    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Pokedex</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
          <IonList>
            {pokemonList.map(pokemon => (
              <IonItem key={pokemon.id}>
                <IonImg src={pokemon.sprite} style={{ width: 50, height: 50 }} />
                <IonLabel className="ion-padding">
                  <h2>{pokemon.name.toUpperCase()}</h2>
                  <p>{pokemon.description}</p>
                </IonLabel>
              </IonItem>
            ))}
          </IonList>
        </IonContent>
      </IonPage>
    );
  };


  export default PokedexPage;

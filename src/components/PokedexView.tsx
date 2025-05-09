
import React, { useEffect, useState } from 'react';
import { useIonRouter } from '@ionic/react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonGrid, IonRow, IonCol, IonImg } from '@ionic/react';

interface Pokemon {
  name: string;
  image: string;
  description: string;
}

const PokedexView: React.FC = () => {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useIonRouter();

  useEffect(() => {
    const fetchPokemon = async () => {
      const list: Pokemon[] = [];
      for (let i = 1; i <= 10; i++) {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
        const data = await res.json();
        const speciesRes = await fetch(data.species.url);
        const speciesData = await speciesRes.json();
        const descriptionEntry = speciesData.flavor_text_entries.find((entry: any) => entry.language.name === 'en');

        list.push({
          name: data.name,
          image: data.sprites.front_default,
          description: descriptionEntry ? descriptionEntry.flavor_text : 'No description available.'
        });
      }
      setPokemonList(list);
    };

    fetchPokemon();
  }, []);

  const handleNavigation = (direction: number) => {
    setSelectedIndex((prev) => (prev + direction + pokemonList.length) % pokemonList.length);
  };

  const selected = pokemonList[selectedIndex];

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Pokedex</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        {selected && (
          <>
            <h2>{selected.name.toUpperCase()}</h2>
            <IonImg src={selected.image} alt={selected.name} />
            <p>{selected.description}</p>
          </>
        )}
        <IonGrid>
          <IonRow>
            <IonCol><IonButton onClick={() => handleNavigation(-1)}>⬅️</IonButton></IonCol>
            <IonCol><IonButton onClick={() => handleNavigation(1)}>➡️</IonButton></IonCol>
          </IonRow>
        </IonGrid>
      
        <div style={{
          position: 'absolute',
          bottom: '20px',
          left: 'calc(50% - 25px)',
          width: '50px',
          height: '50px',
          borderRadius: '25px',
          backgroundColor: 'red',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          boxShadow: '0 0 5px rgba(0,0,0,0.5)',
          zIndex: 1000
        }} onClick={() => router.push('/home')}>
          🔴
        </div>
    </IonContent>
    </IonPage>
  );
};

export default PokedexView;

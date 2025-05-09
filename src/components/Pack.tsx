
import React, { useEffect, useState } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent } from '@ionic/react';

interface Item {
  name: string;
  effect: string;
}

const Pack: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    const fetchItems = async () => {
      const res = await fetch('https://pokeapi.co/api/v2/item?limit=10');
      const data = await res.json();
      const results = data.results;

      const itemDetails = await Promise.all(results.map(async (item: any) => {
        const itemRes = await fetch(item.url);
        const itemData = await itemRes.json();
        const effectEntry = itemData.effect_entries.find((entry: any) => entry.language.name === 'en');

        return {
          name: itemData.name,
          effect: effectEntry ? effectEntry.effect : 'No effect description.'
        };
      }));

      setItems(itemDetails);
    };

    fetchItems();
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Item Pack</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        {items.map((item, index) => (
          <IonCard key={index}>
            <IonCardHeader>
              <IonCardTitle>{item.name}</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>{item.effect}</IonCardContent>
          </IonCard>
        ))}
      </IonContent>
    </IonPage>
  );
};

export default Pack;

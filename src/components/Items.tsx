import React, { useEffect, useState } from 'react';
import {
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardContent,
  IonSpinner,
} from '@ionic/react';

interface Item {
  name: string;
  image: string;
}

const Items: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/item?limit=20');
        const data = await response.json();

        const itemsData = data.results.map((item: { name: string }) => ({
          name: item.name,
          image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/${item.name}.png`,
        }));

        setItems(itemsData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching items:', error);
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  if (loading) {
    return <IonSpinner name="crescent" />;
  }

  return (
    <IonGrid>
      <IonRow>
        {items.map((item) => (
          <IonCol size="6" key={item.name}>
            <IonCard>
              <IonCardContent className="ion-text-center">
                <img src={item.image} alt={item.name} />
                <p>{item.name}</p>
              </IonCardContent>
            </IonCard>
          </IonCol>
        ))}
      </IonRow>
    </IonGrid>
  );
};

export default Items;

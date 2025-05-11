import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonImg, IonSpinner } from '@ionic/react';
import { useEffect, useState } from 'react';

interface GameItem {
  name: string;
  id: number;
  sprite: string;
}

const PackPage: React.FC = () => {
  const [items, setItems] = useState<GameItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      const res = await fetch('https://pokeapi.co/api/v2/item?limit=10');
      const data = await res.json();

      const itemDetails = await Promise.all(
        data.results.map(async (item: { name: string; url: string }) => {
          const itemRes = await fetch(item.url);
          const itemData = await itemRes.json();

          return {
            name: item.name,
            id: itemData.id,
            sprite: itemData.sprites?.default || ''
          };
        })
      );

      setItems(itemDetails);
      setLoading(false);
    };

    fetchItems();
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Objetos del Juego</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {loading ? (
          <div className="ion-padding">
            <IonSpinner name="dots" />
            <p>Cargando objetos...</p>
          </div>
        ) : (
          <IonList>
            {items.map(item => (
              <IonItem key={item.id}>
                {item.sprite && <IonImg src={item.sprite} style={{ width: 50, height: 50 }} />}
                <IonLabel className="ion-padding">
                  <h2>{item.name.toUpperCase()}</h2>
                </IonLabel>
              </IonItem>
            ))}
          </IonList>
        )}
      </IonContent>
    </IonPage>
  );
};

export default PackPage;

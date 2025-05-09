
import React from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/react';

const Exit: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Exit</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <h2>Gracias por usar la Pokédex</h2>
        <p>¡Hasta pronto, entrenador Pokémon!</p>
      </IonContent>
    </IonPage>
  );
};

export default Exit;

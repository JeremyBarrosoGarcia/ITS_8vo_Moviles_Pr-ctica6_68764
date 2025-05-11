import { useContext } from 'react';
import { EPokedexScreen, MenuPokedexContext } from '../../contexts/MenuPokedexContext';
import { usePokemonGridNavigation } from '../../contexts/PokemonGridNavigationContext';

export const Cross = () => {
  const { screen, menuOption, setMenuOption } = useContext(MenuPokedexContext);
  const { moveUp, moveDown, moveLeft, moveRight } = usePokemonGridNavigation();

  return (
    <div id="cross">
      <div
        id="leftcross"
        className="gameboy-button"
        onClick={() => {
          if (screen === EPokedexScreen.MENU) {
            const newOption = menuOption - 1 < 1 ? 3 : menuOption - 1;
            setMenuOption(newOption);
          } else {
            console.log('LEFT');
            moveLeft();
          }
        }}
        onTouchStart={() => {
          if (screen !== EPokedexScreen.MENU) moveLeft();
        }}
      >
        <div id="leftT"></div>
      </div>

      <div
        id="topcross"
        className="gameboy-button"
        onClick={() => {
          if (screen === EPokedexScreen.MENU) {
            const newOption = menuOption - 1 < 1 ? 3 : menuOption - 1;
            setMenuOption(newOption);
          } else {
            console.log('UP');
            moveUp();
          }
        }}
        onTouchStart={() => {
          if (screen !== EPokedexScreen.MENU) moveUp();
        }}
      >
        <div id="upT"></div>
      </div>

      <div
        id="rightcross"
        className="gameboy-button"
        onClick={() => {
          if (screen === EPokedexScreen.MENU) {
            const newOption = menuOption + 1 > 3 ? 1 : menuOption + 1;
            setMenuOption(newOption);
          } else {
            console.log('RIGHT');
            moveRight();
          }
        }}
        onTouchStart={() => {
          if (screen !== EPokedexScreen.MENU) moveRight();
        }}
      >
        <div id="rightT"></div>
      </div>

      <div id="midcross" className="gameboy-button">
        <div id="midCircle"></div>
      </div>

      <div
        id="botcross"
        className="gameboy-button"
        onClick={() => {
          if (screen === EPokedexScreen.MENU) {
            const newOption = menuOption + 1 > 3 ? 1 : menuOption + 1;
            setMenuOption(newOption);
          } else {
            console.log('DOWN');
            moveDown();
          }
        }}
        onTouchStart={() => {
          if (screen !== EPokedexScreen.MENU) moveDown();
        }}
      >
        <div id="downT"></div>
      </div>
    </div>
  );
};

import { fireEvent, render, screen } from "@testing-library/react";
import { SimpleText } from "../../src/js/components/simple-text";

describe('SimpleText pruebas locas', () => {

    const clase='fxElement'
    const titulo='Acerca de Nosotros' 
    const texto='Somos algo más que sólo un estudio de grabación en Costa Rica, no nos limitamos a hacer únicamente nuestro trabajo, queremos que en cada proyecto, cada canción lleve nuestro ADN, damos siempre lo mejor de nosotros y definitivamente hacer esto, es nuestra misión de vida.' 

test('crear snapshot', () => {


    const { container } = render( <SimpleText titulo={titulo} fxElement={clase} texto={texto} /> );
    expect( container ).toMatchSnapshot();

});
    
});
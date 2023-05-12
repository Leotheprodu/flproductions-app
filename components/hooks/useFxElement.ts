import { useEffect } from 'react';
/**
 *Hook para aplicar FX a un elemento
 * @param ref se usa el hook useRef, en el componente donde se va a utilzar, y se pasa la ref aca del elemento donde se va a usar
 * @param cssEffect se refiere al efecto definido en css, para aplicarlo en el elemento de la referencia
 */
export const useFxElement = (ref, cssEffect: string = null) => {
    useEffect(() => {
        const ElementWithFX = ref.current;
        ElementWithFX.classList.add('fxElement');
        function mostrarScroll() {
            const scrollTop = document.documentElement.scrollTop;
            const alturaElemento = ElementWithFX.offsetTop;

            if (alturaElemento - 200 < scrollTop) {
                ElementWithFX.style.opacity = '1';
                cssEffect && ElementWithFX.classList.add(cssEffect);
            }
        }
        if (ElementWithFX !== null) {
            document.addEventListener('scroll', mostrarScroll);
        }

        return () => {
            document.removeEventListener('scroll', mostrarScroll);
        };
    }, []);
};

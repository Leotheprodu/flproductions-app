import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    fetchAPI,
    setSessionUserMessage,
    setSessionRoles,
    RootState,
} from '../';
import { Button } from '@nextui-org/react';

export const TypeofUser = (): JSX.Element | null => {
    const dispatch = useDispatch();
    const userInfo = useSelector((state: RootState) => state.user.session.user);
    const userRoles: [number] = useSelector(
        (state: RootState) => state.user.session.roles || []
    );
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [spinner, setSpinner] = useState<boolean>(false);
    const [statusenviado, setStatusEnviado] = useState(false);
    const ApiUrl =
        process.env.NODE_ENV === 'production'
            ? process.env.NEXT_PUBLIC_PROD_TYPEOFUSER
            : process.env.NEXT_PUBLIC_DEV_TYPEOFUSER;
    useEffect(() => {
        if (userRoles) {
            setSelectedOptions(userRoles);
        }
    }, [userRoles]);

    const handleOptionChange = (event) => {
        setStatusEnviado(false);
        const value: number = parseInt(event.target.value);
        if (selectedOptions.includes(value)) {
            setSelectedOptions(
                selectedOptions.filter((option) => option !== value)
            );
        } else {
            setSelectedOptions([...selectedOptions, value]);
        }
    };
    const handleSubmit = async (event) => {
        setSpinner(true);
        event.preventDefault();
        const idRoles = { id: userInfo.id, roles: selectedOptions };
        await enviarBD(idRoles);
    };
    const enviarBD = async (idRoles) => {
        const { data, error } = await fetchAPI({
            url: ApiUrl,
            method: 'POST',
            body: idRoles,
        });
        if (data) {
            dispatch(setSessionRoles(data.roles));
            setSpinner(false);
            setStatusEnviado(true);
            dispatch(setSessionRoles(data.roles));
            dispatch(
                setSessionUserMessage({
                    message: `Roles Actualizados`,
                    messageType: 'warning',
                })
            );
            setSessionRoles;
        } else {
            dispatch(
                setSessionUserMessage({
                    message: error,
                    messageType: 'error',
                })
            );
        }
    };
    if (userRoles.includes(1)) {
        return (
            <>
                <div className="container md:w-[20rem] my-[6rem] flex flex-col rounded-xl border-1 border-gris p-4 shadow-md">
                    <div>
                        <h3 className="mb-20 text-center text-cuaternario text-3xl">
                            Tipo de usuario
                        </h3>
                    </div>
                    <form
                        className="flex flex-col gap-4"
                        onSubmit={handleSubmit}
                    >
                        <div className="">
                            <input
                                type="checkbox"
                                className="TypeOfUser__input"
                                id="option2"
                                name="option2"
                                value="2"
                                checked={selectedOptions.includes(2)}
                                readOnly
                            />
                            <label htmlFor="option2">Oyente</label>
                        </div>
                        <div>
                            <input
                                type="checkbox"
                                className="TypeOfUser__input"
                                id="option3"
                                name="option3"
                                value="3"
                                onChange={handleOptionChange}
                                checked={selectedOptions.includes(3)}
                            />
                            <label htmlFor="option3">Artista</label>
                        </div>
                        {/* <div>
                            <input
                                type="checkbox"
                                className="TypeOfUser__input"
                                id="option4"
                                name="option4"
                                value="4"
                                onChange={handleOptionChange}
                                checked={selectedOptions.includes(4)}
                            />
                            <label htmlFor="option4">Productor Musical</label>
                        </div> */}

                        <div className=" flex justify-center items-center mt-6">
                            <Button
                                isLoading={spinner}
                                type="submit"
                                color="primary"
                                className="text-2xl uppercase"
                                isDisabled={statusenviado}
                            >
                                Aceptar
                            </Button>
                        </div>
                    </form>
                </div>
            </>
        );
    }
};

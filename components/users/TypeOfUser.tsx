import React, { useState, useEffect } from 'react';
import { IconBan, IconCircleCheck } from '@tabler/icons-react';
import { useSelector, useDispatch } from 'react-redux';
import { setSession } from '../redux/userActions';
import { RootState } from '../redux/store';

export const TypeofUser = () => {
    const dispatch = useDispatch();
    const userInfo = useSelector((state: RootState) => state.user.session.user);
    const userRoles: [number] = useSelector(
        (state: RootState) => state.user.session.roles
    );
    const [selectedOptions, setSelectedOptions] = useState([]);
    useEffect(() => {
        if (userRoles.includes(2) && !selectedOptions.includes(2)) {
            setSelectedOptions([...selectedOptions, 2]);
        }
        if (userRoles.includes(3) && !selectedOptions.includes(3)) {
            setSelectedOptions([...selectedOptions, 3]);
        }
        if (userRoles.includes(4) && !selectedOptions.includes(4)) {
            setSelectedOptions([...selectedOptions, 4]);
        }
    }, [userRoles]);

    const handleOptionChange = (event) => {
        const value: number = parseInt(event.target.value);
        if (selectedOptions.includes(value)) {
            setSelectedOptions(
                selectedOptions.filter((option) => option !== value)
            );
        } else {
            setSelectedOptions([...selectedOptions, value]);
        }
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(selectedOptions);
    };
    const enviarBD = () => {
        fetch(
            `${
                process.env.NODE_ENV === 'production'
                    ? process.env.NEXT_PUBLIC_PROD_USER_ID
                    : process.env.NEXT_PUBLIC_DEV_USER_ID
            }${userInfo.id}`,
            {
                credentials: 'include',
            }
        )
            .then((res) => res.json())
            .then((data) => {
                if (data.isLoggedIn) {
                    dispatch(setSession(data));
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };
    if (userRoles.includes(1)) {
        return (
            <>
                <div className="TypeOfUser__container">
                    <form onSubmit={handleSubmit}>
                        <div>
                            <input
                                type="checkbox"
                                id="option1"
                                name="option"
                                value="2"
                                checked={selectedOptions.includes(2)}
                                readOnly
                            />
                            <label htmlFor="option1">Oyente</label>
                        </div>
                        <div>
                            <input
                                type="checkbox"
                                id="option2"
                                name="option"
                                value="3"
                                onChange={handleOptionChange}
                                checked={selectedOptions.includes(3)}
                            />
                            <label htmlFor="option2">Cantante</label>
                        </div>
                        <div>
                            <input
                                type="checkbox"
                                id="option3"
                                name="option"
                                value="4"
                                onChange={handleOptionChange}
                                checked={selectedOptions.includes(4)}
                            />
                            <label htmlFor="option3">Productor</label>
                        </div>
                        <button type="submit">Enviar</button>
                    </form>
                </div>
            </>
        );
    }
};

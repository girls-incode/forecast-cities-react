import {
    EuiComboBox
} from '@elastic/eui';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import { getCities, updateSelectedCity } from './../store/actions';
import { parseHtmlEntities } from './../utils/general';

function Search() {
    const [options, setOptions] = useState([]);
    const cities = useSelector((state: any) => state.appReducer.cities);
    const selectedOption = useSelector((state: any) => state.appReducer.selectedCity);
    const dispatch = useDispatch();
    const history = useHistory();

    const onChange = (option: any[]) => {
        if (option.length > 0) {
            dispatch(updateSelectedCity(option));
        }
    };

    useEffect(() => {
        if (selectedOption.length > 0) {
            history.push(`/provincias/${selectedOption[0].codprov}/municipios/${selectedOption[0].codigoine}`)
        }

    }, [selectedOption]);

    useEffect(() => {
        dispatch(getCities());
    }, []);

    useEffect(() => {
        if (cities.length) {
            let maping = cities.map((city: any) => ({
                codigoine: city.CODIGOINE.substr(0, 5),
                codprov: city.CODPROV,
                nombre: city.NOMBRE,
                nombre_provincia: city.NOMBRE_PROVINCIA,
                label: parseHtmlEntities(city.NOMBRE)
            }));
            setOptions(maping);
        }
    }, [cities]);

    return (
        <>
            {options.length > 0 && (
                <EuiComboBox
                    className='search'
                    fullWidth={true}
                    placeholder='Choose a city'
                    singleSelection={{ asPlainText: true }}
                    options={options}
                    selectedOptions={selectedOption}
                    onChange={onChange}
                />
            )}
        </>
    )
}

export default Search;

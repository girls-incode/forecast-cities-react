import {
    EuiFlexGroup,
    EuiFlexItem,
    EuiIcon,
    EuiLoadingChart,
    EuiSpacer
} from '@elastic/eui';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { types } from '../store/types';
import { parseHtmlEntities } from './../utils/general';
import './City.scss';

function City() {
    const { codprov, codigoine } = useParams() as any;
    let { loading, item, error } = useSelector((state: any) => state.apiReducer);
    const { favorites } = useSelector((state: any) => state.appReducer);
    let isFavorite = favorites.some((fav: any) => fav.codprov === codprov && fav.codigoine === codigoine);
    const url = process.env.REACT_APP_REGIONES + '/' + codprov + '/municipios/' + codigoine;
    const dateOptions = { weekday: 'long', month: 'short', day: 'numeric' };
    const dispatch = useDispatch();
    const { municipio } = item;

    useEffect(() => {
        dispatch({ type: types.FETCH_INIT_SAGA, url });
    }, [url]);

    if (error) return <h1>Error</h1>;

    return (
        <section>
            {loading && <EuiLoadingChart size="xl" mono className='loader' />}
            {!loading && Object.keys(item).length > 0 && (
                <>
                    <nav className='breadcrumb'>
                        <EuiIcon type='home' />
                        {item.breadcrumb.map((br: any, i: number) => {
                            let final = i !== item.breadcrumb.length - 1;
                            if (final) {
                                return <Link to={br.url} key={i}>
                                    {parseHtmlEntities(br.name)}
                                </Link>
                            } else {
                                return parseHtmlEntities(br.name)
                            }
                        })}
                    </nav>
                    <article className='city'>
                        <h1 className='city-title'>{parseHtmlEntities(municipio.NOMBRE)}</h1>
                        <EuiSpacer size='l' />
                        <div className='date'>
                            {new Date(item.fecha).toLocaleDateString('es-ES', dateOptions).replace('.', '')}
                        </div>
                        <EuiSpacer size='l' />
                        <div>{item.stateSky.description}</div>
                        <EuiSpacer size='l' />
                        <div>
                            <EuiIcon type='sortUp' size='l' />{item.temperaturas.max} <sup className='temp'>&#8451;</sup>
                            <EuiIcon type='sortDown' size='l' />{item.temperaturas.min} <sup className='temp'>&#8451;</sup>
                        </div>
                        <EuiSpacer size='l' />
                        <EuiFlexGroup>
                            <EuiFlexItem>
                                <div data-icon={item.stateSky.id} className='icon'>
                                    {item.temperatura_actual} <sup className='temp'>&#8451;</sup>
                                </div>
                            </EuiFlexItem>
                            <EuiFlexItem>
                                <p>
                                    Humedad: {item.humedad} %
                                </p>
                                <p>
                                    Viento: {item.viento} %
                                </p>
                                <p>
                                    Lluvia: {item.lluvia} %
                                </p>
                            </EuiFlexItem>
                        </EuiFlexGroup>
                        <div>
                            {!isFavorite && (
                                <EuiIcon
                                    type='heart'
                                    className='favorite'
                                    size='xl'
                                    onClick={() => dispatch({
                                        type: types.ADD_TO_FAVORITES,
                                        payload: {
                                            codprov,
                                            codigoine,
                                            nombre: parseHtmlEntities(municipio.NOMBRE),
                                            nombre_provincia: parseHtmlEntities(municipio.NOMBRE_PROVINCIA)
                                        }
                                    })} />
                            )}

                            {isFavorite && (
                                <EuiIcon
                                    type='trash'
                                    className='favorite'
                                    size='xl'
                                    onClick={() => dispatch({
                                        type: types.REMOVE_FROM_FAVORITES,
                                        payload: {
                                            codprov,
                                            codigoine,
                                        }
                                    })} />
                            )}
                        </div>
                    </article>
                </>
            )}
        </section>
    )
}

export default City

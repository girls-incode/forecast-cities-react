import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { types } from '../store/types';
import {
    EuiDragDropContext,
    euiDragDropReorder,
    EuiDraggable,
    EuiDroppable,
    EuiIcon,
    EuiLoadingChart,
    EuiPanel,
} from '@elastic/eui';
import './Favorites.scss';

function Favorites() {
    const { list, loading, error } = useSelector((state: any) => state.apiReducer);
    const { favorites } = useSelector((state: any) => state.appReducer);
    const [favList, setFavList] = useState(list);
    const dispatch = useDispatch();

    useEffect(() => {
        if (favorites.length) {
            const urls = favorites.map(({ codprov, codigoine }: any) => {
                return process.env.REACT_APP_REGIONES + '/' + codprov + '/municipios/' + codigoine;
            });
            dispatch({ type: types.GET_CITIES_WEATHER_SAGA, urls });
        }
    }, []);

    useEffect(() => {
        if (!loading && list.length > 0) {
            setFavList(list);
        }
    }, [list]);

    function getNewList(arr: any[], obj: any): any[] {
        return arr.filter((item: any) => {
            let { municipio } = item;
            let codigoine = municipio.CODIGOINE.substr(0, 5);
            return (municipio.CODPROV === obj.codprov && codigoine !== obj.codigoine) ||
                (municipio.CODPROV !== obj.codprov && codigoine !== obj.codigoine)
        })
    };

    function onDragEnd({ source, destination }: any): void {
        if (source && destination) {
            const items = euiDragDropReorder(favList, source.index, destination.index);
            const newFav = items.map((item: any) => {
                let { municipio } = item;
                return {
                    codprov: municipio.CODPROV,
                    codigoine: municipio.CODIGOINE.substr(0, 5),
                    nombre: municipio.NOMBRE,
                    nombre_provincia: municipio.NOMBRE_PROVINCIA
                }
            });
            dispatch({ type: types.UPDATE_FAVORITES, payload: newFav });
            setFavList(items);
        }
    };

    return (
        <section>
            {loading && <EuiLoadingChart size="xl" mono className='loader' />}
            {!loading && favList.length > 0 && (
                <EuiDragDropContext onDragEnd={onDragEnd}>
                    <EuiDroppable
                        droppableId="FAV_AREA"
                        spacing="m"
                        withPanel>
                        {favList.map((fav: any, i: number) => {
                            let { municipio } = fav;
                            let { NOMBRE, CODPROV, CODIGOINE } = municipio

                            return (
                                <EuiDraggable
                                    className='favorite-block'
                                    spacing="m"
                                    key={i}
                                    index={i}
                                    draggableId={i.toString()}
                                    customDragHandle={true}>
                                    {(provided) => (
                                        <EuiPanel
                                            paddingSize="m"
                                            hasShadow={false}
                                        >
                                            <div className='favorite-stats'>
                                                <div {...provided.dragHandleProps}>
                                                    <EuiIcon type="grab" />
                                                </div>
                                                <div data-icon={fav.stateSky.id} className='icon'></div>
                                                <div className='favorite-name'>{NOMBRE}</div>
                                                <div className='d-flex justify-between'>
                                                    <div className='favorite-temp text-left'>
                                                        {fav.temperatura_actual} <sup className='temp'>&#8451;</sup>
                                                    </div>
                                                    <div className='favorite-rain text-right'>
                                                        {fav.lluvia} <small>%</small> <span>☂️</span>
                                                    </div>
                                                </div>
                                                <div className='text-right'>
                                                    <EuiIcon
                                                        type="trash"
                                                        className='favorite'
                                                        size="m"
                                                        onClick={() => {
                                                            const payload = {
                                                                codprov: CODPROV,
                                                                codigoine: CODIGOINE.substr(0, 5)
                                                            };
                                                            dispatch({
                                                                type: types.REMOVE_FROM_FAVORITES,
                                                                payload
                                                            });
                                                            let newList = getNewList(favList, payload);
                                                            console.log('newList', newList);

                                                            setFavList(newList);
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        </EuiPanel>
                                    )}
                                </EuiDraggable>
                            )
                        })}
                    </EuiDroppable>
                </EuiDragDropContext>
            )}
        </section>
    )
}

export default Favorites;

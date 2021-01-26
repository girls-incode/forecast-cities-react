import {
    EuiLoadingChart,
    EuiSpacer,
    EuiTabbedContent,
    EuiText
} from '@elastic/eui';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { types } from '../store/types';
import Favorites from './Favorites';
import './Home.scss';

function Home() {
    const { favorites } = useSelector((state: any) => state.appReducer);
    const { loading, data, error } = useSelector((state: any) => state.homeReducer);
    const dispatch = useDispatch();
    const [tabs, setTabs] = useState([] as any);
    const [selectedTab, setSelectedTab] = useState({} as any);
    const hasFav = favorites.length > 0;
    const url = process.env.REACT_APP_HOME;

    useEffect(() => {
        console.log(hasFav);
        dispatch({ type: types.HOME_INIT_SAGA, url });
    }, []);

    const onTabClick = (selectedTab) => {
        setSelectedTab(selectedTab);
    };

    const buildTabs = (names: any[]) => {
        let tabs: any[] = [];
        names.forEach((tab: any) => {
            tabs.push({
                id: tab,
                name: tab,
                content: (
                    <>
                        <EuiSpacer />
                        <EuiText>
                            {data[tab].p.map((text: string, i: number) => <p key={i}>{text}</p>)}
                        </EuiText>
                    </>
                ),
            })
        });
        return tabs;
    }

    useEffect(() => {
        if (Object.keys(data).length > 0) {
            let tabs = buildTabs(['today', 'tomorrow']);
            setSelectedTab(tabs[0]);
            setTabs(tabs);
        }
    }, [data]);

    return (
        <>
            {hasFav && <Favorites />}
            <section>
                {loading && <EuiLoadingChart size="xl" mono className='loader' />}
                {!loading && tabs.length > 0 && (
                    <>
                        <EuiSpacer size='xl' />
                        <h2>Prevision Espana</h2>
                        <EuiSpacer size='s' />
                        <EuiTabbedContent
                            tabs={tabs}
                            selectedTab={selectedTab}
                            onTabClick={onTabClick}
                        />
                    </>
                )}
            </section>
        </>
    )
}

export default Home

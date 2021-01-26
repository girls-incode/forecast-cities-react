import React from 'react';
import {
    EuiFlexGrid,
    EuiFlexItem,
    EuiIcon
} from '@elastic/eui';
import Search from '../components/Search';
import './Header.scss';

function Header() {
    return (
        <EuiFlexGrid className='header'>
            <EuiFlexItem>
                <a href='/'>
                    <EuiIcon type="logoElastic" size="xl" className='logo' />Meteo Espana
                </a>
            </EuiFlexItem>

            <EuiFlexItem>
                <Search />
            </EuiFlexItem>
        </EuiFlexGrid>
    )
}

export default Header



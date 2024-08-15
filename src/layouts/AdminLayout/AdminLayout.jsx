// En AdminLayout.js
import React, { useState } from 'react';
import { LoginAdmin } from '../../pages/Admin';
import './AdminLayout.scss';
import { TopMenu, SideMenu } from '../../components/Admin';
import { useAuth } from '../../hooks';

export const AdminLayout = (props) => {
    const { children, requiresAuth } = props;
    const { auth } = useAuth();
    //estado para el menu lateral desplegable
    const [isSideMenuOpen, setIsSideMenuOpen] = useState(true);
    //funcion para abrir y cerrar el menu
    const toggleMenu = () => {
        setIsSideMenuOpen(!isSideMenuOpen);
    };
    //si el token no existe o es null se le redirige al login
    if (requiresAuth && !auth) {
        return <LoginAdmin />;
    }

    return (
        <>
            <div className={`admin-layout ${isSideMenuOpen ? 'menu-open' : ''}`}>
                <div className='admin-layout__menu'>
                    <TopMenu toggleMenu={toggleMenu} isOpen={isSideMenuOpen} />
                </div>
                <div className='admin-layout__main-content'>
                    <SideMenu isOpen={isSideMenuOpen}>
                        {children}
                    </SideMenu>
                </div>
            </div>
        </>
    );
};
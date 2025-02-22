'use client';

import { NavbarBrand } from "./brand";
import { NavBarList } from "./list";

export function NavigationBar() {
    return(
        <nav className='absolute inset-x-0 top-0 z-10'>
            <div className='flex items-center justify-between px-8 py-4 text-background'>
                <NavbarBrand/>
                <NavBarList/>
            </div>
        </nav>
    );
}
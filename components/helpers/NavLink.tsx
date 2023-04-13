import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface Props {
    href: string
    className?:string
    children: React.ReactNode
    tabIndex?: number
}

function NavLink({ href, className, tabIndex, children }: Props) {

    const router = useRouter();
    const isActive = router.pathname === href;

    return (
        <Link href={href} className={`${className} ${isActive ? 'active' : ''}`} tabIndex={tabIndex}>{children}</Link>
    );
}

export default NavLink;
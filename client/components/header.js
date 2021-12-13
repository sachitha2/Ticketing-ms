import React from 'react'
import Link from 'next/link'
function header({currentUser}) {
    const links = [
        !currentUser && { href: '/auth/signup', label: 'Sign Up' },
        !currentUser && { href: '/auth/signin', label: 'Sign In' },
        currentUser && { href: '/auth/signout', label: 'Sign out' },
    ].filter(linkConfig => linkConfig)
    .map(({href, label}) => {
        return <li key={href} className="nav-item">
            <Link href={href}>
                <a href={href} className="nav-link">{label}</a>
            </Link>
        </li>
    })
    return (
        <nav className="navbar navbar-light bg-light">
            <Link href="/">
                <a className="navbar-brand">
                    ihub 
                </a>

            </Link>

            <div className="d-flex justify-content-end">
                <ul className="nav d-flex align-items-center">
                    {links}
                </ul>

            </div>
        </nav>
    )
}

export default header

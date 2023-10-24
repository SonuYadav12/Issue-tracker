"use client"
import classNames from 'classnames'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { AiFillBug } from "react-icons/ai"
import classnames from "classnames"

const NavBar = () => {
    const currentPath = usePathname();
    console.log(currentPath)
    const links = [
        { id: 1, label: "Dashboard", href: "/" },
        { id: 2, label: "Issues", href: "/issues" }
    ]
    return (
        <nav className='flex space-x-6 border-b mb-5 px-5 h-14 items-center text-black'>
            <Link href="/"><AiFillBug /></Link>
            <ul className='flex space-x-6'>
                {links.map(link =>
                    <Link
                        key={link.id}
                        // className={`${link.href === currentPath ? "text-zinc-900" : "text-zinc-500"}  hover:text-zinc-800 transition-colors`}
                        className={classnames({
                            "text-zinc900": link.href === currentPath,
                            "text-zinc-500": link.href !== currentPath,
                            "hover:text-zinc-800 transition-colors": true
                        })}
                        href={link.href}
                    >{link.label}</Link>
                )}
            </ul>
        </nav>
    )
}

export default NavBar

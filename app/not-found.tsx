import { Button } from '@radix-ui/themes'
import Link from 'next/link'
import React from 'react'

export default function NotFound() {
    return (
        <div className='w-full flex flex-col justify-center items-center'>
            <h1>404 ERROR</h1>
            <p>Looks Like You have lost your Path</p>
            <Link href={"/"}><Button>Return to Home Page</Button></Link>

        </div>
    )
}

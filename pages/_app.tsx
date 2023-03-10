import '../styles/globals.css'
import type {AppProps} from 'next/app'
import {ReactNode} from "react"

const EmptyContainer = ({children}: { children: ReactNode }) => <>{children}</>;

export default function App({Component, pageProps}: AppProps) {

    // @ts-ignore: Unreachable code error
    const ContextProviderIfExists = Component.provider || EmptyContainer;

    return (
        <ContextProviderIfExists>
            <Component {...pageProps} />
        </ContextProviderIfExists>
    )
}

import Head from 'next/head'
import {Inter} from '@next/font/google'
import Link from "next/link";

const inter = Inter({subsets: ['latin']})

export default function Home() {
    return (
        <>
            <Head>
                <title>DEVLAB TIBZER</title>
                <meta name="description" content="Personal dev lab to build coding experiments"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <main className="max-w-4xl sm:mx-auto px-6">
                <header className="pt-60">
                    <h1 className="text-4xl font-bold">DEVLAB TIBZER</h1>
                    <p className="mt-2 text-slate-600">Personal dev lab to build coding experiments.</p>
                </header>
                <section className="flex flex-col gap-4 my-12">
                    <Link href="/exps/theud">
                        <article className="flex flex-col p-8 bg-gray-100 rounded-2xl -mx-8 h-64 hover:scale-[1.01] transition-all">
                            <header className="flex justify-between items-center mb-4">
                                <h2 className="text-3xl">Theud Portfolio</h2>
                                <span className="text-sm text-slate-500 italic">DEC 22</span>
                            </header>
                            <div>
                                <p className="text-slate-600">Reproduce some interested features of THEUD filmaker portfolio.</p>
                            </div>
                            <footer className="mt-auto">
                                <span className="text-sm italic rounded-full bg-gray-200 px-2 py-1 text-slate-500">to reproduce</span>
                            </footer>
                        </article>
                    </Link>
                </section>
            </main>
        </>
    )
}

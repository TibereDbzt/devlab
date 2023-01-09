import Error from 'next/error';
import {NextPageContext} from "next";


function Page({ statusCode }: { statusCode: number }) {
    return <Error statusCode={statusCode}></Error>;
}

Page.getInitialProps = ({ res, err }: NextPageContext) => {
    const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
    return { statusCode };
};

export default Page;

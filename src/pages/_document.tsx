/* eslint-disable @next/next/no-title-in-document-head */
import Document, { Head, Html, Main, NextScript } from "next/document";

export default class MyDocument extends Document{
    render(): JSX.Element {
        return(
            <Html>
                <Head>
                    <title>UM - Users Management</title>
                </Head>
                <body>
                    <Main/>
                    <NextScript/>
                </body>
            </Html>

        )
    }
}
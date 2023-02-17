import Head from 'next/head';
import { Helmet } from "react-helmet";

const Metadata = ({ title, description, image, url, themeColor }) => {
    return (
        <Helmet>
            <meta charset="UTF-8" />
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1" />
            <meta name="format-detection" content="telephone=no" />

            <title>{title}</title>

            <meta name="title" content={title} />
            <meta name="description" content={description} />

            <meta name="author" content="SalamKami | EL Creative Developer" />
            <meta name="copyright" content="SalamKami | EL Creative Developer" />
            <meta name="distribution" content="Global" />
            <meta name="target" content="all" />
            <meta name="rating" content="general" />
            <meta name="theme-color" content={themeColor} />

            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:site_name" content={title} />
            <meta property="og:url" content="/" />
            <meta property="og:locale" content="id" />
            <meta property="og:type" content="website" />
            <meta property="og:image" content="" />

            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:url" content="/" />
            <meta name="twitter:image" content="" />
            <meta name="twitter:card" content="summary_large_image" />

            <link href="./favicon.ico" rel="icon" type="image/x-icon" />
            <link href="./favicon.ico" rel="shortcut" type="image/icon" />
            <link href="./favicon.ico" rel="apple-touch-startup-image" />
            <link href="./favicon.ico" rel="apple-touch-icon" />
        </Helmet>
    );
}

export default Metadata;
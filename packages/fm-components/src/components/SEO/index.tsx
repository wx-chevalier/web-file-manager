import React, { Component } from 'react';
import Helmet from 'react-helmet';

interface IProps {
  url: string;
  title: string;
  image: string;
  description: string;
}

export class SEO extends Component<IProps> {
  render() {
    const { url, title, image, description } = this.props;
    return (
      <Helmet>
        {/* General tags */}
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="image" content={image} />

        {/* OpenGraph tags */}
        <meta property="og:url" content={url} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image} />

        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={url} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={image} />
      </Helmet>
    );
  }
}

const siteMetadata = {
  title: `Blog | pewriebontal`,
  name: `pewriebontal`,
  siteUrl: `https://blog.pewriebontal.ml`,
  description: `pewriebontal's personal blog.`,
  twitterUsername: '@pewriebontal',
  keywords: ' Blog, pewrie bontal, Min Thu Khine, pewriebontal.',
  hero: {
    heading: `Welcome to Blog, pewriebontal's personal space.`,
    maxWidth: 652,
  },
  social: [
    {
      name: `homepage`,
      url: `https://pewriebontal.ml`,
    },
    {
      name: `twitter`,
      url: `https://twitter.com/pewriebontal`,
    },
    {
      name: `github`,
      url: `https://github.com/pewriebontal`,
    },
    {
      name: `instagram`,
      url: `https://instagram.com/pewriebontal`,
    },
    {
      name: `linkedin`,
      url: `https://linkedin.com/in/pewriebontal/`,
    },
  ],
};
const plugins = [
  `gatsby-plugin-advanced-sitemap`,
  {
    resolve: `gatsby-plugin-offline`,
    options: {
      precachePages: [`/authors/*`, `/static/*`, `/404.html`],
      runtimeCaching: [
        {
          // Use cacheFirst since these don't need to be revalidated (same RegExp
          // and same reason as above)
          urlPattern: /(\.js$|\.css$|static\/)/,
          handler: `CacheFirst`,
        },
        {
          // Add runtime caching of various other page resources
          urlPattern: /^https?:.*\.(png|jpg|jpeg|webp|svg|gif|tiff|js|woff|woff2|json|css)$/,
          handler: `StaleWhileRevalidate`,
        },
      ],
    },
  },
  {
    resolve: `gatsby-plugin-canonical-urls`,
    options: {
      siteUrl: `https://blog.pewriebontal.ml`,
    },
  },
  {
    resolve: `gatsby-plugin-clarity`,
    options: {
      clarity_project_id: '6viojl2lv6',

      enable_on_dev_env: false,
    },
  },
  {
    resolve: '@narative/gatsby-theme-novela',
    options: {
      contentPosts: 'content/posts',
      contentAuthors: 'content/authors',
      rootPath: '/',
      basePath: '/',
      authorsPage: true,
      sources: {
        local: true,
        // contentful: true,
      },
    },
  },
  {
    resolve: `gatsby-plugin-manifest`,
    options: {
      name: `Blog | pewriebontal`,
      short_name: `Blog`,
      start_url: `/`,
      background_color: `#fff`,
      theme_color: `#1f1f1f`,
      display: `standalone`,
      icon: `src/assets/favicon.png`,
    },
  },
  {
    resolve: `gatsby-plugin-netlify-cms`,
    options: {},
  },
];

module.exports = {
  siteMetadata,
  plugins,
};

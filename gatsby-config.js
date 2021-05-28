module.exports = {
  siteMetadata: {
    title: `Blog | pewriebontal`,
    name: `Blog | pewriebontal`,
    siteUrl: `https://blog.pewriebontal.ml`,
    description: `pewriebontal's personal blog.`,
    twitterUsername: '@pewriebontal',
    keywords: 'pewrie bontal, Min Thu Khine, pewriebontal, Blog',
    hero: {
      heading: `Welcome to Blog, pewriebontal's personal space.`,
      maxWidth: 652,
    },
    social: [
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
      /* {
               name: `dribbble`,
               url: `https://dribbble.com/pewriebontal`,
             }, */
    ],
  },
  plugins: [
    `gatsby-plugin-offline`,
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
  ],
};

---
title: "GraphQL"
description: "Basic GraphQL code and workflow"
---

import { Message } from '@theme-ui/components';

<Message variant='important'>
  🔔️ <b>Important</b> <br/>
  <b>Query</b>: is used for files under <b>pages/</b> directories.<br/>
  <b>StaticQuery</b>: is used for files under <b>components/</b> or any other directory. <a href="https://www.gatsbyjs.org/docs/static-query/" target="_blank" rel="noopener">More info...</a><br/>
  <b>useStaticQuery</b>: Instead of <i>StaticQuery</i>, you can use the hook <i>useStaticQuery</i>, which is easier. <a href="https://www.gatsbyjs.org/docs/use-static-query/" target="_blank" rel="noopener">More info...</a>
</Message>


## How to query siteMetadata from gatsby-config.js

### For files under pages/

```js
import React from "react"
import { graphql } from 'gatsby'

const IndexPage = ({data}) => {
  return (
    <header>
      <h1>{data.site.siteMetadata.title}</h1>
    </header>
  )
}

export const query = graphql`
  query IndexPageQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`

export default IndexPage
```

### For components under any directory (StaticQuery)

```js
import React from 'react'
import { StaticQuery, graphql } from 'gatsby'

const Header = () => (
  <StaticQuery
    query={graphql`
      query HeadingQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <header>
        <h1>{data.site.siteMetadata.title}</h1>
      </header>
    )}
  />
)

export default Header
```

### For components under any directory (useStaticQuery)

```js
import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'

const Header = () => {
  const data = useStaticQuery(graphql`
    query HeaderQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)
  return (
    <header>
      <h1>{data.site.siteMetadata.title}</h1>
    </header>
  )
}

export default Header
```

## How to query several images from source files

**Case example**: How to get all files with extension ".webp" and ".jpeg" from directory "images"

1. On *gatsby-configure.js*, configure *gatsby-source-filesystem* plugin in order to fetch data from particular directories, in this case */images/*

```js
module.exports = {
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/images/`,
      },
    },
  ],
}
```

2. Create the query. Note that in order to filter by directory, we actually use the *name* you specified in the *gatsby-config.js* file by using the filter *sourceInstanceName* in the query:
```js
export const query = graphql`
  query MyQuery {
    allFile(filter: {sourceInstanceName: {eq: "images"}, extension: {regex: "/(jpeg)|(webp)/"}}) {
      edges {
        node {
          name
          relativePath
        }
      }
      totalCount
    }
  }
`
```

Note that *relativePath* will yield the actual name of the file.
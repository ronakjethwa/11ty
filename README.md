<div align="center">
    <h1>Eleventy</h1>
    <br>
    <p><a href="https://github.com/11ty/eleventy/">Eleventy</a> starter kit designed to help you add rich features to website without the need for a complicated build process.</p>
    <br>
</div>
    
It comes with all the blog standard features:

- Posts and Pages
- Pagination
- Tags
- Static server-rendered content

A bunch of good practices:

- RSS feed
- \*Considerate mark-up
- Service worker with offline content
- Lazy loading images
- Critical CSS

_\*Considerate means semantic, accessible mark-up, written for both humans and machines._

Additional features:

- Seamless JavaScript and SCSS compilation (no build process)
- Data-driven navigation
- Customisable settings including theming

Additional features:

- Comments
- Claps
- Reading List
- Login

These additional features that have persistent data including user generated content. On JAMstack sites including rich content usually means complicated build processes and multiple third-party services. This doesn't sit well with me since owning my own data and tinkering with the platform is a big motivation for building a static personal site.

## Running the project

To start the project run:

```
npm install
```

then:

```
npm start
```

## Configuring site information

Configure important site-wide information like the site name, description and default author information:

```
site/_data/site.js
```

## Configuring navigation

Change the site navigation by modifying:

```
site/_data/navigation.json
```

## Changing the color scheme

Eleventy includes basic theming. Select an alternative to the black and white feature colors by modifying the `theme` key in:

```
site/_data/site.js
```
## Working with SCSS

In Eleventy SCSS files are compiled on-the-fly by 11ty and added to data. This means you can write inline CSS directly into templates and partials like this: `<style>{% raw %}{{css["compilation-target"] | safe}}{% endraw %}</style>`. Where "compilation-target" is the key added to the list of SCSS files to compile in:

```
site/_data/css.js
```

Each entry added to the `targets` array will be available as site data and a static file will also be written to `css/[compilation-target].css`.

Source files for scss have been added to the directory `site/src/scss`.

## Working with JavaScript

Similar to how SCSS works, JavaScript files in Eleventy are also compiled on-the-fly using Webpack.

The Webpack configuration contains a loader for `.js` files that will transpile ES6 to ES5 meaning you can safely write modern JavaScript. The Webpack configuration can be extended or modified in: `site/utils/compile-webpack.js`.

Files generated by Webpack are added to site data so you can write inline JavaScript in templates and partials like this: `<script>{{css["output-filename"] | safe}}</script>`. The "output-filename" should be the full name of a file generated by Webpack including the extension.

You can add additional entry points by modifying the `targets` array in:

```
site/_data/js.js
```

Each file generated will also be available as a static file at the path: `js/[output-filename]`.

Source files for javascript have been added to the directory `site/src/js`.

## Critical CSS

Eleventy is capable of generating criticalCSS although this is turned off by default for performance reasons. You can turn this feature on by modifying:

```
site/_data/site.js
```
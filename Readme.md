# CSS imports

See https://github.com/webpack-contrib/css-loader/issues/1233 for discussion.

To build:

```
yarn install
yarn run build:dev
```
then open the `dist/index.html` file.

Notice that in this example, the CSS from module D is included as many different `style` tags because there is no option in `css-loader` to deduplicate the CSS imports (since version 3.3.1). In more complicated cases (such as [JupyterLab](https://github.com/jupyterlab/jupyterlab)), we have dozens of modules, with a common set of framework modules that nearly every package is importing. We end up with over 21,000 style DOM elements in our core application, but CSS `@import` deduplication brings this down to just 175 style DOM elements. Having 21,000 style DOM elements is causing our application to have 10x the start time (on the order of 20-30 seconds) and seems to slow down the application in general.

The idea here is that:

- each package stands on its own, and should be easy to include in a web application by itself, so each package's CSS file `@import`s its dependency's CSS files
- We want to leave it up to the user how CSS gets into the browser, so we do not hardcode a css import in each module's Javascript (in this toy example, we've left the js out completely)

What we do is basically have a dependency graph between css files that mirrors the dependency graph of the actual packages. An application that wants to include any module just has to get the main CSS file for that module onto the page, and any required dependency CSS will automatically get loaded through the CSS `@import` dependency graph.


While CSS in general has issues with ordering and the global namespace, in this restricted scenario where we are mimicking the package dependency graph and curating our CSS to not have conflicts, it would be really helpful to have deduplicating.


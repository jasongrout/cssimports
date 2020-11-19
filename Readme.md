# CSS imports

See https://github.com/webpack-contrib/css-loader/issues/1233 for discussion.

To build:

```
yarn install
yarn run build:dev
```
then open the `dist/index.html` file.

Notice that the CSS from module D is included as many different `style` tags because there is no option in `css-loader` to deduplicate the CSS imports (since version 3.3.1). In more complicated cases (such as [JupyterLab](https://github.com/jupyterlab/jupyterlab)), we end up with over 20,000 style tags (which could be deduplicated down to 175), bringing significant performance hits to the application.

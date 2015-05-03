require.config({
  paths: {
    "react": "node_modules/react/dist/react-with-addons.min",
    "JSXTransformer": "node_modules/react/dist/JSXTransformer",
    "jsx": "./jsx/jsx",
    "lodash":"node_modules/lodash/index",
    "firebase":"node_modules/firebase/lib/firebase-web",
    "d3":"node_modules/d3/d3.min"
  },

  shim : {
    "react": {
      "exports": "React"
    },
    "JSXTransformer": "JSXTransformer",
    'firebase': {
            exports: 'Firebase'
    },
  },

  jsx: {
    fileExtension: ".jsx",
    transformOptions: {
      harmony: true,
      stripTypes: false,
      inlineSourceMap: true
    },
    usePragma: false
  }
});

require(['jsx!app'], function(App){

var app = new App();
app.init();

});

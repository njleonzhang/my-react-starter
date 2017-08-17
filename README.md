# my-react-starter
webpack react starter refer to Vue webpack

* webpack3
* Mobx 3
* react-router 4
* stylus | scss | sass support
* hot reload

> hot realod with `react-router` + `mobx` can not be implemented by configuration. in this project, we abandon to keep `current store` after hot reload. but the update to store(both value and action) can work. 

# hot reload discussion

https://github.com/foxhound87/rfx-core/issues/3

1. for non rfx-core version: https://github.com/njleonzhang/my-react-starter
2. for rfx-core version: https://github.com/njleonzhang/my-react-starter/tree/ssr-rfx-core

----

Points:
1.  In [main.jsx](https://github.com/njleonzhang/my-react-starter/blob/master/src/main.jsx#L36),  watch both `App`, and `store`
```
  module.hot.accept(['./components/App', './stores'], () => {
    const newApp = require('./components/App').default
    renderApp(newApp)
  })
```

2. in [App.jsx](https://github.com/njleonzhang/my-react-starter/blob/master/src/components/App/index.jsx#L7), importing `store` to make `store` a child component of `App.jsx`, so that when we change store code, the `App.jsx` can be triggered to run hot reload. 

```
import '../../stores' // for hot-reload, make code change in store trigger App.jsx reload
```

-------

`rfx-core` keeps current value of `store` when hot-reload. but when working with `react-router`, the hot reload will also trigger router, so if you change `store` in react hook `componentDidMount`, then the store value you kept through `rfx-core` will still be override by `router`. So in this scenario, the benefit of `rfx-core` (I mean `keep state`)  becomes useless.

At the same time, `rfx-core`(`keep state`) can cause another side-effect. For example, I have a `testVal = 123` in store, and when I change it to `testVal = 1234`, it seems the new value can not be updated to store. because the old value `123` is kept. (I am not sure if this is caused by my config)

I need `react-router`,  and most of the time, I change store when router change(get data from server), `kept store value` is always override by `router change` in my project. so I remove `rfx-core` and use a normal store. this can work currently(not sure if will encounter other issues) with the next warning: 
```
MobX Provider: Provided store 'store' has changed. Please avoid replacing stores as the change might not propagate to all children
``` 

So it seems there is no solution now to make hot-reload work perfect with `mobx` + `react` + `react-router` + `mobx-react-router`.  A perfect solution need to keep current value, update changed value, at the same time not be override by `router`, hope react professional can make a solution. 

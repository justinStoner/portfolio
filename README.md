## Dependencies

nodejs, npm and aurelia-cli

## Making changes

To make changes, you will need to have the aurelia-cli running as it watches your files for changes then transpiles them to ES5 then bundles them

If you do not have the aurelai-cli installed, install it with
```shell
npm install aurelia-cli -g
```

now cd to the project folder, and
```shell
npm install
```
After that has finished,
```shell
au run --watch
```
or

```shell
au run --watch --env prod
```

Once that is finished, the application should be available at localhost:9000

Alternatively, just serve index.html like any other html page if you just want to view it.

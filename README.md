## AnywhereWorks Micro Front end apps (plugins)
  This is a demo app for demonstrating how a micro front end component can be developed and integrated into lucy shell (anywhereworks base app), the code just follows the [stardard of injection](https://docs.google.com/document/d/1fdzE0AWEyoKuvvRVARDGSQuMwtFtMyiiuXJWwPDJtqE/edit#) which lucy shell follows except this part everything of the app can be coded using different techniques but make sure these techniques doesn't decline the app overall performance.


  This demo app has code for:
  1. how to create micro front end component suitable for lucy shell like intialization process, webpack configuration for production build etc..,
  2. how to use routes, how to hold the refrence to frontoffice (lucy shell apis object) and usefull wrapper on top of lucy shell apis to make developement easy
  3. how to use various apis from lucy shell like app navigation showing notifications etc..,
  4. how to use shared services and components of a different mfe which also got injected
  5. how to share services and components so other mfes injected can use them, example [services shared by connect](https://docs.google.com/document/d/147og04rjmkrsYchE-d3RGq3f4daLgCH_yddFjfEC7l0/edit) are utilized in this demo app

### Get Started

#### Reading and understanding code: 

1. start with [package.json](./package.json), [webpack configurations](./webpack.prod.js) and then the [index.js file](./src/aw-mfe/index.js)
2. the main components [TabIcon](./src/aw-mfe/components/main/TabIcon.jsx) and [TabView](./src/aw-mfe/components/main/TabView.jsx)
3. [wrapper](./src/aw-mfe/BaseApisWrap.js) over the frontoffice (lucy shell services) services to easy development and refactoring
#### Development tools
1. [Node](https://nodejs.org/en/download/) version: 14.15.1 or above
2. [Chrome](https://www.google.com/chrome/) and [React Developer tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en) plugin
3. [Visual Studio Code](https://code.visualstudio.com/download)

#### Running the project locally (developement)
1. clone the repository and open it in vscode
2. `npm install` in the repo root directory
3. `npm run dev` in the repo root directory
4. app should be running at [localhost:3000](https://localhost:3000) in the default browser

#### Generating Production build
1. make sure app is running fine in local
2. run `npm run build`
3. the build file will be available in dist folder 

### Local Integration developement
1. open any staging url ex: my.staging.anywhere.app , go.staging.setmore.com etc...
2. run `npm run watch-build` this will run local production version which will provide a
  bundled file at [localhost:3001](http://localhost:3001/dist/prod/bundle.prod.js)
3. open console for the anywhereworks web app and paste the following command
  ```javascript
    ModuleRegistryInstance.handleModuleIntializationProcess({
        id: 'todomicro',
        name: 'todomicro',
        displayName: 'todomicro',
        scriptPath:'http://localhost:3001/dist/prod/bundle.prod.js'
      }, Resources, FrontOfficeService)
  ```
  this will inject the component into anywhereworks app

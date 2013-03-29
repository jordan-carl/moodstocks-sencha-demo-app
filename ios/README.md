# Moodstocks Sencha Touch Demo for iOS

This demo is an hybrid application. The main frame is built by Sencha Touch.

We use the [Moodstocks PhoneGap plugin](https://github.com/Moodstocks/moodstocks-phonegap-demo-app) to implement the scanner.

The scanner overlay is a pure web view, which means you can customize it with web technologies (HTML/CSS/Javascript).

From the overlay, you can either redirect to a product page (which dismisses the scanner) or open a pop-up inside scanner for more information.

## Prerequisites

* An iOS development environment.
* A Moodstocks [developer account](https://developers.moodstocks.com/register).

Then you need to set up Sencha Touch development environment:

* Download [Sencha Touch](http://www.sencha.com/products/touch/)
* Install [Sencha SDK Tools](http://www.sencha.com/products/sdk-tools/download)
* Install [Sencha cmd](http://www.sencha.com/products/sencha-cmd/download)
* Install `sass` and `compass` in order to generate style sheet

    ```console
    gem install sass
    gem install compass
    ```

At last you need to install PhoneGap:

* Download [PhoneGap](http://phonegap.com/download/). Version 2.3.0 or higher is recommanded.

## Test the demo

0. Get [Moodstocks PhoneGap plugin for iOS](https://github.com/Moodstocks/moodstocks-phonegap-plugin/ios)

  > NOTE: Our PhoneGap plugin is composed by
    * MoodstocksPlugin.js
    * MoodstocksPlugin.{h,m}
    * Other native resources:
      * MSScannerController.{h,m}
      * MSHandler.{h,m}

1. Git clone this demo.
2. Open the `SenchaDemo` Xcode project:

    ```console
    cd /path/to/your/repo
    open demo-ios/SenchaDemo.xcodeproj
    ```

3. Setup the Moodstocks SDK: please refer to this [step-by-step tutorial](https://developers.moodstocks.com/doc/tuto-ios/1).

4. Open Xcode and the plugin repo, drag drop `MoodstocksPlugin.h`, `MoodstocksPlugin.m` and other native resources files(`MSScannerController.{h,m}`, `MSHandler.{h,m}`) to `Plugins` folder in your project.

4. Copy `MoodstocksPlugin.js` to the root of the Sencha Touch demo folder.

4. Configure your API key & secret in `build/MyApp/MoodstocksPlugin.m`:

    ```objective-c
    #define MS_API_KEY @"ApIkEy"
    #define MS_API_SEC @"ApIsEcReT"
    ```

5. We use Sencha cmd 3.1.0 to build our app, check first to see if you need to update the sencha configuration.

  ```console
  cd /path/to/your/repo
  sencha app upgrade -noframework
  ```

6. Build the Sencha app.

    ```console
    sencha app build package
    ```

7. Switch to Xcode and click `Run` to launch the demo on your device.

## Create your own project from scratch

In order to get started quickly, here is the demo's structure to help you better understand how the overlay works:

    ├── controller
    │   └── Scanner.js -> including the control over sync, scan & overlay actions
    ├── model
    ├── profile
    ├── store
    └── view
        ├── Home.js -> Home panel with a short description
        ├── Main.js -> Main tab panel which contains the Home tab and Scanner tab
        ├── Overlay
        │   ├── Container.js -> the container to hold the result & control
        │   ├── Control.js -> contains buttons to control further action
        │   ├── Result.js -> the badge to display scan result
        │   └── Thumbnail.js -> the thumbnail contains the product view
        ├── Product.js
        └── Scanner
            ├── Container.js -> the container to hold the scanner panel
            └── Panel.js -> the panel contains scan options checkboxs, status bar & scan button

1. Create a Sencha Touch app.

    ```console
    cd /path/to/sencha-touch-2-sdk
    sencha generate app YourApp /destination/folder
    ```

2. Copy `Cordova-2.x.x.js` & `MoodstocksPlugin.js` to your app's folder.

    ```console
    cp ~/path/Cordova-2.x.x.js /path/to/yourapp
    cp ~/path/MoodstocksPlugin.js /path/to/yourapp
    ```
3. Open `app.json` and include `Cordova-2.x.x.js` & `MoodstocksPlugin.js`.

    ```json
    "js": [
            { "path": "cordova-2.3.0.js" },
            { "path": "MoodstocksPlugin.js" },
            //...
    ```

4. Create a PhoneGap project, the project location should be inside your Sencha demo. (We suppose you name the project `SenchaDemo`)

    ```console
    ./create ~/path/to/yourSenchaApp/ com.sencha.demo SenchaDemo
    ```

5. Open Xcode and drag drop `MoodstocksPlugin.h`, `MoodstocksPlugin.m` and other native resources files(`MSScannerController.{h,m}`, `MSHandler.{h,m}`) to `Plugins` folder in your project.

    ```console
    cd /path/to/yourapp
    open build/MyApp/SenchaDemo/SenchaDemo.xcodeproj
    ```

5. Add our plugin under the ```<plugins>``` tag of your project's `config.xml` file.

  ```xml
  <plugin name="MoodstocksPlugin" value="MoodstocksPlugin" />
  ```

6. Modifiy `build.xml` of your Sencha app to set the build target. For example:

    ```xml
    <target name="-after-build">
        <!-- remove PhoneGap project's default www files -->
        <delete dir="${basedir}/ios/SenchaDemo/www" />

        <!-- copy generated Sencha app files to www folder -->
        <copy todir="${basedir}/ios/SenchaDemo/www">
            <fileset dir="${build.dir}/package" />
        </copy>
    </target>
    ```

7. Integrate Moodstocks Scanner into your app.

    * Open the scanner while the application is launched. The open method is called inside `app.js`:

        ```javascript
         launch: function() {
            // ...
            MoodstocksPlugin.open(openSuccess, openFailure);
        },
        ```

    * Sync the scanner cache everytime the scanner panel is activated. The sync method is called inside `controller\Scanner.js`, triggered by the `activate` event of scanner panel:

        ```javascript
        onScannerTabActivate: function(){
            // ...
            MoodstocksPlugin.sync(null, syncInProgress, syncFinished, syncFailure);
        },
        ```

    * All the overlay elements are created and added to the view port while the scanner panel is initialized. The initialization is located in `view\Scanner\Panel.js`:

        ```javascript
        // Initialize overlays
        var overlayContainer = Ext.create('MyApp.view.Overlay.Container');

        // Add overlays to viewport
        Ext.Viewport.add(overlayContainer);

        // Hide Overlays
        overlayContainer.hide();

        //...
        ```

    * When the scanner is launched, we need to hide the scanner panel & main tab bar in order to have a transparent overlay. Correspondingly, we need to recovery them when the scanner is dismissed. This toggle is done in `controller\Scanner.js`. The `hidePanel` action is triggered by the **tap** event of scan button, the `showPanel` action is called in **scanDismiss** callback of Moodstocks PhoneGap plugin:

        ```javascript
        showPanel: function() {
            this.getScannerPanel().show();
            this.getMainTabbar().show();
        },

        hidePanel: function() {
            this.getScannerPanel().hide();
            this.getMainTabbar().hide();
        }
        ```

    * Once an object is recognized, the result is displayed on overlay and the scan session is paused. Now you can :
        1. Click on the `Redirect to Product` button to dismiss the scanner and be redirected to a product view, what we give as an example is to push a product view from the scanner container.
        2. Click on the `Open a Popup` button to fire a popup inside the scanner, what we give as an example is a thumbnail view.
        3. Tap on the screen to dismiss the overlay and resume the scan.

8. Build your Sencha app

    ```console
    cd /path/to/yourapp
    sencha app build package
    ```

9. Switch to Xcode and click `Run` to launch the demo on your device.

## Help

Need help? Check out our [Help Center](http://help.moodstocks.com/).

## Copyright

Copyright (c) 2013 [Moodstocks SAS](http://www.moodstocks.com)

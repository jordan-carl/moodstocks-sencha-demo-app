# Moodstocks Sencha Touch Demo

This demo is an hybrid application. The main frame is built by Sencha Touch.

We use the [Moodstocks PhoneGap plugin](https://github.com/Moodstocks/moodstocks-phonegap-demo-app) to implement the scanner.

The scanner overlay is a pure web view, which means you can customize it with web technologies (HTML/CSS/Javascript).

From the overlay, you can either redirect to a product page (which dismisses the scanner) or open a pop-up inside scanner for more information.

## Prerequisites

* Android development environment.
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

At last you need to get PhoneGap:

* Download [PhoneGap](http://phonegap.com/download/). Version 2.3.0 or higher is recommanded.

## Test the demo

[Moodstocks PhoneGap plugin](https://github.com/Moodstocks/moodstocks-phonegap-plugin/) has been configured as a submodule of this repo.

1. Git clone this repo.

2. Initialize and update submodule - `plugin`

  ```console
  $ git submodule init
  $ git submodule update
  ```

3. Open the `plugin` folder and copy `MoodstocksPlugin.js` to the root of the Sencha Touch demo folder (the same level as `app.js`).

4. Import the demo project `your/repo/android/Demo` into your IDE.

5. Set up the Moodstocks SDK: please refere to this [step-by-step tutorial](https://developers.moodstocks.com/doc/tuto-android/1).

6. Configure your API key & secret in `MoodstocksPlugin.java` which can be found inside the package `com.moodstocks.phonegap.plugin`

  ```
  //--------------------------------
  // Moodstocks API key/secret pair
  //--------------------------------
  private static final String API_KEY = "";
  private static final String API_SECRET = "";
  ```

7. We use Sencha cmd 3.1.0 to build our app, check first to see if you need to update the sencha configuration.

  ```console
  cd /path/to/your/repo
  sencha app upgrade -noframework
  ```

8. Build the Sencha app.

  ```console
  sencha app build package
  ```

9. Swith to Eclipse and launch the application on your device

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

0. Get [Moodstocks PhoneGap plugin for Android](https://github.com/Moodstocks/moodstocks-phonegap-plugin/android)

  > NOTE: Our PhoneGap plugin is composed by
    * MoodstocksPlugin.js
    * MoodstocksPlugin.java
    * MoodstocksScanActivity.java
    * MoodstocksWebView.java: it extends the `CordovaWebView` in order to perform properly in our scanner.
    * Demo.java: it overrides a part of `DroidGap` in order to implement our web view overlay logic.
    * Resources related to these 2 activity

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

4. Create an Android PhoneGap project, the project location should be inside your Sencha demo. (We suppose you name the project `SenchaDemo`)

    ```console
    ./create ~/path/to/yourSenchaApp/ com.example.phonegap Demo
    ```

5. Open SenchaDemo in Eclipse and add Moodstocks plugin's native files to your project.

  * Create a package called `com.moodstocks.phonegap.plugin` and copy these files into it:
      * MoodstocksPlugin.java
      * MoodstocksWebView.java
      * MoodstocksScanActivity.java
  * Replace your main activity class with our `Demo.java`. It overrides several functions of `DroidGap`.

  * Add related resources file of `MoodstocksScanActivity.java` into your project
      * Copy `scan.xml` into `res/layout`, this is the overlay's layout file
      * Add this line in `res/values/strings.xml`

      ```xml
      <string name="scan_name">MoodstocksScanActivity</string>
      ```

      * Add activity declaration into your `AndroidManifest.xml`

      ```xml
      <activity
          android:name="com.moodstocks.phonegap.plugin.MoodstocksScanActivity"
          android:label="scan_name"
          android:screenOrientation="portrait"
          android:theme="@android:style/Theme.NoTitleBar.Fullscreen">
      </activity>
      ```

6. Register Moodstocks plugin in Cordova's plugin list. Open `res/xml/config.xml` and add this line of code:

  ```xml
  <plugin name="MoodstocksPlugin" value="com.moodstocks.phonegap.plugin.MoodstocksPlugin" />
  ```

7. Modifiy `build.xml` of your Sencha app to set the build target. The object is to copy the generate app files to the phonegap project's `www` folder.

    ```xml
    <target name="-after-build">
        <!-- remove PhoneGap project's default www files -->
        <delete dir="${build.dir}/SenchaDemo/assets/www" />

        <!-- copy generated Sencha app files to www folder -->
        <copy todir="${basedir}/SenchaDemo/assets/www">
            <fileset dir="${build.dir}/package" />
        </copy>
    </target>
    ```

8. Integrate Moodstocks Scanner into your app.
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

9. Before building your app, you need to add one line of css to fix a flickering problem of webkit. Affect this css class to the UI elements you need to hide when launching the scanner. They are `scannerPanel` and `mainTabbar` in our demo.

  ```css
  .x-panel {
      -webkit-backface-visibility: hidden;
  }
  ```

10. Build your Sencha app

    ```console
    cd /path/to/yourapp
    sencha app build package
    ```

11. Switch to Eclipse and launch the application on your device.

## Help

Need help? Check out our [Help Center](http://help.moodstocks.com/).

## Copyright

Copyright (c) 2013 [Moodstocks SAS](http://www.moodstocks.com)


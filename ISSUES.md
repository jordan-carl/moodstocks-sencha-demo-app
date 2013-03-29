# Issue list

This file keeps a record of current known issues.

## [Issue 1] Transparent web view

* OS: android Honeycomb(3.1, 3.2), Ice Cream Sandwich(4.0.3-4.0.4)
* Description: The webview don't appear to be transparent when we launch the scanner.
* Workaround:
  * Disable the hardware acceleartion on your mobile
  * Use software layer for the inserted web view

  ```java
    if(android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.HONEYCOMB
        && android.os.Build.VERSION.SDK_INT <= android.os.Build.VERSION_CODES.ICE_CREAM_SANDWICH_MR1)
    {
        webContainer.setLayerType(WebView.LAYER_TYPE_SOFTWARE, null);
    }
  ```

* Reference:
  * [StackOverflow: “body background-color: transparent” did not affect on webview of android 4.0.3](http://stackoverflow.com/questions/8895287/body-background-color-transparent-did-not-affect-on-webview-of-android-4-0-3?lq=1)
  * [Android google project: Issue 19510: WebView, transparent background on webpage, hardwareAccelerated=true fails](https://code.google.com/p/android/issues/detail?id=19510&q=setBackgroundColor%204.0.3&colspec=ID%20Type%20Status%20Owner%20Summary%20Stars)

## [Issue 2] Transition animation flickering problem

* OS: Android Jelly Bean(4.1, 4.2)
* Description: When we launch the scanner and hide web view elements, they tend to flicker before disappear.
* Workaround: Adding a css fix to the web view elements you need to hide.

  ```css
  .flickeringFix {
      -webkit-backface-visibility: hidden;
  }
  ```

* Reference:
  * [backface-visibility](http://css-tricks.com/almanac/properties/b/backface-visibility/)
  * [Android TabPanel Animation Flickering - Potential Fix](http://www.sencha.com/forum/showthread.php?125811-Android-TabPanel-Animation-Flickering-Potential-Fix)
  * [Animations on Android flickering](http://www.sencha.com/forum/showthread.php?115290-Animations-on-Android-flickering/)

## [Issue 3] Icon/Choice field rendering issue

* OS: Android version lower than 4.0.3
* Description: When the application is launched, the icons and all choice field(e.g. checkboxs) appear to be blank. This is an android webkit mask bug, it is fixed in 4.0.3.
* Workaround: Adding a css fix to

  ```css
  .x-tabbar {
      "z-index:1"
  }
  ```

  > NOTE: Since the rendering issue will be caused by the fix of issue 2, this is not yet fixed in our demo Sencha.

* References:
  * [Blank icons in tabbar if container has scrollable set to true](http://www.sencha.com/forum/showthread.php?192463-Blank-icons-in-tabbar-if-container-has-scrollable-set-to-true)
  * [Bottom tab bar has blank icons on Android](http://www.sencha.com/forum/showthread.php?182391-Bottom-tab-bar-has-blank-icons-on-Android)

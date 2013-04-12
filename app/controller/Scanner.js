Ext.define('MyApp.controller.Scanner', {
    extend: 'Ext.app.Controller',

    config: {
        scanResultValue: null,
        scanResultFormat: null,

        refs: {
            overlayContainer: 'overlayContainer',
            scanResultFormat: 'resultFormat',
            scannerPanel: 'scannerPanel',
            scannerContainer: 'scannerContainer',
            mainTabbar: 'mainTabbar'
        },
        control: {
            scannerContainer: {
                activate: 'onScannerTabActivate'
            },
            'scannerPanel button[ui=action]': {
                tap: 'onScanButtonTap'
            },
            'overlayAction button[action=redirect]': {
                tap: 'redirectToProduct'
            },
            'overlayAction button[action=popup]': {
                tap: 'popupProductThumbnail'
            },
            'overlayPopup button[action=back]': {
                tap: 'backToScanResult'
            },
            overlayContainer: {
                hide: 'hideOverlay'
            }
        }
    },

    onScannerTabActivate: function(){
        syncStatusLabel = Ext.getCmp('syncStatus');

        // Sync callbacks
        var syncInProgress = function(progress) {
            syncStatusLabel.setHtml("syncing..." + progress + "%");
            syncStatusLabel.setStyle('background:#349DF4');
        }

        var syncFinished = function() {
            syncStatusLabel.setHtml("Sync finished!");
            syncStatusLabel.setStyle('background:#80AC3B');
        }

        var syncFailure = function(message) {
            syncStatusLabel.setHtml(JSON.stringify(message));
            syncStatusLabel.setStyle('background:red');
        }

        MoodstocksPlugin.sync(null, syncInProgress, syncFinished, syncFailure);
    },

    showPanel: function() {
        this.getScannerContainer().show();
        this.getMainTabbar().show();
    },

    hidePanel: function() {
        this.getScannerContainer().hide();
        this.getMainTabbar().hide();
    },

    onScanButtonTap: function() {
        var me = this;

        // Scan callbacks
        var scanSuccess = function(format, value) {
            // pause the scanner
            MoodstocksPlugin.pause(function(){console.log("scanner pause")}, null);

            me.setScanResultFormat(format);
            me.setScanResultValue(value);

            // You can choose your own way to display the result
            Ext.getCmp('resultFormat').setHtml('Format: ' + format);
            Ext.getCmp('resultValue').setHtml('Id: ' +  value);

            me.getOverlayContainer().show();
        }

        var scanCancelled = function(){
            me.showPanel();
            me.getOverlayContainer().hide();
        }

        var scanFailure = function(result) {
            alert(result);
            me.showPanel();
        }

        // Retrieve user choice for scan options
        var buildScanOptions =  function() {
            var scanOptions = Ext.ComponentQuery.query('scannerPanel')[0],
            values = scanOptions.getValues();

            return {
                image: ((values.image) ? true : false),
                ean8: ((values.ean8) ? true : false),
                ean13: ((values.ean13) ? true : false),
                qrcode: ((values.qrcode) ? true : false),
                dmtx: ((values.dmtx) ? true : false)
            };
        }

        me.hidePanel();
        MoodstocksPlugin.scan(scanSuccess, scanCancelled, scanFailure, buildScanOptions());
    },

    redirectToProduct: function() {
        var me = this;
        var dismissSuccess = function() {
            me.getScannerContainer().push({
                title: "Product",
                html: me.getScanResultValue()
            });
        }

        MoodstocksPlugin.dismiss(dismissSuccess, null);
    },

    popupProductThumbnail: function() {
        Ext.getCmp('overlayContent').hide();
        Ext.getCmp('overlayAction').hide();
        Ext.getCmp('overlayPopup').show();
    },

    backToScanResult: function() {
        Ext.getCmp('overlayContent').show();
        Ext.getCmp('overlayAction').show();
        Ext.getCmp('overlayPopup').hide();
    },

    hideOverlay: function() {

        Ext.getCmp('overlayContent').show();
        Ext.getCmp('overlayAction').show();
        Ext.getCmp('overlayPopup').hide();

        MoodstocksPlugin.resume(function(){console.log("scanner resume")}, null);
    }
});

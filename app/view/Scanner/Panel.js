Ext.define('MyApp.view.Scanner.Panel', {
    extend: 'Ext.form.Panel',
    xtype: 'scannerPanel',
    id: 'scannerPanel',

    config: {
        title: 'Scanner',

        layout: {
            type: 'vbox',
            align: 'middle'
        },
        items: [
            {
                xtype: 'fieldset',
                id: 'options',
                items: [
                    {
                        xtype: 'checkboxfield',
                        name : 'image',
                        id: 'image',
                        label: 'Image',
                        value: 'image',
                        labelWidth: 120,
                        checked: true
                    },
                    {
                        xtype: 'checkboxfield',
                        name : 'ean8',
                        id: 'ean8',
                        label: 'EAN8',
                        value: 'ean8',
                        labelWidth: 120
                    },
                    {
                        xtype: 'checkboxfield',
                        name : 'ean13',
                        id: 'ean13',
                        label: 'EAN13',
                        value: 'ean13',
                        labelWidth: 120
                    },
                    {
                        xtype: 'checkboxfield',
                        name : 'qrcode',
                        id: 'qrcode',
                        label: 'QR Code',
                        value: 'qrcode',
                        labelWidth: 120
                    },
                    {
                        xtype: 'checkboxfield',
                        name : 'dmtx',
                        id: 'dmtx',
                        label: 'Data Matrix',
                        value: 'dmtx',
                        labelWidth: 120
                    }
                ]
            },
            {
                xtype: 'fieldset',
                items: [
                    {
                        xtype: 'label',
                        id: 'openStatus',
                        padding: 5
                    },
                    {
                        xtype: 'label',
                        id: 'syncStatus',
                        padding: 5
                    }
                ]
            },
            {
                xtype: 'button',
                text: 'Scan',
                width: 120,
                id: 'scanButton',
                ui: 'action'
            }
        ]
    },

    initialize: function() {
        // Initialize overlays
        var overlayContainer = Ext.create('MyApp.view.Overlay.Container');

        // Add overlays to viewport
        Ext.Viewport.add(overlayContainer);

        // Hide Overlays
        overlayContainer.hide();
    }
});

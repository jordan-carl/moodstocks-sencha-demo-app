Ext.define('MyApp.view.Overlay.Control', {
    extend: 'Ext.Container',
    xtype: 'overlayControl',
    id: 'overlayControl',

    config: {
        top: 180,
        left: 25,
        layout: 'vbox',

        items: [
            {
                xtype: 'button',
                text: 'Redirect to Product',
                id: 'redirectButton',
                width: 200,
                height: 40,
                ui: 'action',
                action: 'redirect'
            },

            {
                xtype: 'button',
                text: 'Open a Popup',
                id: 'innverNav',
                width: 200,
                height: 40,
                margin:'10 0 10 0',
                ui: 'action',
                action: 'popup'
            }
        ]
    }
});


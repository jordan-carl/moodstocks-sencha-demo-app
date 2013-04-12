Ext.define('MyApp.view.Overlay.Container', {
    extend: 'Ext.Container',
    xtype: 'overlayContainer',
    id: 'overlayContainer',

    config: {
        centered: true,
        width: 250,
        height: 300,
        modal: true,
        hideOnMaskTap: true,

        showAnimation: {
            type: 'slideIn',
            direction: 'right'
        },

        items: [
            {
                xtype:'overlayContent'
            },
            {
                xtype:'overlayAction'
            },
            {
                xtype:'overlayPopup'
            }
        ]
    }
});

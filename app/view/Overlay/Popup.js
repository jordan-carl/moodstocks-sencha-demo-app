Ext.define('MyApp.view.Overlay.Popup', {
    extend: 'Ext.Container',
    xtype: 'overlayPopup',
    id: 'overlayPopup',

    config: {
        centered: true,
        cls: 'badge',
        showAnimation: {
            type: 'slideIn',
            direction: 'down'
        },

        items: [
            {
                xtype: 'productItem'
            },
            {
                xtype: 'button',
                text: 'Back',
                id: 'backButton',
                action: 'back'
            }
        ]
    }
});

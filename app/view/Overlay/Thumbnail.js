Ext.define('MyApp.view.Overlay.Thumbnail', {
    extend: 'Ext.Container',
    xtype: 'overlayThumbnail',
    id: 'overlayThumbnail',

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

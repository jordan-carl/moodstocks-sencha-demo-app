Ext.define('MyApp.view.Overlay.Result', {
    extend: 'Ext.Container',
    xtype: 'overlayResult',
    id: 'overlayResult',

    config: {
        top: 0,
        left: 15,
        width: 220,
        height: 80,
        cls: 'badge',
        layout: 'vbox',

        items: [
            {
                xtype: 'label',
                id: 'resultFormat',
                name: 'resultFormat',
                padding: 5
            },
            {
                xtype: 'label',
                id: 'resultValue',
                name: 'resultValue',
                padding: 5
            }
        ]
    }
});


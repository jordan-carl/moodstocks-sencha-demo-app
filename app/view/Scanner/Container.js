Ext.define('MyApp.view.Scanner.Container', {
    extend: 'Ext.NavigationView',
    xtype: 'scannerContainer',
    id: 'scannerContainer',

    config: {
        title: 'Scanner',
        iconCls: 'star',
        cls: 'flickeringFix',

        items: [
            {
                xtype: 'scannerPanel'
            }
        ]
    }
});

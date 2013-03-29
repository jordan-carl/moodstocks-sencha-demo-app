Ext.define('MyApp.view.Main', {
    extend: 'Ext.tab.Panel',
    xtype: 'mainTabbar',
    requires: ['Ext.TitleBar'],
    id: 'mainTabbar',

    config: {
        cls: 'flickeringFix',
        tabBarPosition: 'bottom',
        items: [
            {
                xtype: 'homepanel'
            },
            {
                xtype: 'scannerContainer'
            }
        ]
    }
});

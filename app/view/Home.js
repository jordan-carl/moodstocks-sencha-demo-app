Ext.define('MyApp.view.Home', {
    extend: 'Ext.Panel',
    xtype: 'homepanel',

    config: {
        title: 'Home',
        iconCls: 'home',

        styleHtmlContent: true,
        scrollable: true,
        tabBarPosition: 'bottom',

        items: [
            {
                docked: 'top',
                xtype: 'titlebar',
                title: 'Moodstocks Demo'
            },
            {
                html: "Moodstocks real-time image recognition scanner."
            }
        ]
    }
});

Ext.define('MyApp.view.Product', {
    extend: 'Ext.Container',
    xtype: 'productItem',
    id: 'productItem',
    centered: true,

    config: {
        scrollable: true,
        width: 250,
        height: 240,

        items: [
            {
                html: '<h3>This is a pop up web view which contains product information.</h3>'
            }
        ]
    }
});

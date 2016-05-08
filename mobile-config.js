App.accessRule('*');

App.info({
    name: 'Body language',
    description: '18+',
    author: 'Albert Kaigorodov',
    email: 'albertkai@me.com'
});

App.icons({
    'iphone': 'public/images/ios/icon-60.png',
    'iphone_2x': 'public/images/ios/icon-60@2x.png',
    'iphone_3x': 'public/images/ios/icon-60@3x.png'
});

App.launchScreens({
    'iphone': 'public/images/ios/Default~iphone.png',
    'iphone_2x': 'public/images/ios/Default@2x~iphone.png',
    'iphone5': 'public/images/ios/Default-568h@2x~iphone.png',
    'iphone6': 'public/images/ios/Default-736h.png'
});

App.setPreference('StatusBarOverlaysWebView', true);
App.setPreference('StatusBarStyle', 'lightcontent');
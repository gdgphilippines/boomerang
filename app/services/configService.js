angular.module('gdgXBoomerang')
.factory('Config', function () {
    return {
        // TODO Modify these to configure your app
        'name'          : 'GDG Philippines',
        'id'            : '105750470224587854845',
        'googleApi'     : 'AIzaSyDhJlz9bfEcfzcSrq4FfxQrF6rf7k2SVtM',
        'pwaId'         : '5915725140705884785', // Picasa Web Album id, must belong to Google+ id above
        'domain'        : 'http://www.gdgph.org',
        'twitter'       : 'gdgphilippines',
        'facebook'      : 'gdgphilippines',
        'meetup'        : '',
        // Change to 'EEEE, MMMM d, y - H:mm' for 24 hour time format.
        'dateFormat'    : 'EEEE, MMMM d, y - h:mm a',
        'cover' : {
            title: 'Worldwide GDG Events',
            subtitle: 'Directory of developer events organized by tags and displayed on a global map.',
            button: {
                text: 'Find local events',
                url: 'http://gdg.events/'
            }
        }
        // To update the snippet which is used for sharing, see the TODO in the index.html.
    };
});

/* feedreader.js
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

$(function() {
    /* This test suite tests the RSS feeds definitions, and allFeeds Variable */
    describe('RSS Feeds', function() {

        /* Test checks that allFeeds are defined and not empty */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* Test checks that the URL's are defined and are not empty */
        it('have URL\'s', function() {
            allFeeds.forEach(function(feeds) {
                expect(feeds).toBeDefined();
                expect(feeds.url.length).toBeGreaterThan(0);
            });
        });

        /* Test checks that the feed's names are defined and aren't empty */
        it('have Names\'s', function() {
            allFeeds.forEach(function(feeds) {
                expect(feeds.name).toBeDefined();
                expect(feeds.name.length).toBeGreaterThan(0);
            });
        });
    });

    describe('The menu', function(){
        /* Test checks that the Menu is hidden by default */
        it('Menu is hidden by default', function() {
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

        /* Checks that the Menu is toggled when clicked */
        it('Menu visibility is toggled when menu icon is clicked.', function() {
            let menuIcon = $('.menu-icon-link');
            //let spy = spyOn(menuIcon, 'click').and.returnValue($('body').toggleClass('menu-hidden'));
            menuIcon.click();
            expect($('body').hasClass('menu-hidden')).toBe(false);
            menuIcon.click();
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

    });


    // Used concepts from https://matthewcranford.com/feed-reader-walkthrough-part-4-async-tests/ to workout the next two test suites.
    /* Tests check that the loadfeed async function works. */
    describe('Initial Entries', function(){

        /* beforeEach is run before each other test in the suite run */
        beforeEach(function(done){
            loadFeed(0, done);
        })
        it('LoadFeed is called and has atleast a single entry', function() {
            const feed = $('.feed');
            const entries = $('.feed .entry');
            //console.log(entries.length);
            expect(entries.length > 0).toBe(true);
        });
    })

    /* Checks that the content changes when a new feed is loaded */
    describe('New Feed Selection', function(){
        
        const feed = $('.feed');
        const firstFeed = [];

        /* loads the first feed and stores it into an Array, Loads the new feed */
        beforeEach(function(done){
            loadFeed(0, function(){
            Array.from(feed.children()).forEach(function(entry) { 
                firstFeed.push(entry.innerText);
            });
            /* Loads the second feed, using the callback 'done' the expect statement wont run till this finishes */
            loadFeed(1, done)
        });
    });

        it('Content changes when new feed is loaded', function(){
            Array.from(feed.children()).forEach(function(entry, i){
                console.log('2nd: ' + entry.innerText);
                console.log('1st: ' + firstFeed[i]);
                expect(entry.innerText === firstFeed[i]).toBe(false);
            })
        })

    })


}());
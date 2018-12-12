/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        it('have URL\'s', function() {
            for(let x = 0; x < allFeeds.length; x++) {
                expect(allFeeds[x].url).toBeDefined();
                expect(allFeeds[x].url.length).toBeGreaterThan(11);
            }
        });

        it('have Names\'s', function() {
            for(let x = 0; x < allFeeds.length; x++) {
                expect(allFeeds[x].name).toBeDefined();
                expect(allFeeds[x].name.length).toBeGreaterThan(0);
            }
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
    });

    describe('The menu', function(){

        it('Menu is hidden by default', function() {
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

        it('Menu visibility is toggled when menu icon is clicked.', function() {
            let menuIcon = $('.menu-icon-link');
            //let spy = spyOn(menuIcon, 'click').and.returnValue($('body').toggleClass('menu-hidden'));
            menuIcon.click();
            expect($('body').hasClass('menu-hidden')).not.toBe(true);
            menuIcon.click();
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

    });

    describe('Initial Entries', function(){

        beforeEach(function(done){
            loadFeed(0, done);
        })
        it('LoadFeed is called and has atleast a single entry', function() {
            const feed = $('.feed');
            expect(feed.children.length > 0).toBe(true);
        });
    })

    describe('New Feed Selection', function(){
        
        const feed = $('.feed');
        const firstFeed = [];

        beforeEach(function(done){ 
            loadFeed(0);
            Array.from(feed.children()).forEach(function(entry) { 
                firstFeed.push(entry.innerText);
            });
            loadFeed(1, done);
        })

        it('Content changes when new feed is loaded', function(){
            Array.from(feed.children()).forEach(function(entry, i){
                console.log(entry);
                expect(entry.innerText === firstFeed[i]).toBe(false);
            })
        })

    })


    /* TODO: Write a new test suite named "New Feed Selection" */

        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
}());

define(["views/draft-view", "services/draft-service"], function (view, service) {
    let externals = {};

    function bindHomeEventHandler() {
        view.bind("buttonHomeClick", buttonHomeHandler);

    }
    function buttonHomeHandler() {

        window.location.hash = "#home";

    }

    externals.start = function () {
        console.log("draft controller");
        bindHomeEventHandler();
        service.startDraftGame("dmu", function (cardlist) {
            view.renderMany(cardlist);
view.renderSidebar(service.getUserPicks());

            $('.card').on('click', function() {
                // Get the card.id of the clicked card
                var cardId = $(this).attr('id');
              
                // Call the callbackFunction with the cardId as an argument
                clickedACard(cardId);
                
              });
            
        });
    }
   function clickedACard(cardId) {
      
            view.renderMany(service.pickCard(cardId));
view.renderSidebar(service.getUserPicks());


            $('.card').on('click', function() {
                // Get the card.id of the clicked card
                var cardId = $(this).attr('id');
              
                // Call the callbackFunction with the cardId as an argument
                clickedACard(cardId);
                
              
    })};

    return externals;
});

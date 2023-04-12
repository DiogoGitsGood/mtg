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
            view.renderMany(cardlist, function (cardId) {
                service.pickCard(cardId, function (cardlist) { 
                    view.renderMany(cardlist) })
            });
        });
    }
    externals.clickedACard = function (cardId) {
        service.pickCard(cardId);
    }

    return externals;
});

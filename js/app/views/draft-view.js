define( function () {
    let externals = {};
    let elements = {};
    let handlers = {};

    function createButton() {
        return "<button id='goBack' style='display:flex; border: 1px solid; margin-top: 30px; margin-left: 200px; margin-right: 30px;'> Go back </button>";
    }

    externals.bind = function (event, handler) {
        handlers[event] = handler;
    };

    function renderButton() {
        if (elements.button) {
            return;
        }
        elements.app.empty();
        elements.button = $(createButton());
        elements.button.click(handlers["buttonHomeClick"]);
        elements.app.append(elements.button);
    }

    externals.render = function (card) {
        if (!elements.app) {
            elements.app = $("#app");
        }

        renderButton(); 

        if (card) {
            renderCard(card);
        }

    };

    function renderCard(card) {
        if (elements.videoCard) {
            elements.videoCard.empty();
        }

        elements.videoCard = $(createCard(card));
        elements.app.append(elements.videoCard);
    }


    function createCard(card) {
        return `<div> 
      <img src="${card.card}"</>
      <p>Name: ${card.name}</p> 
      <p>Flavour: ${card.flavour ? card.flavour : "No flavour available"}</p> 
      <img src="${card.art}"</> 
      </div>`;
    }

    function renderCardList(cardlist, callbackFunction) {

        document.body.style.backgroundImage = `url('https://www.mtgnexus.com/img/gallery/5273-serum-visions.jpg')`;

        if (!elements.videoCard) {
            elements.videoCard = $("<div id='cardList' class='card-container'></div>");
        }

        elements.videoCard.empty();

        if (cardlist && cardlist.length > 0) {
            let cardHtml = "";
            for (let i = 0; i < cardlist.length; i++) {
                let card = cardlist[i];
                cardHtml += `
        <div id =${card.id} class='card'  >
        <img src='${card.card}' />
        </div> `;

            }
            elements.videoCard.html(cardHtml);
        }

 


        elements.app.append(elements.videoCard);

        
    }


externals.renderSidebar = function(sideList) {
    // Create the sideCard element as a div on the right side of the screen
    if (!elements.sideCard) {
        elements.sideCard = $("<div id='sideList' class='side-container'></div>");
        elements.sideCard.css({
             "display": "flex",

            "position": "fixed",
            "top": "0",
            "right": "0",
            "bottom": "0",
            "width": "300px", // Adjust the width to your desired value
            "background-color": "#f8f8f8", // Set the background color of the sidebar
            "padding": "10px", // Add padding for spacing
            "overflow-y": "auto"
 // Add scrollbar if needed
        });
    }

    elements.sideCard.empty();

    if (sideList && sideList.length > 0) {
        let cardHtml = "";
        for (let i = 0; i < sideList.length; i++) {
            let sideCard = sideList[i];
            cardHtml += `
    <div id=${sideCard.id} class='sideCard' style="width: 100%; display: block; position: relative;flex-direction:column;">
                    <div class='cardTitle' style="text-align: center; z-index: 1; color: white; position: absolute; top: 0; left: 0; right: 0; padding: 30px 10px 10px; background-color: rgba(0, 0, 0, 0.5);">${sideCard.name}</div> 
                    <div class="imageContainer" style="width: 100%; height: 100%; overflow: hidden; position: relative;">
                        <img src='${sideCard.art}' style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); height: 100%; object-fit: cover;">
                    </div>
                </div>
 
            `;
        }
        elements.sideCard.html(cardHtml);
    }

    elements.app.append(elements.sideCard);
};







    externals.renderMany = function (cardlist, callbackFunction) {

        if (!elements.app) {
            elements.app = $("#app");
        }

        renderButton();
        console.log("rendermany")
      
        renderCardList(cardlist, callbackFunction);
    };




    return externals;
});

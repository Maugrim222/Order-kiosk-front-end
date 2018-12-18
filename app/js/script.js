var recentOrders = [];

var currentCustomOrder = {
    orderType: 'CUSTOM',
    customName: undefined,
    baseIngredients: [],
    size: undefined,
    ingredients: [],
    extras: [],
    price: undefined,
    orderNumber: undefined
};

var resetCustomOrder = function resetCustomOrder() {
    currentCustomOrder.orderType = 'CUSTOM';
    currentCustomOrder.customName = undefined;
    currentCustomOrder.baseIngredients = [];
    currentCustomOrder.size = undefined;
    currentCustomOrder.ingredients = [];
    currentCustomOrder.extras = [];
    currentCustomOrder.price = undefined;
};


var currentProductOrder = {
    orderType: undefined,
    product: undefined,
    size: undefined,
    price: undefined,
    orderNumber: undefined
};

var resetProductOrder = function resetProductOrder() {
    currentProductOrder.orderType = undefined;
    currentProductOrder.product = undefined;
    currentProductOrder.size = undefined;
    currentProductOrder.price = undefined;
    currentProductOrder.orderNumber = undefined;
};


var getNumberOfIncludedBases = function getNumberOfIncludedBases(order) {
    return 1;
};

var getNumberOfIncludedIngredients = function getNumberOfIncludedIngredients(order) {
    if(order.size === 'SMALL')
        return 2;
    else if(order.size === 'MEDIUM')
        return 3;
    else if(order.size === 'LARGE')
        return 4;
    // otherwise
    return 0;
};

var getNumberOfIncludedExtras = function getNumberOfIncludedExtras(order) {
    if(order.size === 'SMALL' || order.size === 'MEDIUM')
        return 1;
    else if(order.size === 'LARGE')
        return 2;
    // otherwise
    return 0;
};

var currentUserSettings = {
    isLoggedIn: false,
    userName: '',
    language: 'EN'
};

var viewState = {
    state: '',
    showUserSettings: false,
    showUserLogin: false,
    showMenuTopBar: false,
    showMenuFooter: false,
    showRecommendations: false,
    showJuices: false,
    showChooseJuiceType: false,
    showMakeMyOwn: false,
    showChooseCustomSize: false,
    showChooseBase: false,
    showChooseIngredients: false,
    isIngredientsFruitsBerriesExpanded: false,
    isIngredientsVegetablesExpanded: false,
    isIngredientsNutsExpanded: false,
    isIngredientsOthersExpanded: false,
    showChooseExtras: false,
    showConfirmCustom: false,
    showFavorites: false,
    showProductSizeAndConfirm: false,
    showOrderNumber: false,
    showItemSelectionIndicator: false,
    selectedItems: 0,
    availableItems: 0,
    showProgressIndicator: false,
    progressIndicatorSteps: 0,
    progressIndicatorCurStep: 0,
    showBackNextMenu: false,
    showBackButton: false,
    showNextButton: false,
    showBuyButton: false,
    isExactItemSelectionMandatory: false,
    cupSizeUrlSmall: 'images/size_generic_small.png',
    cupSizeUrlMedium: 'images/size_generic_medium.png',
    cupSizeUrlLarge: 'images/size_generic_large.png',
    currentOrder: undefined
};

function resetViewState() {
    viewState.state = '';
    viewState.showUserSettings = false;
    viewState.showUserLogin = false;
    viewState.showMenuTopBar = false;
    viewState.showMenuFooter = false;
    viewState.showRecommendations = false;
    viewState.showJuices = false;
    viewState.showChooseJuiceType = false;
    viewState.showMakeMyOwn = false;
    viewState.showChooseCustomSize = false;
    viewState.showChooseBase = false;
    viewState.showChooseIngredients = false;
    setAllIngredientsExpanded(false);
    viewState.showChooseExtras = false;
    viewState.showConfirmCustom = false;
    viewState.showFavorites = false;
    viewState.showProductSizeAndConfirm = false;
    viewState.showOrderNumber = false;
    viewState.showItemSelectionIndicator = false;
    viewState.selectedItems = 0;
    viewState.availableItems = 0;
    viewState.showProgressIndicator = false;
    viewState.progressIndicatorSteps = 0;
    viewState.progressIndicatorCurStep = 0;
    viewState.showBackNextMenu = false;
    viewState.showBackButton = false;
    viewState.showNextButton = false;
    viewState.showBuyButton = false;
    viewState.isExactItemSelectionMandatory = false;
    viewState.cupSizeUrlSmall = getGenericCupSizeImageSrc('SMALL', false);
    viewState.cupSizeUrlMedium = getGenericCupSizeImageSrc('MEDIUM', false);
    viewState.cupSizeUrlLarge = getGenericCupSizeImageSrc('LARGE', false);
}

var setAllIngredientsExpanded = function setAllIngredientsExpanded(expanded) {
    viewState.isIngredientsFruitsBerriesExpanded = expanded;
    viewState.isIngredientsVegetablesExpanded = expanded;
    viewState.isIngredientsNutsExpanded = expanded;
    viewState.isIngredientsOthersExpanded = expanded;
};


var onClickCancel = function onClickCancel() {
    resetCustomOrder();
    resetProductOrder();
    viewState.currentOrder = undefined;
    goToRecommendations();
};

var onClickSettings = function onClickSettings() {
    console.log('settings');
    if(currentUserSettings.isLoggedIn) {
        goToUserSettings();
    } else {
        goToUserLogin();
    }
};

var goToUserSettings = function goToUserSettings() {
    console.log('goToUserSettings');
    resetViewState();
    viewState.state = 'userSettings';
    viewState.showUserSettings = true;
}

var onClickLogout = function onClickLogout() {
    currentUserSettings.isLoggedIn = false;
    currentUserSettings.userName = '';
    goToUserLogin();
}

var goToUserLogin = function goToUserLogin() {
    console.log('goToUserLogin');
    resetViewState();
    viewState.state = 'userLogin';
    viewState.showUserLogin = true;    
}

var onClickLogin = function onClickLogin() {
    currentUserSettings.isLoggedIn = true;
    goToUserSettings();
}

var toggleLanguage = function toggleLanguage() {
    if(currentUserSettings.language === 'EN')
        currentUserSettings.language = 'SV';
    else if(currentUserSettings.language === 'SV')
        currentUserSettings.language = 'EN';
}

var goToRecommendations = function goToRecommendations() {
    resetViewState();
    viewState.state = 'recommendations';
    viewState.showMenuTopBar = true;
    viewState.showMenuFooter = true;
    viewState.showRecommendations = true;
};

var isNextButtonEnabled = function isNextButtonEnabled() {
    if(viewState.isExactItemSelectionMandatory){
        return viewState.selectedItems === viewState.availableItems;
    } else {
        return viewState.selectedItems <= viewState.availableItems;
    }
};

var getPriceForSize = function getPriceForSize(size) {
    if(size === 'SMALL') return 40;
    else if(size === 'MEDIUM') return 50;
    else if(size === 'LARGE') return 60;
};

// Calculates the additional price, i.e. the price for ingredients with extra cost
var getAdditionalPrice = function getAdditionalPrice(order) {
    if(order.orderType === 'CUSTOM') {
        var additionalPrice = 0;
        for (var i = 0; i < order.baseIngredients.length; i++) {
            additionalPrice += order.baseIngredients[i].price;
        }
        for (var i = 0; i < order.ingredients.length; i++) {
            additionalPrice += order.ingredients[i].price;
        }
        for (var i = 0; i < order.extras.length; i++) {
            additionalPrice += order.extras[i].price;
        }
        return additionalPrice;
    } else {
        return 0;
    }
};

var getPriceForProduct = function getPriceForProduct(product, size) {
    if(!size)
        size = 'SMALL';
    var totalPrice = getPriceForSize(size);
    for (var i = 0; i < product.ingredients.length; i++) {
        totalPrice += product.ingredients[i].price;
    }
    return totalPrice;
}

var getPriceForCustomOrder = function getPriceForCustomOrder(order){
    return getPriceForSize(order.size) + getAdditionalPrice(order);
}

var getPriceForOrder = function getPriceForOrder(order) {
    if(order.orderType === 'CUSTOM') {
        return getPriceForCustomOrder(order);
    } else {
        return getPriceForProduct(order.product, order.size);
    }
}

var isBuyButtonEnabled = function isBuyButtonEnabled() {
    return currentProductOrder.size !== undefined;
};

var onClickBackButton = function onClickBackButton() {
    console.log('going back');
    if(viewState.state === 'userLogin' || viewState.state === 'userSettings')
        goToRecommendations();
    else if(viewState.state === 'recommendedSizeAndConfirm')
        goToRecommendations();
    else if(viewState.state === 'juiceSizeAndConfirm')
        goToJuicesJuiceType();
    else if(viewState.state === 'favoriteSizeAndConfirm')
        goToFavorites();
    else if(viewState.state === 'makeMyOwnChooseBase')
        goToMakeMyOwnDrinkSize();
    else if(viewState.state === 'makeMyOwnChooseIngredients')
        goToMakeMyOwnChooseBase();
    else if(viewState.state === 'makeMyOwnChooseExtras')
        goToMakeMyOwnChooseIngredients();
    else if(viewState.state === 'makeMyOwnConfirm')
        goToMakeMyOwnChooseExtras();
};

var onClickNextButton = function onClickNextButton() {
    if(isNextButtonEnabled()) {
        console.log('going forward');
        console.log('current state', viewState.state);
        if(viewState.state === 'makeMyOwnChooseBase')
            goToMakeMyOwnChooseIngredients();
        else if(viewState.state === 'makeMyOwnChooseIngredients')
            goToMakeMyOwnChooseExtras();
        else if(viewState.state === 'makeMyOwnChooseExtras')
            goToMakeMyOwnConfirm();
    }
};  

var onClickBuyButton = function onClickBuyButton() {
    if(isBuyButtonEnabled()) {
        if(viewState.state === 'juiceSizeAndConfirm')
            console.log('buy juice , TODO');
        else if(viewState.state === 'recommendedSizeAndConfirm')
            console.log('buy recommended product , TODO');
        else if(viewState.state === 'favoriteSizeAndConfirm')
            console.log('buy favorite product , TODO');

        sendOrder(currentProductOrder);
        goToOrderNumber();
    }
};


var onClickMenuJuices = function onClickMenuJuices() {
    goToJuicesJuiceType();
};

var goToJuicesJuiceType = function goToJuicesJuiceType() {
    resetViewState();
    viewState.state = 'juicesChooseJuiceType';
    viewState.showMenuTopBar = true;
    viewState.showMenuFooter = true;
    viewState.showJuices = true;
    viewState.showChooseJuiceType = true;
    viewState.showProgressIndicator = true;
    viewState.progressIndicatorSteps = 2;
    viewState.progressIndicatorCurStep = 1;
};

var onClickSelectJuiceType = function onClickSelectJuiceType(selectedJuice) {
    console.log(selectedJuice.name);
    currentProductOrder.product = selectedJuice;
    currentProductOrder.orderType = 'JUICE';
    goToJuiceSizeAndConfirm();
};

var goToJuiceSizeAndConfirm = function goToJuiceSizeAndConfirm() {
    resetViewState();
    viewState.state = 'juiceSizeAndConfirm';
    viewState.showMenuTopBar = true;
    viewState.showProductSizeAndConfirm = true;
    viewState.showBackNextMenu = true;
    viewState.showBackButton = true;
    viewState.showBuyButton = true;
    viewState.showProgressIndicator = true;
    viewState.progressIndicatorSteps = 2;
    viewState.progressIndicatorCurStep = 2;
};

var onClickSelectRecommendedType = function onClickSelectRecommendedType(selectedProduct) {
    console.log(selectedProduct.name);
    currentProductOrder.product = selectedProduct;
    currentProductOrder.orderType = 'RECOMMENDED';
    goToRecommendedSizeAndConfirm();
};


var goToRecommendedSizeAndConfirm = function goToRecommendedSizeAndConfirm() {
    resetViewState();
    viewState.state = 'recommendedSizeAndConfirm';
    viewState.showMenuTopBar = true;
    viewState.showProductSizeAndConfirm = true;
    viewState.showBackNextMenu = true;
    viewState.showBackButton = true;
    viewState.showBuyButton = true;
    viewState.showProgressIndicator = true;
    viewState.progressIndicatorSteps = 2;
    viewState.progressIndicatorCurStep = 2;
};

var onClickProductSize = function onClickProductSize(size) {
    
    if(currentProductOrder.size === size) {
        console.log('deselect size: ', size);
        currentProductOrder.size = undefined;
    } else {
        console.log('select size: ', size);
        currentProductOrder.size = size;
    }
    viewState.cupSizeUrlSmall = getGenericCupSizeImageSrcForCurrentProductOrder('SMALL');
    viewState.cupSizeUrlMedium = getGenericCupSizeImageSrcForCurrentProductOrder('MEDIUM');
    viewState.cupSizeUrlLarge = getGenericCupSizeImageSrcForCurrentProductOrder('LARGE');
};


var onClickMenuMakeMyOwn = function onClickMenuMakeMyOwn() {
    // TODO give user the possibility to give a custom name, i.e. "Tom's awesome smoothie"
    goToMakeMyOwnDrinkSize();
};

var goToMakeMyOwnDrinkSize = function goToMakeMyOwnDrinkSize() {
    resetViewState();
    viewState.state = 'makeMyOwnDrinkSize';
    viewState.showMenuTopBar = true;
    viewState.showMenuFooter = true;
    viewState.showMakeMyOwn = true;
    viewState.showChooseCustomSize = true;
    viewState.showProgressIndicator = true;
    viewState.progressIndicatorSteps = 5;
    viewState.progressIndicatorCurStep = 1;
};

var onClickCustomDrinkSize = function onClickCustomDrinkSize(size) {
    console.log('select size', size);
    currentCustomOrder.size = size;
    console.log('currentCustomOrder', currentCustomOrder);
    goToMakeMyOwnChooseBase();
};

var goToMakeMyOwnChooseBase = function goToMakeMyOwnChooseBase() {
    resetViewState();
    viewState.state = 'makeMyOwnChooseBase';
    viewState.showMenuTopBar = true;
    viewState.showBackNextMenu = true;
    viewState.showBackButton = true;
    viewState.showNextButton = true;
    viewState.showProgressIndicator = true;
    viewState.progressIndicatorSteps = 5;
    viewState.progressIndicatorCurStep = 2;
    viewState.showMakeMyOwn = true;
    viewState.showChooseBase = true;
    viewState.showItemSelectionIndicator = true;
    viewState.availableItems = 1;
    viewState.selectedItems = currentCustomOrder.baseIngredients.length;
    viewState.isExactItemSelectionMandatory = true;
};

var onClickSelectBaseIngredient = function onClickSelectBaseIngredient(ingredient) {
    
    if(!currentCustomOrder.baseIngredients.includes(ingredient)) { // add the ingredient
        if(currentCustomOrder.baseIngredients.length < getNumberOfIncludedBases(currentCustomOrder)) {
            console.log('select ingredient', ingredient);
            currentCustomOrder.baseIngredients.push(ingredient);
            viewState.selectedItems++;
        } else {
            if(getNumberOfIncludedBases(currentCustomOrder) === 1) {
                console.log('deselect ingredient');
                currentCustomOrder.baseIngredients = [];
                viewState.selectedItems--;
                console.log('select ingredient', ingredient);
                currentCustomOrder.baseIngredients.push(ingredient);
                viewState.selectedItems++;
            } else {
                console.log('cannot select any more ingredients');
            }
        }
    } else { // remove the ingredient
        console.log('deselect ingredient');
        currentCustomOrder.baseIngredients = currentCustomOrder.baseIngredients.filter(item => item !== ingredient);
        viewState.selectedItems--;
    }
    updateOrderPrice(currentCustomOrder);
    console.log('current baseIngredients', currentCustomOrder.baseIngredients);

    // if(currentCustomOrder.base === ingredient) {
    //     console.log('deselect base: ', ingredient);
    //     currentCustomOrder.baseIngredients = undefined;
    //     viewState.selectedItems = 0;
    // } else {
    //     console.log('select base: ', ingredient);
    //     currentCustomOrder.base = ingredient;
    //     viewState.selectedItems = 1;
    // }
    // updateOrderPrice(currentCustomOrder);
    // console.log('currentCustomOrder', currentCustomOrder);
};

var goToMakeMyOwnChooseIngredients = function goToMakeMyOwnChooseIngredients() {
    resetViewState();
    viewState.state = 'makeMyOwnChooseIngredients';
    viewState.showMenuTopBar = true;
    viewState.showBackNextMenu = true;
    viewState.showBackButton = true;
    viewState.showNextButton = true;
    viewState.showProgressIndicator = true;
    viewState.progressIndicatorSteps = 5;
    viewState.progressIndicatorCurStep = 3;
    viewState.showMakeMyOwn = true;
    viewState.showChooseIngredients = true;
    viewState.showItemSelectionIndicator = true;

    viewState.availableItems = getNumberOfIncludedIngredients(currentCustomOrder);

    if(currentCustomOrder.ingredients)
        viewState.selectedItems = currentCustomOrder.ingredients.length;
    else
        viewState.selectedItems = 0;

    viewState.isExactItemSelectionMandatory = false;
};

var getExpandCollapseButtonSrc = function getExpandCollapseButtonSrc(category) {
    var isExpanded = false;
    
    if (category === 'fruitsBerries' && viewState.isIngredientsFruitsBerriesExpanded)
        isExpanded = true;
    else if (category === 'vegetables' && viewState.isIngredientsVegetablesExpanded)
        isExpanded = true;
    else if (category === 'nuts' && viewState.isIngredientsNutsExpanded)
        isExpanded = true;
    else if (category === 'others' && viewState.isIngredientsOthersExpanded)
        isExpanded = true;

    if(isExpanded)
        return 'images/collapse-button.png';
    else
        return 'images/expand-button.png'
};

var onClickExpandCollapseIngredients = function onClickExpandCollapseIngredients(category) {
    if (category === 'fruitsBerries')
        toggleIngredientsFruitsBerries();
    else if (category === 'vegetables')
        toggleIngredientsVegetables();
    else if (category === 'nuts')
        toggleIngredientsNuts();
    else if (category === 'others')
        toggleIngredientsOthers();
};

var toggleIngredientsFruitsBerries = function toggleIngredientsFruitsBerries() {
    var previousState = viewState.isIngredientsFruitsBerriesExpanded;
    setAllIngredientsExpanded(false);
    viewState.isIngredientsFruitsBerriesExpanded = !previousState;
};

var toggleIngredientsVegetables = function toggleIngredientsVegetables() {
    var previousState = viewState.isIngredientsVegetablesExpanded;
    setAllIngredientsExpanded(false);
    viewState.isIngredientsVegetablesExpanded = !previousState;
};

var toggleIngredientsNuts = function toggleIngredientsNuts() {
    var previousState = viewState.isIngredientsNutsExpanded;
    setAllIngredientsExpanded(false);
    viewState.isIngredientsNutsExpanded = !previousState;
};

var toggleIngredientsOthers = function toggleIngredientsOthers() {
    var previousState = viewState.isIngredientsOthersExpanded;
    setAllIngredientsExpanded(false);
    viewState.isIngredientsOthersExpanded = !previousState;
};

var onClickSelectIngredient = function onClickSelectIngredient(ingredient) {
    if(!currentCustomOrder.ingredients.includes(ingredient)) { // add the ingredient
        if(currentCustomOrder.ingredients.length < getNumberOfIncludedIngredients(currentCustomOrder)) {
            console.log('select ingredient', ingredient);
            currentCustomOrder.ingredients.push(ingredient);
            viewState.selectedItems++;
        } else {
            console.log('cannot select any more ingredients');
        }
    } else { // remove the ingredient
        console.log('deselect ingredient');
        currentCustomOrder.ingredients = currentCustomOrder.ingredients.filter(item => item !== ingredient);
        viewState.selectedItems--;
    }
    updateOrderPrice(currentCustomOrder);
    console.log('current ingredients', currentCustomOrder.ingredients);
};

var goToMakeMyOwnChooseExtras = function goToMakeMyOwnChooseExtras() {
    resetViewState();
    viewState.state = 'makeMyOwnChooseExtras';
    viewState.showMenuTopBar = true;
    viewState.showBackNextMenu = true;
    viewState.showBackButton = true;
    viewState.showNextButton = true;
    viewState.showProgressIndicator = true;
    viewState.progressIndicatorSteps = 5;
    viewState.progressIndicatorCurStep = 4;
    viewState.showMakeMyOwn = true;
    viewState.showChooseExtras = true;
    viewState.showItemSelectionIndicator = true;

    viewState.availableItems = getNumberOfIncludedExtras(currentCustomOrder);

    if(currentCustomOrder.extras)
        viewState.selectedItems = currentCustomOrder.extras.length;
    else
        viewState.selectedItems = 0;
};

var onClickSelectExtrasIngredient = function onClickSelectExtrasIngredient(ingredient) {
    if(!currentCustomOrder.extras.includes(ingredient)) { // add the ingredient
        if(currentCustomOrder.extras.length < getNumberOfIncludedExtras(currentCustomOrder)) {
            console.log('select extra', ingredient);
            currentCustomOrder.extras.push(ingredient);
            viewState.selectedItems++;
        } else {
            if(getNumberOfIncludedExtras(currentCustomOrder) === 1) {
                console.log('deselect ingredient');
                currentCustomOrder.extras = [];
                viewState.selectedItems--;
                console.log('select ingredient', ingredient);
                currentCustomOrder.extras.push(ingredient);
                viewState.selectedItems++;
            } else {
                console.log('cannot select any more ingredients');
            }
        }
    } else { // remove the ingredient
        console.log('deselect extras');
        currentCustomOrder.extras = currentCustomOrder.extras.filter(item => item !== ingredient);
        viewState.selectedItems--;
    }
    updateOrderPrice(currentCustomOrder);
    console.log('current extras', currentCustomOrder.extras);
};

var goToMakeMyOwnConfirm = function goToMakeMyOwnConfirm() {
    resetViewState();
    viewState.state = 'makeMyOwnConfirm';
    viewState.showMenuTopBar = true;
    viewState.showBackNextMenu = true;
    viewState.showBackButton = true;
    viewState.showProgressIndicator = true;
    viewState.progressIndicatorSteps = 5;
    viewState.progressIndicatorCurStep = 5;
    viewState.showMakeMyOwn = true;
    viewState.showConfirmCustom = true;
};

var onClickMenuMyFavorites = function onClickMenuMyFavorites() {
    goToFavorites();
};

var goToFavorites = function goToFavorites() {
    resetViewState();
    viewState.state = 'favorites';
    viewState.showMenuTopBar = true;
    viewState.showMenuFooter = true;
    viewState.showFavorites = true;
    viewState.showProgressIndicator = true;
    viewState.progressIndicatorSteps = 2;
    viewState.progressIndicatorCurStep = 1;
};

var onClickSelectFavoriteType = function onClickSelectFavoriteType(favorite) {
    console.log(favorite.name);
    currentProductOrder.product = favorite;
    currentProductOrder.orderType = 'FAVORITE';
    goToFavoriteSizeAndConfirm();
};

var goToFavoriteSizeAndConfirm = function goToFavoriteSizeAndConfirm() {
    resetViewState();
    viewState.state = 'favoriteSizeAndConfirm';
    viewState.showMenuTopBar = true;
    viewState.showProductSizeAndConfirm = true;
    viewState.showBackNextMenu = true;
    viewState.showBackButton = true;
    viewState.showBuyButton = true;
    viewState.showProgressIndicator = true;
    viewState.progressIndicatorSteps = 2;
    viewState.progressIndicatorCurStep = 2;
}

var getCustomCupSizeImageSrc = function getCustomCupSizeImageSrc(size, cropped) {
    if(cropped === undefined)
        cropped = false;
    
    if(cropped)
        return 'images/size_custom_' + size + '_cropped.png';
    else 
        return 'images/size_custom_' + size + '.png';
};

var getCutomCupSizeImageSrcForCurrentOrder = function getCustomCupSizeImageSrcForCurrentOrder(){
    return getCustomCupSizeImageSrc(currentCustomOrder.size, true);
};

var getGenericCupSizeImageSrc = function getGenericCupSizeImageSrc(size, selected) {
    if(selected === undefined)
        selected = false;

    if(selected)
        return 'images/size_generic_' + size + '_selected.png';
    else
        return 'images/size_generic_' + size + '.png';
};

var getGenericCupSizeImageSrcForCurrentProductOrder = function getGenericCupSizeImageSrcForCurrentProductOrder(size) {
    if(currentProductOrder.size === size) {
        return getGenericCupSizeImageSrc(size, true);
    } else {
        return getGenericCupSizeImageSrc(size, false);
    }
};

var onClickConfirmCustomBuyNow = function onClickConfirmCustomBuyNow() {
    var orderNumber = sendOrder(currentCustomOrder);
    goToOrderNumber();
};

var sendOrder = function sendOrder(order){

    updateOrderPrice(order);

    // TODO send to server
    console.log('TODO send order to server: ', order)

    var orderClone = JSON.parse(JSON.stringify(order));
    recentOrders.push(orderClone);
    viewState.currentOrder = order;
    
    // TODO: mockup for a random order number for now, should come from the backend at some point
    order.orderNumber = Math.floor(Math.random() * 100);
    return order.orderNumber;
};

// Updates the price of the order, based on the selected size and the ingredients with extra cost (for custom drinks)
var updateOrderPrice = function updateOrderPrice(order) {
    order.price = getPriceForOrder(order);
};

var goToOrderNumber = function goToOrderNumber() {
    resetViewState();
    viewState.state = 'orderNumber';
    viewState.showMenuTopBar = true;
    viewState.showOrderNumber = true;
};


var getFavorites = function getFavorites() {
    var orderHistory = recentOrders.slice(-6);
    var favorites = [];
    for (var i = 0; i < orderHistory.length; i++) {
        var curOrder = orderHistory[i];
        var favorite = {
            name: undefined,
            price: 0,
            ingredients: [],
            imgUrl: undefined
        };
        if(curOrder.orderType === 'CUSTOM') {
            favorite.name = curOrder.customName;
            // Display the price for the drink in a small size, not the size that was actually ordered last time
            favorite.price = getPriceForSize('SMALL') + getAdditionalPrice(curOrder);
            favorite.ingredients = curOrder.baseIngredients.concat(curOrder.ingredients, curOrder.extras);
            // for (var i = 0; i < curOrder.baseIngredients.length; i++) {
            //     favorite.ingredients.push(curOrder.baseIngredients[i].name);
            // }
            // for (var i = 0; i < curOrder.ingredients.length; i++) {
            //     favorite.ingredients.push(curOrder.ingredients[i].name);
            // }
            // for (var i = 0; i < curOrder.extras.length; i++) {
            //     favorite.ingredients.push(curOrder.extras[i].name);
            // }
            favorite.imgUrl = getCustomCupSizeImageSrc('MEDIUM', true);
        } else if (curOrder.orderType === 'JUICE' || curOrder.orderType === 'RECOMMENDED') {
            favorite.name = curOrder.product.name;
            // Display the price for the drink in a small size, not the size that was actually ordered last time
            favorite.price += getPriceForSize('SMALL');
            favorite.ingredients = curOrder.product.ingredients;
            favorite.imgUrl = curOrder.product.imgUrl;
        } else if(curOrder.orderType === 'FAVORITE') {
            favorite.name = curOrder.product.name;
            favorite.price = curOrder.product.price;
            favorite.ingredients = curOrder.product.ingredients;
            favorite.imgUrl = curOrder.product.imgUrl;
        }
        favorites.push(favorite);
    }
    return favorites;
};


Vue.component('productPreview', {
    props: {
        product: Object,
        selectableCategory: {
            type: Array,
            default: undefined,
            required: false
        },
        isExtraPrice: {
            type: Boolean,
            default: false,
            required: false
        }

    },
    data: function() {
        return {currentCustomOrder: currentCustomOrder};
    },
    computed: {
        showPrice: function() {
            return this.product.price && this.product.price > 0;
        },
        priceForProduct: function() {
            return getPriceForProduct(this.product, 'SMALL');
        }
    },
    // template: '<div>{{product.name}}</div>'
    template: '<div class="grid-item product-preview" v-bind:class="{selected: selectableCategory.includes(product)}" v-if="selectableCategory">\
                    <img class="product-preview-img" v-bind:src="product.img">\
                    <span class="product-preview-price has-extra-price" v-if="isExtraPrice && showPrice">+{{product.price}} kr</span>\
                    <span class="product-preview-price" v-if="!isExtraPrice && showPrice">{{priceForProduct}} kr</span>\
                    <div class="product-preview-name">{{product.name | translate}}</div>\
                </div>\
                <div class="grid-item product-preview" v-else>\
                    <img class="product-preview-img" v-bind:src="product.img">\
                    <span class="product-preview-price has-extra-price" v-if="isExtraPrice && showPrice">+{{product.price}} kr</span>\
                    <span class="product-preview-price" v-if="!isExtraPrice && showPrice">{{priceForProduct}} kr</span>\
                    <div class="product-preview-name">{{product.name  | translate}}</div>\
                </div>'
});

Vue.component('productPreviewList', {
    props: {
        productList: Array,
        selectableCategory: {
            type: Array,
            default: undefined,
            required: false
        },
        isExtraPrice: {
            type: Boolean,
            default: false,
            required: false
        }
    },
    methods: {
        onClickProduct: function onClickProduct(product) {
            console.log('emit event');
            this.$emit('clickproduct', product);
        }
    },
    template: '<div class="grid-container">\
                    <product-preview v-bind:product="product" v-bind:selectable-category="selectableCategory" v-bind:is-extra-price="isExtraPrice" v-for="product in productList" :key="product.name" v-on:click.native="onClickProduct(product)"></product-preview>\
                </div>'
});

Vue.component('cup-size', {
    props: ['size'],
    methods:{
        getCustomCupSizeImageSrc: function (){
            // use the uncropped version of the images, so that the small image actually looks smaller, but still takes the same amount of space (results in more whitespace)
            return getCustomCupSizeImageSrc(this.size, false);
        }
    },
    computed: {
        fluidContent: function() {
            if(this.size === 'SMALL')
                return 200;
            else if(this.size === 'MEDIUM')
                return 300;
            else if(this.size === 'LARGE')
                return 400;
        },
        price: function() {
            if(this.size === 'SMALL')
                return 40;
            else if(this.size === 'MEDIUM')
                return 50;
            else if(this.size === 'LARGE')
                return 60;  
        },
        includedBases: function() {
            if(this.size === 'SMALL')
                return 1;
            else if(this.size === 'MEDIUM')
                return 1;
            else if(this.size === 'LARGE')
                return 1;  
        },
        includedIngredients: function() {
            if(this.size === 'SMALL')
                return 2;
            else if(this.size === 'MEDIUM')
                return 3;
            else if(this.size === 'LARGE')
                return 4;  
        },
        includedExtras: function() {
            if(this.size === 'SMALL')
                return 1;
            else if(this.size === 'MEDIUM')
                return 1;
            else if(this.size === 'LARGE')
                return 2;
        },
        isSmall: function() {
            return this.size === 'SMALL';
        },
        isMedium: function() {
            return this.size === 'MEDIUM';
        },
        isLarge: function() {
            return this.size === 'LARGE';
        }


    },
    template: '<div class="size-container">\
                    <div class="size-metrics-container">\
                        <span>{{size}}</span>\
                        <span>{{fluidContent}} ml</span>\
                        <span>{{price}} kr</span>\
                    </div>\
                    <img class="cup-size" v-bind:src="getCustomCupSizeImageSrc()">\
                    <div class="size-content-container">\
                        <span class="extras">{{includedExtras}} extra</span>\
                        <span class="ingredients">{{includedIngredients}} ingredients</span>\
                        <span class="base">{{includedBases}} base</span>\
                    </div>\
                </div>'
});

Vue.filter('capitalize', function (value) {
  if (!value) return '';
  value = value.toString()
  return value.charAt(0).toUpperCase() + value.slice(1)
});


new Vue({
    el: '#main-container',
    data: {
        viewState: viewState,      
        recommendedProducts: recommendedProducts,
        juices: juices,
        currentCustomOrder: currentCustomOrder,
        currentProductOrder: currentProductOrder,
        currentUserSettings: currentUserSettings
    },
    methods: {
        onClickCancel: onClickCancel,
        onClickSettings: onClickSettings,
        onClickLogin: onClickLogin,
        toggleLanguage: toggleLanguage,
        onClickLogout: onClickLogout,
        onClickBackButton: onClickBackButton,
        onClickNextButton: onClickNextButton,
        onClickBuyButton: onClickBuyButton,
        onClickSelectRecommendedType: onClickSelectRecommendedType,
        onClickMenuJuices: onClickMenuJuices,
        onClickSelectJuiceType: onClickSelectJuiceType,
        onClickMenuMyFavorites: onClickMenuMyFavorites,
        onClickSelectFavoriteType: onClickSelectFavoriteType,
        onClickMenuMakeMyOwn: onClickMenuMakeMyOwn,
        onClickCustomDrinkSize: onClickCustomDrinkSize,
        onClickSelectBaseIngredient: onClickSelectBaseIngredient,
        onClickExpandCollapseIngredients: onClickExpandCollapseIngredients,
        onClickSelectIngredient: onClickSelectIngredient,
        onClickSelectExtrasIngredient: onClickSelectExtrasIngredient,
        onClickConfirmCustomBuyNow: onClickConfirmCustomBuyNow,
        onClickProductSize: onClickProductSize,
        isNextButtonEnabled: isNextButtonEnabled,
        isBuyButtonEnabled: isBuyButtonEnabled,
        getExpandCollapseButtonSrc: getExpandCollapseButtonSrc,
        getCutomCupSizeImageSrcForCurrentOrder: getCutomCupSizeImageSrcForCurrentOrder,
        getGenericCupSizeImageSrcForCurrentProductOrder: getGenericCupSizeImageSrcForCurrentProductOrder,
        getFavorites: getFavorites,
        getPriceForProduct: getPriceForProduct

    },
    computed: {
        baseIngredients: function() {
            return ingredients.filter(function(ingredient) {
                return ingredient.categories.includes('base');
            });
        },
        fruitsBerriesIngredients: function() {
            return ingredients.filter(function(ingredient) {
                return ingredient.categories.includes('fruitsBerries');
            });
        },
        vegetablesIngredients: function() {
            return ingredients.filter(function(ingredient) {
                return ingredient.categories.includes('vegetables');
            });
        },
        nutsIngredients: function() {
            return ingredients.filter(function(ingredient) {
                return ingredient.categories.includes('nuts');
            });
        },
        othersIngredients: function() {
            return ingredients.filter(function(ingredient) {
                return ingredient.categories.includes('others');
            });
        },
        extrasIngredients: function() {
            return ingredients.filter(function(ingredient) {
                return ingredient.categories.includes('extras');
            });
        }
    }
});

// currentCustomOrder.size = 'MEDIUM';
// currentCustomOrder.base = ingredients[0];
// currentCustomOrder.ingredients = [ingredients[1], ingredients[2], ingredients[3]];
// currentCustomOrder.extras = [ingredients[9]];
// goToMakeMyOwnChooseIngredients();

// goToMakeMyOwnDrinkSize();

// goToMakeMyOwnConfirm();

goToRecommendations();
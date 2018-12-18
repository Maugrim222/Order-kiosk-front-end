var currentCustomOrder = {
    orderType: 'CUSTOM',
    productName: undefined,
    base: undefined,
    size: undefined,
    ingredients: [],
    extras: [],
    price: undefined,
    orderNumber: undefined
};

var resetCustomOrder = function resetCustomOrder() {
    currentCustomOrder.orderType = 'CUSTOM';
    currentCustomOrder.productName = undefined;
    currentCustomOrder.base = undefined;
    currentCustomOrder.size = undefined;
    currentCustomOrder.ingredients = [];
    currentCustomOrder.extras = [];
    currentCustomOrder.price = undefined;
}


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
}

var currentUserSettings = {
    isLoggedIn: false,
    userName: '',
    language: 'EN'
};

var viewState = {
    state: 'recommendation',
    showStartingScreen : true,
    showOverviewScreen : false,
    showTopBar : false,
    progressIndicatorSteps: 0,
    progressIndicatorCurStep: 0,
    progressIndicatorSteps: 0,
    showProductSize:false,
    cupSizeUrlSmall: 'images/size_generic_small.png',
    cupSizeUrlMedium: 'images/size_generic_medium.png',
    cupSizeUrlLarge: 'images/size_generic_large.png',
    cupSizeCustomUrlSmall: 'images/size-customer-small',
    cupSizeCustomUrlMedium: 'images/size-customer-medium',
    cupSizeCustomUrlLarge: 'images/size-customer-large',
    showBackNextMenu:false,
    showBackButton: false,
    showNextButton:false,
    showBuyButton:false,
    showConfirmRecommended:false,
    showJuices: false,
    showChooseJuiceType: false,
    showChooseCustomSize:false,
    showMakeMyOwn:false,
    showProductSizeCustom:false,
    showOrderNumber:false,
    showChooseBase : false,
    showItemSelectionIndicator : false,
    availableItems : 0,
    selectedItems :0,
    isExactItemSelectionMandatory:false,
};

function resetViewState() {
    viewState.state = '';
    viewState.showStartingScreen = false;
    viewState.showOverviewScreen = false;
    viewState.showTopBar = false;
    viewState.progressIndicatorSteps = 0;
    viewState.progressIndicatorCurStep = 0;
    viewState.showProductSize=false;
    viewState.progressIndicatorSteps = 0;
    viewState.cupSizeUrlSmall = getGenericCupSizeImageSrc('small', false);
    viewState.cupSizeUrlMedium = getGenericCupSizeImageSrc('medium', false);
    viewState.cupSizeUrlLarge = getGenericCupSizeImageSrc('large', false); 
    viewState.cupSizeCustomUrlSmall = getCustomCupSizeImageSrc('small', false);
    viewState.cupSizeCustomUrlMedium = getCustomCupSizeImageSrc('medium', false);
    viewState.cupSizeCustomUrlLarge = getCustomCupSizeImageSrc('large', false);
    viewState.showBackNextMenu=false;
    viewState.showBackButton= false;
    viewState.showNextButton=false;
    viewState.showBuyButton=false;
    viewState.showConfirmRecommended=false;
    viewState.showChooseJuiceType=false;
    viewState.showJuices=false;
    viewState.showChooseCustomSize=false;
    viewState.showMakeMyOwn=false;
    viewState.showProductSizeCustom=false;
    viewState.showOrderNumber=false;
    viewState.showChooseBase = false;
    viewState.showItemSelectionIndicator = false;
    viewState.availableItems = 0;
    viewState.selectedItems = 0;
    viewState.isExactItemSelectionMandatory = false;
}

var onClickStartingScreen = function onClickStartingScreen(){
    resetViewState();
    viewState.state = 'recommendations';
    viewState.showOverviewScreen = true;
} 

var goToRecommendedSize = function goToRecommendedSize() {
    resetViewState();
    viewState.state = 'recommendedSize';
    console.log(viewState.state);
    viewState.showProductSize = true;
    viewState.showTopBar = true;
    viewState.showBackButton = true;
    viewState.showNextButton = true; 
    viewState.showBackNextMenu = true;
    viewState.progressIndicatorSteps = 2;
    viewState.progressIndicatorCurStep = 1; 
}

var goToConfirmRecommended = function goToConfirmRecommended(){
    resetViewState();
    viewState.state = 'confirmRecommended';
    viewState.showConfirmRecommended = true;
    viewState.showTopBar = true;
    viewState.showBackButton = true;
    viewState.showBuyButton = true; 
    viewState.showBackNextMenu = true;
    viewState.progressIndicatorSteps = 2;
    viewState.progressIndicatorCurStep = 2;
}

var onClickSelectRecommendedType = function onClickSelectRecommendedType(selectedProduct) {
    currentProductOrder.product = selectedProduct;
    console.log(currentProductOrder.product);
    
    currentProductOrder.orderType = 'RECOMMENDED';
    goToRecommendedSize(); 
}

var getGenericCupSizeImageSrcForCurrentProductOrder = function getGenericCupSizeImageSrcForCurrentProductOrder(size) {
    if(currentProductOrder.size === size) {
        return getGenericCupSizeImageSrc(size, true);
    } else {
        return getGenericCupSizeImageSrc(size, false);
    }
}

var getGenericCupSizeImageSrc = function getGenericCupSizeImageSrc(size, selected) {
    if(selected === undefined)
        selected = false;

    if(selected)
        return 'images/size_generic_' + size + '_selected.png';
    else
        return 'images/size_generic_' + size + '.png';    
}

var onClickProductSize = function onClickProductSize(size) {
    
    if(currentProductOrder.size === size) {
        console.log('deselect size: ', size);
        currentProductOrder.size = undefined;
    } 
    else {
        console.log('select size: ', size);
        currentProductOrder.size = size;
    }
    viewState.cupSizeUrlSmall = getGenericCupSizeImageSrcForCurrentProductOrder('small');
    viewState.cupSizeUrlMedium = getGenericCupSizeImageSrcForCurrentProductOrder('medium');
    viewState.cupSizeUrlLarge = getGenericCupSizeImageSrcForCurrentProductOrder('large'); 
}

var getCustomCupSizeImageSrc = function getCustomCupSizeImageSrc(size, selected) {
    if(selected === undefined)
        selected = false;

    if(selected)
        return 'images/size-customer-' + size + '-selected.png';
    else
        return 'images/size-customer-' + size + '.png';
}

var getCustomCupSizeImageSrcForCurrentProductOrder = function getCustomCupSizeImageSrcForCurrentProductOrder(size) {
    if(currentCustomOrder.size === size) {
        return getCustomCupSizeImageSrc(size, true);
    } else {
        return getCustomCupSizeImageSrc(size, false);
    }
}

var onClickCustomSize = function onClickCustomSize(size) {
    
    if(currentCustomOrder.size === size) {
        console.log('deselect size: ', size);
        currentCustomOrder.size = undefined;
    } 
    else {
        console.log('select size: ', size);
        currentCustomOrder.size = size;
        console.log(currentCustomOrder.size);
    }
    viewState.cupSizeCustomUrlSmall = getCustomCupSizeImageSrcForCurrentProductOrder('small');
    viewState.cupSizeCustomUrlMedium = getCustomCupSizeImageSrcForCurrentProductOrder('medium');
    viewState.cupSizeCustomUrlLarge = getCustomCupSizeImageSrcForCurrentProductOrder('large'); 
}

var onClickMenuJuices = function onClickMenuJuices() {
    goToJuicesJuiceType();
}

var goToJuicesJuiceType = function goToJuicesJuiceType() {
    resetViewState();
    viewState.state = 'juicesChooseJuiceType';
    viewState.showMenuFooter = true;
    viewState.showJuices = true;
    viewState.showChooseJuiceType = true;
    viewState.showProgressIndicator = true;
    viewState.showBackNextMenu = true;
    viewState.showBackButton = true;
    viewState.showTopBar =true;
    viewState.progressIndicatorSteps = 2;
    viewState.progressIndicatorCurStep = 1;
}

var onClickSelectJuiceType = function onClickSelectJuiceType(selectedJuice) {
    console.log(selectedJuice.name);
    currentProductOrder.product = selectedJuice;
    currentProductOrder.orderType = 'JUICE';
    goToJuiceSize();
}

var goToJuiceSize = function goToJuiceSize() {
    resetViewState();
    viewState.state = 'juiceSize';
    viewState.showTopBar = true;
    viewState.showProductSize = true;
    viewState.showBackNextMenu = true;
    viewState.showNextButton = true;
    viewState.showBackButton = true;
    viewState.progressIndicatorSteps = 2;
    viewState.progressIndicatorCurStep = 1;
}

var goToOrderNumber = function goToOrderNumber() {
    resetViewState();
    viewState.state = 'orderNumber';
    viewState.showOrderNumber = true;
};

var onClickMakeMyOwn = function onClickMakeMyOwn(){
    resetViewState();
    viewState.state = 'customSize';
    console.log(viewState.state);
    viewState.showProductSizeCustom =true;
    viewState.showMakeMyOwn=true;
    viewState.showBackNextMenu = true;
    viewState.showNextButton = true;
    viewState.showBackButton = true;
    viewState.showTopBar = true;
    viewState.progressIndicatorSteps = 5;
    viewState.progressIndicatorCurStep = 1;

}

var goToMakeMyOwnChooseBase = function goToMakeMyOwnChooseBase(){
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


var isNextButtonEnabled = function isNextButtonEnabled() {
    if(viewState.sate === 'recommendedSize' || viewState.state === 'juiceSize'){
        return currentProductOrder.size !== undefined;
    }
    else {
        return currentCustomOrder.size !== undefined;
    }
}


var onClickNextButton = function onClickNextButton(){
    if(isNextButtonEnabled()){
        if(viewState.state === 'recommendedSize' || viewState.state === 'juiceSize'){
            goToConfirmRecommended();
        }
        if(viewState.state === 'customSize')
            goToMakeMyOwnChooseBase();
    }

}

var onClickBackButton = function onClickBackButton() {
    console.log('going forward');
    console.log('current state', viewState.state);
    if(viewState.state === 'recommendedSize'){
         onClickStartingScreen();
         currentProductOrder.size=undefined;
     }
    else if(viewState.state ==='confirmRecommended'){
        onClickSelectRecommendedType(currentProductOrder.product);
        viewState.cupSizeUrlSmall = getGenericCupSizeImageSrcForCurrentProductOrder('small');
        viewState.cupSizeUrlMedium = getGenericCupSizeImageSrcForCurrentProductOrder('medium');
        viewState.cupSizeUrlLarge = getGenericCupSizeImageSrcForCurrentProductOrder('large');      
    } 
    else if(viewState.state ==='juicesChooseJuiceType'){
        onClickStartingScreen();
    }
    else if (viewState.state==='juiceSize'){
        onClickMenuJuices();
    }    
}

var onClickBuyButton = function onClickBuyButton() {
        if(viewState.state === 'confirmRecommended')
            console.log('buy juice , TODO');
        
        sendOrder(currentProductOrder);
        goToOrderNumber();
};

var onClickCancelButton = function onClickCancelButton(){
    resetViewState();
    onClickStartingScreen();
    resetProductOrder();
    resetCustomOrder();
}

var getPriceForSize = function getPriceForSize(size) {
    if(size === 'small') return 40;
    else if(size === 'medium') return 50;
    else if(size === 'large') return 60;
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
        size = 'small';
    var totalPrice = getPriceForSize(size);
    for (var i = 0; i < product.ingredients.length; i++) {
        totalPrice += product.ingredients[i].price;
    }
    return totalPrice;
}

var updateOrderPrice = function updateOrderPrice(order) {
    order.price = getPriceForOrder(order);
};

var getPriceForOrder = function getPriceForOrder(order) {
    
    // TODO: for custom

        return getPriceForProduct(order.product, order.size);
}

var sendOrder = function sendOrder(order){

    updateOrderPrice(order);

    // TODO send to server
    console.log('TODO send order to server: ', order)

    var orderClone = JSON.parse(JSON.stringify(order));
    //recentOrders.push(orderClone);
    viewState.currentOrder = order;
    
    // TODO: mockup for a random order number for now, should come from the backend at some point
    order.orderNumber = Math.floor(Math.random() * 100);
    return order.orderNumber;
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

new Vue({
    el: '#main',
    data: {    
        viewState:viewState,  
        recommendedProducts: recommendedProducts,
        currentProductOrder:currentProductOrder,
        currentCustomOrder:currentCustomOrder,
        juices:juices,
        ingredients:ingredients,
    },
    methods: {
        onClickStartingScreen:onClickStartingScreen,
        onClickSelectRecommendedType: onClickSelectRecommendedType,
        onClickNextButton:onClickNextButton,
        getGenericCupSizeImageSrcForCurrentProductOrder:getGenericCupSizeImageSrcForCurrentProductOrder,
        onClickProductSize:onClickProductSize,
        isNextButtonEnabled:isNextButtonEnabled,
        onClickBackButton:onClickBackButton,
        onClickCancelButton:onClickCancelButton,
        onClickMenuJuices:onClickMenuJuices,
        onClickSelectJuiceType:onClickSelectJuiceType,
        onClickBuyButton:onClickBuyButton,
        onClickMakeMyOwn:onClickMakeMyOwn,
        onClickCustomSize:onClickCustomSize,
        getCustomCupSizeImageSrcForCurrentProductOrder:getCustomCupSizeImageSrcForCurrentProductOrder,
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



/*goToJuicesJuiceType:goToJuicesJuiceType,
 goToJuiceSize:goToJuiceSize, */
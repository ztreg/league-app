(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! E:\examen\league-app\league-client-v2\src\main.ts */"zUnb");


/***/ }),

/***/ "0hFq":
/*!***************************************************!*\
  !*** ./src/app/services/general-utils.service.ts ***!
  \***************************************************/
/*! exports provided: emblemsEnum, GeneralUtilsService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "emblemsEnum", function() { return emblemsEnum; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GeneralUtilsService", function() { return GeneralUtilsService; });
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _store_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./store.service */ "MtBC");



var ranks;
(function (ranks) {
    ranks[ranks["CHALLENGER"] = 1] = "CHALLENGER";
    ranks[ranks["GRANDMASTER"] = 2] = "GRANDMASTER";
    ranks[ranks["MASTER"] = 3] = "MASTER";
    ranks[ranks["DIAMOND"] = 4] = "DIAMOND";
    ranks[ranks["PLATINUM"] = 5] = "PLATINUM";
    ranks[ranks["GOLD"] = 6] = "GOLD";
    ranks[ranks["SILVER"] = 7] = "SILVER";
    ranks[ranks["BRONZE"] = 8] = "BRONZE";
    ranks[ranks["UNRANKED"] = 9] = "UNRANKED";
})(ranks || (ranks = {}));
var emblemsEnum;
(function (emblemsEnum) {
    emblemsEnum["MASTER"] = "../../assets/images/Emblem_Master.png";
    emblemsEnum["DIAMOND"] = "../../assets/images/Emblem_Diamond.png";
    emblemsEnum["PLATINUM"] = "../../assets/images/Emblem_Platinum.png";
    emblemsEnum["GOLD"] = "../../assets/images/Emblem_Gold.png";
    emblemsEnum["SILVER"] = "../../assets/images/Emblem_Silver.png";
    emblemsEnum["BRONZE"] = "../../assets/images/Emblem_Bronze.png";
})(emblemsEnum || (emblemsEnum = {}));
var division;
(function (division) {
    division[division["I"] = 1] = "I";
    division[division["II"] = 2] = "II";
    division[division["III"] = 3] = "III";
    division[division["IV"] = 4] = "IV";
    division[division["V"] = 5] = "V";
})(division || (division = {}));
class GeneralUtilsService {
    constructor(store) {
        this.store = store;
        this.itemImageUrl = 'https://ddragon.leagueoflegends.com/cdn/11.9.1/img/item/';
        this.championImageUrl = 'https://ddragon.leagueoflegends.com/cdn/11.7.1/img/champion/';
        this.summonersURL = 'https://ddragon.leagueoflegends.com/cdn/11.8.1/img/spell/';
    }
    /**
     *
     * @param arrayToSort the array that should be sorted
     * @returns a array sorted by TIER -> DIVISION -> LEAGUEPOINTS
     */
    sortByRank(arrayToSort) {
        this.getDivsionAsNumber(arrayToSort);
        this.getLeagueAsNumber(arrayToSort);
        return arrayToSort.sort((a, b) => {
            if (a.stats.tierAsNumber === b.stats.tierAsNumber) {
                if (a.stats.division === b.stats.division) {
                    return (a.stats.leaguePoints > b.stats.leaguePoints ? -1 : 1);
                }
                return (a.stats.division < b.stats.division ? -1 : 1);
            }
            return a.stats.tierAsNumber > b.stats.tierAsNumber ? 1 : -1;
        });
    }
    getDivsionAsNumber(array) {
        for (const player of array) {
            player.stats.tierAsNumber = ranks[player.stats.tier];
        }
        return array;
    }
    getLeagueAsNumber(array) {
        for (const player of array) {
            player.stats.division = division[player.stats.rank];
        }
        return array;
    }
    getRankedEmblems(rank) {
        return emblemsEnum[rank];
    }
    /**
     *
     * @param itemsArray An array of items with ids
     * @returns a array of URLS to the images of the items in the array
     */
    getItems(itemsArray) {
        const itemsURL = [];
        let itemURL = {};
        this.store.allItems$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["take"])(1)).subscribe(allItems => {
            if (allItems) {
                for (const id of itemsArray) {
                    if (id === 0) {
                        continue;
                    }
                    itemURL = allItems[id];
                    itemsURL.unshift(itemURL);
                    itemsURL[0].itemURL = this.itemImageUrl + allItems[id].image.full;
                }
            }
        });
        itemsURL.reverse();
        return itemsURL;
    }
    /**
     *
     * @param championId The champion we want data from
     * @returns Specific data about the champion that we want for the program.
     * This metadata should be in the store
     */
    getSpecificChampion(championId) {
        const championPlayed = {};
        this.store.allChampions$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["take"])(1)).subscribe(champions => {
            const championsArray = Object.entries(champions);
            for (const [key, item] of championsArray) {
                if (championId.toString() === item.key) {
                    championPlayed.imageURL = `${this.championImageUrl}${item.image.full}`;
                }
            }
        });
        return championPlayed;
    }
    /**
     *
     * @param summoner1Id The first summonerspell the user is using
     * @param summoner2Id The second summonerspell the user is using
     * @returns An object of data about the summonerspells
     */
    getSummoners(summoner1Id, summoner2Id) {
        const summonerData = {};
        this.store.allSummoners$.subscribe(summoners => {
            const summonersArray = Object.entries(summoners);
            for (const [key, item] of summonersArray) {
                if (summoner1Id.toString() === item.key) {
                    summonerData.summonersURL1 = `${this.summonersURL}${item.image.full}`;
                }
                if (summoner2Id.toString() === item.key) {
                    summonerData.summonersURL2 = `${this.summonersURL}${item.image.full}`;
                }
            }
        });
        return summonerData;
    }
    getMostPlayedChampion(test) {
        const mostOccurringElement = (array) => {
            let max = array[0].champion;
            const counter = {};
            for (const item of array) {
                if (!counter[item.champion]) {
                    counter[item.champion] = 0;
                }
                counter[item.champion]++;
                if (counter[max] < counter[item.champion]) {
                    max = item.champion;
                }
            }
            return this.getSplashArtChampion(max.toString());
        };
        return mostOccurringElement(test);
    }
    getSplashArtChampion(championId) {
        const championPlayed = {};
        const URL = `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/`;
        this.store.allChampions$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["take"])(1)).subscribe(champions => {
            const championsArray = Object.entries(champions);
            for (const [key, item] of championsArray) {
                if (championId.toString() === item.key) {
                    const lastString = '_1.jpg';
                    championPlayed.imageURL = `${URL}${item.id}${lastString}`;
                }
            }
        });
        return championPlayed;
    }
    timeDifference(previous) {
        const current = Date.now();
        const msPerMinute = 60 * 1000;
        const msPerHour = msPerMinute * 60;
        const msPerDay = msPerHour * 24;
        const msPerMonth = msPerDay * 30;
        const msPerYear = msPerDay * 365;
        const elapsed = current - previous;
        if (elapsed < msPerMinute) {
            return Math.round(elapsed / 1000) + ' seconds ago';
        }
        else if (elapsed < msPerHour) {
            return Math.round(elapsed / msPerMinute) + ' minutes ago';
        }
        else if (elapsed < msPerDay) {
            return Math.round(elapsed / msPerHour) + ' hours ago';
        }
        else if (elapsed < msPerMonth) {
            return Math.round(elapsed / msPerDay) + ' days ago';
        }
        else if (elapsed < msPerYear) {
            return Math.round(elapsed / msPerMonth) + ' months ago';
        }
        else {
            return Math.round(elapsed / msPerYear) + ' years ago';
        }
    }
    addTimeStampToNonMetaMatches(matchesArray) {
        for (const match of matchesArray) {
            match.timestamp = this.timeDifference(match.timestamp);
        }
        return matchesArray;
    }
}
GeneralUtilsService.ɵfac = function GeneralUtilsService_Factory(t) { return new (t || GeneralUtilsService)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_store_service__WEBPACK_IMPORTED_MODULE_2__["StoreService"])); };
GeneralUtilsService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({ token: GeneralUtilsService, factory: GeneralUtilsService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ "1LmZ":
/*!**********************************************!*\
  !*** ./src/app/pages/home/home.component.ts ***!
  \**********************************************/
/*! exports provided: HomeComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomeComponent", function() { return HomeComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");

class HomeComponent {
    constructor() { }
    ngOnInit() {
    }
}
HomeComponent.ɵfac = function HomeComponent_Factory(t) { return new (t || HomeComponent)(); };
HomeComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: HomeComponent, selectors: [["app-home"]], decls: 2, vars: 0, template: function HomeComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "home works!");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJob21lLmNvbXBvbmVudC5zY3NzIn0= */"] });


/***/ }),

/***/ "2SXB":
/*!**************************************************************!*\
  !*** ./src/app/components/Layout/footer/footer.component.ts ***!
  \**************************************************************/
/*! exports provided: FooterComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FooterComponent", function() { return FooterComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");

class FooterComponent {
    constructor() { }
    ngOnInit() {
    }
}
FooterComponent.ɵfac = function FooterComponent_Factory(t) { return new (t || FooterComponent)(); };
FooterComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: FooterComponent, selectors: [["app-footer"]], decls: 0, vars: 0, template: function FooterComponent_Template(rf, ctx) { }, styles: [".footer[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  align-self: center;\n  padding: 40px;\n  clear: both;\n  height: 200px;\n  width: 100%;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcLi5cXC4uXFwuLlxcZm9vdGVyLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksYUFBQTtFQUNBLHVCQUFBO0VBQ0EsbUJBQUE7RUFDQSxrQkFBQTtFQUNBLGFBQUE7RUFDQSxXQUFBO0VBQ0EsYUFBQTtFQUNBLFdBQUE7QUFDSiIsImZpbGUiOiJmb290ZXIuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuZm9vdGVyIHtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgICBhbGlnbi1zZWxmOiBjZW50ZXI7XHJcbiAgICBwYWRkaW5nOiA0MHB4O1xyXG4gICAgY2xlYXI6IGJvdGg7XHJcbiAgICBoZWlnaHQ6IDIwMHB4O1xyXG4gICAgd2lkdGg6IDEwMCU7XHJcbn0iXX0= */"] });


/***/ }),

/***/ "2dpJ":
/*!***********************************************!*\
  !*** ./src/app/auth/auth-loggedin.service.ts ***!
  \***********************************************/
/*! exports provided: AuthGuardLoggedinService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthGuardLoggedinService", function() { return AuthGuardLoggedinService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _auth_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./auth.service */ "qXBG");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "tyNb");



class AuthGuardLoggedinService {
    constructor(auth, router) {
        this.auth = auth;
        this.router = router;
    }
    canActivate() {
        if (this.auth.isAuthenticated()) {
            this.router.navigate(['matches']);
            return false;
        }
        return true;
    }
}
AuthGuardLoggedinService.ɵfac = function AuthGuardLoggedinService_Factory(t) { return new (t || AuthGuardLoggedinService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_auth_service__WEBPACK_IMPORTED_MODULE_1__["AuthService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"])); };
AuthGuardLoggedinService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: AuthGuardLoggedinService, factory: AuthGuardLoggedinService.ɵfac });


/***/ }),

/***/ "3OJA":
/*!**********************************************!*\
  !*** ./src/app/pages/user/user.component.ts ***!
  \**********************************************/
/*! exports provided: UserComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserComponent", function() { return UserComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var src_app_services_requestUtils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/services/requestUtils */ "5pd0");
/* harmony import */ var src_app_services_store_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/services/store.service */ "MtBC");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _components_users_profile_details_users_profile_details_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../components/users-profile-details/users-profile-details.component */ "KMwv");






function UserComponent_div_0_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](1, "app-users-profile-details", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("userData", ctx_r0.userData);
} }
class UserComponent {
    constructor(utils, store) {
        this.utils = utils;
        this.store = store;
    }
    ngOnInit() {
        // this.test()
        this.store.currentUser$.subscribe(res => {
            this.getUserDataById(res.accountId);
        });
    }
    getUserDataById(accountId) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            if (accountId) {
                this.userData = yield this.utils.getUserDataByID(accountId);
            }
        });
    }
}
UserComponent.ɵfac = function UserComponent_Factory(t) { return new (t || UserComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](src_app_services_requestUtils__WEBPACK_IMPORTED_MODULE_2__["RequestUtilities"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](src_app_services_store_service__WEBPACK_IMPORTED_MODULE_3__["StoreService"])); };
UserComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: UserComponent, selectors: [["app-user"]], decls: 1, vars: 1, consts: [["class", "user-profile", 4, "ngIf"], [1, "user-profile"], [3, "userData"]], template: function UserComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](0, UserComponent_div_0_Template, 2, 1, "div", 0);
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.userData);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_4__["NgIf"], _components_users_profile_details_users_profile_details_component__WEBPACK_IMPORTED_MODULE_5__["UsersProfileDetailsComponent"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJ1c2VyLmNvbXBvbmVudC5zY3NzIn0= */"] });


/***/ }),

/***/ "4kLO":
/*!*********************************************************************!*\
  !*** ./src/app/components/users-profile/users-profile.component.ts ***!
  \*********************************************************************/
/*! exports provided: UsersProfileComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UsersProfileComponent", function() { return UsersProfileComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var src_app_services_requestUtils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/services/requestUtils */ "5pd0");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _users_profile_details_users_profile_details_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../users-profile-details/users-profile-details.component */ "KMwv");






function UsersProfileComponent_div_0_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](1, "app-users-profile-details", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("userData", ctx_r0.userData);
} }
class UsersProfileComponent {
    constructor(router, utils) {
        this.router = router;
        this.utils = utils;
    }
    ngOnInit() {
        this.getUserDataById();
    }
    getUserDataById() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const accountId = this.router.snapshot.paramMap.get('id');
            if (accountId) {
                this.userData = yield this.utils.getUserDataByID(accountId);
            }
        });
    }
}
UsersProfileComponent.ɵfac = function UsersProfileComponent_Factory(t) { return new (t || UsersProfileComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](src_app_services_requestUtils__WEBPACK_IMPORTED_MODULE_3__["RequestUtilities"])); };
UsersProfileComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: UsersProfileComponent, selectors: [["app-users-profile"]], decls: 1, vars: 1, consts: [["class", "user-profile", 4, "ngIf"], [1, "user-profile"], [3, "userData"]], template: function UsersProfileComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](0, UsersProfileComponent_div_0_Template, 2, 1, "div", 0);
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.userData);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_4__["NgIf"], _users_profile_details_users_profile_details_component__WEBPACK_IMPORTED_MODULE_5__["UsersProfileDetailsComponent"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJ1c2Vycy1wcm9maWxlLmNvbXBvbmVudC5zY3NzIn0= */"] });


/***/ }),

/***/ "5pd0":
/*!******************************************!*\
  !*** ./src/app/services/requestUtils.ts ***!
  \******************************************/
/*! exports provided: RequestUtilities */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RequestUtilities", function() { return RequestUtilities; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _store_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./store.service */ "MtBC");
/* harmony import */ var _request_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./request.service */ "CzMn");
/* harmony import */ var _general_utils_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./general-utils.service */ "0hFq");






/**
 * This file serves as my "Controller" if you follow the MVC structure
 */
class RequestUtilities {
    constructor(storeService, req, generalUtils) {
        this.storeService = storeService;
        this.req = req;
        this.generalUtils = generalUtils;
    }
    /**
     * Gets the loggedin users latest matches. Destructs the meta-data, stores the meta-data in store
     * and calculates the most played champion of those games. Adds that to the currentUser store.
     * @param currentUserAccountId id the person logged in
     * @param start startindex of matches
     * @param end endindex if matches
     */
    getMyUserMatches(currentUserAccountId, start, end) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            let placeHolderFavoriteChampion = {};
            this.storeService.myMatches$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["take"])(1)).subscribe(myMatches => {
                if (myMatches) {
                    this.hasMetaData = true;
                }
            });
            if (!this.hasMetaData) {
                try {
                    const res = yield this.req.getAllMatches(currentUserAccountId, start, end);
                    const fullMatchesData = res;
                    const { matches } = fullMatchesData;
                    placeHolderFavoriteChampion = this.generalUtils.getMostPlayedChampion(matches);
                    for (const match of matches) {
                        match.timestamp = this.generalUtils.timeDifference(match.timestamp);
                    }
                    this.storeService.updateMyMatches(matches);
                    this.hasMatches = true;
                }
                catch (error) {
                    console.log(error);
                }
                let empty = {};
                this.storeService.currentUser$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["take"])(1)).subscribe(myData => {
                    empty = myData;
                });
                empty.favChamp = placeHolderFavoriteChampion;
                this.storeService.updateCurrentUser(empty);
            }
        });
    }
    getUserMatches(accountId, start, end) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const result = yield this.req.getAllMatches(accountId, start || 0, end || 5);
            const { matches } = result;
            for (const match of matches) {
                match.timestamp = this.generalUtils.timeDifference(match.timestamp);
            }
            const favChamp = this.generalUtils.getMostPlayedChampion(matches);
            this.storeService.updateProfileMatches(matches);
            return favChamp;
        });
    }
    getAllChampions() {
        this.checkIfStoreAsData();
        if (!this.hasChamps) {
            this.req.getAllChampions().then(champs => {
                const { data } = champs;
                this.storeService.updateAllChampions(data);
            });
        }
    }
    getAllSummoners() {
        this.checkIfStoreAsData();
        if (!this.hasSummonerIcons) {
            this.req.getAllSummoners().then(summoners => {
                const { data } = summoners;
                this.storeService.updateAllSummoners(data);
            });
        }
    }
    getAllItemsData() {
        this.checkIfStoreAsData();
        if (!this.hasItemsData) {
            this.req.getItems().then(items => {
                const { data } = items;
                this.storeService.updateAllItems(data);
            });
        }
    }
    signUp(userObject) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const { summonerName } = userObject;
            const summonerInfo = yield this.req.getUserInfoByName(summonerName);
            if (summonerInfo) {
                const res = yield this.req.signUp(userObject);
                const result = yield this.req.followUser(summonerInfo.accountId, res._id);
                console.log(result);
            }
            else {
            }
        });
    }
    login(userObject) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            try {
                const loggedInStatus = yield this.req.login(userObject);
                const summonerInfo = yield this.req.getUserInfoByName(userObject.summonerName);
                summonerInfo.userDetails = loggedInStatus;
                summonerInfo.profileIconId = `https://ddragon.leagueoflegends.com/cdn/11.8.1/img/profileicon/${summonerInfo.profileIconId}.png`;
                sessionStorage.setItem('token', loggedInStatus.token);
                sessionStorage.setItem('user', JSON.stringify(summonerInfo));
                this.storeService.updateCurrentUser(summonerInfo);
                yield this.getMyUserMatches(summonerInfo.accountId, 0, 5);
                return 'OK';
            }
            catch (error) {
                console.log(error);
                return error;
            }
        });
    }
    getUserDataByID(accountId) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            try {
                const summonerInfo = yield this.req.getUserInfoByID(accountId);
                summonerInfo.profileIconId = `https://ddragon.leagueoflegends.com/cdn/11.8.1/img/profileicon/${summonerInfo.profileIconId}.png`;
                const { id } = summonerInfo;
                const rankedInfo = yield this.req.getUserRankedInfo(id);
                const data = {
                    summonerInfo,
                    rankedInfo
                };
                return data;
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    getUserDataByName(summonerName) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            try {
                const summonerInfo = yield this.req.getUserInfoByName(summonerName);
                return summonerInfo;
            }
            catch (error) {
                console.log(error);
                return error;
            }
        });
    }
    /**
     * @param accountId ID of the person you want to follow
     * @param currentUser ID of the person who is logged in
     * @returns Result or Error
     */
    followUser(accountId, currentUser) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            try {
                const result = yield this.req.followUser(accountId, currentUser);
                return result;
            }
            catch (error) {
                console.log(error);
                return error;
            }
        });
    }
    fillFollowerDataToStore() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            let test = {};
            this.storeService.currentUser$.subscribe(userData => {
                const followingUserIdsArray = userData.userDetails.following || [];
                if (followingUserIdsArray.length > 0) {
                    test = this.getMatchesByFollowed(followingUserIdsArray);
                }
            });
            return test;
        });
    }
    getMatchesByFollowed(followingArray) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const soloBoard = [];
            const flexBoard = [];
            for (const id of followingArray) {
                const res = yield this.getUserDataByID(id);
                if (res.rankedInfo.length === 0) {
                    res.rankedInfo = [
                        {
                            queueType: 'RANKED_FLEX_SR',
                            tier: 'UNRANKED',
                            wins: '0',
                            losses: '0',
                            id: res.rankedInfo.id,
                        },
                        {
                            tier: 'UNRANKED',
                            wins: '0',
                            losses: '0',
                            id: res.rankedInfo.id,
                        }
                    ];
                }
                console.log(res.rankedInfo);
                for (const rankedMatch of res.rankedInfo) {
                    const { tier, rank, leaguePoints, wins, losses } = rankedMatch;
                    const user = {
                        name: res.summonerInfo.name,
                        stats: { tier, rank, leaguePoints, wins, losses, id }
                    };
                    if (rankedMatch.queueType === 'RANKED_FLEX_SR') {
                        flexBoard.unshift(user);
                    }
                    else {
                        soloBoard.unshift(user);
                    }
                }
            }
            const leagues = {
                usersSolo: yield this.generalUtils.sortByRank(soloBoard),
                usersFlex: yield this.generalUtils.sortByRank(flexBoard)
            };
            this.storeService.updateFollowingData(leagues);
            return leagues;
        });
    }
    checkIfStoreAsData() {
        this.storeService.allChampions$.subscribe(res => {
            if (res) {
                this.hasChamps = true;
            }
            else {
                this.hasChamps = false;
            }
        });
        this.storeService.allSummoners$.subscribe(res => {
            if (res) {
                this.hasSummonerIcons = true;
            }
            else {
                this.hasSummonerIcons = false;
            }
        });
        this.storeService.myMatches$.subscribe(res => {
            if (res) {
                this.hasMatches = true;
            }
            else {
                this.hasMatches = false;
            }
        });
        this.storeService.allItems$.subscribe(res => {
            if (res) {
                this.hasItemsData = true;
            }
            else {
                this.hasItemsData = false;
            }
        });
    }
}
RequestUtilities.ɵfac = function RequestUtilities_Factory(t) { return new (t || RequestUtilities)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_store_service__WEBPACK_IMPORTED_MODULE_3__["StoreService"]), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_request_service__WEBPACK_IMPORTED_MODULE_4__["RequestService"]), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_general_utils_service__WEBPACK_IMPORTED_MODULE_5__["GeneralUtilsService"])); };
RequestUtilities.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({ token: RequestUtilities, factory: RequestUtilities.ɵfac, providedIn: 'root' });


/***/ }),

/***/ "7bHu":
/*!**************************************************************!*\
  !*** ./src/app/components/Layout/header/header.component.ts ***!
  \**************************************************************/
/*! exports provided: HeaderComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HeaderComponent", function() { return HeaderComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var src_app_services_store_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/services/store.service */ "MtBC");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/toolbar */ "/t3+");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/button */ "bTqV");
/* harmony import */ var _angular_material_menu__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/menu */ "STbY");
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/icon */ "NFeN");
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/form-field */ "kmnG");
/* harmony import */ var _search_bar_search_bar_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../search-bar/search-bar.component */ "eyIA");










function HeaderComponent_mat_toolbar_0_div_6_div_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "button", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const menuItem_r13 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate"]("routerLink", menuItem_r13.link);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](menuItem_r13.name);
} }
function HeaderComponent_mat_toolbar_0_div_6_Template(rf, ctx) { if (rf & 1) {
    const _r15 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, HeaderComponent_mat_toolbar_0_div_6_div_1_Template, 3, 2, "div", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "button", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function HeaderComponent_mat_toolbar_0_div_6_Template_button_click_2_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r15); const ctx_r14 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2); return ctx_r14.logout(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3, "Logout");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx_r3.menuListLoggedIn);
} }
function HeaderComponent_mat_toolbar_0_div_8_div_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "button", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const menuItem_r17 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate"]("routerLink", menuItem_r17.link);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](menuItem_r17.name);
} }
function HeaderComponent_mat_toolbar_0_div_8_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, HeaderComponent_mat_toolbar_0_div_8_div_1_Template, 3, 2, "div", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx_r4.menuListNotLoggedIn);
} }
function HeaderComponent_mat_toolbar_0_h3_14_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "h3", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const currentUser_r18 = ctx.ngIf;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](currentUser_r18.name);
} }
function HeaderComponent_mat_toolbar_0_button_17_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "button", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, " Leaderboard ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3, "leaderboard");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function HeaderComponent_mat_toolbar_0_button_19_Template(rf, ctx) { if (rf & 1) {
    const _r20 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "button", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function HeaderComponent_mat_toolbar_0_button_19_Template_button_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r20); const ctx_r19 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2); return ctx_r19.showSearchBar(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, " Search");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3, "search");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function HeaderComponent_mat_toolbar_0_button_20_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "button", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, " Profile ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2, "img", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const currentUser_r21 = ctx.ngIf;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate"]("src", currentUser_r21.profileIconId, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsanitizeUrl"]);
} }
function HeaderComponent_mat_toolbar_0_button_22_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "button", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, " Login");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3, "login");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function HeaderComponent_mat_toolbar_0_button_24_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "button", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, " SignUp ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3, "login");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function HeaderComponent_mat_toolbar_0_button_26_Template(rf, ctx) { if (rf & 1) {
    const _r23 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "button", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function HeaderComponent_mat_toolbar_0_button_26_Template_button_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r23); const ctx_r22 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2); return ctx_r22.logout(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, " logout ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3, "logout");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function HeaderComponent_mat_toolbar_0_Template(rf, ctx) { if (rf & 1) {
    const _r25 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-toolbar", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "button", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "mat-menu", 3, 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function HeaderComponent_mat_toolbar_0_Template_mat_menu_click_4_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r25); const ctx_r24 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r24.onSidenavClick(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](6, HeaderComponent_mat_toolbar_0_div_6_Template, 4, 1, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](7, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](8, HeaderComponent_mat_toolbar_0_div_8_Template, 2, 1, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](9, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "a", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](12, " Home");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](13, "span", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](14, HeaderComponent_mat_toolbar_0_h3_14_Template, 2, 1, "h3", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](15, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](16, "span", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](17, HeaderComponent_mat_toolbar_0_button_17_Template, 4, 0, "button", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](18, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](19, HeaderComponent_mat_toolbar_0_button_19_Template, 4, 0, "button", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](20, HeaderComponent_mat_toolbar_0_button_20_Template, 3, 1, "button", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](21, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](22, HeaderComponent_mat_toolbar_0_button_22_Template, 4, 0, "button", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](23, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](24, HeaderComponent_mat_toolbar_0_button_24_Template, 4, 0, "button", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](25, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](26, HeaderComponent_mat_toolbar_0_button_26_Template, 4, 0, "button", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](27, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](5);
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("matMenuTriggerFor", _r2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx_r0.isMenuOpen ? "menu_close" : "menu");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](7, 11, ctx_r0.currentUser$));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", !_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](9, 13, ctx_r0.currentUser$));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](15, 15, ctx_r0.currentUser$));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](18, 17, ctx_r0.currentUser$));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", !ctx_r0.searchBar);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](21, 19, ctx_r0.currentUser$));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", !_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](23, 21, ctx_r0.currentUser$));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", !_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](25, 23, ctx_r0.currentUser$));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](27, 25, ctx_r0.currentUser$));
} }
function HeaderComponent_mat_toolbar_1_app_search_bar_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "app-search-bar", 28);
} }
function HeaderComponent_mat_toolbar_1_Template(rf, ctx) { if (rf & 1) {
    const _r28 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-toolbar", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, HeaderComponent_mat_toolbar_1_app_search_bar_1_Template, 1, 0, "app-search-bar", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "button", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function HeaderComponent_mat_toolbar_1_Template_button_click_2_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r28); const ctx_r27 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r27.showSearchBar(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3, " Close ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5, "close");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r1.searchBar);
} }
class HeaderComponent {
    constructor(store, router, ref) {
        this.store = store;
        this.router = router;
        this.ref = ref;
        this.isMenuOpen = false;
        this.menuListLoggedIn = [
            {
                name: 'Home',
                link: '/matches'
            },
            {
                name: 'Leaderboard',
                link: '/following'
            },
            {
                name: 'Profile',
                link: '/profile'
            }
        ];
        this.menuListNotLoggedIn = [
            {
                name: 'Home',
                link: '/login'
            },
            {
                name: 'Login',
                link: '/login'
            },
            {
                name: 'Signup',
                link: '/signup'
            }
        ];
        this.searchBar = false;
        this.currentUser$ = this.store.currentUser$;
    }
    ngOnInit() {
    }
    logout() {
        this.store.updateCurrentUser(null);
        this.store.updateCurrentProfileData(null);
        this.store.updateCurrentUserLatestMatches([null]);
        this.store.updateFollowingData(null);
        this.store.updateMyMatches(null);
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('user');
        this.router.navigate(['login']);
    }
    onSidenavClick() {
        this.isMenuOpen = !this.isMenuOpen;
    }
    showSearchBar() {
        this.searchBar = !this.searchBar;
    }
}
HeaderComponent.ɵfac = function HeaderComponent_Factory(t) { return new (t || HeaderComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](src_app_services_store_service__WEBPACK_IMPORTED_MODULE_1__["StoreService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["ChangeDetectorRef"])); };
HeaderComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: HeaderComponent, selectors: [["app-header"]], decls: 2, vars: 2, consts: [["class", "header-container", 4, "ngIf"], [1, "header-container"], ["mat-button", "", 1, "menu-button", 3, "matMenuTriggerFor"], [3, "click"], ["menu", "matMenu"], [4, "ngIf"], ["routerLink", "/matches", "routerLinkActive", "active", 1, "linkBtn", "nav-item"], [1, "example-spacer", "nav-item"], ["class", "nav-item", 4, "ngIf"], ["mat-icon-button", "", "class", "example-icon nav-item", "aria-label", "Example icon-button with share icon", "routerLink", "/following", "routerLinkActive", "active", 4, "ngIf"], ["mat-icon-button", "", "class", "example-icon", "aria-label", "Example icon-button with search icon", 3, "click", 4, "ngIf"], ["class", "header-summoner-icon nav-item", "mat-icon-button", "", "class", "example-icon", "aria-label", "Example icon-button with heart icon", "routerLink", "/profile", "routerLinkActive", "active", 4, "ngIf"], ["mat-icon-button", "", "class", "example-icon", "aria-label", "Example icon-button with share icon", "routerLink", "/login", "routerLinkActive", "active", 4, "ngIf"], ["mat-icon-button", "", "class", "example-icon nav-item", "aria-label", "Example icon-button with share icon", "routerLink", "/signup", "routerLinkActive", "active", 4, "ngIf"], ["mat-icon-button", "", "class", "example-icon", "aria-label", "Example icon-button with share icon", 3, "click", 4, "ngIf"], [4, "ngFor", "ngForOf"], ["mat-menu-item", "", 3, "click"], ["mat-menu-item", "", "routerLinkActive", "active", 3, "routerLink"], [1, "nav-item"], ["mat-icon-button", "", "aria-label", "Example icon-button with share icon", "routerLink", "/following", "routerLinkActive", "active", 1, "example-icon", "nav-item"], ["mat-icon-button", "", "aria-label", "Example icon-button with search icon", 1, "example-icon", 3, "click"], ["mat-icon-button", "", "aria-label", "Example icon-button with heart icon", "routerLink", "/profile", "routerLinkActive", "active", 1, "example-icon"], ["alt", "", "srcset", "", 1, "icon", 3, "src"], ["mat-icon-button", "", "aria-label", "Example icon-button with share icon", "routerLink", "/login", "routerLinkActive", "active", 1, "example-icon"], ["mat-icon-button", "", "aria-label", "Example icon-button with share icon", "routerLink", "/signup", "routerLinkActive", "active", 1, "example-icon", "nav-item"], ["mat-icon-button", "", "aria-label", "Example icon-button with share icon", 1, "example-icon", 3, "click"], ["class", "searchBar", 4, "ngIf"], ["mat-button", "", "matSuffix", "", "mat-icon-button", "", "aria-label", "Clear", 1, "example-icon", 3, "click"], [1, "searchBar"]], template: function HeaderComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](0, HeaderComponent_mat_toolbar_0_Template, 28, 27, "mat-toolbar", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, HeaderComponent_mat_toolbar_1_Template, 6, 1, "mat-toolbar", 0);
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", !ctx.searchBar);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.searchBar);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_3__["NgIf"], _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_4__["MatToolbar"], _angular_material_button__WEBPACK_IMPORTED_MODULE_5__["MatButton"], _angular_material_menu__WEBPACK_IMPORTED_MODULE_6__["MatMenuTrigger"], _angular_material_icon__WEBPACK_IMPORTED_MODULE_7__["MatIcon"], _angular_material_menu__WEBPACK_IMPORTED_MODULE_6__["MatMenu"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterLinkWithHref"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterLinkActive"], _angular_common__WEBPACK_IMPORTED_MODULE_3__["NgForOf"], _angular_material_menu__WEBPACK_IMPORTED_MODULE_6__["MatMenuItem"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterLink"], _angular_material_form_field__WEBPACK_IMPORTED_MODULE_8__["MatSuffix"], _search_bar_search_bar_component__WEBPACK_IMPORTED_MODULE_9__["SearchBarComponent"]], pipes: [_angular_common__WEBPACK_IMPORTED_MODULE_3__["AsyncPipe"]], styles: [".header-container[_ngcontent-%COMP%] {\n  height: 80px;\n  background: black;\n  background: linear-gradient(180deg, var(--highContrastRed), var(--coolDark));\n  color: white;\n}\n.header-container[_ngcontent-%COMP%]   .header-summoner-icon[_ngcontent-%COMP%] {\n  height: 30px;\n  width: 100px;\n}\n.header-container[_ngcontent-%COMP%]   .icon[_ngcontent-%COMP%] {\n  height: 35px;\n}\n.header-container[_ngcontent-%COMP%]   .sidenav-container[_ngcontent-%COMP%] {\n  flex: 1;\n}\n.header-container[_ngcontent-%COMP%]   .sidenav-container[_ngcontent-%COMP%]   .sidenav[_ngcontent-%COMP%] {\n  min-width: 240px;\n}\n.header-container[_ngcontent-%COMP%]   .sidenav-container[_ngcontent-%COMP%]   .sidenav[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  display: block;\n  padding: 6px 24px;\n  width: 100%;\n  text-align: left;\n}\n.header-container[_ngcontent-%COMP%]   .sidenav-container[_ngcontent-%COMP%]   main[_ngcontent-%COMP%] {\n  padding: 18px 24px;\n}\n.header-container[_ngcontent-%COMP%]   .searchBar[_ngcontent-%COMP%] {\n  margin-top: 20px;\n  width: 80%;\n}\n.example-spacer[_ngcontent-%COMP%] {\n  flex: 1 1 auto;\n}\n.linkBtn[_ngcontent-%COMP%] {\n  color: white;\n  margin: 10px;\n}\n.mat-icon-button[_ngcontent-%COMP%] {\n  width: 100px !important;\n  height: 60px !important;\n}\n.example-icon[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  align-self: center;\n  align-items: center;\n}\n@media screen and (max-width: 650px) {\n  .nav-item[_ngcontent-%COMP%] {\n    display: none;\n  }\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcLi5cXC4uXFwuLlxcaGVhZGVyLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBO0VBQ0UsWUFBQTtFQUNBLGlCQUFBO0VBQ0EsNEVBQUE7RUFDQSxZQUFBO0FBREY7QUFHRTtFQUNFLFlBQUE7RUFDQSxZQUFBO0FBREo7QUFHRTtFQUNFLFlBQUE7QUFESjtBQUdFO0VBQ0UsT0FBQTtBQURKO0FBRUk7RUFDSSxnQkFBQTtBQUFSO0FBQ1E7RUFDSSxjQUFBO0VBQ0EsaUJBQUE7RUFDQSxXQUFBO0VBQ0EsZ0JBQUE7QUFDWjtBQUVJO0VBQ0ksa0JBQUE7QUFBUjtBQUdFO0VBQ0UsZ0JBQUE7RUFDQSxVQUFBO0FBREo7QUFLQTtFQUNFLGNBQUE7QUFGRjtBQUtBO0VBQ0UsWUFBQTtFQUNBLFlBQUE7QUFGRjtBQUtBO0VBQ0UsdUJBQUE7RUFDQSx1QkFBQTtBQUZGO0FBS0E7RUFDRSxhQUFBO0VBQ0EsdUJBQUE7RUFDQSxrQkFBQTtFQUNBLG1CQUFBO0FBRkY7QUFLQTtFQUNFO0lBQ0UsYUFBQTtFQUZGO0FBQ0YiLCJmaWxlIjoiaGVhZGVyLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQGltcG9ydCBcIi4uLy4uLy4uLy4uL3N0eWxlcy9zZXR0aW5ncy92YXJpYWJsZXNcIjtcclxuXHJcbi5oZWFkZXItY29udGFpbmVyIHtcclxuICBoZWlnaHQ6IDgwcHg7XHJcbiAgYmFja2dyb3VuZDogcmdiKDAsMCwwKTtcclxuICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoMTgwZGVnLCB2YXIoLS1oaWdoQ29udHJhc3RSZWQpLCAgdmFyKC0tY29vbERhcmspKTtcclxuICBjb2xvcjogd2hpdGU7XHJcblxyXG4gIC5oZWFkZXItc3VtbW9uZXItaWNvbiB7XHJcbiAgICBoZWlnaHQ6IDMwcHg7XHJcbiAgICB3aWR0aDogMTAwcHg7XHJcbiAgfVxyXG4gIC5pY29uIHtcclxuICAgIGhlaWdodDogMzVweDtcclxuICB9XHJcbiAgLnNpZGVuYXYtY29udGFpbmVyIHtcclxuICAgIGZsZXg6IDE7XHJcbiAgICAuc2lkZW5hdiB7XHJcbiAgICAgICAgbWluLXdpZHRoOiAyNDBweDtcclxuICAgICAgICBhIHtcclxuICAgICAgICAgICAgZGlzcGxheTogYmxvY2s7XHJcbiAgICAgICAgICAgIHBhZGRpbmc6IDZweCAyNHB4O1xyXG4gICAgICAgICAgICB3aWR0aDogMTAwJTtcclxuICAgICAgICAgICAgdGV4dC1hbGlnbjogbGVmdDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBtYWluIHtcclxuICAgICAgICBwYWRkaW5nOiAxOHB4IDI0cHg7XHJcbiAgICB9XHJcbn1cclxuICAuc2VhcmNoQmFyIHtcclxuICAgIG1hcmdpbi10b3A6IDIwcHg7XHJcbiAgICB3aWR0aDogODAlO1xyXG4gIH1cclxufVxyXG5cclxuLmV4YW1wbGUtc3BhY2VyIHtcclxuICBmbGV4OiAxIDEgYXV0bztcclxufVxyXG5cclxuLmxpbmtCdG4ge1xyXG4gIGNvbG9yOiB3aGl0ZTtcclxuICBtYXJnaW46IDEwcHg7XHJcbn1cclxuXHJcbi5tYXQtaWNvbi1idXR0b24ge1xyXG4gIHdpZHRoOiAxMDBweCAhaW1wb3J0YW50O1xyXG4gIGhlaWdodDogNjBweCAhaW1wb3J0YW50O1xyXG59XHJcblxyXG4uZXhhbXBsZS1pY29uIHtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG4gIGFsaWduLXNlbGY6IGNlbnRlcjtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG59XHJcblxyXG5AbWVkaWEgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiA2NTBweCkge1xyXG4gIC5uYXYtaXRlbSB7XHJcbiAgICBkaXNwbGF5OiBub25lO1xyXG4gIH1cclxufSJdfQ== */"] });


/***/ }),

/***/ "7fYh":
/*!****************************************************!*\
  !*** ./src/app/pages/matches/matches.component.ts ***!
  \****************************************************/
/*! exports provided: MatchesComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MatchesComponent", function() { return MatchesComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var src_app_services_store_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/services/store.service */ "MtBC");
/* harmony import */ var src_app_services_requestUtils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/services/requestUtils */ "5pd0");
/* harmony import */ var _components_match_list_match_list_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../components/match-list/match-list.component */ "nBev");




class MatchesComponent {
    constructor(store, utils) {
        this.store = store;
        this.utils = utils;
    }
    ngOnInit() {
    }
}
MatchesComponent.ɵfac = function MatchesComponent_Factory(t) { return new (t || MatchesComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](src_app_services_store_service__WEBPACK_IMPORTED_MODULE_1__["StoreService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](src_app_services_requestUtils__WEBPACK_IMPORTED_MODULE_2__["RequestUtilities"])); };
MatchesComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: MatchesComponent, selectors: [["app-matches"]], decls: 1, vars: 0, template: function MatchesComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "app-match-list");
    } }, directives: [_components_match_list_match_list_component__WEBPACK_IMPORTED_MODULE_3__["MatchListComponent"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJtYXRjaGVzLmNvbXBvbmVudC5zY3NzIn0= */"] });


/***/ }),

/***/ "AytR":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const environment = {
    production: false,
    backendURL: 'http://localhost:3000/api/v1',
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "BQOP":
/*!*********************************************************************************************!*\
  !*** ./src/app/components/match-full-details-header/match-full-details-header.component.ts ***!
  \*********************************************************************************************/
/*! exports provided: MatchFullDetailsHeaderComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MatchFullDetailsHeaderComponent", function() { return MatchFullDetailsHeaderComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var src_app_services_store_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/services/store.service */ "MtBC");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "ofXK");



function MatchFullDetailsHeaderComponent_div_0_div_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "img", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ban_r3 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate"]("src", ban_r3.imageURL, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsanitizeUrl"]);
} }
function MatchFullDetailsHeaderComponent_div_0_div_6_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "img", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ban_r4 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate"]("src", ban_r4.imageURL, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsanitizeUrl"]);
} }
function MatchFullDetailsHeaderComponent_div_0_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](2, MatchFullDetailsHeaderComponent_div_0_div_2_Template, 2, 1, "div", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "div", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](6, MatchFullDetailsHeaderComponent_div_0_div_6_Template, 2, 1, "div", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx_r0.bannedChampions1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", ctx_r0.matchOverview.gameDuration, " min ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx_r0.bannedChampions2);
} }
class MatchFullDetailsHeaderComponent {
    constructor(store) {
        this.store = store;
        this.championImageUrl = 'https://ddragon.leagueoflegends.com/cdn/11.7.1/img/champion/';
        this.bannedChampions1 = [];
        this.bannedChampions2 = [];
        this.loaded = false;
    }
    ngOnInit() {
        this.matchOverview.gameDuration = (this.matchOverview.gameDuration / 60).toFixed(2);
        this.loopTeamBans();
    }
    loopTeamBans() {
        for (const ban1 of this.matchOverview.teams[0].bans) {
            this.bannedChampions1.unshift(this.getSpecificChampion(ban1.championId));
        }
        for (const ban2 of this.matchOverview.teams[1].bans) {
            this.bannedChampions2.unshift(this.getSpecificChampion(ban2.championId));
        }
    }
    getSpecificChampion(championId) {
        const test = {};
        this.store.allChampions$.subscribe(champions => {
            const championsArray = Object.entries(champions);
            for (const [key, item] of championsArray) {
                if (championId.toString() === item.key) {
                    test.imageURL = `${this.championImageUrl}${item.image.full}`;
                    this.loaded = true;
                }
            }
        });
        return test;
    }
}
MatchFullDetailsHeaderComponent.ɵfac = function MatchFullDetailsHeaderComponent_Factory(t) { return new (t || MatchFullDetailsHeaderComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](src_app_services_store_service__WEBPACK_IMPORTED_MODULE_1__["StoreService"])); };
MatchFullDetailsHeaderComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: MatchFullDetailsHeaderComponent, selectors: [["app-match-full-details-header"]], inputs: { matchOverview: "matchOverview" }, decls: 1, vars: 1, consts: [["class", "match-header", 4, "ngIf"], [1, "match-header"], [1, "match-side"], ["class", "bans", 4, "ngFor", "ngForOf"], [1, "bans"], ["alt", "", 1, "img", 3, "src"]], template: function MatchFullDetailsHeaderComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](0, MatchFullDetailsHeaderComponent_div_0_Template, 7, 3, "div", 0);
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.loaded);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["NgIf"], _angular_common__WEBPACK_IMPORTED_MODULE_2__["NgForOf"]], styles: [".match-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-around;\n}\n.match-header[_ngcontent-%COMP%]   .match-side[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: nowrap;\n}\n.match-header[_ngcontent-%COMP%]   .bans[_ngcontent-%COMP%] {\n  padding: 5px;\n  width: 50px;\n  height: 50px;\n  display: flex;\n  flex-wrap: nowrap;\n}\n.match-header[_ngcontent-%COMP%]   .img[_ngcontent-%COMP%] {\n  width: 35px;\n  height: 35px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcLi5cXC4uXFxtYXRjaC1mdWxsLWRldGFpbHMtaGVhZGVyLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsYUFBQTtFQUNBLDZCQUFBO0FBQ0Y7QUFBRTtFQUNFLGFBQUE7RUFDQSxpQkFBQTtBQUVKO0FBQUU7RUFDRSxZQUFBO0VBQ0EsV0FBQTtFQUNBLFlBQUE7RUFDQSxhQUFBO0VBQ0EsaUJBQUE7QUFFSjtBQUFFO0VBQ0UsV0FBQTtFQUNBLFlBQUE7QUFFSiIsImZpbGUiOiJtYXRjaC1mdWxsLWRldGFpbHMtaGVhZGVyLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLm1hdGNoLWhlYWRlciB7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWFyb3VuZDtcclxuICAubWF0Y2gtc2lkZSB7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgZmxleC13cmFwOiBub3dyYXA7XHJcbiAgfVxyXG4gIC5iYW5zIHtcclxuICAgIHBhZGRpbmc6IDVweDtcclxuICAgIHdpZHRoOiA1MHB4O1xyXG4gICAgaGVpZ2h0OiA1MHB4O1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGZsZXgtd3JhcDogbm93cmFwO1xyXG4gIH1cclxuICAuaW1nIHtcclxuICAgIHdpZHRoOiAzNXB4O1xyXG4gICAgaGVpZ2h0OiAzNXB4O1xyXG4gIH1cclxufSJdfQ== */"] });


/***/ }),

/***/ "CzMn":
/*!*********************************************!*\
  !*** ./src/app/services/request.service.ts ***!
  \*********************************************/
/*! exports provided: RequestService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RequestService", function() { return RequestService; });
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/environments/environment */ "AytR");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "tk/3");



class RequestService {
    // matches = 'lol/match/v4/matches'
    // allMatches = 'lol/match/v4/matchlists/by-account'
    // userByNameURL = 'lol/summoner/v4/summoners/by-name'
    // userByIdUrl = '/lol/summoner/v4/summoners/by-account'
    // rankedInfoBySummonerIdURL = 'lol/league/v4/entries/by-summoner'
    constructor(http) {
        this.http = http;
        // https://ddragon.leagueoflegends.com/cdn/11.9.1/data/en_US/item.json
        this.itemsURL = 'https://ddragon.leagueoflegends.com/cdn/11.9.1/data/en_US/item.json';
        this.itemImageUrl = 'https://ddragon.leagueoflegends.com/cdn/11.9.1/img/item/';
        this.championsURL = 'https://ddragon.leagueoflegends.com/cdn/11.9.1/data/en_US/champion.json';
        this.summonersURL = 'https://ddragon.leagueoflegends.com/cdn/11.9.1/data/en_US/summoner.json';
    }
    getAllMatches(accountId, startIndex, endIndex) {
        const indexQuery = `?endIndex=${endIndex}&beginIndex=${startIndex}`;
        console.log(accountId);
        console.log('REQ: Matches');
        return this.http.get(`${src_environments_environment__WEBPACK_IMPORTED_MODULE_0__["environment"].backendURL}/ritoURL/matches/user/${accountId}${indexQuery}`).toPromise();
    }
    getMatchDetails(matchId) {
        console.log('REQ: MatchDetails');
        return this.http.get(`${src_environments_environment__WEBPACK_IMPORTED_MODULE_0__["environment"].backendURL}/ritoURL/matches/${matchId}`).toPromise();
    }
    getItems() {
        console.log('ITEMS');
        return this.http.get(this.itemsURL).toPromise();
    }
    getItemImage(imageId) {
        console.log('ITEM IMAGE');
        return this.http.get(`${this.itemImageUrl}${imageId}`).toPromise();
    }
    getAllChampions() {
        console.log('CHAMPIONS');
        return this.http.get(this.championsURL).toPromise();
    }
    getAllSummoners() {
        console.log('SUMMONERS');
        return this.http.get(this.summonersURL).toPromise();
    }
    getUserInfoByName(summonerName) {
        console.log('REQ: SUMS');
        return this.http.get(`${src_environments_environment__WEBPACK_IMPORTED_MODULE_0__["environment"].backendURL}/ritoURL/summoner/${summonerName}`).toPromise();
    }
    getUserInfoByID(accountId) {
        console.log('REQ: USER INFO BY ID');
        return this.http.get(`${src_environments_environment__WEBPACK_IMPORTED_MODULE_0__["environment"].backendURL}/ritoURL/summonerById/${accountId}`).toPromise();
    }
    getUserRankedInfo(summonerId) {
        return this.http.get(`
    ${src_environments_environment__WEBPACK_IMPORTED_MODULE_0__["environment"].backendURL}/ritoURL/summonerRanked/${summonerId}`).toPromise();
    }
    signUp(userObject) {
        return this.http.post(`${src_environments_environment__WEBPACK_IMPORTED_MODULE_0__["environment"].backendURL}/users`, userObject).toPromise();
    }
    login(userObject) {
        return this.http.post(`${src_environments_environment__WEBPACK_IMPORTED_MODULE_0__["environment"].backendURL}/auth/login`, userObject).toPromise();
    }
    followUser(accountId, currentUserId) {
        return this.http.patch(`${src_environments_environment__WEBPACK_IMPORTED_MODULE_0__["environment"].backendURL}/users/${currentUserId}`, { accountId }).toPromise();
    }
}
RequestService.ɵfac = function RequestService_Factory(t) { return new (t || RequestService)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"])); };
RequestService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({ token: RequestService, factory: RequestService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ "D8EZ":
/*!************************************************!*\
  !*** ./src/app/pages/login/login.component.ts ***!
  \************************************************/
/*! exports provided: LoginComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginComponent", function() { return LoginComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _components_form_form_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../components/form/form.component */ "x83m");


class LoginComponent {
    constructor() { }
    ngOnInit() {
    }
}
LoginComponent.ɵfac = function LoginComponent_Factory(t) { return new (t || LoginComponent)(); };
LoginComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: LoginComponent, selectors: [["app-login"]], decls: 2, vars: 0, consts: [[1, "loginPage"], ["page", "login"]], template: function LoginComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "app-form", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, directives: [_components_form_form_component__WEBPACK_IMPORTED_MODULE_1__["FormComponent"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJsb2dpbi5jb21wb25lbnQuc2NzcyJ9 */"] });


/***/ }),

/***/ "EhSf":
/*!****************************************************************!*\
  !*** ./src/app/pages/match-details/match-details.component.ts ***!
  \****************************************************************/
/*! exports provided: MatchDetailsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MatchDetailsComponent", function() { return MatchDetailsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var src_app_services_store_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/services/store.service */ "MtBC");
/* harmony import */ var src_app_services_requestUtils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/services/requestUtils */ "5pd0");
/* harmony import */ var src_app_services_request_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/services/request.service */ "CzMn");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _components_match_full_details_header_match_full_details_header_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../components/match-full-details-header/match-full-details-header.component */ "BQOP");
/* harmony import */ var _components_match_full_details_match_full_details_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../components/match-full-details/match-full-details.component */ "X8zi");








function MatchDetailsComponent_div_0_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "app-match-full-details-header", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2, "app-match-full-details", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("matchOverview", ctx_r0.matchOverview);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("match", ctx_r0.match);
} }
class MatchDetailsComponent {
    constructor(route, store, utils, req) {
        this.route = route;
        this.store = store;
        this.utils = utils;
        this.req = req;
    }
    ngOnInit() {
        this.getPathParams();
        this.getMatchDetails();
    }
    getPathParams() {
        this.matchID = this.route.snapshot.paramMap.get('id');
    }
    getMatchDetails() {
        this.req.getMatchDetails(this.matchID || '').then(res => {
            this.match = res;
            const { teams, gameDuration, gameVersion } = this.match;
            this.matchOverview = { teams, gameDuration, gameVersion };
        });
    }
}
MatchDetailsComponent.ɵfac = function MatchDetailsComponent_Factory(t) { return new (t || MatchDetailsComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](src_app_services_store_service__WEBPACK_IMPORTED_MODULE_2__["StoreService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](src_app_services_requestUtils__WEBPACK_IMPORTED_MODULE_3__["RequestUtilities"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](src_app_services_request_service__WEBPACK_IMPORTED_MODULE_4__["RequestService"])); };
MatchDetailsComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: MatchDetailsComponent, selectors: [["app-match-details"]], decls: 1, vars: 1, consts: [["class", "match-details-page", 4, "ngIf"], [1, "match-details-page"], [3, "matchOverview"], [3, "match"]], template: function MatchDetailsComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](0, MatchDetailsComponent_div_0_Template, 3, 2, "div", 0);
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.match && ctx.matchOverview);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_5__["NgIf"], _components_match_full_details_header_match_full_details_header_component__WEBPACK_IMPORTED_MODULE_6__["MatchFullDetailsHeaderComponent"], _components_match_full_details_match_full_details_component__WEBPACK_IMPORTED_MODULE_7__["MatchFullDetailsComponent"]], styles: [".match-details-page[_ngcontent-%COMP%] {\n  width: 100%;\n  margin: 0 auto;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcLi5cXC4uXFxtYXRjaC1kZXRhaWxzLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsV0FBQTtFQUNBLGNBQUE7QUFDRiIsImZpbGUiOiJtYXRjaC1kZXRhaWxzLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLm1hdGNoLWRldGFpbHMtcGFnZSB7XHJcbiAgd2lkdGg6IDEwMCU7XHJcbiAgbWFyZ2luOiAwIGF1dG87XHJcbn0iXX0= */"] });


/***/ }),

/***/ "Gqp+":
/*!***************************************************************!*\
  !*** ./src/app/components/match-card/match-card.component.ts ***!
  \***************************************************************/
/*! exports provided: MatchCardComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MatchCardComponent", function() { return MatchCardComponent; });
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var src_app_services_store_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/services/store.service */ "MtBC");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_material_card__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/card */ "Wp6s");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/button */ "bTqV");







function MatchCardComponent_mat_card_0_mat_card_content_6_div_1_div_1_Template(rf, ctx) { if (rf & 1) {
    const _r12 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "button", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function MatchCardComponent_mat_card_0_mat_card_content_6_div_1_div_1_Template_button_click_1_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r12); const player_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2).$implicit; const ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2); return ctx_r10.redirect(player_r2.accountId); });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const player_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2).$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", player_r2.name, " ");
} }
function MatchCardComponent_mat_card_0_mat_card_content_6_div_1_img_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](0, "img", 13);
} if (rf & 2) {
    const champions_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]().ngIf;
    const player_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("src", "https://ddragon.leagueoflegends.com/cdn/11.7.1/img/champion/" + champions_r5[player_r2.timeline.championID].image.full, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsanitizeUrl"]);
} }
function MatchCardComponent_mat_card_0_mat_card_content_6_div_1_img_3_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](0, "img", 14);
} if (rf & 2) {
    const player_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2).$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpropertyInterpolate"]("src", player_r2.summoners.summonersURL1, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsanitizeUrl"]);
} }
function MatchCardComponent_mat_card_0_mat_card_content_6_div_1_img_4_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](0, "img", 14);
} if (rf & 2) {
    const player_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2).$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpropertyInterpolate"]("src", player_r2.summoners.summonersURL2, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsanitizeUrl"]);
} }
function MatchCardComponent_mat_card_0_mat_card_content_6_div_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](1, MatchCardComponent_mat_card_0_mat_card_content_6_div_1_div_1_Template, 3, 1, "div", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](2, MatchCardComponent_mat_card_0_mat_card_content_6_div_1_img_2_Template, 1, 1, "img", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](3, MatchCardComponent_mat_card_0_mat_card_content_6_div_1_img_3_Template, 1, 1, "img", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](4, MatchCardComponent_mat_card_0_mat_card_content_6_div_1_img_4_Template, 1, 1, "img", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const champions_r5 = ctx.ngIf;
    const player_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", player_r2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", champions_r5[player_r2.timeline.championID].image.full);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", player_r2.summoners.summonersURL1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", player_r2.summoners.summonersURL2);
} }
function MatchCardComponent_mat_card_0_mat_card_content_6_div_6_img_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](0, "img", 14);
} if (rf & 2) {
    const item_r19 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpropertyInterpolate"]("src", item_r19.itemURL, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsanitizeUrl"]);
} }
function MatchCardComponent_mat_card_0_mat_card_content_6_div_6_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](1, MatchCardComponent_mat_card_0_mat_card_content_6_div_6_img_1_Template, 1, 1, "img", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const item_r19 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", item_r19 && item_r19.itemURL);
} }
const _c0 = function (a0) { return { "currentUserHightlight": a0 }; };
function MatchCardComponent_mat_card_0_mat_card_content_6_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "mat-card-content", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](1, MatchCardComponent_mat_card_0_mat_card_content_6_div_1_Template, 5, 4, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](2, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "div", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "div", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](6, MatchCardComponent_mat_card_0_mat_card_content_6_div_6_Template, 2, 1, "div", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const player_r2 = ctx.$implicit;
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction1"](8, _c0, player_r2.accountId === ctx_r1.currentUser));
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind1"](2, 6, ctx_r1.champions$));
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate3"](" ", player_r2.stats.kills, " | ", player_r2.stats.deaths, " | ", player_r2.stats.assists, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", player_r2.items);
} }
function MatchCardComponent_mat_card_0_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "mat-card", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "mat-card-header");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](2, "div", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "mat-card-title");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](4, "Team Stats");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](5, "mat-card-subtitle");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](6, MatchCardComponent_mat_card_0_mat_card_content_6_Template, 7, 10, "mat-card-content", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx_r0.teamInfo.Players);
} }
class MatchCardComponent {
    constructor(router, store) {
        this.router = router;
        this.store = store;
        this.sortedTeam = {};
        this.sorted = false;
        this.currentUser = '';
        this.champions$ = this.store.allChampions$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["map"])(data => {
            const hejhej = Object.values(data).map((item) => [item.key, item]);
            const awsomeDict = Object.fromEntries(hejhej);
            return awsomeDict;
        }));
    }
    ngOnInit() {
        if (this.teamInfo) {
            this.store.currentUser$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["take"])(1)).subscribe(res => {
                this.currentUser = res.accountId;
            });
            this.sorted = true;
        }
        else {
        }
    }
    redirect(id) {
        this.router.navigate(['/users', id]);
    }
}
MatchCardComponent.ɵfac = function MatchCardComponent_Factory(t) { return new (t || MatchCardComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](src_app_services_store_service__WEBPACK_IMPORTED_MODULE_3__["StoreService"])); };
MatchCardComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: MatchCardComponent, selectors: [["app-match-card"]], inputs: { teamInfo: "teamInfo" }, decls: 1, vars: 1, consts: [["class", "example-card", 4, "ngIf"], [1, "example-card"], ["mat-card-avatar", "", 1, "example-header-image"], ["class", "fullPlayerDataBlue", 3, "ngClass", 4, "ngFor", "ngForOf"], [1, "fullPlayerDataBlue", 3, "ngClass"], ["class", "row", 4, "ngIf"], [1, "row"], [1, "row-item"], ["class", "row-item-item", 4, "ngFor", "ngForOf"], ["class", "row-item", 4, "ngIf"], ["class", "row-item", "alt", "", "class", "avatar", 3, "src", 4, "ngIf"], ["class", "avatar-item", "alt", "", "srcset", "", 3, "src", 4, "ngIf"], ["mat-button", "", "color", "primary", 1, "redirect", 3, "click"], ["alt", "", 1, "avatar", 3, "src"], ["alt", "", "srcset", "", 1, "avatar-item", 3, "src"], [1, "row-item-item"]], template: function MatchCardComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](0, MatchCardComponent_mat_card_0_Template, 7, 1, "mat-card", 0);
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.teamInfo && ctx.teamInfo.Players);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_4__["NgIf"], _angular_material_card__WEBPACK_IMPORTED_MODULE_5__["MatCard"], _angular_material_card__WEBPACK_IMPORTED_MODULE_5__["MatCardHeader"], _angular_material_card__WEBPACK_IMPORTED_MODULE_5__["MatCardAvatar"], _angular_material_card__WEBPACK_IMPORTED_MODULE_5__["MatCardTitle"], _angular_material_card__WEBPACK_IMPORTED_MODULE_5__["MatCardSubtitle"], _angular_common__WEBPACK_IMPORTED_MODULE_4__["NgForOf"], _angular_material_card__WEBPACK_IMPORTED_MODULE_5__["MatCardContent"], _angular_common__WEBPACK_IMPORTED_MODULE_4__["NgClass"], _angular_material_button__WEBPACK_IMPORTED_MODULE_6__["MatButton"]], pipes: [_angular_common__WEBPACK_IMPORTED_MODULE_4__["AsyncPipe"]], styles: [".example-card[_ngcontent-%COMP%] {\n  background-color: black;\n  color: whitesmoke;\n  width: 100%;\n}\n\n.row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  align-self: center;\n}\n\n.row[_ngcontent-%COMP%]   .row-item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  align-self: center;\n  justify-content: center;\n  min-width: 200px;\n  height: 50px;\n  border: 1px solid black;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n\n.row[_ngcontent-%COMP%]   .row-item-item[_ngcontent-%COMP%] {\n  width: 40px;\n  height: 40px;\n}\n\n.row[_ngcontent-%COMP%]   .redirect[_ngcontent-%COMP%] {\n  width: 100%;\n  text-decoration: underline;\n}\n\n.avatar[_ngcontent-%COMP%] {\n  width: 40px;\n  height: 40px;\n  margin-right: 30px;\n  border-radius: 4px;\n}\n\n.avatar-item[_ngcontent-%COMP%] {\n  width: 40px;\n  height: 40px;\n}\n\n.fullPlayerDataBlue[_ngcontent-%COMP%] {\n  border: 1px solid blue;\n}\n\n.currentUserHightlight[_ngcontent-%COMP%] {\n  border: 1px solid green;\n  box-shadow: 0 0 10px 1px var(--highContrastRed);\n}\n\n.fullPlayerDataRed[_ngcontent-%COMP%] {\n  border: 1px solid red;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcLi5cXC4uXFxtYXRjaC1jYXJkLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBRUUsdUJBQUE7RUFDQSxpQkFBQTtFQUNBLFdBQUE7QUFBRjs7QUFHQTtFQUNFLGFBQUE7RUFDQSxtQkFBQTtFQUNBLGtCQUFBO0FBQUY7O0FBQ0U7RUFDRSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSxrQkFBQTtFQUNBLHVCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxZQUFBO0VBQ0EsdUJBQUE7RUFDQSxtQkFBQTtFQUNBLGdCQUFBO0VBQ0EsdUJBQUE7QUFDSjs7QUFFRTtFQUVFLFdBQUE7RUFDQSxZQUFBO0FBREo7O0FBR0U7RUFDRSxXQUFBO0VBQ0EsMEJBQUE7QUFESjs7QUFNQTtFQUNFLFdBQUE7RUFDQSxZQUFBO0VBQ0Esa0JBQUE7RUFDQSxrQkFBQTtBQUhGOztBQU1BO0VBQ0UsV0FBQTtFQUNBLFlBQUE7QUFIRjs7QUFNQTtFQUNFLHNCQUFBO0FBSEY7O0FBTUE7RUFDRSx1QkFBQTtFQUNBLCtDQUFBO0FBSEY7O0FBTUE7RUFDRSxxQkFBQTtBQUhGIiwiZmlsZSI6Im1hdGNoLWNhcmQuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuZXhhbXBsZS1jYXJkIHtcclxuICAvLyBtYXgtd2lkdGg6IDQwMHB4O1xyXG4gIGJhY2tncm91bmQtY29sb3I6IGJsYWNrO1xyXG4gIGNvbG9yOiB3aGl0ZXNtb2tlO1xyXG4gIHdpZHRoOiAxMDAlO1xyXG59XHJcblxyXG4ucm93IHtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgYWxpZ24tc2VsZjogY2VudGVyO1xyXG4gIC5yb3ctaXRlbSB7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICAgIGFsaWduLXNlbGY6IGNlbnRlcjtcclxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG4gICAgbWluLXdpZHRoOiAyMDBweDtcclxuICAgIGhlaWdodDogNTBweDtcclxuICAgIGJvcmRlcjogMXB4IHNvbGlkIGJsYWNrO1xyXG4gICAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcclxuICAgIG92ZXJmbG93OiBoaWRkZW47XHJcbiAgICB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpcztcclxuICBcclxuICB9XHJcbiAgLnJvdy1pdGVtLWl0ZW0ge1xyXG4gICAgXHJcbiAgICB3aWR0aDogNDBweDtcclxuICAgIGhlaWdodDogNDBweDtcclxuICB9XHJcbiAgLnJlZGlyZWN0IHtcclxuICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgdGV4dC1kZWNvcmF0aW9uOiB1bmRlcmxpbmU7XHJcblxyXG4gIH1cclxufVxyXG5cclxuLmF2YXRhciB7XHJcbiAgd2lkdGg6IDQwcHg7XHJcbiAgaGVpZ2h0OiA0MHB4O1xyXG4gIG1hcmdpbi1yaWdodDogMzBweDtcclxuICBib3JkZXItcmFkaXVzOiA0cHg7XHJcbn1cclxuXHJcbi5hdmF0YXItaXRlbSB7XHJcbiAgd2lkdGg6IDQwcHg7XHJcbiAgaGVpZ2h0OiA0MHB4O1xyXG59XHJcblxyXG4uZnVsbFBsYXllckRhdGFCbHVlIHtcclxuICBib3JkZXI6IDFweCBzb2xpZCBibHVlO1xyXG59XHJcblxyXG4uY3VycmVudFVzZXJIaWdodGxpZ2h0IHtcclxuICBib3JkZXI6IDFweCBzb2xpZCBncmVlbjtcclxuICBib3gtc2hhZG93OiAwIDAgMTBweCAxcHggdmFyKC0taGlnaENvbnRyYXN0UmVkKTtcclxufVxyXG5cclxuLmZ1bGxQbGF5ZXJEYXRhUmVkIHtcclxuICBib3JkZXI6IDFweCBzb2xpZCByZWQ7XHJcbn0iXX0= */"] });


/***/ }),

/***/ "KMwv":
/*!*************************************************************************************!*\
  !*** ./src/app/components/users-profile-details/users-profile-details.component.ts ***!
  \*************************************************************************************/
/*! exports provided: UsersProfileDetailsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UsersProfileDetailsComponent", function() { return UsersProfileDetailsComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var src_app_services_requestUtils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/services/requestUtils */ "5pd0");
/* harmony import */ var src_app_services_store_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/services/store.service */ "MtBC");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var src_app_services_general_utils_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/services/general-utils.service */ "0hFq");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _Layout_hero_hero_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../Layout/hero/hero.component */ "v2oA");
/* harmony import */ var _match_list_item_match_list_item_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../match-list-item/match-list-item.component */ "swYC");
/* harmony import */ var _match_list_nonmeta_item_match_list_nonmeta_item_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../match-list-nonmeta-item/match-list-nonmeta-item.component */ "gRg0");











function UsersProfileDetailsComponent_app_hero_0_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](0, "app-hero", 2);
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("favChamp", ctx_r0.favChamp)("userData", ctx_r0.userData.summonerInfo);
} }
function UsersProfileDetailsComponent_div_1_div_1_div_1_div_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, " Solo/Duo ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](2, "img", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} if (rf & 2) {
    const info_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("src", info_r7.emblemPath, _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsanitizeUrl"]);
} }
function UsersProfileDetailsComponent_div_1_div_1_div_1_div_3_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, " Flex ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](2, "img", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} if (rf & 2) {
    const info_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("src", info_r7.emblemPath, _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsanitizeUrl"]);
} }
function UsersProfileDetailsComponent_div_1_div_1_div_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "div", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](2, UsersProfileDetailsComponent_div_1_div_1_div_1_div_2_Template, 3, 1, "div", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](3, UsersProfileDetailsComponent_div_1_div_1_div_1_div_3_Template, 3, 1, "div", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](4, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](6, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](8, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](10, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](11);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} if (rf & 2) {
    const info_r7 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", info_r7.queueType === "RANKED_SOLO_5x5");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", info_r7.queueType === "RANKED_FLEX_SR");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" Division: ", info_r7.rank, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" LP: ", info_r7.leaguePoints, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" Wins: ", info_r7.wins, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" Losses: ", info_r7.losses, " ");
} }
function UsersProfileDetailsComponent_div_1_div_1_div_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](2, "Not enought ranked games played");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} }
function UsersProfileDetailsComponent_div_1_div_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](1, UsersProfileDetailsComponent_div_1_div_1_div_1_Template, 12, 6, "div", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](2, UsersProfileDetailsComponent_div_1_div_1_div_2_Template, 3, 0, "div", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngForOf", ctx_r2.userData.rankedInfo);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx_r2.userData.rankedInfo.length === 0);
} }
function UsersProfileDetailsComponent_div_1_div_2_div_1_div_1_div_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](1, "app-match-list-item", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} if (rf & 2) {
    const match_r16 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("match", match_r16);
} }
function UsersProfileDetailsComponent_div_1_div_2_div_1_div_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](1, UsersProfileDetailsComponent_div_1_div_2_div_1_div_1_div_1_Template, 2, 1, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} if (rf & 2) {
    const i_r17 = ctx.index;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", i_r17 < 5);
} }
function UsersProfileDetailsComponent_div_1_div_2_div_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](1, UsersProfileDetailsComponent_div_1_div_2_div_1_div_1_Template, 2, 1, "div", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} if (rf & 2) {
    const matches_r14 = ctx.ngIf;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngForOf", matches_r14);
} }
function UsersProfileDetailsComponent_div_1_div_2_div_3_div_1_div_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](1, "app-match-list-item", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} if (rf & 2) {
    const match_r22 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("match", match_r22);
} }
function UsersProfileDetailsComponent_div_1_div_2_div_3_div_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](1, UsersProfileDetailsComponent_div_1_div_2_div_3_div_1_div_1_Template, 2, 1, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} if (rf & 2) {
    const i_r23 = ctx.index;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", i_r23 < 5);
} }
function UsersProfileDetailsComponent_div_1_div_2_div_3_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](1, UsersProfileDetailsComponent_div_1_div_2_div_3_div_1_Template, 2, 1, "div", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} if (rf & 2) {
    const profilematches_r20 = ctx.ngIf;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngForOf", profilematches_r20);
} }
function UsersProfileDetailsComponent_div_1_div_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](1, UsersProfileDetailsComponent_div_1_div_2_div_1_Template, 2, 1, "div", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](2, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](3, UsersProfileDetailsComponent_div_1_div_2_div_3_Template, 2, 1, "div", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](4, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx_r3.isMe && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind1"](2, 2, ctx_r3.myMatches$));
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", !ctx_r3.isMe && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind1"](4, 4, ctx_r3.profileMatches$));
} }
function UsersProfileDetailsComponent_div_1_div_3_div_1_div_1_div_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](1, "app-match-list-nonmeta-item", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} if (rf & 2) {
    const nonMetaMatch_r29 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("match", nonMetaMatch_r29);
} }
function UsersProfileDetailsComponent_div_1_div_3_div_1_div_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](1, UsersProfileDetailsComponent_div_1_div_3_div_1_div_1_div_1_Template, 2, 1, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} if (rf & 2) {
    const i_r30 = ctx.index;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", i_r30 < 5);
} }
function UsersProfileDetailsComponent_div_1_div_3_div_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](1, UsersProfileDetailsComponent_div_1_div_3_div_1_div_1_Template, 2, 1, "div", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r26 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngForOf", ctx_r26.nonMetaMetaches);
} }
function UsersProfileDetailsComponent_div_1_div_3_div_2_div_1_div_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](1, "app-match-list-item", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} if (rf & 2) {
    const match_r35 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("match", match_r35);
} }
function UsersProfileDetailsComponent_div_1_div_3_div_2_div_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](1, UsersProfileDetailsComponent_div_1_div_3_div_2_div_1_div_1_Template, 2, 1, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} if (rf & 2) {
    const i_r36 = ctx.index;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", i_r36 < 5);
} }
function UsersProfileDetailsComponent_div_1_div_3_div_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](1, UsersProfileDetailsComponent_div_1_div_3_div_2_div_1_Template, 2, 1, "div", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} if (rf & 2) {
    const matches_r33 = ctx.ngIf;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngForOf", matches_r33);
} }
function UsersProfileDetailsComponent_div_1_div_3_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](1, UsersProfileDetailsComponent_div_1_div_3_div_1_Template, 2, 1, "div", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](2, UsersProfileDetailsComponent_div_1_div_3_div_2_Template, 2, 1, "div", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](3, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx_r4.isMe);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", !ctx_r4.isMe && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind1"](3, 2, ctx_r4.profileMatches$));
} }
function UsersProfileDetailsComponent_div_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](1, UsersProfileDetailsComponent_div_1_div_1_Template, 3, 2, "div", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](2, UsersProfileDetailsComponent_div_1_div_2_Template, 5, 6, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](3, UsersProfileDetailsComponent_div_1_div_3_Template, 4, 4, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx_r1.userData && ctx_r1.userData.rankedInfo);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", !ctx_r1.isInStore);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx_r1.isInStore);
} }
class UsersProfileDetailsComponent {
    constructor(utils, store, router, generalUtils) {
        this.utils = utils;
        this.store = store;
        this.router = router;
        this.generalUtils = generalUtils;
        this.profileMatches$ = this.store.profileMatches$;
        this.myMatches$ = this.store.myMatches$;
        this.nonMetaMetaches = [];
        this.isMe = false;
        this.isInStore = false;
        this.favChamp = '';
    }
    ngOnInit() {
        this.store.currentUser$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["take"])(1)).subscribe((res) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            if (res.name === this.userData.summonerInfo.name) {
                this.favChamp = res.favChamp;
                this.isMe = true;
                const hasMatches = this.store.getCurrentUserLatestMatches();
                if (hasMatches.length > 0) {
                    this.nonMetaMetaches = hasMatches;
                    this.isInStore = true;
                }
                else {
                    this.isInStore = false;
                }
            }
            else {
                const userId = this.router.snapshot.paramMap.get('id');
                this.favChamp = yield this.utils.getUserMatches(userId, 0, 5);
            }
        }));
        this.getRankedEmblems();
    }
    getRankedEmblems() {
        if (this.userData.rankedInfo) {
            for (const infoRow of this.userData.rankedInfo) {
                infoRow.emblemPath = this.generalUtils.getRankedEmblems(infoRow.tier);
                // console.log(infoRow.emblemPath)
            }
        }
    }
}
UsersProfileDetailsComponent.ɵfac = function UsersProfileDetailsComponent_Factory(t) { return new (t || UsersProfileDetailsComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](src_app_services_requestUtils__WEBPACK_IMPORTED_MODULE_3__["RequestUtilities"]), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](src_app_services_store_service__WEBPACK_IMPORTED_MODULE_4__["StoreService"]), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_5__["ActivatedRoute"]), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](src_app_services_general_utils_service__WEBPACK_IMPORTED_MODULE_6__["GeneralUtilsService"])); };
UsersProfileDetailsComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({ type: UsersProfileDetailsComponent, selectors: [["app-users-profile-details"]], inputs: { userData: "userData" }, decls: 2, vars: 2, consts: [[3, "favChamp", "userData", 4, "ngIf"], ["class", "user-profile", 4, "ngIf"], [3, "favChamp", "userData"], [1, "user-profile"], ["class", "col1", 4, "ngIf"], [4, "ngIf"], [1, "col1"], ["class", "col1-ranks", 4, "ngFor", "ngForOf"], ["class", "ranked-user", 4, "ngIf"], [1, "col1-ranks"], [1, "ranked-user"], ["class", "ranksIcon", 4, "ngIf"], [1, "ranksIcon"], ["alt", "", 1, "emblems", 3, "src"], ["class", "user-games-data col2", 4, "ngIf"], [1, "user-games-data", "col2"], [4, "ngFor", "ngForOf"], [3, "match"]], template: function UsersProfileDetailsComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](0, UsersProfileDetailsComponent_app_hero_0_Template, 1, 2, "app-hero", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](1, UsersProfileDetailsComponent_div_1_Template, 4, 3, "div", 1);
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.favChamp);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.userData);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_7__["NgIf"], _Layout_hero_hero_component__WEBPACK_IMPORTED_MODULE_8__["HeroComponent"], _angular_common__WEBPACK_IMPORTED_MODULE_7__["NgForOf"], _match_list_item_match_list_item_component__WEBPACK_IMPORTED_MODULE_9__["MatchListItemComponent"], _match_list_nonmeta_item_match_list_nonmeta_item_component__WEBPACK_IMPORTED_MODULE_10__["MatchListNonmetaItemComponent"]], pipes: [_angular_common__WEBPACK_IMPORTED_MODULE_7__["AsyncPipe"]], styles: [".user-profile[_ngcontent-%COMP%] {\n  width: 100%;\n  margin: 0 auto;\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: space-around;\n}\n.user-profile[_ngcontent-%COMP%]   .col1[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  background-color: var(--smoothDark);\n  border-radius: 5px;\n  width: 400px;\n  margin-top: 30px;\n  padding: 20px;\n  box-shadow: 0 0 60px var(--highContrastRed);\n}\n.user-profile[_ngcontent-%COMP%]   .col1[_ngcontent-%COMP%]   .col1-ranks[_ngcontent-%COMP%] {\n  flex: 2;\n}\n.user-profile[_ngcontent-%COMP%]   .col1[_ngcontent-%COMP%]   .col1-ranks[_ngcontent-%COMP%]   .ranked-user[_ngcontent-%COMP%] {\n  font-size: 1.1em;\n  width: 90px;\n  margin: 0 auto;\n  background-color: var(--smoothDark);\n  text-align: center;\n}\n.user-profile[_ngcontent-%COMP%]   .col1[_ngcontent-%COMP%]   .col1-ranks[_ngcontent-%COMP%]   .ranked-user[_ngcontent-%COMP%]   .emblems[_ngcontent-%COMP%] {\n  display: block;\n  margin: 0 auto;\n  width: 70px;\n  height: 70px;\n}\n.user-profile[_ngcontent-%COMP%]   .col1[_ngcontent-%COMP%]   .user-games-data[_ngcontent-%COMP%] {\n  flex: 2;\n  background-color: var(--darkBlue);\n}\n.user-profile[_ngcontent-%COMP%]   .col2[_ngcontent-%COMP%] {\n  border-radius: 5px;\n  margin-top: 10px;\n  padding: 20px;\n  width: 700px;\n  min-height: 500px;\n}\n.user-profile[_ngcontent-%COMP%]   .top-played-champions[_ngcontent-%COMP%] {\n  border-top: 1px solid var(--brightRed);\n  padding: 10px;\n  background-color: var(--lightDark);\n}\n@media only screen and (max-width: 700px) {\n  .user-profile[_ngcontent-%COMP%]   .col1[_ngcontent-%COMP%], .user-profile[_ngcontent-%COMP%]   .col2[_ngcontent-%COMP%] {\n    display: block;\n    width: 400px;\n  }\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcLi5cXC4uXFx1c2Vycy1wcm9maWxlLWRldGFpbHMuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxXQUFBO0VBQ0EsY0FBQTtFQUNBLGFBQUE7RUFDQSxlQUFBO0VBQ0EsNkJBQUE7QUFDRjtBQUVFO0VBQ0UsYUFBQTtFQUNBLGVBQUE7RUFDQSxtQ0FBQTtFQUNBLGtCQUFBO0VBQ0EsWUFBQTtFQUNBLGdCQUFBO0VBQ0EsYUFBQTtFQUVJLDJDQUFBO0FBQVI7QUFFSTtFQUNFLE9BQUE7QUFBTjtBQUNNO0VBQ0UsZ0JBQUE7RUFDQSxXQUFBO0VBQ0EsY0FBQTtFQUNBLG1DQUFBO0VBQ0Esa0JBQUE7QUFDUjtBQUFRO0VBQ0UsY0FBQTtFQUNBLGNBQUE7RUFDQSxXQUFBO0VBQ0EsWUFBQTtBQUVWO0FBRUk7RUFDRSxPQUFBO0VBQ0EsaUNBQUE7QUFBTjtBQUtFO0VBQ0Usa0JBQUE7RUFDQSxnQkFBQTtFQUNBLGFBQUE7RUFDQSxZQUFBO0VBQ0EsaUJBQUE7QUFISjtBQU9FO0VBQ0Usc0NBQUE7RUFDQSxhQUFBO0VBQ0Esa0NBQUE7QUFMSjtBQVFFO0VBQ0U7SUFDRSxjQUFBO0lBQ0EsWUFBQTtFQU5KO0FBQ0YiLCJmaWxlIjoidXNlcnMtcHJvZmlsZS1kZXRhaWxzLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLnVzZXItcHJvZmlsZSB7XHJcbiAgd2lkdGg6IDEwMCU7XHJcbiAgbWFyZ2luOiAwIGF1dG87XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBmbGV4LXdyYXA6IHdyYXA7XHJcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1hcm91bmQ7XHJcblxyXG5cclxuICAuY29sMSB7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgZmxleC13cmFwOiB3cmFwO1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tc21vb3RoRGFyayk7XHJcbiAgICBib3JkZXItcmFkaXVzOiA1cHg7XHJcbiAgICB3aWR0aDogNDAwcHg7XHJcbiAgICBtYXJnaW4tdG9wOiAzMHB4O1xyXG4gICAgcGFkZGluZzogMjBweDtcclxuICAgIC13ZWJraXQtYm94LXNoYWRvdzogMCAwIDYwcHggdmFyKC0taGlnaENvbnRyYXN0UmVkKTtcclxuICAgICAgICBib3gtc2hhZG93OiAwIDAgNjBweCB2YXIoLS1oaWdoQ29udHJhc3RSZWQpO1xyXG5cclxuICAgIC5jb2wxLXJhbmtzIHtcclxuICAgICAgZmxleDogMjtcclxuICAgICAgLnJhbmtlZC11c2VyIHtcclxuICAgICAgICBmb250LXNpemU6IDEuMWVtO1xyXG4gICAgICAgIHdpZHRoOiA5MHB4O1xyXG4gICAgICAgIG1hcmdpbjogMCBhdXRvO1xyXG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLXNtb290aERhcmspO1xyXG4gICAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICAgICAgICAuZW1ibGVtcyB7XHJcbiAgICAgICAgICBkaXNwbGF5OiBibG9jaztcclxuICAgICAgICAgIG1hcmdpbjogMCBhdXRvO1xyXG4gICAgICAgICAgd2lkdGg6IDcwcHg7XHJcbiAgICAgICAgICBoZWlnaHQ6IDcwcHg7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICAudXNlci1nYW1lcy1kYXRhIHtcclxuICAgICAgZmxleDogMjtcclxuICAgICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tZGFya0JsdWUpO1xyXG4gIFxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLmNvbDIge1xyXG4gICAgYm9yZGVyLXJhZGl1czogNXB4O1xyXG4gICAgbWFyZ2luLXRvcDogMTBweDtcclxuICAgIHBhZGRpbmc6IDIwcHg7XHJcbiAgICB3aWR0aDogNzAwcHg7XHJcbiAgICBtaW4taGVpZ2h0OiA1MDBweDtcclxuICB9XHJcblxyXG4gXHJcbiAgLnRvcC1wbGF5ZWQtY2hhbXBpb25zIHtcclxuICAgIGJvcmRlci10b3A6IDFweCBzb2xpZCB2YXIoLS1icmlnaHRSZWQpO1xyXG4gICAgcGFkZGluZzogMTBweDtcclxuICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWxpZ2h0RGFyayk7XHJcblxyXG4gIH1cclxuICBAbWVkaWEgb25seSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDcwMHB4KSB7XHJcbiAgICAuY29sMSwgLmNvbDIge1xyXG4gICAgICBkaXNwbGF5OiBibG9jaztcclxuICAgICAgd2lkdGg6IDQwMHB4O1xyXG4gICAgfVxyXG4gIH1cclxuICBcclxufVxyXG5cclxuXHJcblxyXG4vLyAuaGVyby13cmFwcGVyIHtcclxuLy8gICBoZWlnaHQ6IDI1MHB4O1xyXG4vLyAgIGJhY2tncm91bmQtY29sb3I6IGJsYWNrO1xyXG4vLyAgIG1hcmdpbjogMjBweCAwO1xyXG4vLyAgIC5oZXJvLWltYWdlIHtcclxuLy8gICAgIGJhY2tncm91bmQtaW1hZ2U6IHVybChcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuL2ltZy9jaGFtcGlvbi9zcGxhc2gvVGhyZXNoXzUuanBnXCIpO1xyXG4vLyAgICAgaGVpZ2h0OiAxMDAlO1xyXG4vLyAgICAgd2lkdGg6IDEwMCU7XHJcbi8vICAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiBjZW50ZXI7XHJcbi8vICAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uLXk6IDEwJTtcclxuLy8gICAgIGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7XHJcbi8vICAgICBiYWNrZ3JvdW5kLXNpemU6Y292ZXI7XHJcbi8vICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgICBcclxuLy8gICB9XHJcbi8vICAgLmhlcm8tdGV4dCB7XHJcbi8vICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbi8vICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbi8vICAgICB0b3A6IDUwJTtcclxuLy8gICAgIGxlZnQ6IDE1JTtcclxuLy8gICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlKC01MCUsIC01MCUpO1xyXG4vLyAgICAgZm9udC1zaXplOiAxLjJlbTtcclxuICBcclxuLy8gICAgIGNvbG9yOiB3aGl0ZTtcclxuLy8gICAgIC5wcm9maWxlLXVzZXJuYW1lIHtcclxuLy8gICAgICAgd2lkdGg6IDMwMHB4O1xyXG4vLyAgICAgICBmb250LXNpemU6IDEuMmVtO1xyXG4vLyAgICAgfVxyXG4vLyAgICAgLmljb24tbHZsIHtcclxuLy8gICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4vLyAgICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbi8vICAgICAgIGNvbG9yOiB3aGl0ZTtcclxuLy8gICAgICAgaW1nIHtcclxuLy8gICAgICAgICB3aWR0aDogMTAwcHg7XHJcbi8vICAgICAgICAgYm9yZGVyLXJhZGl1czogMjAlO1xyXG4vLyAgICAgICAgIGhlaWdodDogMTAwcHg7XHJcbi8vICAgICAgIH1cclxuLy8gICAgICAgLnRvcC1yaWdodCB7XHJcbi8vICAgICAgICAgcGFkZGluZzogNHB4O1xyXG4vLyAgICAgICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcclxuLy8gICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbi8vICAgICAgICAgdG9wOiAtMTVweDtcclxuLy8gICAgICAgICBsZWZ0OiA4NXB4OyAgXHJcbi8vICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tY29vbERhcmsgICk7XHJcbi8vICAgICAgIH1cclxuLy8gICAgIH1cclxuXHJcbi8vICAgfVxyXG4vLyB9XHJcblxyXG4iXX0= */"] });


/***/ }),

/***/ "KTqI":
/*!***********************************************************!*\
  !*** ./src/app/components/utils/chart/chart.component.ts ***!
  \***********************************************************/
/*! exports provided: ChartComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChartComponent", function() { return ChartComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_material_tabs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material/tabs */ "wZkO");
/* harmony import */ var ng_apexcharts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ng-apexcharts */ "CV0D");




const _c0 = ["chart"];
function ChartComponent_div_0_mat_tab_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-tab", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "apx-chart", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const stat_r2 = ctx.$implicit;
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("label", stat_r2.displayName);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("tooltip", ctx_r1.chartOptions.tooltip)("fill", ctx_r1.chartOptions.fill)("series", ctx_r1.chartOptions.series)("chart", ctx_r1.chartOptions.chart)("dataLabels", ctx_r1.chartOptions.dataLabels)("plotOptions", ctx_r1.chartOptions.plotOptions)("xaxis", ctx_r1.chartOptions.xaxis);
} }
function ChartComponent_div_0_Template(rf, ctx) { if (rf & 1) {
    const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "mat-tab-group", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("selectedTabChange", function ChartComponent_div_0_Template_mat_tab_group_selectedTabChange_1_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r4); const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r3.changeGraphStat($event); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](2, ChartComponent_div_0_mat_tab_2_Template, 2, 8, "mat-tab", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx_r0.avaialbleStats);
} }
class ChartComponent {
    constructor() {
        this.avaialbleStats = [
            {
                statName: 'totalDamageDealtToChampions',
                displayName: 'DMG-to-champs'
            },
            {
                statName: 'totalHeal',
                displayName: 'Heal-to-champs'
            },
            {
                statName: 'totalDamageTaken',
                displayName: 'DMG-from-champs'
            },
        ];
        this.chosenStats = this.avaialbleStats[0].statName;
    }
    ngOnInit() {
        this.fillGraph();
    }
    changeGraphStat($event) {
        const displayName = $event.tab.textLabel;
        const pos = this.avaialbleStats.findIndex(element => element.displayName === displayName);
        this.chosenStats = this.avaialbleStats[pos].statName;
        this.fillGraph();
    }
    fillGraph() {
        const teamObject = {
            names: [],
            data: []
        };
        for (let i = 0; i < this.teamStats.length; i++) {
            const player = this.teamStats[i];
            teamObject.names[i] = player.name;
            teamObject.data[i] = player.stats[this.chosenStats];
        }
        this.chartOptions = {
            tooltip: {
                enabled: false,
            },
            title: {
                text: this.chosenStats
            },
            fill: {
                colors: ['#e60000']
            },
            series: [
                {
                    name: 'basic',
                    data: teamObject.data
                }
            ],
            chart: {
                type: 'bar',
                height: 350,
                foreColor: '#F0FFFF'
            },
            plotOptions: {
                bar: {
                    horizontal: true
                }
            },
            dataLabels: {
                enabled: true
            },
            xaxis: {
                categories: teamObject.names
            },
        };
    }
}
ChartComponent.ɵfac = function ChartComponent_Factory(t) { return new (t || ChartComponent)(); };
ChartComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: ChartComponent, selectors: [["app-chart"]], viewQuery: function ChartComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](_c0, 1);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.chart = _t.first);
    } }, inputs: { teamStats: "teamStats" }, decls: 1, vars: 1, consts: [["id", "chart", 4, "ngIf"], ["id", "chart"], ["mat-align-tabs", "start", "animationDuration", "2ms", 1, "yes", 3, "selectedTabChange"], [3, "label", 4, "ngFor", "ngForOf"], [3, "label"], [3, "tooltip", "fill", "series", "chart", "dataLabels", "plotOptions", "xaxis"]], template: function ChartComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](0, ChartComponent_div_0_Template, 3, 1, "div", 0);
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.chartOptions && ctx.chartOptions.xaxis && ctx.chartOptions.plotOptions && ctx.chartOptions.dataLabels && ctx.chartOptions.chart && ctx.chartOptions.series && ctx.chartOptions.fill && ctx.chartOptions.tooltip);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_1__["NgIf"], _angular_material_tabs__WEBPACK_IMPORTED_MODULE_2__["MatTabGroup"], _angular_common__WEBPACK_IMPORTED_MODULE_1__["NgForOf"], _angular_material_tabs__WEBPACK_IMPORTED_MODULE_2__["MatTab"], ng_apexcharts__WEBPACK_IMPORTED_MODULE_3__["ChartComponent"]], styles: ["#chart[_ngcontent-%COMP%] {\n  width: 600px;\n  max-width: 650px;\n  margin: 35px auto;\n}\n\n.mat-tab-group[_ngcontent-%COMP%] {\n  margin-bottom: 48px;\n}\n\n.yes[_ngcontent-%COMP%] {\n  background-color: var(--coolDark);\n  color: white;\n}\n\n.mat-tab-label[_ngcontent-%COMP%], .mat-tab-link[_ngcontent-%COMP%], .mat-tab-label-content[_ngcontent-%COMP%] {\n  color: white !important;\n}\n\n.apexcharts-toolbar[_ngcontent-%COMP%] {\n  display: none !important;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcLi5cXC4uXFwuLlxcY2hhcnQuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxZQUFBO0VBRUEsZ0JBQUE7RUFDQSxpQkFBQTtBQUFGOztBQUdBO0VBQ0UsbUJBQUE7QUFBRjs7QUFFQTtFQUNFLGlDQUFBO0VBQ0EsWUFBQTtBQUNGOztBQUVBO0VBQ0UsdUJBQUE7QUFDRjs7QUFDQTtFQUNFLHdCQUFBO0FBRUYiLCJmaWxlIjoiY2hhcnQuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIjY2hhcnQge1xyXG4gIHdpZHRoOiA2MDBweDtcclxuICBcclxuICBtYXgtd2lkdGg6IDY1MHB4O1xyXG4gIG1hcmdpbjogMzVweCBhdXRvO1xyXG59XHJcblxyXG4ubWF0LXRhYi1ncm91cCB7XHJcbiAgbWFyZ2luLWJvdHRvbTogNDhweDtcclxufVxyXG4ueWVzIHtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1jb29sRGFyayk7XHJcbiAgY29sb3I6IHdoaXRlO1xyXG59XHJcblxyXG4ubWF0LXRhYi1sYWJlbCwgLm1hdC10YWItbGluaywgLm1hdC10YWItbGFiZWwtY29udGVudCB7XHJcbiAgY29sb3I6IHdoaXRlICFpbXBvcnRhbnQ7XHJcbn1cclxuLmFwZXhjaGFydHMtdG9vbGJhciB7XHJcbiAgZGlzcGxheTogbm9uZSAhaW1wb3J0YW50O1xyXG59Il19 */"] });


/***/ }),

/***/ "LRb0":
/*!*****************************************************!*\
  !*** ./src/app/components/input/input.component.ts ***!
  \*****************************************************/
/*! exports provided: InputComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InputComponent", function() { return InputComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material/form-field */ "kmnG");
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/input */ "qFsG");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "3Pt+");






function InputComponent_mat_form_field_3_Template(rf, ctx) { if (rf & 1) {
    const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-form-field", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "input", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function InputComponent_mat_form_field_3_Template_input_ngModelChange_1_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r2); const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r1.emitInputVal($event); })("ngModelChange", function InputComponent_mat_form_field_3_Template_input_ngModelChange_1_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r2); const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r3.val = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("type", ctx_r0.type)("ngModel", ctx_r0.val)("name", ctx_r0.name)("placeholder", ctx_r0.placeholder);
} }
class InputComponent {
    constructor() {
        this.inputData = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
    }
    ngOnInit() {
        this.header = this.capitalize(this.name);
    }
    capitalize(name) {
        return name[0].toUpperCase() + name.slice(1);
    }
    emitInputVal(newVal) {
        this.inputData.emit({
            key: this.name,
            value: newVal
        });
    }
}
InputComponent.ɵfac = function InputComponent_Factory(t) { return new (t || InputComponent)(); };
InputComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: InputComponent, selectors: [["app-input"]], inputs: { name: "name", placeholder: "placeholder", val: "val", type: "type" }, outputs: { inputData: "inputData" }, decls: 4, vars: 2, consts: [[1, "form-header"], ["class", "input", 4, "ngIf"], [1, "input"], ["matInput", "", "required", "", 1, "form-input", 3, "type", "ngModel", "name", "placeholder", "ngModelChange"]], template: function InputComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "strong");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](3, InputComponent_mat_form_field_3_Template, 2, 4, "mat-form-field", 1);
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx.header);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.name && ctx.placeholder && ctx.type);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_1__["NgIf"], _angular_material_form_field__WEBPACK_IMPORTED_MODULE_2__["MatFormField"], _angular_material_input__WEBPACK_IMPORTED_MODULE_3__["MatInput"], _angular_forms__WEBPACK_IMPORTED_MODULE_4__["DefaultValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_4__["RequiredValidator"], _angular_forms__WEBPACK_IMPORTED_MODULE_4__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_4__["NgModel"]], styles: [".input[_ngcontent-%COMP%] {\n  display: block;\n  background-color: white;\n  color: black;\n  padding: 10px;\n}\n\n.form-header[_ngcontent-%COMP%] {\n  margin: 10px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcLi5cXC4uXFxpbnB1dC5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGNBQUE7RUFDQSx1QkFBQTtFQUNBLFlBQUE7RUFDQSxhQUFBO0FBQ0Y7O0FBRUE7RUFDRSxZQUFBO0FBQ0YiLCJmaWxlIjoiaW5wdXQuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuaW5wdXQge1xyXG4gIGRpc3BsYXk6IGJsb2NrO1xyXG4gIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xyXG4gIGNvbG9yOiBibGFjaztcclxuICBwYWRkaW5nOiAxMHB4O1xyXG59XHJcblxyXG4uZm9ybS1oZWFkZXIge1xyXG4gIG1hcmdpbjogMTBweDtcclxufSJdfQ== */"] });


/***/ }),

/***/ "MtBC":
/*!*******************************************!*\
  !*** ./src/app/services/store.service.ts ***!
  \*******************************************/
/*! exports provided: StoreService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StoreService", function() { return StoreService; });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");


class StoreService {
    constructor() {
        // tslint:disable: variable-name
        this._currentUser = new rxjs__WEBPACK_IMPORTED_MODULE_0__["ReplaySubject"](1);
        this._myMatches = new rxjs__WEBPACK_IMPORTED_MODULE_0__["ReplaySubject"](1);
        this._currentUserLatestMatches = new rxjs__WEBPACK_IMPORTED_MODULE_0__["BehaviorSubject"]([]);
        this._profileMatches = new rxjs__WEBPACK_IMPORTED_MODULE_0__["ReplaySubject"](1);
        this._allChampions = new rxjs__WEBPACK_IMPORTED_MODULE_0__["ReplaySubject"](1);
        this._allSummoners = new rxjs__WEBPACK_IMPORTED_MODULE_0__["ReplaySubject"](1);
        this._allItems = new rxjs__WEBPACK_IMPORTED_MODULE_0__["ReplaySubject"](1);
        this._followingData = new rxjs__WEBPACK_IMPORTED_MODULE_0__["ReplaySubject"](1);
        this._currentProfileData = new rxjs__WEBPACK_IMPORTED_MODULE_0__["ReplaySubject"](1);
        this.currentUser$ = this._currentUser.asObservable();
        this.currentProfileData$ = this._currentProfileData.asObservable();
        this.myMatches$ = this._myMatches.asObservable();
        this.currentUserLatestMatches$ = this._currentUserLatestMatches.asObservable();
        this.profileMatches$ = this._profileMatches.asObservable();
        this.allChampions$ = this._allChampions.asObservable();
        this.allSummoners$ = this._allSummoners.asObservable();
        this.allItems$ = this._allItems.asObservable();
        this.followingData$ = this._followingData.asObservable();
    }
    set currentUser(val) {
        this._currentUser.next(val);
    }
    set currentProfileData(val) {
        this._currentProfileData.next(val);
    }
    set followingData(val) {
        this._followingData.next(val);
    }
    set myMatches(val) {
        this._myMatches.next(val);
    }
    set currentUserLatestMatches(val) {
        this._currentUserLatestMatches.next(val);
    }
    get currentUserLatestMatches() {
        return this._currentUserLatestMatches.getValue();
    }
    getCurrentUserLatestMatches() {
        return this.currentUserLatestMatches;
    }
    set profileMatches(val) {
        this._profileMatches.next(val);
    }
    set allChampions(val) {
        this._allChampions.next(val);
    }
    set allSummoners(val) {
        this._allSummoners.next(val);
    }
    set allItems(val) {
        this._allItems.next(val);
    }
    updateCurrentProfileData(val) {
        this.currentProfileData = val;
    }
    updateFollowingData(val) {
        this.followingData = val;
    }
    updateCurrentUser(val) {
        this.currentUser = val;
    }
    updateMyMatches(val) {
        this.myMatches = val;
    }
    updateCurrentUserLatestMatches(val) {
        this.currentUserLatestMatches = val;
    }
    updateProfileMatches(val) {
        this.profileMatches = val;
    }
    updateAllChampions(val) {
        this.allChampions = val;
    }
    updateAllSummoners(val) {
        this.allSummoners = val;
    }
    updateAllItems(val) {
        this.allItems = val;
    }
}
StoreService.ɵfac = function StoreService_Factory(t) { return new (t || StoreService)(); };
StoreService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({ token: StoreService, factory: StoreService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ "NBsa":
/*!********************************************************!*\
  !*** ./src/app/pages/following/following.component.ts ***!
  \********************************************************/
/*! exports provided: FollowingComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FollowingComponent", function() { return FollowingComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var src_app_services_store_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/services/store.service */ "MtBC");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/progress-bar */ "bv9b");





const _c0 = function (a0) { return { "currentUserHightlight": a0 }; };
const _c1 = function (a1) { return ["/users", a1]; };
function FollowingComponent_div_2_table_1_tr_10_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "tr", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "td", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const user_r7 = ctx.$implicit;
    const currentUser_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().ngIf;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction1"](9, _c0, (user_r7 == null ? null : user_r7.stats == null ? null : user_r7.stats.id) === currentUser_r5.accountId));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction1"](11, _c1, user_r7 == null ? null : user_r7.stats == null ? null : user_r7.stats.id));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](user_r7 == null ? null : user_r7.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate3"](" ", user_r7.stats == null ? null : user_r7.stats.tier, " ", user_r7.stats == null ? null : user_r7.stats.rank, " ", (user_r7.stats == null ? null : user_r7.stats.leaguePoints) ? (user_r7.stats == null ? null : user_r7.stats.leaguePoints) + "LP" : "", " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate3"](" ", user_r7.stats == null ? null : user_r7.stats.wins, " W - ", user_r7.stats == null ? null : user_r7.stats.losses, " L (", (user_r7.stats == null ? null : user_r7.stats.wins) + (user_r7.stats == null ? null : user_r7.stats.losses), ")");
} }
function FollowingComponent_div_2_table_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "table");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "Solo/Duo Leaderboard");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "tr");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "th");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5, "Summoner");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "th");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](7, "League");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "th");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](9, "Games");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](10, FollowingComponent_div_2_table_1_tr_10_Template, 7, 13, "tr", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const data_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().ngIf;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](10);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", data_r2.usersSolo);
} }
function FollowingComponent_div_2_table_3_tr_10_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "tr", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "td", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const user_r12 = ctx.$implicit;
    const currentUser_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().ngIf;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction1"](9, _c0, (user_r12 == null ? null : user_r12.stats == null ? null : user_r12.stats.id) === currentUser_r10.accountId));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction1"](11, _c1, user_r12 == null ? null : user_r12.stats == null ? null : user_r12.stats.id));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](user_r12 == null ? null : user_r12.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate3"](" ", user_r12.stats == null ? null : user_r12.stats.tier, " ", user_r12.stats == null ? null : user_r12.stats.rank, " ", (user_r12.stats == null ? null : user_r12.stats.leaguePoints) ? (user_r12.stats == null ? null : user_r12.stats.leaguePoints) + "LP" : "", " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate3"](" ", user_r12.stats == null ? null : user_r12.stats.wins, "W | ", user_r12.stats == null ? null : user_r12.stats.losses, "L (", (user_r12.stats == null ? null : user_r12.stats.wins) + (user_r12.stats == null ? null : user_r12.stats.losses), ")");
} }
function FollowingComponent_div_2_table_3_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "table");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "Flex Leaderboard");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "tr");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "th");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5, "Summoner");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "th");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](7, "League");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "th");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](9, "Games");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](10, FollowingComponent_div_2_table_3_tr_10_Template, 7, 13, "tr", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const data_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().ngIf;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](10);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", data_r2.usersFlex);
} }
function FollowingComponent_div_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, FollowingComponent_div_2_table_1_Template, 11, 1, "table", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](2, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](3, FollowingComponent_div_2_table_3_Template, 11, 1, "table", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](4, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](2, 2, ctx_r0.currentUser$));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](4, 4, ctx_r0.currentUser$));
} }
function FollowingComponent_div_4_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "Calculating score...");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](3, "mat-progress-bar", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
class FollowingComponent {
    constructor(store) {
        this.store = store;
        this.followingData$ = this.store.followingData$;
        this.currentUser$ = this.store.currentUser$;
    }
    ngOnInit() { }
}
FollowingComponent.ɵfac = function FollowingComponent_Factory(t) { return new (t || FollowingComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](src_app_services_store_service__WEBPACK_IMPORTED_MODULE_1__["StoreService"])); };
FollowingComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: FollowingComponent, selectors: [["app-following"]], decls: 6, vars: 6, consts: [["class", "container-users", 4, "ngIf"], [1, "container-users"], [4, "ngIf"], [1, "tableType"], [3, "ngClass", 4, "ngFor", "ngForOf"], [3, "ngClass"], ["routerLinkActive", "active", 1, "link", 3, "routerLink"], [1, "calculating"], ["mode", "indeterminate", "color", "white"]], template: function FollowingComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "h1");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "Following");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](2, FollowingComponent_div_2_Template, 5, 6, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](3, "async");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](4, FollowingComponent_div_4_Template, 4, 0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](5, "async");
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](3, 2, ctx.followingData$));
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", !_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](5, 4, ctx.followingData$));
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["NgIf"], _angular_common__WEBPACK_IMPORTED_MODULE_2__["NgForOf"], _angular_common__WEBPACK_IMPORTED_MODULE_2__["NgClass"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterLinkActive"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterLink"], _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_4__["MatProgressBar"]], pipes: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["AsyncPipe"]], styles: [".container-users[_ngcontent-%COMP%] {\n  padding: 20px;\n  display: flex;\n}\n\n.calculating[_ngcontent-%COMP%] {\n  margin: 0 auto;\n}\n\ntable[_ngcontent-%COMP%] {\n  width: 600px;\n  margin: 0 auto;\n}\n\ntable[_ngcontent-%COMP%]   .tableType[_ngcontent-%COMP%] {\n  height: 100px;\n  font-size: 1.5em;\n  color: white;\n}\n\ntable[_ngcontent-%COMP%]   th[_ngcontent-%COMP%], table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  padding: 15px;\n  text-align: left;\n}\n\ntable[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:hover {\n  background-color: var(--lightDark);\n}\n\ntable[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:nth-child(even) {\n  background-color: var(--middleDark);\n}\n\ntable[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n  background: linear-gradient(180deg, var(--highContrastRed), var(--middleDark));\n  color: white;\n}\n\ntable[_ngcontent-%COMP%]   .link[_ngcontent-%COMP%] {\n  text-decoration: underline;\n  cursor: pointer;\n}\n\ntable[_ngcontent-%COMP%]   .currentUserHightlight[_ngcontent-%COMP%] {\n  border: 1px solid green;\n  box-shadow: 0 0 5px 5px var(--highContrastRed);\n}\n\n@media screen and (max-width: 1300px) {\n  .container-users[_ngcontent-%COMP%] {\n    display: block;\n  }\n}\n\n@media screen and (max-width: 640px) {\n  .container-users[_ngcontent-%COMP%] {\n    padding: 0;\n  }\n  .container-users[_ngcontent-%COMP%]   table[_ngcontent-%COMP%] {\n    padding: 0;\n    width: 500px;\n  }\n}\n\n@media screen and (max-width: 500px) {\n  .container-users[_ngcontent-%COMP%]   table[_ngcontent-%COMP%] {\n    width: 400px;\n  }\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcLi5cXC4uXFxmb2xsb3dpbmcuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxhQUFBO0VBQ0EsYUFBQTtBQUNGOztBQUVBO0VBQ0UsY0FBQTtBQUNGOztBQUNBO0VBQ0UsWUFBQTtFQUNBLGNBQUE7QUFFRjs7QUFERTtFQUNFLGFBQUE7RUFDQSxnQkFBQTtFQUNBLFlBQUE7QUFHSjs7QUFERTtFQUNFLGFBQUE7RUFDQSxnQkFBQTtBQUdKOztBQUFFO0VBQVUsa0NBQUE7QUFHWjs7QUFGRTtFQUFvQixtQ0FBQTtBQUt0Qjs7QUFKRTtFQUNFLDhFQUFBO0VBQ0EsWUFBQTtBQU1KOztBQUpFO0VBQ0UsMEJBQUE7RUFDQSxlQUFBO0FBTUo7O0FBSkU7RUFDRSx1QkFBQTtFQUNBLDhDQUFBO0FBTUo7O0FBRkE7RUFDRTtJQUNDLGNBQUE7RUFLRDtBQUNGOztBQUZBO0VBQ0U7SUFDRSxVQUFBO0VBSUY7RUFIRTtJQUNFLFVBQUE7SUFDQSxZQUFBO0VBS0o7QUFDRjs7QUFEQTtFQUVJO0lBQ0UsWUFBQTtFQUVKO0FBQ0YiLCJmaWxlIjoiZm9sbG93aW5nLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmNvbnRhaW5lci11c2VycyB7XHJcbiAgcGFkZGluZzogMjBweDtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG5cclxufVxyXG4uY2FsY3VsYXRpbmcge1xyXG4gIG1hcmdpbjogMCBhdXRvO1xyXG59XHJcbnRhYmxlIHtcclxuICB3aWR0aDogNjAwcHg7XHJcbiAgbWFyZ2luOiAwIGF1dG87XHJcbiAgLnRhYmxlVHlwZSB7XHJcbiAgICBoZWlnaHQ6IDEwMHB4O1xyXG4gICAgZm9udC1zaXplOiAxLjVlbTtcclxuICAgIGNvbG9yOiB3aGl0ZTtcclxuICB9XHJcbiAgdGgsIHRkIHtcclxuICAgIHBhZGRpbmc6IDE1cHg7XHJcbiAgICB0ZXh0LWFsaWduOiBsZWZ0O1xyXG4gIH1cclxuICBcclxuICB0cjpob3ZlciB7YmFja2dyb3VuZC1jb2xvcjogdmFyKC0tbGlnaHREYXJrKTt9XHJcbiAgdHI6bnRoLWNoaWxkKGV2ZW4pIHtiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1taWRkbGVEYXJrKTt9XHJcbiAgdGgge1xyXG4gICAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDE4MGRlZywgdmFyKC0taGlnaENvbnRyYXN0UmVkKSwgIHZhcigtLW1pZGRsZURhcmspKTtcclxuICAgIGNvbG9yOiB3aGl0ZTtcclxuICB9XHJcbiAgLmxpbmsge1xyXG4gICAgdGV4dC1kZWNvcmF0aW9uOiB1bmRlcmxpbmU7XHJcbiAgICBjdXJzb3I6IHBvaW50ZXI7XHJcbiAgfVxyXG4gIC5jdXJyZW50VXNlckhpZ2h0bGlnaHQge1xyXG4gICAgYm9yZGVyOiAxcHggc29saWQgZ3JlZW47XHJcbiAgICBib3gtc2hhZG93OiAwIDAgNXB4IDVweCB2YXIoLS1oaWdoQ29udHJhc3RSZWQpO1xyXG4gIH1cclxufVxyXG5cclxuQG1lZGlhIHNjcmVlbiBhbmQgKG1heC13aWR0aDogMTMwMHB4KSB7XHJcbiAgLmNvbnRhaW5lci11c2VycyB7XHJcbiAgIGRpc3BsYXk6IGJsb2NrO1xyXG4gIH1cclxufVxyXG5cclxuQG1lZGlhIHNjcmVlbiBhbmQgKG1heC13aWR0aDogNjQwcHgpIHtcclxuICAuY29udGFpbmVyLXVzZXJzIHtcclxuICAgIHBhZGRpbmc6IDA7XHJcbiAgICB0YWJsZSB7XHJcbiAgICAgIHBhZGRpbmc6IDA7XHJcbiAgICAgIHdpZHRoOiA1MDBweDtcclxuICAgIH1cclxuICB9XHJcblxyXG59XHJcbkBtZWRpYSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDUwMHB4KSB7XHJcbiAgLmNvbnRhaW5lci11c2VycyB7XHJcbiAgICB0YWJsZSB7XHJcbiAgICAgIHdpZHRoOiA0MDBweDtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIl19 */"] });


/***/ }),

/***/ "OTVi":
/*!********************************************!*\
  !*** ./src/app/auth/auth-guard.service.ts ***!
  \********************************************/
/*! exports provided: AuthGuardService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthGuardService", function() { return AuthGuardService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _auth_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./auth.service */ "qXBG");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "tyNb");



class AuthGuardService {
    constructor(auth, router) {
        this.auth = auth;
        this.router = router;
    }
    canActivate() {
        if (!this.auth.isAuthenticated()) {
            this.router.navigate(['login']);
            return false;
        }
        return true;
    }
}
AuthGuardService.ɵfac = function AuthGuardService_Factory(t) { return new (t || AuthGuardService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_auth_service__WEBPACK_IMPORTED_MODULE_1__["AuthService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"])); };
AuthGuardService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: AuthGuardService, factory: AuthGuardService.ɵfac });


/***/ }),

/***/ "Sy1n":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _services_requestUtils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./services/requestUtils */ "5pd0");
/* harmony import */ var _services_store_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./services/store.service */ "MtBC");
/* harmony import */ var _components_Layout_header_header_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/Layout/header/header.component */ "7bHu");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _components_Layout_footer_footer_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./components/Layout/footer/footer.component */ "2SXB");







class AppComponent {
    constructor(utils, store) {
        this.utils = utils;
        this.store = store;
        this.testID = '22UXnMIItBvFoYv_SJ-O_QnV6GBGPlFu5q-Lu4ZcW9lD1uNqs69xW4Q_';
    }
    ngOnInit() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            // Meta-data about the game
            this.utils.getAllItemsData();
            this.utils.getAllChampions();
            this.utils.getAllSummoners();
            const storageData = sessionStorage.getItem('user');
            const data = JSON.parse(storageData);
            this.store.updateCurrentUser(data);
            if (data) {
                yield this.utils.getMyUserMatches(data.accountId, 0, 5);
                this.utils.fillFollowerDataToStore();
            }
        });
    }
}
AppComponent.ɵfac = function AppComponent_Factory(t) { return new (t || AppComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_services_requestUtils__WEBPACK_IMPORTED_MODULE_2__["RequestUtilities"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_services_store_service__WEBPACK_IMPORTED_MODULE_3__["StoreService"])); };
AppComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: AppComponent, selectors: [["app-root"]], decls: 3, vars: 0, template: function AppComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](0, "app-header");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](1, "router-outlet");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](2, "app-footer");
    } }, directives: [_components_Layout_header_header_component__WEBPACK_IMPORTED_MODULE_4__["HeaderComponent"], _angular_router__WEBPACK_IMPORTED_MODULE_5__["RouterOutlet"], _components_Layout_footer_footer_component__WEBPACK_IMPORTED_MODULE_6__["FooterComponent"]], styles: ["[_ngcontent-%COMP%]:root {\n  --coolDark: rgb(24, 17, 13);\n  --smoothDark: rgba(26, 34, 46, 0.85);\n  --middleDark: rgba(41, 52, 68, 0.85);\n  --highContrastRed: rgb(138, 5, 5);\n  --brightRed: rgba(151, 54, 9, 0.849);\n  --lightDark: rgba(51, 9, 9, 0.918);\n  --darkBlue: rgba(19, 33, 53, 0.85);\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcLi5cXHN0eWxlc1xcc2V0dGluZ3NcXF92YXJpYWJsZXMuc2NzcyIsIi4uXFwuLlxcYXBwLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUlBO0VBQ0ksMkJBQUE7RUFDQSxvQ0FBQTtFQUNBLG9DQUFBO0VBQ0EsaUNBQUE7RUFDQSxvQ0FBQTtFQUNBLGtDQUFBO0VBQ0Esa0NBQUE7QUNISiIsImZpbGUiOiJhcHAuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIvLyAkY29vbERhcms6IHJnYigyNCwgMTcsIDEzKTtcclxuLy8gJHNtb290aERhcms6IHJnYmEoMjYsIDM0LCA0NiwgMC44NSk7XHJcbi8vICRtaWRkbGVEYXJrOiByZ2JhKDQxLCA1MiwgNjgsIDAuODUpO1xyXG4vLyAkaGlnaENvbnRyYXN0UmVkOiByZ2IoMTM4LCA1LCA1KTtcclxuOnJvb3Qge1xyXG4gICAgLS1jb29sRGFyazogcmdiKDI0LCAxNywgMTMpO1xyXG4gICAgLS1zbW9vdGhEYXJrOiByZ2JhKDI2LCAzNCwgNDYsIDAuODUpO1xyXG4gICAgLS1taWRkbGVEYXJrOiByZ2JhKDQxLCA1MiwgNjgsIDAuODUpO1xyXG4gICAgLS1oaWdoQ29udHJhc3RSZWQ6IHJnYigxMzgsIDUsIDUpO1xyXG4gICAgLS1icmlnaHRSZWQ6IHJnYmEoMTUxLCA1NCwgOSwgMC44NDkpO1xyXG4gICAgLS1saWdodERhcms6IHJnYmEoNTEsIDksIDksIDAuOTE4KTtcclxuICAgIC0tZGFya0JsdWU6IHJnYmEoMTksIDMzLCA1MywgMC44NSk7XHJcbn0iLCI6cm9vdCB7XG4gIC0tY29vbERhcms6IHJnYigyNCwgMTcsIDEzKTtcbiAgLS1zbW9vdGhEYXJrOiByZ2JhKDI2LCAzNCwgNDYsIDAuODUpO1xuICAtLW1pZGRsZURhcms6IHJnYmEoNDEsIDUyLCA2OCwgMC44NSk7XG4gIC0taGlnaENvbnRyYXN0UmVkOiByZ2IoMTM4LCA1LCA1KTtcbiAgLS1icmlnaHRSZWQ6IHJnYmEoMTUxLCA1NCwgOSwgMC44NDkpO1xuICAtLWxpZ2h0RGFyazogcmdiYSg1MSwgOSwgOSwgMC45MTgpO1xuICAtLWRhcmtCbHVlOiByZ2JhKDE5LCAzMywgNTMsIDAuODUpO1xufSJdfQ== */"] });


/***/ }),

/***/ "X8zi":
/*!*******************************************************************************!*\
  !*** ./src/app/components/match-full-details/match-full-details.component.ts ***!
  \*******************************************************************************/
/*! exports provided: MatchFullDetailsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MatchFullDetailsComponent", function() { return MatchFullDetailsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var src_app_services_request_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/services/request.service */ "CzMn");
/* harmony import */ var src_app_services_general_utils_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/services/general-utils.service */ "0hFq");
/* harmony import */ var src_app_services_store_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/services/store.service */ "MtBC");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/button */ "bTqV");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/progress-bar */ "bv9b");
/* harmony import */ var _match_card_match_card_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../match-card/match-card.component */ "Gqp+");
/* harmony import */ var _utils_chart_chart_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../utils/chart/chart.component */ "KTqI");









function MatchFullDetailsComponent_div_3_div_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "mat-progress-bar", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function MatchFullDetailsComponent_div_3_div_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "app-match-card", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("teamInfo", ctx_r3.teamOne);
} }
function MatchFullDetailsComponent_div_3_div_5_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "app-match-card", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("teamInfo", ctx_r4.teamTwo);
} }
function MatchFullDetailsComponent_div_3_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, MatchFullDetailsComponent_div_3_div_1_Template, 2, 0, "div", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](2, MatchFullDetailsComponent_div_3_div_2_Template, 2, 1, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4, "VS");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](5, MatchFullDetailsComponent_div_3_div_5_Template, 2, 1, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r0.teamOne.Players.length < 0 && ctx_r0.teamTwo.Players.length < 0 && !ctx_r0.loaded);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r0.teamOne.Players.length > 0 && ctx_r0.loaded);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r0.teamTwo.Players.length > 0 && ctx_r0.loaded);
} }
function MatchFullDetailsComponent_div_4_div_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "app-chart", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("teamStats", ctx_r5.teamOne.Players);
} }
function MatchFullDetailsComponent_div_4_div_4_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "app-chart", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("teamStats", ctx_r6.teamTwo.Players);
} }
function MatchFullDetailsComponent_div_4_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, MatchFullDetailsComponent_div_4_div_1_Template, 2, 1, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3, "VS");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](4, MatchFullDetailsComponent_div_4_div_4_Template, 2, 1, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r1.teamOne.Players.length > 0 && ctx_r1.loaded);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r1.teamTwo.Players.length > 0 && ctx_r1.loaded);
} }
class MatchFullDetailsComponent {
    constructor(req, generalUtils, store) {
        this.req = req;
        this.generalUtils = generalUtils;
        this.store = store;
        this.itemData = [];
        this.title = 'league-client-v2';
        this.expand = false;
        this.itemImageUrl = 'https://ddragon.leagueoflegends.com/cdn/11.7.1/img/item/';
        this.championImageUrl = 'https://ddragon.leagueoflegends.com/cdn/11.7.1/img/champion/';
        this.summonersURL = 'https://ddragon.leagueoflegends.com/cdn/11.8.1/img/spell/';
        this.loaded = false;
        this.myPartId = 0;
        this.myItems = [];
        this.teamOne = [];
        this.teamTwo = [];
        this.graph = false;
    }
    ngOnInit() {
        this.teamOne = [];
        this.teamTwo = [];
        this.teamOne.Players = [];
        this.teamTwo.Players = [];
        // If the match isnt in from store, get it from API
        if (!this.match) {
            this.req.getMatchDetails(this.match.gameId).then(res2 => {
                this.gameData = res2;
            });
        }
        else {
            this.gameData = this.match;
        }
        this.getTeamData();
    }
    /**
     * Gets the needed data for a specific match, includes the items, summoners, players, stats
     */
    getTeamData() {
        const teamOnePlayers = [];
        const teamTwoPlayers = [];
        for (let i = 0; i < this.gameData.participantIdentities.length; i++) {
            const participantIdentity = this.gameData.participantIdentities[i];
            const participantINFO = this.gameData.participants[i];
            const { role, lane } = this.gameData.participants[i].timeline;
            const { item0, item1, item2, item3, item4, item5, item6 } = participantINFO.stats;
            const playerItems = [item0, item1, item2, item3, item4, item5, item6];
            const items = this.generalUtils.getItems(playerItems);
            participantINFO.stats.name = participantIdentity.player.summonerName;
            const { summonersURL1, summonersURL2 } = this.generalUtils.getSummoners(participantINFO.spell1Id, participantINFO.spell2Id);
            const playerToAdd = {
                name: participantIdentity.player.summonerName,
                accountId: participantIdentity.player.accountId,
                stats: participantINFO.stats,
                items,
                timeline: { lane, role, championID: participantINFO.championId },
                summoners: { summonersURL1, summonersURL2 },
            };
            if (participantIdentity.participantId <= 5) {
                teamOnePlayers.push(playerToAdd);
            }
            else if (participantIdentity.participantId > 5) {
                teamTwoPlayers.push(playerToAdd);
            }
        }
        if (teamOnePlayers.length === 5) {
            this.teamOne.Players = teamOnePlayers;
        }
        if (teamTwoPlayers.length === 5) {
            this.teamTwo.Players = teamTwoPlayers;
        }
        this.loaded = true;
    }
    expandItem() {
        this.expand = !this.expand;
    }
    changeStats() {
        this.graph = !this.graph;
    }
}
MatchFullDetailsComponent.ɵfac = function MatchFullDetailsComponent_Factory(t) { return new (t || MatchFullDetailsComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](src_app_services_request_service__WEBPACK_IMPORTED_MODULE_1__["RequestService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](src_app_services_general_utils_service__WEBPACK_IMPORTED_MODULE_2__["GeneralUtilsService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](src_app_services_store_service__WEBPACK_IMPORTED_MODULE_3__["StoreService"])); };
MatchFullDetailsComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: MatchFullDetailsComponent, selectors: [["app-match-full-details"]], inputs: { match: "match" }, decls: 5, vars: 3, consts: [[1, "whole"], ["mat-button", "", 1, "middle-button", 3, "click"], ["class", "card-container", 4, "ngIf"], [1, "card-container"], [4, "ngIf"], ["class", "example-card", 4, "ngIf"], [1, "middle"], ["mode", "indeterminate", 1, "progress-bar"], [1, "example-card"], [3, "teamInfo"], [3, "teamStats"]], template: function MatchFullDetailsComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "button", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function MatchFullDetailsComponent_Template_button_click_1_listener() { return ctx.changeStats(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](3, MatchFullDetailsComponent_div_3_Template, 6, 3, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](4, MatchFullDetailsComponent_div_4_Template, 5, 2, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](!ctx.graph ? "Show graph" : "Show stats");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", !ctx.graph);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.graph);
    } }, directives: [_angular_material_button__WEBPACK_IMPORTED_MODULE_4__["MatButton"], _angular_common__WEBPACK_IMPORTED_MODULE_5__["NgIf"], _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_6__["MatProgressBar"], _match_card_match_card_component__WEBPACK_IMPORTED_MODULE_7__["MatchCardComponent"], _utils_chart_chart_component__WEBPACK_IMPORTED_MODULE_8__["ChartComponent"]], styles: [".whole[_ngcontent-%COMP%] {\n  margin: 0 auto;\n}\n.whole[_ngcontent-%COMP%]   .card-container[_ngcontent-%COMP%] {\n  width: 1300px;\n  margin: 0 auto;\n  display: flex;\n  align-items: center;\n  align-self: center;\n}\n.whole[_ngcontent-%COMP%]   .card-container[_ngcontent-%COMP%]   .middle[_ngcontent-%COMP%] {\n  width: 20px;\n  margin: 0 auto;\n  text-align: center;\n}\n.whole[_ngcontent-%COMP%]   .card-container[_ngcontent-%COMP%]   .progress-bar[_ngcontent-%COMP%] {\n  color: white;\n}\n.whole[_ngcontent-%COMP%]   .middle-button[_ngcontent-%COMP%] {\n  display: flex;\n  margin: 0 auto;\n  align-self: center;\n  width: 200px;\n  text-align: center;\n  border-bottom: 1px solid var(--highContrastRed);\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcLi5cXC4uXFxtYXRjaC1mdWxsLWRldGFpbHMuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFFRSxjQUFBO0FBQUY7QUFDRTtFQUVFLGFBQUE7RUFDQSxjQUFBO0VBQ0EsYUFBQTtFQUNBLG1CQUFBO0VBQ0Esa0JBQUE7QUFBSjtBQUlJO0VBQ0UsV0FBQTtFQUNBLGNBQUE7RUFDQSxrQkFBQTtBQUZOO0FBSUk7RUFDRSxZQUFBO0FBRk47QUFNRTtFQUNFLGFBQUE7RUFDQSxjQUFBO0VBQ0Esa0JBQUE7RUFDQSxZQUFBO0VBQ0Esa0JBQUE7RUFDQSwrQ0FBQTtBQUpKIiwiZmlsZSI6Im1hdGNoLWZ1bGwtZGV0YWlscy5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi53aG9sZSB7XHJcbiAgXHJcbiAgbWFyZ2luOiAwIGF1dG87XHJcbiAgLmNhcmQtY29udGFpbmVyIHtcclxuICAgIC8vIHBhZGRpbmc6IDIwcHg7XHJcbiAgICB3aWR0aDogMTMwMHB4O1xyXG4gICAgbWFyZ2luOiAwIGF1dG87XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICAgIGFsaWduLXNlbGY6IGNlbnRlcjtcclxuICAgIC8vIC5leGFtcGxlLWNhcmQge1xyXG4gICAgLy8gICB3aWR0aDogNTAlO1xyXG4gICAgLy8gfVxyXG4gICAgLm1pZGRsZSB7XHJcbiAgICAgIHdpZHRoOiAyMHB4O1xyXG4gICAgICBtYXJnaW46IDAgYXV0bztcclxuICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gICAgfVxyXG4gICAgLnByb2dyZXNzLWJhciB7XHJcbiAgICAgIGNvbG9yOiB3aGl0ZTtcclxuICAgIH1cclxuICB9XHJcbiAgXHJcbiAgLm1pZGRsZS1idXR0b24ge1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIG1hcmdpbjogMCBhdXRvO1xyXG4gICAgYWxpZ24tc2VsZjogY2VudGVyO1xyXG4gICAgd2lkdGg6IDIwMHB4O1xyXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gICAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkIHZhcigtLWhpZ2hDb250cmFzdFJlZCk7XHJcbiAgfVxyXG59XHJcbiJdfQ== */"] });


/***/ }),

/***/ "ZAI4":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "jhN1");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "tk/3");
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app-routing.module */ "vY5A");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app.component */ "Sy1n");
/* harmony import */ var _pages_home_home_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./pages/home/home.component */ "1LmZ");
/* harmony import */ var _pages_matches_matches_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./pages/matches/matches.component */ "7fYh");
/* harmony import */ var _components_match_list_match_list_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./components/match-list/match-list.component */ "nBev");
/* harmony import */ var _components_match_list_item_match_list_item_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./components/match-list-item/match-list-item.component */ "swYC");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/platform-browser/animations */ "R1ws");
/* harmony import */ var _materal_modules__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./materal-modules */ "drq4");
/* harmony import */ var _components_Layout_header_header_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./components/Layout/header/header.component */ "7bHu");
/* harmony import */ var _pages_following_following_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./pages/following/following.component */ "NBsa");
/* harmony import */ var _pages_match_details_match_details_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./pages/match-details/match-details.component */ "EhSf");
/* harmony import */ var _components_match_full_details_match_full_details_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./components/match-full-details/match-full-details.component */ "X8zi");
/* harmony import */ var _components_match_full_details_header_match_full_details_header_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./components/match-full-details-header/match-full-details-header.component */ "BQOP");
/* harmony import */ var _components_match_card_match_card_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./components/match-card/match-card.component */ "Gqp+");
/* harmony import */ var _pages_user_user_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./pages/user/user.component */ "3OJA");
/* harmony import */ var _pages_signup_signup_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./pages/signup/signup.component */ "o97b");
/* harmony import */ var _components_form_form_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./components/form/form.component */ "x83m");
/* harmony import */ var _components_input_input_component__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./components/input/input.component */ "LRb0");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _pages_login_login_component__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./pages/login/login.component */ "D8EZ");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _auth_auth_guard_service__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./auth/auth-guard.service */ "OTVi");
/* harmony import */ var _auth_auth_service__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./auth/auth.service */ "qXBG");
/* harmony import */ var _auth0_angular_jwt__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! @auth0/angular-jwt */ "Nm8O");
/* harmony import */ var _auth_auth_loggedin_service__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./auth/auth-loggedin.service */ "2dpJ");
/* harmony import */ var _components_users_profile_users_profile_component__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ./components/users-profile/users-profile.component */ "4kLO");
/* harmony import */ var _components_users_profile_details_users_profile_details_component__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ./components/users-profile-details/users-profile-details.component */ "KMwv");
/* harmony import */ var _components_Layout_hero_hero_component__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ./components/Layout/hero/hero.component */ "v2oA");
/* harmony import */ var _components_Layout_footer_footer_component__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! ./components/Layout/footer/footer.component */ "2SXB");
/* harmony import */ var ng_apexcharts__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! ng-apexcharts */ "CV0D");
/* harmony import */ var _components_utils_chart_chart_component__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! ./components/utils/chart/chart.component */ "KTqI");
/* harmony import */ var _components_match_list_nonmeta_item_match_list_nonmeta_item_component__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! ./components/match-list-nonmeta-item/match-list-nonmeta-item.component */ "gRg0");
/* harmony import */ var _components_Layout_search_bar_search_bar_component__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(/*! ./components/Layout/search-bar/search-bar.component */ "eyIA");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(/*! @angular/core */ "fXoL");




































class AppModule {
}
AppModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_35__["ɵɵdefineNgModule"]({ type: AppModule, bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"]] });
AppModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_35__["ɵɵdefineInjector"]({ factory: function AppModule_Factory(t) { return new (t || AppModule)(); }, providers: [
        _angular_common__WEBPACK_IMPORTED_MODULE_22__["DatePipe"],
        _auth_auth_guard_service__WEBPACK_IMPORTED_MODULE_23__["AuthGuardService"],
        _auth_auth_loggedin_service__WEBPACK_IMPORTED_MODULE_26__["AuthGuardLoggedinService"],
        _auth_auth_service__WEBPACK_IMPORTED_MODULE_24__["AuthService"],
        { provide: _auth0_angular_jwt__WEBPACK_IMPORTED_MODULE_25__["JWT_OPTIONS"], useValue: _auth0_angular_jwt__WEBPACK_IMPORTED_MODULE_25__["JWT_OPTIONS"] },
        _auth0_angular_jwt__WEBPACK_IMPORTED_MODULE_25__["JwtHelperService"]
    ], imports: [[
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
            _app_routing_module__WEBPACK_IMPORTED_MODULE_2__["AppRoutingModule"],
            _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClientModule"],
            _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_8__["BrowserAnimationsModule"],
            _materal_modules__WEBPACK_IMPORTED_MODULE_9__["MaterialModules"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_20__["FormsModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_20__["ReactiveFormsModule"],
            _auth0_angular_jwt__WEBPACK_IMPORTED_MODULE_25__["JwtModule"],
            ng_apexcharts__WEBPACK_IMPORTED_MODULE_31__["NgApexchartsModule"],
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_35__["ɵɵsetNgModuleScope"](AppModule, { declarations: [_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"],
        _pages_home_home_component__WEBPACK_IMPORTED_MODULE_4__["HomeComponent"],
        _pages_matches_matches_component__WEBPACK_IMPORTED_MODULE_5__["MatchesComponent"],
        _components_match_list_match_list_component__WEBPACK_IMPORTED_MODULE_6__["MatchListComponent"],
        _components_match_list_item_match_list_item_component__WEBPACK_IMPORTED_MODULE_7__["MatchListItemComponent"],
        _components_Layout_header_header_component__WEBPACK_IMPORTED_MODULE_10__["HeaderComponent"],
        _pages_following_following_component__WEBPACK_IMPORTED_MODULE_11__["FollowingComponent"],
        _pages_match_details_match_details_component__WEBPACK_IMPORTED_MODULE_12__["MatchDetailsComponent"],
        _components_match_full_details_match_full_details_component__WEBPACK_IMPORTED_MODULE_13__["MatchFullDetailsComponent"],
        _components_match_full_details_header_match_full_details_header_component__WEBPACK_IMPORTED_MODULE_14__["MatchFullDetailsHeaderComponent"],
        _components_match_card_match_card_component__WEBPACK_IMPORTED_MODULE_15__["MatchCardComponent"],
        _pages_user_user_component__WEBPACK_IMPORTED_MODULE_16__["UserComponent"],
        _pages_signup_signup_component__WEBPACK_IMPORTED_MODULE_17__["SignupComponent"],
        _components_form_form_component__WEBPACK_IMPORTED_MODULE_18__["FormComponent"],
        _components_input_input_component__WEBPACK_IMPORTED_MODULE_19__["InputComponent"],
        _pages_login_login_component__WEBPACK_IMPORTED_MODULE_21__["LoginComponent"],
        _components_users_profile_users_profile_component__WEBPACK_IMPORTED_MODULE_27__["UsersProfileComponent"],
        _components_users_profile_details_users_profile_details_component__WEBPACK_IMPORTED_MODULE_28__["UsersProfileDetailsComponent"],
        _components_Layout_hero_hero_component__WEBPACK_IMPORTED_MODULE_29__["HeroComponent"],
        _components_Layout_footer_footer_component__WEBPACK_IMPORTED_MODULE_30__["FooterComponent"],
        _components_utils_chart_chart_component__WEBPACK_IMPORTED_MODULE_32__["ChartComponent"],
        _components_match_list_nonmeta_item_match_list_nonmeta_item_component__WEBPACK_IMPORTED_MODULE_33__["MatchListNonmetaItemComponent"],
        _components_Layout_search_bar_search_bar_component__WEBPACK_IMPORTED_MODULE_34__["SearchBarComponent"]], imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
        _app_routing_module__WEBPACK_IMPORTED_MODULE_2__["AppRoutingModule"],
        _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClientModule"],
        _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_8__["BrowserAnimationsModule"],
        _materal_modules__WEBPACK_IMPORTED_MODULE_9__["MaterialModules"],
        _angular_forms__WEBPACK_IMPORTED_MODULE_20__["FormsModule"],
        _angular_forms__WEBPACK_IMPORTED_MODULE_20__["ReactiveFormsModule"],
        _auth0_angular_jwt__WEBPACK_IMPORTED_MODULE_25__["JwtModule"],
        ng_apexcharts__WEBPACK_IMPORTED_MODULE_31__["NgApexchartsModule"]] }); })();


/***/ }),

/***/ "drq4":
/*!************************************!*\
  !*** ./src/app/materal-modules.ts ***!
  \************************************/
/*! exports provided: MaterialModules */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MaterialModules", function() { return MaterialModules; });
/* harmony import */ var _angular_material_autocomplete__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/material/autocomplete */ "/1cH");
/* harmony import */ var _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material/datepicker */ "iadO");
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material/icon */ "NFeN");
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/input */ "qFsG");
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/core */ "FKr1");
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/form-field */ "kmnG");
/* harmony import */ var _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/progress-spinner */ "Xa2L");
/* harmony import */ var _angular_material_table__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/table */ "+0xr");
/* harmony import */ var _angular_material_paginator__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/paginator */ "M9IT");
/* harmony import */ var _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/toolbar */ "/t3+");
/* harmony import */ var _angular_material_card__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/card */ "Wp6s");
/* harmony import */ var _angular_material_grid_list__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/grid-list */ "zkoq");
/* harmony import */ var _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material/progress-bar */ "bv9b");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/material/button */ "bTqV");
/* harmony import */ var _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/material/sidenav */ "XhcP");
/* harmony import */ var _angular_material_menu__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/material/menu */ "STbY");
/* harmony import */ var _angular_material_tabs__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/material/tabs */ "wZkO");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/core */ "fXoL");


















class MaterialModules {
}
MaterialModules.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵdefineNgModule"]({ type: MaterialModules });
MaterialModules.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵdefineInjector"]({ factory: function MaterialModules_Factory(t) { return new (t || MaterialModules)(); }, imports: [_angular_material_autocomplete__WEBPACK_IMPORTED_MODULE_0__["MatAutocompleteModule"],
        _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_1__["MatDatepickerModule"],
        _angular_material_icon__WEBPACK_IMPORTED_MODULE_2__["MatIconModule"],
        _angular_material_input__WEBPACK_IMPORTED_MODULE_3__["MatInputModule"],
        _angular_material_core__WEBPACK_IMPORTED_MODULE_4__["MatNativeDateModule"],
        _angular_material_form_field__WEBPACK_IMPORTED_MODULE_5__["MatFormFieldModule"],
        _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_6__["MatProgressSpinnerModule"],
        _angular_material_form_field__WEBPACK_IMPORTED_MODULE_5__["MatFormFieldModule"],
        _angular_material_table__WEBPACK_IMPORTED_MODULE_7__["MatTableModule"],
        _angular_material_paginator__WEBPACK_IMPORTED_MODULE_8__["MatPaginatorModule"],
        _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_9__["MatToolbarModule"],
        _angular_material_card__WEBPACK_IMPORTED_MODULE_10__["MatCardModule"],
        _angular_material_grid_list__WEBPACK_IMPORTED_MODULE_11__["MatGridListModule"],
        _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_12__["MatProgressBarModule"],
        _angular_material_button__WEBPACK_IMPORTED_MODULE_13__["MatButtonModule"],
        _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_9__["MatToolbarModule"],
        _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_14__["MatSidenavModule"],
        _angular_material_menu__WEBPACK_IMPORTED_MODULE_15__["MatMenuModule"],
        _angular_material_tabs__WEBPACK_IMPORTED_MODULE_16__["MatTabsModule"]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵsetNgModuleScope"](MaterialModules, { exports: [_angular_material_autocomplete__WEBPACK_IMPORTED_MODULE_0__["MatAutocompleteModule"],
        _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_1__["MatDatepickerModule"],
        _angular_material_icon__WEBPACK_IMPORTED_MODULE_2__["MatIconModule"],
        _angular_material_input__WEBPACK_IMPORTED_MODULE_3__["MatInputModule"],
        _angular_material_core__WEBPACK_IMPORTED_MODULE_4__["MatNativeDateModule"],
        _angular_material_form_field__WEBPACK_IMPORTED_MODULE_5__["MatFormFieldModule"],
        _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_6__["MatProgressSpinnerModule"],
        _angular_material_form_field__WEBPACK_IMPORTED_MODULE_5__["MatFormFieldModule"],
        _angular_material_table__WEBPACK_IMPORTED_MODULE_7__["MatTableModule"],
        _angular_material_paginator__WEBPACK_IMPORTED_MODULE_8__["MatPaginatorModule"],
        _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_9__["MatToolbarModule"],
        _angular_material_card__WEBPACK_IMPORTED_MODULE_10__["MatCardModule"],
        _angular_material_grid_list__WEBPACK_IMPORTED_MODULE_11__["MatGridListModule"],
        _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_12__["MatProgressBarModule"],
        _angular_material_button__WEBPACK_IMPORTED_MODULE_13__["MatButtonModule"],
        _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_9__["MatToolbarModule"],
        _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_14__["MatSidenavModule"],
        _angular_material_menu__WEBPACK_IMPORTED_MODULE_15__["MatMenuModule"],
        _angular_material_tabs__WEBPACK_IMPORTED_MODULE_16__["MatTabsModule"]] }); })();


/***/ }),

/***/ "eyIA":
/*!**********************************************************************!*\
  !*** ./src/app/components/Layout/search-bar/search-bar.component.ts ***!
  \**********************************************************************/
/*! exports provided: SearchBarComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SearchBarComponent", function() { return SearchBarComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var src_app_services_requestUtils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/services/requestUtils */ "5pd0");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/form-field */ "kmnG");
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/input */ "qFsG");
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/icon */ "NFeN");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/common */ "ofXK");









function SearchBarComponent_span_8_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "span", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](ctx_r0.errormsg);
} }
const _c0 = function () { return { standalone: true }; };
class SearchBarComponent {
    constructor(reqUtils, router) {
        this.reqUtils = reqUtils;
        this.router = router;
        this.searchValue = '';
        this.errormsg = '';
    }
    ngOnInit() {
    }
    searchUser() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            if (this.searchValue.length > 0) {
                const res = yield this.reqUtils.getUserDataByName(this.searchValue);
                if (res.accountId) {
                    this.router.navigate(['/users', res.accountId]);
                    window.location.replace(`/users/${res.accountId}`);
                }
                else {
                    this.errormsg = 'No user found';
                }
            }
        });
    }
}
SearchBarComponent.ɵfac = function SearchBarComponent_Factory(t) { return new (t || SearchBarComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](src_app_services_requestUtils__WEBPACK_IMPORTED_MODULE_2__["RequestUtilities"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"])); };
SearchBarComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: SearchBarComponent, selectors: [["app-search-bar"]], decls: 9, vars: 4, consts: [[1, "searchField", 3, "submit"], [1, "example-form-field"], ["matInput", "", "type", "text", 3, "ngModel", "ngModelOptions", "ngModelChange"], ["mat-icon-button", "", "aria-label", "Example icon-button with search icon", 1, "example-icon"], ["class", "errormsg", 4, "ngIf"], [1, "errormsg"]], template: function SearchBarComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "form", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("submit", function SearchBarComponent_Template_form_submit_0_listener() { return ctx.searchUser(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "mat-form-field", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "mat-label");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3, "Search user");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "input", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("ngModelChange", function SearchBarComponent_Template_input_ngModelChange_4_listener($event) { return ctx.searchValue = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "span", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](6, "mat-icon");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](7, "search");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](8, SearchBarComponent_span_8_Template, 2, 1, "span", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngModel", ctx.searchValue)("ngModelOptions", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction0"](3, _c0));
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.errormsg);
    } }, directives: [_angular_forms__WEBPACK_IMPORTED_MODULE_4__["ɵangular_packages_forms_forms_y"], _angular_forms__WEBPACK_IMPORTED_MODULE_4__["NgControlStatusGroup"], _angular_forms__WEBPACK_IMPORTED_MODULE_4__["NgForm"], _angular_material_form_field__WEBPACK_IMPORTED_MODULE_5__["MatFormField"], _angular_material_form_field__WEBPACK_IMPORTED_MODULE_5__["MatLabel"], _angular_material_input__WEBPACK_IMPORTED_MODULE_6__["MatInput"], _angular_forms__WEBPACK_IMPORTED_MODULE_4__["DefaultValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_4__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_4__["NgModel"], _angular_material_icon__WEBPACK_IMPORTED_MODULE_7__["MatIcon"], _angular_common__WEBPACK_IMPORTED_MODULE_8__["NgIf"]], styles: [".searchField[_ngcontent-%COMP%] {\n  font-size: 0.8em;\n  width: 90%;\n  margin: 0;\n}\n.searchField[_ngcontent-%COMP%]   .example-form-field[_ngcontent-%COMP%]   .mat-form-field[_ngcontent-%COMP%], .searchField[_ngcontent-%COMP%]   .example-form-field[_ngcontent-%COMP%]   .mat-form[_ngcontent-%COMP%] {\n  display: block !important;\n}\n.searchField[_ngcontent-%COMP%]   .mat-form-field[_ngcontent-%COMP%] {\n  display: block;\n}\n.searchField[_ngcontent-%COMP%]   .example-icon[_ngcontent-%COMP%] {\n  width: 50px;\n  height: 50px;\n  margin: 0;\n  padding: 0;\n}\n.errormsg[_ngcontent-%COMP%] {\n  margin: 0;\n  padding: 0;\n  font-size: 0.9em;\n  -webkit-text-decoration: underline red;\n          text-decoration: underline red;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcLi5cXC4uXFwuLlxcc2VhcmNoLWJhci5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQTtFQUNFLGdCQUFBO0VBQ0EsVUFBQTtFQUNBLFNBQUE7QUFBRjtBQUVJO0VBQ0UseUJBQUE7QUFBTjtBQUdFO0VBQ0UsY0FBQTtBQURKO0FBR0U7RUFDRSxXQUFBO0VBQ0EsWUFBQTtFQUNBLFNBQUE7RUFDQSxVQUFBO0FBREo7QUFLQTtFQUNFLFNBQUE7RUFDQSxVQUFBO0VBQ0EsZ0JBQUE7RUFDQSxzQ0FBQTtVQUFBLDhCQUFBO0FBRkYiLCJmaWxlIjoic2VhcmNoLWJhci5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG4uc2VhcmNoRmllbGQge1xyXG4gIGZvbnQtc2l6ZTogMC44ZW07XHJcbiAgd2lkdGg6IDkwJTtcclxuICBtYXJnaW46IDA7XHJcbiAgLmV4YW1wbGUtZm9ybS1maWVsZCB7XHJcbiAgICAubWF0LWZvcm0tZmllbGQsIC5tYXQtZm9ybSB7XHJcbiAgICAgIGRpc3BsYXk6IGJsb2NrICFpbXBvcnRhbnQ7XHJcbiAgICB9XHJcbiAgfVxyXG4gIC5tYXQtZm9ybS1maWVsZCB7XHJcbiAgICBkaXNwbGF5OiBibG9jaztcclxuICB9XHJcbiAgLmV4YW1wbGUtaWNvbiB7XHJcbiAgICB3aWR0aDogNTBweDtcclxuICAgIGhlaWdodDogNTBweDtcclxuICAgIG1hcmdpbjogMDtcclxuICAgIHBhZGRpbmc6IDA7XHJcbiAgfVxyXG59XHJcblxyXG4uZXJyb3Jtc2cge1xyXG4gIG1hcmdpbjogMDtcclxuICBwYWRkaW5nOiAwO1xyXG4gIGZvbnQtc2l6ZTogMC45ZW07XHJcbiAgdGV4dC1kZWNvcmF0aW9uOiB1bmRlcmxpbmUgcmVkO1xyXG59XHJcbiJdfQ== */"] });


/***/ }),

/***/ "gRg0":
/*!*****************************************************************************************!*\
  !*** ./src/app/components/match-list-nonmeta-item/match-list-nonmeta-item.component.ts ***!
  \*****************************************************************************************/
/*! exports provided: MatchListNonmetaItemComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MatchListNonmetaItemComponent", function() { return MatchListNonmetaItemComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var src_app_services_request_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/services/request.service */ "CzMn");
/* harmony import */ var src_app_services_store_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/services/store.service */ "MtBC");
/* harmony import */ var src_app_services_general_utils_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/services/general-utils.service */ "0hFq");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/icon */ "NFeN");









function MatchListNonmetaItemComponent_div_0_div_1_tr_2_th_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "th");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "div", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](3, "Victory");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](ctx_r4.player.timeAgo);
} }
function MatchListNonmetaItemComponent_div_0_div_1_tr_2_th_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "th");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "div", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](3, "Defeat");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](ctx_r5.player.timeAgo);
} }
function MatchListNonmetaItemComponent_div_0_div_1_tr_2_td_3_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, "Aram");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} }
function MatchListNonmetaItemComponent_div_0_div_1_tr_2_td_4_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, "Ranked");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} }
function MatchListNonmetaItemComponent_div_0_div_1_tr_2_td_8_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](1, "img", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} if (rf & 2) {
    const champions_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2).ngIf;
    const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpropertyInterpolate2"]("src", "", ctx_r8.championImageUrl, "", champions_r2[ctx_r8.player.timeline.championID].image.full, "", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsanitizeUrl"]);
} }
const _c0 = function (a1) { return ["/matches", a1]; };
function MatchListNonmetaItemComponent_div_0_div_1_tr_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "tr");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](1, MatchListNonmetaItemComponent_div_0_div_1_tr_2_th_1_Template, 4, 1, "th", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](2, MatchListNonmetaItemComponent_div_0_div_1_tr_2_th_2_Template, 4, 1, "th", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](3, MatchListNonmetaItemComponent_div_0_div_1_tr_2_td_3_Template, 2, 0, "td", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](4, MatchListNonmetaItemComponent_div_0_div_1_tr_2_td_4_Template, 2, 0, "td", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](5, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](6, "img", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](7, "img", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](8, MatchListNonmetaItemComponent_div_0_div_1_tr_2_td_8_Template, 2, 2, "td", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](9, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](10);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](11, "td", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](12, " View Match ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](13, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](14, "arrow_forward");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} if (rf & 2) {
    const champions_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]().ngIf;
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx_r3.player.win);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", !ctx_r3.player.win);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx_r3.player.timeline.lane === "NONE");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx_r3.player.timeline.lane !== "NONE");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpropertyInterpolate"]("src", ctx_r3.player.summoners.summonersURL1, _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsanitizeUrl"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpropertyInterpolate"]("src", ctx_r3.player.summoners.summonersURL2, _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsanitizeUrl"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", champions_r2[ctx_r3.player.timeline.championID].image.full);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](ctx_r3.player.kda);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpureFunction1"](9, _c0, ctx_r3.match.gameId));
} }
const _c1 = function (a0, a1) { return { "victory": a0, "defeat": a1 }; };
function MatchListNonmetaItemComponent_div_0_div_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "table", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](2, MatchListNonmetaItemComponent_div_0_div_1_tr_2_Template, 15, 11, "tr", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpureFunction2"](2, _c1, ctx_r1.player.win, !ctx_r1.player.win));
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx_r1.loaded && ctx_r1.player.stats);
} }
function MatchListNonmetaItemComponent_div_0_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](1, MatchListNonmetaItemComponent_div_0_div_1_Template, 3, 5, "div", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](2, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx_r0.player.items.length > 0 && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind1"](2, 1, ctx_r0.champions$));
} }
/**
 * This Component is used when we have access to the matches in the store
 */
class MatchListNonmetaItemComponent {
    constructor(req, store, generalUtils) {
        this.req = req;
        this.store = store;
        this.generalUtils = generalUtils;
        this.itemData = [];
        this.title = 'match-details';
        this.expand = false;
        this.itemImageUrl = 'https://ddragon.leagueoflegends.com/cdn/11.7.1/img/item/';
        this.championImageUrl = 'https://ddragon.leagueoflegends.com/cdn/11.7.1/img/champion/';
        this.summonersURL = 'https://ddragon.leagueoflegends.com/cdn/11.8.1/img/spell/';
        this.loaded = false;
        this.myPartId = 0;
        this.champions$ = this.store.allChampions$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["map"])(data => {
            const changedChampions = Object.values(data).map((item) => [item.key, item]);
            const changed = Object.fromEntries(changedChampions);
            return changed;
        }));
    }
    ngOnInit() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            this.gameData = this.match;
            console.log(this.gameData);
            this.store.currentUser$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["take"])(1)).subscribe(res2 => {
                this.currentUserAccountId = res2.accountId;
            });
            for (const participant of this.gameData.participantIdentities) {
                if (participant.player.accountId === this.currentUserAccountId) {
                    this.myPartId = participant.participantId;
                }
            }
            this.getMatchData();
        });
    }
    getMatchData() {
        let me = this.myPartId;
        me = (me - 1);
        if (me === -1) {
            me++;
        }
        const participantIdentity = this.gameData.participantIdentities[me];
        const participantINFO = this.gameData.participants[me];
        const { role, lane } = participantINFO.timeline;
        const { item0, item1, item2, item3, item4, item5, item6, win } = participantINFO.stats;
        const playerItems = [item0, item1, item2, item3, item4, item5, item6];
        const items = this.generalUtils.getItems(playerItems);
        const { summonersURL1, summonersURL2 } = this.generalUtils.getSummoners(participantINFO.spell1Id, participantINFO.spell2Id);
        const kdaclear = (participantINFO.stats.kills + participantINFO.stats.assists) / participantINFO.stats.deaths;
        const kda = kdaclear.toFixed(2);
        const isRanked = this.gameData.teams[0].bans.length === 0 ? false : true;
        const playerToAdd = {
            name: participantIdentity.player.summonerName,
            accountId: participantIdentity.player.accountId,
            stats: participantINFO.stats,
            items,
            win,
            kda,
            timeAgo: this.match.timestamp,
            timeline: { lane, role, championID: participantINFO.championId, isRanked },
            summoners: { summonersURL1, summonersURL2 }
        };
        this.player = playerToAdd;
        this.loaded = true;
    }
}
MatchListNonmetaItemComponent.ɵfac = function MatchListNonmetaItemComponent_Factory(t) { return new (t || MatchListNonmetaItemComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](src_app_services_request_service__WEBPACK_IMPORTED_MODULE_3__["RequestService"]), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](src_app_services_store_service__WEBPACK_IMPORTED_MODULE_4__["StoreService"]), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](src_app_services_general_utils_service__WEBPACK_IMPORTED_MODULE_5__["GeneralUtilsService"])); };
MatchListNonmetaItemComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({ type: MatchListNonmetaItemComponent, selectors: [["app-match-list-nonmeta-item"]], inputs: { match: "match" }, decls: 1, vars: 1, consts: [["class", "match-table", 4, "ngIf"], [1, "match-table"], [4, "ngIf"], [3, "ngClass"], ["alt", "", 3, "src"], ["mat-icon-button", "", "aria-label", "Example icon-button with share icon", 3, "routerLink"], [1, "timeStamp"]], template: function MatchListNonmetaItemComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](0, MatchListNonmetaItemComponent_div_0_Template, 3, 3, "div", 0);
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.player && ctx.player.stats);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_6__["NgIf"], _angular_common__WEBPACK_IMPORTED_MODULE_6__["NgClass"], _angular_router__WEBPACK_IMPORTED_MODULE_7__["RouterLink"], _angular_material_icon__WEBPACK_IMPORTED_MODULE_8__["MatIcon"]], pipes: [_angular_common__WEBPACK_IMPORTED_MODULE_6__["AsyncPipe"]], styles: ["table[_ngcontent-%COMP%], th[_ngcontent-%COMP%], td[_ngcontent-%COMP%] {\n  background-color: var(--coolDark);\n  color: white;\n}\n\ntable[_ngcontent-%COMP%] {\n  width: 100%;\n  max-width: 850px;\n  margin: 0 auto;\n}\n\nth[_ngcontent-%COMP%] {\n  padding: 15px;\n  text-align: left;\n}\n\ntd[_ngcontent-%COMP%] {\n  text-align: center;\n}\n\ntd[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  width: 30px;\n  height: 30px;\n}\n\n.match-table[_ngcontent-%COMP%] {\n  margin: 8px;\n}\n\n.match-table[_ngcontent-%COMP%]   .timeStamp[_ngcontent-%COMP%] {\n  font-size: 11px;\n  font-weight: 50;\n}\n\n.victory[_ngcontent-%COMP%] {\n  border: 4px solid #4de94d;\n  border-radius: 10px;\n}\n\n.defeat[_ngcontent-%COMP%] {\n  border: 4px solid #9c1010;\n  border-radius: 10px;\n}\n\n.link[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  align-self: center;\n  align-items: center;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcLi5cXC4uXFxtYXRjaC1saXN0LW5vbm1ldGEtaXRlbS5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGlDQUFBO0VBQ0EsWUFBQTtBQUNGOztBQUNBO0VBQ0UsV0FBQTtFQUNBLGdCQUFBO0VBQ0EsY0FBQTtBQUVGOztBQUNBO0VBQ0UsYUFBQTtFQUNBLGdCQUFBO0FBRUY7O0FBQUE7RUFDRSxrQkFBQTtBQUdGOztBQUZFO0VBQ0UsV0FBQTtFQUNBLFlBQUE7QUFJSjs7QUFBQTtFQUNFLFdBQUE7QUFHRjs7QUFGRTtFQUNFLGVBQUE7RUFDQSxlQUFBO0FBSUo7O0FBQUE7RUFDRSx5QkFBQTtFQUNBLG1CQUFBO0FBR0Y7O0FBQUE7RUFDRSx5QkFBQTtFQUNBLG1CQUFBO0FBR0Y7O0FBQUE7RUFDRSxhQUFBO0VBQ0EsdUJBQUE7RUFDQSxrQkFBQTtFQUNBLG1CQUFBO0FBR0YiLCJmaWxlIjoibWF0Y2gtbGlzdC1ub25tZXRhLWl0ZW0uY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyJ0YWJsZSwgdGgsIHRkIHtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1jb29sRGFyayk7XHJcbiAgY29sb3I6IHdoaXRlO1xyXG59XHJcbnRhYmxlIHtcclxuICB3aWR0aDogMTAwJTtcclxuICBtYXgtd2lkdGg6IDg1MHB4O1xyXG4gIG1hcmdpbjogMCBhdXRvO1xyXG59XHJcblxyXG50aCB7XHJcbiAgcGFkZGluZzogMTVweDtcclxuICB0ZXh0LWFsaWduOiBsZWZ0O1xyXG59XHJcbnRkIHtcclxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgaW1nIHtcclxuICAgIHdpZHRoOiAzMHB4O1xyXG4gICAgaGVpZ2h0OiAzMHB4O1xyXG4gIH1cclxufVxyXG5cclxuLm1hdGNoLXRhYmxlIHtcclxuICBtYXJnaW46IDhweDtcclxuICAudGltZVN0YW1wIHtcclxuICAgIGZvbnQtc2l6ZTogMTFweDtcclxuICAgIGZvbnQtd2VpZ2h0OiA1MDtcclxuICB9XHJcbn1cclxuXHJcbi52aWN0b3J5IHtcclxuICBib3JkZXI6IDRweCBzb2xpZCByZ2IoNzcsIDIzMywgNzcpO1xyXG4gIGJvcmRlci1yYWRpdXM6IDEwcHg7XHJcbn1cclxuXHJcbi5kZWZlYXQge1xyXG4gIGJvcmRlcjogNHB4IHNvbGlkIHJnYigxNTYsIDE2LCAxNik7XHJcbiAgYm9yZGVyLXJhZGl1czogMTBweDtcclxufVxyXG5cclxuLmxpbmsge1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbiAgYWxpZ24tc2VsZjogY2VudGVyO1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcblxyXG59Il19 */"] });


/***/ }),

/***/ "nBev":
/*!***************************************************************!*\
  !*** ./src/app/components/match-list/match-list.component.ts ***!
  \***************************************************************/
/*! exports provided: MatchListComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MatchListComponent", function() { return MatchListComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var src_app_services_store_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/services/store.service */ "MtBC");
/* harmony import */ var src_app_services_requestUtils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/services/requestUtils */ "5pd0");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _match_list_item_match_list_item_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../match-list-item/match-list-item.component */ "swYC");
/* harmony import */ var _match_list_nonmeta_item_match_list_nonmeta_item_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../match-list-nonmeta-item/match-list-nonmeta-item.component */ "gRg0");
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/icon */ "NFeN");







function MatchListComponent_div_0_div_3_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "app-match-list-item", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const match_r4 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("match", match_r4);
} }
function MatchListComponent_div_0_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "h1");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "Latest matches");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](3, MatchListComponent_div_0_div_3_Template, 2, 1, "div", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx_r0.allMatches);
} }
function MatchListComponent_div_1_div_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "app-match-list-nonmeta-item", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const match_r6 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("match", match_r6);
} }
function MatchListComponent_div_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, MatchListComponent_div_1_div_1_Template, 2, 1, "div", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx_r1.nonMetaMetaches);
} }
function MatchListComponent_div_2_mat_icon_2_Template(rf, ctx) { if (rf & 1) {
    const _r9 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-icon", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function MatchListComponent_div_2_mat_icon_2_Template_mat_icon_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r9); const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2); return ctx_r8.getPagMatches(false); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, " arrow_back ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function MatchListComponent_div_2_Template(rf, ctx) { if (rf & 1) {
    const _r11 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](2, MatchListComponent_div_2_mat_icon_2_Template, 2, 0, "mat-icon", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "mat-icon", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function MatchListComponent_div_2_Template_mat_icon_click_4_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r11); const ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r10.getPagMatches(true); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5, "arrow_forward");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", !ctx_r2.start);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" Page: ", ctx_r2.page, " ");
} }
class MatchListComponent {
    constructor(store, utils) {
        this.store = store;
        this.utils = utils;
        this.allMatches = [];
        this.nonMetaMetaches = [];
        this.isInStore = false;
        this.start = true;
        this.endIndex = 5;
        this.page = 1;
        this.startIndex = 0;
        this.pageSize = 5;
        this.once = false;
    }
    ngOnInit() {
        const storeMatches = this.store.getCurrentUserLatestMatches();
        if (storeMatches.length > 0) {
            this.nonMetaMetaches = storeMatches;
            this.isInStore = true;
        }
        else {
            this.store.myMatches$.subscribe(res => {
                this.allMatches = res;
            });
        }
    }
    getPagMatches(option) {
        if (typeof option === 'string') {
            this.page = 1;
            this.startIndex = 0;
            this.endIndex = 5;
            this.utils.getMyUserMatches(this.userAccId, this.startIndex, this.endIndex);
        }
        else if (option) {
            this.page++;
            this.startIndex += 5;
            this.endIndex += 5;
            this.utils.getMyUserMatches(this.userAccId, this.startIndex, this.endIndex);
            this.start = false;
        }
        else {
            this.page--;
            this.startIndex -= 5;
            this.endIndex -= 5;
            if (this.startIndex <= 0) {
                this.start = true;
                this.startIndex = 0;
            }
            this.utils.getMyUserMatches(this.userAccId, this.startIndex, this.endIndex);
        }
    }
}
MatchListComponent.ɵfac = function MatchListComponent_Factory(t) { return new (t || MatchListComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](src_app_services_store_service__WEBPACK_IMPORTED_MODULE_1__["StoreService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](src_app_services_requestUtils__WEBPACK_IMPORTED_MODULE_2__["RequestUtilities"])); };
MatchListComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: MatchListComponent, selectors: [["app-match-list"]], decls: 3, vars: 3, consts: [["class", "user-games-data", 4, "ngIf"], [1, "user-games-data"], [4, "ngFor", "ngForOf"], [3, "match"], [1, "pag-items"], [3, "click", 4, "ngIf"], [3, "click"]], template: function MatchListComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](0, MatchListComponent_div_0_Template, 4, 1, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, MatchListComponent_div_1_Template, 2, 1, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](2, MatchListComponent_div_2_Template, 6, 2, "div", 0);
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.allMatches.length >= 5 && !ctx.isInStore);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.isInStore);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.allMatches.length >= 5 && !ctx.isInStore);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_3__["NgIf"], _angular_common__WEBPACK_IMPORTED_MODULE_3__["NgForOf"], _match_list_item_match_list_item_component__WEBPACK_IMPORTED_MODULE_4__["MatchListItemComponent"], _match_list_nonmeta_item_match_list_nonmeta_item_component__WEBPACK_IMPORTED_MODULE_5__["MatchListNonmetaItemComponent"], _angular_material_icon__WEBPACK_IMPORTED_MODULE_6__["MatIcon"]], styles: [".user-games-data[_ngcontent-%COMP%] {\n  width: 800px;\n  margin: 0 auto;\n  background-color: var(--smoothDark);\n}\n.user-games-data[_ngcontent-%COMP%]   .paginator[_ngcontent-%COMP%] {\n  background-color: black;\n}\n.user-games-data[_ngcontent-%COMP%]   .paginator[_ngcontent-%COMP%]   .pag-items[_ngcontent-%COMP%] {\n  margin: 0 auto;\n  text-align: center;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcLi5cXC4uXFxtYXRjaC1saXN0LmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsWUFBQTtFQUNBLGNBQUE7RUFDQSxtQ0FBQTtBQUNGO0FBQUU7RUFDRSx1QkFBQTtBQUVKO0FBREk7RUFDRSxjQUFBO0VBQ0Esa0JBQUE7QUFHTiIsImZpbGUiOiJtYXRjaC1saXN0LmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLnVzZXItZ2FtZXMtZGF0YSB7XHJcbiAgd2lkdGg6IDgwMHB4O1xyXG4gIG1hcmdpbjogMCBhdXRvO1xyXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLXNtb290aERhcmspO1xyXG4gIC5wYWdpbmF0b3Ige1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogYmxhY2s7XHJcbiAgICAucGFnLWl0ZW1zIHtcclxuICAgICAgbWFyZ2luOiAwIGF1dG87XHJcbiAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICAgIH1cclxuICB9XHJcbn0iXX0= */"] });


/***/ }),

/***/ "o97b":
/*!**************************************************!*\
  !*** ./src/app/pages/signup/signup.component.ts ***!
  \**************************************************/
/*! exports provided: SignupComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SignupComponent", function() { return SignupComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _components_form_form_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../components/form/form.component */ "x83m");


class SignupComponent {
    constructor() { }
    ngOnInit() {
    }
}
SignupComponent.ɵfac = function SignupComponent_Factory(t) { return new (t || SignupComponent)(); };
SignupComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: SignupComponent, selectors: [["app-signup"]], decls: 2, vars: 0, consts: [[1, "signUpPage"], ["page", "signup"]], template: function SignupComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "app-form", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, directives: [_components_form_form_component__WEBPACK_IMPORTED_MODULE_1__["FormComponent"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzaWdudXAuY29tcG9uZW50LnNjc3MifQ== */"] });


/***/ }),

/***/ "qXBG":
/*!**************************************!*\
  !*** ./src/app/auth/auth.service.ts ***!
  \**************************************/
/*! exports provided: AuthService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthService", function() { return AuthService; });
/* harmony import */ var _auth0_angular_jwt__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @auth0/angular-jwt */ "Nm8O");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _services_store_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../services/store.service */ "MtBC");




const jwt = new _auth0_angular_jwt__WEBPACK_IMPORTED_MODULE_0__["JwtHelperService"]();
class AuthService {
    constructor(jwtHelper, store) {
        this.jwtHelper = jwtHelper;
        this.store = store;
    }
    // ...
    isAuthenticated() {
        const token = sessionStorage.getItem('token');
        // Check whether the token is expired and return
        // true or false
        if (jwt.isTokenExpired(token)) {
            this.store.updateCurrentUser(false);
            this.store.updateCurrentProfileData(false);
            this.store.updateCurrentUserLatestMatches([]);
            this.store.updateFollowingData(false);
            this.store.updateMyMatches(false);
            sessionStorage.removeItem('token');
            sessionStorage.removeItem('user');
        }
        return !jwt.isTokenExpired(token);
    }
}
AuthService.ɵfac = function AuthService_Factory(t) { return new (t || AuthService)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_auth0_angular_jwt__WEBPACK_IMPORTED_MODULE_0__["JwtHelperService"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_services_store_service__WEBPACK_IMPORTED_MODULE_2__["StoreService"])); };
AuthService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({ token: AuthService, factory: AuthService.ɵfac });


/***/ }),

/***/ "swYC":
/*!*************************************************************************!*\
  !*** ./src/app/components/match-list-item/match-list-item.component.ts ***!
  \*************************************************************************/
/*! exports provided: MatchListItemComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MatchListItemComponent", function() { return MatchListItemComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var src_app_services_request_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/services/request.service */ "CzMn");
/* harmony import */ var src_app_services_store_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/services/store.service */ "MtBC");
/* harmony import */ var src_app_services_general_utils_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/services/general-utils.service */ "0hFq");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/icon */ "NFeN");









function MatchListItemComponent_div_0_div_1_tr_2_th_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "th");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, "Victory");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](2, "div", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](ctx_r4.player.timeAgo);
} }
function MatchListItemComponent_div_0_div_1_tr_2_th_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "th");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, "Defeat");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](2, "div", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](ctx_r5.player.timeAgo);
} }
function MatchListItemComponent_div_0_div_1_tr_2_td_8_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](1, "img", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} if (rf & 2) {
    const champions_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2).ngIf;
    const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpropertyInterpolate2"]("src", "", ctx_r6.championImageUrl, "", champions_r2[ctx_r6.player.timeline.championID].image.full, "", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsanitizeUrl"]);
} }
const _c0 = function (a1) { return ["/matches", a1]; };
function MatchListItemComponent_div_0_div_1_tr_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "tr");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](1, MatchListItemComponent_div_0_div_1_tr_2_th_1_Template, 4, 1, "th", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](2, MatchListItemComponent_div_0_div_1_tr_2_th_2_Template, 4, 1, "th", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](3, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](5, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](6, "img", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](7, "img", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](8, MatchListItemComponent_div_0_div_1_tr_2_td_8_Template, 2, 2, "td", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](9, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](10);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](11, "td", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](12, " Show");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](13, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](14, "arrow_forward");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} if (rf & 2) {
    const champions_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]().ngIf;
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx_r3.player.win);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", !ctx_r3.player.win);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](ctx_r3.player.timeline.isRanked ? "Ranked" : "Normal");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpropertyInterpolate"]("src", ctx_r3.player.summoners.summonersURL1, _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsanitizeUrl"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpropertyInterpolate"]("src", ctx_r3.player.summoners.summonersURL2, _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsanitizeUrl"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", champions_r2[ctx_r3.player.timeline.championID].image.full);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](ctx_r3.player.kda);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpureFunction1"](8, _c0, ctx_r3.match.gameId));
} }
const _c1 = function (a0, a1) { return { "victory": a0, "defeat": a1 }; };
function MatchListItemComponent_div_0_div_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "table", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](2, MatchListItemComponent_div_0_div_1_tr_2_Template, 15, 10, "tr", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpureFunction2"](2, _c1, ctx_r1.player.win, !ctx_r1.player.win));
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx_r1.loaded && ctx_r1.player.stats);
} }
function MatchListItemComponent_div_0_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](1, MatchListItemComponent_div_0_div_1_Template, 3, 5, "div", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](2, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx_r0.player.items.length > 0 && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind1"](2, 1, ctx_r0.champions$));
} }
/**
 * This Component is used when we dont have access to the matches in the store
 */
class MatchListItemComponent {
    constructor(req, store, generalUtils, router) {
        this.req = req;
        this.store = store;
        this.generalUtils = generalUtils;
        this.router = router;
        this.itemData = [];
        this.title = 'league-client-v2';
        this.expand = false;
        this.itemImageUrl = 'https://ddragon.leagueoflegends.com/cdn/11.7.1/img/item/';
        this.championImageUrl = 'https://ddragon.leagueoflegends.com/cdn/11.7.1/img/champion/';
        this.summonersURL = 'https://ddragon.leagueoflegends.com/cdn/11.8.1/img/spell/';
        this.loaded = false;
        this.myPartId = 0;
        this.champions$ = this.store.allChampions$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["map"])(data => {
            const changedChampions = Object.values(data).map((item) => [item.key, item]);
            return Object.fromEntries(changedChampions);
        }));
    }
    ngOnInit() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            yield this.getMatchDetails();
        });
    }
    getMatchDetails() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            console.log(this.match);
            try {
                const res = yield this.req.getMatchDetails(this.match.gameId);
                this.gameData = res;
                const userId = this.router.snapshot.paramMap.get('id');
                if (!userId) {
                    this.store.currentUser$.subscribe(res2 => {
                        this.currentUserAccountId = res2.accountId;
                    });
                    const oldList = this.store.getCurrentUserLatestMatches();
                    let newList = [];
                    this.gameData.timestamp = this.match.timestamp;
                    newList = oldList;
                    newList.push(this.gameData);
                    // newList.timestamp = this.match.timestamp
                    console.log(newList);
                    this.store.updateCurrentUserLatestMatches(newList);
                    for (const participant of this.gameData.participantIdentities) {
                        if (participant.player.accountId === this.currentUserAccountId) {
                            this.myPartId = participant.participantId;
                        }
                    }
                }
                else {
                    this.currentUserAccountId = userId;
                    for (const participant of this.gameData.participantIdentities) {
                        if (participant.player.accountId === userId) {
                            this.myPartId = participant.participantId;
                        }
                    }
                }
            }
            catch (error) {
                console.log(error);
            }
            for (const participant of this.gameData.participantIdentities) {
                if (participant.player.accountId === this.currentUserAccountId) {
                    this.myPartId = participant.participantId;
                }
            }
            this.getMatchData();
        });
    }
    getMatchData() {
        let me = this.myPartId;
        me = (me - 1);
        if (me === -1) {
            me++;
        }
        const participantIdentity = this.gameData.participantIdentities[me];
        const participantINFO = this.gameData.participants[me];
        const { role, lane } = participantINFO.timeline;
        const { item0, item1, item2, item3, item4, item5, item6, win } = participantINFO.stats;
        const playerItems = [item0, item1, item2, item3, item4, item5, item6];
        const items = this.generalUtils.getItems(playerItems);
        // const { imageURL } = this.generalUtils.getSpecificChampion(participantINFO.championId)
        const { summonersURL1, summonersURL2 } = this.generalUtils.getSummoners(participantINFO.spell1Id, participantINFO.spell2Id);
        const isRanked = this.gameData.teams[0].bans.length === 0 ? false : true;
        const kdaclear = (participantINFO.stats.kills + participantINFO.stats.assists) /
            (participantINFO.stats.deaths > 0 ? participantINFO.stats.deaths : 1);
        const kda = kdaclear.toFixed(2);
        const playerToAdd = {
            name: participantIdentity.player.summonerName,
            accountId: participantIdentity.player.accountId,
            stats: participantINFO.stats,
            items,
            win,
            kda,
            timeAgo: this.match.timestamp,
            timeline: { lane, role, championID: participantINFO.championId, gameType: this.gameData.gameMode, isRanked },
            summoners: { summonersURL1, summonersURL2 }
        };
        this.player = playerToAdd;
        this.loaded = true;
    }
    expandItem() {
        this.expand = !this.expand;
    }
}
MatchListItemComponent.ɵfac = function MatchListItemComponent_Factory(t) { return new (t || MatchListItemComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](src_app_services_request_service__WEBPACK_IMPORTED_MODULE_3__["RequestService"]), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](src_app_services_store_service__WEBPACK_IMPORTED_MODULE_4__["StoreService"]), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](src_app_services_general_utils_service__WEBPACK_IMPORTED_MODULE_5__["GeneralUtilsService"]), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_6__["ActivatedRoute"])); };
MatchListItemComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({ type: MatchListItemComponent, selectors: [["app-match-list-item"]], inputs: { match: "match" }, decls: 1, vars: 1, consts: [["class", "match-table", 4, "ngIf"], [1, "match-table"], [4, "ngIf"], [3, "ngClass"], ["alt", "", 3, "src"], ["mat-icon-button", "", "aria-label", "Example icon-button with share icon", 1, "testCenter", 3, "routerLink"], [1, "timeStamp"]], template: function MatchListItemComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](0, MatchListItemComponent_div_0_Template, 3, 3, "div", 0);
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.player && ctx.player.stats);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_7__["NgIf"], _angular_common__WEBPACK_IMPORTED_MODULE_7__["NgClass"], _angular_router__WEBPACK_IMPORTED_MODULE_6__["RouterLink"], _angular_material_icon__WEBPACK_IMPORTED_MODULE_8__["MatIcon"]], pipes: [_angular_common__WEBPACK_IMPORTED_MODULE_7__["AsyncPipe"]], styles: ["table[_ngcontent-%COMP%], th[_ngcontent-%COMP%], td[_ngcontent-%COMP%] {\n  background-color: var(--coolDark);\n  color: white;\n}\n\ntable[_ngcontent-%COMP%] {\n  width: 100%;\n  max-width: 850px;\n  margin: 0 auto;\n}\n\nth[_ngcontent-%COMP%] {\n  padding: 15px;\n  text-align: left;\n}\n\ntd[_ngcontent-%COMP%] {\n  text-align: center;\n}\n\ntd[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  width: 30px;\n  height: 30px;\n}\n\n.match-table[_ngcontent-%COMP%] {\n  margin: 8px;\n}\n\n.match-table[_ngcontent-%COMP%]   .timeStamp[_ngcontent-%COMP%] {\n  font-size: 11px;\n  font-weight: 50;\n}\n\n.match-table[_ngcontent-%COMP%]   .testCenter[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  align-self: center;\n  margin-top: 11%;\n  margin-left: 10%;\n}\n\n.victory[_ngcontent-%COMP%] {\n  border: 4px solid #4de94d;\n  border-radius: 10px;\n}\n\n.defeat[_ngcontent-%COMP%] {\n  border: 4px solid #9c1010;\n  border-radius: 10px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcLi5cXC4uXFxtYXRjaC1saXN0LWl0ZW0uY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxpQ0FBQTtFQUNBLFlBQUE7QUFDRjs7QUFDQTtFQUNFLFdBQUE7RUFDQSxnQkFBQTtFQUNBLGNBQUE7QUFFRjs7QUFDQTtFQUNFLGFBQUE7RUFDQSxnQkFBQTtBQUVGOztBQUFBO0VBQ0Usa0JBQUE7QUFHRjs7QUFGRTtFQUNFLFdBQUE7RUFDQSxZQUFBO0FBSUo7O0FBQUE7RUFLRSxXQUFBO0FBREY7O0FBSEU7RUFDRSxlQUFBO0VBQ0EsZUFBQTtBQUtKOztBQUZFO0VBQ0UsYUFBQTtFQUNBLG1CQUFBO0VBQ0Esa0JBQUE7RUFDQSxlQUFBO0VBQ0EsZ0JBQUE7QUFJSjs7QUFBQTtFQUNFLHlCQUFBO0VBQ0EsbUJBQUE7QUFHRjs7QUFBQTtFQUNFLHlCQUFBO0VBQ0EsbUJBQUE7QUFHRiIsImZpbGUiOiJtYXRjaC1saXN0LWl0ZW0uY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyJ0YWJsZSwgdGgsIHRkIHtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1jb29sRGFyayk7XHJcbiAgY29sb3I6IHdoaXRlO1xyXG59XHJcbnRhYmxlIHtcclxuICB3aWR0aDogMTAwJTtcclxuICBtYXgtd2lkdGg6IDg1MHB4O1xyXG4gIG1hcmdpbjogMCBhdXRvO1xyXG59XHJcblxyXG50aCB7XHJcbiAgcGFkZGluZzogMTVweDtcclxuICB0ZXh0LWFsaWduOiBsZWZ0O1xyXG59XHJcbnRkIHtcclxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgaW1nIHtcclxuICAgIHdpZHRoOiAzMHB4O1xyXG4gICAgaGVpZ2h0OiAzMHB4O1xyXG4gIH1cclxufVxyXG5cclxuLm1hdGNoLXRhYmxlIHtcclxuICAudGltZVN0YW1wIHtcclxuICAgIGZvbnQtc2l6ZTogMTFweDtcclxuICAgIGZvbnQtd2VpZ2h0OiA1MDtcclxuICB9XHJcbiAgbWFyZ2luOiA4cHg7XHJcbiAgLnRlc3RDZW50ZXIge1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgICBhbGlnbi1zZWxmOiBjZW50ZXI7XHJcbiAgICBtYXJnaW4tdG9wOiAxMSU7XHJcbiAgICBtYXJnaW4tbGVmdDogMTAlO1xyXG4gIH1cclxufVxyXG5cclxuLnZpY3Rvcnkge1xyXG4gIGJvcmRlcjogNHB4IHNvbGlkIHJnYig3NywgMjMzLCA3Nyk7XHJcbiAgYm9yZGVyLXJhZGl1czogMTBweDtcclxufVxyXG5cclxuLmRlZmVhdCB7XHJcbiAgYm9yZGVyOiA0cHggc29saWQgcmdiKDE1NiwgMTYsIDE2KTtcclxuICBib3JkZXItcmFkaXVzOiAxMHB4O1xyXG59XHJcblxyXG5cclxuIl19 */"] });


/***/ }),

/***/ "v2oA":
/*!**********************************************************!*\
  !*** ./src/app/components/Layout/hero/hero.component.ts ***!
  \**********************************************************/
/*! exports provided: HeroComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HeroComponent", function() { return HeroComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var src_app_services_store_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/services/store.service */ "MtBC");
/* harmony import */ var src_app_services_requestUtils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/services/requestUtils */ "5pd0");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/button */ "bTqV");







function HeroComponent_div_0_button_9_Template(rf, ctx) { if (rf & 1) {
    const _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "button", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function HeroComponent_div_0_button_9_Template_button_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r5); const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2); return ctx_r4.followUser(ctx_r4.userData.accountId); });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, "Follow");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} }
function HeroComponent_div_0_button_10_Template(rf, ctx) { if (rf & 1) {
    const _r7 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "button", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function HeroComponent_div_0_button_10_Template_button_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r7); const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2); return ctx_r6.unFollowUser(ctx_r6.userData.accountId); });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, "Unfollow");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} }
const _c0 = function (a0) { return { "background-image": a0 }; };
function HeroComponent_div_0_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "div", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](2, "div", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](3, "div", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](4, "img", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](5, "div", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](7, "div", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](9, HeroComponent_div_0_button_9_Template, 2, 0, "button", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](10, HeroComponent_div_0_button_10_Template, 2, 0, "button", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} if (rf & 2) {
    const user_r1 = ctx.ngIf;
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngStyle", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpureFunction1"](6, _c0, user_r1.accountId === ctx_r0.userData.accountId ? user_r1.favChampUrl : ctx_r0.userData.favoriteChampUrl));
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("src", ctx_r0.userData.profileIconId, _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsanitizeUrl"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](ctx_r0.userData.summonerLevel);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](ctx_r0.userData.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", user_r1.accountId !== ctx_r0.userData.accountId && !ctx_r0.isFollowed);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", user_r1.accountId !== ctx_r0.userData.accountId && ctx_r0.isFollowed);
} }
class HeroComponent {
    constructor(store, utils) {
        this.store = store;
        this.utils = utils;
        this.isFollowed = false;
        this.currentUser$ = this.store.currentUser$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["map"])(data => {
            const { imageURL } = data.favChamp;
            data.favChampUrl = `url(${imageURL})`;
            const { following } = data.userDetails;
            for (const follow of following) {
                if (follow === this.userData.accountId) {
                    this.isFollowed = true;
                }
            }
            return data;
        }));
    }
    ngOnInit() {
        const { imageURL } = this.favChamp;
        this.userData.favoriteChampUrl = `url(${imageURL})`;
    }
    followUser(accountId) {
        if (accountId) {
            this.store.currentUser$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["take"])(1)).subscribe((res) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
                const followUserResulst = yield this.utils.followUser(accountId, res.userDetails.id);
                if (followUserResulst.nModified === 1) {
                    this.addUserToStore(accountId);
                }
            }));
        }
    }
    unFollowUser(accountId) {
        this.store.currentUser$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["take"])(1)).subscribe((res) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const unFollowUserResult = yield this.utils.followUser(accountId, res.userDetails.id);
            console.log(unFollowUserResult);
            if (unFollowUserResult.nModified === 1) {
                this.removeUserFromStore(accountId);
            }
        }));
    }
    addUserToStore(id) {
        let userPlacerholder = {};
        this.store.currentUser$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["take"])(1)).subscribe(res => {
            userPlacerholder = res;
            userPlacerholder.userDetails.following.push(id);
        });
        this.store.updateCurrentUser(userPlacerholder);
    }
    removeUserFromStore(id) {
        let userPlacerholder = {};
        this.store.currentUser$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["take"])(1)).subscribe(res => {
            userPlacerholder = res;
            const { following } = userPlacerholder.userDetails;
            const userIndex = following.findIndex((accountId) => accountId === id);
            userPlacerholder.userDetails.following.splice(userIndex, 1);
        });
        console.log(userPlacerholder);
        this.store.updateCurrentUser(userPlacerholder);
    }
}
HeroComponent.ɵfac = function HeroComponent_Factory(t) { return new (t || HeroComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](src_app_services_store_service__WEBPACK_IMPORTED_MODULE_3__["StoreService"]), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](src_app_services_requestUtils__WEBPACK_IMPORTED_MODULE_4__["RequestUtilities"])); };
HeroComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({ type: HeroComponent, selectors: [["app-hero"]], inputs: { userData: "userData", favChamp: "favChamp" }, decls: 2, vars: 3, consts: [["class", "hero-wrapper", 4, "ngIf"], [1, "hero-wrapper"], [1, "hero-image", 3, "ngStyle"], [1, "hero-text"], [1, "icon-lvl"], ["alt", "", "srcset", "", 3, "src"], [1, "top-right"], [1, "profile-username"], ["mat-button", "", "color", "primary", 3, "click", 4, "ngIf"], ["mat-button", "", "color", "primary", 3, "click"]], template: function HeroComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](0, HeroComponent_div_0_Template, 11, 8, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](1, "async");
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind1"](1, 1, ctx.currentUser$));
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_5__["NgIf"], _angular_common__WEBPACK_IMPORTED_MODULE_5__["NgStyle"], _angular_material_button__WEBPACK_IMPORTED_MODULE_6__["MatButton"]], pipes: [_angular_common__WEBPACK_IMPORTED_MODULE_5__["AsyncPipe"]], styles: [".user-profile[_ngcontent-%COMP%] {\n  max-width: 1000px;\n  margin: 0 auto;\n}\n.user-profile[_ngcontent-%COMP%]   .ranked-user[_ngcontent-%COMP%] {\n  background-color: var(--coolDark);\n}\n.hero-wrapper[_ngcontent-%COMP%] {\n  box-shadow: 10px 10px 8px var(--highContrastRed);\n  height: 300px;\n  background-color: black;\n  margin: 20px 0;\n}\n.hero-wrapper[_ngcontent-%COMP%]   .hero-image[_ngcontent-%COMP%] {\n  height: 100%;\n  width: 100%;\n  background-position: center;\n  background-position-y: 15%;\n  background-repeat: no-repeat;\n  background-size: cover;\n  position: relative;\n}\n.hero-wrapper[_ngcontent-%COMP%]   .hero-text[_ngcontent-%COMP%] {\n  text-align: center;\n  position: absolute;\n  top: 50%;\n  left: 20%;\n  transform: translate(-50%, -50%);\n  font-size: 1.2em;\n  color: white;\n}\n.hero-wrapper[_ngcontent-%COMP%]   .hero-text[_ngcontent-%COMP%]   .profile-username[_ngcontent-%COMP%] {\n  width: 300px;\n  font-size: 1.2em;\n}\n.hero-wrapper[_ngcontent-%COMP%]   .hero-text[_ngcontent-%COMP%]   .icon-lvl[_ngcontent-%COMP%] {\n  position: relative;\n  text-align: center;\n  color: white;\n}\n.hero-wrapper[_ngcontent-%COMP%]   .hero-text[_ngcontent-%COMP%]   .icon-lvl[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  width: 100px;\n  border-radius: 20%;\n  height: 100px;\n}\n.hero-wrapper[_ngcontent-%COMP%]   .hero-text[_ngcontent-%COMP%]   .icon-lvl[_ngcontent-%COMP%]   .top-right[_ngcontent-%COMP%] {\n  padding: 4px;\n  border-radius: 50%;\n  position: absolute;\n  top: -15px;\n  left: 85px;\n  background-color: var(--coolDark);\n}\n@keyframes breathing {\n  0% {\n    -webkit-background-position-y: 15%;\n    -ms-background-position-y: 15%;\n    background-position-y: 15%;\n  }\n  50% {\n    -webkit-background-position-y: 17%;\n    -ms-background-position-y: 17%;\n    background-position-y: 17%;\n  }\n  100% {\n    -webkit-background-position-y: 15%;\n    -ms-background-position-y: 15%;\n    background-position-y: 15%;\n  }\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcLi5cXC4uXFwuLlxcaGVyby5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLGlCQUFBO0VBQ0EsY0FBQTtBQUNKO0FBQUk7RUFDRSxpQ0FBQTtBQUVOO0FBR0U7RUFDRSxnREFBQTtFQUNBLGFBQUE7RUFDQSx1QkFBQTtFQUNBLGNBQUE7QUFBSjtBQUNJO0VBRUUsWUFBQTtFQUNBLFdBQUE7RUFDQSwyQkFBQTtFQUNBLDBCQUFBO0VBQ0EsNEJBQUE7RUFDQSxzQkFBQTtFQUNBLGtCQUFBO0FBQU47QUFHSTtFQUVFLGtCQUFBO0VBQ0Esa0JBQUE7RUFDQSxRQUFBO0VBQ0EsU0FBQTtFQUNBLGdDQUFBO0VBQ0EsZ0JBQUE7RUFFQSxZQUFBO0FBSE47QUFJTTtFQUNFLFlBQUE7RUFDQSxnQkFBQTtBQUZSO0FBSU07RUFDRSxrQkFBQTtFQUNBLGtCQUFBO0VBQ0EsWUFBQTtBQUZSO0FBR1E7RUFDRSxZQUFBO0VBQ0Esa0JBQUE7RUFDQSxhQUFBO0FBRFY7QUFHUTtFQUNFLFlBQUE7RUFDQSxrQkFBQTtFQUNBLGtCQUFBO0VBQ0EsVUFBQTtFQUNBLFVBQUE7RUFDQSxpQ0FBQTtBQURWO0FBUUU7RUFDRTtJQUNFLGtDQUFBO0lBQ0EsOEJBQUE7SUFDQSwwQkFBQTtFQUxKO0VBUUU7SUFDRSxrQ0FBQTtJQUNBLDhCQUFBO0lBQ0EsMEJBQUE7RUFOSjtFQVNFO0lBQ0Usa0NBQUE7SUFDQSw4QkFBQTtJQUNBLDBCQUFBO0VBUEo7QUFDRiIsImZpbGUiOiJoZXJvLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLnVzZXItcHJvZmlsZSB7XHJcbiAgICBtYXgtd2lkdGg6IDEwMDBweDtcclxuICAgIG1hcmdpbjogMCBhdXRvO1xyXG4gICAgLnJhbmtlZC11c2VyIHtcclxuICAgICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tY29vbERhcmspO1xyXG4gICAgfVxyXG4gIH1cclxuICBcclxuICBcclxuICAuaGVyby13cmFwcGVyIHtcclxuICAgIGJveC1zaGFkb3c6IDEwcHggMTBweCA4cHggdmFyKC0taGlnaENvbnRyYXN0UmVkKTtcclxuICAgIGhlaWdodDogMzAwcHg7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBibGFjaztcclxuICAgIG1hcmdpbjogMjBweCAwO1xyXG4gICAgLmhlcm8taW1hZ2Uge1xyXG4gICAgICAvLyBhbmltYXRpb246IGJyZWF0aGluZyA1cyBlYXNlLW91dCBpbmZpbml0ZSBub3JtYWw7XHJcbiAgICAgIGhlaWdodDogMTAwJTtcclxuICAgICAgd2lkdGg6IDEwMCU7XHJcbiAgICAgIGJhY2tncm91bmQtcG9zaXRpb246IGNlbnRlcjtcclxuICAgICAgYmFja2dyb3VuZC1wb3NpdGlvbi15OiAxNSU7XHJcbiAgICAgIGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7XHJcbiAgICAgIGJhY2tncm91bmQtc2l6ZTpjb3ZlcjtcclxuICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gICAgICBcclxuICAgIH1cclxuICAgIC5oZXJvLXRleHQge1xyXG4gICAgICAvLyBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1saWdodERhcmspO1xyXG4gICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgICAgdG9wOiA1MCU7XHJcbiAgICAgIGxlZnQ6IDIwJTtcclxuICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTUwJSwgLTUwJSk7XHJcbiAgICAgIGZvbnQtc2l6ZTogMS4yZW07XHJcbiAgICBcclxuICAgICAgY29sb3I6IHdoaXRlO1xyXG4gICAgICAucHJvZmlsZS11c2VybmFtZSB7XHJcbiAgICAgICAgd2lkdGg6IDMwMHB4O1xyXG4gICAgICAgIGZvbnQtc2l6ZTogMS4yZW07XHJcbiAgICAgIH1cclxuICAgICAgLmljb24tbHZsIHtcclxuICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gICAgICAgIGNvbG9yOiB3aGl0ZTtcclxuICAgICAgICBpbWcge1xyXG4gICAgICAgICAgd2lkdGg6IDEwMHB4O1xyXG4gICAgICAgICAgYm9yZGVyLXJhZGl1czogMjAlO1xyXG4gICAgICAgICAgaGVpZ2h0OiAxMDBweDtcclxuICAgICAgICB9XHJcbiAgICAgICAgLnRvcC1yaWdodCB7XHJcbiAgICAgICAgICBwYWRkaW5nOiA0cHg7XHJcbiAgICAgICAgICBib3JkZXItcmFkaXVzOiA1MCU7XHJcbiAgICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICAgICAgICB0b3A6IC0xNXB4O1xyXG4gICAgICAgICAgbGVmdDogODVweDsgIFxyXG4gICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tY29vbERhcmsgICk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBAa2V5ZnJhbWVzIGJyZWF0aGluZyB7XHJcbiAgICAwJSB7XHJcbiAgICAgIC13ZWJraXQtYmFja2dyb3VuZC1wb3NpdGlvbi15OiAxNSU7XHJcbiAgICAgIC1tcy1iYWNrZ3JvdW5kLXBvc2l0aW9uLXk6IDE1JTtcclxuICAgICAgYmFja2dyb3VuZC1wb3NpdGlvbi15OiAxNSU7XHJcbiAgICB9XHJcbiAgXHJcbiAgICA1MCUge1xyXG4gICAgICAtd2Via2l0LWJhY2tncm91bmQtcG9zaXRpb24teTogMTclO1xyXG4gICAgICAtbXMtYmFja2dyb3VuZC1wb3NpdGlvbi15OiAxNyU7XHJcbiAgICAgIGJhY2tncm91bmQtcG9zaXRpb24teTogMTclO1xyXG4gICAgfVxyXG5cclxuICAgIDEwMCUge1xyXG4gICAgICAtd2Via2l0LWJhY2tncm91bmQtcG9zaXRpb24teTogMTUlO1xyXG4gICAgICAtbXMtYmFja2dyb3VuZC1wb3NpdGlvbi15OiAxNSU7XHJcbiAgICAgIGJhY2tncm91bmQtcG9zaXRpb24teTogMTUlO1xyXG4gICAgfVxyXG4gIH1cclxuICBcclxuICAiXX0= */"] });


/***/ }),

/***/ "vY5A":
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/*! exports provided: AppRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function() { return AppRoutingModule; });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _auth_auth_guard_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./auth/auth-guard.service */ "OTVi");
/* harmony import */ var _auth_auth_loggedin_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./auth/auth-loggedin.service */ "2dpJ");
/* harmony import */ var _components_users_profile_users_profile_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/users-profile/users-profile.component */ "4kLO");
/* harmony import */ var _pages_following_following_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./pages/following/following.component */ "NBsa");
/* harmony import */ var _pages_home_home_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./pages/home/home.component */ "1LmZ");
/* harmony import */ var _pages_login_login_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./pages/login/login.component */ "D8EZ");
/* harmony import */ var _pages_match_details_match_details_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./pages/match-details/match-details.component */ "EhSf");
/* harmony import */ var _pages_matches_matches_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./pages/matches/matches.component */ "7fYh");
/* harmony import */ var _pages_signup_signup_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./pages/signup/signup.component */ "o97b");
/* harmony import */ var _pages_user_user_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./pages/user/user.component */ "3OJA");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/core */ "fXoL");













const routes = [
    {
        path: '',
        component: _pages_home_home_component__WEBPACK_IMPORTED_MODULE_5__["HomeComponent"],
        canActivate: [_auth_auth_guard_service__WEBPACK_IMPORTED_MODULE_1__["AuthGuardService"]]
    },
    {
        path: 'matches',
        component: _pages_matches_matches_component__WEBPACK_IMPORTED_MODULE_8__["MatchesComponent"],
        canActivate: [_auth_auth_guard_service__WEBPACK_IMPORTED_MODULE_1__["AuthGuardService"]]
    },
    {
        path: 'matches/:id',
        component: _pages_match_details_match_details_component__WEBPACK_IMPORTED_MODULE_7__["MatchDetailsComponent"],
        canActivate: [_auth_auth_guard_service__WEBPACK_IMPORTED_MODULE_1__["AuthGuardService"]]
    },
    {
        path: 'following',
        component: _pages_following_following_component__WEBPACK_IMPORTED_MODULE_4__["FollowingComponent"],
        canActivate: [_auth_auth_guard_service__WEBPACK_IMPORTED_MODULE_1__["AuthGuardService"]]
    },
    {
        path: 'profile',
        component: _pages_user_user_component__WEBPACK_IMPORTED_MODULE_10__["UserComponent"],
        canActivate: [_auth_auth_guard_service__WEBPACK_IMPORTED_MODULE_1__["AuthGuardService"]]
    },
    {
        path: 'users/:id',
        component: _components_users_profile_users_profile_component__WEBPACK_IMPORTED_MODULE_3__["UsersProfileComponent"]
    },
    {
        path: 'signup',
        component: _pages_signup_signup_component__WEBPACK_IMPORTED_MODULE_9__["SignupComponent"]
    },
    {
        path: 'login',
        component: _pages_login_login_component__WEBPACK_IMPORTED_MODULE_6__["LoginComponent"],
        canActivate: [_auth_auth_loggedin_service__WEBPACK_IMPORTED_MODULE_2__["AuthGuardLoggedinService"]]
    },
    { path: '**', redirectTo: '' }
];
class AppRoutingModule {
}
AppRoutingModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵdefineNgModule"]({ type: AppRoutingModule });
AppRoutingModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵdefineInjector"]({ factory: function AppRoutingModule_Factory(t) { return new (t || AppRoutingModule)(); }, imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"].forRoot(routes)], _angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵsetNgModuleScope"](AppRoutingModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]] }); })();


/***/ }),

/***/ "x83m":
/*!***************************************************!*\
  !*** ./src/app/components/form/form.component.ts ***!
  \***************************************************/
/*! exports provided: FormComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FormComponent", function() { return FormComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var src_app_services_requestUtils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/services/requestUtils */ "5pd0");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _input_input_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../input/input.component */ "LRb0");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/button */ "bTqV");








function FormComponent_form_0_Template(rf, ctx) { if (rf & 1) {
    const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "form", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("submit", function FormComponent_form_0_Template_form_submit_0_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r3); const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](); return ctx_r2.submitForm($event); });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "h4");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, "Signup");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "app-input", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("inputData", function FormComponent_form_0_Template_app_input_inputData_3_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r3); const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](); return ctx_r4.handleEventData($event); });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "app-input", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("inputData", function FormComponent_form_0_Template_app_input_inputData_4_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r3); const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](); return ctx_r5.handleEventData($event); });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "button", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](6, "Signup");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} }
function FormComponent_form_1_p_5_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](ctx_r6.errorMsg);
} }
function FormComponent_form_1_Template(rf, ctx) { if (rf & 1) {
    const _r8 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "form", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("submit", function FormComponent_form_1_Template_form_submit_0_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r8); const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](); return ctx_r7.loginForm($event); });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "h4");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, "Login");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "app-input", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("inputData", function FormComponent_form_1_Template_app_input_inputData_3_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r8); const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](); return ctx_r9.handleEventData($event); });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "app-input", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("inputData", function FormComponent_form_1_Template_app_input_inputData_4_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r8); const ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](); return ctx_r10.handleEventData($event); });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](5, FormComponent_form_1_p_5_Template, 2, 1, "p", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](6, "button", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](7, "Login");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx_r1.errorMsg && ctx_r1.page === "login");
} }
class FormComponent {
    constructor(utils, router) {
        this.utils = utils;
        this.router = router;
        this.user = {
            summonerName: '',
            password: ''
        };
    }
    ngOnInit() {
    }
    handleEventData(inputData) {
        this.user[inputData.key] = inputData.value;
    }
    submitForm(event) {
        event.preventDefault();
        this.utils.signUp(this.user);
    }
    loginForm(event) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            event.preventDefault();
            const res = yield this.utils.login(this.user);
            if (res.error) {
                this.errorMsg = res.error.msg;
            }
            else {
                this.router.navigate(['/matches']);
                this.utils.fillFollowerDataToStore();
            }
        });
    }
}
FormComponent.ɵfac = function FormComponent_Factory(t) { return new (t || FormComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](src_app_services_requestUtils__WEBPACK_IMPORTED_MODULE_2__["RequestUtilities"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"])); };
FormComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: FormComponent, selectors: [["app-form"]], inputs: { page: "page" }, decls: 2, vars: 2, consts: [["class", "add-user-form", 3, "submit", 4, "ngIf"], [1, "add-user-form", 3, "submit"], ["type", "text", "value", "user.summonerName", "name", "summonerName", "placeholder", "Your summonername Ex: Faker", 3, "inputData"], ["type", "password", "value", "user.password", "name", "password", "placeholder", "password...", 3, "inputData"], ["mat-button", "", "color", "warn"], ["type", "text", "value", "user.summonerName", "name", "summonerName", "placeholder", "Your summonername", 3, "inputData"], [4, "ngIf"]], template: function FormComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](0, FormComponent_form_0_Template, 7, 0, "form", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](1, FormComponent_form_1_Template, 8, 1, "form", 0);
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.page === "signup");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.page === "login");
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_4__["NgIf"], _angular_forms__WEBPACK_IMPORTED_MODULE_5__["ɵangular_packages_forms_forms_y"], _angular_forms__WEBPACK_IMPORTED_MODULE_5__["NgControlStatusGroup"], _angular_forms__WEBPACK_IMPORTED_MODULE_5__["NgForm"], _input_input_component__WEBPACK_IMPORTED_MODULE_6__["InputComponent"], _angular_material_button__WEBPACK_IMPORTED_MODULE_7__["MatButton"]], styles: [".add-user-form[_ngcontent-%COMP%] {\n  padding: 20px;\n  display: block;\n  width: 500px;\n  margin: 0 auto;\n}\n.add-user-form[_ngcontent-%COMP%]   input[type=text][_ngcontent-%COMP%]:focus, .add-user-form[_ngcontent-%COMP%]   input[type=text][_ngcontent-%COMP%]:active {\n  background-color: inherit !important;\n}\n.add-user-form[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:-webkit-autofill {\n  -webkit-box-shadow: 0 0 0px 1000px white inset;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcLi5cXC4uXFxmb3JtLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBVUUsYUFBQTtFQUNBLGNBQUE7RUFDQSxZQUFBO0VBQ0EsY0FBQTtBQVJGO0FBSE07RUFDSSxvQ0FBQTtBQUtWO0FBRkU7RUFDSSw4Q0FBQTtBQUlOIiwiZmlsZSI6ImZvcm0uY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuYWRkLXVzZXItZm9ybSB7XHJcbiAgaW5wdXRbdHlwZT10ZXh0XSB7XHJcbiAgICAgICY6Zm9jdXMsICY6YWN0aXZle1xyXG4gICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogaW5oZXJpdCAhaW1wb3J0YW50O1xyXG4gICAgICB9XHJcbiAgfVxyXG4gIGlucHV0Oi13ZWJraXQtYXV0b2ZpbGwge1xyXG4gICAgICAtd2Via2l0LWJveC1zaGFkb3c6IDAgMCAwcHggMTAwMHB4IHdoaXRlIGluc2V0O1xyXG4gIH1cclxuICAvLyBtYXJnaW46IDA7XHJcbiAgcGFkZGluZzogMjBweDtcclxuICBkaXNwbGF5OiBibG9jaztcclxuICB3aWR0aDogNTAwcHg7XHJcbiAgbWFyZ2luOiAwIGF1dG87XHJcbn1cclxuXHJcbiJdfQ== */"] });


/***/ }),

/***/ "zUnb":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "jhN1");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "ZAI4");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "AytR");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["enableProdMode"])();
}
_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["platformBrowser"]().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(err => console.error(err));


/***/ }),

/***/ "zn8P":
/*!******************************************************!*\
  !*** ./$$_lazy_route_resource lazy namespace object ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "zn8P";

/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map
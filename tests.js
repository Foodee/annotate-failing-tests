'use strict';

define('star-fox/tests/acceptance/add-courier-test', ['exports', 'mocha', 'chai', 'star-fox/tests/helpers/start-app', 'star-fox/tests/helpers/destroy-app', 'star-fox/tests/acceptance/helpers/login', 'faker', 'star-fox/tests/acceptance/helpers/form-helpers'], function (exports, _mocha, _chai, _starFoxTestsHelpersStartApp, _starFoxTestsHelpersDestroyApp, _starFoxTestsAcceptanceHelpersLogin, _faker, _starFoxTestsAcceptanceHelpersFormHelpers) {

  (0, _mocha.describe)('acceptance.add.courier', function () {
    this.timeout(300000);

    var application = undefined;

    (0, _mocha.beforeEach)(function () {
      application = (0, _starFoxTestsHelpersStartApp['default'])();
    });

    (0, _mocha.afterEach)(function () {
      (0, _starFoxTestsHelpersDestroyApp['default'])(application);
    });

    // Page Objects and helpers
    var newCourierBtn = '.--fde-feature-view__new-button';
    var saveCourierBtn = 'button.save';
    var courierNameInput = '.--fde-text-field-for__courier_name input';
    var courierLegalNameInput = '.--fde-text-field-for__courier_legal-name input';
    var courierEmailInput = '.--fde-text-field-for__courier_owner-email input';
    var areaDropdown = 'i.dropdown.icon';
    var selectVancouver = '.--fde-dropdown-menu :contains("Vancouver")';

    function expectCourierName(newCourierName) {
      (0, _chai.expect)(find('.--fde-ordered-table').text()).to.contain('' + newCourierName);
    }

    (0, _mocha.describe)('Adding a new courier group', function () {
      (0, _mocha.beforeEach)(function () {
        (0, _starFoxTestsAcceptanceHelpersLogin.login)('developer@food.ee', 'password');
        visit('/logistics/couriers');
      });

      (0, _mocha.it)('fails when blank', function () {
        click(newCourierBtn);
        click(saveCourierBtn);

        andThen(function () {
          (0, _starFoxTestsAcceptanceHelpersFormHelpers.expectErrorToContain)('text', 'courier', 'name', "can't be blank");
        });
      });

      (0, _mocha.it)('succeeds when correctly filled out', function () {
        var newCourierName = _faker['default'].company.companyName('{{name.lastName}}');
        var legalName = _faker['default'].company.companyName('{{name.lastName}} {{company.companySuffix}}');
        var newEmail = _faker['default'].internet.email();

        click(newCourierBtn);
        fillIn(courierNameInput, newCourierName);
        fillIn(courierLegalNameInput, legalName);
        fillIn(courierEmailInput, newEmail);
        click(areaDropdown);
        click(selectVancouver);
        click(saveCourierBtn);

        andThen(function () {
          expectCourierName(newCourierName);
        });
      });
    });
  });
});
/* global */
define('star-fox/tests/acceptance/areas-test', ['exports', 'mocha', 'star-fox/tests/helpers/start-app', 'star-fox/tests/helpers/destroy-app', 'star-fox/tests/acceptance/helpers/login', 'star-fox/tests/acceptance/helpers/form-helpers'], function (exports, _mocha, _starFoxTestsHelpersStartApp, _starFoxTestsHelpersDestroyApp, _starFoxTestsAcceptanceHelpersLogin, _starFoxTestsAcceptanceHelpersFormHelpers) {

  (0, _mocha.describe)('acceptance.areas', function () {
    this.timeout(300000);

    var application = undefined;

    (0, _mocha.beforeEach)(function () {
      application = (0, _starFoxTestsHelpersStartApp['default'])();
    });

    (0, _mocha.afterEach)(function () {
      (0, _starFoxTestsHelpersDestroyApp['default'])(application);
    });

    (0, _mocha.describe)('Adding a new courier group', function () {
      (0, _mocha.beforeEach)(function () {
        (0, _starFoxTestsAcceptanceHelpersLogin.login)('developer@food.ee', 'password');
        visit('/areas/1/details');
      });

      (0, _mocha.it)('should validate area fields', function () {
        (0, _starFoxTestsAcceptanceHelpersFormHelpers.clearText)('area', 'prefix');
        (0, _starFoxTestsAcceptanceHelpersFormHelpers.clearText)('area', 'city');
        (0, _starFoxTestsAcceptanceHelpersFormHelpers.clearText)('area', 'deliveryFee');
        (0, _starFoxTestsAcceptanceHelpersFormHelpers.clearNumber)('area', 'deliveryLeadTime');

        (0, _starFoxTestsAcceptanceHelpersFormHelpers.clickFormSave)('area');

        andThen(function (_) {
          (0, _starFoxTestsAcceptanceHelpersFormHelpers.expectError)('text', 'area', 'prefix', 'can\'t be blank');
          (0, _starFoxTestsAcceptanceHelpersFormHelpers.expectError)('text', 'area', 'city', 'can\'t be blank');
          (0, _starFoxTestsAcceptanceHelpersFormHelpers.expectError)('text', 'area', 'deliveryFee', 'must be greater than 0');
          (0, _starFoxTestsAcceptanceHelpersFormHelpers.expectErrorToContain)('number', 'area', 'deliveryLeadTime', 'is not a number');
        });
      });
    });
  });
});
/* global */
define('star-fox/tests/acceptance/bookmarks/index-test', ['exports', 'mocha', 'star-fox/tests/helpers/start-app', 'star-fox/tests/helpers/destroy-app', 'star-fox/tests/acceptance/helpers/login', 'chai'], function (exports, _mocha, _starFoxTestsHelpersStartApp, _starFoxTestsHelpersDestroyApp, _starFoxTestsAcceptanceHelpersLogin, _chai) {

  (0, _mocha.describe)('acceptance.bookmarks.index', function () {
    this.timeout(300000);

    var application = undefined;

    (0, _mocha.beforeEach)(function () {
      application = (0, _starFoxTestsHelpersStartApp['default'])();
      (0, _starFoxTestsAcceptanceHelpersLogin.login)('developer@food.ee', 'password');
    });

    (0, _mocha.afterEach)(function () {
      (0, _starFoxTestsHelpersDestroyApp['default'])(application);
    });

    (0, _mocha.it)('shows all the fields', function () {
      visit('/bookmarks');

      andThen(function () {
        waitUntil('.fde-orders_new-order-button');
        (0, _chai.expect)(find('.fde-orders_index-container').text()).to.contain('test bookmark');
        (0, _chai.expect)(find('.fde-orders_index-container').text()).to.contain('January 1st 2050');
      });
    });
  });
});
/* global */
define('star-fox/tests/acceptance/change-rewards-plan-test', ['exports', 'mocha', 'chai', 'star-fox/tests/helpers/start-app', 'star-fox/tests/helpers/destroy-app', 'star-fox/tests/acceptance/helpers/login'], function (exports, _mocha, _chai, _starFoxTestsHelpersStartApp, _starFoxTestsHelpersDestroyApp, _starFoxTestsAcceptanceHelpersLogin) {

  (0, _mocha.describe)('acceptance.change.rewards.program.plan', function () {
    this.timeout(300000);

    var application = undefined;

    (0, _mocha.beforeEach)(function () {
      application = (0, _starFoxTestsHelpersStartApp['default'])();
    });

    (0, _mocha.afterEach)(function () {
      (0, _starFoxTestsHelpersDestroyApp['default'])(application);
    });

    //Page Objects and helpers
    var nonEnterpriseClient = '.--fde-ordered-table td:nth-child(1):not(:contains(enterprise)):first';
    var clickInternalTab = '.fde-tabbed-menu a:contains("Internal")';
    var clickUsersTab = '.fde-tabbed-menu a:contains("Users")';
    var rewardsPlanDropdown = '.--fde-field-for__client_plan i.dropdown.icon';
    var saveClientBtn = 'button.submit';

    function expectRewardPlanTab(text) {
      (0, _chai.expect)(find('.fde-tabbed-menu a').text()).to.contain('' + text);
    }

    function expectNoMealPlanTab(text) {
      (0, _chai.expect)(find('.fde-tabbed-menu a').text()).to.not.contain('' + text);
    }

    function selectNewRewardsPlan(plan) {
      click('.--fde-field-for__client_plan div[data-value="' + plan + '"]');
    }

    (0, _mocha.describe)('Changing the clients rewards program plan', function () {
      (0, _mocha.beforeEach)(function () {
        (0, _starFoxTestsAcceptanceHelpersLogin.login)('developer@food.ee', 'password');
        visit('/clients');
      });

      (0, _mocha.it)('Can set clients rewards plan to enterprise and back', function () {
        click(nonEnterpriseClient);
        click(clickInternalTab);
        click(rewardsPlanDropdown);
        selectNewRewardsPlan('enterprise');
        click(saveClientBtn);

        andThen(function () {
          expectRewardPlanTab('Meal Plan Settings');
        });

        // change the account back to pro
        click(rewardsPlanDropdown);
        selectNewRewardsPlan('pro');
        click(saveClientBtn);

        //Sometimes the meal plan settings tab doesn't become hidden when changing the rewards plan.
        //To overcome this you move to the users tab and back which causes the page to refresh.
        click(clickUsersTab);
        click(clickInternalTab);

        andThen(function () {
          expectNoMealPlanTab('Meal Plan Settings');
        });
      });
    });
  });
});
/* global */
define('star-fox/tests/acceptance/client-details-test', ['exports', 'faker', 'mocha', 'chai', 'star-fox/tests/helpers/start-app', 'star-fox/tests/helpers/destroy-app', 'star-fox/tests/acceptance/helpers/login', 'star-fox/tests/acceptance/helpers/form-for-helpers'], function (exports, _faker, _mocha, _chai, _starFoxTestsHelpersStartApp, _starFoxTestsHelpersDestroyApp, _starFoxTestsAcceptanceHelpersLogin, _starFoxTestsAcceptanceHelpersFormForHelpers) {

  (0, _mocha.describe)('acceptance.client.details', function () {
    this.timeout(300000);

    var application = undefined;

    (0, _mocha.beforeEach)(function () {
      application = (0, _starFoxTestsHelpersStartApp['default'])();
    });

    (0, _mocha.afterEach)(function () {
      (0, _starFoxTestsHelpersDestroyApp['default'])(application);
    });

    // Page Objects and helpers
    var deleteArea = '.ui.label:contains("Austin") .delete.icon';

    function saveClientDetails() {
      click('.--fde-form-for__client .submit');
    }

    function expectServiceArea(text) {
      (0, _chai.expect)(find('.--fde-field-for__client_areas .label').text()).to.contain(text);
    }

    function expectServiceAreaToBeRemoved(text) {
      (0, _chai.expect)(find('.--fde-field-for__client_areas .label').text()).to.not.contain(text);
    }

    function expectNotes(fieldName, text) {
      (0, _chai.expect)(find('.--fde-field-for__' + fieldName + ' textarea').val()).to.contain(text);
    }

    function expectTaxRate(taxRate) {
      (0, _chai.expect)(find('.--fde-field-for__client_tax-rate .text').text()).to.contain('' + taxRate);
    }

    function expectAddedLocation(location) {
      (0, _chai.expect)(find('.--fde-basic-field-for__name:contains("' + location + '")').length).to.equal(1);
    }

    function expectRemovedLocation(location) {
      (0, _chai.expect)(find('.--fde-basic-field-for__name:contains("' + location + '")').length).to.equal(0);
    }

    (0, _mocha.describe)('Editing client details', function () {
      (0, _mocha.beforeEach)(function () {
        (0, _starFoxTestsAcceptanceHelpersLogin.login)('developer@food.ee', 'password');
        visit('/clients/1');
      });

      (0, _mocha.it)('should be able to add and remove a service area', function () {
        (0, _starFoxTestsAcceptanceHelpersFormForHelpers.selectFromDropdown)('client_areas', '0');
        saveClientDetails();

        andThen(function (_) {
          expectServiceArea('Austin');
        });

        click(deleteArea);
        saveClientDetails();

        andThen(function (_) {
          expectServiceAreaToBeRemoved('Austin');
        });
      });

      (0, _mocha.it)('should be able to add a client note', function () {
        var newClientNote = _faker['default'].lorem.word();
        (0, _starFoxTestsAcceptanceHelpersFormForHelpers.fillInTextarea)('client', 'notes', '' + newClientNote);
        saveClientDetails();

        andThen(function (_) {
          expectNotes('client_notes', '' + newClientNote);
        });
      });

      (0, _mocha.it)('should be able to add a delivery note', function () {
        var newDeliveryNote = _faker['default'].lorem.word();
        (0, _starFoxTestsAcceptanceHelpersFormForHelpers.fillInTextarea)('client', 'deliveryNotes', '' + newDeliveryNote);
        saveClientDetails();

        andThen(function (_) {
          expectNotes('client_delivery-notes', '' + newDeliveryNote);
        });
      });

      (0, _mocha.it)('should be able to add a tax override', function () {
        // Reset to None
        (0, _starFoxTestsAcceptanceHelpersFormForHelpers.selectFromDropdownByText)('client_tax-rate', 'None');
        saveClientDetails();
        andThen(function (_) {
          expectTaxRate('None');
        });

        // Set to first tax rate in the list
        var firstTaxRate = $('.--fde-field-for__client_tax-rate .--fde-dropdown-menu div:nth(1)').text().trim();
        (0, _starFoxTestsAcceptanceHelpersFormForHelpers.selectFromDropdownByText)('client_tax-rate', firstTaxRate);
        saveClientDetails();
        andThen(function (_) {
          expectTaxRate(firstTaxRate);
        });

        // Set back to None
        (0, _starFoxTestsAcceptanceHelpersFormForHelpers.selectFromDropdownByText)('client_tax-rate', 'None');
        saveClientDetails();
        andThen(function (_) {
          expectTaxRate('None');
        });
      });
    });

    (0, _mocha.describe)('Adding and removing client delivery locations', function () {
      (0, _mocha.beforeEach)(function () {
        (0, _starFoxTestsAcceptanceHelpersLogin.login)('developer@food.ee', 'password');
        visit('/clients/1');
      });

      (0, _mocha.it)('should be able to add and remove delivery locations', function () {
        var locationName = 'Foodee ' + _faker['default'].lorem.word() + ' office';
        var deliveryLocations = ['120 Columbia St, Vancouver,BC, Canada', '545 Robson Street, Vancouver,BC, Canada', '1066 West Hastings Street, Vancouver,BC, Canada', '887 Great Northern Way, Vancouver,BC, Canada'];

        var randomDeliveryLocation = deliveryLocations[Math.floor(Math.random() * 4)];

        (0, _starFoxTestsAcceptanceHelpersFormForHelpers.addLocation)(locationName, randomDeliveryLocation);

        andThen(function (_) {
          expectAddedLocation(locationName);
        });

        (0, _starFoxTestsAcceptanceHelpersFormForHelpers.removeLocation)(locationName);

        andThen(function () {
          expectRemovedLocation(locationName);
        });
      });
    });
  });
});
/* global */
define('star-fox/tests/acceptance/client-index-test', ['exports', 'mocha', 'chai', 'star-fox/tests/helpers/start-app', 'star-fox/tests/helpers/destroy-app', 'star-fox/tests/acceptance/helpers/login'], function (exports, _mocha, _chai, _starFoxTestsHelpersStartApp, _starFoxTestsHelpersDestroyApp, _starFoxTestsAcceptanceHelpersLogin) {

  (0, _mocha.describe)('acceptance.client.index', function () {
    this.timeout(300000);

    var application = undefined;

    (0, _mocha.beforeEach)(function () {
      application = (0, _starFoxTestsHelpersStartApp['default'])();
    });

    (0, _mocha.afterEach)(function () {
      (0, _starFoxTestsHelpersDestroyApp['default'])(application);
    });

    // Page objects and helpers
    var areaFilterDropdown = '.dropdown.icon';
    var selectAreaFilterVan = '.--fde-dropdown-menu div:contains("Vancouver")';
    var newOrderBtn = 'button:contains("New Order"):first';

    function validateAreaFilter() {
      var clientAreaColumn = 4;

      //gets all the areas in the array
      var filteredClients = $('.--fde-ordered-table .fde-anchor-table-row td:nth-child(' + clientAreaColumn + ')').map(function (k, v) {
        return v.textContent;
      }).toArray();

      // validate that all areas are for vancouver
      (0, _chai.expect)(filteredClients.length).to.eql(filteredClients.filter(function (item) {
        return item.includes("Vancouver");
      }).length, 'Some of the clients were not from Vancouver as expected.');
    }

    (0, _mocha.describe)('Navigating the clients index page', function () {
      (0, _mocha.beforeEach)(function () {
        (0, _starFoxTestsAcceptanceHelpersLogin.login)('developer@food.ee', 'password');
        visit('/clients');
      });

      // it('can search for client', function () {
      //   fillIn(clientSearch, 'vancouver_client@food.ee');
      //
      //   andThen(_ => {
      //     expectClientSearchResults('vancouver_client@food.ee');
      //   });
      // });

      (0, _mocha.it)('can filter by area', function () {
        click(areaFilterDropdown);
        click(selectAreaFilterVan);

        andThen(function (_) {
          validateAreaFilter();
        });
      });

      (0, _mocha.it)('can place a order from client index', function () {
        click(newOrderBtn);

        andThen(function (_) {
          (0, _chai.expect)(currentPath()).to.equal('logged-in.new-order');
        });
      });
    });
  });
});
/* global */
define('star-fox/tests/acceptance/create-draft-order-test', ['exports', 'mocha', 'chai', 'star-fox/tests/helpers/start-app', 'star-fox/tests/helpers/destroy-app', 'star-fox/tests/acceptance/helpers/form-for-helpers', 'star-fox/tests/acceptance/helpers/login'], function (exports, _mocha, _chai, _starFoxTestsHelpersStartApp, _starFoxTestsHelpersDestroyApp, _starFoxTestsAcceptanceHelpersFormForHelpers, _starFoxTestsAcceptanceHelpersLogin) {

  (0, _mocha.describe)('acceptance.create.draft.order', function () {
    this.timeout(300000);

    var application = undefined;

    (0, _mocha.beforeEach)(function () {
      application = (0, _starFoxTestsHelpersStartApp['default'])();
    });

    (0, _mocha.afterEach)(function () {
      (0, _starFoxTestsHelpersDestroyApp['default'])(application);
    });

    (0, _mocha.describe)('When creating a regular order', function () {
      (0, _mocha.beforeEach)(function () {
        (0, _starFoxTestsAcceptanceHelpersLogin.login)('developer@food.ee', 'password');
        visit('/orders');
      });

      // IF you see the Ember-run error it is not a test error. Something has broken to cause that!
      (0, _mocha.it)('creates a new order with additional information', function () {
        (0, _starFoxTestsAcceptanceHelpersFormForHelpers.createNewOrder)();

        andThen(function () {
          (0, _chai.expect)(currentPath()).to.equal('logged-in.orders.edit.index');
        });
      });
    });

    (0, _mocha.describe)('When creating a group order', function () {
      (0, _mocha.beforeEach)(function () {
        (0, _starFoxTestsAcceptanceHelpersLogin.login)('developer@food.ee', 'password');
        visit('/orders');
      });

      (0, _mocha.it)('creates a new group order with additional information', function () {
        (0, _starFoxTestsAcceptanceHelpersFormForHelpers.createTeamOrder)();

        andThen(function () {
          (0, _chai.expect)(currentPath()).to.equal('logged-in.orders.edit.index');
        });
      });
    });
  });
});
/* global */
define('star-fox/tests/acceptance/create-meal-plan-order-test', ['exports', 'mocha', 'chai', 'star-fox/tests/helpers/start-app', 'star-fox/tests/helpers/destroy-app', 'star-fox/tests/acceptance/helpers/form-for-helpers', 'star-fox/tests/acceptance/helpers/login'], function (exports, _mocha, _chai, _starFoxTestsHelpersStartApp, _starFoxTestsHelpersDestroyApp, _starFoxTestsAcceptanceHelpersFormForHelpers, _starFoxTestsAcceptanceHelpersLogin) {

  (0, _mocha.describe)('acceptance.create.meal.plan.order', function () {
    this.timeout(300000);

    var application = undefined;

    (0, _mocha.beforeEach)(function () {
      application = (0, _starFoxTestsHelpersStartApp['default'])();
    });

    (0, _mocha.afterEach)(function () {
      (0, _starFoxTestsHelpersDestroyApp['default'])(application);
    });

    //Page objects and helpers
    var mealPlanToggleToOn = '.--fde-field-for__order_is-meal-plan-order .toggle label';

    function expectMealPlanUrlToBe(text) {
      (0, _chai.expect)(find('.--fde-field-for__order_is-meal-plan-url a').text()).to.contain(text);
    }

    function createMealPlan(role) {
      (0, _mocha.describe)('Creating a meal plan order as ' + role, function () {
        (0, _mocha.beforeEach)(function () {
          (0, _starFoxTestsAcceptanceHelpersLogin.login)(role + '@food.ee', 'password');
          visit('/orders');
          //needed to accept browser dialog box
          window.confirm = function () {
            return true;
          };
        });

        (0, _mocha.it)('creates a new meal plan order', function () {
          (0, _starFoxTestsAcceptanceHelpersFormForHelpers.createTeamOrder)();
          waitUntil(mealPlanToggleToOn);
          click(mealPlanToggleToOn);

          andThen(function () {
            expectMealPlanUrlToBe('teams/vancouver-client-llc');
          });
          (0, _starFoxTestsAcceptanceHelpersFormForHelpers.cancelOrder)();
        });
      });
    }
    createMealPlan('concierge');
  });
});
/* global */
define('star-fox/tests/acceptance/dev-team-test', ['exports', 'mocha', 'chai', 'star-fox/tests/helpers/start-app', 'star-fox/tests/helpers/destroy-app', 'star-fox/tests/acceptance/helpers/login'], function (exports, _mocha, _chai, _starFoxTestsHelpersStartApp, _starFoxTestsHelpersDestroyApp, _starFoxTestsAcceptanceHelpersLogin) {

  (0, _mocha.describe)('acceptance.dev-team-test', function () {
    this.timeout(20000);

    var application = undefined;

    (0, _mocha.beforeEach)(function () {
      application = (0, _starFoxTestsHelpersStartApp['default'])();
    });

    (0, _mocha.afterEach)(function () {
      (0, _starFoxTestsHelpersDestroyApp['default'])(application);
    });

    (0, _mocha.describe)('Visit all component sections in dev-team route', function () {
      (0, _mocha.beforeEach)(function () {
        (0, _starFoxTestsAcceptanceHelpersLogin.login)('developer@food.ee', 'password');
        visit('/clients');
      });

      (0, _mocha.it)('successfully visits all component sections without error', function () {
        visit('/dev-team/components/form-for');
        andThen(function (_) {
          (0, _chai.expect)(currentPath()).to.equal('logged-in.dev-team.components.form-for');
        });
        visit('/dev-team/components/controls');
        andThen(function (_) {
          (0, _chai.expect)(currentPath()).to.equal('logged-in.dev-team.components.controls');
        });
        visit('/dev-team/components/fields');
        andThen(function (_) {
          (0, _chai.expect)(currentPath()).to.equal('logged-in.dev-team.components.fields');
        });
        visit('/dev-team/components/forms');
        andThen(function (_) {
          (0, _chai.expect)(currentPath()).to.equal('logged-in.dev-team.components.forms');
        });
        visit('/dev-team/components/layouts');
        andThen(function (_) {
          (0, _chai.expect)(currentPath()).to.equal('logged-in.dev-team.components.layouts');
        });
        visit('/dev-team/components/logistics');
        andThen(function (_) {
          (0, _chai.expect)(currentPath()).to.equal('logged-in.dev-team.components.logistics');
        });
        visit('/dev-team/components/lists');
        andThen(function (_) {
          (0, _chai.expect)(currentPath()).to.equal('logged-in.dev-team.components.lists');
        });
        visit('/dev-team/components/misc');
        andThen(function (_) {
          (0, _chai.expect)(currentPath()).to.equal('logged-in.dev-team.components.misc');
        });
        visit('/dev-team/components/orders');
        andThen(function (_) {
          (0, _chai.expect)(currentPath()).to.equal('logged-in.dev-team.components.orders');
        });
        visit('/dev-team/components/menus');
        andThen(function (_) {
          (0, _chai.expect)(currentPath()).to.equal('logged-in.dev-team.components.menus');
        });
      });
    });
  });
});
/* global */
define('star-fox/tests/acceptance/dietary-tags-test', ['exports', 'mocha', 'chai', 'star-fox/tests/helpers/start-app', 'star-fox/tests/helpers/destroy-app', 'star-fox/tests/acceptance/helpers/login', 'ember-cli-mirage', 'star-fox/tests/acceptance/helpers/form-helpers', 'star-fox/tests/acceptance/helpers/form-for-helpers'], function (exports, _mocha, _chai, _starFoxTestsHelpersStartApp, _starFoxTestsHelpersDestroyApp, _starFoxTestsAcceptanceHelpersLogin, _emberCliMirage, _starFoxTestsAcceptanceHelpersFormHelpers, _starFoxTestsAcceptanceHelpersFormForHelpers) {

  (0, _mocha.describe)('acceptance.dietary.tags', function () {
    this.timeout(300000);

    var application = undefined;

    (0, _mocha.beforeEach)(function () {
      application = (0, _starFoxTestsHelpersStartApp['default'])();
    });

    (0, _mocha.afterEach)(function () {
      (0, _starFoxTestsHelpersDestroyApp['default'])(application);
    });

    // Page Objects and helpers
    var newTagBtn = '.--new-button';
    var saveTagBtn = '.ui.button.save';

    function fillInTagDetails(modelName, text) {
      fillIn('.--fde-text-field-for__' + modelName + ' input', '' + text);
    }

    function expectTagFieldToContain(modelName, text) {
      (0, _chai.expect)(find('.--fde-basic-field-for__' + modelName).text()).to.contain('' + text);
    }

    function expectTagFieldNotContain(modelName, text) {
      (0, _chai.expect)(find('.--fde-basic-field-for__' + modelName).text()).to.not.contain('' + text);
    }

    function deleteTagBtn(text) {
      click('.--fde-form-for__dietary-tag:contains(' + text + ') button.destroy');
    }

    (0, _mocha.describe)('adding and deleting dietary tags', function () {
      var randomTagName = undefined;
      var randomAbrv = undefined;

      (0, _mocha.beforeEach)(function () {
        (0, _starFoxTestsAcceptanceHelpersLogin.login)('developer@food.ee', 'password');
        visit('/tags/dietary');
      });

      (0, _mocha.it)('should not be able to create a empty dietary tag', function () {
        click(newTagBtn);
        click(saveTagBtn);

        andThen(function () {
          (0, _starFoxTestsAcceptanceHelpersFormHelpers.expectError)('text', 'dietary-tag', 'name', 'can\'t be blank');
        });
      });

      (0, _mocha.it)('should be able to create a new dietary tag', function () {
        randomTagName = _emberCliMirage.faker.random.word();
        randomAbrv = _emberCliMirage.faker.address.countryCode();

        click(newTagBtn);
        fillInTagDetails('dietary-tag_name', randomTagName);
        fillInTagDetails('dietary-tag_slug', randomTagName);
        fillInTagDetails('dietary-tag_abbreviation', randomAbrv);
        fillInTagDetails('dietary-tag_color', '#ff0000');
        click(saveTagBtn);

        andThen(function () {
          expectTagFieldToContain('name', randomTagName);
          expectTagFieldToContain('slug', randomTagName);
          expectTagFieldToContain('abbreviation', randomAbrv);
          (0, _starFoxTestsAcceptanceHelpersFormForHelpers.expectSuccessToast)(randomTagName + ' saved!');
        });
      });

      (0, _mocha.it)('should be able to delete a dietary tag', function () {
        deleteTagBtn(randomTagName);

        andThen(function () {
          $('.button.confirm').click();
        });

        andThen(function () {
          expectTagFieldNotContain('name', randomTagName);
          expectTagFieldNotContain('slug', randomTagName);
          expectTagFieldNotContain('abbreviation', randomAbrv);
        });
      });
    });
  });
});
/* global */
define('star-fox/tests/acceptance/duplicate-order-test', ['exports', 'mocha', 'chai', 'star-fox/tests/helpers/start-app', 'star-fox/tests/helpers/destroy-app', 'star-fox/tests/acceptance/helpers/form-for-helpers', 'star-fox/tests/acceptance/helpers/login'], function (exports, _mocha, _chai, _starFoxTestsHelpersStartApp, _starFoxTestsHelpersDestroyApp, _starFoxTestsAcceptanceHelpersFormForHelpers, _starFoxTestsAcceptanceHelpersLogin) {

  (0, _mocha.describe)('acceptance.duplicate.order', function () {
    this.timeout(300000);

    var application = undefined;

    (0, _mocha.beforeEach)(function () {
      application = (0, _starFoxTestsHelpersStartApp['default'])();
    });

    (0, _mocha.afterEach)(function () {
      (0, _starFoxTestsHelpersDestroyApp['default'])(application);
    });

    //Page objects and helpers
    var dropdownActionBtn = '.fde-orders-edit_actions .fde-controls-action-button.dropdown';
    var duplicateOrderDetails = '.fde-controls-action-button-action-option:contains("Details Only")';
    var duplicateOrderDetailsAndItems = '.fde-controls-action-button-action-option:contains("Details & Order Items")';
    var goToCartButton = '.--fde-order-edit_view-cart';

    function expectOrderItemInCart() {
      (0, _chai.expect)(find('.fde-order-item'));
    }

    function expectOrderDetailsToContain(modelName, text) {
      (0, _chai.expect)(find('.--fde-field-for__order_' + modelName + ' .text').text()).to.contain(text);
    }

    function expectOrderNumberToBe(text) {
      (0, _chai.expect)(find('.--fde-form-for__order div.ui.header').text()).to.not.contain(text);
    }

    function expectOrderNumberToNotBe(text) {
      (0, _chai.expect)(find('.--fde-form-for__order div.ui.header').text()).to.not.contain(text);
    }

    function duplicateOrder(role) {
      (0, _mocha.describe)('Duplicating orders as a ' + role, function () {
        (0, _mocha.beforeEach)(function () {
          (0, _starFoxTestsAcceptanceHelpersLogin.login)(role + '@food.ee', 'password');
          visit('/orders');
          (0, _starFoxTestsAcceptanceHelpersFormForHelpers.createNewOrderWithNotesAndItems)();
          //needed to accept browser dialog box
          window.confirm = function () {
            return true;
          };
        });

        (0, _mocha.it)('duplicate order details', function () {
          // get values of delivery location, owner and contact
          var deliveryLocation = $('.--fde-field-for__order_client-location .text').text();
          var clientName = $('.--fde-field-for__order_client .text').text();
          var ownerName = $('.--fde-field-for__order_owner .text').text();
          var contactName = $('.--fde-field-for__order_contact .text').text();
          var currentOrderNumber = $('.--fde-form-for__order div.ui.header').text().trim().substring(5);

          click(dropdownActionBtn);
          click(duplicateOrderDetails);

          andThen(function () {
            expectOrderDetailsToContain('client', clientName);
            expectOrderDetailsToContain('client-location', deliveryLocation);
            expectOrderDetailsToContain('owner', ownerName);
            expectOrderDetailsToContain('contact', contactName);
            expectOrderNumberToBe(currentOrderNumber);
          });
          (0, _starFoxTestsAcceptanceHelpersFormForHelpers.cancelOrder)();
        });

        (0, _mocha.it)('duplicate orders details and order items', function () {
          var currentOrderNumber = $('.--fde-form-for__order div.ui.header').text().trim().substring(5);

          click(dropdownActionBtn);
          click(duplicateOrderDetailsAndItems);
          click(goToCartButton);

          andThen(function () {
            expectOrderItemInCart();
            expectOrderNumberToNotBe(currentOrderNumber);
          });
          (0, _starFoxTestsAcceptanceHelpersFormForHelpers.cancelOrder)();
        });
      });
    }
    duplicateOrder('concierge');
  });
});
/* global */
define('star-fox/tests/acceptance/edit-meal-plan-order-test', ['exports', 'mocha', 'star-fox/tests/helpers/start-app', 'star-fox/tests/helpers/destroy-app', 'star-fox/tests/acceptance/helpers/form-for-helpers', 'star-fox/tests/acceptance/helpers/team-order-helpers', 'star-fox/tests/acceptance/helpers/login'], function (exports, _mocha, _starFoxTestsHelpersStartApp, _starFoxTestsHelpersDestroyApp, _starFoxTestsAcceptanceHelpersFormForHelpers, _starFoxTestsAcceptanceHelpersTeamOrderHelpers, _starFoxTestsAcceptanceHelpersLogin) {

  (0, _mocha.describe)('acceptance.edit.meal.plan.order.details', function () {
    this.timeout(60000);

    var application = undefined;

    (0, _mocha.beforeEach)(function () {
      application = (0, _starFoxTestsHelpersStartApp['default'])();
    });

    (0, _mocha.afterEach)(function () {
      (0, _starFoxTestsHelpersDestroyApp['default'])(application);
    });

    //Page objects and helpers
    var mealPlanToggleToOn = '.--fde-field-for__order_is-meal-plan-order .toggle label';

    function editMealPlanOrder(role) {
      (0, _mocha.describe)('Editing meal plan order details as ' + role, function () {
        (0, _mocha.beforeEach)(function () {
          (0, _starFoxTestsAcceptanceHelpersLogin.login)(role + '@food.ee', 'password');
          visit('/orders');
          (0, _starFoxTestsAcceptanceHelpersFormForHelpers.createTeamOrder)();
          click(mealPlanToggleToOn);
          //needed to accept browser dialog box
          window.confirm = function () {
            return true;
          };
        });

        (0, _mocha.afterEach)(function () {
          (0, _starFoxTestsAcceptanceHelpersFormForHelpers.saveOrderDetails)();
          andThen(function (_) {
            return (0, _starFoxTestsAcceptanceHelpersFormForHelpers.expectSuccessToast)('Saved Order');
          });
          (0, _starFoxTestsAcceptanceHelpersFormForHelpers.cancelOrder)();
        });

        (0, _mocha.it)('edits the per person budget', function () {
          (0, _starFoxTestsAcceptanceHelpersTeamOrderHelpers.updateBudget)('25.00');
        });

        (0, _mocha.it)('edits the max number of people', function () {
          (0, _starFoxTestsAcceptanceHelpersFormForHelpers.fillInNumber)('order', 'maxNumberOfPeople', '100');
        });

        (0, _mocha.it)('makes the order same day', function () {
          (0, _starFoxTestsAcceptanceHelpersTeamOrderHelpers.clickSameDay)();
        });

        (0, _mocha.it)('makes the order a virtual food hall', function () {
          (0, _starFoxTestsAcceptanceHelpersTeamOrderHelpers.clickFoodHall)();
        });

        (0, _mocha.it)('makes the order pay out of pocket', function () {
          (0, _starFoxTestsAcceptanceHelpersTeamOrderHelpers.clickPoop)();
          (0, _starFoxTestsAcceptanceHelpersTeamOrderHelpers.addPoopFee)('5.00');
        });
      });
    }
    editMealPlanOrder('concierge');
  });
});
/* global */
define('star-fox/tests/acceptance/edit-regular-order-notes-test', ['exports', 'mocha', 'star-fox/tests/helpers/start-app', 'star-fox/tests/helpers/destroy-app', 'star-fox/tests/acceptance/helpers/form-for-helpers', 'star-fox/tests/acceptance/helpers/login'], function (exports, _mocha, _starFoxTestsHelpersStartApp, _starFoxTestsHelpersDestroyApp, _starFoxTestsAcceptanceHelpersFormForHelpers, _starFoxTestsAcceptanceHelpersLogin) {

  (0, _mocha.describe)('acceptance.order.edit.notes', function () {
    this.timeout(60000);

    var application = undefined;

    (0, _mocha.beforeEach)(function () {
      application = (0, _starFoxTestsHelpersStartApp['default'])();
    });

    (0, _mocha.afterEach)(function () {
      (0, _starFoxTestsHelpersDestroyApp['default'])(application);
    });

    function setUpOrderWithNoItems(role) {
      (0, _starFoxTestsAcceptanceHelpersLogin.login)(role + '@food.ee', 'password');
      visit('/orders');
      (0, _starFoxTestsAcceptanceHelpersFormForHelpers.createNewOrder)();
      click('.--fde-order-edit_order-details');
      //needed to accept browser dialog box
      window.confirm = function () {
        return true;
      };
    }

    function editRegularOrderNotes(role) {
      (0, _mocha.describe)('Editing order notes as a ' + role, function () {
        (0, _mocha.beforeEach)(function () {
          setUpOrderWithNoItems(role);
        });

        (0, _mocha.afterEach)(function () {
          andThen(function () {
            (0, _starFoxTestsAcceptanceHelpersFormForHelpers.expectSuccessToast)('Saved Order');
          });
          (0, _starFoxTestsAcceptanceHelpersFormForHelpers.cancelOrder)();
        });

        (0, _mocha.it)('should be able to add notes from client', function () {
          (0, _starFoxTestsAcceptanceHelpersFormForHelpers.fillInNotes)('client-notes', 'Notes from client');
          (0, _starFoxTestsAcceptanceHelpersFormForHelpers.saveOrderDetails)();

          andThen(function () {
            (0, _starFoxTestsAcceptanceHelpersFormForHelpers.expectNotesToContain)('client-notes', 'Notes from client');
          });
        });

        (0, _mocha.it)('should be able to add notes for accounting', function () {
          (0, _starFoxTestsAcceptanceHelpersFormForHelpers.fillInNotes)('accounting-notes', 'Notes for accounting');
          (0, _starFoxTestsAcceptanceHelpersFormForHelpers.saveOrderDetails)();

          andThen(function () {
            (0, _starFoxTestsAcceptanceHelpersFormForHelpers.expectNotesToContain)('accounting-notes', 'Notes for accounting');
          });
        });

        (0, _mocha.it)('should be able to add notes for restaurants', function () {
          (0, _starFoxTestsAcceptanceHelpersFormForHelpers.fillInNotes)('restaurant-notes', 'Notes for restaurants');
          (0, _starFoxTestsAcceptanceHelpersFormForHelpers.saveOrderDetails)();

          andThen(function () {
            (0, _starFoxTestsAcceptanceHelpersFormForHelpers.expectNotesToContain)('restaurant-notes', 'Notes for restaurants');
          });
        });

        (0, _mocha.it)('should be able to add notes for courier', function () {
          (0, _starFoxTestsAcceptanceHelpersFormForHelpers.fillInNotes)('courier-notes', 'Notes for courier');
          (0, _starFoxTestsAcceptanceHelpersFormForHelpers.saveOrderDetails)();

          andThen(function () {
            (0, _starFoxTestsAcceptanceHelpersFormForHelpers.expectNotesToContain)('courier-notes', 'Notes for courier');
          });
        });

        (0, _mocha.it)('should be able to add notes about order', function () {
          (0, _starFoxTestsAcceptanceHelpersFormForHelpers.fillInNotes)('accounting-notes', 'Notes for accounting');
          (0, _starFoxTestsAcceptanceHelpersFormForHelpers.saveOrderDetails)();

          andThen(function () {
            (0, _starFoxTestsAcceptanceHelpersFormForHelpers.expectNotesToContain)('accounting-notes', 'Notes for accounting');
          });
        });
      });
    }
    editRegularOrderNotes('concierge');
  });
});
/* global */
define('star-fox/tests/acceptance/edit-regular-order-payment-details-test', ['exports', 'mocha', 'star-fox/tests/helpers/start-app', 'star-fox/tests/helpers/destroy-app', 'star-fox/tests/acceptance/helpers/form-for-helpers', 'star-fox/tests/acceptance/helpers/pages/order-edit', 'star-fox/tests/acceptance/helpers/login'], function (exports, _mocha, _starFoxTestsHelpersStartApp, _starFoxTestsHelpersDestroyApp, _starFoxTestsAcceptanceHelpersFormForHelpers, _starFoxTestsAcceptanceHelpersPagesOrderEdit, _starFoxTestsAcceptanceHelpersLogin) {

  (0, _mocha.describe)('acceptance.order.edit.payment.details', function () {
    this.timeout(60000);

    var application = undefined;

    (0, _mocha.beforeEach)(function () {
      application = (0, _starFoxTestsHelpersStartApp['default'])();
    });

    (0, _mocha.afterEach)(function () {
      (0, _starFoxTestsHelpersDestroyApp['default'])(application);
    });

    //Page objects and helpers
    var applyPromoCodeBtn = '.--fde-field-for__order_promo-code-name .button';

    function setUpOrder(role) {
      (0, _starFoxTestsAcceptanceHelpersLogin.login)(role + '@food.ee', 'password');
      visit('/orders');
      (0, _starFoxTestsAcceptanceHelpersFormForHelpers.createNewOrder)();

      window.confirm = function () {
        return true;
      };
    }

    function editRegularOrderPayment(role) {
      (0, _mocha.describe)('Editing payment details as a ' + role, function () {
        (0, _mocha.beforeEach)(function () {
          setUpOrder(role);
        });

        (0, _mocha.it)('should be able to add a promo code', function () {
          (0, _starFoxTestsAcceptanceHelpersFormForHelpers.fillInText)('order', 'promoCodeName', 'VALID_PROMO_MULTIPLE');
          click(applyPromoCodeBtn);

          andThen(function () {
            (0, _starFoxTestsAcceptanceHelpersFormForHelpers.expectSuccessToast)('Promo code has been applied');
          });
          (0, _starFoxTestsAcceptanceHelpersFormForHelpers.cancelOrder)();
        });

        (0, _mocha.it)('should be able to add a client discount', function () {
          _starFoxTestsAcceptanceHelpersPagesOrderEdit.OrderEdit.clickAddClientDiscountBtn().clickClientDiscountListListItem().clickClientDiscountListItem().fillClientDiscountInput('10').addClientDiscountAccountingCode().fillClientDiscountDescription('Testing Description').fillClientDiscountCaseIdInput('abc-123').submitClientDiscount();

          andThen(function () {
            (0, _starFoxTestsAcceptanceHelpersFormForHelpers.expectSuccessToast)('Your discount was saved!');
          });

          (0, _starFoxTestsAcceptanceHelpersFormForHelpers.cancelOrder)();
        });

        (0, _mocha.it)('should be able to add a restaurant discount', function () {
          _starFoxTestsAcceptanceHelpersPagesOrderEdit.OrderEdit.clickAddRestaurantDiscountBtn().clickRestaurantDiscountListListItem().clickRestaurantDiscountListItem().fillRestaurantDiscountInput('10').addRestaurantDiscountAccountingCode().fillRestaurantDiscountDescription('Testing Description').fillRestaurantDiscountCaseIdInput('abc-123').submitRestaurantDiscount();

          andThen(function () {
            (0, _starFoxTestsAcceptanceHelpersFormForHelpers.expectSuccessToast)('Your discount was saved!');
          });

          (0, _starFoxTestsAcceptanceHelpersFormForHelpers.cancelOrder)();
        });
      });
    }
    editRegularOrderPayment('concierge');
  });
});
/* global */
define('star-fox/tests/acceptance/edit-regular-order-test', ['exports', 'mocha', 'chai', 'star-fox/tests/helpers/start-app', 'star-fox/tests/helpers/destroy-app', 'star-fox/tests/acceptance/helpers/form-for-helpers'], function (exports, _mocha, _chai, _starFoxTestsHelpersStartApp, _starFoxTestsHelpersDestroyApp, _starFoxTestsAcceptanceHelpersFormForHelpers) {

  (0, _mocha.describe)('acceptance.order.edit.details', function () {
    this.timeout(60000);

    var application = undefined;

    (0, _mocha.beforeEach)(function () {
      application = (0, _starFoxTestsHelpersStartApp['default'])();
    });

    (0, _mocha.afterEach)(function () {
      (0, _starFoxTestsHelpersDestroyApp['default'])(application);
    });

    //Page objects and helpers
    var addNewContactBtn = '.--fde-field-for__order_contact button';
    var saveContactDetailsBtn = '.--fde-field-for__order_contact button.submit';
    var addNewClientLocationBtn = '.--fde-field-for__order_client-location button';
    var customReferenceNumberInput = '.--fde-field-for__order_notes__client-reference-number input';
    var numberOfPeopleInput = '.--fde-field-for__order_number-of-people input';

    function expectClientDetailsToNotContain(modelName, text) {
      (0, _chai.expect)(find('.--fde-field-for__order_' + modelName + ' .text').text()).to.not.contain(text);
    }

    function fillInContactDetails(modelName, text) {
      var selector = '.--fde-field-for__contact_' + modelName + ' input';
      fillIn(selector, '' + text);
    }

    function triggerPhoneNumberKeyup() {
      find('.fde-phone-number_input').trigger('keyup');
      find('.fde-phone-number-control_input').trigger('input');
    }

    function expectContactDetails(modelName, text) {
      (0, _chai.expect)(find('.--fde-field-for__' + modelName + ' .text').text()).to.contain('' + text);
    }

    function expectEventName(modelName, text) {
      (0, _chai.expect)(find('.--fde-field-for__' + modelName + ' input').val()).to.contain('' + text);
    }

    function expectReferenceNumber(text) {
      (0, _chai.expect)(find('.--fde-field-for__order_notes__client-reference-number input').val()).to.contain('' + text);
    }

    function expectRestoNotChanged(text) {
      (0, _chai.expect)(find('.--fde-field-for__order_restaurant .text').text()).to.not.contain(text);
    }

    function expectNumberOfPeople(text) {
      (0, _chai.expect)(find('.--fde-field-for__order_number-of-people input').val()).to.contain('' + text);
    }

    function addClientLocation() {
      (0, _starFoxTestsAcceptanceHelpersFormForHelpers.fillInText)('pickup-location', 'google', '1224 Hamilton St, Vancouver,BC, Canada');
      var deliveryLocationWrapper = (0, _starFoxTestsAcceptanceHelpersFormForHelpers.fieldPath)('pickup-location', 'google');
      click(deliveryLocationWrapper + ' .item .content:first');

      waitUntil((0, _starFoxTestsAcceptanceHelpersFormForHelpers.fieldPath)('delivery-location', 'name'));
      (0, _starFoxTestsAcceptanceHelpersFormForHelpers.fillInText)('delivery-location', 'name', 'wooo!');
      (0, _starFoxTestsAcceptanceHelpersFormForHelpers.clickFormButton)('delivery-location', 'submit');
    }

    function editRegularOrder(role) {
      (0, _mocha.describe)('Editing order details as a ' + role, function () {
        (0, _mocha.beforeEach)(function () {
          (0, _starFoxTestsAcceptanceHelpersFormForHelpers.setUpOrderWithNoItems)(role);
        });

        (0, _mocha.it)('should be able to edit the client and have the delivery location, owner and contact change', function () {
          // get values of delivery location, owner and contact
          var deliveryLocation = $('.--fde-field-for__order_client-location .text').text();
          var ownerName = $('.--fde-field-for__order_owner .text').text();
          var contactName = $('.--fde-field-for__order_contact .text').text();

          (0, _starFoxTestsAcceptanceHelpersFormForHelpers.selectFromDropdown)('order_client', '2');

          andThen(function () {
            expectClientDetailsToNotContain('client-location', deliveryLocation);
            expectClientDetailsToNotContain('order_owner', ownerName);
            expectClientDetailsToNotContain('order_contact', contactName);
          });
          (0, _starFoxTestsAcceptanceHelpersFormForHelpers.cancelOrder)();
        });

        (0, _mocha.it)('should be able to add a new contact', function () {
          click(addNewContactBtn);
          fillInContactDetails('first-name', 'Bruce');
          fillInContactDetails('last-name', 'Wayne');
          fillInContactDetails('email', 'bruce@batman.com');
          fillInContactDetails('phone-number', '6044567890');

          andThen(function () {
            triggerPhoneNumberKeyup();
          });

          click(saveContactDetailsBtn);

          andThen(function () {
            expectContactDetails('order_contact', 'Bruce Wayne');
          });
          (0, _starFoxTestsAcceptanceHelpersFormForHelpers.cancelOrder)();
        });

        (0, _mocha.it)('should be able to add a new delivery location', function () {
          click(addNewClientLocationBtn);
          addClientLocation();

          andThen(function () {
            (0, _starFoxTestsAcceptanceHelpersFormForHelpers.expectSuccessToast)('Successfully created a new delivery location');
          });
          (0, _starFoxTestsAcceptanceHelpersFormForHelpers.cancelOrder)();
        });

        (0, _mocha.it)('should be able to edit the event name', function () {
          (0, _starFoxTestsAcceptanceHelpersFormForHelpers.fillInText)('order', 'name', 'Automated Event');
          (0, _starFoxTestsAcceptanceHelpersFormForHelpers.saveOrderDetails)();

          andThen(function () {
            (0, _starFoxTestsAcceptanceHelpersFormForHelpers.expectSuccessToast)('Saved Order');
            expectEventName('order_name', 'Automated Event');
          });
          (0, _starFoxTestsAcceptanceHelpersFormForHelpers.cancelOrder)();
        });

        (0, _mocha.it)('should be able to add a custom reference number', function () {
          fillIn(customReferenceNumberInput, 'abc-123');
          (0, _starFoxTestsAcceptanceHelpersFormForHelpers.saveOrderDetails)();

          andThen(function () {
            (0, _starFoxTestsAcceptanceHelpersFormForHelpers.expectSuccessToast)('Saved Order');
            expectReferenceNumber('abc-123');
          });
          (0, _starFoxTestsAcceptanceHelpersFormForHelpers.cancelOrder)();
        });
      });

      (0, _mocha.describe)('Editing restaurant details', function () {
        (0, _mocha.beforeEach)(function () {
          (0, _starFoxTestsAcceptanceHelpersFormForHelpers.setUpOrderWithNoItems)(role);
        });

        (0, _mocha.it)('should be able to change the restaurant', function () {
          var currentResto = $('.--fde-field-for__order_restaurant .text').text();
          (0, _starFoxTestsAcceptanceHelpersFormForHelpers.selectFromDropdown)('order_restaurant', '1');
          (0, _starFoxTestsAcceptanceHelpersFormForHelpers.saveOrderDetails)();

          andThen(function () {
            (0, _starFoxTestsAcceptanceHelpersFormForHelpers.expectSuccessToast)('Saved Order');
            expectRestoNotChanged(currentResto);
          });
          (0, _starFoxTestsAcceptanceHelpersFormForHelpers.cancelOrder)();
        });

        (0, _mocha.it)('should be able to change the #people', function () {
          fillIn(numberOfPeopleInput, '102');
          (0, _starFoxTestsAcceptanceHelpersFormForHelpers.saveOrderDetails)();

          andThen(function () {
            (0, _starFoxTestsAcceptanceHelpersFormForHelpers.expectSuccessToast)('Saved Order');
            expectNumberOfPeople('102');
          });
          (0, _starFoxTestsAcceptanceHelpersFormForHelpers.cancelOrder)();
        });
      });
    }
    editRegularOrder('concierge');
  });
});
/* global */
define('star-fox/tests/acceptance/edit-team-order-test', ['exports', 'mocha', 'star-fox/tests/helpers/start-app', 'star-fox/tests/helpers/destroy-app', 'star-fox/tests/acceptance/helpers/form-for-helpers', 'star-fox/tests/acceptance/helpers/team-order-helpers', 'star-fox/tests/acceptance/helpers/login'], function (exports, _mocha, _starFoxTestsHelpersStartApp, _starFoxTestsHelpersDestroyApp, _starFoxTestsAcceptanceHelpersFormForHelpers, _starFoxTestsAcceptanceHelpersTeamOrderHelpers, _starFoxTestsAcceptanceHelpersLogin) {

  (0, _mocha.describe)('acceptance.edit.team.order.details', function () {
    this.timeout(60000);

    var application = undefined;

    (0, _mocha.beforeEach)(function () {
      application = (0, _starFoxTestsHelpersStartApp['default'])();
    });

    (0, _mocha.afterEach)(function () {
      (0, _starFoxTestsHelpersDestroyApp['default'])(application);
    });

    //Page objects and helpers
    var mealPlanToggleToOn = '.--fde-field-for__order_is-meal-plan-order .toggle label';

    function editTeamOrder(role) {
      (0, _mocha.describe)('Editing team order details as ' + role, function () {
        (0, _mocha.beforeEach)(function () {
          (0, _starFoxTestsAcceptanceHelpersLogin.login)(role + '@food.ee', 'password');
          visit('/orders');
          (0, _starFoxTestsAcceptanceHelpersFormForHelpers.createTeamOrder)();
          //needed to accept browser dialog box
          window.confirm = function () {
            return true;
          };
        });

        (0, _mocha.afterEach)(function () {
          (0, _starFoxTestsAcceptanceHelpersFormForHelpers.saveOrderDetails)();
          andThen(function (_) {
            return (0, _starFoxTestsAcceptanceHelpersFormForHelpers.expectSuccessToast)('Saved Order');
          });
          (0, _starFoxTestsAcceptanceHelpersFormForHelpers.cancelOrder)();
        });

        (0, _mocha.it)('edits the per person budget', function () {
          (0, _starFoxTestsAcceptanceHelpersTeamOrderHelpers.updateBudget)('25.00');
        });

        (0, _mocha.it)('makes the order a meal plan', function () {
          click(mealPlanToggleToOn);
        });

        (0, _mocha.it)('edits the max number of people', function () {
          (0, _starFoxTestsAcceptanceHelpersFormForHelpers.fillInNumber)('order', 'maxNumberOfPeople', '100');
        });

        (0, _mocha.it)('makes the order same day', function () {
          (0, _starFoxTestsAcceptanceHelpersTeamOrderHelpers.clickSameDay)();
        });

        (0, _mocha.it)('makes the order a virtual food hall', function () {
          (0, _starFoxTestsAcceptanceHelpersTeamOrderHelpers.clickFoodHall)();
        });

        (0, _mocha.it)('makes the order pay out of pocket', function () {
          (0, _starFoxTestsAcceptanceHelpersTeamOrderHelpers.clickPoop)();
          (0, _starFoxTestsAcceptanceHelpersTeamOrderHelpers.addPoopFee)('5.00');
        });
      });
    }
    editTeamOrder('concierge');
  });
});
/* global */
define('star-fox/tests/acceptance/helpers/component-helpers', ['exports'], function (exports) {
  exports.clickActionButton = clickActionButton;

  function clickActionButton(name, option) {

    var selector = '.' + name;

    return triggerEvent(selector, 'mouseenter').then(function (_) {
      return click(selector);
    }).then(function (_) {
      return click(selector, '.fde-controls-action-button-action-option:contains("' + option + '")');
    });
  }
});
define('star-fox/tests/acceptance/helpers/form-for-helpers', ['exports', 'ember', 'star-fox/tests/acceptance/helpers/login', 'chai'], function (exports, _ember, _starFoxTestsAcceptanceHelpersLogin, _chai) {
  exports.fieldPath = fieldPath;
  exports.formPath = formPath;
  exports.fillInText = fillInText;
  exports.fillInPassword = fillInPassword;
  exports.clearText = clearText;
  exports.fillInAmount = fillInAmount;
  exports.fillInNumber = fillInNumber;
  exports.clearNumber = clearNumber;
  exports.fillInTextarea = fillInTextarea;
  exports.clearTextarea = clearTextarea;
  exports.clickToInlineEdit = clickToInlineEdit;
  exports.confirmInlineEdit = confirmInlineEdit;
  exports.cancelInlineEdit = cancelInlineEdit;
  exports.inlineEditTextarea = inlineEditTextarea;
  exports.inlineEditText = inlineEditText;
  exports.inlineEdit = inlineEdit;
  exports.clickFormButton = clickFormButton;
  exports.clickFormSubmit = clickFormSubmit;
  exports.clickFormReset = clickFormReset;
  exports.clickFormDestroy = clickFormDestroy;
  exports.clickFormCheckbox = clickFormCheckbox;
  exports.expectError = expectError;
  exports.expectErrorToContain = expectErrorToContain;
  exports.expectFormDisplayValue = expectFormDisplayValue;
  exports.expectFormValue = expectFormValue;
  exports.selectItemFromDropdown = selectItemFromDropdown;
  exports.selectFromDropdown = selectFromDropdown;
  exports.waitUntilDropdown = waitUntilDropdown;
  exports.selectFromDropdownByText = selectFromDropdownByText;
  exports.fillInNotes = fillInNotes;
  exports.createNewOrder = createNewOrder;
  exports.createNewOrderWithoutAdditionalInformation = createNewOrderWithoutAdditionalInformation;
  exports.cancelOrder = cancelOrder;
  exports.createNewOrderWithNotesAndItems = createNewOrderWithNotesAndItems;
  exports.scheduleDriver = scheduleDriver;
  exports.expectedState = expectedState;
  exports.expectState = expectState;
  exports.createTeamOrder = createTeamOrder;
  exports.expectSuccessToast = expectSuccessToast;
  exports.expectErrorToast = expectErrorToast;
  exports.expectNotesToContain = expectNotesToContain;
  exports.saveOrderDetails = saveOrderDetails;
  exports.setUpOrderWithNoItems = setUpOrderWithNoItems;
  exports.expectItemQuantity = expectItemQuantity;
  exports.addNewGom = addNewGom;
  exports.getItemFullPrice = getItemFullPrice;
  exports.expectMenuItemName = expectMenuItemName;
  exports.getCartItemName = getCartItemName;
  exports.expectNoMenuItem = expectNoMenuItem;
  exports.getMenuItemName = getMenuItemName;
  exports.addOrderItem = addOrderItem;
  exports.addLocation = addLocation;
  exports.removeLocation = removeLocation;
  exports.addPickupLocation = addPickupLocation;
  var Logger = _ember['default'].Logger;

  function fieldPath(modelName, propertyName) {
    // So for composite properties we will need to manually provide the dasherized
    // property name as it's not simply the dasherized path but rather key-one_key-two
    // so if there are dashes in either name, we will not dasherize.
    modelName = modelName.includes('-') ? modelName : modelName.dasherize();
    propertyName = propertyName.includes('-') ? propertyName : propertyName.dasherize();

    return '.--fde-field-for__' + modelName + '_' + propertyName;
  }

  function formPath(modelName) {
    modelName = modelName.includes('-') ? modelName : modelName.dasherize();

    return '.--fde-form-for__' + modelName;
  }

  /*
   * Console log statements are left commented out
   * They're still useful when debugging as ember logger isn't available in this context.
   */

  function fillInField(modelName, propertyName, text, inputType) {
    var modifier = arguments.length <= 4 || arguments[4] === undefined ? 'first' : arguments[4];
    var pathPrepend = arguments.length <= 5 || arguments[5] === undefined ? '' : arguments[5];

    var path = pathPrepend + ' ' + fieldPath(modelName, propertyName) + ' ' + inputType + ':' + modifier;
    //console.log($(path), path);
    fillIn(path, text);
    return triggerEvent(path, 'keyup'); // We need to manually trigger this, as fillIn triggers onChange, and we track keyUp
  }

  /**
   * Fills in a text-field
   *
   * @returns {Promise}
   * @param {string} modelName name of the model that the field is bound to
   * @param {string} propertyName property on the model that the field is bound to
   * @param {string} text text you would like input into that field
   */

  function fillInText(modelName, propertyName, text) {
    return fillInField(modelName, propertyName, text, 'input[type="text"]');
  }

  /**
   * Fills in a password-field
   *
   * @returns {Promise}
   * @param {string} modelName name of the model that the field is bound to
   * @param {string} propertyName property on the model that the field is bound to
   * @param {string} text text you would like input into that field
   */

  function fillInPassword(modelName, propertyName, text) {
    return fillInField(modelName, propertyName, text, 'input[type="password"]');
  }

  function clearText(modelName, propertyName) {
    return fillInText(modelName, propertyName, '');
  }

  /**
   *
   * @param {string} modelName name of the model that the field is bound to
   * @param {string} propertyName - note this is typically a composite of the two fields that would key this value (amountAmountType)
   * @param {number} number you would like to input in that field
   */

  function fillInAmount(modelName, propertyName, number) {
    return fillInField(modelName, propertyName, number, 'input[type="number"]');
  }

  /**
   * Fills in a number-field
   *
   * @returns {Promise}
   * @param {string} modelName name of the model that the field is bound to
   * @param {string} propertyName property on the model that the field is bound to
   * @param {string} text text you would like input into that field
   */

  function fillInNumber(modelName, propertyName, text) {
    return fillInField(modelName, propertyName, text, 'input[type="number"]');
  }

  function clearNumber(modelName, propertyName) {
    return fillInNumber(modelName, propertyName, '');
  }

  /**
   * Fills in a textarea-field
   *
   * @returns {Promise}
   * @param {string} modelName name of the model that the field is bound to
   * @param {string} propertyName property on the model that the field is bound to
   * @param {string} text text you would like input into that field
   */

  function fillInTextarea(modelName, propertyName, text) {
    return fillInField(modelName, propertyName, text, 'textarea');
  }

  function clearTextarea(modelName, propertyName) {
    return fillInTextarea(modelName, propertyName, '');
  }

  function clickToInlineEdit(modelName, propertyName) {
    var modifier = arguments.length <= 2 || arguments[2] === undefined ? 'first' : arguments[2];

    var path = fieldPath(modelName, propertyName) + ' .field-for-value-container:' + modifier;
    return click(path);
  }

  function confirmInlineEdit(modelName, propertyName) {
    return click(fieldPath(modelName, propertyName) + ' .ui.button i.icon.check');
  }

  function cancelInlineEdit(modelName, propertyName) {
    return click(fieldPath(modelName, propertyName) + ' .ui.button i.icon.remove');
  }

  function inlineEditTextarea(modelName, propertyName, text) {
    var modifier = arguments.length <= 3 || arguments[3] === undefined ? 'first' : arguments[3];

    return clickToInlineEdit(modelName, propertyName, modifier).then(function (_) {
      return fillInField(modelName, propertyName, text, 'textarea', modifier);
    }).then(function (_) {
      return confirmInlineEdit(modelName, propertyName);
    });
  }

  function inlineEditText(modelName, propertyName, text) {
    var modifier = arguments.length <= 3 || arguments[3] === undefined ? 'first' : arguments[3];

    return clickToInlineEdit(modelName, propertyName, modifier).then(function (_) {
      return fillInField(modelName, propertyName, text, 'input[type=text]', modifier);
    }).then(function (_) {
      return confirmInlineEdit(modelName, propertyName);
    });
  }

  function inlineEdit(modelName, propertyName, text, type) {
    var modifier = arguments.length <= 4 || arguments[4] === undefined ? 'first' : arguments[4];

    return clickToInlineEdit(modelName, propertyName, modifier).then(function (_) {
      return fillInField(modelName, propertyName, text, type, modifier);
    }).then(function (_) {
      return confirmInlineEdit(modelName, propertyName);
    });
  }

  /**
   *  Clicks a button nested in a form-for with a class matching the type
   *  provided
   *
   * @param modelName
   */

  function clickFormButton(modelName, type) {
    // So for composite properties we will need to manually provide the dasherized
    // property name as it's not simply the dasherized path but rather key-one_key-two
    // so if there are dashes in either name, we will not dasherize.
    modelName = modelName.includes('-') ? modelName : modelName.dasherize();
    return click('.--fde-form-for__' + modelName + ' .' + type);
  }

  /**
   *  Clicks a form-for component's submit button
   *
   * @param modelName
   */

  function clickFormSubmit(modelName) {
    return clickFormButton(modelName, 'submit');
  }

  /**
   *  Clicks a form-for component's reset button
   *
   * @param modelName
   */

  function clickFormReset(modelName) {
    return clickFormButton(modelName, 'reset');
  }

  /**
   *  Clicks a form-for component's destroy button
   *
   * @param modelName
   */

  function clickFormDestroy(modelName) {
    return clickFormButton(modelName, 'destroy');
  }

  function clickFormCheckbox(modelName, propertyName) {
    return click('.--fde-field-for__' + modelName + '_' + propertyName + ' label');
  }

  /**
   * Asserts an error for a particular field is the text provided.
   * If text is null, checks to see that there is an error of some kind
   * @param {string} modelName name of the model that the field is bound to
   * @param {string} propertyName property on the model that the field is bound to
   * @param {?string} text - expected error text
   */

  function expectError(modelName, propertyName) {
    var text = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];

    var path = fieldPath(modelName, propertyName) + ' .errors';

    Logger.debug('expectError (' + path + ')');
    var $path = find(path);

    if (text) {
      (0, _chai.expect)($path.text().trim()).to.equal(text);
    } else {
      (0, _chai.expect)($path.length).to.be.ok;
    }
  }

  function expectErrorToContain(type, modelName, propertyName, text) {
    var path = fieldPath(modelName, propertyName) + ' .errors';

    // console.log(`expectErrorToContain (${path})`);

    (0, _chai.expect)(find(path).text().trim()).to.match(new RegExp(text));
  }

  /**
   * For testing inline forms (usually tables) we can use the generated field values
   *
   * @param modelName
   * @param propertyName
   * @param text
   * @param {string} [modifier]
   */

  function expectFormDisplayValue(modelName, propertyName, text) {
    var modifier = arguments.length <= 3 || arguments[3] === undefined ? 'first' : arguments[3];

    var path = fieldPath(modelName, propertyName) + ' .field-for-value-container:' + modifier;

    //console.log(`expectFormDisplayValue (${path})`);

    (0, _chai.expect)(find(path).last().text().trim()).to.equal(text);
  }

  /**
   * For testing forms
   *
   * @param modelName
   * @param propertyName
   * @param text
   * @param type
   */

  function expectFormValue(modelName, propertyName, text) {
    var type = arguments.length <= 3 || arguments[3] === undefined ? 'input' : arguments[3];

    var path = fieldPath(modelName, propertyName) + ' ' + type;

    //console.log(`expectFormValue (${path})`);

    (0, _chai.expect)(find(path).last().val().trim()).to.equal(text);
  }

  /**
   * Selects a dropdown item
   *
   * @returns {Promise}
   * @param {string} fieldName property on the model that the field is bound to
   * @param {string} text text you would like input into that field
   */

  function selectItemFromDropdown(fieldName, index) {
    return click('.--fde-basic-field-for__' + fieldName + ' i.dropdown.icon').then(function (_) {
      return waitTime(300);
    }).then(function (_) {
      return click('.--fde-basic-field-for__' + fieldName + ' .search .--fde-dropdown-menu.transition.visible div[data-value="' + index + '"]');
    });
  }

  function selectFromDropdown(fieldName, index) {
    return click('.--fde-field-for__' + fieldName + ' i.dropdown.icon').then(function (_) {
      return waitTime(300);
    }).then(function (_) {
      return click('.--fde-field-for__' + fieldName + ' .search .--fde-dropdown-menu.transition.visible div:nth(' + index + ')');
    });
  }

  function waitUntilDropdown(fieldName) {
    var selector = '.--fde-field-for__' + fieldName + ' i.dropdown.icon';

    return waitUntil(selector);
  }

  function selectFromDropdownByText(fieldName, text) {
    return click('.--fde-field-for__' + fieldName + ' i.dropdown.icon').then(function (_) {
      return waitTime(300);
    }).then(function (_) {
      return click('.--fde-field-for__' + fieldName + ' .search .--fde-dropdown-menu.transition.visible div:contains(' + text + ')');
    });
  }

  function fillInNotes(fieldName, text) {
    return fillIn('.--fde-field-for__order_notes__' + fieldName + ' textarea', '' + text);
  }

  /**
   * Creates a new regular order without order items or notes
   */

  function createNewOrder() {
    //Create a new order
    waitUntil('a[href="/orders/new"]');
    click('.fde-orders_new-order-button');
    //click enter additional information
    click('button.--fde-new-order_additional-info');

    // select a client from the client dropdown
    waitUntilDropdown('order_client');
    selectFromDropdown('order_client', '1');

    // select a restaurant from the restaurant dropdown and click create
    selectFromDropdown('order_restaurant', '1');

    fillInText('order', 'name', 'automated test order');
    fillInNumber('order', 'number-of-people', '10');

    click('button.--fde-new-order_create');
  }

  /**
   * Creates a new regular order without any additional information (ie. client, restaurant)
   * ***** NOT USED, as of yet. Keeping this helper in case we need it down the line.
   */

  function createNewOrderWithoutAdditionalInformation() {
    //Create a new order
    waitUntil('a[href="/orders/new"]');
    click('.fde-orders_new-order-button');
    click('button.--fde-new-order_create');
  }

  /**
   * Cancels a order
   * Using general selector to click on state change dropdown
   * so you don't need to change the selector all the time.
   */

  function cancelOrder() {
    click('.--fde-order-state-button');
    click('.fde-controls-action-button-action-option:contains("Cancel")');

    andThen(function (_) {
      var isOrderCancelled = find('.--fde-order-state-button').hasClass('fde-order-state-color_cancelled');
      (0, _chai.expect)(isOrderCancelled).to.be['true'];
    });
  }

  /**
   * Creates a regular order that has notes and a order item
   */

  function createNewOrderWithNotesAndItems() {
    createNewOrder();

    click('.--fde-order-edit_view-cart');
    andThen(function () {
      $('.fde-order-menu-group-item_name').first().click();
    });
    andThen(function () {
      $('.add.to.cart').click();
    });

    click('.--fde-order-edit_order-details');
    fillIn('.field-for-control-container .field-for-control-and-commit-buttons textarea:first', 'test');
    click('button.primary.submit');

    andThen(function () {
      (0, _chai.expect)(find('.--fde-field-for__order_notes__client-notes textarea').val()).to.contain('test');
    });
  }

  /**
   * Schedules an order
   */

  function scheduleDriver() {
    var run = _ember['default'].run;

    var orderNumber = $('.--fde-form-for__order div.ui.header').text().trim().substring(5);

    run(function (_) {
      click('.fde-orders-edit_actions [data-tooltip="More Options"] .fde-controls-action-button');
      click('.fde-controls-action-button.menu a:first');
      var manualButtonSelector = '.fde-logistics-order-row:contains(' + orderNumber + ') .fde-logistics-order-row_initial-buttons .ui.fde-controls-action-button';
      waitUntil(manualButtonSelector);

      click(manualButtonSelector);
      var inputSelector = '.--fde-field-for__order_driver input.search';
      waitUntil(inputSelector);

      andThen(function () {
        $(inputSelector).click();
        $(inputSelector).val('fleet');
        $(inputSelector).trigger('input');
      });

      var searchItemSelector = '.--fde-field-for__order_driver .dropdown .item';
      waitUntil(searchItemSelector);

      andThen(function () {
        $(searchItemSelector).trigger('click');
      });

      waitUntil('.fde-notify:contains(allocated)');

      andThen(function () {
        return visit('/orders');
      });
      andThen(function () {
        return visit('/orders/' + orderNumber);
      });
    });
  }

  /**
   * Checks the state of the order
   * @param {string} currentState The previous state of the order
   * @param {string} state The expected state of the order
   */

  function expectedState(currentState, state) {
    var isInProperState = find('.fde-controls-action-button').hasClass('fde-order-state-color_' + state);
    (0, _chai.expect)(isInProperState, 'Moving from ' + currentState + ' to ' + state).to.be['true'];
  }

  /**
   * Checks the state of the order
   * @param {string} state The expected state of the order
   */

  function expectState(state) {
    (0, _chai.expect)(find('.fde-controls-action-button').hasClass('fde-order-state-color_' + state)).to.be['true'];
  }

  /**
   * Creates a team order with no order items or notes
   */

  function createTeamOrder() {
    click('.fde-orders_new-order-button');
    click('.--fde-field-for__order_is-group-order .ui.checkbox');
    click('button.--fde-new-order_additional-info');

    // select a client from the client dropdown
    waitUntilDropdown('order_client');
    selectFromDropdown('order_client', '0');

    // select a restaurant from the restaurant dropdown and click create
    selectFromDropdown('order_restaurant', '1');

    fillInText('order', 'name', 'automated test order');
    fillInNumber('order', 'number-of-people', '10');

    click('button.--fde-new-order_create');
  }

  /**
   * Expects to find a success toast on the page
   *
   * @returns {Promise}
   * @param {string} text text you would like input into that field
   */

  function expectSuccessToast(text) {
    return (0, _chai.expect)(find('.ui.message.success').text()).to.contain('' + text);
  }

  /**
   * Expects to find a error toast on the page
   *
   * @returns {Promise}
   * @param {string} text text you would like input into that field
   */

  function expectErrorToast(text) {
    return (0, _chai.expect)(find('.ui.message.error').text()).to.contain('' + text);
  }

  /**
   * Checks that the note fields on the order page contains text
   *
   * @returns {Promise}
   * @param {string} fieldName property on the model that the field is bound to
   * @param {string} text text you would like input into that field
   */

  function expectNotesToContain(fieldName, text) {
    return (0, _chai.expect)(find('.--fde-field-for__order_notes__' + fieldName + ' textarea').val()).to.contain('' + text);
  }

  /**
   * Clicks the save order button
   */

  function saveOrderDetails() {
    return click('#order-submit-button button');
  }

  /**
   * logs in and creates a new order with no order items.
   * @param {string} role enter the role you wish to login as
   */

  function setUpOrderWithNoItems(role) {
    (0, _starFoxTestsAcceptanceHelpersLogin.login)(role + '@food.ee', 'password');
    visit('/orders');
    createNewOrder();
    //needed to accept browser dialog box
    window.confirm = function (_) {
      return true;
    };
  }

  function expectItemQuantity(quantity) {
    (0, _chai.expect)(find('.fde-order-item_quantity input:first').val()).to.equal('' + quantity);
  }

  function addNewGom() {
    click('.fde-order-cart_order-actions a[data-tooltip="Add New Team Member"]');
    waitUntil('.--fde-field-for__object_name');

    andThen(function () {
      fillIn('.--fde-field-for__object_name input', 'testing test');
      fillIn('.--fde-field-for__object_email input', 'testing@food.ee');
      fillIn('.--fde-field-for__object_department input', 'QA');
      fillIn('.--fde-field-for__object_phone-number input', '6044567890');
    });

    click('.--fde-form-for__group-order-member .button.submit');
  }

  function getItemFullPrice() {
    return $('.fde-order-item_full-price').text().trim();
  }

  function expectMenuItemName() {
    (0, _chai.expect)(getCartItemName().text()).to.contain(getMenuItemName());
  }

  function getCartItemName() {
    return find('.fde-order-cart_order-items .fde-order-item_name');
  }

  function expectNoMenuItem() {
    (0, _chai.expect)(getCartItemName().text()).to.not.contain(getMenuItemName());
  }

  function getMenuItemName() {
    // Get the menu item name
    return $('.fde-order-menu-group-item_name').first().text().trim().split('\n')[0];
  }

  function addOrderItem() {
    click('.fde-order-menu-group-item_name:first');
  }

  function addLocation(locationName, randomDeliveryLocation) {
    click('.fde-tables-organization-locations .fde-reorderable-table-form-container button');

    andThen(function (_) {
      fillInText('pickup-location', 'google', '' + randomDeliveryLocation);
      var deliveryLocationWrapper = fieldPath('pickup-location', 'google');
      click(deliveryLocationWrapper + ' .item .content:first');
    });

    andThen(function (_) {
      waitUntil(fieldPath('delivery-location', 'name'));
      fillInText('delivery-location', 'name', locationName);
      clickFormButton('delivery-location', 'submit');
    });
  }

  function removeLocation(locationName) {
    waitUntil('.sortable-item .button.destroy');
    click('.sortable-item:contains("' + locationName + '") .button.destroy');

    andThen(function (_) {
      waitUntil('.modal.transition.active .button.confirm');
    });

    andThen(function (_) {
      //HAS to use non ember jquery style click because modal gets pulled out of the Ember DOM, and reattached
      $('.modal.transition.active .button.confirm').click();
    });
  }

  function addPickupLocation(locationName, randomPickupLocation) {
    click('.fde-tables-organization-locations .fde-reorderable-table-form-container button');

    andThen(function (_) {
      fillInText('pickup-location', 'google', '' + randomPickupLocation);
      var pickupLocationWrapper = fieldPath('pickup-location', 'google');
      click(pickupLocationWrapper + ' .item .content:first');
    });

    andThen(function (_) {
      waitUntil(fieldPath('pickup-location', 'name'));
      fillInText('pickup-location', 'name', locationName);
      clickFormButton('pickup-location', 'submit');
    });
  }
});
define('star-fox/tests/acceptance/helpers/form-helpers', ['exports', 'ember', 'chai'], function (exports, _ember, _chai) {
  exports.fillInText = fillInText;
  exports.clearText = clearText;
  exports.fillInNumber = fillInNumber;
  exports.clearNumber = clearNumber;
  exports.fillInTextarea = fillInTextarea;
  exports.clearTextArea = clearTextArea;
  exports.fillInAmount = fillInAmount;
  exports.fillInPassword = fillInPassword;
  exports.clickFormButton = clickFormButton;
  exports.clickFormSave = clickFormSave;
  exports.clickFormCancel = clickFormCancel;
  exports.expectError = expectError;
  exports.expectErrorToContain = expectErrorToContain;
  exports.expectFormDisplayValue = expectFormDisplayValue;
  exports.expectFormValue = expectFormValue;
  var Logger = _ember['default'].Logger;

  /*
   * Console log statements are left commented out
   * They're still useful when debugging as ember logger isn't available in this context.
   */

  function fillInField(type, modelName, propertyName, text) {
    var inputType = arguments.length <= 4 || arguments[4] === undefined ? 'input' : arguments[4];

    var path = '.--fde-' + type + '-for__' + modelName.dasherize() + '_' + propertyName.dasherize() + ' ' + inputType;

    // console.log(`fillInField (${path})`);
    // console.log($(path)[0]);

    fillIn(path, text);
    return triggerEvent(path, 'keyup'); // We need to manually trigger this, as fillIn triggers onChange, and we track keyUp
  }

  /**
   * Fills in a text-field
   *
   * @returns {Promise}
   * @param {string} modelName name of the model that the field is bound to
   * @param {string} propertyName property on the model that the field is bound to
   * @param {string} text text you would like input into that field
   */

  function fillInText(modelName, propertyName, text) {
    return fillInField('text-field', modelName, propertyName, text);
  }

  function clearText(modelName, propertyName) {
    return fillInText(modelName, propertyName, '');
  }

  /**
   * Fills in a number-field
   *
   * @returns {Promise}
   * @param {string} modelName name of the model that the field is bound to
   * @param {string} propertyName property on the model that the field is bound to
   * @param {string} text text you would like input into that field
   */

  function fillInNumber(modelName, propertyName, text) {
    return fillInField('number-field', modelName, propertyName, text);
  }

  function clearNumber(modelName, propertyName) {
    return fillInNumber(modelName, propertyName, '');
  }

  /**
   * Fills in a textarea-field
   *
   * @returns {Promise}
   * @param {string} modelName name of the model that the field is bound to
   * @param {string} propertyName property on the model that the field is bound to
   * @param {string} text text you would like input into that field
   */

  function fillInTextarea(modelName, propertyName, text) {
    return fillInField('textarea-field', modelName, propertyName, text, 'textarea');
  }

  function clearTextArea(modelName, propertyName) {
    return fillInTextarea(modelName, propertyName, '');
  }

  /**
   *
   * @param {string} modelName name of the model that the field is bound to
   * @param {string} propertyName - note this is typically a composite of the two fields that would key this value (amountAmountType)
   * @param {number} number you would like to input in that field
   */

  function fillInAmount(modelName, propertyName, number) {
    return fillInField('amount-field', modelName, propertyName, number, 'input');
  }

  /**
   * Fills in a password
   *
   * @returns {Promise}
   * @param {string} modelName name of the model that the field is bound to
   * @param {string} propertyName property on the model that the field is bound to
   * @param {string} text text you would like input into that field
   */

  function fillInPassword(modelName, propertyName, text) {
    return fillInField('password-field', modelName, propertyName, text);
  }

  /**
   *  Clicks a button nested in a form-for with a class matching the type
   *  provided
   *
   * @param modelName
   */

  function clickFormButton(modelName, type) {
    return click('.--fde-form-for__' + modelName.dasherize() + ' .' + type);
  }

  /**
   *  Clicks a form-for component's save button
   *
   * @param modelName
   */

  function clickFormSave(modelName) {
    return clickFormButton(modelName, 'save');
  }

  /**
   *  Clicks a form-for component's cancel button
   *
   * @param modelName
   */

  function clickFormCancel(modelName) {
    return clickFormButton(modelName, 'cancel');
  }

  /**
   * Asserts an error for a particular field is the text provided.
   * If text is null, checks to see that there is an error of some kind
   * @param {string} type - field type
   * @param {string} modelName name of the model that the field is bound to
   * @param {string} propertyName property on the model that the field is bound to
   * @param {?string} text - expected error text
   */

  function expectError(type, modelName, propertyName) {
    var text = arguments.length <= 3 || arguments[3] === undefined ? null : arguments[3];

    var path = '.--fde-' + type + '-field-for__' + modelName.dasherize() + '_' + propertyName.dasherize() + ' .--fde-field-errors';

    Logger.debug('expectError (' + path + ')');
    var $path = find(path);

    if (text) {
      (0, _chai.expect)($path.text().trim()).to.equal(text);
    } else {
      (0, _chai.expect)($path.length).to.be.ok;
    }
  }

  function expectErrorToContain(type, modelName, propertyName, text) {
    var path = '.--fde-' + type + '-field-for__' + modelName.dasherize() + '_' + propertyName.dasherize() + ' .--fde-field-errors';

    // console.log(`expectErrorToContain (${path})`);

    (0, _chai.expect)(find(path).text().trim()).to.match(new RegExp(text));
  }

  /**
   * For testing inline forms (usually tables) we can use the generated field values
   *
   * @param type
   * @param modelName
   * @param propertyName
   * @param text
   * @param {string} [parentSelector]
   */

  function expectFormDisplayValue(type, modelName, propertyName, text, parentSelector) {
    var path = '.--fde-' + type + '-field-for__' + modelName.dasherize() + '_' + propertyName.dasherize() + ' .--fde-basic-display-value';
    path = parentSelector ? parentSelector + ' ' + path : path;

    // console.log(`expectFormDisplayValue (${path})`);

    (0, _chai.expect)(find(path).last().text().trim()).to.equal(text);
  }

  /**
   * For testing forms
   *
   * @param type
   * @param modelName
   * @param propertyName
   * @param text
   */

  function expectFormValue(type, modelName, propertyName, text) {
    var path = '.--fde-' + type + '-field-for__' + modelName.dasherize() + '_' + propertyName.dasherize() + ' .fde-focusable-element';

    // console.log(`expectFormValue (${path})`);

    (0, _chai.expect)(find(path).last().val().trim()).to.equal(text);
  }
});
define('star-fox/tests/acceptance/helpers/login', ['exports', 'star-fox/tests/acceptance/helpers/form-for-helpers'], function (exports, _starFoxTestsAcceptanceHelpersFormForHelpers) {
  exports.login = login;
  exports.logout = logout;

  /**
   * Steps for logging in a user
   *
   * @param {string} email
   * @param {string} password
   * @returns {Promise}
   */

  function login(email, password) {
    console.log('[acceptance] Login(email:' + email + ', password:' + password + ')'); //eslint-disable-line no-console

    visit('/login');
    (0, _starFoxTestsAcceptanceHelpersFormForHelpers.fillInText)('credentials', 'email', email);
    (0, _starFoxTestsAcceptanceHelpersFormForHelpers.fillInPassword)('credentials', 'password', password);

    return andThen(function () {
      return click('button');
    }); // there's only one
  }

  /**
   *
   * @param confirm
   * @returns {Promise}
   */

  function logout() {
    var confirm = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];

    // console.log(`[acceptance] Logout(confirm: ${confirm})`); //eslint-disable-line no-console

    click('.logout a');
    return click(confirm ? '.confirm' : '.cancel');
  }
});
define('star-fox/tests/acceptance/helpers/pages/logistics', ['exports', 'ember-cli-page-object'], function (exports, _emberCliPageObject) {
  var Logistics = (0, _emberCliPageObject.create)({
    clickManualButtonForOrder: function clickManualButtonForOrder(orderNumber) {
      return (0, _emberCliPageObject.clickable)('.fde-logistics-order-row:contains(' + orderNumber + ') .fde-logistics-order-row_initial-buttons .ui.fde-controls-action-button');
    },
    searchForDriver: (0, _emberCliPageObject.fillable)('.--fde-field-for__order_driver input.search')
  });
  exports.Logistics = Logistics;
});
define('star-fox/tests/acceptance/helpers/pages/order-edit', ['exports', 'ember-cli-page-object'], function (exports, _emberCliPageObject) {
  var OrderEdit = (0, _emberCliPageObject.create)({
    clickAddClientDiscountBtn: (0, _emberCliPageObject.clickable)('.field-for.ui.field a:contains("+ Add Client Discount")', { testContainer: 'body' }),
    clickClientDiscountListListItem: (0, _emberCliPageObject.clickable)('.fde-invoicing-discount-list_client .item', { testContainer: 'body' }),
    clickClientDiscountListItem: (0, _emberCliPageObject.clickable)('.fde-invoicing-discount-list_client .fde-invoicing-discount-list_item', { testContainer: 'body' }),
    fillClientDiscountInput: (0, _emberCliPageObject.fillable)('.--fde-field-for__client-discount_amount_amount-type input', { testContainer: 'body' }),
    fillClientDiscountCaseIdInput: (0, _emberCliPageObject.fillable)('.--fde-field-for__client-discount_case-id input', { testContainer: 'body' }),
    fillClientDiscountDescription: (0, _emberCliPageObject.fillable)('.--fde-field-for__client-discount_description input', { testContainer: 'body' }),

    focusClientDiscountAccountingCode: (0, _emberCliPageObject.focusable)('.--fde-field-for__client-discount_accounting-code input', { testContainer: 'body' }),
    clickClientDiscountAccountingCode: (0, _emberCliPageObject.clickable)('.--fde-field-for__client-discount_accounting-code input', { testContainer: 'body' }),
    clickClientDiscountAccountingCodeFirstItem: (0, _emberCliPageObject.clickable)('.--fde-field-for__client-discount_accounting-code .item:first', { testContainer: 'body' }),

    addClientDiscountAccountingCode: function addClientDiscountAccountingCode() {
      return this.focusClientDiscountAccountingCode().clickClientDiscountAccountingCode().clickClientDiscountAccountingCodeFirstItem();
    },

    submitClientDiscount: (0, _emberCliPageObject.clickable)('.--fde-form-for__client-discount .submit'),

    clickAddRestaurantDiscountBtn: (0, _emberCliPageObject.clickable)('.field-for.ui.field a:contains("+ Add Restaurant Discount")', { testContainer: 'body' }),
    clickRestaurantDiscountListListItem: (0, _emberCliPageObject.clickable)('.fde-invoicing-discount-list_restaurant .item', { testContainer: 'body' }),
    clickRestaurantDiscountListItem: (0, _emberCliPageObject.clickable)('.fde-invoicing-discount-list_restaurant .fde-invoicing-discount-list_item', { testContainer: 'body' }),
    fillRestaurantDiscountInput: (0, _emberCliPageObject.fillable)('.--fde-field-for__restaurant-discount_amount_amount-type input', { testContainer: 'body' }),
    fillRestaurantDiscountDescription: (0, _emberCliPageObject.fillable)('.--fde-field-for__restaurant-discount_description input', { testContainer: 'body' }),
    fillRestaurantDiscountCaseIdInput: (0, _emberCliPageObject.fillable)('.--fde-field-for__restaurant-discount_case-id input', { testContainer: 'body' }),

    focusRestaurantDiscountAccountingCode: (0, _emberCliPageObject.focusable)('.--fde-field-for__restaurant-discount_accounting-code input', { testContainer: 'body' }),
    clickRestaurantDiscountAccountingCode: (0, _emberCliPageObject.clickable)('.--fde-field-for__restaurant-discount_accounting-code input', { testContainer: 'body' }),
    clickRestaurantDiscountAccountingCodeFirstItem: (0, _emberCliPageObject.clickable)('.--fde-field-for__restaurant-discount_accounting-code .item:first', { testContainer: 'body' }),

    addRestaurantDiscountAccountingCode: function addRestaurantDiscountAccountingCode() {
      return this.focusRestaurantDiscountAccountingCode().clickRestaurantDiscountAccountingCode().clickRestaurantDiscountAccountingCodeFirstItem();
    },

    submitRestaurantDiscount: (0, _emberCliPageObject.clickable)('.--fde-form-for__restaurant-discount .submit')
  });
  exports.OrderEdit = OrderEdit;
});
define('star-fox/tests/acceptance/helpers/team-order-helpers', ['exports'], function (exports) {
  exports.updateBudget = updateBudget;
  exports.clickSameDay = clickSameDay;
  exports.clickFoodHall = clickFoodHall;
  exports.clickPoop = clickPoop;
  exports.addPoopFee = addPoopFee;
  exports.saveSetMenu = saveSetMenu;
  /**
   * Changes the per person budget on a team or meal plan order
   *
   * @returns {Promise}
   * @param {string} text dollar amount you want the budget set to. Ex: 20.00
   */

  function updateBudget(text) {
    return fillIn('.--fde-field-for__order_per-person-budget input', '' + text);
  }

  /**
   * Clicks on the same day toggle for team or meal plan orders
   */

  function clickSameDay() {
    return click('.--fde-field-for__order_is-same-day label');
  }

  /**
   * Clicks on the virtual food hall toggle for team or meal plan orders
   */

  function clickFoodHall() {
    return click('.--fde-field-for__order_is-foodhall .toggle label');
  }

  /**
   * Clicks on the pay out of pocket toggle
   */

  function clickPoop() {
    return click('.--fde-field-for__order_allows-pay-out-of-pocket .toggle label');
  }

  /**
   * Adds the pay out of pocket admin fee to the order
   *
   * @returns {Promise}
   * @param {string} text dollar amount you to set the poop fee to. Ex: 20.00
   */

  function addPoopFee(text) {
    return fillIn('.--fde-field-for__order_pay-out-of-pocket-fee input', '' + text);
  }

  /**
   * Saves a set menu
   */

  function saveSetMenu() {
    return click('.fde-order-menu_save-button');
  }
});
define('star-fox/tests/acceptance/login-test', ['exports', 'mocha', 'chai', 'star-fox/tests/helpers/start-app', 'star-fox/tests/helpers/destroy-app', 'star-fox/tests/acceptance/helpers/login'], function (exports, _mocha, _chai, _starFoxTestsHelpersStartApp, _starFoxTestsHelpersDestroyApp, _starFoxTestsAcceptanceHelpersLogin) {

  (0, _mocha.describe)('acceptance.login', function () {
    this.timeout(300000);

    var application = undefined;

    (0, _mocha.beforeEach)(function () {
      application = (0, _starFoxTestsHelpersStartApp['default'])();
    });

    (0, _mocha.afterEach)(function () {
      (0, _starFoxTestsHelpersDestroyApp['default'])(application);
    });

    (0, _mocha.it)('should login and then direct to welcome ', function () {
      (0, _starFoxTestsAcceptanceHelpersLogin.login)('concierge@food.ee', 'password');
      andThen(function (_) {
        return (0, _chai.expect)(currentPath()).to.equal('logged-in.index');
      });
    });

    (0, _mocha.it)('should fail to login when the credentials are not correct', function () {
      (0, _starFoxTestsAcceptanceHelpersLogin.login)('concierge@food.ee', 'foooBar');

      andThen(function (_) {
        (0, _chai.expect)(currentPath()).to.equal('login');
        (0, _chai.expect)(find('.error').text().trim()).to.equal('Invalid email or password.');
      });
    });

    (0, _mocha.it)('should redirect to the correct page after login', function () {
      visit('/logistics');
      (0, _starFoxTestsAcceptanceHelpersLogin.login)('concierge@food.ee', 'password', false);

      andThen(function (_) {
        return (0, _chai.expect)(currentPath()).to.equal('logged-in.logistics.index');
      });
    });
  });
});
/* global */
define('star-fox/tests/acceptance/logistics-test', ['exports', 'mocha', 'chai', 'star-fox/tests/helpers/start-app', 'star-fox/tests/helpers/destroy-app', 'star-fox/tests/acceptance/helpers/login'], function (exports, _mocha, _chai, _starFoxTestsHelpersStartApp, _starFoxTestsHelpersDestroyApp, _starFoxTestsAcceptanceHelpersLogin) {

  (0, _mocha.describe)('acceptance.logistics', function () {
    this.timeout(300000);

    var application = undefined;

    (0, _mocha.beforeEach)(function () {
      application = (0, _starFoxTestsHelpersStartApp['default'])();
      (0, _starFoxTestsAcceptanceHelpersLogin.login)('developer@food.ee', 'password');
      visit('/logistics');
    });

    (0, _mocha.afterEach)(function () {
      (0, _starFoxTestsHelpersDestroyApp['default'])(application);
    });

    (0, _mocha.it)('should login and visit /logistics', function () {
      (0, _chai.expect)(currentPath()).to.equal('logged-in.logistics.index');
    });

    (0, _mocha.it)("should navigate to all the tabs", function () {
      // TODO: planning page
      var tabSelector = '.--fde-tab-nav-tab-item';
      click(tabSelector + ':eq(2)');
      andThen(function (_) {
        (0, _chai.expect)(currentPath()).to.equal('logged-in.logistics.availability');
      });
      click(tabSelector + ':eq(3)');
      andThen(function (_) {
        (0, _chai.expect)(currentPath()).to.equal('logged-in.logistics.couriers.index');
      });
    });

    (0, _mocha.it)('should group by drivers', function () {
      var selectedClass = '.--fde-sf-logistics-courier-select_dropdown-facade';
      waitUntil('.fde-toggle-button > i.shipping');
      click('.fde-toggle-button > i.shipping');
      var driverNames = $(selectedClass).map(function (i, $el) {
        return $($el).text().trim();
      });

      // Ensure that driverNames are grouped & sorted alphabetically
      var alphaDriverNames = driverNames.sort();
      (0, _chai.expect)(driverNames).to.eql(alphaDriverNames);
    });

    (0, _mocha.it)('should assign drivers and persist through refresh', function () {
      var optionClass = '.--fde-sf-logistics-courier-select_driver-name';
      var selectedClass = '.--fde-sf-logistics-courier-select_dropdown-facade';
      var $driver = find(selectedClass + ':first');

      $driver.click();

      var $optionVal = find(optionClass + ':first');

      $optionVal.click();

      visit('/logistics'); // to simulate refresh
      andThen(function (_) {
        $driver = find(selectedClass + ':first');
        //  The selected driver should be the option we clicked earlier
        (0, _chai.expect)($driver.text().trim()).to.equal($optionVal.text().trim());
      });
    });
  });
});
/* global */
define('star-fox/tests/acceptance/meal-plan-order-cart-test', ['exports', 'mocha', 'chai', 'star-fox/tests/helpers/start-app', 'star-fox/tests/helpers/destroy-app', 'star-fox/tests/acceptance/helpers/form-for-helpers', 'star-fox/tests/acceptance/helpers/team-order-helpers', 'star-fox/tests/acceptance/helpers/login'], function (exports, _mocha, _chai, _starFoxTestsHelpersStartApp, _starFoxTestsHelpersDestroyApp, _starFoxTestsAcceptanceHelpersFormForHelpers, _starFoxTestsAcceptanceHelpersTeamOrderHelpers, _starFoxTestsAcceptanceHelpersLogin) {

  (0, _mocha.describe)('acceptance.meal.plan.order.cart', function () {
    this.timeout(60000);

    var application = undefined;

    (0, _mocha.beforeEach)(function () {
      application = (0, _starFoxTestsHelpersStartApp['default'])();
    });

    (0, _mocha.afterEach)(function () {
      (0, _starFoxTestsHelpersDestroyApp['default'])(application);
    });

    //Page objects and helpers
    var mealPlanToggleToOn = '.--fde-field-for__order_is-meal-plan-order .toggle label';
    var viewCartBtn = '.--fde-order-edit_view-cart';
    var viewGomDetails = '.fde-order-cart-order-member_id-toggle';
    var increaseOrderItemBtn = '.fde-order-item i.fde-order-item_plus';
    var decreaseOrderItemBtn = '.fde-order-item i.fde-order-item_minus';
    var deleteOrderItemBtn = '.fde-order-item_destroy';
    var loadingAnimation = '.fde-order-cart_total-loader';
    var editOrderItemBtn = '.fde-order-item_edit';
    var customOrderNotesCheckbox = '.--fde-custom-options_item_notes .ui.checkbox label';
    var saveCustomNotes = '.fde-custom-item-modal-content .button.submit';
    var clientPriceOverride = '.--fde-field-for__object_client-price input';

    function savePicklesOptions() {
      $('.add.to.cart').click();
    }

    function picklesOptionsPrice() {
      var picklesOptionsText = $('.fde-order-item_options').text().trim();
      //match all strings in array with $ in front of them.
      //example ["this", "is", "$1.00", "random", "array"] would be ["$1.00"]
      var picklesOptionsExtraPrice = picklesOptionsText.match(/\d+(?:\.\d+)?/g) || [];

      return picklesOptionsExtraPrice.reduce(function (prev, curr) {
        return Number(prev) + Number(curr);
      }, 0);
    }

    function expectGomNamed(name) {
      (0, _chai.expect)(find('.fde-order-cart-order-member').text()).to.contain('' + name);
    }

    function expectToSeeGomDetails(number, text) {
      (0, _chai.expect)(find('.fde-order-cart-order-member_id-content div:nth(' + number + ')').text()).to.contain('' + text);
    }

    function expectCustomNotesToInclude(note) {
      (0, _chai.expect)(find('.fde-order-item_details .fde-order-item_notes').text()).to.contain('' + note);
    }

    function expectClientPriceToBe(orderItemTotal) {
      (0, _chai.expect)(find('.fde-order-item_price-value').text()).to.contain(orderItemTotal);
    }

    function mealPlanOrderCartTest(role) {
      (0, _mocha.describe)('Adding menu items to the cart as ' + role, function () {
        (0, _mocha.beforeEach)(function () {
          (0, _starFoxTestsAcceptanceHelpersLogin.login)(role + '@food.ee', 'password');
          visit('/orders');
          (0, _starFoxTestsAcceptanceHelpersFormForHelpers.createTeamOrder)();
          click(mealPlanToggleToOn);
          (0, _starFoxTestsAcceptanceHelpersTeamOrderHelpers.updateBudget)('100.00');
          (0, _starFoxTestsAcceptanceHelpersFormForHelpers.saveOrderDetails)();
          click(viewCartBtn);
          //needed to accept browser dialog box
          window.confirm = function (_) {
            return true;
          };
        });

        (0, _mocha.it)('tries adding menu items without a GOM and raises a error message', function () {
          (0, _starFoxTestsAcceptanceHelpersFormForHelpers.addOrderItem)();

          andThen(function () {
            (0, _starFoxTestsAcceptanceHelpersFormForHelpers.expectErrorToast)('Sorry, you need to select a group order member');
          });
          (0, _starFoxTestsAcceptanceHelpersFormForHelpers.cancelOrder)();
        });

        (0, _mocha.it)('adds a new GOM', function () {
          (0, _starFoxTestsAcceptanceHelpersFormForHelpers.addNewGom)();

          andThen(function () {
            expectGomNamed('testing test');
          });
          (0, _starFoxTestsAcceptanceHelpersFormForHelpers.cancelOrder)();
        });

        (0, _mocha.it)('can display GOM details', function () {
          (0, _starFoxTestsAcceptanceHelpersFormForHelpers.addNewGom)();
          click(viewGomDetails);

          andThen(function () {
            expectToSeeGomDetails('0', 'testing@food.ee');
            expectToSeeGomDetails('1', '(604) 456-7890');
            expectToSeeGomDetails('2', 'QA');
          });
          (0, _starFoxTestsAcceptanceHelpersFormForHelpers.cancelOrder)();
        });

        (0, _mocha.it)('adds item to GOM cart', function () {
          (0, _starFoxTestsAcceptanceHelpersFormForHelpers.addNewGom)();
          (0, _starFoxTestsAcceptanceHelpersFormForHelpers.addOrderItem)();

          andThen(function () {
            savePicklesOptions();
          });

          andThen(function () {
            (0, _starFoxTestsAcceptanceHelpersFormForHelpers.expectMenuItemName)();
          });
          (0, _starFoxTestsAcceptanceHelpersFormForHelpers.cancelOrder)();
        });

        (0, _mocha.it)('adds item to GOM using + button', function () {
          (0, _starFoxTestsAcceptanceHelpersFormForHelpers.addNewGom)();
          (0, _starFoxTestsAcceptanceHelpersFormForHelpers.addOrderItem)();

          andThen(function () {
            savePicklesOptions();
          });

          click(increaseOrderItemBtn);

          andThen(function () {
            (0, _starFoxTestsAcceptanceHelpersFormForHelpers.expectItemQuantity)('2');
          });
          (0, _starFoxTestsAcceptanceHelpersFormForHelpers.cancelOrder)();
        });

        (0, _mocha.it)('remove item from GOM using - button', function () {
          (0, _starFoxTestsAcceptanceHelpersFormForHelpers.addNewGom)();
          (0, _starFoxTestsAcceptanceHelpersFormForHelpers.addOrderItem)();

          andThen(function () {
            savePicklesOptions();
          });

          click(increaseOrderItemBtn);
          click(decreaseOrderItemBtn);

          andThen(function () {
            (0, _starFoxTestsAcceptanceHelpersFormForHelpers.expectItemQuantity)('1');
          });
          (0, _starFoxTestsAcceptanceHelpersFormForHelpers.cancelOrder)();
        });

        (0, _mocha.it)('should be able to remove an order item', function () {
          (0, _starFoxTestsAcceptanceHelpersFormForHelpers.addNewGom)();
          (0, _starFoxTestsAcceptanceHelpersFormForHelpers.addOrderItem)();

          andThen(function () {
            savePicklesOptions();
          });

          click(deleteOrderItemBtn);
          waitUntilNot(loadingAnimation);

          andThen(function () {
            (0, _starFoxTestsAcceptanceHelpersFormForHelpers.expectNoMenuItem)();
          });
          (0, _starFoxTestsAcceptanceHelpersFormForHelpers.cancelOrder)();
        });

        (0, _mocha.it)('should be able to add a custom item to GOM cart', function () {
          (0, _starFoxTestsAcceptanceHelpersFormForHelpers.addNewGom)();
          (0, _starFoxTestsAcceptanceHelpersFormForHelpers.addOrderItem)();

          andThen(function () {
            savePicklesOptions();
          });

          click(editOrderItemBtn);
          click(customOrderNotesCheckbox);
          (0, _starFoxTestsAcceptanceHelpersFormForHelpers.fillInTextarea)('object', 'notes', 'custom note added');
          click(saveCustomNotes);

          andThen(function () {
            expectCustomNotesToInclude('custom note added');
          });
          (0, _starFoxTestsAcceptanceHelpersFormForHelpers.cancelOrder)();
        });

        (0, _mocha.it)('should be able to override the item price', function () {
          var orderItemOverrideTotal = '10.00';

          (0, _starFoxTestsAcceptanceHelpersFormForHelpers.addNewGom)();
          (0, _starFoxTestsAcceptanceHelpersFormForHelpers.addOrderItem)();

          andThen(function () {
            savePicklesOptions();
          });

          click(editOrderItemBtn);
          (0, _starFoxTestsAcceptanceHelpersFormForHelpers.clickFormCheckbox)('object', 'override-prices');
          fillIn(clientPriceOverride, orderItemOverrideTotal);
          click(saveCustomNotes);

          andThen(function () {
            var orderItemTotal = Number(orderItemOverrideTotal) + picklesOptionsPrice();
            expectClientPriceToBe(orderItemTotal);
          });
          (0, _starFoxTestsAcceptanceHelpersFormForHelpers.cancelOrder)();
        });
      });
    }
    mealPlanOrderCartTest('concierge');
  });
});
/* global */
define('star-fox/tests/acceptance/menu-editor-test', ['exports', 'mocha', 'chai', 'faker', 'star-fox/tests/helpers/start-app', 'star-fox/tests/helpers/destroy-app', 'star-fox/tests/acceptance/helpers/login', 'star-fox/tests/acceptance/helpers/form-for-helpers'], function (exports, _mocha, _chai, _faker, _starFoxTestsHelpersStartApp, _starFoxTestsHelpersDestroyApp, _starFoxTestsAcceptanceHelpersLogin, _starFoxTestsAcceptanceHelpersFormForHelpers) {

  (0, _mocha.describe)('acceptance.menu.editor', function () {
    this.timeout(500000);

    var application = undefined;

    (0, _mocha.beforeEach)(function () {
      application = (0, _starFoxTestsHelpersStartApp['default'])();
    });

    (0, _mocha.afterEach)(function () {
      (0, _starFoxTestsHelpersDestroyApp['default'])(application);
    });

    //Page objects and helpers
    var editMenu = 'button:contains("Edit")';
    var addMenuGroup = '.fde-menus-menu-form_add-group:last';
    var addMenuItem = '.fde-menus-menu-form-menu-group:last .fde-menus-menu-form-menu-group_add-item';
    var turnDietaryTagOn = '.fde-dietary-tag.fde-is-inactive:first';
    var turnDietaryTagOff = '.fde-dietary-tag.fde-is-selected:first';
    var deleteMenuItem = '.fde-menus-menu-form-menu-item:last i.trash:first';
    var deleteMenuGroup = '.fde-menus-menu-form-menu-group:last i.trash:first';
    var lastItemInOptionsList = '.fde-options:last .fde-can-click';
    var addMenuOptionGroup = '.fde-menus-menu-form-menu-option-group_add:first';
    var newPicklesOption = '.--fde-field-for__menu-option-item_name:last .field-for-value-container';
    var submitPickleOption = '#edit-menu-item-options-modal.active .submit';
    var copyMenuItem = '.fde-menus-menu-form-menu-item:last i.copy.icon:first';
    var deleteMenuHeader = '.fde-menus-menu-form-menu-group_header:last button.destroy';
    var confirmDestroyModal = '#confirm-destroy-modal .confirm';
    var copyMenuGroup = '.fde-menus-menu-form-menu-group:last i.copy.icon:first';
    var deletePicklesOptions = '.transition.visible.active .button.destroy:contains("Delete All Options")';

    function addNewMenuGroup(newName, newDescription) {
      click(addMenuGroup);
      (0, _starFoxTestsAcceptanceHelpersFormForHelpers.inlineEditText)('menu-group', 'name', newName, 'last');
      (0, _starFoxTestsAcceptanceHelpersFormForHelpers.inlineEditTextarea)('menu-group', 'description_internal-description', newDescription, 'last');
    }

    function addNewMenuItem(newMenuItemName, newMenuItemDescription) {
      click(addMenuItem);
      (0, _starFoxTestsAcceptanceHelpersFormForHelpers.inlineEditText)('menu-item', 'name', newMenuItemName, 'last');
      (0, _starFoxTestsAcceptanceHelpersFormForHelpers.inlineEditTextarea)('menu-item', 'description_internal-description', newMenuItemDescription, 'last');
    }

    function addNewPicklesOption(mogName, moiName) {
      click(lastItemInOptionsList);
      (0, _starFoxTestsAcceptanceHelpersFormForHelpers.fillInText)('menu-option-group', 'name', mogName, 'text');
      click(addMenuOptionGroup);
      click(newPicklesOption);
      (0, _starFoxTestsAcceptanceHelpersFormForHelpers.inlineEditText)('menu-option-item', 'name', moiName, 'last');
      waitUntil(submitPickleOption);
      click(submitPickleOption);
    }

    function removeMenuGroup() {
      click(deleteMenuHeader);
      click(confirmDestroyModal);
    }

    function addMenuGroupAndItems(newName, newDescription, newMenuItemName, newMenuItemDescription, mogName, moiName) {
      addNewMenuGroup(newName, newDescription);
      addNewMenuItem(newMenuItemName, newMenuItemDescription);
      addNewPicklesOption(mogName, moiName);
    }

    // Set menu group name and description
    var newName = undefined;
    var newDescription = undefined;
    // Set menu item name and description
    var newMenuItemName = undefined;
    var newMenuItemDescription = undefined;
    //Set menu option group and item name
    var mogName = undefined;
    var moiName = undefined;

    (0, _mocha.describe)('adding to the menu', function () {
      (0, _mocha.beforeEach)(function () {
        //Set menu option group and item name
        mogName = _faker['default'].lorem.word(3);
        moiName = _faker['default'].lorem.word(3);

        // Set menu group name and description
        newName = _faker['default'].lorem.word();
        newDescription = _faker['default'].lorem.word();

        // Set menu item name and description
        newMenuItemName = _faker['default'].lorem.word();
        newMenuItemDescription = _faker['default'].lorem.word();

        (0, _starFoxTestsAcceptanceHelpersLogin.login)('developer@food.ee', 'password');
        visit('/restaurants/1/menus');
        click(editMenu);
      });

      (0, _mocha.it)('should be able to add a new menu group', function () {
        addNewMenuGroup(newName, newDescription);

        andThen(function (_) {
          (0, _starFoxTestsAcceptanceHelpersFormForHelpers.expectFormDisplayValue)('menu-group', 'name', newName, 'last');
          (0, _starFoxTestsAcceptanceHelpersFormForHelpers.expectFormDisplayValue)('menu-group', 'description_internal-description', newDescription + ' / Internal Description', 'last');
        });

        removeMenuGroup();
      });

      (0, _mocha.it)('should be able to add a new menu item', function () {
        addNewMenuGroup(newName, newDescription);
        addNewMenuItem(newMenuItemName, newMenuItemDescription);

        andThen(function (_) {
          (0, _starFoxTestsAcceptanceHelpersFormForHelpers.expectFormDisplayValue)('menu-item', 'name', newMenuItemName, 'last');
          (0, _starFoxTestsAcceptanceHelpersFormForHelpers.expectFormDisplayValue)('menu-item', 'description_internal-description', newMenuItemDescription, 'last');
        });
        removeMenuGroup();
      });

      (0, _mocha.it)('should be able to add a new pickles option', function () {
        addNewMenuGroup(newName, newDescription);
        addNewMenuItem(newMenuItemName, newMenuItemDescription);

        addNewPicklesOption(mogName, moiName);

        andThen(function (_) {
          click(lastItemInOptionsList);
          (0, _chai.expect)($('.fde-menus-menu-form-menu-option-group_list .sortable-item:last').text()).to.contain(mogName);
        });
        removeMenuGroup();
      });
    });

    (0, _mocha.describe)('editing the menu', function () {
      (0, _mocha.beforeEach)(function () {
        //Set menu option group and item name
        mogName = _faker['default'].lorem.word(3);
        moiName = _faker['default'].lorem.word(3);

        // Set menu group name and description
        newName = _faker['default'].lorem.word();
        newDescription = _faker['default'].lorem.word();

        // Set menu item name and description
        newMenuItemName = _faker['default'].lorem.word();
        newMenuItemDescription = _faker['default'].lorem.word();

        (0, _starFoxTestsAcceptanceHelpersLogin.login)('developer@food.ee', 'password');
        visit('/restaurants/1/menus');
        click(editMenu);
        addMenuGroupAndItems(newName, newDescription, newMenuItemName, newMenuItemDescription, mogName, moiName);
      });

      (0, _mocha.it)('should be able to edit a menu group', function () {
        var editedName = _faker['default'].lorem.word();
        var editedDescription = _faker['default'].lorem.word();

        (0, _starFoxTestsAcceptanceHelpersFormForHelpers.inlineEditText)('menu-group', 'name', editedName, 'last');
        (0, _starFoxTestsAcceptanceHelpersFormForHelpers.inlineEditTextarea)('menu-group', 'description_internal-description', editedDescription, 'last');

        andThen(function (_) {
          (0, _starFoxTestsAcceptanceHelpersFormForHelpers.expectFormDisplayValue)('menu-group', 'name', editedName, 'last');
          (0, _starFoxTestsAcceptanceHelpersFormForHelpers.expectFormDisplayValue)('menu-group', 'description_internal-description', editedDescription + ' / Internal Description', 'last');
        });
        removeMenuGroup();
      });

      (0, _mocha.it)('should be able to edit a menu item', function () {
        var editedItemName = _faker['default'].lorem.word();
        var editedItemDescription = _faker['default'].lorem.word();

        (0, _starFoxTestsAcceptanceHelpersFormForHelpers.inlineEditText)('menu-item', 'name', editedItemName, 'last');
        (0, _starFoxTestsAcceptanceHelpersFormForHelpers.inlineEditTextarea)('menu-item', 'description_internal-description', editedItemDescription, 'last');

        andThen(function (_) {
          (0, _starFoxTestsAcceptanceHelpersFormForHelpers.expectFormDisplayValue)('menu-item', 'name', editedItemName, 'last');
          (0, _starFoxTestsAcceptanceHelpersFormForHelpers.expectFormDisplayValue)('menu-item', 'description_internal-description', editedItemDescription, 'last');
        });
        removeMenuGroup();
      });

      (0, _mocha.it)('should be able to edit pickles options', function () {
        var editedMogName = _faker['default'].lorem.word(3);
        var editedMoiName = _faker['default'].lorem.word(3);
        click(lastItemInOptionsList);
        (0, _starFoxTestsAcceptanceHelpersFormForHelpers.fillInText)('menu-option-group', 'name', editedMogName, 'text');
        click(addMenuOptionGroup);
        click(newPicklesOption);
        (0, _starFoxTestsAcceptanceHelpersFormForHelpers.inlineEditText)('menu-option-item', 'name', editedMoiName, 'last');
        waitUntil(submitPickleOption);
        click(submitPickleOption);

        andThen(function (_) {
          click(lastItemInOptionsList);
          (0, _chai.expect)($('.fde-menus-menu-form-menu-option-group_list .sortable-item:last').text()).to.contain(editedMogName);
          return (0, _starFoxTestsAcceptanceHelpersFormForHelpers.expectFormDisplayValue)('menu-option-item', 'name', editedMoiName, 'last');
        });
        removeMenuGroup();
      });

      (0, _mocha.it)('should be able to toggle dietary tags', function () {
        // Toggle dietary tag on
        click(turnDietaryTagOn);

        andThen(function () {
          (0, _starFoxTestsAcceptanceHelpersFormForHelpers.expectSuccessToast)('updated!');
        });

        // Toggle diestary tag off
        click(turnDietaryTagOff);

        andThen(function () {
          (0, _starFoxTestsAcceptanceHelpersFormForHelpers.expectSuccessToast)('updated!');
        });
        removeMenuGroup();
      });
    });

    (0, _mocha.describe)('copying menu items', function () {
      (0, _mocha.beforeEach)(function () {
        //Set menu option group and item name
        mogName = _faker['default'].lorem.word(3);
        moiName = _faker['default'].lorem.word(3);

        // Set menu group name and description
        newName = _faker['default'].lorem.word();
        newDescription = _faker['default'].lorem.word();

        // Set menu item name and description
        newMenuItemName = _faker['default'].lorem.word();
        newMenuItemDescription = _faker['default'].lorem.word();

        (0, _starFoxTestsAcceptanceHelpersLogin.login)('developer@food.ee', 'password');
        visit('/restaurants/1/menus');
        click(editMenu);
        addMenuGroupAndItems(newName, newDescription, newMenuItemName, newMenuItemDescription, mogName, moiName);
      });

      (0, _mocha.it)('should be able to copy a menu group', function () {
        click(copyMenuGroup);

        andThen(function (_) {
          (0, _starFoxTestsAcceptanceHelpersFormForHelpers.expectFormDisplayValue)('menu-group', 'name', newName, 'last');
          (0, _starFoxTestsAcceptanceHelpersFormForHelpers.expectFormDisplayValue)('menu-group', 'description_internal-description', newDescription + ' / Internal Description', 'last');
        });
        // Need to delete the created and duplicated menu group
        removeMenuGroup();

        andThen(function (_) {
          removeMenuGroup();
        });
      });

      (0, _mocha.it)('should duplicate a menu item and its attributes and relationships', function () {
        click(copyMenuItem);
        click(lastItemInOptionsList);

        andThen(function (_) {
          (0, _chai.expect)($('.fde-menus-menu-form-menu-option-group_list .sortable-item:last').text()).to.contain(mogName);
        });
        removeMenuGroup();
      });
    });

    (0, _mocha.describe)('deleting menu items', function () {
      //Set menu option group and item name
      mogName = _faker['default'].lorem.word(3);
      moiName = _faker['default'].lorem.word(3);

      // Set menu group name and description
      newName = _faker['default'].lorem.word();
      newDescription = _faker['default'].lorem.word();

      // Set menu item name and description
      newMenuItemName = _faker['default'].lorem.word();
      newMenuItemDescription = _faker['default'].lorem.word();

      (0, _mocha.beforeEach)(function () {
        (0, _starFoxTestsAcceptanceHelpersLogin.login)('developer@food.ee', 'password');
        visit('/restaurants/1/menus');
        click(editMenu);
        addMenuGroupAndItems(newName, newDescription, newMenuItemName, newMenuItemDescription, mogName, moiName);
      });

      (0, _mocha.it)('should be able to delete pickles options', function () {
        click(lastItemInOptionsList);
        click(deletePicklesOptions);

        andThen(function (_) {
          return $('.button.confirm').click();
        });

        andThen(function (_) {
          (0, _chai.expect)($('.fde-options:last .fde-can-click').text().trim()).to.contain('Add');
        });
        removeMenuGroup();
      });

      (0, _mocha.it)('should be able to delete a menu group', function () {
        var lastMenuGroupmName = '.--fde-field-for__menu-group_name:last';
        click(deleteMenuGroup);

        andThen(function (_) {
          return $('.button.confirm').click();
        });

        andThen(function (_) {
          (0, _chai.expect)($('.--fde-field-for__menu-group_name:last').text().trim()).to.not.contain(lastMenuGroupmName);
        });
      });

      (0, _mocha.it)('should be able to delete a menu item', function () {
        var lastMenuItemName = '.--fde-field-for__menu-item_name:last';
        click(deleteMenuItem);

        andThen(function (_) {
          return $('.button.confirm').click();
        });

        andThen(function (_) {
          (0, _chai.expect)($('.--fde-field-for__menu-item_name:last').text().trim()).to.not.contain(lastMenuItemName);
        });
        removeMenuGroup();
      });
    });
  });
});
/* global */
define('star-fox/tests/acceptance/order-cart-test', ['exports', 'mocha', 'chai', 'star-fox/tests/helpers/start-app', 'star-fox/tests/helpers/destroy-app', 'star-fox/tests/acceptance/helpers/form-for-helpers', 'star-fox/tests/acceptance/helpers/login'], function (exports, _mocha, _chai, _starFoxTestsHelpersStartApp, _starFoxTestsHelpersDestroyApp, _starFoxTestsAcceptanceHelpersFormForHelpers, _starFoxTestsAcceptanceHelpersLogin) {

  (0, _mocha.describe)('acceptance.order.cart', function () {
    this.timeout(300000);

    var application = undefined;

    (0, _mocha.beforeEach)(function () {
      application = (0, _starFoxTestsHelpersStartApp['default'])();
    });

    (0, _mocha.afterEach)(function () {
      (0, _starFoxTestsHelpersDestroyApp['default'])(application);
    });

    //Page objects and helpers
    var viewCartBtn = '.--fde-order-edit_view-cart';
    var increaseOrderItemBtn = '.fde-order-item:first i.fde-order-item_plus';
    var decreaseOrderItemBtn = '.fde-order-item i.fde-order-item_minus';
    var deleteOrderItemBtn = '.fde-order-item_destroy';
    var editOrderItemBtn = '.fde-order-item_edit';
    var customOrderNotesCheckbox = '.--fde-custom-options_item_notes .ui.checkbox label';
    var customNotesSaveBtn = '.fde-custom-item-modal-content .button.submit';
    var clientPriceOverride = '.--fde-field-for__object_client-price input';
    var modalNoLongerVisible = '.ui.modal.visible.active';

    function savePicklesOptions() {
      $('.add.to.cart').click();
    }

    function expectCustomNotesToInclude(note) {
      (0, _chai.expect)(find('.fde-order-item_details .fde-order-item_notes').text()).to.contain('' + note);
    }

    function expectClientPriceToBe(orderItemTotal) {
      (0, _chai.expect)(find('.fde-order-item_price-value').text()).to.contain(orderItemTotal);
    }

    function stateToPreQuote() {
      click('.fde-order-state-color_draft i.down.caret.icon');
      click('.fde-controls-action-button-action-option:contains("Publish")');
    }

    function picklesOptionsPrice() {
      var picklesOptionsText = $('.fde-order-item_options').text().trim();
      //match all strings in array with $ in front of them.
      //example ["this", "is", "$1.00", "random", "array"] would be ["$1.00"]
      var picklesOptionsExtraPrice = picklesOptionsText.match(/\d+(?:\.\d+)?/g) || [];

      return picklesOptionsExtraPrice.reduce(function (prev, curr) {
        return Number(prev) + Number(curr);
      }, 0);
    }

    function regularOrderCartTest(role) {
      (0, _mocha.describe)('Adding menu items to the cart as ' + role, function () {
        (0, _mocha.beforeEach)(function () {
          (0, _starFoxTestsAcceptanceHelpersLogin.login)(role + '@food.ee', 'password');
          visit('/orders');
          (0, _starFoxTestsAcceptanceHelpersFormForHelpers.createNewOrder)();
          click(viewCartBtn);
          //needed to accept browser dialog box
          window.confirm = function () {
            return true;
          };
        });

        (0, _mocha.it)('clicking on menu item should add item to cart', function () {
          (0, _starFoxTestsAcceptanceHelpersFormForHelpers.addOrderItem)();

          andThen(function () {
            savePicklesOptions();
          });

          andThen(function () {
            (0, _starFoxTestsAcceptanceHelpersFormForHelpers.expectMenuItemName)();
          });
          (0, _starFoxTestsAcceptanceHelpersFormForHelpers.cancelOrder)();
        });

        (0, _mocha.it)('add item using + button', function () {
          stateToPreQuote();
          (0, _starFoxTestsAcceptanceHelpersFormForHelpers.addOrderItem)();

          andThen(function () {
            savePicklesOptions();
          });

          click(increaseOrderItemBtn);

          andThen(function () {
            (0, _starFoxTestsAcceptanceHelpersFormForHelpers.expectItemQuantity)('2');
          });
          (0, _starFoxTestsAcceptanceHelpersFormForHelpers.cancelOrder)();
        });

        (0, _mocha.it)('remove item using - button', function () {
          stateToPreQuote();
          (0, _starFoxTestsAcceptanceHelpersFormForHelpers.addOrderItem)();

          andThen(function () {
            savePicklesOptions();
          });

          click(increaseOrderItemBtn);
          click(decreaseOrderItemBtn);

          andThen(function () {
            (0, _starFoxTestsAcceptanceHelpersFormForHelpers.expectItemQuantity)('1');
          });
          (0, _starFoxTestsAcceptanceHelpersFormForHelpers.cancelOrder)();
        });

        (0, _mocha.it)('should be able to remove a order item', function () {
          stateToPreQuote();
          (0, _starFoxTestsAcceptanceHelpersFormForHelpers.addOrderItem)();

          andThen(function () {
            savePicklesOptions();
          });

          click(deleteOrderItemBtn);
          waitUntilNot(modalNoLongerVisible);

          andThen(function () {
            (0, _starFoxTestsAcceptanceHelpersFormForHelpers.expectNoMenuItem)();
          });
          (0, _starFoxTestsAcceptanceHelpersFormForHelpers.cancelOrder)();
        });

        (0, _mocha.it)('should be able to add a custom item', function () {
          stateToPreQuote();
          (0, _starFoxTestsAcceptanceHelpersFormForHelpers.addOrderItem)();

          andThen(function () {
            savePicklesOptions();
          });

          click(editOrderItemBtn);
          click(customOrderNotesCheckbox);
          (0, _starFoxTestsAcceptanceHelpersFormForHelpers.fillInTextarea)('object', 'notes', 'custom note added');
          click(customNotesSaveBtn);

          andThen(function () {
            expectCustomNotesToInclude('custom note added');
          });
          (0, _starFoxTestsAcceptanceHelpersFormForHelpers.cancelOrder)();
        });

        (0, _mocha.it)('should be able to override the item price', function () {
          var orderItemOverrideTotal = '10.00';

          (0, _starFoxTestsAcceptanceHelpersFormForHelpers.addOrderItem)();

          andThen(function () {
            savePicklesOptions();
          });

          click(editOrderItemBtn);
          (0, _starFoxTestsAcceptanceHelpersFormForHelpers.clickFormCheckbox)('object', 'override-prices');
          fillIn(clientPriceOverride, orderItemOverrideTotal);
          click(customNotesSaveBtn);

          andThen(function () {
            var orderItemTotal = Number(orderItemOverrideTotal) + picklesOptionsPrice();
            expectClientPriceToBe(orderItemTotal);
          });
          (0, _starFoxTestsAcceptanceHelpersFormForHelpers.cancelOrder)();
        });
      });
    }

    regularOrderCartTest('concierge');
  });
});
/* global */
define('star-fox/tests/acceptance/order-states/order-states-happy-path-test', ['exports', 'mocha', 'star-fox/tests/acceptance/helpers/form-for-helpers', 'star-fox/tests/helpers/start-app', 'star-fox/tests/helpers/destroy-app', 'star-fox/tests/acceptance/helpers/login'], function (exports, _mocha, _starFoxTestsAcceptanceHelpersFormForHelpers, _starFoxTestsHelpersStartApp, _starFoxTestsHelpersDestroyApp, _starFoxTestsAcceptanceHelpersLogin) {

  (0, _mocha.describe)('acceptance.order.states.happy.path', function () {
    this.timeout(300000);

    var application = undefined;

    (0, _mocha.beforeEach)(function () {
      application = (0, _starFoxTestsHelpersStartApp['default'])();
    });

    (0, _mocha.afterEach)(function () {
      (0, _starFoxTestsHelpersDestroyApp['default'])(application);
    });

    var stateTransitions = {
      'draft': 'Publish',
      'pre-quote': 'Quote',
      'quoted': 'Client Approved',
      'submitted': 'Finalize',
      'finalized': 'Confirm',
      'scheduled': 'Driver Confirm',
      'driver-confirmed': 'Driver at Restaurant',
      'driver-at-restaurant': 'Picked Up',
      'picked-up': 'Arrive at Client',
      'driver-at-client': 'Deliver',
      'delivered': 'Close'
    };

    function performStateTransition(action) {
      click('.fde-order-state-color_' + action + ' i.down.caret.icon');
      click('.fde-controls-action-button-action-option:contains("' + stateTransitions[action] + '")');
    }

    (0, _mocha.describe)('Moving order through order states', function () {
      (0, _mocha.beforeEach)(function () {
        (0, _starFoxTestsAcceptanceHelpersLogin.login)('developer@food.ee', 'password');
        visit('/orders');
        (0, _starFoxTestsAcceptanceHelpersFormForHelpers.createNewOrderWithNotesAndItems)();
        //needed to accept browser dialog box
        window.confirm = function () {
          return true;
        };
      });

      (0, _mocha.it)('moves the order from draft to closed', function () {
        performStateTransition('draft');
        andThen(function (_) {
          (0, _starFoxTestsAcceptanceHelpersFormForHelpers.expectedState)('pre-quote', 'pre-quote');
        });

        performStateTransition('pre-quote');
        andThen(function (_) {
          (0, _starFoxTestsAcceptanceHelpersFormForHelpers.expectedState)('pre-quote', 'quoted');
        });

        performStateTransition('quoted');
        andThen(function (_) {
          (0, _starFoxTestsAcceptanceHelpersFormForHelpers.expectedState)('quoted', 'submitted');
        });

        performStateTransition('submitted');
        andThen(function (_) {
          (0, _starFoxTestsAcceptanceHelpersFormForHelpers.expectedState)('submitted', 'finalized');
        });

        performStateTransition('finalized');
        andThen(function (_) {
          (0, _starFoxTestsAcceptanceHelpersFormForHelpers.expectedState)('finalized', 'confirmed');
        });

        (0, _starFoxTestsAcceptanceHelpersFormForHelpers.scheduleDriver)();
        andThen(function (_) {
          (0, _starFoxTestsAcceptanceHelpersFormForHelpers.expectedState)('confirmed', 'scheduled');
        });

        performStateTransition('scheduled');
        andThen(function (_) {
          (0, _starFoxTestsAcceptanceHelpersFormForHelpers.expectedState)('scheduled', 'driver-confirmed');
        });

        performStateTransition('driver-confirmed');
        andThen(function (_) {
          (0, _starFoxTestsAcceptanceHelpersFormForHelpers.expectedState)('driver-confirmed', 'driver-at-restaurant');
        });

        performStateTransition('driver-at-restaurant');
        andThen(function (_) {
          (0, _starFoxTestsAcceptanceHelpersFormForHelpers.expectedState)('driver-at-restaurant', 'picked-up');
        });

        performStateTransition('picked-up');
        andThen(function (_) {
          (0, _starFoxTestsAcceptanceHelpersFormForHelpers.expectedState)('picked-up', 'driver-at-client');
        });

        performStateTransition('driver-at-client');
        andThen(function (_) {
          (0, _starFoxTestsAcceptanceHelpersFormForHelpers.expectedState)('driver-at-client', 'delivered');
        });

        performStateTransition('delivered');
        andThen(function (_) {
          (0, _starFoxTestsAcceptanceHelpersFormForHelpers.expectedState)('delivered', 'closed');
        });
      });
    });
  });
});
/* global */
define('star-fox/tests/acceptance/order-states/order-states-negative-path-test', ['exports', 'mocha', 'star-fox/tests/acceptance/helpers/form-for-helpers', 'star-fox/tests/helpers/start-app', 'star-fox/tests/helpers/destroy-app', 'star-fox/tests/acceptance/helpers/login'], function (exports, _mocha, _starFoxTestsAcceptanceHelpersFormForHelpers, _starFoxTestsHelpersStartApp, _starFoxTestsHelpersDestroyApp, _starFoxTestsAcceptanceHelpersLogin) {

  (0, _mocha.describe)('acceptance.order.states.negative.path', function () {
    this.timeout(300000);

    var application = undefined;

    (0, _mocha.beforeEach)(function () {
      application = (0, _starFoxTestsHelpersStartApp['default'])();
    });

    (0, _mocha.afterEach)(function () {
      (0, _starFoxTestsHelpersDestroyApp['default'])(application);
    });

    var stateTransitions = {
      'draft': 'Publish',
      'pre-quote': 'Quote',
      'quoted': 'Client Approved',
      'client-rejected': 'Client Approved',
      'submitted': 'Finalize',
      'finalized': 'Confirm',
      'restaurant-rejected': 'Restaurant Approved',
      'scheduled': 'Driver Confirm',
      'driver-confirmed': 'Driver at Restaurant',
      'driver-at-restaurant': 'Picked Up',
      'picked-up': 'Arrive at Client',
      'driver-at-client': 'Deliver',
      'delivered': 'Close'
    };

    function performStateTransition(action) {
      var stateTransition = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

      click('.fde-order-state-color_' + action + ' i.down.caret.icon');
      click('.fde-controls-action-button-action-option:contains("' + (stateTransition ? stateTransition : stateTransitions[action]) + '")');
    }

    (0, _mocha.describe)('Moving orders through negative states', function () {
      (0, _mocha.beforeEach)(function () {
        (0, _starFoxTestsAcceptanceHelpersLogin.login)('developer@food.ee', 'password');
        visit('/orders');
        (0, _starFoxTestsAcceptanceHelpersFormForHelpers.createNewOrderWithNotesAndItems)();
        //needed to accept browser dialog box
        window.confirm = function (_) {
          return true;
        };
      });

      (0, _mocha.it)('moves the order from pre-quote to submitted', function () {
        performStateTransition('draft');
        performStateTransition('pre-quote', 'Same Day Submit');

        andThen(function (_) {
          (0, _starFoxTestsAcceptanceHelpersFormForHelpers.expectedState)('pre-quote', 'submitted');
        });
        (0, _starFoxTestsAcceptanceHelpersFormForHelpers.cancelOrder)();
      });

      (0, _mocha.it)('moves the order from pre quote to confirmed', function () {
        performStateTransition('draft');
        andThen(function (_) {
          (0, _starFoxTestsAcceptanceHelpersFormForHelpers.expectedState)('pre-quote', 'pre-quote');
        });

        performStateTransition('pre-quote');
        andThen(function (_) {
          (0, _starFoxTestsAcceptanceHelpersFormForHelpers.expectedState)('pre-quote', 'quoted');
        });

        performStateTransition('quoted', 'Client Rejected');
        andThen(function (_) {
          (0, _starFoxTestsAcceptanceHelpersFormForHelpers.expectedState)('quoted', 'client-rejected');
        });

        performStateTransition('client-rejected', 'Client Approved');
        andThen(function (_) {
          (0, _starFoxTestsAcceptanceHelpersFormForHelpers.expectedState)('client-rejected', 'submitted');
        });

        performStateTransition('submitted', 'Finalize');
        andThen(function (_) {
          (0, _starFoxTestsAcceptanceHelpersFormForHelpers.expectedState)('submitted', 'finalized');
        });

        performStateTransition('finalized', 'Restaurant Rejected');
        andThen(function (_) {
          (0, _starFoxTestsAcceptanceHelpersFormForHelpers.expectedState)('finalized', 'restaurant-rejected');
        });

        performStateTransition('restaurant-rejected', 'Restaurant Approved');
        andThen(function (_) {
          (0, _starFoxTestsAcceptanceHelpersFormForHelpers.expectedState)('restaurant-rejected', 'confirmed');
        });
        (0, _starFoxTestsAcceptanceHelpersFormForHelpers.cancelOrder)();
      });
    });
  });
});
/* global */
define('star-fox/tests/acceptance/profile-test', ['exports', 'mocha', 'chai', 'star-fox/tests/helpers/start-app', 'star-fox/tests/helpers/destroy-app', 'star-fox/tests/acceptance/helpers/login', 'faker', 'star-fox/tests/acceptance/helpers/form-helpers'], function (exports, _mocha, _chai, _starFoxTestsHelpersStartApp, _starFoxTestsHelpersDestroyApp, _starFoxTestsAcceptanceHelpersLogin, _faker, _starFoxTestsAcceptanceHelpersFormHelpers) {

  (0, _mocha.describe)('acceptance.profile', function () {
    this.timeout(300000);

    var application = undefined;

    (0, _mocha.beforeEach)(function () {
      application = (0, _starFoxTestsHelpersStartApp['default'])();
    });

    (0, _mocha.afterEach)(function () {
      (0, _starFoxTestsHelpersDestroyApp['default'])(application);
    });

    (0, _mocha.it)('should be able to navigate to profile', function () {
      (0, _starFoxTestsAcceptanceHelpersLogin.login)('developer@food.ee', 'password');
      visit('/profile');

      andThen(function (_) {
        (0, _chai.expect)(currentPath()).to.equal('logged-in.profile');
      });
    });

    (0, _mocha.it)('should be able to change the profile values', function () {
      (0, _starFoxTestsAcceptanceHelpersLogin.login)('developer@food.ee', 'password');
      visit('/profile');

      andThen(function (_) {
        return (0, _chai.expect)(currentPath()).to.equal('logged-in.profile');
      });

      var firstName = _faker['default'].name.firstName();
      var lastName = _faker['default'].name.lastName();

      (0, _starFoxTestsAcceptanceHelpersFormHelpers.fillInText)('user', 'firstName', firstName);
      (0, _starFoxTestsAcceptanceHelpersFormHelpers.fillInText)('user', 'lastName', lastName);
      (0, _starFoxTestsAcceptanceHelpersFormHelpers.clickFormSave)('user');

      andThen(function (_) {
        (0, _chai.expect)(currentPath()).to.equal('logged-in.profile');

        (0, _starFoxTestsAcceptanceHelpersFormHelpers.expectFormValue)('text', 'user', 'firstName', firstName);
        (0, _starFoxTestsAcceptanceHelpersFormHelpers.expectFormValue)('text', 'user', 'lastName', lastName);
      });
    });

    (0, _mocha.it)('should validate firstName, lastName, and email for presence', function () {
      (0, _starFoxTestsAcceptanceHelpersLogin.login)('developer@food.ee', 'password');
      visit('/profile');

      andThen(function (_) {
        return (0, _chai.expect)(currentPath()).to.equal('logged-in.profile');
      });

      (0, _starFoxTestsAcceptanceHelpersFormHelpers.fillInText)('user', 'firstName', '');
      (0, _starFoxTestsAcceptanceHelpersFormHelpers.fillInText)('user', 'lastName', '');
      (0, _starFoxTestsAcceptanceHelpersFormHelpers.fillInText)('user', 'email', '');

      (0, _starFoxTestsAcceptanceHelpersFormHelpers.clickFormSave)('user');

      andThen(function (_) {
        (0, _chai.expect)(currentPath()).to.equal('logged-in.profile');

        (0, _starFoxTestsAcceptanceHelpersFormHelpers.expectError)('text', 'user', 'firstName');
        (0, _starFoxTestsAcceptanceHelpersFormHelpers.expectError)('text', 'user', 'lastName');
        (0, _starFoxTestsAcceptanceHelpersFormHelpers.expectError)('text', 'user', 'email');
      });
    });
  });
});
/* global */
define('star-fox/tests/acceptance/promo-codes-test', ['exports', 'mocha', 'chai', 'star-fox/tests/helpers/start-app', 'star-fox/tests/helpers/destroy-app', 'star-fox/tests/acceptance/helpers/login', 'faker', 'star-fox/tests/acceptance/helpers/form-for-helpers'], function (exports, _mocha, _chai, _starFoxTestsHelpersStartApp, _starFoxTestsHelpersDestroyApp, _starFoxTestsAcceptanceHelpersLogin, _faker, _starFoxTestsAcceptanceHelpersFormForHelpers) {

  (0, _mocha.describe)('acceptance.promo.codes', function () {
    this.timeout(300000);

    var application = undefined;

    (0, _mocha.beforeEach)(function () {
      application = (0, _starFoxTestsHelpersStartApp['default'])();
    });

    (0, _mocha.afterEach)(function () {
      (0, _starFoxTestsHelpersDestroyApp['default'])(application);
    });

    (0, _mocha.describe)('Creating and removing promo codes', function () {
      (0, _mocha.beforeEach)(function () {
        (0, _starFoxTestsAcceptanceHelpersLogin.login)('developer@food.ee', 'password');
        visit('/promo-codes');
        click('.--fde-feature-view__new-button');
      });

      (0, _mocha.it)('should be able to cancel creating a new promo-codes', function () {
        (0, _starFoxTestsAcceptanceHelpersFormForHelpers.clickFormReset)('promoCode');

        andThen(function (_) {
          return (0, _chai.expect)(currentPath()).to.equal('logged-in.promo-codes.index');
        });
      });

      (0, _mocha.it)('should be able to properly validate failure of promo-code creation', function () {
        (0, _starFoxTestsAcceptanceHelpersFormForHelpers.clickFormSubmit)('promoCode');

        andThen(function (_) {
          (0, _starFoxTestsAcceptanceHelpersFormForHelpers.expectError)('promoCode', 'code', 'can\'t be blank');
          (0, _starFoxTestsAcceptanceHelpersFormForHelpers.expectError)('promoCode', 'description', 'can\'t be blank');
        });
      });

      (0, _mocha.it)('should be able to properly validate promo-code creation', function () {
        var code = _faker['default'].lorem.word() + '#' + _faker['default'].random.number();
        var description = _faker['default'].lorem.sentence();
        var amount = _faker['default'].random.number();
        var clientAccountingCode = _faker['default'].random.number();
        var restaurantAccountingCode = _faker['default'].random.number();

        (0, _starFoxTestsAcceptanceHelpersFormForHelpers.fillInText)('promoCode', 'code', code);
        (0, _starFoxTestsAcceptanceHelpersFormForHelpers.fillInTextarea)('promoCode', 'description', description);
        (0, _starFoxTestsAcceptanceHelpersFormForHelpers.fillInAmount)('promoCode', 'amount_amount-type', amount);
        (0, _starFoxTestsAcceptanceHelpersFormForHelpers.fillInNumber)('promoCode', 'clientAccountingCode', clientAccountingCode);
        (0, _starFoxTestsAcceptanceHelpersFormForHelpers.fillInNumber)('promoCode', 'restaurantAccountingCode', restaurantAccountingCode);

        (0, _starFoxTestsAcceptanceHelpersFormForHelpers.clickFormSubmit)('promoCode');

        andThen(function (_) {
          (0, _chai.expect)(currentPath()).to.equal('logged-in.promo-codes.index');
        });
      });
    });
  });
});
/* global */
define('star-fox/tests/acceptance/restaurant-closure-test', ['exports', 'mocha', 'chai', 'star-fox/tests/helpers/start-app', 'star-fox/tests/helpers/destroy-app', 'star-fox/tests/acceptance/helpers/login'], function (exports, _mocha, _chai, _starFoxTestsHelpersStartApp, _starFoxTestsHelpersDestroyApp, _starFoxTestsAcceptanceHelpersLogin) {

  (0, _mocha.describe)('acceptance.restaurant.closure', function () {
    this.timeout(60000);

    var application = undefined;

    (0, _mocha.beforeEach)(function () {
      application = (0, _starFoxTestsHelpersStartApp['default'])();
    });

    (0, _mocha.afterEach)(function () {
      (0, _starFoxTestsHelpersDestroyApp['default'])(application);
    });

    function openResto() {
      click('.fde-restaurant-closures_day.fde-is-today');

      andThen(function () {
        (0, _chai.expect)(find('.fde-restaurant-closures_day.fde-is-today .icon.red').length).to.equal(0);
      });
    }

    function closeRestaurant(role) {
      (0, _mocha.describe)('Adding a restaurant closure as ' + role, function () {
        (0, _mocha.beforeEach)(function () {
          (0, _starFoxTestsAcceptanceHelpersLogin.login)(role + '@food.ee', 'password');
          visit('/restaurants');
          click('.--fde-ordered-table td:first');
          click('.fde-tabbed-menu a:contains("Closures")');
        });

        (0, _mocha.it)('adds and then removes restaurant closure', function () {
          click('.fde-restaurant-closures_day.fde-is-today');

          andThen(function () {
            (0, _chai.expect)(find('.fde-restaurant-closures_day.fde-is-today .icon.red').length).to.equal(1);
          });
          openResto();
        });
      });
    }
    closeRestaurant('developer');
    closeRestaurant('concierge');
  });
});
/* global */
define('star-fox/tests/acceptance/restaurant-details-locations-test', ['exports', 'faker', 'mocha', 'chai', 'star-fox/tests/helpers/start-app', 'star-fox/tests/helpers/destroy-app', 'star-fox/tests/acceptance/helpers/login', 'star-fox/tests/acceptance/helpers/form-for-helpers'], function (exports, _faker, _mocha, _chai, _starFoxTestsHelpersStartApp, _starFoxTestsHelpersDestroyApp, _starFoxTestsAcceptanceHelpersLogin, _starFoxTestsAcceptanceHelpersFormForHelpers) {

  (0, _mocha.describe)('acceptance.restaurant.details.location', function () {
    this.timeout(300000);

    var application = undefined;

    (0, _mocha.beforeEach)(function () {
      application = (0, _starFoxTestsHelpersStartApp['default'])();
    });

    (0, _mocha.afterEach)(function () {
      (0, _starFoxTestsHelpersDestroyApp['default'])(application);
    });

    (0, _mocha.describe)('Adding and removing restaurant pickup locations', function () {
      (0, _mocha.beforeEach)(function () {
        (0, _starFoxTestsAcceptanceHelpersLogin.login)('developer@food.ee', 'password');
        visit('/restaurants/1');
      });

      (0, _mocha.it)('should be able to add and remove delivery locations', function () {
        var locationName = 'Foodee ' + _faker['default'].lorem.word() + ' office';
        var pickupLocations = ['120 Columbia St, Vancouver,BC, Canada', '545 Robson Street, Vancouver,BC, Canada', '1066 West Hastings Street, Vancouver,BC, Canada', '887 Great Northern Way, Vancouver,BC, Canada'];

        var randomPickupLocation = pickupLocations[Math.floor(Math.random() * 4)];

        andThen(function (_) {
          return (0, _starFoxTestsAcceptanceHelpersFormForHelpers.addPickupLocation)(locationName, randomPickupLocation);
        });

        andThen(function (_) {
          (0, _chai.expect)(find('.--fde-basic-field-for__name:contains("' + locationName + '")').length).to.equal(1);
        });

        andThen(function (_) {
          return (0, _starFoxTestsAcceptanceHelpersFormForHelpers.removeLocation)(locationName);
        });

        andThen(function () {
          (0, _chai.expect)(find('.--fde-basic-field-for__name:contains("' + locationName + '")').length).to.equal(0);
        });
      });
    });
  });
});
/* global */
define('star-fox/tests/acceptance/restaurant-details-test', ['exports', 'mocha', 'chai', 'faker', 'star-fox/tests/acceptance/helpers/form-for-helpers', 'star-fox/tests/helpers/start-app', 'star-fox/tests/helpers/destroy-app', 'star-fox/tests/acceptance/helpers/login'], function (exports, _mocha, _chai, _faker, _starFoxTestsAcceptanceHelpersFormForHelpers, _starFoxTestsHelpersStartApp, _starFoxTestsHelpersDestroyApp, _starFoxTestsAcceptanceHelpersLogin) {

  (0, _mocha.describe)('acceptance.restaurant.details', function () {
    this.timeout(300000);

    var application = undefined;

    (0, _mocha.beforeEach)(function () {
      application = (0, _starFoxTestsHelpersStartApp['default'])();
    });

    (0, _mocha.afterEach)(function () {
      (0, _starFoxTestsHelpersDestroyApp['default'])(application);
    });

    //Page objects and helpers
    function fillInRestoName(newRestoName) {
      (0, _starFoxTestsAcceptanceHelpersFormForHelpers.fillInText)('restaurant', 'name', newRestoName);
    }

    function fillInSubtitleText(subtitle) {
      (0, _starFoxTestsAcceptanceHelpersFormForHelpers.fillInText)('restaurant', 'subtitle', subtitle);
    }

    function fillInRestoSlugText(slug) {
      (0, _starFoxTestsAcceptanceHelpersFormForHelpers.fillInText)('restaurant', 'slug', slug);
    }

    function fillInHoursInAdvance(hours) {
      (0, _starFoxTestsAcceptanceHelpersFormForHelpers.fillInNumber)('restaurant', 'hours-in-advance', hours);
    }

    function removeRestoTags($tagField) {
      $tagField.find('i.delete.icon').click();
    }

    function addTagToResto(tagFieldPath) {
      click(tagFieldPath + ' i.dropdown.icon');
      click(tagFieldPath + ' .fde-dropdown-menu .item:first');
    }

    function expectRestoTag($tagField) {
      (0, _chai.expect)($tagField.find('i.delete.icon').length).to.equal(1);
    }

    function addpickupNotesToResto(pickupNote) {
      (0, _starFoxTestsAcceptanceHelpersFormForHelpers.fillInTextarea)('restaurant', 'pickup-notes', pickupNote);
    }
    /**
     * For uniquely identifying restaurants and slugs
     * @return {string} A random alpha-numeric string
     */
    function randString() {
      return Math.floor(Math.random() * Math.pow(2, 32)).toString(36);
    }

    (0, _mocha.describe)('Editing the restaurant details page', function () {
      var restaurantName = undefined;
      (0, _mocha.beforeEach)(function () {
        (0, _starFoxTestsAcceptanceHelpersLogin.login)('developer@food.ee', 'password');
        visit('/restaurants/1');

        andThen(function () {
          restaurantName = $('h1.fde-title').text();
        });
      });

      (0, _mocha.it)('should be able to edit the restaurant name', function () {
        // Name must be unique to prevent false positives
        var newRestoName = 'Restaurant ' + randString();
        fillInRestoName(newRestoName);
        (0, _starFoxTestsAcceptanceHelpersFormForHelpers.clickFormSubmit)('restaurant');

        andThen(function () {
          (0, _starFoxTestsAcceptanceHelpersFormForHelpers.expectFormValue)('restaurant', 'name', newRestoName);
          (0, _starFoxTestsAcceptanceHelpersFormForHelpers.expectSuccessToast)(newRestoName + ' saved!');
        });
      });

      (0, _mocha.it)('should be able to edit the restaurant subtitle', function () {
        var subtitle = 'Automated subtitle for menu';
        fillInSubtitleText(subtitle);
        (0, _starFoxTestsAcceptanceHelpersFormForHelpers.clickFormSubmit)('restaurant');

        andThen(function () {
          (0, _starFoxTestsAcceptanceHelpersFormForHelpers.expectFormValue)('restaurant', 'subtitle', subtitle);
          (0, _starFoxTestsAcceptanceHelpersFormForHelpers.expectSuccessToast)(restaurantName + ' saved!');
        });
      });

      (0, _mocha.it)('should be able to edit the restaurant slug', function () {
        // Randomized to comply with uniqueness constraint on slugs
        var dashedSlug = restaurantName.dasherize() + '-' + randString();
        var slug = dashedSlug + '-automation';
        fillInRestoSlugText(slug);
        (0, _starFoxTestsAcceptanceHelpersFormForHelpers.clickFormSubmit)('restaurant');

        andThen(function () {
          (0, _starFoxTestsAcceptanceHelpersFormForHelpers.expectFormValue)('restaurant', 'slug', slug);
          (0, _starFoxTestsAcceptanceHelpersFormForHelpers.expectSuccessToast)(restaurantName + ' saved!');
        });
      });

      (0, _mocha.it)('should be able to edit the hours in advance', function () {
        var hours = '4';
        fillInHoursInAdvance(hours);
        (0, _starFoxTestsAcceptanceHelpersFormForHelpers.clickFormSubmit)('restaurant');

        andThen(function () {
          (0, _starFoxTestsAcceptanceHelpersFormForHelpers.expectFormValue)('restaurant', 'hours-in-advance', hours);
          (0, _starFoxTestsAcceptanceHelpersFormForHelpers.expectSuccessToast)(restaurantName + ' saved!');
        });
      });

      (0, _mocha.it)('should be able to add restaurant tags', function () {
        var tagFieldPath = (0, _starFoxTestsAcceptanceHelpersFormForHelpers.fieldPath)('restaurant', 'tags');
        var $tagField = $(tagFieldPath);

        removeRestoTags($tagField);
        addTagToResto(tagFieldPath);
        (0, _starFoxTestsAcceptanceHelpersFormForHelpers.clickFormSubmit)('restaurant');

        andThen(function () {
          expectRestoTag($tagField);
          (0, _starFoxTestsAcceptanceHelpersFormForHelpers.expectSuccessToast)(restaurantName + ' saved!');
        });
      });

      (0, _mocha.it)('should be able to edit the pickup notes', function () {
        var pickupNote = 'This is a new pickup note. ' + _faker['default'].lorem.sentence();
        addpickupNotesToResto(pickupNote);
        (0, _starFoxTestsAcceptanceHelpersFormForHelpers.clickFormSubmit)('restaurant');

        andThen(function () {
          (0, _starFoxTestsAcceptanceHelpersFormForHelpers.expectFormValue)('restaurant', 'pickup-notes', pickupNote, 'textarea');
          (0, _starFoxTestsAcceptanceHelpersFormForHelpers.expectSuccessToast)(restaurantName + ' saved!');
        });
      });
    });
  });
});
/* global */
define('star-fox/tests/acceptance/restaurant-tags-test', ['exports', 'mocha', 'chai', 'star-fox/tests/helpers/start-app', 'star-fox/tests/helpers/destroy-app', 'star-fox/tests/acceptance/helpers/login', 'ember-cli-mirage', 'star-fox/tests/acceptance/helpers/form-helpers', 'star-fox/tests/acceptance/helpers/form-for-helpers'], function (exports, _mocha, _chai, _starFoxTestsHelpersStartApp, _starFoxTestsHelpersDestroyApp, _starFoxTestsAcceptanceHelpersLogin, _emberCliMirage, _starFoxTestsAcceptanceHelpersFormHelpers, _starFoxTestsAcceptanceHelpersFormForHelpers) {

  (0, _mocha.describe)('acceptance.restaurant.tags', function () {
    this.timeout(300000);

    var application = undefined;

    (0, _mocha.beforeEach)(function () {
      application = (0, _starFoxTestsHelpersStartApp['default'])();
    });

    (0, _mocha.afterEach)(function () {
      (0, _starFoxTestsHelpersDestroyApp['default'])(application);
    });

    //Page objects and helpers
    var restaurantTags = '/tags/restaurant';
    var newTagBtn = '.--new-button';
    var saveTag = '.save.icon';
    var deleteTag = '.ui.button.destroy';
    var selectRestaurant = '.--fde-ordered-table a:first';
    var tagTypeDropdown = '.--fde-basic-field-for__tag-type .dropdown';
    var selectTagTypeFeature = 'div[data-value="feature"]';

    function fillInTagField(modelName, text) {
      fillIn('.--fde-text-field-for__' + modelName + ' input', '' + text);
    }

    function expectTagToEqual(modelName, text) {
      (0, _chai.expect)(find('.--fde-text-field-for__' + modelName + ' input').val()).to.equal('' + text);
    }

    function SearchForTag(text) {
      fillIn('div.ui.left.icon.input input', '' + text);
    }

    function expectNoTagIcon(text) {
      (0, _chai.expect)(find('.--fde-ordered-table th').text()).to.not.contain('' + text);
    }

    function expectTagOnPage(text) {
      (0, _chai.expect)(find('.--fde-basic-display-value').text()).to.contain('' + text);
    }

    function createRestaurantTag(word) {
      visit(restaurantTags);
      click(newTagBtn);
      fillInTagField('tag_name', word);

      andThen(function () {
        expectTagToEqual('tag_name', word);
      });

      fillInTagField('tag_emoji', '💩');

      andThen(function () {
        expectTagToEqual('tag_emoji', '💩');
      });

      click(saveTag);
    }

    function deleteRestaurantTag(word) {
      visit(restaurantTags);
      SearchForTag(word);
      click(deleteTag);

      andThen(function () {
        $('.button.confirm').click();
        expectNoTagIcon(word);
      });
    }

    (0, _mocha.describe)('Creating a new restaurant tag', function () {
      (0, _mocha.beforeEach)(function () {
        (0, _starFoxTestsAcceptanceHelpersLogin.login)('developer@food.ee', 'password');
        visit(restaurantTags);
      });

      (0, _mocha.it)('should not be able to create a blank restaurant tag', function () {
        click(newTagBtn);
        click(saveTag);

        andThen(function () {
          (0, _starFoxTestsAcceptanceHelpersFormHelpers.expectError)('text', 'tag', 'name', 'can\'t be blank');
        });
      });

      (0, _mocha.it)('should be able to create a new restaurant tag', function () {
        var randomWord = _emberCliMirage.faker.random.word();
        createRestaurantTag(randomWord);
        deleteRestaurantTag(randomWord);
      });
    });

    (0, _mocha.describe)('Searching for restaurant tag', function () {
      (0, _mocha.beforeEach)(function () {
        (0, _starFoxTestsAcceptanceHelpersLogin.login)('developer@food.ee', 'password');
      });

      (0, _mocha.it)('can locate the new restaurant tag', function () {
        var randomWord = _emberCliMirage.faker.random.word();
        createRestaurantTag(randomWord);
        SearchForTag(randomWord);

        andThen(function () {
          expectTagOnPage(randomWord);
        });

        deleteRestaurantTag(randomWord);
      });
    });

    (0, _mocha.describe)('add restaurant tag to restaurant', function () {
      (0, _mocha.beforeEach)(function () {
        (0, _starFoxTestsAcceptanceHelpersLogin.login)('developer@food.ee', 'password');
      });

      (0, _mocha.it)('loads the restaurants page and adds the tag', function () {
        var randomWord = _emberCliMirage.faker.random.word();
        createRestaurantTag(randomWord);
        // add tag to restaurant
        visit('/restaurants');
        click(selectRestaurant);

        var tagFieldPath = (0, _starFoxTestsAcceptanceHelpersFormForHelpers.fieldPath)('restaurant', 'tags');
        var $tagField = $(tagFieldPath);
        var restaurantName = $('h1.fde-title').text();

        $tagField.find('i.delete.icon').click(); //Remove all Tags
        click(tagFieldPath + ' i.dropdown.icon');
        click(tagFieldPath + ' .fde-dropdown-menu .item:contains(' + randomWord + ')');
        (0, _starFoxTestsAcceptanceHelpersFormForHelpers.clickFormSubmit)('restaurant');

        andThen(function () {
          (0, _chai.expect)(find('' + tagFieldPath).text()).to.contain('' + randomWord);
          (0, _starFoxTestsAcceptanceHelpersFormForHelpers.expectSuccessToast)(restaurantName);
        });
        deleteRestaurantTag(randomWord);
      });
    });

    (0, _mocha.describe)('can change tag type on a restaurant tag', function () {
      (0, _mocha.beforeEach)(function () {
        (0, _starFoxTestsAcceptanceHelpersLogin.login)('developer@food.ee', 'password');
      });

      (0, _mocha.it)('can change the tag type to feature', function () {
        var randomWord = _emberCliMirage.faker.random.word();
        createRestaurantTag(randomWord);
        SearchForTag(randomWord);
        click(tagTypeDropdown);
        click(selectTagTypeFeature);

        andThen(function () {
          (0, _starFoxTestsAcceptanceHelpersFormForHelpers.expectSuccessToast)(randomWord);
        });

        deleteRestaurantTag(randomWord);
      });
    });
  });
});
/* global */
define('star-fox/tests/acceptance/set-menu-meal-plan-order-test', ['exports', 'mocha', 'chai', 'star-fox/tests/helpers/start-app', 'star-fox/tests/helpers/destroy-app', 'star-fox/tests/acceptance/helpers/form-for-helpers', 'star-fox/tests/acceptance/helpers/team-order-helpers', 'star-fox/tests/acceptance/helpers/login'], function (exports, _mocha, _chai, _starFoxTestsHelpersStartApp, _starFoxTestsHelpersDestroyApp, _starFoxTestsAcceptanceHelpersFormForHelpers, _starFoxTestsAcceptanceHelpersTeamOrderHelpers, _starFoxTestsAcceptanceHelpersLogin) {

  (0, _mocha.describe)('acceptance.set.meal.plan.order.menu', function () {
    this.timeout(60000);

    var application = undefined;

    (0, _mocha.beforeEach)(function () {
      application = (0, _starFoxTestsHelpersStartApp['default'])();
    });

    (0, _mocha.afterEach)(function () {
      (0, _starFoxTestsHelpersDestroyApp['default'])(application);
    });

    function setMenuTeamOrder(role) {
      (0, _mocha.describe)('Adding a set menu to a meal plan order as ' + role, function () {
        (0, _mocha.beforeEach)(function () {
          (0, _starFoxTestsAcceptanceHelpersLogin.login)(role + '@food.ee', 'password');
          visit('/orders');
          (0, _starFoxTestsAcceptanceHelpersFormForHelpers.createTeamOrder)();
          click('.--fde-field-for__order_is-meal-plan-order .toggle label');
          click('.--fde-order-edit_view-cart');
          click('.fde-order-menu_set-menu-tab');

          //needed to accept browser dialog box
          window.confirm = function () {
            return true;
          };
        });

        (0, _mocha.it)('Adds all items to set menu with no quantity', function () {
          click('.fde-order-menu_select-all-button');

          (0, _starFoxTestsAcceptanceHelpersTeamOrderHelpers.saveSetMenu)();

          andThen(function () {
            var setMenuItemsHaveQuantities = find('.fde-order-menu_set-menu-item-qty').text().replace(/ /g, '').replace(/[^\x20-\x7E]/gmi, "") // I'm sorry, I'm not bug on regex'ing and I just want this to pass and make sense.
            .length > 0;

            (0, _chai.expect)(setMenuItemsHaveQuantities).to.be['false'];
          });

          andThen(function () {
            (0, _starFoxTestsAcceptanceHelpersFormForHelpers.cancelOrder)();
          });
        });

        (0, _mocha.it)('Adds quantity to order items', function () {
          click('.fde-order-menu-group-item:first .square');

          andThen(function () {
            fillIn('.fde-order-menu_set-menu-item-qty:first input', '20');
            triggerEvent('.fde-order-menu_set-menu-item-qty:first input', 'blur');
          });

          andThen(function () {
            (0, _starFoxTestsAcceptanceHelpersTeamOrderHelpers.saveSetMenu)();
          });

          andThen(function () {
            click('.--fde-order-edit_order-details');
            click('.--fde-order-edit_view-cart');
          });

          andThen(function () {
            (0, _chai.expect)(find('.fde-order-menu_set-menu-qty:first').text()).to.contain('20');
          });
          (0, _starFoxTestsAcceptanceHelpersFormForHelpers.cancelOrder)();
        });

        (0, _mocha.it)('Clears all items in set menu', function () {
          click('.fde-order-menu_select-all-button');
          (0, _starFoxTestsAcceptanceHelpersTeamOrderHelpers.saveSetMenu)();
          click('.fde-order-menu_clear-button');

          andThen(function () {
            (0, _chai.expect)(find('.fde-order-menu-group-item').hasClass('.active')).to.be['false'];
          });
          (0, _starFoxTestsAcceptanceHelpersFormForHelpers.cancelOrder)();
        });
      });
    }
    setMenuTeamOrder('concierge');
  });
});
/* global */
define('star-fox/tests/acceptance/set-menu-team-order-test', ['exports', 'mocha', 'chai', 'star-fox/tests/helpers/start-app', 'star-fox/tests/helpers/destroy-app', 'star-fox/tests/acceptance/helpers/form-for-helpers', 'star-fox/tests/acceptance/helpers/team-order-helpers', 'star-fox/tests/acceptance/helpers/login'], function (exports, _mocha, _chai, _starFoxTestsHelpersStartApp, _starFoxTestsHelpersDestroyApp, _starFoxTestsAcceptanceHelpersFormForHelpers, _starFoxTestsAcceptanceHelpersTeamOrderHelpers, _starFoxTestsAcceptanceHelpersLogin) {

  (0, _mocha.describe)('acceptance.set.team.order.menu', function () {
    this.timeout(60000);

    var application = undefined;

    (0, _mocha.beforeEach)(function () {
      application = (0, _starFoxTestsHelpersStartApp['default'])();
    });

    (0, _mocha.afterEach)(function () {
      (0, _starFoxTestsHelpersDestroyApp['default'])(application);
    });

    function setMenuTeamOrder(role) {
      (0, _mocha.describe)('Adding a set menu to a team order as ' + role, function () {
        (0, _mocha.beforeEach)(function () {
          (0, _starFoxTestsAcceptanceHelpersLogin.login)(role + '@food.ee', 'password');
          visit('/orders');
          (0, _starFoxTestsAcceptanceHelpersFormForHelpers.createTeamOrder)();
          click('.--fde-order-edit_view-cart');
          click('.fde-order-menu_set-menu-tab');
          //needed to accept browser dialog box
          window.confirm = function () {
            return true;
          };
        });

        (0, _mocha.it)('Adds all items to set menu with no quantity', function () {
          click('.fde-order-menu_select-all-button');
          (0, _starFoxTestsAcceptanceHelpersTeamOrderHelpers.saveSetMenu)();

          andThen(function () {
            (0, _chai.expect)(find('.fde-order-menu-group-item').hasClass('.inverted.dimmer')).to.be['false'];
          });
          (0, _starFoxTestsAcceptanceHelpersFormForHelpers.cancelOrder)();
        });

        (0, _mocha.it)('Adds quantity to order items', function () {
          click('.fde-order-menu-group-item:first .square');

          andThen(function () {
            fillIn('.fde-order-menu_set-menu-item-qty:first input', '20');
            triggerEvent('.fde-order-menu_set-menu-item-qty:first input', 'blur');
          });

          andThen(function () {
            (0, _starFoxTestsAcceptanceHelpersTeamOrderHelpers.saveSetMenu)();
          });

          andThen(function () {
            click('.--fde-order-edit_order-details');
            click('.--fde-order-edit_view-cart');
          });

          andThen(function () {
            (0, _chai.expect)(find('.fde-order-menu_set-menu-qty:first').text()).to.contain('20');
          });
          (0, _starFoxTestsAcceptanceHelpersFormForHelpers.cancelOrder)();
        });

        (0, _mocha.it)('Clears all items in set menu', function () {
          click('.fde-order-menu_select-all-button');
          (0, _starFoxTestsAcceptanceHelpersTeamOrderHelpers.saveSetMenu)();
          click('.fde-order-menu_clear-button');

          andThen(function () {
            (0, _chai.expect)(find('.fde-order-menu-group-item').hasClass('.active')).to.be['false'];
          });
          (0, _starFoxTestsAcceptanceHelpersFormForHelpers.cancelOrder)();
        });
      });
    }
    setMenuTeamOrder('concierge');
  });
});
/* global */
define('star-fox/tests/acceptance/tax-rate-test', ['exports', 'mocha', 'star-fox/tests/helpers/start-app', 'star-fox/tests/helpers/destroy-app', 'star-fox/tests/acceptance/helpers/login', 'faker', 'star-fox/tests/acceptance/helpers/form-for-helpers'], function (exports, _mocha, _starFoxTestsHelpersStartApp, _starFoxTestsHelpersDestroyApp, _starFoxTestsAcceptanceHelpersLogin, _faker, _starFoxTestsAcceptanceHelpersFormForHelpers) {

  (0, _mocha.describe)('acceptance.create.tax.rates', function () {
    this.timeout(300000);

    var application = undefined;

    (0, _mocha.beforeEach)(function () {
      application = (0, _starFoxTestsHelpersStartApp['default'])();
    });

    (0, _mocha.afterEach)(function () {
      (0, _starFoxTestsHelpersDestroyApp['default'])(application);
    });

    var taxCodeName = undefined;
    var taxCodeRate = undefined;
    var taxCodeDescription = undefined;

    //Page objects and helpers
    var taxRatesTab = '/admins/tax-rates';
    var newTaxRateBtn = '.--fde-feature-view__new-button';

    function expectTaxRate(name, description, rate) {
      (0, _starFoxTestsAcceptanceHelpersFormForHelpers.expectFormDisplayValue)('invoicingTaxRate', 'name', name, 'last');
      (0, _starFoxTestsAcceptanceHelpersFormForHelpers.expectFormDisplayValue)('invoicingTaxRate', 'description', description, 'last');
      (0, _starFoxTestsAcceptanceHelpersFormForHelpers.expectFormDisplayValue)('invoicingTaxRate', 'rate', rate, 'last');
    }

    function createNewTaxRate() {
      taxCodeName = _faker['default'].address.countryCode();
      // Would use faker, but faker.finance.amount currently has a bug where the number after the decimal is always 0
      taxCodeRate = (Math.random() * (0.9 - 0.1) + 0.1).toFixed(1);
      taxCodeDescription = _faker['default'].hacker.phrase();

      click(newTaxRateBtn);
      (0, _starFoxTestsAcceptanceHelpersFormForHelpers.fillInText)('invoicingTaxRate', 'name', taxCodeName);
      (0, _starFoxTestsAcceptanceHelpersFormForHelpers.fillInNumber)('invoicingTaxRate', 'rate', taxCodeRate);
      (0, _starFoxTestsAcceptanceHelpersFormForHelpers.fillInText)('invoicingTaxRate', 'taxCode', taxCodeName);
      (0, _starFoxTestsAcceptanceHelpersFormForHelpers.fillInTextarea)('invoicingTaxRate', 'description', taxCodeDescription);
      (0, _starFoxTestsAcceptanceHelpersFormForHelpers.clickFormSubmit)('invoicingTaxRate');

      andThen(function () {
        expectTaxRate(taxCodeName, taxCodeDescription, taxCodeRate);
      });
    }

    (0, _mocha.describe)('Creating and editing a tax rate', function () {
      (0, _mocha.beforeEach)(function () {
        (0, _starFoxTestsAcceptanceHelpersLogin.login)('developer@food.ee', 'password');
        visit(taxRatesTab);
      });

      (0, _mocha.it)('should not be able to create a blank tax rate', function () {
        click(newTaxRateBtn);

        (0, _starFoxTestsAcceptanceHelpersFormForHelpers.clickFormSubmit)('invoicingTaxRate');

        andThen(function () {
          (0, _starFoxTestsAcceptanceHelpersFormForHelpers.expectErrorToContain)('text', 'invoicingTaxRate', 'name', "can't be blank");
        });
      });

      (0, _mocha.it)('should be able to create a tax rate', function () {
        createNewTaxRate();
      });
    });
  });
});
/* global */
define('star-fox/tests/acceptance/user-details-test', ['exports', 'faker', 'mocha', 'chai', 'star-fox/tests/helpers/start-app', 'star-fox/tests/helpers/destroy-app', 'star-fox/tests/acceptance/helpers/login'], function (exports, _faker, _mocha, _chai, _starFoxTestsHelpersStartApp, _starFoxTestsHelpersDestroyApp, _starFoxTestsAcceptanceHelpersLogin) {

  (0, _mocha.describe)('acceptance.user.details', function () {
    this.timeout(300000);

    var application = undefined;

    (0, _mocha.beforeEach)(function () {
      application = (0, _starFoxTestsHelpersStartApp['default'])();
    });

    (0, _mocha.afterEach)(function () {
      (0, _starFoxTestsHelpersDestroyApp['default'])(application);
    });

    function saveUserDetails() {
      click('button.submit');
    }

    function expectValue(propertyName, text) {
      (0, _chai.expect)(find('.--fde-field-for__user_' + propertyName + ' input').val()).to.contain('' + text);
    }

    (0, _mocha.describe)('Editing user details', function () {
      (0, _mocha.beforeEach)(function () {
        (0, _starFoxTestsAcceptanceHelpersLogin.login)('developer@food.ee', 'password');
        visit('/users/1');
      });

      (0, _mocha.it)('should be able to change the users name', function () {
        var firstName = _faker['default'].name.firstName();
        var lastName = _faker['default'].name.lastName();

        fillIn('.--fde-field-for__user_first-name input', firstName);
        fillIn('.--fde-field-for__user_last-name input', lastName);
        saveUserDetails();

        andThen(function (_) {
          expectValue('first-name', firstName);
          expectValue('last-name', lastName);
        });
      });

      (0, _mocha.it)('should be able to change the users email', function () {
        var email = _faker['default'].internet.email();
        var emailLowercase = email.toLowerCase();

        fillIn('.--fde-field-for__user_email input', emailLowercase);
        saveUserDetails();

        andThen(function (_) {
          expectValue('email', emailLowercase);
        });

        andThen(function (_) {
          fillIn('.--fde-field-for__user_email input', 'vancouver_client@food.ee');
          saveUserDetails();
        });

        andThen(function (_) {
          expectValue('email', 'vancouver_client@food.ee');
        });
      });

      (0, _mocha.it)('should be able to change the users phone number', function () {
        var phoneNumber = _faker['default'].phone.phoneNumberFormat();
        phoneNumber = phoneNumber.replace(/^\d{3}/, '202');
        // need to format the phone number to be (123) 456-7890
        var formattedPhoneNumber = phoneNumber.slice(0, 0) + "(" + phoneNumber.slice(0, 3) + ") " + phoneNumber.slice(4);

        fillIn('.--fde-field-for__user_phone-number input', phoneNumber);
        saveUserDetails();

        andThen(function (_) {
          expectValue('phone-number', formattedPhoneNumber);
        });
      });
    });
  });
});
/* global */
define('star-fox/tests/app.lint-test', ['exports'], function (exports) {
  'use strict';

  describe('ESLint | app', function () {

    it('adapters/application.js', function () {
      // test passed
    });

    it('adapters/client.js', function () {
      // test passed
    });

    it('adapters/giftbit-error.js', function () {
      // test passed
    });

    it('adapters/giftbit-points-action.js', function () {
      // test passed
    });

    it('adapters/salesforce-sync-error.js', function () {
      // test passed
    });

    it('app.js', function () {
      // test passed
    });

    it('authenticators/devise.js', function () {
      // test passed
    });

    it('authorizers/devise.js', function () {
      // test passed
    });

    it('builders/feed-item/area-closure.js', function () {
      // test passed
    });

    it('builders/feed-item/base.js', function () {
      // test passed
    });

    it('builders/feed-item/charge.js', function () {
      // test passed
    });

    it('builders/feed-item/client-admin.js', function () {
      // test passed
    });

    it('builders/feed-item/client.js', function () {
      // test passed
    });

    it('builders/feed-item/confirmation.js', function () {
      // test passed
    });

    it('builders/feed-item/contact.js', function () {
      // test passed
    });

    it('builders/feed-item/email-logs-events-order.js', function () {
      // test passed
    });

    it('builders/feed-item/email-logs-messages-order.js', function () {
      // test passed
    });

    it('builders/feed-item/group-order-member.js', function () {
      // test passed
    });

    it('builders/feed-item/order-item-option.js', function () {
      // test passed
    });

    it('builders/feed-item/order-item.js', function () {
      // test passed
    });

    it('builders/feed-item/order-user.js', function () {
      // test passed
    });

    it('builders/feed-item/order.js', function () {
      // test passed
    });

    it('builders/feed-item/restaurant-closure.js', function () {
      // test passed
    });

    it('builders/feed-item/restaurant.js', function () {
      // test passed
    });

    it('builders/feed-item/team-member.js', function () {
      // test passed
    });

    it('builders/feed-item/team-order.js', function () {
      // test passed
    });

    it('builders/feed-item/user.js', function () {
      // test passed
    });

    it('errors/application.js', function () {
      // test passed
    });

    it('features/application/controller.js', function () {
      // test passed
    });

    it('features/application/route.js', function () {
      // test passed
    });

    it('features/components/accounting/ledger-item/component.js', function () {
      // test passed
    });

    it('features/components/cards/card-for/component.js', function () {
      // test passed
    });

    it('features/components/cards/meal-planning-reservation-card/component.js', function () {
      // test passed
    });

    it('features/components/cards/order-card/component.js', function () {
      // test passed
    });

    it('features/components/core/fde-tether/component.js', function () {
      // test passed
    });

    it('features/components/core/times-do/component.js', function () {
      // test passed
    });

    it('features/components/form-controls/amount-control/component.js', function () {
      // test passed
    });

    it('features/components/form-controls/calendar-control/component.js', function () {
      // test passed
    });

    it('features/components/form-controls/checkbox-control/component.js', function () {
      // test passed
    });

    it('features/components/form-controls/color-control/component.js', function () {
      // test passed
    });

    it('features/components/form-controls/comma-separated-strings-control/component.js', function () {
      // test passed
    });

    it('features/components/form-controls/commit-buttons/component.js', function () {
      // test passed
    });

    it('features/components/form-controls/country-select-control/component.js', function () {
      // test passed
    });

    it('features/components/form-controls/cover-image-control/component.js', function () {
      // test passed
    });

    it('features/components/form-controls/credit-card-control/component.js', function () {
      // test passed
    });

    it('features/components/form-controls/date-control/component.js', function () {
      // test passed
    });

    it('features/components/form-controls/date-range-control/component.js', function () {
      // test passed
    });

    it('features/components/form-controls/dietary-tags-control/component.js', function () {
      // test passed
    });

    it('features/components/form-controls/error-label/component.js', function () {
      // test passed
    });

    it('features/components/form-controls/filepicker-control/component.js', function () {
      // test passed
    });

    it('features/components/form-controls/image-control/component.js', function () {
      // test passed
    });

    it('features/components/form-controls/input-control/component.js', function () {
      // test passed
    });

    it('features/components/form-controls/json-control/component.js', function () {
      // test passed
    });

    it('features/components/form-controls/map-control/component.js', function () {
      // test passed
    });

    it('features/components/form-controls/menu-item-description-control/component.js', function () {
      // test passed
    });

    it('features/components/form-controls/model-select-control/component.js', function () {
      // test passed
    });

    it('features/components/form-controls/model-select-or-create-control/component.js', function () {
      // test passed
    });

    it('features/components/form-controls/native-model-select-control/component.js', function () {
      // test passed
    });

    it('features/components/form-controls/phone-number-control/component.js', function () {
      // test passed
    });

    it('features/components/form-controls/price-range-control/component.js', function () {
      // test passed
    });

    it('features/components/form-controls/province-select-control/component.js', function () {
      // test passed
    });

    it('features/components/form-controls/radio-group-control/component.js', function () {
      // test passed
    });

    it('features/components/form-controls/radio-group-control/radio-button-control/component.js', function () {
      // test passed
    });

    it('features/components/form-controls/range-control/component.js', function () {
      // test passed
    });

    it('features/components/form-controls/restaurant-select-control/component.js', function () {
      // test passed
    });

    it('features/components/form-controls/restaurant-select-control/restaurant-item/component.js', function () {
      // test passed
    });

    it('features/components/form-controls/restaurant-select-control/results-histogram/component.js', function () {
      // test passed
    });

    it('features/components/form-controls/searchable-input-control/component.js', function () {
      // test passed
    });

    it('features/components/form-controls/textarea-control/component.js', function () {
      // test passed
    });

    it('features/components/form-controls/time-range-select-control/component.js', function () {
      // test passed
    });

    it('features/components/form-controls/time-select-control/component.js', function () {
      // test passed
    });

    it('features/components/form-controls/toggle-button-control/component.js', function () {
      // test passed
    });

    it('features/components/form-controls/value-select-control/component.js', function () {
      // test passed
    });

    it('features/components/giftbit/gift-card/component.js', function () {
      // test passed
    });

    it('features/components/giftbit/gift-cards/component.js', function () {
      // test passed
    });

    it('features/components/invoicing/discount-list/component.js', function () {
      // test passed
    });

    it('features/components/layouts/split-view/component.js', function () {
      // test passed
    });

    it('features/components/layouts/split-view/divider-view/component.js', function () {
      // test passed
    });

    it('features/components/layouts/split-view/view-pane/component.js', function () {
      // test passed
    });

    it('features/components/meal-planning/action-reservation-state-button/component.js', function () {
      // test passed
    });

    it('features/components/misc/back-to-masterfox/component.js', function () {
      // test passed
    });

    it('features/components/restaurants/ranking-card/component.js', function () {
      // test passed
    });

    it('features/components/sf/accounting/driver-payments-modal/component.js', function () {
      // test passed
    });

    it('features/components/sf/activity-feed/component.js', function () {
      // test passed
    });

    it('features/components/sf/activity-feed/feed-event/component.js', function () {
      // test passed
    });

    it('features/components/sf/actual-segment/component.js', function () {
      // test passed
    });

    it('features/components/sf/amount-and-number-of-people/component.js', function () {
      // test passed
    });

    it('features/components/sf/basic-modal/component.js', function () {
      // test passed
    });

    it('features/components/sf/callout-pane/component.js', function () {
      // test passed
    });

    it('features/components/sf/client-status/component.js', function () {
      // test passed
    });

    it('features/components/sf/collapsible-segment/component.js', function () {
      // test passed
    });

    it('features/components/sf/component-example/attributes-table/attribute-row/component.js', function () {
      // test passed
    });

    it('features/components/sf/component-example/attributes-table/component.js', function () {
      // test passed
    });

    it('features/components/sf/component-example/component.js', function () {
      // test passed
    });

    it('features/components/sf/component-example/example-code/component-code/component.js', function () {
      // test passed
    });

    it('features/components/sf/component-example/example-code/component.js', function () {
      // test passed
    });

    it('features/components/sf/component-example/example-code/example-code-usage/component.js', function () {
      // test passed
    });

    it('features/components/sf/contact-view/component.js', function () {
      // test passed
    });

    it('features/components/sf/context-menu/component.js', function () {
      // test passed
    });

    it('features/components/sf/context-menu/menu-item/component.js', function () {
      // test passed
    });

    it('features/components/sf/context-menu/menu-separator/component.js', function () {
      // test passed
    });

    it('features/components/sf/controls/action-bar/action-bar-nav/component.js', function () {
      // test passed
    });

    it('features/components/sf/controls/action-bar/component.js', function () {
      // test passed
    });

    it('features/components/sf/controls/action-button/action-option/component.js', function () {
      // test passed
    });

    it('features/components/sf/controls/action-button/component.js', function () {
      // test passed
    });

    it('features/components/sf/controls/action-order-state-button/component.js', function () {
      // test passed
    });

    it('features/components/sf/controls/amount-select/component.js', function () {
      // test passed
    });

    it('features/components/sf/controls/commit-buttons/component.js', function () {
      // test passed
    });

    it('features/components/sf/controls/country-select/component.js', function () {
      // test passed
    });

    it('features/components/sf/controls/credit-card/component.js', function () {
      // test passed
    });

    it('features/components/sf/controls/date-buttons/component.js', function () {
      // test passed
    });

    it('features/components/sf/controls/date-buttons/date-button/component.js', function () {
      // test passed
    });

    it('features/components/sf/controls/date-select/component.js', function () {
      // test passed
    });

    it('features/components/sf/controls/dietary-tags-select/component.js', function () {
      // test passed
    });

    it('features/components/sf/controls/filepicker-control/component.js', function () {
      // test passed
    });

    it('features/components/sf/controls/input-control/component.js', function () {
      // test passed
    });

    it('features/components/sf/controls/map-control/component.js', function () {
      // test passed
    });

    it('features/components/sf/controls/modal-control/component.js', function () {
      // test passed
    });

    it('features/components/sf/controls/model-select/component.js', function () {
      // test passed
    });

    it('features/components/sf/controls/next-prev-buttons/component.js', function () {
      // test passed
    });

    it('features/components/sf/controls/paginated-search-control/component.js', function () {
      // test passed
    });

    it('features/components/sf/controls/pagination-control/component.js', function () {
      // test passed
    });

    it('features/components/sf/controls/paginator-lite/component.js', function () {
      // test passed
    });

    it('features/components/sf/controls/presence-indicator/component.js', function () {
      // test passed
    });

    it('features/components/sf/controls/price-range/component.js', function () {
      // test passed
    });

    it('features/components/sf/controls/profile-picture/component.js', function () {
      // test passed
    });

    it('features/components/sf/controls/province-select/component.js', function () {
      // test passed
    });

    it('features/components/sf/controls/range-select/component.js', function () {
      // test passed
    });

    it('features/components/sf/controls/textarea-control/component.js', function () {
      // test passed
    });

    it('features/components/sf/controls/time-range-select/component.js', function () {
      // test passed
    });

    it('features/components/sf/controls/time-select/component.js', function () {
      // test passed
    });

    it('features/components/sf/controls/toggle-button/component.js', function () {
      // test passed
    });

    it('features/components/sf/couriers/courier-row/component.js', function () {
      // test passed
    });

    it('features/components/sf/dietary-tag/component.js', function () {
      // test passed
    });

    it('features/components/sf/drawer-pane/component.js', function () {
      // test passed
    });

    it('features/components/sf/drawer-pane/drawer-button/component.js', function () {
      // test passed
    });

    it('features/components/sf/drawer-pane/drawer-component/component.js', function () {
      // test passed
    });

    it('features/components/sf/drawer-pane/drawer-header/component.js', function () {
      // test passed
    });

    it('features/components/sf/drawers/menu-filter/component.js', function () {
      // test passed
    });

    it('features/components/sf/empty-wrapper/component.js', function () {
      // test passed
    });

    it('features/components/sf/fields/amount-field/component.js', function () {
      // test passed
    });

    it('features/components/sf/fields/basic-field/component.js', function () {
      // test passed
    });

    it('features/components/sf/fields/color-field/component.js', function () {
      // test passed
    });

    it('features/components/sf/fields/cover-image-field/component.js', function () {
      // test passed
    });

    it('features/components/sf/fields/credit-card-field/component.js', function () {
      // test passed
    });

    it('features/components/sf/fields/date-field/component.js', function () {
      // test passed
    });

    it('features/components/sf/fields/date-range-field/component.js', function () {
      // test passed
    });

    it('features/components/sf/fields/dietary-tags-field/component.js', function () {
      // test passed
    });

    it('features/components/sf/fields/field-helpers.js', function () {
      // test passed
    });

    it('features/components/sf/fields/field-mixin.js', function () {
      // test passed
    });

    it('features/components/sf/fields/geo-json-field/component.js', function () {
      // test passed
    });

    it('features/components/sf/fields/image-field/component.js', function () {
      // test passed
    });

    it('features/components/sf/fields/input-field/component.js', function () {
      // test passed
    });

    it('features/components/sf/fields/model-select-field/component.js', function () {
      // test passed
    });

    it('features/components/sf/fields/model-select-or-create-field/component.js', function () {
      // test passed
    });

    it('features/components/sf/fields/price-range-field/component.js', function () {
      // test passed
    });

    it('features/components/sf/fields/radio-group-field/component.js', function () {
      // test passed
    });

    it('features/components/sf/fields/radio-group-field/radio-button/component.js', function () {
      // test passed
    });

    it('features/components/sf/fields/range-field/component.js', function () {
      // test passed
    });

    it('features/components/sf/fields/textarea-field/component.js', function () {
      // test passed
    });

    it('features/components/sf/fields/time-field/component.js', function () {
      // test passed
    });

    it('features/components/sf/fields/time-range-field/component.js', function () {
      // test passed
    });

    it('features/components/sf/fields/toggle-button/component.js', function () {
      // test passed
    });

    it('features/components/sf/fields/toggle-field/component.js', function () {
      // test passed
    });

    it('features/components/sf/fields/value-select-field/component.js', function () {
      // test passed
    });

    it('features/components/sf/filters/applied-filters/component.js', function () {
      // test passed
    });

    it('features/components/sf/filters/controls/date-range-selector/component.js', function () {
      // test passed
    });

    it('features/components/sf/filters/controls/date-selector/component.js', function () {
      // test passed
    });

    it('features/components/sf/filters/controls/input-control/component.js', function () {
      // test passed
    });

    it('features/components/sf/filters/controls/model-search/component.js', function () {
      // test passed
    });

    it('features/components/sf/filters/controls/model-select/component.js', function () {
      // test passed
    });

    it('features/components/sf/filters/controls/should-be/component.js', function () {
      // test passed
    });

    it('features/components/sf/filters/filter-bar/component.js', function () {
      // test passed
    });

    it('features/components/sf/filters/filter-bar/control-wrapper/component.js', function () {
      // test passed
    });

    it('features/components/sf/filters/filter-select/component.js', function () {
      // test passed
    });

    it('features/components/sf/filters/filter-toggle/component.js', function () {
      // test passed
    });

    it('features/components/sf/form-for/component.js', function () {
      // test passed
    });

    it('features/components/sf/form-for/inline-helper/component.js', function () {
      // test passed
    });

    it('features/components/sf/forms/contact-form-for/component.js', function () {
      // test passed
    });

    it('features/components/sf/forms/credit-card-form-for/component.js', function () {
      // test passed
    });

    it('features/components/sf/forms/discount-form-for/component.js', function () {
      // test passed
    });

    it('features/components/sf/forms/driver-form-for/component.js', function () {
      // test passed
    });

    it('features/components/sf/forms/invite-team-users-form-for/component.js', function () {
      // test passed
    });

    it('features/components/sf/forms/invoicing-ledger-form-for/component.js', function () {
      // test passed
    });

    it('features/components/sf/forms/location-form-for/component.js', function () {
      // test passed
    });

    it('features/components/sf/forms/meal-plan/custom-field-form-for/component.js', function () {
      // test passed
    });

    it('features/components/sf/forms/meal-plan/custom-fields/component.js', function () {
      // test passed
    });

    it('features/components/sf/forms/meal-planning-form-for/component.js', function () {
      // test passed
    });

    it('features/components/sf/forms/meal-planning-form-for/day-form-for/component.js', function () {
      // test passed
    });

    it('features/components/sf/forms/meal-planning-form-for/meal-form-for/component.js', function () {
      // test passed
    });

    it('features/components/sf/forms/meal-planning-form-for/radar-chart/component.js', function () {
      // test passed
    });

    it('features/components/sf/forms/meal-planning-form-for/restaurant-constraints-form-for/component.js', function () {
      // test passed
    });

    it('features/components/sf/forms/meal-planning-form-for/slot-form-for/component.js', function () {
      // test passed
    });

    it('features/components/sf/forms/meal-planning-form-for/solver-settings-form-for/component.js', function () {
      // test passed
    });

    it('features/components/sf/forms/meal-planning-form-for/template-form-for/component.js', function () {
      // test passed
    });

    it('features/components/sf/forms/new-client-team-form-for/component.js', function () {
      // test passed
    });

    it('features/components/sf/forms/new-client-user-form-for/component.js', function () {
      // test passed
    });

    it('features/components/sf/forms/new-restaurant-user-form-for/component.js', function () {
      // test passed
    });

    it('features/components/sf/forms/new-team-user-form-for/component.js', function () {
      // test passed
    });

    it('features/components/sf/forms/order-form-for/component.js', function () {
      // test passed
    });

    it('features/components/sf/forms/preference-profile-form-for/component.js', function () {
      // test passed
    });

    it('features/components/sf/forms/requirement-form-for/component.js', function () {
      // test passed
    });

    it('features/components/sf/forms/requirement-form-for/constraints-form-for/component.js', function () {
      // test passed
    });

    it('features/components/sf/forms/requirement-form-for/value-field/component.js', function () {
      // test passed
    });

    it('features/components/sf/forms/requirement-group-form-for/component.js', function () {
      // test passed
    });

    it('features/components/sf/forms/reservation-form-for/component.js', function () {
      // test passed
    });

    it('features/components/sf/forms/reservation-form-for/info-pane/component.js', function () {
      // test passed
    });

    it('features/components/sf/forms/team-user-form-for/component.js', function () {
      // test passed
    });

    it('features/components/sf/forms/xero-contact-form-for/component.js', function () {
      // test passed
    });

    it('features/components/sf/headers/icon-header/component.js', function () {
      // test passed
    });

    it('features/components/sf/hover-callout/callout-container/component.js', function () {
      // test passed
    });

    it('features/components/sf/hover-callout/component.js', function () {
      // test passed
    });

    it('features/components/sf/info-callout/component.js', function () {
      // test passed
    });

    it('features/components/sf/late-score/component.js', function () {
      // test passed
    });

    it('features/components/sf/listed-order/component.js', function () {
      // test passed
    });

    it('features/components/sf/lists/checkbox-list-for/checkbox-list-item/component.js', function () {
      // test passed
    });

    it('features/components/sf/lists/checkbox-list-for/component.js', function () {
      // test passed
    });

    it('features/components/sf/lists/pill-list/component.js', function () {
      // test passed
    });

    it('features/components/sf/lists/section-list/component.js', function () {
      // test passed
    });

    it('features/components/sf/lists/sortable-list/component.js', function () {
      // test passed
    });

    it('features/components/sf/lists/sortable-list/list-item/component.js', function () {
      // test passed
    });

    it('features/components/sf/logistics/availability-day/component.js', function () {
      // test passed
    });

    it('features/components/sf/logistics/delivery-estimate/component.js', function () {
      // test passed
    });

    it('features/components/sf/logistics/desk-case/component.js', function () {
      // test passed
    });

    it('features/components/sf/logistics/expanded-row/component.js', function () {
      // test passed
    });

    it('features/components/sf/logistics/late-notification/component.js', function () {
      // test passed
    });

    it('features/components/sf/logistics/manual-form/component.js', function () {
      // test passed
    });

    it('features/components/sf/logistics/monitoring-notes/component.js', function () {
      // test passed
    });

    it('features/components/sf/logistics/order-row/component.js', function () {
      // test passed
    });

    it('features/components/sf/logistics/pickup-delivery-time-table-cell/component.js', function () {
      // test passed
    });

    it('features/components/sf/logistics/pickup-time-select/component.js', function () {
      // test passed
    });

    it('features/components/sf/logistics/stats-display/component.js', function () {
      // test passed
    });

    it('features/components/sf/logistics/table-head/component.js', function () {
      // test passed
    });

    it('features/components/sf/menus/fields/menu-item-description-field/component.js', function () {
      // test passed
    });

    it('features/components/sf/menus/menu-form/component.js', function () {
      // test passed
    });

    it('features/components/sf/menus/menu-form/menu-group/component.js', function () {
      // test passed
    });

    it('features/components/sf/menus/menu-form/menu-item/component.js', function () {
      // test passed
    });

    it('features/components/sf/menus/menu-form/menu-option-group/component.js', function () {
      // test passed
    });

    it('features/components/sf/modals/review-email/component.js', function () {
      // test passed
    });

    it('features/components/sf/modals/weekly-reservation-email/component.js', function () {
      // test passed
    });

    it('features/components/sf/orders/email-messages/component.js', function () {
      // test passed
    });

    it('features/components/sf/orders/email-messages/email-message/component.js', function () {
      // test passed
    });

    it('features/components/sf/orders/email-messages/messages-wrapper/component.js', function () {
      // test passed
    });

    it('features/components/sf/orders/fast-forward-modal/component.js', function () {
      // test passed
    });

    it('features/components/sf/orders/fast-forward-widget/component.js', function () {
      // test passed
    });

    it('features/components/sf/orders/invoices/client-and-restaurant-invoices/component.js', function () {
      // test passed
    });

    it('features/components/sf/orders/invoices/display-invoice/component.js', function () {
      // test passed
    });

    it('features/components/sf/orders/invoices/header-row/component.js', function () {
      // test passed
    });

    it('features/components/sf/orders/invoices/line-item-row/component.js', function () {
      // test passed
    });

    it('features/components/sf/orders/invoices/order-item-option-row/component.js', function () {
      // test passed
    });

    it('features/components/sf/orders/invoices/tax-row/component.js', function () {
      // test passed
    });

    it('features/components/sf/orders/location-helper.js', function () {
      // test passed
    });

    it('features/components/sf/orders/order-cart/component.js', function () {
      // test passed
    });

    it('features/components/sf/orders/order-cart/custom-item-modal/component.js', function () {
      // test passed
    });

    it('features/components/sf/orders/order-cart/order-item/component.js', function () {
      // test passed
    });

    it('features/components/sf/orders/order-cart/order-member/component.js', function () {
      // test passed
    });

    it('features/components/sf/orders/order-details/component.js', function () {
      // test passed
    });

    it('features/components/sf/orders/order-menu-group-item/component.js', function () {
      // test passed
    });

    it('features/components/sf/orders/order-menu/component.js', function () {
      // test passed
    });

    it('features/components/sf/orders/order-notes/component.js', function () {
      // test passed
    });

    it('features/components/sf/orders/order-state-display/component.js', function () {
      // test passed
    });

    it('features/components/sf/orders/order-teams/component.js', function () {
      // test passed
    });

    it('features/components/sf/orders/order-teams/joined-user/component.js', function () {
      // test passed
    });

    it('features/components/sf/orders/order-teams/joined-users/component.js', function () {
      // test passed
    });

    it('features/components/sf/orders/order-teams/team-member/component.js', function () {
      // test passed
    });

    it('features/components/sf/orders/order-teams/team/component.js', function () {
      // test passed
    });

    it('features/components/sf/orders/order-teams/topbar/component.js', function () {
      // test passed
    });

    it('features/components/sf/orders/quote-builder/component.js', function () {
      // test passed
    });

    it('features/components/sf/orders/restaurant-details/component.js', function () {
      // test passed
    });

    it('features/components/sf/orders/restaurant-details/restaurant-poll/component.js', function () {
      // test passed
    });

    it('features/components/sf/orders/restaurant-details/service-times-and-closures/component.js', function () {
      // test passed
    });

    it('features/components/sf/orders/restaurant-details/service-times/component.js', function () {
      // test passed
    });

    it('features/components/sf/orders/team-order-details/component.js', function () {
      // test passed
    });

    it('features/components/sf/orders/type-icons/component.js', function () {
      // test passed
    });

    it('features/components/sf/quick-search/actions/clients-pane/component.js', function () {
      // test passed
    });

    it('features/components/sf/quick-search/actions/default-pane/component.js', function () {
      // test passed
    });

    it('features/components/sf/quick-search/actions/orders-pane/component.js', function () {
      // test passed
    });

    it('features/components/sf/quick-search/actions/restaurants-pane/component.js', function () {
      // test passed
    });

    it('features/components/sf/quick-search/actions/users-pane/component.js', function () {
      // test passed
    });

    it('features/components/sf/quick-search/component.js', function () {
      // test passed
    });

    it('features/components/sf/quick-search/items/clients-item/component.js', function () {
      // test passed
    });

    it('features/components/sf/quick-search/items/default-item/component.js', function () {
      // test passed
    });

    it('features/components/sf/quick-search/items/orders-item/component.js', function () {
      // test passed
    });

    it('features/components/sf/quick-search/items/restaurants-item/component.js', function () {
      // test passed
    });

    it('features/components/sf/quick-search/items/users-item/component.js', function () {
      // test passed
    });

    it('features/components/sf/repeat-n-times/component.js', function () {
      // test passed
    });

    it('features/components/sf/service-fee-warning/component.js', function () {
      // test passed
    });

    it('features/components/sf/service-times/service-times-day/component.js', function () {
      // test passed
    });

    it('features/components/sf/simple-button/component.js', function () {
      // test passed
    });

    it('features/components/sf/tab-nav/component.js', function () {
      // test passed
    });

    it('features/components/sf/tab-nav/tab-item/component.js', function () {
      // test passed
    });

    it('features/components/sf/tab-nav/tab-menu/component.js', function () {
      // test passed
    });

    it('features/components/sf/tab-nav/tab-view/component.js', function () {
      // test passed
    });

    it('features/components/sf/tab-view/component.js', function () {
      // test passed
    });

    it('features/components/sf/tab-view/tab-group/component.js', function () {
      // test passed
    });

    it('features/components/sf/tab-view/tab-group/tab/component.js', function () {
      // test passed
    });

    it('features/components/sf/tab-view/tab-pane/component.js', function () {
      // test passed
    });

    it('features/components/sf/tables/client-admins/component.js', function () {
      // test passed
    });

    it('features/components/sf/tables/client-index/component.js', function () {
      // test passed
    });

    it('features/components/sf/tables/client-invites/component.js', function () {
      // test passed
    });

    it('features/components/sf/tables/client-teams/component.js', function () {
      // test passed
    });

    it('features/components/sf/tables/ordered-table/component.js', function () {
      // test passed
    });

    it('features/components/sf/tables/ordered-table/pagination-footer/component.js', function () {
      // test passed
    });

    it('features/components/sf/tables/ordered-table/section-row/component.js', function () {
      // test passed
    });

    it('features/components/sf/tables/ordered-table/table-body/component.js', function () {
      // test passed
    });

    it('features/components/sf/tables/ordered-table/table-cell/component.js', function () {
      // test passed
    });

    it('features/components/sf/tables/ordered-table/table-footer/component.js', function () {
      // test passed
    });

    it('features/components/sf/tables/ordered-table/table-header/component.js', function () {
      // test passed
    });

    it('features/components/sf/tables/ordered-table/table-header/table-header-action-menu/component.js', function () {
      // test passed
    });

    it('features/components/sf/tables/ordered-table/table-header/table-header-cell/component.js', function () {
      // test passed
    });

    it('features/components/sf/tables/ordered-table/table-manager.js', function () {
      // test passed
    });

    it('features/components/sf/tables/ordered-table/table-rows/component.js', function () {
      // test passed
    });

    it('features/components/sf/tables/ordered-table/table-rows/expandable-row/component.js', function () {
      // test passed
    });

    it('features/components/sf/tables/ordered-table/table-rows/row-content/component.js', function () {
      // test passed
    });

    it('features/components/sf/tables/ordered-table/table-rows/row-form-switcher/component.js', function () {
      // test passed
    });

    it('features/components/sf/tables/ordered-table/table-rows/row-form-switcher/tr/component.js', function () {
      // test passed
    });

    it('features/components/sf/tables/ordered-table/table-rows/save-cell/component.js', function () {
      // test passed
    });

    it('features/components/sf/tables/ordered-table/table-rows/select-cell/component.js', function () {
      // test passed
    });

    it('features/components/sf/tables/ordered-table/table-sections/component.js', function () {
      // test passed
    });

    it('features/components/sf/tables/organization-locations/component.js', function () {
      // test passed
    });

    it('features/components/sf/tables/payment-cards/component.js', function () {
      // test passed
    });

    it('features/components/sf/tables/reorderable-table/component.js', function () {
      // test passed
    });

    it('features/components/sf/tables/reorderable-table/form-container/component.js', function () {
      // test passed
    });

    it('features/components/sf/tables/reorderable-table/table-body/component.js', function () {
      // test passed
    });

    it('features/components/sf/tables/reorderable-table/table-component/component.js', function () {
      // test passed
    });

    it('features/components/sf/tables/reorderable-table/table-header/component.js', function () {
      // test passed
    });

    it('features/components/sf/tables/restaurant-admins/component.js', function () {
      // test passed
    });

    it('features/components/sf/tables/restaurant-index/component.js', function () {
      // test passed
    });

    it('features/components/sf/tables/tax-rates/component.js', function () {
      // test passed
    });

    it('features/components/sf/tables/versions-table/component.js', function () {
      // test passed
    });

    it('features/components/sf/time-select-tz/component.js', function () {
      // test passed
    });

    it('features/components/sf/views/feature-view/component.js', function () {
      // test passed
    });

    it('features/components/sf/views/full-height-scroll-view/component.js', function () {
      // test passed
    });

    it('features/components/sf/views/message-view/component.js', function () {
      // test passed
    });

    it('features/components/sf/views/navigation-view/component.js', function () {
      // test passed
    });

    it('features/components/sf/views/navigation-view/navigation-bar/component.js', function () {
      // test passed
    });

    it('features/components/sf/views/navigation-view/navigation-item/component.js', function () {
      // test passed
    });

    it('features/components/sf/views/navigation-view/sizes.js', function () {
      // test passed
    });

    it('features/forgot-password/controller.js', function () {
      // test passed
    });

    it('features/forgot-password/route.js', function () {
      // test passed
    });

    it('features/logged-in/accounting/controller.js', function () {
      // test passed
    });

    it('features/logged-in/accounting/route.js', function () {
      // test passed
    });

    it('features/logged-in/admins/app-configurations/controller.js', function () {
      // test passed
    });

    it('features/logged-in/admins/app-configurations/route.js', function () {
      // test passed
    });

    it('features/logged-in/admins/app-configurations/show/controller.js', function () {
      // test passed
    });

    it('features/logged-in/admins/app-configurations/show/route.js', function () {
      // test passed
    });

    it('features/logged-in/admins/capabilities/controller.js', function () {
      // test passed
    });

    it('features/logged-in/admins/capabilities/route.js', function () {
      // test passed
    });

    it('features/logged-in/admins/companies/controller.js', function () {
      // test passed
    });

    it('features/logged-in/admins/companies/index/controller.js', function () {
      // test passed
    });

    it('features/logged-in/admins/companies/index/route.js', function () {
      // test passed
    });

    it('features/logged-in/admins/companies/route.js', function () {
      // test passed
    });

    it('features/logged-in/admins/companies/show/controller.js', function () {
      // test passed
    });

    it('features/logged-in/admins/companies/show/route.js', function () {
      // test passed
    });

    it('features/logged-in/admins/controller.js', function () {
      // test passed
    });

    it('features/logged-in/admins/giftbit-errors/controller.js', function () {
      // test passed
    });

    it('features/logged-in/admins/giftbit-errors/index/controller.js', function () {
      // test passed
    });

    it('features/logged-in/admins/giftbit-errors/index/route.js', function () {
      // test passed
    });

    it('features/logged-in/admins/giftbit-errors/route.js', function () {
      // test passed
    });

    it('features/logged-in/admins/giftbit-errors/show/controller.js', function () {
      // test passed
    });

    it('features/logged-in/admins/giftbit-errors/show/route.js', function () {
      // test passed
    });

    it('features/logged-in/admins/giftbit/controller.js', function () {
      // test passed
    });

    it('features/logged-in/admins/giftbit/route.js', function () {
      // test passed
    });

    it('features/logged-in/admins/route.js', function () {
      // test passed
    });

    it('features/logged-in/admins/salesforce/controller.js', function () {
      // test passed
    });

    it('features/logged-in/admins/salesforce/index/controller.js', function () {
      // test passed
    });

    it('features/logged-in/admins/salesforce/index/route.js', function () {
      // test passed
    });

    it('features/logged-in/admins/salesforce/route.js', function () {
      // test passed
    });

    it('features/logged-in/admins/salesforce/show/controller.js', function () {
      // test passed
    });

    it('features/logged-in/admins/salesforce/show/route.js', function () {
      // test passed
    });

    it('features/logged-in/admins/tax-rates/controller.js', function () {
      // test passed
    });

    it('features/logged-in/admins/tax-rates/new/controller.js', function () {
      // test passed
    });

    it('features/logged-in/admins/tax-rates/new/route.js', function () {
      // test passed
    });

    it('features/logged-in/admins/tax-rates/route.js', function () {
      // test passed
    });

    it('features/logged-in/areas/controller.js', function () {
      // test passed
    });

    it('features/logged-in/areas/edit/controller.js', function () {
      // test passed
    });

    it('features/logged-in/areas/edit/details/controller.js', function () {
      // test passed
    });

    it('features/logged-in/areas/edit/details/route.js', function () {
      // test passed
    });

    it('features/logged-in/areas/edit/feed/controller.js', function () {
      // test passed
    });

    it('features/logged-in/areas/edit/feed/route.js', function () {
      // test passed
    });

    it('features/logged-in/areas/edit/index/controller.js', function () {
      // test passed
    });

    it('features/logged-in/areas/edit/index/new/controller.js', function () {
      // test passed
    });

    it('features/logged-in/areas/edit/index/new/route.js', function () {
      // test passed
    });

    it('features/logged-in/areas/edit/index/route.js', function () {
      // test passed
    });

    it('features/logged-in/areas/edit/route.js', function () {
      // test passed
    });

    it('features/logged-in/areas/index/controller.js', function () {
      // test passed
    });

    it('features/logged-in/areas/index/route.js', function () {
      // test passed
    });

    it('features/logged-in/areas/new/controller.js', function () {
      // test passed
    });

    it('features/logged-in/areas/new/route.js', function () {
      // test passed
    });

    it('features/logged-in/areas/route.js', function () {
      // test passed
    });

    it('features/logged-in/availability/controller.js', function () {
      // test passed
    });

    it('features/logged-in/availability/route.js', function () {
      // test passed
    });

    it('features/logged-in/bookmarks/controller.js', function () {
      // test passed
    });

    it('features/logged-in/bookmarks/edit/controller.js', function () {
      // test passed
    });

    it('features/logged-in/bookmarks/edit/route.js', function () {
      // test passed
    });

    it('features/logged-in/bookmarks/index/controller.js', function () {
      // test passed
    });

    it('features/logged-in/bookmarks/index/route.js', function () {
      // test passed
    });

    it('features/logged-in/bookmarks/route.js', function () {
      // test passed
    });

    it('features/logged-in/bulk-orders/controller.js', function () {
      // test passed
    });

    it('features/logged-in/bulk-orders/route.js', function () {
      // test passed
    });

    it('features/logged-in/clients/controller.js', function () {
      // test passed
    });

    it('features/logged-in/clients/edit/accounting/controller.js', function () {
      // test passed
    });

    it('features/logged-in/clients/edit/accounting/route.js', function () {
      // test passed
    });

    it('features/logged-in/clients/edit/controller.js', function () {
      // test passed
    });

    it('features/logged-in/clients/edit/feed/controller.js', function () {
      // test passed
    });

    it('features/logged-in/clients/edit/feed/route.js', function () {
      // test passed
    });

    it('features/logged-in/clients/edit/giftbit/controller.js', function () {
      // test passed
    });

    it('features/logged-in/clients/edit/giftbit/route.js', function () {
      // test passed
    });

    it('features/logged-in/clients/edit/import-orders/controller.js', function () {
      // test passed
    });

    it('features/logged-in/clients/edit/import-orders/route.js', function () {
      // test passed
    });

    it('features/logged-in/clients/edit/index/controller.js', function () {
      // test passed
    });

    it('features/logged-in/clients/edit/index/route.js', function () {
      // test passed
    });

    it('features/logged-in/clients/edit/internal/controller.js', function () {
      // test passed
    });

    it('features/logged-in/clients/edit/internal/route.js', function () {
      // test passed
    });

    it('features/logged-in/clients/edit/meal-plan/controller.js', function () {
      // test passed
    });

    it('features/logged-in/clients/edit/meal-plan/route.js', function () {
      // test passed
    });

    it('features/logged-in/clients/edit/meal-planning-instance/controller.js', function () {
      // test passed
    });

    it('features/logged-in/clients/edit/meal-planning-instance/index/controller.js', function () {
      // test passed
    });

    it('features/logged-in/clients/edit/meal-planning-instance/index/route.js', function () {
      // test passed
    });

    it('features/logged-in/clients/edit/meal-planning-instance/route.js', function () {
      // test passed
    });

    it('features/logged-in/clients/edit/meal-planning-instance/show/controller.js', function () {
      // test passed
    });

    it('features/logged-in/clients/edit/meal-planning-instance/show/route.js', function () {
      // test passed
    });

    it('features/logged-in/clients/edit/meal-planning-preference-profile/controller.js', function () {
      // test passed
    });

    it('features/logged-in/clients/edit/meal-planning-preference-profile/route.js', function () {
      // test passed
    });

    it('features/logged-in/clients/edit/meal-planning-reservation/controller.js', function () {
      // test passed
    });

    it('features/logged-in/clients/edit/meal-planning-reservation/route.js', function () {
      // test passed
    });

    it('features/logged-in/clients/edit/meal-planning-template/controller.js', function () {
      // test passed
    });

    it('features/logged-in/clients/edit/meal-planning-template/route.js', function () {
      // test passed
    });

    it('features/logged-in/clients/edit/orders/controller.js', function () {
      // test passed
    });

    it('features/logged-in/clients/edit/orders/route.js', function () {
      // test passed
    });

    it('features/logged-in/clients/edit/route.js', function () {
      // test passed
    });

    it('features/logged-in/clients/edit/users/controller.js', function () {
      // test passed
    });

    it('features/logged-in/clients/edit/users/route.js', function () {
      // test passed
    });

    it('features/logged-in/clients/index/controller.js', function () {
      // test passed
    });

    it('features/logged-in/clients/index/route.js', function () {
      // test passed
    });

    it('features/logged-in/clients/route.js', function () {
      // test passed
    });

    it('features/logged-in/controller.js', function () {
      // test passed
    });

    it('features/logged-in/dev-team/components/controller.js', function () {
      // test passed
    });

    it('features/logged-in/dev-team/components/controls/controller.js', function () {
      // test passed
    });

    it('features/logged-in/dev-team/components/controls/route.js', function () {
      // test passed
    });

    it('features/logged-in/dev-team/components/fields/controller.js', function () {
      // test passed
    });

    it('features/logged-in/dev-team/components/fields/route.js', function () {
      // test passed
    });

    it('features/logged-in/dev-team/components/filters/controller.js', function () {
      // test passed
    });

    it('features/logged-in/dev-team/components/filters/route.js', function () {
      // test passed
    });

    it('features/logged-in/dev-team/components/form-for/controller.js', function () {
      // test passed
    });

    it('features/logged-in/dev-team/components/form-for/route.js', function () {
      // test passed
    });

    it('features/logged-in/dev-team/components/forms/controller.js', function () {
      // test passed
    });

    it('features/logged-in/dev-team/components/forms/route.js', function () {
      // test passed
    });

    it('features/logged-in/dev-team/components/index/controller.js', function () {
      // test passed
    });

    it('features/logged-in/dev-team/components/index/route.js', function () {
      // test passed
    });

    it('features/logged-in/dev-team/components/layouts/controller.js', function () {
      // test passed
    });

    it('features/logged-in/dev-team/components/layouts/route.js', function () {
      // test passed
    });

    it('features/logged-in/dev-team/components/lists/controller.js', function () {
      // test passed
    });

    it('features/logged-in/dev-team/components/lists/route.js', function () {
      // test passed
    });

    it('features/logged-in/dev-team/components/logistics/controller.js', function () {
      // test passed
    });

    it('features/logged-in/dev-team/components/logistics/route.js', function () {
      // test passed
    });

    it('features/logged-in/dev-team/components/menus/controller.js', function () {
      // test passed
    });

    it('features/logged-in/dev-team/components/menus/route.js', function () {
      // test passed
    });

    it('features/logged-in/dev-team/components/misc/controller.js', function () {
      // test passed
    });

    it('features/logged-in/dev-team/components/misc/route.js', function () {
      // test passed
    });

    it('features/logged-in/dev-team/components/orders/controller.js', function () {
      // test passed
    });

    it('features/logged-in/dev-team/components/orders/route.js', function () {
      // test passed
    });

    it('features/logged-in/dev-team/components/route.js', function () {
      // test passed
    });

    it('features/logged-in/dev-team/components/tables/controller.js', function () {
      // test passed
    });

    it('features/logged-in/dev-team/components/tables/route.js', function () {
      // test passed
    });

    it('features/logged-in/dev-team/controller.js', function () {
      // test passed
    });

    it('features/logged-in/dev-team/fleet-fox-settings/controller.js', function () {
      // test passed
    });

    it('features/logged-in/dev-team/fleet-fox-settings/route.js', function () {
      // test passed
    });

    it('features/logged-in/dev-team/index/controller.js', function () {
      // test passed
    });

    it('features/logged-in/dev-team/index/route.js', function () {
      // test passed
    });

    it('features/logged-in/dev-team/order-locks/controller.js', function () {
      // test passed
    });

    it('features/logged-in/dev-team/order-locks/route.js', function () {
      // test passed
    });

    it('features/logged-in/dev-team/route.js', function () {
      // test passed
    });

    it('features/logged-in/index/controller.js', function () {
      // test passed
    });

    it('features/logged-in/index/route.js', function () {
      // test passed
    });

    it('features/logged-in/logistics/archive/controller.js', function () {
      // test passed
    });

    it('features/logged-in/logistics/archive/route.js', function () {
      // test passed
    });

    it('features/logged-in/logistics/availability/controller.js', function () {
      // test passed
    });

    it('features/logged-in/logistics/availability/route.js', function () {
      // test passed
    });

    it('features/logged-in/logistics/controller.js', function () {
      // test passed
    });

    it('features/logged-in/logistics/couriers/controller.js', function () {
      // test passed
    });

    it('features/logged-in/logistics/couriers/index/controller.js', function () {
      // test passed
    });

    it('features/logged-in/logistics/couriers/index/route.js', function () {
      // test passed
    });

    it('features/logged-in/logistics/couriers/route.js', function () {
      // test passed
    });

    it('features/logged-in/logistics/couriers/show/controller.js', function () {
      // test passed
    });

    it('features/logged-in/logistics/couriers/show/route.js', function () {
      // test passed
    });

    it('features/logged-in/logistics/index/controller.js', function () {
      // test passed
    });

    it('features/logged-in/logistics/index/route.js', function () {
      // test passed
    });

    it('features/logged-in/logistics/live-view/controller.js', function () {
      // test passed
    });

    it('features/logged-in/logistics/live-view/route.js', function () {
      // test passed
    });

    it('features/logged-in/logistics/planning/controller.js', function () {
      // test passed
    });

    it('features/logged-in/logistics/planning/route.js', function () {
      // test passed
    });

    it('features/logged-in/logistics/route.js', function () {
      // test passed
    });

    it('features/logged-in/logistics/third-party-logistics/controller.js', function () {
      // test passed
    });

    it('features/logged-in/logistics/third-party-logistics/route.js', function () {
      // test passed
    });

    it('features/logged-in/new-order/controller.js', function () {
      // test passed
    });

    it('features/logged-in/new-order/route.js', function () {
      // test passed
    });

    it('features/logged-in/orders/controller.js', function () {
      // test passed
    });

    it('features/logged-in/orders/edit/accounting/controller.js', function () {
      // test passed
    });

    it('features/logged-in/orders/edit/accounting/route.js', function () {
      // test passed
    });

    it('features/logged-in/orders/edit/cart/controller.js', function () {
      // test passed
    });

    it('features/logged-in/orders/edit/cart/route.js', function () {
      // test passed
    });

    it('features/logged-in/orders/edit/controller.js', function () {
      // test passed
    });

    it('features/logged-in/orders/edit/dev/controller.js', function () {
      // test passed
    });

    it('features/logged-in/orders/edit/dev/route.js', function () {
      // test passed
    });

    it('features/logged-in/orders/edit/feed/controller.js', function () {
      // test passed
    });

    it('features/logged-in/orders/edit/feed/route.js', function () {
      // test passed
    });

    it('features/logged-in/orders/edit/index/controller.js', function () {
      // test passed
    });

    it('features/logged-in/orders/edit/index/route.js', function () {
      // test passed
    });

    it('features/logged-in/orders/edit/manage-teams/controller.js', function () {
      // test passed
    });

    it('features/logged-in/orders/edit/manage-teams/route.js', function () {
      // test passed
    });

    it('features/logged-in/orders/edit/route.js', function () {
      // test passed
    });

    it('features/logged-in/orders/route.js', function () {
      // test passed
    });

    it('features/logged-in/overrides/controller.js', function () {
      // test passed
    });

    it('features/logged-in/overrides/route.js', function () {
      // test passed
    });

    it('features/logged-in/planning/calendar/controller.js', function () {
      // test passed
    });

    it('features/logged-in/planning/calendar/route.js', function () {
      // test passed
    });

    it('features/logged-in/planning/controller.js', function () {
      // test passed
    });

    it('features/logged-in/planning/index/controller.js', function () {
      // test passed
    });

    it('features/logged-in/planning/index/edit-order/accounting/controller.js', function () {
      // test passed
    });

    it('features/logged-in/planning/index/edit-order/accounting/route.js', function () {
      // test passed
    });

    it('features/logged-in/planning/index/edit-order/cart/controller.js', function () {
      // test passed
    });

    it('features/logged-in/planning/index/edit-order/cart/route.js', function () {
      // test passed
    });

    it('features/logged-in/planning/index/edit-order/controller.js', function () {
      // test passed
    });

    it('features/logged-in/planning/index/edit-order/dev/controller.js', function () {
      // test passed
    });

    it('features/logged-in/planning/index/edit-order/dev/route.js', function () {
      // test passed
    });

    it('features/logged-in/planning/index/edit-order/feed/controller.js', function () {
      // test passed
    });

    it('features/logged-in/planning/index/edit-order/feed/route.js', function () {
      // test passed
    });

    it('features/logged-in/planning/index/edit-order/index/controller.js', function () {
      // test passed
    });

    it('features/logged-in/planning/index/edit-order/index/route.js', function () {
      // test passed
    });

    it('features/logged-in/planning/index/edit-order/manage-teams/controller.js', function () {
      // test passed
    });

    it('features/logged-in/planning/index/edit-order/manage-teams/route.js', function () {
      // test passed
    });

    it('features/logged-in/planning/index/edit-order/route.js', function () {
      // test passed
    });

    it('features/logged-in/planning/index/route.js', function () {
      // test passed
    });

    it('features/logged-in/planning/route.js', function () {
      // test passed
    });

    it('features/logged-in/profile/controller.js', function () {
      // test passed
    });

    it('features/logged-in/profile/route.js', function () {
      // test passed
    });

    it('features/logged-in/promo-codes/controller.js', function () {
      // test passed
    });

    it('features/logged-in/promo-codes/new/controller.js', function () {
      // test passed
    });

    it('features/logged-in/promo-codes/new/route.js', function () {
      // test passed
    });

    it('features/logged-in/promo-codes/route.js', function () {
      // test passed
    });

    it('features/logged-in/restaurant-users/controller.js', function () {
      // test passed
    });

    it('features/logged-in/restaurant-users/route.js', function () {
      // test passed
    });

    it('features/logged-in/restaurant-users/show/controller.js', function () {
      // test passed
    });

    it('features/logged-in/restaurant-users/show/index/controller.js', function () {
      // test passed
    });

    it('features/logged-in/restaurant-users/show/index/route.js', function () {
      // test passed
    });

    it('features/logged-in/restaurant-users/show/route.js', function () {
      // test passed
    });

    it('features/logged-in/restaurants/controller.js', function () {
      // test passed
    });

    it('features/logged-in/restaurants/index/controller.js', function () {
      // test passed
    });

    it('features/logged-in/restaurants/index/route.js', function () {
      // test passed
    });

    it('features/logged-in/restaurants/route.js', function () {
      // test passed
    });

    it('features/logged-in/restaurants/show/accounting/controller.js', function () {
      // test passed
    });

    it('features/logged-in/restaurants/show/accounting/route.js', function () {
      // test passed
    });

    it('features/logged-in/restaurants/show/capacities/controller.js', function () {
      // test passed
    });

    it('features/logged-in/restaurants/show/capacities/edit-order/accounting/controller.js', function () {
      // test passed
    });

    it('features/logged-in/restaurants/show/capacities/edit-order/accounting/route.js', function () {
      // test passed
    });

    it('features/logged-in/restaurants/show/capacities/edit-order/cart/controller.js', function () {
      // test passed
    });

    it('features/logged-in/restaurants/show/capacities/edit-order/cart/route.js', function () {
      // test passed
    });

    it('features/logged-in/restaurants/show/capacities/edit-order/controller.js', function () {
      // test passed
    });

    it('features/logged-in/restaurants/show/capacities/edit-order/dev/controller.js', function () {
      // test passed
    });

    it('features/logged-in/restaurants/show/capacities/edit-order/dev/route.js', function () {
      // test passed
    });

    it('features/logged-in/restaurants/show/capacities/edit-order/feed/controller.js', function () {
      // test passed
    });

    it('features/logged-in/restaurants/show/capacities/edit-order/feed/route.js', function () {
      // test passed
    });

    it('features/logged-in/restaurants/show/capacities/edit-order/index/controller.js', function () {
      // test passed
    });

    it('features/logged-in/restaurants/show/capacities/edit-order/index/route.js', function () {
      // test passed
    });

    it('features/logged-in/restaurants/show/capacities/edit-order/manage-teams/controller.js', function () {
      // test passed
    });

    it('features/logged-in/restaurants/show/capacities/edit-order/manage-teams/route.js', function () {
      // test passed
    });

    it('features/logged-in/restaurants/show/capacities/edit-order/route.js', function () {
      // test passed
    });

    it('features/logged-in/restaurants/show/capacities/route.js', function () {
      // test passed
    });

    it('features/logged-in/restaurants/show/checklist/controller.js', function () {
      // test passed
    });

    it('features/logged-in/restaurants/show/checklist/route.js', function () {
      // test passed
    });

    it('features/logged-in/restaurants/show/closures/controller.js', function () {
      // test passed
    });

    it('features/logged-in/restaurants/show/closures/route.js', function () {
      // test passed
    });

    it('features/logged-in/restaurants/show/controller.js', function () {
      // test passed
    });

    it('features/logged-in/restaurants/show/feed/controller.js', function () {
      // test passed
    });

    it('features/logged-in/restaurants/show/feed/route.js', function () {
      // test passed
    });

    it('features/logged-in/restaurants/show/index/controller.js', function () {
      // test passed
    });

    it('features/logged-in/restaurants/show/index/route.js', function () {
      // test passed
    });

    it('features/logged-in/restaurants/show/masterfox/controller.js', function () {
      // test passed
    });

    it('features/logged-in/restaurants/show/masterfox/route.js', function () {
      // test passed
    });

    it('features/logged-in/restaurants/show/menus/controller.js', function () {
      // test passed
    });

    it('features/logged-in/restaurants/show/menus/edit/controller.js', function () {
      // test passed
    });

    it('features/logged-in/restaurants/show/menus/edit/route.js', function () {
      // test passed
    });

    it('features/logged-in/restaurants/show/menus/index/controller.js', function () {
      // test passed
    });

    it('features/logged-in/restaurants/show/menus/index/route.js', function () {
      // test passed
    });

    it('features/logged-in/restaurants/show/menus/route.js', function () {
      // test passed
    });

    it('features/logged-in/restaurants/show/menus/show/controller.js', function () {
      // test passed
    });

    it('features/logged-in/restaurants/show/menus/show/route.js', function () {
      // test passed
    });

    it('features/logged-in/restaurants/show/orders/controller.js', function () {
      // test passed
    });

    it('features/logged-in/restaurants/show/orders/route.js', function () {
      // test passed
    });

    it('features/logged-in/restaurants/show/route.js', function () {
      // test passed
    });

    it('features/logged-in/restaurants/show/service-times/controller.js', function () {
      // test passed
    });

    it('features/logged-in/restaurants/show/service-times/route.js', function () {
      // test passed
    });

    it('features/logged-in/restaurants/show/story/controller.js', function () {
      // test passed
    });

    it('features/logged-in/restaurants/show/story/route.js', function () {
      // test passed
    });

    it('features/logged-in/restaurants/show/users/controller.js', function () {
      // test passed
    });

    it('features/logged-in/restaurants/show/users/route.js', function () {
      // test passed
    });

    it('features/logged-in/restaurants/show/versions/controller.js', function () {
      // test passed
    });

    it('features/logged-in/restaurants/show/versions/route.js', function () {
      // test passed
    });

    it('features/logged-in/route.js', function () {
      // test passed
    });

    it('features/logged-in/tags/controller.js', function () {
      // test passed
    });

    it('features/logged-in/tags/dietary/controller.js', function () {
      // test passed
    });

    it('features/logged-in/tags/dietary/new/controller.js', function () {
      // test passed
    });

    it('features/logged-in/tags/dietary/new/route.js', function () {
      // test passed
    });

    it('features/logged-in/tags/dietary/route.js', function () {
      // test passed
    });

    it('features/logged-in/tags/food-type/controller.js', function () {
      // test passed
    });

    it('features/logged-in/tags/food-type/new/controller.js', function () {
      // test passed
    });

    it('features/logged-in/tags/food-type/new/route.js', function () {
      // test passed
    });

    it('features/logged-in/tags/food-type/route.js', function () {
      // test passed
    });

    it('features/logged-in/tags/meal-type/controller.js', function () {
      // test passed
    });

    it('features/logged-in/tags/meal-type/new/controller.js', function () {
      // test passed
    });

    it('features/logged-in/tags/meal-type/new/route.js', function () {
      // test passed
    });

    it('features/logged-in/tags/meal-type/route.js', function () {
      // test passed
    });

    it('features/logged-in/tags/restaurant/controller.js', function () {
      // test passed
    });

    it('features/logged-in/tags/restaurant/new/controller.js', function () {
      // test passed
    });

    it('features/logged-in/tags/restaurant/new/route.js', function () {
      // test passed
    });

    it('features/logged-in/tags/restaurant/route.js', function () {
      // test passed
    });

    it('features/logged-in/tags/route.js', function () {
      // test passed
    });

    it('features/logged-in/users/controller.js', function () {
      // test passed
    });

    it('features/logged-in/users/index/controller.js', function () {
      // test passed
    });

    it('features/logged-in/users/index/route.js', function () {
      // test passed
    });

    it('features/logged-in/users/route.js', function () {
      // test passed
    });

    it('features/logged-in/users/show/controller.js', function () {
      // test passed
    });

    it('features/logged-in/users/show/feed/controller.js', function () {
      // test passed
    });

    it('features/logged-in/users/show/feed/route.js', function () {
      // test passed
    });

    it('features/logged-in/users/show/index/controller.js', function () {
      // test passed
    });

    it('features/logged-in/users/show/index/route.js', function () {
      // test passed
    });

    it('features/logged-in/users/show/internal/controller.js', function () {
      // test passed
    });

    it('features/logged-in/users/show/internal/route.js', function () {
      // test passed
    });

    it('features/logged-in/users/show/payment-cards/controller.js', function () {
      // test passed
    });

    it('features/logged-in/users/show/payment-cards/route.js', function () {
      // test passed
    });

    it('features/logged-in/users/show/payroll/controller.js', function () {
      // test passed
    });

    it('features/logged-in/users/show/payroll/route.js', function () {
      // test passed
    });

    it('features/logged-in/users/show/route.js', function () {
      // test passed
    });

    it('features/login/controller.js', function () {
      // test passed
    });

    it('features/login/route.js', function () {
      // test passed
    });

    it('features/logout/controller.js', function () {
      // test passed
    });

    it('features/logout/route.js', function () {
      // test passed
    });

    it('features/password-reset/controller.js', function () {
      // test passed
    });

    it('features/password-reset/route.js', function () {
      // test passed
    });

    it('features/storages/meal-planning/planner-settings/storage.js', function () {
      // test passed
    });

    it('features/user-invite/controller.js', function () {
      // test passed
    });

    it('features/user-invite/route.js', function () {
      // test passed
    });

    it('helpers/add-to-date.js', function () {
      // test passed
    });

    it('helpers/and.js', function () {
      // test passed
    });

    it('helpers/capitalize-sentence.js', function () {
      // test passed
    });

    it('helpers/copy-mut.js', function () {
      // test passed
    });

    it('helpers/date-eq.js', function () {
      // test passed
    });

    it('helpers/downcase.js', function () {
      // test passed
    });

    it('helpers/eq.js', function () {
      // test passed
    });

    it('helpers/fde-query-params.js', function () {
      // test passed
    });

    it('helpers/feature-enabled-for.js', function () {
      // test passed
    });

    it('helpers/format-cents.js', function () {
      // test passed
    });

    it('helpers/format-currency.js', function () {
      // test passed
    });

    it('helpers/format-dollars.js', function () {
      // test passed
    });

    it('helpers/format-joined-users-counts.js', function () {
      // test passed
    });

    it('helpers/format-ranking.js', function () {
      // test passed
    });

    it('helpers/format-team-order-counts.js', function () {
      // test passed
    });

    it('helpers/formatted-amount.js', function () {
      // test passed
    });

    it('helpers/formatted-date-range.js', function () {
      // test passed
    });

    it('helpers/formatted-date.js', function () {
      // test passed
    });

    it('helpers/formatted-delivery-window.js', function () {
      // test passed
    });

    it('helpers/formatted-time-range.js', function () {
      // test passed
    });

    it('helpers/formatted-time.js', function () {
      // test passed
    });

    it('helpers/get-prop.js', function () {
      // test passed
    });

    it('helpers/gt.js', function () {
      // test passed
    });

    it('helpers/hard-link.js', function () {
      // test passed
    });

    it('helpers/has-prop.js', function () {
      // test passed
    });

    it('helpers/html-safe.js', function () {
      // test passed
    });

    it('helpers/humanize.js', function () {
      // test passed
    });

    it('helpers/includes.js', function () {
      // test passed
    });

    it('helpers/joined-user-has-ordered.js', function () {
      // test passed
    });

    it('helpers/joined-user-is-group-order-member.js', function () {
      // test passed
    });

    it('helpers/json-pretty-print.js', function () {
      // test passed
    });

    it('helpers/lower-case.js', function () {
      // test passed
    });

    it('helpers/lt.js', function () {
      // test passed
    });

    it('helpers/matches-requirement.js', function () {
      // test passed
    });

    it('helpers/meta-tag.js', function () {
      // test passed
    });

    it('helpers/not.js', function () {
      // test passed
    });

    it('helpers/notify.js', function () {
      // test passed
    });

    it('helpers/object.js', function () {
      // test passed
    });

    it('helpers/or-value.js', function () {
      // test passed
    });

    it('helpers/or.js', function () {
      // test passed
    });

    it('helpers/percentage.js', function () {
      // test passed
    });

    it('helpers/phone-number.js', function () {
      // test passed
    });

    it('helpers/qp-for-model-filter.js', function () {
      // test passed
    });

    it('helpers/quick-search-action-pane-for-selection.js', function () {
      // test passed
    });

    it('helpers/quick-search-item-for-section.js', function () {
      // test passed
    });

    it('helpers/relative-path.js', function () {
      // test passed
    });

    it('helpers/route-is.js', function () {
      // test passed
    });

    it('helpers/search-action.js', function () {
      // test passed
    });

    it('helpers/semantic-color-for.js', function () {
      // test passed
    });

    it('helpers/sprintf.js', function () {
      // test passed
    });

    it('helpers/stop-propagation.js', function () {
      // test passed
    });

    it('helpers/string-is-empty.js', function () {
      // test passed
    });

    it('helpers/team-member-has-ordered.js', function () {
      // test passed
    });

    it('helpers/team-member-is-group-order-member.js', function () {
      // test passed
    });

    it('helpers/ternary.js', function () {
      // test passed
    });

    it('helpers/time-in.js', function () {
      // test passed
    });

    it('helpers/titleize-snake-case.js', function () {
      // test passed
    });

    it('helpers/titleize.js', function () {
      // test passed
    });

    it('helpers/to-fixed.js', function () {
      // test passed
    });

    it('helpers/truncate.js', function () {
      // test passed
    });

    it('helpers/upcase.js', function () {
      // test passed
    });

    it('helpers/user-can.js', function () {
      // test passed
    });

    it('helpers/user-cant.js', function () {
      // test passed
    });

    it('helpers/user-has-feature.js', function () {
      // test passed
    });

    it('helpers/user-has-role.js', function () {
      // test passed
    });

    it('helpers/value-has-errors.js', function () {
      // test passed
    });

    it('instance-initializers/ember-pusher-namespace-patch.js', function () {
      // test passed
    });

    it('instance-initializers/form-for.js', function () {
      // test passed
    });

    it('instance-initializers/fragment-equals-model.js', function () {
      // test passed
    });

    it('instance-initializers/fragment-serializer.js', function () {
      // test passed
    });

    it('instance-initializers/loggers.js', function () {
      // test passed
    });

    it('instance-initializers/rsvp-custom-catch.js', function () {
      // test passed
    });

    it('instance-initializers/third-party-inits.js', function () {
      // test passed
    });

    it('instance-initializers/warnings-to-ignore.js', function () {
      // test passed
    });

    it('mixins/capability-route-mixin.js', function () {
      // test passed
    });

    it('mixins/constraint-tag-mixin.js', function () {
      // test passed
    });

    it('mixins/filter-route-mixin.js', function () {
      // test passed
    });

    it('mixins/loading-route-mixin.js', function () {
      // test passed
    });

    it('mixins/pusher-handlers-mixin.js', function () {
      // test passed
    });

    it('mixins/service-area-checker-mixin.js', function () {
      // test passed
    });

    it('models/accounting-ledger-item.js', function () {
      // test passed
    });

    it('models/accounting-line-item.js', function () {
      // test passed
    });

    it('models/app-configuration.js', function () {
      // test passed
    });

    it('models/area-closure.js', function () {
      // test passed
    });

    it('models/area.js', function () {
      // test passed
    });

    it('models/client-discount.js', function () {
      // test passed
    });

    it('models/client-order-invoice.js', function () {
      // test passed
    });

    it('models/client.js', function () {
      // test passed
    });

    it('models/communication-preference.js', function () {
      // test passed
    });

    it('models/company.js', function () {
      // test passed
    });

    it('models/contact.js', function () {
      // test passed
    });

    it('models/courier.js', function () {
      // test passed
    });

    it('models/currencies-currency.js', function () {
      // test passed
    });

    it('models/currencies-owner.js', function () {
      // test passed
    });

    it('models/currencies-transaction.js', function () {
      // test passed
    });

    it('models/currencies-wallet.js', function () {
      // test passed
    });

    it('models/custom-inflector-rules.js', function () {
      // test passed
    });

    it('models/decorators/composite-location.js', function () {
      // test passed
    });

    it('models/delivery-case.js', function () {
      // test passed
    });

    it('models/delivery-location.js', function () {
      // test passed
    });

    it('models/desk-case.js', function () {
      // test passed
    });

    it('models/dietary-tag.js', function () {
      // test passed
    });

    it('models/discount-code.js', function () {
      // test passed
    });

    it('models/driver-payment.js', function () {
      // test passed
    });

    it('models/driver-payroll-run.js', function () {
      // test passed
    });

    it('models/driver-ping.js', function () {
      // test passed
    });

    it('models/driver-week.js', function () {
      // test passed
    });

    it('models/driver.js', function () {
      // test passed
    });

    it('models/email-message.js', function () {
      // test passed
    });

    it('models/event.js', function () {
      // test passed
    });

    it('models/food-type.js', function () {
      // test passed
    });

    it('models/fragments/contact.js', function () {
      // test passed
    });

    it('models/fragments/location.js', function () {
      // test passed
    });

    it('models/fragments/meal-plan/custom-field.js', function () {
      // test passed
    });

    it('models/fragments/meal-planning/day.js', function () {
      // test passed
    });

    it('models/fragments/meal-planning/meal.js', function () {
      // test passed
    });

    it('models/fragments/meal-planning/plan.js', function () {
      // test passed
    });

    it('models/fragments/meal-planning/slot.js', function () {
      // test passed
    });

    it('models/fragments/order-notes.js', function () {
      // test passed
    });

    it('models/giftbit-card.js', function () {
      // test passed
    });

    it('models/giftbit-error.js', function () {
      // test passed
    });

    it('models/giftbit-gift.js', function () {
      // test passed
    });

    it('models/giftbit-points-action.js', function () {
      // test passed
    });

    it('models/group-order-member.js', function () {
      // test passed
    });

    it('models/historian-version.js', function () {
      // test passed
    });

    it('models/invoice.js', function () {
      // test passed
    });

    it('models/invoicing-ledger-item.js', function () {
      // test passed
    });

    it('models/invoicing-tax-rate.js', function () {
      // test passed
    });

    it('models/late-notification.js', function () {
      // test passed
    });

    it('models/location.js', function () {
      // test passed
    });

    it('models/meal-plan.js', function () {
      // test passed
    });

    it('models/meal-planning-instance.js', function () {
      // test passed
    });

    it('models/meal-planning-log-record.js', function () {
      // test passed
    });

    it('models/meal-planning-planable.js', function () {
      // test passed
    });

    it('models/meal-planning-preference-profile.js', function () {
      // test passed
    });

    it('models/meal-planning-requirement-constraint.js', function () {
      // test passed
    });

    it('models/meal-planning-requirement-group.js', function () {
      // test passed
    });

    it('models/meal-planning-requirement.js', function () {
      // test passed
    });

    it('models/meal-planning-reservation.js', function () {
      // test passed
    });

    it('models/meal-planning-restaurant-constraint.js', function () {
      // test passed
    });

    it('models/meal-planning-template.js', function () {
      // test passed
    });

    it('models/meal-type.js', function () {
      // test passed
    });

    it('models/menu-group.js', function () {
      // test passed
    });

    it('models/menu-item.js', function () {
      // test passed
    });

    it('models/menu-option-group.js', function () {
      // test passed
    });

    it('models/menu-option-item.js', function () {
      // test passed
    });

    it('models/menu.js', function () {
      // test passed
    });

    it('models/notification-log.js', function () {
      // test passed
    });

    it('models/order-item.js', function () {
      // test passed
    });

    it('models/order.js', function () {
      // test passed
    });

    it('models/payment-card.js', function () {
      // test passed
    });

    it('models/payroll-run.js', function () {
      // test passed
    });

    it('models/pickup-location.js', function () {
      // test passed
    });

    it('models/promo-code.js', function () {
      // test passed
    });

    it('models/requireable.js', function () {
      // test passed
    });

    it('models/restaurant-capacity-tranche.js', function () {
      // test passed
    });

    it('models/restaurant-closure.js', function () {
      // test passed
    });

    it('models/restaurant-discount.js', function () {
      // test passed
    });

    it('models/restaurant-order-invoice.js', function () {
      // test passed
    });

    it('models/restaurant-ranking.js', function () {
      // test passed
    });

    it('models/restaurant-utilization.js', function () {
      // test passed
    });

    it('models/restaurant-vote.js', function () {
      // test passed
    });

    it('models/restaurant.js', function () {
      // test passed
    });

    it('models/role.js', function () {
      // test passed
    });

    it('models/salesforce-sync-error.js', function () {
      // test passed
    });

    it('models/service-time.js', function () {
      // test passed
    });

    it('models/tag.js', function () {
      // test passed
    });

    it('models/team.js', function () {
      // test passed
    });

    it('models/user-invite.js', function () {
      // test passed
    });

    it('models/user.js', function () {
      // test passed
    });

    it('models/validators/menu-group.js', function () {
      // test passed
    });

    it('models/validators/menu-item.js', function () {
      // test passed
    });

    it('models/validators/menu.js', function () {
      // test passed
    });

    it('models/validators/payment-card.js', function () {
      // test passed
    });

    it('models/validators/restaurant.js', function () {
      // test passed
    });

    it('resolver.js', function () {
      // test passed
    });

    it('router.js', function () {
      // test passed
    });

    it('search-actions/account-manager.js', function () {
      // test passed
    });

    it('search-actions/area.js', function () {
      // test passed
    });

    it('search-actions/base.js', function () {
      // test passed
    });

    it('search-actions/client.js', function () {
      // test passed
    });

    it('search-actions/company.js', function () {
      // test passed
    });

    it('search-actions/driver.js', function () {
      // test passed
    });

    it('search-actions/order-and-admin-contact.js', function () {
      // test passed
    });

    it('search-actions/order.js', function () {
      // test passed
    });

    it('search-actions/restaurant.js', function () {
      // test passed
    });

    it('search-actions/tag.js', function () {
      // test passed
    });

    it('search-actions/user.js', function () {
      // test passed
    });

    it('serializers/application.js', function () {
      // test passed
    });

    it('serializers/area.js', function () {
      // test passed
    });

    it('serializers/client.js', function () {
      // test passed
    });

    it('serializers/communication-preference.js', function () {
      // test passed
    });

    it('serializers/company.js', function () {
      // test passed
    });

    it('serializers/contact.js', function () {
      // test passed
    });

    it('serializers/courier.js', function () {
      // test passed
    });

    it('serializers/driver-payroll-run.js', function () {
      // test passed
    });

    it('serializers/food-type.js', function () {
      // test passed
    });

    it('serializers/fragments/contact.js', function () {
      // test passed
    });

    it('serializers/fragments/fragment.js', function () {
      // test passed
    });

    it('serializers/fragments/location.js', function () {
      // test passed
    });

    it('serializers/fragments/meal-planning/day.js', function () {
      // test passed
    });

    it('serializers/fragments/meal-planning/meal.js', function () {
      // test passed
    });

    it('serializers/fragments/meal-planning/plan.js', function () {
      // test passed
    });

    it('serializers/fragments/meal-planning/slot.js', function () {
      // test passed
    });

    it('serializers/fragments/order-notes.js', function () {
      // test passed
    });

    it('serializers/giftbit-points-action.js', function () {
      // test passed
    });

    it('serializers/location.js', function () {
      // test passed
    });

    it('serializers/meal-planning-instance-serializer.js', function () {
      // test passed
    });

    it('serializers/meal-planning-instance.js', function () {
      // test passed
    });

    it('serializers/meal-planning-preference-profile.js', function () {
      // test passed
    });

    it('serializers/meal-planning-requirement-group.js', function () {
      // test passed
    });

    it('serializers/meal-planning-reservation-serializer.js', function () {
      // test passed
    });

    it('serializers/meal-planning-reservation.js', function () {
      // test passed
    });

    it('serializers/meal-planning-restaurant-constraint-serializer.js', function () {
      // test passed
    });

    it('serializers/meal-type.js', function () {
      // test passed
    });

    it('serializers/menu-group.js', function () {
      // test passed
    });

    it('serializers/menu-item.js', function () {
      // test passed
    });

    it('serializers/menu-option-group.js', function () {
      // test passed
    });

    it('serializers/menu-option-item.js', function () {
      // test passed
    });

    it('serializers/menu.js', function () {
      // test passed
    });

    it('serializers/order-item.js', function () {
      // test passed
    });

    it('serializers/order.js', function () {
      // test passed
    });

    it('serializers/payment-card.js', function () {
      // test passed
    });

    it('serializers/restaurant.js', function () {
      // test passed
    });

    it('serializers/tag.js', function () {
      // test passed
    });

    it('serializers/user.js', function () {
      // test passed
    });

    it('services/ajax.js', function () {
      // test passed
    });

    it('services/app-configuration.js', function () {
      // test passed
    });

    it('services/card-service.js', function () {
      // test passed
    });

    it('services/driver-notification.js', function () {
      // test passed
    });

    it('services/fetch-tax.js', function () {
      // test passed
    });

    it('services/location.js', function () {
      // test passed
    });

    it('services/loggers/log-entries-logger.js', function () {
      // test passed
    });

    it('services/loggers/manager.js', function () {
      // test passed
    });

    it('services/mock-card-service.js', function () {
      // test passed
    });

    it('services/modal.js', function () {
      // test passed
    });

    it('services/notification-logs.js', function () {
      // test passed
    });

    it('services/order-service.js', function () {
      // test passed
    });

    it('services/poll-manager.js', function () {
      // test passed
    });

    it('services/raven.js', function () {
      // test passed
    });

    it('services/set-menu-service.js', function () {
      // test passed
    });

    it('services/tick.js', function () {
      // test passed
    });

    it('services/tock.js', function () {
      // test passed
    });

    it('services/user-session.js', function () {
      // test passed
    });

    it('session-stores/application.js', function () {
      // test passed
    });

    it('supports/filters/decorators.js', function () {
      // test passed
    });

    it('supports/filters/decorators/client.js', function () {
      // test passed
    });

    it('supports/filters/filter-collection-manager.js', function () {
      // test passed
    });

    it('supports/filters/filter-collection.js', function () {
      // test passed
    });

    it('supports/filters/filter.js', function () {
      // test passed
    });

    it('transforms/array.js', function () {
      // test passed
    });

    it('transforms/date-only.js', function () {
      // test passed
    });

    it('transforms/dollars.js', function () {
      // test passed
    });

    it('transforms/object.js', function () {
      // test passed
    });

    it('transforms/phone.js', function () {
      // test passed
    });

    it('transforms/time.js', function () {
      // test passed
    });

    it('transforms/vehicle.js', function () {
      // test passed
    });

    it('transitions.js', function () {
      // test passed
    });

    it('utils/array.js', function () {
      // test passed
    });

    it('utils/computed.js', function () {
      // test passed
    });

    it('utils/date.js', function () {
      // test passed
    });

    it('utils/download.js', function () {
      // test passed
    });

    it('utils/format-phone-number.js', function () {
      // test passed
    });

    it('utils/generate-guid.js', function () {
      // test passed
    });

    it('utils/group-by.js', function () {
      // test passed
    });

    it('utils/is-same-as.js', function () {
      // test passed
    });

    it('utils/model.js', function () {
      // test passed
    });

    it('utils/order-item-options.js', function () {
      // test passed
    });

    it('utils/session-can.js', function () {
      // test passed
    });

    it('utils/shift-luminance.js', function () {
      // test passed
    });

    it('utils/type.js', function () {
      // test passed
    });

    it('utils/unique-debounce.js', function () {
      // test passed
    });

    it('utils/url.js', function () {
      // test passed
    });
  });
});
define('star-fox/tests/blanket-options', ['exports'], function (exports) {
  /* globals blanket, module */

  var options = {
    modulePrefix: 'star-fox',

    filter: '//.*star-fox/.*/',

    antifilter: '//.*(tests|template).*/',

    loaderExclusions: [],

    enableCoverage: true,

    lcovOptions: {
      outputFile: 'lcov.dat',

      excludeMissingFiles: true
    },

    cliOptions: {
      reporters: ['lcov'],

      autostart: true,

      debugCLI: false
    }
  };

  if (typeof exports === 'undefined') {
    blanket.options(options);
  } else {
    module.exports = options;
  }
});
define('star-fox/tests/factories/area', ['exports', 'ember-data-factory-guy'], function (exports, _emberDataFactoryGuy) {

  _emberDataFactoryGuy['default'].define('area', {
    'default': {
      active: true,
      city: 'Vancouver',
      country: 'CA',
      currency: 'CAD',
      deliveryFee: 1500,
      isoTimeZone: 'America/Los_Angeles',
      province: 'BC',
      slug: 'vancouver',
      title: 'Vancouver',
      restaurants: _emberDataFactoryGuy['default'].hasMany('restaurant', 2)
    }
  });
});
define('star-fox/tests/factories/client', ['exports', 'ember-data-factory-guy', 'faker'], function (exports, _emberDataFactoryGuy, _faker) {

  _emberDataFactoryGuy['default'].define('client', {
    'default': {
      id: _faker['default'].random.number(),
      restaurant: _emberDataFactoryGuy['default'].belongsTo('restaurant')
    }
  });
});
define('star-fox/tests/factories/dietary-tag', ['exports', 'ember-data-factory-guy', 'faker'], function (exports, _emberDataFactoryGuy, _faker) {

  _emberDataFactoryGuy['default'].define('dietary-tag', {
    'default': {
      abbreviation: function abbreviation(_) {
        return _faker['default'].lorem.word().substring(0, 2);
      },
      color: function color(_) {
        return _faker['default'].internet.color();
      },
      id: function id(_) {
        return _faker['default'].lorem.word();
      },
      name: function name(_) {
        return _faker['default'].lorem.word();
      },
      slug: function slug(_) {
        return _faker['default'].lorem.word();
      }
    }
  });
});
define('star-fox/tests/factories/email-message', ['exports', 'ember-data-factory-guy', 'faker', 'moment'], function (exports, _emberDataFactoryGuy, _faker, _moment) {

  _emberDataFactoryGuy['default'].define('email-message', {
    'default': {
      messageId: _faker['default'].random.number(),
      recipients: [_faker['default'].internet.email()],
      subject: _faker['default'].lorem.word(),
      message: _faker['default'].lorem.sentence(),
      event: 'click',
      mailableId: _faker['default'].random.number(),
      messageType: 'client',
      createdAt: (0, _moment['default'])(),

      // Relationships
      order: _emberDataFactoryGuy['default'].belongsTo('order')
    },
    traits: {
      withEvents: {
        events: _emberDataFactoryGuy['default'].hasMany('event', 2)
      }
    }
  });
});
define('star-fox/tests/factories/event', ['exports', 'ember-data-factory-guy', 'faker'], function (exports, _emberDataFactoryGuy, _faker) {

  _emberDataFactoryGuy['default'].define('event', {
    'default': {
      id: _faker['default'].random.number(),
      event: _faker['default'].lorem.word(),
      emailMessage: _emberDataFactoryGuy['default'].belongsTo('emailMessage')
    }
  });
});
define('star-fox/tests/factories/group-order-member', ['exports', 'ember-data-factory-guy', 'faker'], function (exports, _emberDataFactoryGuy, _faker) {

  _emberDataFactoryGuy['default'].define('group-order-member', {
    'default': {
      email: function email(_) {
        return _faker['default'].internet.email();
      },
      name: function name(_) {
        return _faker['default'].lorem.word();
      },
      phoneNumber: function phoneNumber(_) {
        return _faker['default'].phone.phoneNumber();
      }
    },

    traits: {
      withOrderItems: {
        orderItems: _emberDataFactoryGuy['default'].hasMany('order-item', 2)
      }
    }
  });
});
define('star-fox/tests/factories/meal-planning-reservation', ['exports', 'ember-data-factory-guy'], function (exports, _emberDataFactoryGuy) {

  _emberDataFactoryGuy['default'].define('meal-planning-reservation', {
    'default': {}
  });
});
define('star-fox/tests/factories/menu-item', ['exports', 'ember-data-factory-guy', 'faker'], function (exports, _emberDataFactoryGuy, _faker) {

  _emberDataFactoryGuy['default'].define('menu-item', {
    'default': {
      active: true,
      clientPriceCents: function clientPriceCents(_) {
        return _faker['default'].random.number();
      },
      restaurantPriceCents: function restaurantPriceCents(_) {
        return _faker['default'].random.number();
      },
      retailPriceCents: function retailPriceCents(_) {
        return _faker['default'].random.number();
      },
      taxable: true,
      name: function name(_) {
        return _faker['default'].lorem.word();
      },
      description: function description(_) {
        return _faker['default'].lorem.sentence();
      }
    },

    traits: {
      with_menu_option_groups: {
        menuOptionGroups: _emberDataFactoryGuy['default'].hasMany('menu-option-group')
      }
    }
  });
});
define('star-fox/tests/factories/menu-option-group', ['exports', 'ember-data-factory-guy', 'faker'], function (exports, _emberDataFactoryGuy, _faker) {

  _emberDataFactoryGuy['default'].define('menu-option-group', {
    'default': {
      name: function name(_) {
        return _faker['default'].lorem.word();
      },
      isRequired: false,
      isSingleOpt: false,
      verb: ['select', 'pick', 'substitute'].sample,
      position: 1,

      menuItem: function menuItem(_) {
        return _emberDataFactoryGuy['default'].belongsTo('menu-item');
      }
    },

    traits: {
      with_menu_option_items: {
        menuOptionItems: _emberDataFactoryGuy['default'].hasMany('menu-option-item')
      }
    }
  });
});
define('star-fox/tests/factories/menu-option-item', ['exports', 'ember-data-factory-guy', 'faker'], function (exports, _emberDataFactoryGuy, _faker) {

  _emberDataFactoryGuy['default'].define('menu-option-item', {
    'default': {
      name: function name(_) {
        return _faker['default'].lorem.word();
      },
      clientPriceCents: function clientPriceCents(_) {
        return _faker['default'].random.number();
      },
      restaurantPriceCents: function restaurantPriceCents(_) {
        return _faker['default'].random.number();
      },
      retailPriceCents: function retailPriceCents(_) {
        return _faker['default'].random.number();
      },
      position: 1,

      menuOptionGroup: function menuOptionGroup(_) {
        return _emberDataFactoryGuy['default'].belongsTo('menu-option-group');
      },
      orderItem: function orderItem(_) {
        return _emberDataFactoryGuy['default'].belongsTo('order-item');
      }
    }
  });
});
define('star-fox/tests/factories/order-item', ['exports', 'ember-data-factory-guy', 'faker'], function (exports, _emberDataFactoryGuy, _faker) {

  _emberDataFactoryGuy['default'].define('order-item', {
    'default': {
      clientPriceCents: function clientPriceCents(_) {
        return _faker['default'].random.number();
      },
      restaurantPriceCents: function restaurantPriceCents(_) {
        return _faker['default'].random.number();
      },
      quantity: function quantity(_) {
        return _faker['default'].random.number();
      },
      taxable: true,

      menuItem: function menuItem(_) {
        return _emberDataFactoryGuy['default'].belongsTo('menu-item');
      }
    },

    traits: {
      withNotes: {
        notes: function notes(_) {
          return _ + ' Note Time';
        }
      },

      with_menu_option_items: {
        menuOptionItems: _emberDataFactoryGuy['default'].hasMany('menu-option-item')
      }
    }
  });
});
define('star-fox/tests/factories/order', ['exports', 'ember-data-factory-guy', 'faker'], function (exports, _emberDataFactoryGuy, _faker) {

  _emberDataFactoryGuy['default'].define('order', {
    'default': {
      id: _faker['default'].random.number(),
      restaurant: _emberDataFactoryGuy['default'].belongsTo('restaurant'),
      name: function name(_) {
        return _faker['default'].lorem.sentence();
      }
    },
    traits: {
      withEmailMessages: {
        emailMessages: _emberDataFactoryGuy['default'].hasMany('email-message', 2)
      }
    }
  });
});
define('star-fox/tests/factories/restaurant', ['exports', 'ember-data-factory-guy', 'faker'], function (exports, _emberDataFactoryGuy, _faker) {

  _emberDataFactoryGuy['default'].define('restaurant', {
    'default': {
      name: _faker['default'].company.companyName(),
      serviceTimes: _emberDataFactoryGuy['default'].hasMany('service-time', 5)
    }
  });
});
define('star-fox/tests/factories/service-time', ['exports', 'ember-data-factory-guy', 'star-fox/transforms/time'], function (exports, _emberDataFactoryGuy, _starFoxTransformsTime) {

  _emberDataFactoryGuy['default'].define('service-time', {
    'default': {
      deliveryEndTime: new _starFoxTransformsTime.Time('17:30'),
      deliveryStartTime: new _starFoxTransformsTime.Time('11:30'),
      pickupStartTime: new _starFoxTransformsTime.Time('5:00'),
      pickupEndTime: new _starFoxTransformsTime.Time('8:00'),
      weekday: function weekday(_) {
        return _.id;
      }
    }
  });
});
define('star-fox/tests/factories/user', ['exports', 'ember-data-factory-guy'], function (exports, _emberDataFactoryGuy) {

  _emberDataFactoryGuy['default'].define('user', {
    'default': {}
  });
});
define('star-fox/tests/helpers/common/all', ['exports', 'star-fox/tests/helpers/common/wait-time', 'star-fox/tests/helpers/common/wait-until', 'star-fox/tests/helpers/common/wait-until-not', 'star-fox/tests/helpers/common/fill-in-typing', 'star-fox/tests/helpers/common/fill-in-address', 'star-fox/tests/helpers/common/fill-in-price', 'star-fox/tests/helpers/common/fill-in-phone'], function (exports, _starFoxTestsHelpersCommonWaitTime, _starFoxTestsHelpersCommonWaitUntil, _starFoxTestsHelpersCommonWaitUntilNot, _starFoxTestsHelpersCommonFillInTyping, _starFoxTestsHelpersCommonFillInAddress, _starFoxTestsHelpersCommonFillInPrice, _starFoxTestsHelpersCommonFillInPhone) {});
define('star-fox/tests/helpers/common/fill-in-address', ['exports', 'ember'], function (exports, _ember) {
  var $ = _ember['default'].$;
  var Test = _ember['default'].Test;

  /**
   * Signs a user in through the userSession service. Skipping the need to visit the login page.
   * @param email {String}
   * @param password {String}
   */
  exports['default'] = Test.registerAsyncHelper('fillInAddress', function signIn(app, selector, address) {
    fillInTyping(selector, address, 100);
    waitTime(1000); // wait for autocomplete to settle
    waitUntil('.pac-item:first');
    keyEvent(selector, 'keydown', 40); //Down
    keyEvent(selector, 'keydown', 13); //Enter
    waitTime(1000); //wait for selection to take place
    return andThen(function () {
      $(selector).blur();
    });
    waitTime(1000); //wait for selection to use formatted_address
  });
});
define('star-fox/tests/helpers/common/fill-in-phone', ['exports', 'ember'], function (exports, _ember) {
	var Test = _ember['default'].Test;

	/**
  * Signs a user in through the userSession service. Skipping the need to visit the login page.
  * @param email {String}
  * @param password {String}
  */
	exports['default'] = Test.registerAsyncHelper('fillInPhone', function signIn(app, selector, phone) {
		var phoneString = phone + '';
		var areaCode = phoneString.substring(0, 3);
		var firstPart = phoneString.substring(3, 6);
		var secondPart = phoneString.substring(6, 10);

		var formattedPhoneString = '(' + areaCode + ') ' + firstPart + '-' + secondPart;

		return fillIn(selector, formattedPhoneString);
	});
});
define('star-fox/tests/helpers/common/fill-in-price', ['exports', 'ember'], function (exports, _ember) {
  var $ = _ember['default'].$;
  var Test = _ember['default'].Test;

  /**
   * Signs a user in through the userSession service. Skipping the need to visit the login page.
   * @param email {String}
   * @param password {String}
   */
  exports['default'] = Test.registerAsyncHelper('fillInPrice', function signIn(app, selector, price) {
    var inputVal = find(selector).val();
    var delCount = inputVal.length - 3; // $ 0.00 -> cursor is focused on end. Must delete all, skips 3 useless characters, ., space and $
    triggerEvent(selector, 'focus');
    for (var i = 0; i < delCount; i++) {
      keyEvent(selector, 'keydown', '8');
      keyEvent(selector, 'keypress', '8');
      keyEvent(selector, 'keyup', '8');
    }
    price = price.toString();
    fillInTyping(selector, price, 100);
    triggerEvent(selector, 'change');
    triggerEvent(selector, 'blur');
  });
});
define('star-fox/tests/helpers/common/fill-in-typing', ['exports', 'ember'], function (exports, _ember) {
  var $ = _ember['default'].$;
  var Test = _ember['default'].Test;

  /**
   * Signs a user in through the userSession service. Skipping the need to visit the login page.
   * @param email {String}
   * @param password {String}
   */
  exports['default'] = Test.registerAsyncHelper('fillInTyping', function signIn(app, selector, string) {
    var maxDelay = arguments.length <= 3 || arguments[3] === undefined ? 50 : arguments[3];

    click(selector);
    for (var i = 0; i < string.length; i++) {
      waitTime(Math.random() * maxDelay);
      fillIn(selector, string.substring(0, i + 1));
      keyEvent(selector, 'keydown', string.charCodeAt(i));
      keyEvent(selector, 'keypress', string.charCodeAt(i));
      keyEvent(selector, 'keyup', string.charCodeAt(i));
    }
  });
});
define('star-fox/tests/helpers/common/wait-time', ['exports', 'ember'], function (exports, _ember) {

	/**
  * Waits a specified amount of time in milliseconds
  * before the acceptance test runner will continue.
  * 
  * @param milliseconds Amount of time to wait in milliseconds.
  */
	exports['default'] = _ember['default'].Test.registerAsyncHelper('waitTime', function (app, milliseconds) {
		var isWaiting = true;

		var waiter = function waiter() {
			return !isWaiting;
		};

		_ember['default'].Test.registerWaiter(waiter);

		var promise = app.testHelpers.wait();

		setTimeout(function () {
			isWaiting = false;
		}, milliseconds);

		promise.then(function () {
			_ember['default'].Test.unregisterWaiter(waiter);
		});

		return promise;
	});
});
define('star-fox/tests/helpers/common/wait-until-not', ['exports', 'ember'], function (exports, _ember) {

	/**
  * Will pause the test runner until the selector is found in the dom.
  *
  * @param selector
  */
	exports['default'] = _ember['default'].Test.registerAsyncHelper('waitUntilNot', function (app, selector) {
		var waiter = function waiter() {
			return _ember['default'].$(selector).length === 0;
		};

		_ember['default'].Test.registerWaiter(waiter);
		var promise = app.testHelpers.wait();

		promise.then(function () {
			_ember['default'].Test.unregisterWaiter(waiter);
		});

		return promise;
	});
});
define('star-fox/tests/helpers/common/wait-until', ['exports', 'ember'], function (exports, _ember) {

	/**
  * Will pause the test runner until the selector is found in the dom.
  *
  * @param selector
  */
	exports['default'] = _ember['default'].Test.registerAsyncHelper('waitUntil', function (app, selector) {
		var waiter = function waiter() {
			return _ember['default'].$(selector).length > 0;
		};

		_ember['default'].Test.registerWaiter(waiter);
		var promise = app.testHelpers.wait();

		promise.then(function () {
			_ember['default'].Test.unregisterWaiter(waiter);
		});

		return promise;
	});
});
define('star-fox/tests/helpers/destroy-app', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = destroyApp;

  function destroyApp(application) {
    _ember['default'].run(application, 'destroy');
    $('.ui.dimmer').remove(); // semantic ui modal will leave its dimmer behind
    server.shutdown();
  }
});
/* global server */
define('star-fox/tests/helpers/ember-cli-clipboard', ['exports', 'ember-test', 'ember'], function (exports, _emberTest, _ember) {
  exports.triggerSuccess = triggerSuccess;
  exports.triggerError = triggerError;
  var run = _ember['default'].run;

  /* === Integration Test Helpers === */

  /**
   * Fires `success` action for an instance of a copy-button component
   * @function triggerSuccess
   * @param {Object} context - integration test’s this context
   * @param {String|Element} selector - selector of the copy-button instance
   * @returns {Void}
   */

  function triggerSuccess(context, selector) {
    fireComponentAction(context, selector, 'success');
  }

  /**
   * Fires `error` action for an instance of a copy-button component
   * @function triggerError
   * @param {Object} context - integration test’s this context
   * @param {String|Element} selector - selector of the copy-button instance
   * @returns {Void}
   */

  function triggerError(context, selector) {
    fireComponentAction(context, selector, 'error');
  }

  /* === Acceptance Test Helpers === */

  /**
   * Default export is a function that registers acceptance test helpers
   */

  exports['default'] = function () {
    _emberTest['default'].registerAsyncHelper('triggerCopySuccess', function (app) {
      var selector = arguments.length <= 1 || arguments[1] === undefined ? '.copy-btn' : arguments[1];

      fireComponentActionFromApp(app, selector, 'success');
    });

    _emberTest['default'].registerAsyncHelper('triggerCopyError', function (app) {
      var selector = arguments.length <= 1 || arguments[1] === undefined ? '.copy-btn' : arguments[1];

      fireComponentActionFromApp(app, selector, 'error');
    });
  };

  /* === Private Functions === */

  /**
   * Fires named action for an instance of a copy-button component in an app
   * @function fireComponentActionFromApp
   * @param {Object} app - Ember application
   * @param {String|Element} selector - selector of the copy-button instance
   * @param {String} actionName - name of action
   * @returns {Void}
   */
  function fireComponentActionFromApp(app, selector, actionName) {
    fireComponentAction({
      container: app.__container__,
      $: app.$
    }, selector, actionName);
  }

  /**
   * Fires named action for an instance of a copy-button component
   * @function fireComponentAction
   * @param {Object} context - test context
   * @param {String|Element} selector - selector of the copy-button instance
   * @param {String} actionName - name of action
   * @returns {Void}
   */
  function fireComponentAction(context, selector, actionName) {
    var component = getComponentBySelector(context, selector);
    fireActionByName(component, actionName);
  }

  /**
   * Fetches component reference for a given context and selector
   * @function getComponentBySelector
   * @param {Object} context - test context
   * @param {String|Element} selector - selector of the copy-button instance
   * @returns {Object} component object
   */
  function getComponentBySelector(context) {
    var selector = arguments.length <= 1 || arguments[1] === undefined ? '.copy-btn' : arguments[1];

    var emberId = context.$(selector).attr('id');
    return context.container.lookup('-view-registry:main')[emberId];
  }

  /**
   * Fires a component's action given an action name
   * @function fireActionByName
   * @param {Ember.Component} component - component to fire action from
   * @param {String} actionName - name of action
   * @returns {Void}
   */
  function fireActionByName(component, actionName) {
    var action = component[actionName];

    run(function () {
      if (typeof action === 'string') {
        component.sendAction(action);
      } else {
        action();
      }
    });
  }
});
define('star-fox/tests/helpers/ember-simple-auth', ['exports', 'ember-simple-auth/authenticators/test'], function (exports, _emberSimpleAuthAuthenticatorsTest) {
  exports.authenticateSession = authenticateSession;
  exports.currentSession = currentSession;
  exports.invalidateSession = invalidateSession;

  var TEST_CONTAINER_KEY = 'authenticator:test';

  function ensureAuthenticator(app, container) {
    var authenticator = container.lookup(TEST_CONTAINER_KEY);
    if (!authenticator) {
      app.register(TEST_CONTAINER_KEY, _emberSimpleAuthAuthenticatorsTest['default']);
    }
  }

  function authenticateSession(app, sessionData) {
    var container = app.__container__;

    var session = container.lookup('service:session');
    ensureAuthenticator(app, container);
    session.authenticate(TEST_CONTAINER_KEY, sessionData);
    return app.testHelpers.wait();
  }

  function currentSession(app) {
    return app.__container__.lookup('service:session');
  }

  function invalidateSession(app) {
    var session = app.__container__.lookup('service:session');
    if (session.get('isAuthenticated')) {
      session.invalidate();
    }
    return app.testHelpers.wait();
  }
});
define('star-fox/tests/helpers/ember-sortable/test-helpers', ['exports', 'ember-sortable/helpers/drag', 'ember-sortable/helpers/reorder'], function (exports, _emberSortableHelpersDrag, _emberSortableHelpersReorder) {});
define('star-fox/tests/helpers/module-for-acceptance', ['exports', 'qunit', 'star-fox/tests/helpers/start-app', 'star-fox/tests/helpers/destroy-app'], function (exports, _qunit, _starFoxTestsHelpersStartApp, _starFoxTestsHelpersDestroyApp) {
  exports['default'] = function (name) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    (0, _qunit.module)(name, {
      beforeEach: function beforeEach() {
        this.application = (0, _starFoxTestsHelpersStartApp['default'])();

        if (options.beforeEach) {
          options.beforeEach.apply(this, arguments);
        }
      },

      afterEach: function afterEach() {
        if (options.afterEach) {
          options.afterEach.apply(this, arguments);
        }

        (0, _starFoxTestsHelpersDestroyApp['default'])(this.application);
      }
    });
  };
});
define('star-fox/tests/helpers/resolver', ['exports', 'star-fox/resolver', 'star-fox/config/environment'], function (exports, _starFoxResolver, _starFoxConfigEnvironment) {

  var resolver = _starFoxResolver['default'].create();

  resolver.namespace = {
    modulePrefix: _starFoxConfigEnvironment['default'].modulePrefix,
    podModulePrefix: _starFoxConfigEnvironment['default'].podModulePrefix
  };

  exports['default'] = resolver;
});
define('star-fox/tests/helpers/start-app', ['exports', 'ember', 'star-fox/tests/helpers/common/all', 'star-fox/app', 'star-fox/config/environment'], function (exports, _ember, _starFoxTestsHelpersCommonAll, _starFoxApp, _starFoxConfigEnvironment) {
  exports['default'] = startApp;

  function startApp(attrs) {
    var application = undefined;

    var attributes = _ember['default'].merge({}, _starFoxConfigEnvironment['default'].APP);
    attributes = _ember['default'].merge(attributes, attrs); // use defaults, but you can override;

    _ember['default'].run(function () {
      application = _starFoxApp['default'].create(attributes);
      application.setupForTesting();
      application.injectTestHelpers();
    });

    return application;
  }
});
define('star-fox/tests/integration/components/sf/simple-button/component-test', ['exports', 'chai', 'mocha', 'ember-mocha'], function (exports, _chai, _mocha, _emberMocha) {

  // import hbs from 'htmlbars-inline-precompile';

  (0, _mocha.describe)('integration.components.sf.simple-button', function () {
    (0, _emberMocha.setupComponentTest)('sf/simple-button');

    (0, _mocha.it)('renders with correct classes and tag type', function () {
      // this.render(hbs`{{sf-button}}`);
      //
      // const $this = this.$();

      (0, _chai.expect)(true).to.equal(true);
    });

    // it('renders sizes', function() {
    //   this.render(hbs`{{sf-button isBig=true}}`);
    //   expect(this.$().classList).to.have.length(1);
    // });
  });
});
/* jshint expr:true */
define('star-fox/tests/integration/features/components/form-controls/model-select-control/component-test', ['exports', 'ember', 'chai', 'ember-mocha', 'mocha', 'ember-native-dom-helpers'], function (exports, _ember, _chai, _emberMocha, _mocha, _emberNativeDomHelpers) {
  var run = _ember['default'].run;

  (0, _mocha.describe)('integration.form-controls.model-select-control', function () {
    (0, _emberMocha.setupComponentTest)('form-controls/model-select-control', {
      integration: true
    });

    (0, _mocha.it)('renders', function () {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      // Template block usage:
      // this.render(hbs`
      //   {{#sf/controls/credit-card}}
      //     template content
      //   {{/sf/controls/credit-card}}
      // `);

      this.render(_ember['default'].HTMLBars.template({
        'id': 'Uyg1vFwq',
        'block': '{"statements":[["append",["unknown",["form-controls/model-select-control"]],false]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
        'meta': {}
      }));
      (0, _chai.expect)(this.$()).to.have.length(1);
    });

    (0, _mocha.describe)('when the value is an array', function () {
      (0, _mocha.it)('adds a class named multiple', function () {
        this.setProperties({
          value: []
        });
        this.render(_ember['default'].HTMLBars.template({
          'id': 'VvTXtF8R',
          'block': '{"statements":[["append",["helper",["form-controls/model-select-control"],null,[["value"],[["get",["value"]]]]],false]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
          'meta': {}
        }));
        (0, _chai.expect)(this.$().find('.search').hasClass('multiple')).to.be['true'];
      });
    });

    (0, _mocha.describe)('when the value is not an array', function () {
      (0, _mocha.it)('has no class named multiple', function () {
        this.setProperties({
          value: { id: 1, name: 'burke' }
        });
        this.render(_ember['default'].HTMLBars.template({
          'id': 'VvTXtF8R',
          'block': '{"statements":[["append",["helper",["form-controls/model-select-control"],null,[["value"],[["get",["value"]]]]],false]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
          'meta': {}
        }));
        (0, _chai.expect)(this.$().find('.search').hasClass('multiple')).to.be['false'];
      });
    });

    (0, _mocha.describe)('The user uses the down arrow on a static list of values', function () {
      (0, _mocha.it)('selects the next item in the list without issuing a change event', function callee$2$0() {
        return regeneratorRuntime.async(function callee$2$0$(context$3$0) {
          var _this = this;

          while (1) switch (context$3$0.prev = context$3$0.next) {
            case 0:

              this.set('handleOnChange', function (_) {
                _this.set('onChangeRan', true);
              });

              this.set('values', [{ id: 1, label: 'Foo' }, { id: 2, label: 'Bar' }, { id: 3, label: 'Baz' }]);

              this.set('value', this.get('values')[0]);

              this.render(_ember['default'].HTMLBars.template({
                'id': '2pdHvi5H',
                'block': '{"statements":[["append",["helper",["form-controls/model-select-control"],null,[["value","values","orderByLabel","onChange","direction"],[["get",["value"]],["get",["values"]],false,["helper",["action"],[["get",[null]],["get",["handleOnChange"]]],null],"downward"]]],false]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
                'meta': {}
              }));

              context$3$0.next = 6;
              return regeneratorRuntime.awrap((0, _emberNativeDomHelpers.click)('input'));

            case 6:
              context$3$0.next = 8;
              return regeneratorRuntime.awrap(new Promise(function (resolve) /* reject */{
                run.later(function (_) {
                  return resolve();
                }, 500);
              }));

            case 8:

              (0, _chai.expect)(this.$('.item:first').text()).to.have.string('Bar');
              (0, _chai.expect)(this.$('.item:nth-child(2)').text()).to.have.string('Baz');
              (0, _chai.expect)(this.$('.item:nth-child(3)').text()).to.have.string('None');

              context$3$0.next = 13;
              return regeneratorRuntime.awrap((0, _emberNativeDomHelpers.keyEvent)('input', 'keydown', 40));

            case 13:
              context$3$0.next = 15;
              return regeneratorRuntime.awrap(new Promise(function (resolve) /* reject */{
                run.later(function (_) {
                  return resolve();
                }, 10);
              }));

            case 15:

              (0, _chai.expect)(this.$('.item:first').hasClass('selected')).to.be['true'];
              (0, _chai.expect)(this.$('.item:nth-child(2)').hasClass('selected')).to.be['false'];
              (0, _chai.expect)(this.$('.item:nth-child(3)').hasClass('selected')).to.be['false'];

              context$3$0.next = 20;
              return regeneratorRuntime.awrap((0, _emberNativeDomHelpers.keyEvent)('input', 'keydown', 40));

            case 20:
              context$3$0.next = 22;
              return regeneratorRuntime.awrap(new Promise(function (resolve) /* reject */{
                run.later(function (_) {
                  return resolve();
                }, 10);
              }));

            case 22:

              (0, _chai.expect)(this.$('.item:first').hasClass('selected')).to.be['false'];
              (0, _chai.expect)(this.$('.item:nth-child(2)').hasClass('selected')).to.be['true'];
              (0, _chai.expect)(this.$('.item:nth-child(3)').hasClass('selected')).to.be['false'];

              context$3$0.next = 27;
              return regeneratorRuntime.awrap((0, _emberNativeDomHelpers.keyEvent)('input', 'keydown', 40));

            case 27:
              context$3$0.next = 29;
              return regeneratorRuntime.awrap(new Promise(function (resolve) /* reject */{
                run.later(function (_) {
                  return resolve();
                }, 10);
              }));

            case 29:

              (0, _chai.expect)(this.$('.item:first').hasClass('selected')).to.be['false'];
              (0, _chai.expect)(this.$('.item:nth-child(2)').hasClass('selected')).to.be['false'];
              (0, _chai.expect)(this.$('.item:nth-child(3)').hasClass('selected')).to.be['true'];

              context$3$0.next = 34;
              return regeneratorRuntime.awrap((0, _emberNativeDomHelpers.keyEvent)('input', 'keydown', 38));

            case 34:
              context$3$0.next = 36;
              return regeneratorRuntime.awrap(new Promise(function (resolve) /* reject */{
                run.later(function (_) {
                  return resolve();
                }, 10);
              }));

            case 36:

              (0, _chai.expect)(this.$('.item:first').hasClass('selected')).to.be['false'];
              (0, _chai.expect)(this.$('.item:nth-child(2)').hasClass('selected')).to.be['true'];
              (0, _chai.expect)(this.$('.item:nth-child(3)').hasClass('selected')).to.be['false'];

              context$3$0.next = 41;
              return regeneratorRuntime.awrap((0, _emberNativeDomHelpers.keyEvent)('input', 'keydown', 38));

            case 41:
              context$3$0.next = 43;
              return regeneratorRuntime.awrap(new Promise(function (resolve) /* reject */{
                run.later(function (_) {
                  return resolve();
                }, 10);
              }));

            case 43:

              (0, _chai.expect)(this.$('.item:first').hasClass('selected')).to.be['true'];
              (0, _chai.expect)(this.$('.item:nth-child(2)').hasClass('selected')).to.be['false'];
              (0, _chai.expect)(this.$('.item:nth-child(3)').hasClass('selected')).to.be['false'];

              (0, _chai.expect)(this.get('onChangeRan')).to.equal(undefined);

            case 47:
            case 'end':
              return context$3$0.stop();
          }
        }, null, this);
      });
    });

    (0, _mocha.describe)('The user can select and commit a change from the dropdown using the keyboard', function () {
      (0, _mocha.it)('emits a change event with the correct model using the down arrow and enter', function callee$2$0() {
        return regeneratorRuntime.async(function callee$2$0$(context$3$0) {
          var _this2 = this;

          while (1) switch (context$3$0.prev = context$3$0.next) {
            case 0:

              this.set('handleOnChange', function (_) {
                _this2.set('changedTo', _);
              });

              this.set('values', [{ id: 1, label: 'Foo' }, { id: 2, label: 'Bar' }, { id: 3, label: 'Baz' }]);

              this.set('value', this.get('values')[0]);

              this.render(_ember['default'].HTMLBars.template({
                'id': '2pdHvi5H',
                'block': '{"statements":[["append",["helper",["form-controls/model-select-control"],null,[["value","values","orderByLabel","onChange","direction"],[["get",["value"]],["get",["values"]],false,["helper",["action"],[["get",[null]],["get",["handleOnChange"]]],null],"downward"]]],false]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
                'meta': {}
              }));

              context$3$0.next = 6;
              return regeneratorRuntime.awrap((0, _emberNativeDomHelpers.click)('input'));

            case 6:
              context$3$0.next = 8;
              return regeneratorRuntime.awrap(new Promise(function (resolve) /* reject */{
                run.later(function (_) {
                  return resolve();
                }, 500);
              }));

            case 8:
              context$3$0.next = 10;
              return regeneratorRuntime.awrap((0, _emberNativeDomHelpers.keyEvent)('input', 'keydown', 40));

            case 10:
              context$3$0.next = 12;
              return regeneratorRuntime.awrap(new Promise(function (resolve) /* reject */{
                run.later(function (_) {
                  return resolve();
                }, 10);
              }));

            case 12:

              //Double check the state
              (0, _chai.expect)(this.$('.item:first').hasClass('selected')).to.be['true'];
              (0, _chai.expect)(this.$('.item:nth-child(2)').hasClass('selected')).to.be['false'];
              (0, _chai.expect)(this.$('.item:nth-child(3)').hasClass('selected')).to.be['false'];

              //Choose the first
              context$3$0.next = 17;
              return regeneratorRuntime.awrap((0, _emberNativeDomHelpers.keyEvent)('input', 'keydown', 13));

            case 17:

              (0, _chai.expect)(this.get('changedTo')).to.equal(this.get('values')[1]);

              context$3$0.next = 20;
              return regeneratorRuntime.awrap((0, _emberNativeDomHelpers.click)('input'));

            case 20:
              context$3$0.next = 22;
              return regeneratorRuntime.awrap(new Promise(function (resolve) /* reject */{
                run.later(function (_) {
                  return resolve();
                }, 500);
              }));

            case 22:
              context$3$0.next = 24;
              return regeneratorRuntime.awrap((0, _emberNativeDomHelpers.keyEvent)('input', 'keydown', 40));

            case 24:
              context$3$0.next = 26;
              return regeneratorRuntime.awrap((0, _emberNativeDomHelpers.keyEvent)('input', 'keydown', 13));

            case 26:
              context$3$0.next = 28;
              return regeneratorRuntime.awrap(new Promise(function (resolve) /* reject */{
                run.later(function (_) {
                  return resolve();
                }, 10);
              }));

            case 28:

              (0, _chai.expect)(this.get('changedTo')).to.equal(this.get('values')[2]);

            case 29:
            case 'end':
              return context$3$0.stop();
          }
        }, null, this);
      });
    });

    (0, _mocha.describe)('The user can select then discard the selection using the keyboard', function () {
      (0, _mocha.it)('selects the second item then discards it with the escape key', function callee$2$0() {
        return regeneratorRuntime.async(function callee$2$0$(context$3$0) {
          var _this3 = this;

          while (1) switch (context$3$0.prev = context$3$0.next) {
            case 0:

              this.set('handleOnChange', function (_) {
                _this3.set('changedTo', _);
              });

              this.set('values', [{ id: 1, label: 'Foo' }, { id: 2, label: 'Bar' }, { id: 3, label: 'Baz' }]);

              this.set('value', this.get('values')[0]);

              this.render(_ember['default'].HTMLBars.template({
                'id': '2pdHvi5H',
                'block': '{"statements":[["append",["helper",["form-controls/model-select-control"],null,[["value","values","orderByLabel","onChange","direction"],[["get",["value"]],["get",["values"]],false,["helper",["action"],[["get",[null]],["get",["handleOnChange"]]],null],"downward"]]],false]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
                'meta': {}
              }));

              context$3$0.next = 6;
              return regeneratorRuntime.awrap((0, _emberNativeDomHelpers.click)('input'));

            case 6:
              context$3$0.next = 8;
              return regeneratorRuntime.awrap(new Promise(function (resolve) /* reject */{
                run.later(function (_) {
                  return resolve();
                }, 500);
              }));

            case 8:
              context$3$0.next = 10;
              return regeneratorRuntime.awrap((0, _emberNativeDomHelpers.keyEvent)('input', 'keydown', 40));

            case 10:
              context$3$0.next = 12;
              return regeneratorRuntime.awrap(new Promise(function (resolve) /* reject */{
                run.later(function (_) {
                  return resolve();
                }, 10);
              }));

            case 12:

              //Double check the state
              (0, _chai.expect)(this.$('.item:first').hasClass('selected')).to.be['true'];
              (0, _chai.expect)(this.$('.item:nth-child(2)').hasClass('selected')).to.be['false'];
              (0, _chai.expect)(this.$('.item:nth-child(3)').hasClass('selected')).to.be['false'];

              //Select the second
              context$3$0.next = 17;
              return regeneratorRuntime.awrap((0, _emberNativeDomHelpers.keyEvent)('input', 'keydown', 40));

            case 17:
              context$3$0.next = 19;
              return regeneratorRuntime.awrap(new Promise(function (resolve) /* reject */{
                run.later(function (_) {
                  return resolve();
                }, 10);
              }));

            case 19:

              //Double check
              (0, _chai.expect)(this.$('.item:first').hasClass('selected')).to.be['false'];
              (0, _chai.expect)(this.$('.item:nth-child(2)').hasClass('selected')).to.be['true'];
              (0, _chai.expect)(this.$('.item:nth-child(3)').hasClass('selected')).to.be['false'];

              //Discard
              context$3$0.next = 24;
              return regeneratorRuntime.awrap((0, _emberNativeDomHelpers.keyEvent)('input', 'keydown', 27));

            case 24:
              context$3$0.next = 26;
              return regeneratorRuntime.awrap(new Promise(function (resolve) /* reject */{
                run.later(function (_) {
                  return resolve();
                }, 10);
              }));

            case 26:

              //Dropdown text should reset to Foo
              (0, _chai.expect)(this.$('.text').text()).to.be.have.string('Foo');

              (0, _chai.expect)(this.get('changedTo')).to.equal(undefined);

            case 28:
            case 'end':
              return context$3$0.stop();
          }
        }, null, this);
      });

      (0, _mocha.it)('selects the second item then discards it with a blur on the input', function callee$2$0() {
        return regeneratorRuntime.async(function callee$2$0$(context$3$0) {
          var _this4 = this;

          while (1) switch (context$3$0.prev = context$3$0.next) {
            case 0:

              this.set('handleOnChange', function (_) {
                _this4.set('changedTo', _);
              });

              this.set('values', [{ id: 1, label: 'Foo' }, { id: 2, label: 'Bar' }, { id: 3, label: 'Baz' }]);

              this.set('value', this.get('values')[0]);

              this.render(_ember['default'].HTMLBars.template({
                'id': '2pdHvi5H',
                'block': '{"statements":[["append",["helper",["form-controls/model-select-control"],null,[["value","values","orderByLabel","onChange","direction"],[["get",["value"]],["get",["values"]],false,["helper",["action"],[["get",[null]],["get",["handleOnChange"]]],null],"downward"]]],false]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
                'meta': {}
              }));

              context$3$0.next = 6;
              return regeneratorRuntime.awrap((0, _emberNativeDomHelpers.click)('input'));

            case 6:
              context$3$0.next = 8;
              return regeneratorRuntime.awrap(new Promise(function (resolve) /* reject */{
                run.later(function (_) {
                  return resolve();
                }, 500);
              }));

            case 8:
              context$3$0.next = 10;
              return regeneratorRuntime.awrap((0, _emberNativeDomHelpers.keyEvent)('input', 'keydown', 40));

            case 10:
              context$3$0.next = 12;
              return regeneratorRuntime.awrap(new Promise(function (resolve) /* reject */{
                run.later(function (_) {
                  return resolve();
                }, 10);
              }));

            case 12:

              //Double check the state
              (0, _chai.expect)(this.$('.item:first').hasClass('selected')).to.be['true'];
              (0, _chai.expect)(this.$('.item:nth-child(2)').hasClass('selected')).to.be['false'];
              (0, _chai.expect)(this.$('.item:nth-child(3)').hasClass('selected')).to.be['false'];

              //Select the second
              context$3$0.next = 17;
              return regeneratorRuntime.awrap((0, _emberNativeDomHelpers.keyEvent)('input', 'keydown', 40));

            case 17:
              context$3$0.next = 19;
              return regeneratorRuntime.awrap(new Promise(function (resolve) /* reject */{
                run.later(function (_) {
                  return resolve();
                }, 10);
              }));

            case 19:

              //Double check
              (0, _chai.expect)(this.$('.item:first').hasClass('selected')).to.be['false'];
              (0, _chai.expect)(this.$('.item:nth-child(2)').hasClass('selected')).to.be['true'];
              (0, _chai.expect)(this.$('.item:nth-child(3)').hasClass('selected')).to.be['false'];

              //Discard
              context$3$0.next = 24;
              return regeneratorRuntime.awrap((0, _emberNativeDomHelpers.blur)('input'));

            case 24:
              context$3$0.next = 26;
              return regeneratorRuntime.awrap(new Promise(function (resolve) /* reject */{
                run.later(function (_) {
                  return resolve();
                }, 10);
              }));

            case 26:

              //Dropdown text should reset to Foo
              (0, _chai.expect)(this.$('.text').text()).to.be.have.string('Foo');
              (0, _chai.expect)(this.get('changedTo')).to.equal(undefined);

            case 28:
            case 'end':
              return context$3$0.stop();
          }
        }, null, this);
      });
    });
  });
});
/* jshint expr:true */

//Waits for the dropdown to completely open

//Waits for the dropdown to completely open

//Waits for the dropdown to completely open

//Waits for the dropdown to completely open

//Waits for the dropdown to completely open
define('star-fox/tests/integration/features/components/sf/controls/action-button/component-test', ['exports', 'chai', 'ember-mocha', 'mocha'], function (exports, _chai, _emberMocha, _mocha) {

  (0, _mocha.describe)('integration.features.components.sf.controls.action-button', function () {
    (0, _emberMocha.setupComponentTest)('sf/controls/action-button', {
      integration: true
    });

    (0, _mocha.it)('renders', function () {
      this.render(Ember.HTMLBars.template({
        'id': 'zXaDohRX',
        'block': '{"statements":[["append",["unknown",["sf/controls/action-button"]],false]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
        'meta': {}
      }));
      (0, _chai.expect)(this.$('.fde-controls-action-button')).to.be.ok;
    });

    (0, _mocha.it)('applies the name of a color as a class', function () {
      this.render(Ember.HTMLBars.template({
        'id': 'zckBb//Q',
        'block': '{"statements":[["append",["helper",["sf/controls/action-button"],null,[["color"],["teal"]]],false]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
        'meta': {}
      }));
      (0, _chai.expect)(this.$('.fde-controls-action-button').hasClass('teal')).to.be['true'];
    });
  });
});
/* jshint expr:true */
define('star-fox/tests/integration/features/components/sf/controls/date-buttons/component-test', ['exports', 'ember-mocha', 'mocha'], function (exports, _emberMocha, _mocha) {

  (0, _mocha.describe)('integration.features.components.sf.controls.date-buttons', function () {
    (0, _emberMocha.setupComponentTest)('sf/controls/date-buttons', {
      integration: true
    });
  });
});
/* jshint expr:true */
define('star-fox/tests/integration/features/components/sf/controls/dietary-tags-select/component-test', ['exports', 'ember-mocha', 'mocha'], function (exports, _emberMocha, _mocha) {

  (0, _mocha.describe)('integration.features.components.sf.controls.dietary-tags-select', function () {
    (0, _emberMocha.setupComponentTest)('sf/controls/dietary-tags-select', {
      integration: true
    });
  });
});
/* jshint expr:true */
define('star-fox/tests/integration/features/components/sf/controls/model-select/component-test', ['exports', 'chai', 'ember-mocha', 'mocha'], function (exports, _chai, _emberMocha, _mocha) {

  (0, _mocha.describe)('integration.features.components.sf.controls.model-select', function () {
    (0, _emberMocha.setupComponentTest)('sf/controls/model-select', {
      integration: true
    });

    (0, _mocha.it)('renders', function () {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      // Template block usage:
      // this.render(hbs`
      //   {{#sf/controls/model-select}}
      //     template content
      //   {{/sf/controls/model-select}}
      // `);
      this.render(Ember.HTMLBars.template({
        'id': 'cVioz/WP',
        'block': '{"statements":[["append",["unknown",["sf/controls/model-select"]],false]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
        'meta': {}
      }));

      (0, _chai.expect)(this.$()).to.have.length(1);
    });

    (0, _mocha.describe)('when the value is an array', function () {
      (0, _mocha.it)('adds a class named multiple', function () {
        this.setProperties({
          value: []
        });
        this.render(Ember.HTMLBars.template({
          'id': 'zJoTv+mh',
          'block': '{"statements":[["append",["helper",["sf/controls/model-select"],null,[["value"],[["get",["value"]]]]],false]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
          'meta': {}
        }));
        (0, _chai.expect)(this.$().find('.search').hasClass('multiple')).to.be['true'];
      });
    });

    (0, _mocha.describe)('when the value is not an array', function () {
      (0, _mocha.it)('has no class named multiple', function () {
        this.setProperties({
          value: { id: 1, name: 'burke' }
        });
        this.render(Ember.HTMLBars.template({
          'id': 'zJoTv+mh',
          'block': '{"statements":[["append",["helper",["sf/controls/model-select"],null,[["value"],[["get",["value"]]]]],false]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
          'meta': {}
        }));
        (0, _chai.expect)(this.$().find('.search').hasClass('multiple')).to.be['false'];
      });
    });
  });
});
/* jshint expr:true */
define('star-fox/tests/integration/features/components/sf/controls/pagination-control/component-test', ['exports', 'chai', 'ember-mocha', 'mocha'], function (exports, _chai, _emberMocha, _mocha) {

  (0, _mocha.describe)('integration.features.components.sf.controls.pagination-control', function () {
    (0, _emberMocha.setupComponentTest)('sf/controls/pagination-control', {
      integration: true
    });

    (0, _mocha.describe)('Basic Rendering', function () {

      (0, _mocha.it)('should render fewer than seven controls if there are fewer than 7 pages', function () {
        this.render(Ember.HTMLBars.template({
          'id': 'kLq+8a0F',
          'block': '{"statements":[["append",["helper",["sf/controls/pagination-control"],null,[["route","recordCount","pageLimit","pageOffset"],["foo",20,10,0]]],false]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
          'meta': {}
        }));
        (0, _chai.expect)(this.$('.--fde-pagination').length).to.equal(2);
      });

      (0, _mocha.it)('should render only seven controls if there are more than 7 pages', function () {
        this.render(Ember.HTMLBars.template({
          'id': 'I0XSa/Ga',
          'block': '{"statements":[["append",["helper",["sf/controls/pagination-control"],null,[["route","recordCount","pageLimit","pageOffset"],["foo",100,10,0]]],false]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
          'meta': {}
        }));
        (0, _chai.expect)(this.$('.--fde-pagination').length).to.equal(7);
      });

      (0, _mocha.it)('should hide itself when there are no pages', function () {
        this.render(Ember.HTMLBars.template({
          'id': '+ZOc0jxD',
          'block': '{"statements":[["append",["helper",["sf/controls/pagination-control"],null,[["route","recordCount","pageLimit","pageOffset"],["foo",5,10,0]]],false]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
          'meta': {}
        }));

        (0, _chai.expect)(this.$('--fde-pagination-control').length).to.equal(0);
      });
    });
  });
});
/* jshint expr:true */
define('star-fox/tests/integration/features/components/sf/controls/pagination-search-control/component-test', ['exports', 'chai', 'ember-mocha', 'mocha'], function (exports, _chai, _emberMocha, _mocha) {

  (0, _mocha.describe)('integration.features.components.sf.controls.pagination-search-control', function () {
    (0, _emberMocha.setupComponentTest)('sf/controls/pagination-search-control', {
      integration: true
    });

    (0, _mocha.describe)('Renders pagination subheader', function () {

      (0, _mocha.it)('should render Correct pagination subheader', function () {

        this.setProperties({
          pageLimit: 2,
          recordCount: 4,
          pageOffset: 0
        });

        this.render(Ember.HTMLBars.template({
          'id': '9bI1afIT',
          'block': '{"statements":[["append",["helper",["sf/controls/paginated-search-control"],null,[["recordCount","pageLimit","pageOffset","nameOfRecordType"],[["get",["recordCount"]],["get",["pageLimit"]],["get",["pageOffset"]],"messages"]]],false]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
          'meta': {}
        }));

        (0, _chai.expect)(this.$('.fde-paginated-search-control_subheader').text().trim()).to.equal("Listing 1-2 of 4 messages.");
      });
    });

    (0, _mocha.describe)('Update pagination', function (assert) {
      (0, _mocha.it)('should show the next page on clicking next button', function () {
        this.setProperties({
          pageLimit: 2,
          recordCount: 4,
          pageOffset: 0
        });

        this.set('testPaginationChange', function (pageOffset) {
          var expectedPageOffset = 2;
          assert.deepEqual(pageOffset, expectedPageOffset, 'submitted value is passed to external action');
        });

        this.render(Ember.HTMLBars.template({
          'id': '0fLVWcmA',
          'block': '{"statements":[["append",["helper",["sf/controls/paginated-search-control"],null,[["recordCount","pageLimit","pageOffset","onPaginationChange","nameOfRecordType"],[["get",["recordCount"]],["get",["pageLimit"]],["get",["pageOffset"]],["helper",["action"],[["get",[null]],["get",["testPaginationChange"]]],null],"messages"]]],false]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
          'meta': {}
        }));
      });
    });
  });
});
/* jshint expr:true */
define('star-fox/tests/integration/features/components/sf/controls/price-range-control/component-test', ['exports', 'ember', 'faker', 'chai', 'ember-mocha', 'mocha'], function (exports, _ember, _faker, _chai, _emberMocha, _mocha) {

  (0, _mocha.describe)('integration.features.components.controls.price-range', function () {
    (0, _emberMocha.setupComponentTest)('sf/controls/price-range', {
      integration: true
    });

    (0, _mocha.describe)('#render', function () {
      (0, _mocha.it)('renders the initial value', function () {
        var examplePrices = _ember['default'].Object.create({
          retailPrice: 10.00,
          restaurantPrice: 5.00,
          clientPrice: 20.00
        });

        var customLabel = _faker['default'].lorem.word();

        this.render(_ember['default'].HTMLBars.template({
          'id': 'O6j5uHNz',
          'block': '{"statements":[["append",["helper",["sf/controls/price-range"],null,[["retailPrice","restaurantPrice","clientPrice","retailPriceLabel","clientPercentage","restaurantPercentage","showRetailPrice","showRestaurantPrice","showClientPrice","disableRetailPrice","disableRestaurantPrice","disableClientPrice"],[["get",["examplePrices","retailPrice"]],["get",["examplePrices","restaurantPrice"]],["get",["examplePrices","clientPrice"]],["get",["retailPriceLabel"]],["get",["clientPercentage"]],["get",["restaurantPercentage"]],true,true,true,false,false,false]]],false]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
          'meta': {}
        }));

        this.setProperties({
          examplePrices: examplePrices,
          clientPercentage: 2,
          restaurantPercentage: 0.5,
          retailPriceLabel: customLabel
        });

        var $retailPriceField = this.$('.retail-price input');
        var $restaurantPriceField = this.$('.restaurant-price input');
        var $clientPriceField = this.$('.client-price input');

        var $retailPriceLabel = $(".retail-price label:contains(" + customLabel + ")");

        (0, _chai.expect)($retailPriceLabel).to.have.length(1);

        (0, _chai.expect)(parseInt($retailPriceField.val())).to.equal(this.get('examplePrices.retailPrice'));

        (0, _chai.expect)(parseInt($restaurantPriceField.val())).to.equal(this.get('examplePrices.restaurantPrice'));

        (0, _chai.expect)(parseInt($clientPriceField.val())).to.equal(this.get('examplePrices.clientPrice'));
      });

      (0, _mocha.it)('renders only the client control when configured', function () {
        var examplePrices = _ember['default'].Object.create({
          clientPrice: 10.00
        });

        this.render(_ember['default'].HTMLBars.template({
          'id': 'qwEKF5ND',
          'block': '{"statements":[["append",["helper",["sf/controls/price-range"],null,[["clientPrice","showClientPrice"],[["get",["examplePrices","clientPrice"]],true]]],false]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
          'meta': {}
        }));

        this.set('examplePrices', examplePrices);

        var $retailPriceField = this.$('.retail-price input');
        var $restaurantPriceField = this.$('.restaurant-price input');
        var $clientPriceField = this.$('.client-price input');

        (0, _chai.expect)($clientPriceField).to.have.length(1);
        (0, _chai.expect)($restaurantPriceField).to.have.length(0);
        (0, _chai.expect)($retailPriceField).to.have.length(0);
      });

      (0, _mocha.it)('renders disabled inputs when configured', function () {
        var examplePrices = _ember['default'].Object.create({
          retailPrice: 10.00,
          restaurantPrice: 5.00,
          clientPrice: 20.00
        });

        this.render(_ember['default'].HTMLBars.template({
          'id': 'KQ7fDUZY',
          'block': '{"statements":[["append",["helper",["sf/controls/price-range"],null,[["retailPrice","restaurantPrice","clientPrice","clientPercentage","restaurantPercentage","showRetailPrice","showRestaurantPrice","showClientPrice","disableRetailPrice","disableRestaurantPrice","disableClientPrice"],[["get",["examplePrices","retailPrice"]],["get",["examplePrices","restaurantPrice"]],["get",["examplePrices","clientPrice"]],["get",["clientPercentage"]],["get",["restaurantPercentage"]],true,true,true,false,true,true]]],false]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
          'meta': {}
        }));

        this.set('examplePrices', examplePrices);

        var $retailPriceField = this.$('.retail-price input');
        var $restaurantPriceField = this.$('.restaurant-price input');
        var $clientPriceField = this.$('.client-price input');

        var $disabledRetailPriceField = this.$('.retail-price.field.disabled');
        var $disabledRestaurantPriceField = this.$('.restaurant-price.field.disabled');
        var $disabledClientPriceField = this.$('.client-price.field.disabled');

        (0, _chai.expect)($retailPriceField).to.have.length(1);
        (0, _chai.expect)($restaurantPriceField).to.have.length(1);
        (0, _chai.expect)($clientPriceField).to.have.length(1);

        (0, _chai.expect)($disabledRetailPriceField).to.have.length(0);
        (0, _chai.expect)($disabledRestaurantPriceField).to.have.length(1);
        (0, _chai.expect)($disabledClientPriceField).to.have.length(1);
      });
    });

    (0, _mocha.it)('updates the value as expected', function (done) {
      var examplePrices = _ember['default'].Object.create({
        retailPrice: 5.00,
        restaurantPrice: 2.50,
        clientPrice: 10.00
      });

      this.set('examplePrices', examplePrices);

      this.set('onChange', function (values) {
        (0, _chai.expect)(values.restaurantPrice).to.equal(5..toFixed(2));

        (0, _chai.expect)(values.clientPrice).to.equal(20..toFixed(2));

        setTimeout(done(), 600);
      });

      this.setProperties({
        clientPercentage: 2,
        restaurantPercentage: 0.5,

        showRetailPrice: true,
        showRestaurantPrice: true,
        showClientPrice: true,

        disableRetailPrice: false,
        disableRestaurantPrice: true,
        disableClientPrice: true
      });

      this.render(_ember['default'].HTMLBars.template({
        'id': 'xfIliJmP',
        'block': '{"statements":[["append",["helper",["sf/controls/price-range"],null,[["retailPrice","restaurantPrice","clientPrice","clientPercentage","restaurantPercentage","showRetailPrice","showRestaurantPrice","showClientPrice","disableRetailPrice","disableRestaurantPrice","disableClientPrice","onChange"],[["get",["examplePrices","retailPrice"]],["get",["examplePrices","restaurantPrice"]],["get",["examplePrices","clientPrice"]],["get",["clientPercentage"]],["get",["restaurantPercentage"]],["get",["showRetailPrice"]],["get",["showRestaurantPrice"]],["get",["showClientPrice"]],["get",["disableRetailPrice"]],["get",["disableRestaurantPrice"]],["get",["disableClientPrice"]],["helper",["action"],[["get",[null]],["get",["onChange"]]],null]]]],false]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
        'meta': {}
      }));

      var $retailPriceField = this.$('.retail-price input');

      $retailPriceField.val(10.00);
      $retailPriceField.keyup();
    });
  });
});
/* jshint expr:true */
define('star-fox/tests/integration/features/components/sf/controls/time-select/component-test', ['exports', 'chai', 'ember-mocha', 'mocha'], function (exports, _chai, _emberMocha, _mocha) {

  (0, _mocha.describe)('integration.features.components.sf.controls.time-select', function () {
    (0, _emberMocha.setupComponentTest)('sf/controls/time-select', {
      integration: true
    });

    (0, _mocha.describe)('Rendering selectable options', function () {

      (0, _mocha.it)('should render 96 options with default start and end times', function () {
        this.render(Ember.HTMLBars.template({
          'id': 'XPIOHtxo',
          'block': '{"statements":[["append",["unknown",["sf/controls/time-select"]],false]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
          'meta': {}
        }));
        (0, _chai.expect)(this.$('.fde-time-select .fde-dropdown-menu').first().find('.item').length).to.equal(97);
      });
    });
  });
});
/* jshint expr:true */
define('star-fox/tests/integration/features/components/sf/controls/toggle-button/component-test', ['exports', 'chai', 'ember-mocha', 'mocha'], function (exports, _chai, _emberMocha, _mocha) {

  var componentWithAllValues = Ember.HTMLBars.template({
    'id': 'wxvyR0RB',
    'block': '{"statements":[["append",["helper",["sf/controls/toggle-button"],null,[["activeColor","inactiveColor","activeText","inactiveText","activeIcon","inactiveIcon","value","onToggle"],["active-color","inactive-color","ActiveText","InactiveText","active-icon","inactive-icon",["get",["value"]],["helper",["action"],[["get",[null]],["helper",["mut"],[["get",["value"]]],null]],null]]]],false]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
    'meta': {}
  });

  (0, _mocha.describe)('integration.sf.controls.toggle-button', function () {
    (0, _emberMocha.setupComponentTest)('sf/controls/toggle-button', {
      integration: true
    });

    (0, _mocha.it)('renders', function () {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      // Template block usage:
      // this.render(hbs`
      //   {{#sf/controls/model-select}}
      //     template content
      //   {{/sf/controls/model-select}}
      // `);

      this.render(Ember.HTMLBars.template({
        'id': 'h0f3eLym',
        'block': '{"statements":[["append",["unknown",["sf/controls/toggle-button"]],false]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
        'meta': {}
      }));
      (0, _chai.expect)(this.$()).to.have.length(1);
    });

    (0, _mocha.it)('sends the opposite value on click', function () {
      this.set('value', false);
      this.render(Ember.HTMLBars.template({
        'id': 'Cun5ycx1',
        'block': '{"statements":[["append",["helper",["sf/controls/toggle-button"],null,[["value","onToggle"],[["get",["value"]],["helper",["action"],[["get",[null]],["helper",["mut"],[["get",["value"]]],null]],null]]]],false]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
        'meta': {}
      }));

      (0, _chai.expect)(this.get('value')).to.be['false'];
      this.$('.button').trigger('click');
      (0, _chai.expect)(this.get('value')).to.be['true'];
    });

    (0, _mocha.describe)('when the value is false', function () {
      beforeEach(function () {
        this.set('value', false);
        this.render(componentWithAllValues);
      });

      (0, _mocha.it)('does not have an fde-is-selected class', function () {
        (0, _chai.expect)(this.$('.button').hasClass('.fde-is-selected')).to.be['false'];
      });

      (0, _mocha.it)('has all values for an inactive state', function () {
        var $btn = this.$('.button');
        (0, _chai.expect)($btn.find('i').hasClass('inactive-icon')).to.be['true'];
        (0, _chai.expect)($btn.text().match('InactiveText').length).to.equal(1);
        (0, _chai.expect)($btn.hasClass('inactive-color')).to.be['true'];
      });

      (0, _mocha.it)('has no values for an active state', function () {
        var $btn = this.$('.button');
        (0, _chai.expect)($btn.find('i').hasClass('active-icon')).to.be['false'];
        (0, _chai.expect)($btn.text().match('ActiveText')).to.be['null'];
        (0, _chai.expect)($btn.hasClass('active-color')).to.be['false'];
      });
    });

    (0, _mocha.describe)('when the value is true', function () {
      beforeEach(function () {
        this.set('value', true);
        this.render(componentWithAllValues);
      });

      (0, _mocha.it)('has an fde-is-selected class', function () {
        (0, _chai.expect)(this.$('.button').hasClass('fde-is-selected')).to.be['true'];
      });

      (0, _mocha.it)('has all values for an active state', function () {
        var $btn = this.$('.button');
        (0, _chai.expect)($btn.find('i').hasClass('active-icon')).to.be['true'];
        (0, _chai.expect)($btn.text().match('ActiveText').length).to.equal(1);
        (0, _chai.expect)($btn.hasClass('active-color')).to.be['true'];
      });

      (0, _mocha.it)('has no values for an inactive state', function () {
        var $btn = this.$('.button');
        (0, _chai.expect)($btn.find('i').hasClass('inactive-icon')).to.be['false'];
        (0, _chai.expect)($btn.text().match('InactiveText')).to.be['null'];
        (0, _chai.expect)($btn.hasClass('inactive-color')).to.be['false'];
      });
    });

    (0, _mocha.it)('does not have an icon class when there are more than icon values', function () {
      this.render(componentWithAllValues);
      (0, _chai.expect)(this.$('.button').hasClass('icon')).to.be['false'];
    });

    (0, _mocha.it)('has an icon class when there are only icon values', function () {
      this.render(Ember.HTMLBars.template({
        'id': '4vu3+CKu',
        'block': '{"statements":[["append",["helper",["sf/controls/toggle-button"],null,[["activeIcon","inactiveIcon","value","onToggle"],["active-icon","inactive-icon",["get",["value"]],["helper",["action"],[["get",[null]],["helper",["mut"],[["get",["value"]]],null]],null]]]],false]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
        'meta': {}
      }));
      (0, _chai.expect)(this.$('.button').hasClass('icon')).to.be['true'];
    });
  });
});
/* jshint expr:true */
define('star-fox/tests/integration/features/components/sf/dietary-tag/component-test', ['exports', 'faker', 'chai', 'ember-mocha', 'mocha'], function (exports, _faker, _chai, _emberMocha, _mocha) {

  (0, _mocha.describe)('integration.features.components.sf.dietary-tag', function () {
    (0, _emberMocha.setupComponentTest)('sf/dietary-tag', {
      integration: true
    });

    var dietaryType = undefined;
    var abbr = undefined;
    var color = undefined;
    var isSelected = undefined;
    var isSelectable = undefined;

    function setupTest(container) {
      container.setProperties({
        dietaryTag: {
          name: dietaryType,
          slug: dietaryType,
          abbreviation: abbr,
          text: abbr.toUpperCase(),
          color: color
        },
        isSelected: isSelected,
        isSelectable: isSelectable
      });
    }

    function $el(instance) {
      return instance.$().children().first();
    }

    (0, _mocha.beforeEach)(function () {
      dietaryType = _faker['default'].lorem.word();
      abbr = dietaryType.substring(0, 2);
      color = _faker['default'].internet.color();
      isSelected = true;
      isSelectable = true;
    });

    (0, _mocha.describe)('rendering', function () {
      (0, _mocha.beforeEach)(function () {
        setupTest(this);
        this.render(Ember.HTMLBars.template({
          'id': '8a675JWP',
          'block': '{"statements":[["append",["helper",["sf/dietary-tag"],null,[["value","isSelected","isSelectable"],[["get",["dietaryTag"]],["get",["isSelected"]],["get",["isSelectable"]]]]],false]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
          'meta': {}
        }));
      });

      (0, _mocha.it)('works', function () {
        (0, _chai.expect)($el(this)).to.have.length(1);
      });

      (0, _mocha.it)('has the proper abbreviation', function () {
        (0, _chai.expect)(this.$().html().includes(abbr.toUpperCase())).to.be['true'];
      });

      (0, _mocha.it)('has .fde-dietary-tag as a class', function () {
        (0, _chai.expect)($el(this).hasClass('fde-dietary-tag')).to.be['true'];
      });
    });

    (0, _mocha.describe)('when selected', function () {
      (0, _mocha.it)('has .fde-is-selected', function () {
        setupTest(this);

        this.render(Ember.HTMLBars.template({
          'id': '8a675JWP',
          'block': '{"statements":[["append",["helper",["sf/dietary-tag"],null,[["value","isSelected","isSelectable"],[["get",["dietaryTag"]],["get",["isSelected"]],["get",["isSelectable"]]]]],false]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
          'meta': {}
        }));

        (0, _chai.expect)($el(this).hasClass('fde-is-selected')).to.be['true'];
      });
    });

    (0, _mocha.describe)('when not selected', function () {
      (0, _mocha.it)('is missing .fde-is-selected', function () {
        setupTest(this, isSelected = false);

        this.render(Ember.HTMLBars.template({
          'id': '8a675JWP',
          'block': '{"statements":[["append",["helper",["sf/dietary-tag"],null,[["value","isSelected","isSelectable"],[["get",["dietaryTag"]],["get",["isSelected"]],["get",["isSelectable"]]]]],false]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
          'meta': {}
        }));

        (0, _chai.expect)($el(this).hasClass('fde-is-selected')).to.be['false'];
      });

      _mocha.it.skip('is clickable when selectable', function () {
        // TODO: Do we need to test for this case?
        // Is this more of an acceptance test?
      });

      _mocha.it.skip('is not clickable when not selectable', function () {
        // TODO: Do we need to test for this case?
        // Is this more of an acceptance test?
      });
    });
  });
});
/* jshint expr:true */
define('star-fox/tests/integration/features/components/sf/fields/dietary-tags-field/component-test', ['exports', 'faker', 'chai', 'ember-mocha', 'mocha'], function (exports, _faker, _chai, _emberMocha, _mocha) {

  (0, _mocha.describe)('integration.features.components.sf.fields.dietary-tags-field', function () {
    (0, _emberMocha.setupComponentTest)('sf/fields/dietary-tags-field', {
      integration: true
    });

    (0, _mocha.describe)('Dietary tags field', function () {
      var name = _faker['default'].lorem.word();
      var name2 = _faker['default'].lorem.word();
      var name3 = _faker['default'].lorem.word();

      function setup_test() {
        return {
          availableDietaryTags: [{
            name: name,
            slug: name,
            abbreviation: name.substring(0, 2),
            color: _faker['default'].internet.color()
          }, {
            name: name2,
            slug: name2,
            abbreviation: name2.substring(0, 2),
            color: _faker['default'].internet.color()
          }, {
            name: name3,
            slug: name3,
            abbreviation: name3.substring(0, 2),
            color: _faker['default'].internet.color()
          }]
        };
      }

      function set_properties(params, container) {
        container.setProperties({
          menuItem: {
            dietaryTags: [params.availableDietaryTags[0]]
          },

          availableDietaryTags: params.availableDietaryTags,

          errors: params.errors
        });
      }

      (0, _mocha.describe)('Basic Rendering', function () {
        (0, _mocha.it)('renders', function () {
          this.render(Ember.HTMLBars.template({
            'id': 'A6rVfAip',
            'block': '{"statements":[["append",["unknown",["sf/fields/dietary-tags-field"]],false]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
            'meta': {}
          }));

          var element = this.$().children();

          // it has proper class name and renders
          (0, _chai.expect)(element.hasClass('fde-dietary-tags-field')).to.be['true'];
        });

        (0, _mocha.it)('renders dietary tags', function () {
          var params = setup_test();
          set_properties(params, this /* container */);

          this.render(Ember.HTMLBars.template({
            'id': 'XyNUb8o4',
            'block': '{"statements":[["append",["helper",["sf/fields/dietary-tags-field"],null,[["model","key","values"],[["get",["menuItem"]],"dietaryTags",["get",["availableDietaryTags"]]]]],false]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
            'meta': {}
          }));

          var element = this.$().children();
          var dt = element.find('.fde-dietary-tag');

          // it renders proper number of dietary tags
          (0, _chai.expect)(dt.length).to.equal(params.availableDietaryTags.length);
        });
      });

      (0, _mocha.describe)('Basic functionality', function () {
        (0, _mocha.it)('returns a new value after a dietary tag has been clicked', function () {
          var _this = this;

          var params = setup_test();
          set_properties(params, this /* container */);

          this.set('updateDietaryTags', function (value) {
            // adding another dietaryTag to menuItem
            var dietaryTags = _this.get('menuItem.dietaryTags');

            value.forEach(function (element, index) {
              (0, _chai.expect)(element).to.equal(dietaryTags[index]);
            });
          });

          this.render(Ember.HTMLBars.template({
            'id': 'u/YF73Eg',
            'block': '{"statements":[["append",["helper",["sf/fields/dietary-tags-field"],null,[["model","key","values","handleChangeAndCommit"],[["get",["menuItem"]],"dietaryTags",["get",["availableDietaryTags"]],["helper",["action"],[["get",[null]],["get",["updateDietaryTags"]]],[["value"],[["get",["value"]]]]]]]],false]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
            'meta': {}
          }));

          var element = this.$().children();
          var dietaryTags = element.find('.fde-dietary-tag');

          // Just a bunch of really indecisive clicking
          dietaryTags[0].click();
          dietaryTags[0].click();
          dietaryTags[1].click();
          dietaryTags[2].click();
          dietaryTags[1].click();
        });

        (0, _mocha.it)('returns errors when something goes wrong', function (done) {
          var params = setup_test();
          var error = _faker['default'].lorem.sentence();
          set_properties(params, this /* container */);

          this.render(Ember.HTMLBars.template({
            'id': 'D7AldBPC',
            'block': '{"statements":[["append",["helper",["sf/fields/dietary-tags-field"],null,[["model","key","values","errors"],[["get",["menuItem"]],"dietaryTags",["get",["availableDietaryTags"]],["get",["errors"]]]]],false]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
            'meta': {}
          }));

          // no errors!
          (0, _chai.expect)(this.$('.--fde-field-errors').length).to.equal(0);

          this.setProperties({
            errors: [{ message: error }]
          });

          // errors!
          (0, _chai.expect)(this.$('.--fde-field-errors').text().trim()).to.equal(error);

          done();
        });
      });
    });
  });
});
/* jshint expr:true */
define('star-fox/tests/integration/features/components/sf/fields/input-field/component-test', ['exports', 'chai', 'ember-mocha', 'mocha', 'faker'], function (exports, _chai, _emberMocha, _mocha, _faker) {

  (0, _mocha.describe)('integration.features.components.sf.fields.input-field', function () {
    (0, _emberMocha.setupComponentTest)('sf/fields/input-field', {
      integration: true
    });

    (0, _mocha.describe)('Basic Rendering', function () {
      (0, _mocha.it)('renders value', function () {

        var value = 'Value: ' + _faker['default'].lorem.word();

        this.setProperties({
          foo: 'foo',
          bar: value
        });

        this.render(Ember.HTMLBars.template({
          'id': 'n6nav41W',
          'block': '{"statements":[["append",["helper",["sf/fields/input-field"],null,[["key","value"],[["get",["foo"]],["get",["bar"]]]]],false]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
          'meta': {}
        }));

        (0, _chai.expect)(this.$('.--fde-basic-display-value').text().trim()).to.equal(value);
      });

      (0, _mocha.it)('renders label', function () {
        var label = 'Label: ' + _faker['default'].lorem.word();

        this.setProperties({
          label: label
        });

        this.render(Ember.HTMLBars.template({
          'id': 'Hntm+1H3',
          'block': '{"statements":[["append",["helper",["sf/fields/input-field"],null,[["label"],[["get",["label"]]]]],false]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
          'meta': {}
        }));

        (0, _chai.expect)(this.$('label:first').text().trim()).to.equal(label);
      });

      (0, _mocha.it)('renders error message with the correct error style', function () {
        var error = 'Error: ' + _faker['default'].lorem.word();

        this.setProperties({
          errors: [{
            message: error
          }]
        });

        this.render(Ember.HTMLBars.template({
          'id': 'Ny2XBkGU',
          'block': '{"statements":[["append",["helper",["sf/fields/input-field"],null,[["errors"],[["get",["errors"]]]]],false]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
          'meta': {}
        }));

        (0, _chai.expect)(this.$('.--fde-field-errors').text().trim()).to.equal(error);
      });

      (0, _mocha.it)('renders its control when told to do so', function () {
        this.render(Ember.HTMLBars.template({
          'id': 'SOizh5PX',
          'block': '{"statements":[["append",["helper",["sf/fields/input-field"],null,[["isForm"],[true]]],false]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
          'meta': {}
        }));

        (0, _chai.expect)(this.$(':text').length).to.equal(1);
      });

      (0, _mocha.describe)('Input control icon', function () {

        // DESCRIBE Control icons rendered on either side of the input control ala semantic ui
        (0, _mocha.it)('renders a left icon if present with appropriate classes on the input', function () {
          this.render(Ember.HTMLBars.template({
            'id': '71hMwojG',
            'block': '{"statements":[["append",["helper",["sf/fields/input-field"],null,[["isForm","leftIcon"],[true,"foo"]]],false]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
            'meta': {}
          }));

          (0, _chai.expect)(this.$('.ui.input').attr('class')).to.match(/left icon/);

          (0, _chai.expect)(this.$('.foo.icon').length).to.equal(1);
        });

        (0, _mocha.it)('renders a right icon if present with appropriate classes on the input', function () {
          this.render(Ember.HTMLBars.template({
            'id': 'FMN2DJTU',
            'block': '{"statements":[["append",["helper",["sf/fields/input-field"],null,[["isForm","rightIcon"],[true,"foo"]]],false]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
            'meta': {}
          }));

          (0, _chai.expect)(this.$('.ui.input').attr('class')).to.match(/right icon/);

          (0, _chai.expect)(this.$('.foo.icon').length).to.equal(1);
        });
      });

      // DESCRIBE Control labels rendered on either side of the input control ala semantic ui

      (0, _mocha.describe)('Input control labels', function () {

        (0, _mocha.it)('renders a left label if present with appropriate classes on the input', function () {
          var label = 'Label: ' + _faker['default'].lorem.word();

          this.setProperties({
            label: label
          });

          this.render(Ember.HTMLBars.template({
            'id': 'Ry3XMHqu',
            'block': '{"statements":[["append",["helper",["sf/fields/input-field"],null,[["isForm","leftLabel"],[true,["get",["label"]]]]],false]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
            'meta': {}
          }));

          (0, _chai.expect)(this.$('.ui.labeled').attr('class')).to.match(/left labeled/);

          (0, _chai.expect)(this.$('.ui.label').text().trim()).to.equal(label);
        });

        (0, _mocha.it)('renders a right label if present with appropriate classes on the input', function () {

          var label = 'Label: ' + _faker['default'].lorem.word();

          this.setProperties({
            label: label
          });

          this.render(Ember.HTMLBars.template({
            'id': '0CWCT4uy',
            'block': '{"statements":[["append",["helper",["sf/fields/input-field"],null,[["isForm","rightLabel"],[true,["get",["label"]]]]],false]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
            'meta': {}
          }));

          (0, _chai.expect)(this.$('.ui.input').attr('class')).to.match(/right labeled/);

          (0, _chai.expect)(this.$('.ui.label').text().trim()).to.equal(label);
        });
      });
    });

    (0, _mocha.describe)('Basic Behavior', function () {
      (0, _mocha.it)('shows the control when clicked', function () {
        this.render(Ember.HTMLBars.template({
          'id': 'LAlzQ1KS',
          'block': '{"statements":[["append",["unknown",["sf/fields/input-field"]],false]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
          'meta': {}
        }));
        (0, _chai.expect)(this.$(':text').length).to.equal(0);

        this.$('.--fde-basic-display-value').trigger('click');

        (0, _chai.expect)(this.$(':text').length).to.equal(1);
      });
    });
  });
});
/* jshint expr:true */
define('star-fox/tests/integration/features/components/sf/fields/model-select-or-create/component-test', ['exports', 'chai', 'ember', 'ember-mocha', 'mocha'], function (exports, _chai, _ember, _emberMocha, _mocha) {
  var Object = _ember['default'].Object;
  var RSVP = _ember['default'].RSVP;
  var run = _ember['default'].run;

  (0, _mocha.describe)('integration.sf.fields.model-select-or-create-field', function () {
    (0, _emberMocha.setupComponentTest)('sf/fields/model-select-or-create-field', {
      integration: true
    });

    (0, _mocha.it)('renders', function () {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      // Template block usage:
      // this.render(hbs`
      //   {{#sf/fields/model-select-field}}
      //     template content
      //   {{/sf/fields/model-select-field}}
      // `);

      this.render(_ember['default'].HTMLBars.template({
        'id': '3BEnCRIC',
        'block': '{"statements":[["append",["unknown",["sf/fields/model-select-or-create-field"]],false]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
        'meta': {}
      }));
      (0, _chai.expect)(this.$()).to.have.length(1);
    });

    (0, _mocha.describe)('when the user clicks the plus button', function () {
      (0, _mocha.it)('it shows the form', function () {
        this.render(_ember['default'].HTMLBars.template({
          'id': 'Xf7K/AKr',
          'block': '{"statements":[["text","\\n"],["block",["sf/fields/model-select-or-create-field"],null,null,0]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","          "],["open-element","div",[]],["static-attr","class","foo-form"],["flush-element"],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
          'meta': {}
        }));
        this.$('.fde-model-select-or-create-field_simple-button-control .button').click();
        (0, _chai.expect)(this.$().find('.foo-form')).to.have.length(1);
      });
    });

    (0, _mocha.describe)('When customizes the component and user clicks save on a form', function () {
      (0, _mocha.beforeEach)(function () {
        var modelsForMsc = [{ id: 1, label: 'Foo' }, { id: 2, label: 'Bar' }, { id: 3, label: 'Baz' }].map(function (_) {
          return Object.create(_);
        });

        var model = Object.create({
          id: 4,

          label: "Your Mom",

          save: function save() {
            return RSVP.Promise.resolve(this);
          },

          validate: function validate() {
            return true;
          }
        });

        var mscField = {
          errors: [],
          value: Object.create({ id: 0, label: 'None' }),
          values: [Object.create({ id: 1, label: 'Foo' })]
        };

        this.setProperties({
          modelsForMsc: modelsForMsc,
          model: model,
          mscField: mscField
        });
      });

      (0, _mocha.it)('Automatically adds the new model to the list', function (done) {
        var _this = this;

        this.render(_ember['default'].HTMLBars.template({
          'id': 'pbNAKmmD',
          'block': '{"statements":[["text","\\n"],["block",["sf/fields/model-select-or-create-field"],null,[["key","value","errors","autoAddOnCreate","autoSelectOnCreate","hasNotFocused","label","values"],["value",["helper",["get"],[["get",[null]],"mscField.value"],null],["helper",["get"],[["get",[null]],"mscField.errors"],null],true,false,false,"Model Select Field with an option to add a model to it.",["helper",["get"],[["get",[null]],"modelsForMsc"],null]]],1],["text","      "]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","            "],["append",["helper",["f","text"],["label"],[["value"],[["helper",["get"],[["get",["model"]],"label"],null]]]],false],["text","\\n            "],["append",["helper",["f","save-button"],null,[["click"],[["helper",["action"],[["get",[null]],"save"],[["target"],[["get",["f","form"]]]]]]]],false],["text","\\n"]],"locals":["f"]},{"statements":[["block",["sf/form-for"],[["get",["model"]]],[["didSave"],[["helper",["action"],[["get",[null]],"handleDidSave",["get",["model"]]],[["target"],[["get",["msc"]]]]]]],0]],"locals":["msc"]}],"hasPartials":false}',
          'meta': {}
        }));

        this.$('.fde-model-select-or-create-field_simple-button-control .button').click();
        this.$('.button.save').click();
        run.next(function (_) {
          (0, _chai.expect)(_this.$().find('.item[data-value="4"]')).to.have.length(1);
          done();
        });
      });

      (0, _mocha.it)('Automatically adds the new model to the list and selects it', function (done) {
        var _this2 = this;

        this.set('handleOnCommit', function (key, value) {
          _this2.set('mscField.value', value);
        });

        this.render(_ember['default'].HTMLBars.template({
          'id': 'Z/W21dGB',
          'block': '{"statements":[["text","\\n"],["block",["sf/fields/model-select-or-create-field"],null,[["key","value","errors","autoAddOnCreate","autoSelectOnCreate","hasNotFocused","label","values","onCommit"],["value",["helper",["get"],[["get",[null]],"mscField.value"],null],["helper",["get"],[["get",[null]],"mscField.errors"],null],true,true,false,"Model Select Field with an option to add a model to it.",["helper",["get"],[["get",[null]],"modelsForMsc"],null],["helper",["action"],[["get",[null]],["get",["handleOnCommit"]]],null]]],1],["text","      "]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","            "],["append",["helper",["f","text"],["label"],[["value"],[["helper",["get"],[["get",["model"]],"label"],null]]]],false],["text","\\n            "],["append",["helper",["f","save-button"],null,[["click"],[["helper",["action"],[["get",[null]],"save"],[["target"],[["get",["f","form"]]]]]]]],false],["text","\\n"]],"locals":["f"]},{"statements":[["block",["sf/form-for"],[["get",["model"]]],[["didSave"],[["helper",["action"],[["get",[null]],"handleDidSave",["get",["model"]]],[["target"],[["get",["msc"]]]]]]],0]],"locals":["msc"]}],"hasPartials":false}',
          'meta': {}
        }));

        this.$('.fde-model-select-or-create-field_simple-button-control  .button').click();
        this.$('.--fde-basic-field-for__label input').val('FooBarBaz');
        this.$('.--fde-basic-field-for__label input').trigger('keyup');
        this.$('.button.save').click();

        //Takes another run loop to get the item to select
        run.next(function (_) {
          (0, _chai.expect)(_this2.$().find('.text:contains("FooBarBaz")')).to.have.length(1);
          done();
        });
      });

      (0, _mocha.it)('Automatically adds the new model and sends it through onCreate', function (done) {
        var _this3 = this;

        this.set('handleOnCreate', function (key, model) {
          (0, _chai.expect)(model).to.be.equal(_this3.get('model'));
          done();
        });

        this.render(_ember['default'].HTMLBars.template({
          'id': 'hMDlGlk2',
          'block': '{"statements":[["text","\\n"],["block",["sf/fields/model-select-or-create-field"],null,[["key","value","errors","autoAddOnCreate","autoSelectOnCreate","hasNotFocused","label","values","onCreate"],["value",["helper",["get"],[["get",[null]],"mscField.value"],null],["helper",["get"],[["get",[null]],"mscField.errors"],null],false,false,false,"Model Select Field with an option to add a model to it.",["helper",["get"],[["get",[null]],"modelsForMsc"],null],["helper",["action"],[["get",[null]],["get",["handleOnCreate"]]],null]]],1],["text","      "]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","            "],["append",["helper",["f","text"],["label"],[["value"],[["helper",["get"],[["get",["model"]],"label"],null]]]],false],["text","\\n            "],["append",["helper",["f","save-button"],null,[["click"],[["helper",["action"],[["get",[null]],"save"],[["target"],[["get",["f","form"]]]]]]]],false],["text","\\n"]],"locals":["f"]},{"statements":[["block",["sf/form-for"],[["get",["model"]]],[["didSave"],[["helper",["action"],[["get",[null]],"handleDidSave",["get",["model"]]],[["target"],[["get",["msc"]]]]]]],0]],"locals":["msc"]}],"hasPartials":false}',
          'meta': {}
        }));

        this.$('.fde-model-select-or-create-field_simple-button-control .button').click();
        this.$('--fde-text-field-for__object_label input').val('FooBarBaz');
        this.$('.button.save').click();
      });
    });
  });
});
/* jshint expr:true */
define('star-fox/tests/integration/features/components/sf/fields/model-select/component-test', ['exports', 'chai', 'ember-mocha', 'mocha'], function (exports, _chai, _emberMocha, _mocha) {

  (0, _mocha.describe)('integration.sf.fields.model-select-field', function () {
    (0, _emberMocha.setupComponentTest)('sf/fields/model-select-field', {
      integration: true
    });

    (0, _mocha.it)('renders', function () {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      // Template block usage:
      // this.render(hbs`
      //   {{#sf/fields/model-select-field}}
      //     template content
      //   {{/sf/fields/model-select-field}}
      // `);

      this.render(Ember.HTMLBars.template({
        'id': 'IrUDF3D9',
        'block': '{"statements":[["append",["unknown",["sf/fields/model-select-field"]],false]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
        'meta': {}
      }));
      (0, _chai.expect)(this.$()).to.have.length(1);
    });

    (0, _mocha.describe)('when the value is an array', function () {
      (0, _mocha.it)('adds a class named multiple', function () {
        this.setProperties({
          value: []
        });
        this.render(Ember.HTMLBars.template({
          'id': 'x6Fjvnl/',
          'block': '{"statements":[["append",["helper",["sf/fields/model-select-field"],null,[["value"],[["get",["value"]]]]],false]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
          'meta': {}
        }));
        (0, _chai.expect)(this.$().find('.search').hasClass('multiple')).to.be['true'];
      });
    });

    (0, _mocha.describe)('when the value is not an array', function () {
      (0, _mocha.it)('has no class named multiple', function () {
        this.setProperties({
          value: { id: 1, name: 'burke' }
        });
        this.render(Ember.HTMLBars.template({
          'id': 'x6Fjvnl/',
          'block': '{"statements":[["append",["helper",["sf/fields/model-select-field"],null,[["value"],[["get",["value"]]]]],false]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
          'meta': {}
        }));
        (0, _chai.expect)(this.$().find('.search').hasClass('multiple')).to.be['false'];
      });
    });
  });
});
/* jshint expr:true */
define('star-fox/tests/integration/features/components/sf/listed-order/component-test', ['exports', 'ember', 'faker', 'chai', 'ember-mocha', 'mocha'], function (exports, _ember, _faker, _chai, _emberMocha, _mocha) {

    (0, _mocha.describe)('integration.features.components.sf.listed-order', function () {
        (0, _emberMocha.setupComponentTest)('sf/listed-order', {
            integration: true
        });

        (0, _mocha.it)('renders', function () {
            var testOrder = _ember['default'].Object.create({
                deliverAt: new Date(),
                state: 'submitted',
                identifier: 'VAN-26',
                restaurantName: _faker['default'].lorem.word(),
                numberOfPeople: _faker['default'].random.number(),
                areaIsoTimeZone: 'America/Los_Angeles',
                totalAmount: _faker['default'].random.number(),
                flag: _faker['default'].random.boolean(),
                client: { accountName: 'Plumbus R\' Us' },
                contact: { name: 'Plumbus Master Jim' }
            });

            this.set('order', testOrder);

            this.render(_ember['default'].HTMLBars.template({
                'id': 'cQyuNRDU',
                'block': '{"statements":[["append",["helper",["sf/listed-order"],null,[["order"],[["get",["order"]]]]],false]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
                'meta': {}
            }));

            var $clientNameTd = $('td:contains(' + this.get('order.client.accountName') + ')');
            (0, _chai.expect)($clientNameTd).to.have.length(1);

            var $clientDeliveryContactTd = $('td:contains(' + this.get('order.contact.name') + ')');
            (0, _chai.expect)($clientDeliveryContactTd).to.have.length(1);
        });
    });
});
/* jshint expr:true */
define('star-fox/tests/integration/features/components/sf/logistics/courier-select/component-test', ['exports', 'chai', 'mocha', 'ember-mocha'], function (exports, _chai, _mocha, _emberMocha) {

  (0, _mocha.describe)('integration.features.components.sf.logistics.courier-select', function () {
    (0, _emberMocha.setupComponentTest)('sf/logistics/courier-select', {
      integration: true
    });

    (0, _mocha.it)('renders', function () {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      // Template block usage:
      // this.render(hbs`
      //   {{#sf-logistics-courier-select}}
      //     template content
      //   {{/sf-logistics-courier-select}}
      // `);

      this.render(Ember.HTMLBars.template({
        'id': 'wxnky9Os',
        'block': '{"statements":[["append",["unknown",["sf/logistics/courier-select"]],false]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
        'meta': {}
      }));
      (0, _chai.expect)(this.$()).to.have.length(1);
    });
  });
});
/* jshint expr:true */
define('star-fox/tests/integration/features/components/sf/logistics/date-select/component-test', ['exports', 'chai', 'mocha', 'ember-mocha'], function (exports, _chai, _mocha, _emberMocha) {

  (0, _mocha.describe)('integration.features.components.sf.logistics.date-select', function () {
    (0, _emberMocha.setupComponentTest)('sf/logistics/date-select', {
      integration: true
    });

    (0, _mocha.it)('renders', function () {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      // Template block usage:
      // this.render(hbs`
      //   {{#sf-logistics-date-select}}
      //     template content
      //   {{/sf-logistics-date-select}}
      // `);

      this.render(Ember.HTMLBars.template({
        'id': 'DyGsu4PY',
        'block': '{"statements":[["append",["unknown",["sf/logistics/date-select"]],false]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
        'meta': {}
      }));
      (0, _chai.expect)(this.$()).to.have.length(1);
    });
  });
});
/* jshint expr:true */
define('star-fox/tests/integration/features/components/sf/logistics/destination-table-cell/component-test', ['exports', 'chai', 'mocha', 'ember-mocha'], function (exports, _chai, _mocha, _emberMocha) {

  (0, _mocha.describe)('integration.features.components.sf.logistics.destination-table-cell', function () {
    (0, _emberMocha.setupComponentTest)('sf/logistics/destination-table-cell', {
      integration: true
    });

    (0, _mocha.it)('renders', function () {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      // Template block usage:
      // this.render(hbs`
      //   {{#sf-logistics-destination-table-cell}}
      //     template content
      //   {{/sf-logistics-destination-table-cell}}
      // `);

      this.render(Ember.HTMLBars.template({
        'id': 'sIz6zf4/',
        'block': '{"statements":[["append",["unknown",["sf/logistics/destination-table-cell"]],false]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
        'meta': {}
      }));
      (0, _chai.expect)(this.$()).to.have.length(1);
    });
  });
});
/* jshint expr:true */
define('star-fox/tests/integration/features/components/sf/logistics/driver-select/component-test', ['exports', 'chai', 'mocha', 'ember-mocha'], function (exports, _chai, _mocha, _emberMocha) {

  (0, _mocha.describe)('integration.features.components.sf.logistics.driver-select', function () {
    (0, _emberMocha.setupComponentTest)('sf/logistics/driver-select', {
      integration: true
    });

    (0, _mocha.it)('renders', function () {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      // Template block usage:
      // this.render(hbs`
      //   {{#sf/logistics/driver-select}}
      //     template content
      //   {{/sf/logistics/driver-select}}
      // `);

      this.render(Ember.HTMLBars.template({
        'id': '79HMcvBG',
        'block': '{"statements":[["append",["unknown",["sf/logistics/driver-select"]],false]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
        'meta': {}
      }));
      (0, _chai.expect)(this.$()).to.have.length(1);
    });
  });
});
/* jshint expr:true */
define('star-fox/tests/integration/features/components/sf/logistics/pickup-time-select/component-test', ['exports', 'chai', 'mocha', 'ember-mocha'], function (exports, _chai, _mocha, _emberMocha) {

  (0, _mocha.describe)('integration.features.components.sf.logistics.pickup-time-select', function () {
    (0, _emberMocha.setupComponentTest)('sf/logistics/pickup-time-select', {
      integration: true
    });

    (0, _mocha.it)('renders', function () {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      // Template block usage:
      // this.render(hbs`
      //   {{#sf/logistics/pickup-time-select}}
      //     template content
      //   {{/sf/logistics/pickup-time-select}}
      // `);

      this.render(Ember.HTMLBars.template({
        'id': 'qEMaMtCd',
        'block': '{"statements":[["append",["unknown",["sf/logistics/pickup-time-select"]],false]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
        'meta': {}
      }));
      (0, _chai.expect)(this.$()).to.have.length(1);
    });
  });
});
/* jshint expr:true */
define('star-fox/tests/integration/features/components/sf/logistics/price-table-cell/component-test', ['exports', 'chai', 'mocha', 'ember-mocha'], function (exports, _chai, _mocha, _emberMocha) {

  (0, _mocha.describe)('integration.features.components.sf.logistics.price-table-cell', function () {
    (0, _emberMocha.setupComponentTest)('sf/logistics/price-table-cell', {
      integration: true
    });

    (0, _mocha.it)('renders', function () {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      // Template block usage:
      // this.render(hbs`
      //   {{#sf/logistics/price-table-cell}}
      //     template content
      //   {{/sf/logistics/price-table-cell}}
      // `);

      this.render(Ember.HTMLBars.template({
        'id': 'X4PL70QI',
        'block': '{"statements":[["append",["unknown",["sf/logistics/price-table-cell"]],false]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
        'meta': {}
      }));
      (0, _chai.expect)(this.$()).to.have.length(1);
    });
  });
});
/* jshint expr:true */
define('star-fox/tests/integration/features/components/sf/logistics/progress-tracker/component-test', ['exports', 'chai', 'mocha', 'ember-mocha'], function (exports, _chai, _mocha, _emberMocha) {

  (0, _mocha.describe)('integration.features.components.sf.logistics.progress-tracker', function () {
    (0, _emberMocha.setupComponentTest)('sf/logistics/progress-tracker', {
      integration: true
    });

    (0, _mocha.it)('renders', function () {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      // Template block usage:
      // this.render(hbs`
      //   {{#sf/logistics/progress-tracker}}
      //     template content
      //   {{/sf/logistics/progress-tracker}}
      // `);

      this.render(Ember.HTMLBars.template({
        'id': 'J3DZURlz',
        'block': '{"statements":[["append",["unknown",["sf/logistics/progress-tracker"]],false]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
        'meta': {}
      }));
      (0, _chai.expect)(this.$()).to.have.length(1);
    });
  });
});
/* jshint expr:true */
define('star-fox/tests/integration/features/components/sf/logistics/stats-display/component-test', ['exports', 'chai', 'mocha', 'ember-mocha'], function (exports, _chai, _mocha, _emberMocha) {

  (0, _mocha.describe)('integration.features.components.sf.logistics.stats-display', function () {
    (0, _emberMocha.setupComponentTest)('sf/logistics/stats-display', {
      integration: true
    });

    (0, _mocha.it)('renders', function () {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      // Template block usage:
      // this.render(hbs`
      //   {{#sf/logistics/stats-display}}
      //     template content
      //   {{/sf/logistics/stats-display}}
      // `);

      this.render(Ember.HTMLBars.template({
        'id': 'rmrRofFd',
        'block': '{"statements":[["append",["unknown",["sf/logistics/stats-display"]],false]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
        'meta': {}
      }));
      (0, _chai.expect)(this.$()).to.have.length(1);
    });
  });
});
/* jshint expr:true */
define('star-fox/tests/integration/features/components/sf/menus/fields/menu-item-description-field/component-test', ['exports', 'ember', 'faker', 'chai', 'ember-mocha', 'mocha'], function (exports, _ember, _faker, _chai, _emberMocha, _mocha) {

	(0, _mocha.describe)('integration.features.components.sf.menus.fields.menu-item-description-field', function () {
		(0, _emberMocha.setupComponentTest)('sf/listed-order', {
			integration: true
		});

		(0, _mocha.describe)('when rendered with correct arguments', function () {
			(0, _mocha.it)('displays only description field by default', function () {
				this.render(_ember['default'].HTMLBars.template({
					'id': 'n6HvMJMj',
					'block': '{"statements":[["append",["unknown",["sf/menus/fields/menu-item-description-field"]],false]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
					'meta': {}
				}));

				this.$('.--fde-basic-display-value').trigger('click', function () {
					(0, _chai.expect)(this.$('.--fde-textarea-field-for__description').length.to.equal(1));

					(0, _chai.expect)(this.$('.--fde-textarea-field-for__internal-description').length.to.equal(0));
				});
			});

			(0, _mocha.it)('shows internal description input when link is clicked', function () {
				this.render(_ember['default'].HTMLBars.template({
					'id': 'n6HvMJMj',
					'block': '{"statements":[["append",["unknown",["sf/menus/fields/menu-item-description-field"]],false]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
					'meta': {}
				}));

				this.$('.--fde-basic-display-value').trigger('click', function () {
					(0, _chai.expect)(this.$('.--fde-textarea-field-for__internal-description').length.to.equal(0));

					this.$('a:contains("Internal Description")').trigger('click', function () {
						(0, _chai.expect)(this.$('.--fde-textarea-field-for__internal-description').length.to.equal(0));
					});
				});
			});

			(0, _mocha.it)('renders with correct content', function () {
				var testMenuItem = _ember['default'].Object.create({
					description: _faker['default'].lorem.sentence(),
					internalDescription: _faker['default'].lorem.sentence(),
					errors: _ember['default'].Object.create({})
				});

				this.render(_ember['default'].HTMLBars.template({
					'id': '2WF45QSo',
					'block': '{"statements":[["append",["helper",["sf/menus/fields/menu-item-description-field"],null,[["model"],[["get",["testMenuItem"]]]]],false]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
					'meta': {}
				}));

				this.set('testMenuItem', testMenuItem);

				this.$('.--fde-basic-display-value').trigger('click', function () {

					(0, _chai.expect)(this.$('.--fde-textarea-field-for__description textarea').val()).to.equal(this.get('testMenuItem.description'));

					(0, _chai.expect)(this.$('.--fde-textarea-field-for__internal-description textarea').val()).to.equal(this.get('testMenuItem.internalDescription'));
				});
			});
		});
	});
});
/* jshint expr:true */
define('star-fox/tests/integration/features/components/sf/orders/email-messages/component-test', ['exports', 'ember-data-factory-guy', 'chai', 'ember-mocha', 'mocha'], function (exports, _emberDataFactoryGuy, _chai, _emberMocha, _mocha) {
  // import Ember from 'ember';
  // import Faker from 'faker';
  // import moment from 'moment';

  (0, _mocha.describe)('integration.features.components.sf.orders.email-messages', function () {
    (0, _emberMocha.setupComponentTest)('sf/orders/email-messages', {
      integration: true
    });

    beforeEach(function () {
      (0, _emberDataFactoryGuy.manualSetup)(this.container);
    });

    (0, _mocha.it)('renders', function () {
      var testOrder = (0, _emberDataFactoryGuy.make)('order', 'withEmailMessages');

      this.setProperties({
        testOrder: testOrder
      });

      this.render(Ember.HTMLBars.template({
        'id': 'w8xo2tCU',
        'block': '{"statements":[["append",["helper",["sf/orders/email-messages"],null,[["order","clientEmailMessages"],[["get",["testOrder"]],["get",["testOrder","emailMessages"]]]]],false]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
        'meta': {}
      }));

      var $listedEmailMessageLabels = this.$('.fde-orders-email-messages_event-label');

      (0, _chai.expect)($listedEmailMessageLabels).to.have.length(2);
    });

    //I temporarily removed the email event code. It was throwing errors and may not have ever really worked.

    // it('Assigns event labels', function () {
    //
    //   let testOrder = Ember.Object.create({
    //     id: Faker.random.number(),
    //     clientEmailMessages: [
    //       Ember.Object.create({
    //         id: Faker.random.number(),
    //         message: Faker.lorem.sentence(),
    //         messageType: 'client',
    //         createdAt: moment(),
    //         lastEvent: Ember.Object.create({
    //           id: Faker.random.number(),
    //           eventName: 'click',
    //           eventTimestamp: moment()
    //         })
    //
    //       }),
    //       Ember.Object.create({
    //         id: Faker.random.number(),
    //         message: Faker.lorem.sentence(),
    //         messageType: 'client',
    //         createdAt: moment().subtract(2, 'days'),
    //         lastEvent: Ember.Object.create({
    //           id: Faker.random.number(),
    //           eventName: 'open',
    //           eventTimestamp: moment()
    //         })
    //
    //       })
    //     ]
    //   });
    //
    //   this.setProperties({
    //     testOrder
    //   });
    //
    //   this.render(hbs `{{sf/orders/email-messages order=testOrder clientEmailMessages=testOrder.emailMessages}}`);
    //
    //   const $mailEventLabels = this.$('.fde-orders-email-messages_event-label');
    //
    //   expect($mailEventLabels).to.have.length(2);
    //
    //   const $eventLabelForOpen = this.$(".fde-orders-email-messages_event-label:contains('open')");
    //   const $eventLabelForClick = this.$(".fde-orders-email-messages_event-label:contains('click')");
    //
    //   expect($eventLabelForOpen).to.have.length(1);
    //   expect($eventLabelForClick).to.have.length(1);
    //
    // });
  });
});
/* jshint expr:true */
define('star-fox/tests/integration/features/components/sf/orders/order-menu/component-test', ['exports', 'ember', 'chai', 'mocha', 'ember-mocha'], function (exports, _ember, _chai, _mocha, _emberMocha) {
  var Object = _ember['default'].Object;

  var setMenu = {};

  var MenuGroup = Object.extend({
    matches: function matches(requirement) {
      return (this.get('activeMenuItems') || []).toArray().some(function (_) {
        return _.matches(requirement);
      });
    }
  });

  var MenuItem = Object.extend({
    matches: function matches(requirement) {
      return !requirement || requirement.apply(this);
    }
  });

  // 1 internal menu group + 2 external menu groups with internal items (3 internal menu groups, total)
  // 4 internal menu items
  // 4 external menu groups
  // 7 external menu items
  var menu = Object.create({
    name: 'Joe\'s Donuts',
    menuGroups: [{
      name: 'Breakfast Burritos',
      description: 'Crispy potatoes, scrambled egg, vegetarian green chili and shredded lettuce.',
      internal: false,
      external: true,
      activeMenuItems: [{
        name: 'Applewood smoked bacon — large',
        description: 'Grain-fed ethically raised buttermilk donuts tossed in cane sugar.',
        clientPriceCents: '290',
        menuOptionGroups: []
      }, {
        name: 'Hatch Chili Chicken Sausage',
        description: 'Old fashioned hens slow cook roosters in a delicious Hatch chili sauce',
        clientPriceCents: '790',
        menuOptionGroups: []
      }, {
        name: 'Salad',
        description: 'You degenerate.',
        clientPriceCents: '9999',
        menuOptionGroups: []
      }, {
        name: 'Vanilla dog-nuts',
        description: 'Half dozen new age donuts tossed in vanilla sugar.',
        clientPriceCents: '820',
        menuOptionGroups: []
      }].map(function (_) {
        return MenuItem.create(_);
      })
    }, {
      name: 'Rodentia',
      description: 'A whole variety of arboreal, fossorial, or semiaquatic',
      internal: false,
      external: true,
      activeMenuItems: [{
        name: 'Trio of mice',
        description: 'Red, grey and white mice served cold with salsa fresco, raw as carpaccio and warm in a decadent 3-day mole sauce',
        clientPriceCents: '1490',
        menuOptionGroups: []
      }].map(function (_) {
        return MenuItem.create(_);
      })
    }, {
      name: 'Bones and miscellany',
      description: 'Tasty decadent marrow, lets enjoy the nectar',
      internal: false,
      external: true,
      activeMenuItems: [{
        name: 'Beef marrow',
        description: 'Chiffonade of herbs, oiled crostini and smoked vanilla salt',
        clientPriceCents: '890',
        menuOptionGroups: []
      }, {
        name: 'Cracked wing tips',
        description: 'Smashed and broken, seasoned and fried until crispy',
        clientPriceCents: '1290',
        menuOptionGroups: []
      }, {
        name: 'Meaty pork hock',
        description: 'Baked, covered in a smear of lemon grass and garlic — this is for gnawing at cartilage and meaty treasures',
        clientPriceCents: '1890',
        menuOptionGroups: []
      }].map(function (_) {
        return MenuItem.create(_);
      })
    }, {
      name: 'Barbiturates',
      description: 'From mild sedation to total anesthesia',
      internal: true,
      external: false,
      activeMenuItems: [{
        name: 'Codeine',
        description: 'Hush, there, there, hey now...',
        clientPriceCents: '1000',
        menuOptionGroups: []
      }, {
        name: 'Morphine',
        description: 'All natural typically found in a number of plants and animals',
        clientPriceCents: '1290',
        menuOptionGroups: []
      }, {
        name: 'Pholcodine',
        description: 'For those with a little after dinner cough',
        clientPriceCents: '990',
        menuOptionGroups: []
      }].map(function (_) {
        return MenuItem.create(_);
      })
    }].map(function (_) {
      return MenuGroup.create(_);
    })
  });

  var order = Object.create({ menu: menu });

  (0, _mocha.describe)('integration.features.components.sf.orders.order-menu', function () {
    (0, _emberMocha.setupComponentTest)('sf/orders/order-menu', {
      integration: true
    });

    (0, _mocha.describe)('Order page menu component', function () {
      function setupTest(testContainer) {
        testContainer.setProperties({
          order: order,
          orderMenu: menu,
          setMenu: setMenu
        });
      }

      (0, _mocha.describe)('basic rendering', function () {
        (0, _mocha.it)('renders', function () {
          setupTest(this);

          this.render(_ember['default'].HTMLBars.template({
            'id': 'Hme6McP3',
            'block': '{"statements":[["append",["helper",["sf/orders/order-menu"],null,[["order","orderMenu","setMenu","setMenuHasChanged","setMenuIsEmpty"],[["get",["order"]],["get",["orderMenu"]],["get",["setMenu"]],false,false]]],false]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
            'meta': {}
          }));

          var element = this.$().children();

          // it renders
          (0, _chai.expect)(element).to.have.length(1);
        });
      });

      (0, _mocha.describe)('tabs showing proper content', function () {
        (0, _mocha.it)('shows external items on "Menu" tab', function () {
          // 4 external menu groups
          // 7 external menu items
          setupTest(this);

          this.render(_ember['default'].HTMLBars.template({
            'id': 'lajAfBW3',
            'block': '{"statements":[["append",["helper",["sf/orders/order-menu"],null,[["order","orderMenu"],[["get",["order"]],["get",["orderMenu"]]]]],false]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
            'meta': {}
          }));

          var element = this.$().children();
          var tabs = $('a.item:contains("Menu")');
          var menuTab = tabs[0];

          menuTab.click();

          (0, _chai.expect)(element.find('.fde-order-menu-group-header').length).to.equal(3);

          (0, _chai.expect)(element.find('.fde-order-menu-group-item').length).to.equal(8);
        });

        (0, _mocha.it)('shows internal items on "Internal Menu" tab', function () {
          // 1 internal menu group + 2 external menu groups with internal items (3 internal menu groups, total)
          // 4 internal menu items
          setupTest(this);

          this.render(_ember['default'].HTMLBars.template({
            'id': 'lajAfBW3',
            'block': '{"statements":[["append",["helper",["sf/orders/order-menu"],null,[["order","orderMenu"],[["get",["order"]],["get",["orderMenu"]]]]],false]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
            'meta': {}
          }));

          var element = this.$().children();
          var tabs = $('a.item:contains("Menu")');
          var internalMenu = tabs[1];

          internalMenu.click();

          (0, _chai.expect)(element.find('.fde-order-menu-group-header').length).to.equal(1);

          (0, _chai.expect)(element.find('.fde-order-menu-group-item').length).to.equal(3);
        });
      });

      (0, _mocha.describe)('menu items', function () {
        (0, _mocha.it)('handles click event', function (done) {
          setupTest(this);

          this.set('handleClick', function () {
            done();
          });

          this.render(_ember['default'].HTMLBars.template({
            'id': 'M5a889tE',
            'block': '{"statements":[["append",["helper",["sf/orders/order-menu"],null,[["order","orderMenu","onMenuItemClick"],[["get",["order"]],["get",["orderMenu"]],["get",["handleClick"]]]]],false]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
            'meta': {}
          }));

          var element = this.$().children();
          var activeMenuItems = element.find('.fde-order-menu-group-item');

          activeMenuItems[0].click();
        });
      });
    });
  });
});
/* jshint expr:true */
define('star-fox/tests/integration/features/components/sf/orders/order-notes/component-test', ['exports', 'ember', 'faker', 'chai', 'mocha', 'ember-mocha'], function (exports, _ember, _faker, _chai, _mocha, _emberMocha) {

  (0, _mocha.describe)('integration.features.components.sf.orders.order-notes', function () {
    (0, _emberMocha.setupComponentTest)('sf/orders/order-notes', {
      integration: true
    });

    (0, _mocha.it)('renders', function () {
      var testOrder = _ember['default'].Object.create({
        clientNotes: _faker['default'].lorem.sentence(),
        courierNotes: _faker['default'].lorem.sentence(),
        accountingNotes: _faker['default'].lorem.sentence(),
        restaurantNotes: _faker['default'].lorem.sentence(),
        internalNotes: _faker['default'].lorem.sentence(),
        haiku: _faker['default'].lorem.sentence()
      });

      this.set('order', testOrder);

      this.render(_ember['default'].HTMLBars.template({
        'id': '6ps4ZmWz',
        'block': '{"statements":[["block",["sf/form-for"],[["get",["order"]]],null,0]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["append",["helper",["sf/orders/order-notes"],null,[["form"],[["get",["f"]]]]],false]],"locals":["f"]}],"hasPartials":false}',
        'meta': {}
      }));

      var $clientNotesField = this.$('.--fde-textarea-field-for__object_client-notes textarea');
      (0, _chai.expect)($clientNotesField.val()).to.equal(this.get('order.notes.clientNotes'));

      var $courierNotesField = this.$('.--fde-textarea-field-for__object_courier-notes textarea');
      (0, _chai.expect)($courierNotesField.val()).to.equal(this.get('order.notes.courierNotes'));

      var $accountingNotesField = this.$('.--fde-textarea-field-for__object_accounting-notes textarea');
      (0, _chai.expect)($accountingNotesField.val()).to.equal(this.get('order.notes.accountingNotes'));

      var $restaurantNotesField = this.$('.--fde-textarea-field-for__object_restaurant-notes textarea');
      (0, _chai.expect)($restaurantNotesField.val()).to.equal(this.get('order.notes.restaurantNotes'));

      var $internalNotesField = this.$('.--fde-textarea-field-for__object_internal-notes textarea');
      (0, _chai.expect)($internalNotesField.val()).to.equal(this.get('order.notes.internalNotes'));

      var $haikuField = this.$('.--fde-textarea-field-for__object_haiku textarea');
      (0, _chai.expect)($haikuField.val()).to.equal(this.get('order.notes.haiku'));
    });
  });
});
/* jshint expr:true */
define('star-fox/tests/integration/features/components/sf/orders/order-state-display/component-test', ['exports', 'chai', 'ember-mocha', 'mocha'], function (exports, _chai, _emberMocha, _mocha) {
	// FIXME: sf/listed-order is a funny name for this component
	// Should be sf/orders/order-state-display but I don't want to break anything
	(0, _mocha.describe)('integration.features.components.sf.orders.order-state-display', function () {
		(0, _emberMocha.setupComponentTest)('sf/listed-order', {
			integration: true
		});

		(0, _mocha.describe)('when rendered with correct arguments', function () {
			(0, _mocha.it)('displays only state badge when rendered with correct arguments', function () {
				this.render(Ember.HTMLBars.template({
					'id': 'kBWxNlxb',
					'block': '{"statements":[["append",["helper",["sf/orders/order-state-display"],null,[["showBullet","state"],[true,"submitted"]]],false]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
					'meta': {}
				}));

				var $submittedBadge = this.$('.fde-order-state-color_submitted .fde-order-state_bullet');
				var $submittedName = this.$('.fde-order-state-color_submitted .fde-order-state_name');
				var $submittedLabel = this.$('.fde-order-state-color_submitted .fde-order-state_label');

				(0, _chai.expect)($submittedBadge).to.have.length(1);
				(0, _chai.expect)($submittedName).to.have.length(0);
				(0, _chai.expect)($submittedLabel).to.have.length(0);
			});

			(0, _mocha.it)('displays all three displays when rendered with correct arguments', function () {
				this.render(Ember.HTMLBars.template({
					'id': 'OtmJewJJ',
					'block': '{"statements":[["append",["helper",["sf/orders/order-state-display"],null,[["showBullet","showName","showLabel","state"],[true,true,true,"submitted"]]],false]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
					'meta': {}
				}));

				var $submittedBadge = this.$('.fde-order-state-color_submitted .fde-order-state_bullet');
				var $submittedName = this.$('.fde-order-state-color_submitted .fde-order-state_name');
				var $submittedLabel = this.$('.fde-order-state-color_submitted .fde-order-state_label');

				(0, _chai.expect)($submittedBadge).to.have.length(1);
				(0, _chai.expect)($submittedName).to.have.length(1);
				(0, _chai.expect)($submittedLabel).to.have.length(1);
			});
		});
	});
});
/* jshint expr:true */
define('star-fox/tests/integration/features/components/sf/orders/restaurant-details/component-test', ['exports', 'ember-data-factory-guy', 'chai', 'ember-mocha', 'mocha'], function (exports, _emberDataFactoryGuy, _chai, _emberMocha, _mocha) {

  (0, _mocha.describe)('integration.features.components.sf.orders.restaurant-details', function () {
    (0, _emberMocha.setupComponentTest)('sf/orders', {
      integration: true
    });

    beforeEach(function () {
      (0, _emberDataFactoryGuy.manualSetup)(this.container);
    });

    (0, _mocha.it)('is alive', function () {
      var restaurant = (0, _emberDataFactoryGuy.make)('restaurant');
      (0, _chai.expect)(restaurant).to.be.ok;
    });

    (0, _mocha.it)('renders', function () {
      var order = (0, _emberDataFactoryGuy.make)('order');
      var restaurants = (0, _emberDataFactoryGuy.makeList)('restaurant', 3);

      this.setProperties({
        order: order,
        restaurants: restaurants
      });

      this.render(Ember.HTMLBars.template({
        'id': 'U+8hDltl',
        'block': '{"statements":[["text","\\n"],["block",["sf/form-for"],[["get",["order"]]],null,0],["text","          "]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","            "],["append",["helper",["sf/orders/restaurant-details"],null,[["form","restaurants"],[["get",["f"]],["get",["restaurants"]]]]],false],["text","\\n"]],"locals":["f"]}],"hasPartials":false}',
        'meta': {}
      }));

      var $restoDetailsColumn = this.$('.fde-half-width');
      (0, _chai.expect)($restoDetailsColumn).to.not.be['null'];
    });
  });
});
/* jshint expr:true */
define('star-fox/tests/integration/features/components/sf/orders/restaurant-details/service-times/component-test', ['exports', 'ember-data-factory-guy', 'chai', 'ember-mocha', 'mocha'], function (exports, _emberDataFactoryGuy, _chai, _emberMocha, _mocha) {

  (0, _mocha.describe)('integration.features.components.sf.orders.restaurant-details.service-times', function () {
    (0, _emberMocha.setupComponentTest)('sf/orders', {
      integration: true
    });

    beforeEach(function () {
      (0, _emberDataFactoryGuy.manualSetup)(this.container);
    });

    (0, _mocha.it)('is alive', function () {
      var serviceTime = (0, _emberDataFactoryGuy.make)('service-time');
      (0, _chai.expect)(serviceTime).to.be.ok;
    });

    (0, _mocha.it)('renders', function () {
      var serviceTimes = (0, _emberDataFactoryGuy.makeList)('service-time', 2);

      this.set('serviceTimes', serviceTimes);

      this.render(Ember.HTMLBars.template({
        'id': 'sWZlqIQL',
        'block': '{"statements":[["text","\\n      "],["append",["helper",["sf/orders/restaurant-details/service-times"],null,[["dayLabel","serviceTimes","showHoursOfOperation"],["S",["get",["serviceTimes"]],true]]],false],["text","\\n\\t\\t    "]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
        'meta': {}
      }));

      var $serviceTimeDay = this.$('.fde-service-times-day');
      (0, _chai.expect)($serviceTimeDay).to.have.length(1);
    });
  });
});
/* jshint expr:true */
define('star-fox/tests/integration/features/components/sf/simple-button/component-test', ['exports', 'chai', 'mocha', 'ember-mocha'], function (exports, _chai, _mocha, _emberMocha) {

  (0, _mocha.describe)('integration.features.components.sf.simple-button', function () {
    (0, _emberMocha.setupComponentTest)('sf/simple-button', {
      integration: true
    });

    (0, _mocha.it)('renders', function () {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      // Template block usage:
      // this.render(hbs`
      //   {{#sf/simple-button}}
      //     template contend
      //   {{/sf/simple-button}}
      // `);

      this.render(Ember.HTMLBars.template({
        'id': 'n4N7PTsl',
        'block': '{"statements":[["append",["unknown",["sf/simple-button"]],false]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
        'meta': {}
      }));
      (0, _chai.expect)(this.$()).to.have.length(1);
    });
  });
});
/* jshint expr:true */
define('star-fox/tests/integration/features/components/sf/tables/ordered-table/table-header/table-header-cell/component-test', ['exports', 'chai', 'ember-mocha', 'mocha', 'faker'], function (exports, _chai, _emberMocha, _mocha, _faker) {

  (0, _mocha.describe)('integration.components.sf.tables.ordered-table.table-header.table-header-cell', function () {
    (0, _emberMocha.setupComponentTest)('sf/tables/ordered-table/table-header/table-header-cell', {
      integration: true
    });

    (0, _mocha.describe)('Basic Rendering', function () {

      (0, _mocha.it)('renders provided in icon', function () {
        this.render(Ember.HTMLBars.template({
          'id': '7lDYiygr',
          'block': '{"statements":[["append",["helper",["sf/tables/ordered-table/table-header/table-header-cell"],null,[["key","icon"],["foo","foo"]]],false]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
          'meta': {}
        }));

        (0, _chai.expect)(this.$().html()).to.include('foo icon');
      });

      (0, _mocha.describe)('Sorting', function () {
        (0, _mocha.it)('renders no sort when not sorted', function () {
          this.render(Ember.HTMLBars.template({
            'id': '7lDYiygr',
            'block': '{"statements":[["append",["helper",["sf/tables/ordered-table/table-header/table-header-cell"],null,[["key","icon"],["foo","foo"]]],false]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
            'meta': {}
          }));

          (0, _chai.expect)(this.$().html()).not.to.include('up');
          (0, _chai.expect)(this.$().html()).not.to.include('down');
        });

        (0, _mocha.it)('renders up sort when sorted asc', function () {
          this.render(Ember.HTMLBars.template({
            'id': 'f+l8j2uE',
            'block': '{"statements":[["append",["helper",["sf/tables/ordered-table/table-header/table-header-cell"],null,[["key","canSort","sortByString"],["foo",true,"foo"]]],false]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
            'meta': {}
          }));

          (0, _chai.expect)(this.$().html()).to.include('sort up icon');
        });

        (0, _mocha.it)('renders down sort when sorted desc', function () {
          this.render(Ember.HTMLBars.template({
            'id': 'TagbDKdR',
            'block': '{"statements":[["append",["helper",["sf/tables/ordered-table/table-header/table-header-cell"],null,[["key","canSort","sortByString"],["foo",true,"-foo"]]],false]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
            'meta': {}
          }));

          (0, _chai.expect)(this.$().html()).to.include('sort down icon');
        });

        // TODO: come and figure out why these work locally and not in prod.
        //   describe('click', function () {
        //
        //     beforeEach(function () {
        //       this.set('onSortChange', (newSortString) => {
        //         this.set('newSortString', newSortString);
        //       });
        //     });
        //
        //     it('toggles from none to asc on click', function () {
        //       this.render(hbs`{{sf/tables/ordered-table/table-header/table-header-cell key='foo' canSort=true sortByString='' onSortChange=(action onSortChange) }}`);
        //
        //       this.$('.--fde-table-sort').click();
        //
        //       expect(this.get('newSortString'))
        //         .to.equal('foo');
        //     });
        //
        //     it('toggles from asc to desc on click', function () {
        //       this.render(hbs`{{sf/tables/ordered-table/table-header/table-header-cell key='foo' canSort=true sortByString='foo' onSortChange=(action onSortChange)}}`);
        //
        //       this.$('.--fde-table-sort').click();
        //
        //       expect(this.get('newSortString'))
        //         .to.equal('-foo');
        //     });
        //
        //     it('toggles from desc to none on click', function () {
        //       this.render(hbs`{{sf/tables/ordered-table/table-header/table-header-cell key='foo' canSort=true sortByString='-foo' onSortChange=(action onSortChange)}}`);
        //
        //       this.$('.--fde-table-sort').click();
        //
        //       expect(this.get('newSortString'))
        //         .to.equal('');
        //     });
        //   });
        // });

        (0, _mocha.describe)('Label Rendering', function () {
          (0, _mocha.it)('renders label as the capitalized key', function () {

            var key = _faker['default'].lorem.word();

            this.setProperties({
              key: key
            });

            this.render(Ember.HTMLBars.template({
              'id': '6zllzy7v',
              'block': '{"statements":[["append",["helper",["sf/tables/ordered-table/table-header/table-header-cell"],null,[["key"],[["get",["key"]]]]],false]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
              'meta': {}
            }));

            (0, _chai.expect)(this.$().text().trim()).to.equal(key.capitalize());
          });

          (0, _mocha.it)('renders passed in label', function () {

            var label = 'Label : ' + _faker['default'].lorem.word();

            this.setProperties({
              label: label
            });

            this.render(Ember.HTMLBars.template({
              'id': 'YcsWiapv',
              'block': '{"statements":[["append",["helper",["sf/tables/ordered-table/table-header/table-header-cell"],null,[["key","label"],["foo",["get",["label"]]]]],false]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
              'meta': {}
            }));

            (0, _chai.expect)(this.$().text().trim()).to.equal(label);
          });

          (0, _mocha.it)('renders no label when told not to', function () {

            var label = 'Label : ' + _faker['default'].lorem.word();

            this.setProperties({
              label: label
            });

            this.render(Ember.HTMLBars.template({
              'id': 'kGGJXO08',
              'block': '{"statements":[["append",["helper",["sf/tables/ordered-table/table-header/table-header-cell"],null,[["key","showLabel","label"],["foo",false,["get",["label"]]]]],false]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
              'meta': {}
            }));

            (0, _chai.expect)(this.$().text().trim()).to.equal('');
          });
        });
      });
    });
  });
});
/* jshint expr:true */
define('star-fox/tests/integration/features/components/sf/time-select-tz/component-test', ['exports', 'chai', 'mocha', 'ember-mocha'], function (exports, _chai, _mocha, _emberMocha) {

  (0, _mocha.describe)('integration.features.components.sf.time-select-tz', function () {
    (0, _emberMocha.setupComponentTest)('sf/time-select-tz', {
      integration: true
    });

    (0, _mocha.it)('renders', function () {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      // Template block usage:
      // this.render(hbs`
      //   {{#sf/time-select-tz}}
      //     template content
      //   {{/sf/time-select-tz}}
      // `);

      this.render(Ember.HTMLBars.template({
        'id': 'OsdIlG+N',
        'block': '{"statements":[["append",["unknown",["sf/time-select-tz"]],false]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
        'meta': {}
      }));
      (0, _chai.expect)(this.$()).to.have.length(1);
    });
  });
});
/* jshint expr:true */
define('star-fox/tests/integration/features/sf/controls/credit-card/component-test', ['exports', 'chai', 'mocha', 'ember-mocha'], function (exports, _chai, _mocha, _emberMocha) {

  (0, _mocha.describe)('integration.sf.controls.credit-card', function () {
    (0, _emberMocha.setupComponentTest)('sf/controls/credit-card', {
      integration: true
    });

    (0, _mocha.it)('renders', function () {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      // Template block usage:
      // this.render(hbs`
      //   {{#sf/controls/credit-card}}
      //     template content
      //   {{/sf/controls/credit-card}}
      // `);

      this.render(Ember.HTMLBars.template({
        'id': 'cfHCQUZO',
        'block': '{"statements":[["append",["unknown",["sf/controls/credit-card"]],false]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
        'meta': {}
      }));
      (0, _chai.expect)(this.$()).to.have.length(1);
    });
  });
});
/* jshint expr:true */
define('star-fox/tests/integration/features/sf/couriers/courier-row/component-test', ['exports', 'chai', 'mocha', 'ember-mocha'], function (exports, _chai, _mocha, _emberMocha) {

  (0, _mocha.describe)('integration.sf.couriers.courier-row-component', function () {
    (0, _emberMocha.setupComponentTest)('sf/couriers/courier-row', {
      integration: true
    });

    (0, _mocha.it)('renders', function () {
      this.render(Ember.HTMLBars.template({
        'id': 'Y09v9e0Y',
        'block': '{"statements":[["append",["unknown",["sf/couriers/courier-row"]],false]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
        'meta': {}
      }));
      (0, _chai.expect)(this.$()).to.have.length(1);
    });
  });
});
/* jshint expr:true */
define('star-fox/tests/integration/features/sf/fields/value-select-field/component-test', ['exports', 'chai', 'mocha', 'ember-mocha'], function (exports, _chai, _mocha, _emberMocha) {

  (0, _mocha.describe)('integration.sf.fields.value-select-field', function () {
    (0, _emberMocha.setupComponentTest)('sf/fields/value-select-field', {
      integration: true
    });

    (0, _mocha.it)('renders', function () {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      // Template block usage:
      // this.render(hbs`
      //   {{#sf/fields/value-select}}
      //     template content
      //   {{/sf/fields/value-select}}
      // `);

      this.render(Ember.HTMLBars.template({
        'id': 'GTb2phCx',
        'block': '{"statements":[["append",["unknown",["sf/fields/value-select-field"]],false]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
        'meta': {}
      }));
      (0, _chai.expect)(this.$()).to.have.length(1);
    });
  });
});
/* jshint expr:true */
define('star-fox/tests/integration/features/sf/form-for/inline-helper/component-test', ['exports', 'chai', 'mocha', 'ember-mocha'], function (exports, _chai, _mocha, _emberMocha) {

  (0, _mocha.describe)('integration.sf.form-for.inline-helper', function () {
    (0, _emberMocha.setupComponentTest)('sf/form-for/inline-helper', {
      integration: true
    });

    (0, _mocha.it)('renders', function () {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      // Template block usage:
      // this.render(hbs`
      //   {{#sf/form-for/inline-helper}}
      //     template content
      //   {{/sf/form-for/inline-helper}}
      // `);

      this.render(Ember.HTMLBars.template({
        'id': 'OkpvSrBK',
        'block': '{"statements":[["append",["unknown",["sf/form-for/inline-helper"]],false]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
        'meta': {}
      }));
      (0, _chai.expect)(this.$()).to.have.length(1);
    });
  });
});
/* jshint expr:true */
define('star-fox/tests/integration/features/sf/forms/location-form-for/component-test', ['exports', 'chai', 'mocha', 'ember-mocha', 'ember', 'ember-test-helpers/wait', 'star-fox/tests/acceptance/helpers/form-for-helpers'], function (exports, _chai, _mocha, _emberMocha, _ember, _emberTestHelpersWait, _starFoxTestsAcceptanceHelpersFormForHelpers) {

  var StubLocationService = _ember['default'].Service.extend({

    suggestPlaces: function suggestPlaces(_searchText) {
      return _ember['default'].RSVP.Promise.resolve([{
        country: 'ca',
        description: '1238 Seymour Street, Vancouver, BC, Canada',
        placeId: 'ChIJCQwzqtZzhlQRbm_BCNgw_fY'
      }]);
    },

    lookupAddressByPlaceId: function lookupAddressByPlaceId(placeId) {

      (0, _chai.expect)(placeId).to.equal('ChIJCQwzqtZzhlQRbm_BCNgw_fY');

      return _ember['default'].RSVP.Promise.resolve({
        building: '1238',
        street: 'Seymour Street',
        city: 'Vancouver',
        province: 'BC',
        country: 'CA',
        addressCode: 'V6B 6J3'
      });
    }

  });

  var StubStore = _ember['default'].Service.extend({

    query: function query(_record, _options) {
      return _ember['default'].RSVP.Promise.resolve([{}]);
    }

  });

  /**
   * These are pretty good examples of what not to do, but given the async interactions
   * I could think of a better way to make the tests work.
   *
   * We have two async interactions with LocationServices, which require timeout waits.
   *
   * Furthermore we set the components debounce time to 1 ms so the tests go quick.
   */
  (0, _mocha.describe)('integration.sf.forms.location-form-for', function () {
    (0, _emberMocha.setupComponentTest)('sf/forms/location-form-for', {
      integration: true
    });

    (0, _mocha.beforeEach)(function () {
      this.register('service:location', StubLocationService);
      this.register('service:store', StubStore);
    });

    (0, _mocha.it)('renders', function () {
      var location = _ember['default'].Object.create({});

      this.setProperties({
        location: location
      });

      this.render(_ember['default'].HTMLBars.template({
        'id': 'NBCWwH+s',
        'block': '{"statements":[["append",["helper",["sf/forms/location-form-for"],[["get",["location"]]],null],false]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
        'meta': {}
      }));
      (0, _chai.expect)(this.$()).to.have.length(1);
    });

    (0, _mocha.it)('displays a list of suggestions from the google places api', function (done) {
      var _this = this;

      var location = _ember['default'].Object.create({});

      this.setProperties({
        location: location
      });

      this.render(_ember['default'].HTMLBars.template({
        'id': 'N0Iwyctm',
        'block': '{"statements":[["append",["helper",["sf/forms/location-form-for"],[["get",["location"]]],[["debounceTime","searchText"],[1,"1238 Seymour Street"]]],false]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
        'meta': {}
      }));

      this.$('input').trigger('input');

      // It takes 500 ms before the callback fires
      setTimeout(function () {

        var item = _this.$('.ui.celled.selection .item').html();

        // check for the canadian flag flag
        (0, _chai.expect)(item).to.include('ca flag');

        // check for the actual address
        (0, _chai.expect)(item).to.include('1238 Seymour Street, Vancouver, BC, Canada');

        done();
      }, 10);
    });

    (0, _mocha.it)('selects the first place and fills in the form', function (done) {
      var _this2 = this;

      var location = _ember['default'].Object.create({});

      this.setProperties({
        location: location
      });

      this.render(_ember['default'].HTMLBars.template({
        'id': 'iJW7289Q',
        'block': '{"statements":[["append",["helper",["sf/forms/location-form-for"],[["get",["location"]]],[["debounceTime","searchText"],[0,"1238 Seymour Street"]]],false]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
        'meta': {}
      }));

      this.$('input').trigger('input');

      return (0, _emberTestHelpersWait['default'])().then(function (_) {
        var item = _this2.$('.ui.celled.selection .item');
        item.click();

        return (0, _emberTestHelpersWait['default'])().then(function (_) {

          var fieldVal = function fieldVal(attribute) {
            return _this2.$((0, _starFoxTestsAcceptanceHelpersFormForHelpers.fieldPath)('object', attribute) + ' input').val();
          };

          (0, _chai.expect)(fieldVal('building')).to.equal('1238');

          (0, _chai.expect)(fieldVal('street')).to.equal('Seymour Street');

          (0, _chai.expect)(fieldVal('city')).to.equal('Vancouver');

          (0, _chai.expect)(fieldVal('address-code')).to.equal('V6B 6J3');

          // verify the drop downs the selectors are set manually so don't run off the form for modelName
          // system which gives the fields above the names which include 'object'
          (0, _chai.expect)(_this2.$('.--fde-province-field-for__location_province .active.selected').text()).to.equal('British Columbia');

          (0, _chai.expect)(_this2.$('.--fde-country-field-for__location_country .active.selected').text().trim()).to.equal('Canada');

          done();
        });
      });
    });
  });
});
/* jshint expr:true */
define('star-fox/tests/integration/features/sf/orders/order-cart/custom-item-modal/component-test', ['exports', 'chai', 'mocha', 'ember-mocha'], function (exports, _chai, _mocha, _emberMocha) {

  (0, _mocha.describe)('integration.sf.orders.order-cart-custom-item-modal-component', function () {
    (0, _emberMocha.setupComponentTest)('sf/orders/order-cart/custom-item-modal', {
      integration: true
    });

    (0, _mocha.it)('renders', function () {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      // Template block usage:
      // this.render(hbs`
      //   {{#sf/orders/order-cart/custom-item-modal}}
      //     template content
      //   {{/sf/orders/order-cart/custom-item-modal}}
      // `);

      this.render(Ember.HTMLBars.template({
        'id': 'ZA3pcvd8',
        'block': '{"statements":[["append",["unknown",["sf/orders/order-cart/custom-item-modal"]],false]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
        'meta': {}
      }));
      (0, _chai.expect)(this.$()).to.have.length(1);
    });
  });
});
/* jshint expr:true */
define('star-fox/tests/page-object', ['exports', '@ember/application/deprecations', 'ember-cli-page-object'], function (exports, _emberApplicationDeprecations, _emberCliPageObject) {
  exports.alias = _emberCliPageObject.alias;
  exports.attribute = _emberCliPageObject.attribute;
  exports.clickOnText = _emberCliPageObject.clickOnText;
  exports.clickable = _emberCliPageObject.clickable;
  exports.collection = _emberCliPageObject.collection;
  exports.contains = _emberCliPageObject.contains;
  exports.count = _emberCliPageObject.count;
  exports.create = _emberCliPageObject.create;
  exports.fillable = _emberCliPageObject.fillable;
  exports.selectable = _emberCliPageObject.fillable;
  exports.focusable = _emberCliPageObject.focusable;
  exports.hasClass = _emberCliPageObject.hasClass;
  exports.is = _emberCliPageObject.is;
  exports.isHidden = _emberCliPageObject.isHidden;
  exports.isPresent = _emberCliPageObject.isPresent;
  exports.isVisible = _emberCliPageObject.isVisible;
  exports.notHasClass = _emberCliPageObject.notHasClass;
  exports.property = _emberCliPageObject.property;
  exports.text = _emberCliPageObject.text;
  exports.triggerable = _emberCliPageObject.triggerable;
  exports.value = _emberCliPageObject.value;
  exports.visitable = _emberCliPageObject.visitable;
  exports['default'] = {
    alias: _emberCliPageObject.alias,
    attribute: _emberCliPageObject.attribute,
    blurrable: _emberCliPageObject.blurrable,
    clickOnText: _emberCliPageObject.clickOnText,
    clickable: _emberCliPageObject.clickable,
    collection: _emberCliPageObject.collection,
    contains: _emberCliPageObject.contains,
    count: _emberCliPageObject.count,
    create: _emberCliPageObject.create,
    fillable: _emberCliPageObject.fillable,
    focusable: _emberCliPageObject.focusable,
    hasClass: _emberCliPageObject.hasClass,
    is: _emberCliPageObject.is,
    isHidden: _emberCliPageObject.isHidden,
    isPresent: _emberCliPageObject.isPresent,
    isVisible: _emberCliPageObject.isVisible,
    notHasClass: _emberCliPageObject.notHasClass,
    property: _emberCliPageObject.property,
    selectable: _emberCliPageObject.fillable,
    text: _emberCliPageObject.text,
    triggerable: _emberCliPageObject.triggerable,
    value: _emberCliPageObject.value,
    visitable: _emberCliPageObject.visitable
  };
  Object.defineProperty(exports, 'buildSelector', {
    enumerable: true,
    get: function get() {
      return _emberCliPageObject.buildSelector;
    }
  });
  Object.defineProperty(exports, 'findElementWithAssert', {
    enumerable: true,
    get: function get() {
      return _emberCliPageObject.findElementWithAssert;
    }
  });
  Object.defineProperty(exports, 'findElement', {
    enumerable: true,
    get: function get() {
      return _emberCliPageObject.findElement;
    }
  });
  Object.defineProperty(exports, 'getContext', {
    enumerable: true,
    get: function get() {
      return _emberCliPageObject.getContext;
    }
  });
  Object.defineProperty(exports, 'fullScope', {
    enumerable: true,
    get: function get() {
      return _emberCliPageObject.fullScope;
    }
  });

  (0, _emberApplicationDeprecations.deprecate)('Importing from "test-support" is now deprecated. Please import directly from the "ember-cli-page-object" module instead.', false, {
    id: 'ember-cli-page-object.import-from-test-support',
    until: "2.0.0",
    url: "https://gist.github.com/san650/17174e4b7b1fd80b049a47eb456a7cdc#file-import-from-test-support-js"
  });
});
define("star-fox/tests/template-deprecations-test", ["exports"], function (exports) {
  "use strict";
});
define('star-fox/tests/test-helper', ['exports', 'star-fox/tests/helpers/resolver', 'ember-mocha', 'mocha', 'ember-exam/test-support/load'], function (exports, _starFoxTestsHelpersResolver, _emberMocha, _mocha, _emberExamTestSupportLoad) {

  // test-helper.js
  (0, _emberExamTestSupportLoad['default'])();

  (0, _emberMocha.setResolver)(_starFoxTestsHelpersResolver['default']);

  _mocha.mocha.setup({
    "bail": true,
    "timeout": 10000
  });
});
define('star-fox/tests/tests.lint-test', ['exports'], function (exports) {
  'use strict';

  describe('ESLint | tests', function () {

    it('acceptance/add-courier-test.js', function () {
      // test passed
    });

    it('acceptance/areas-test.js', function () {
      // test passed
    });

    it('acceptance/bookmarks/index-test.js', function () {
      // test passed
    });

    it('acceptance/change-rewards-plan-test.js', function () {
      // test passed
    });

    it('acceptance/client-details-test.js', function () {
      // test passed
    });

    it('acceptance/client-index-test.js', function () {
      // test passed
    });

    it('acceptance/create-draft-order-test.js', function () {
      // test passed
    });

    it('acceptance/create-meal-plan-order-test.js', function () {
      // test passed
    });

    it('acceptance/dev-team-test.js', function () {
      // test passed
    });

    it('acceptance/dietary-tags-test.js', function () {
      // test passed
    });

    it('acceptance/duplicate-order-test.js', function () {
      // test passed
    });

    it('acceptance/edit-meal-plan-order-test.js', function () {
      // test passed
    });

    it('acceptance/edit-regular-order-notes-test.js', function () {
      // test passed
    });

    it('acceptance/edit-regular-order-payment-details-test.js', function () {
      // test passed
    });

    it('acceptance/edit-regular-order-test.js', function () {
      // test passed
    });

    it('acceptance/edit-team-order-test.js', function () {
      // test passed
    });

    it('acceptance/helpers/component-helpers.js', function () {
      // test passed
    });

    it('acceptance/helpers/form-for-helpers.js', function () {
      // test passed
    });

    it('acceptance/helpers/form-helpers.js', function () {
      // test passed
    });

    it('acceptance/helpers/login.js', function () {
      // test passed
    });

    it('acceptance/helpers/pages/logistics.js', function () {
      // test passed
    });

    it('acceptance/helpers/pages/order-edit.js', function () {
      // test passed
    });

    it('acceptance/helpers/team-order-helpers.js', function () {
      // test passed
    });

    it('acceptance/login-test.js', function () {
      // test passed
    });

    it('acceptance/logistics-test.js', function () {
      // test passed
    });

    it('acceptance/meal-plan-order-cart-test.js', function () {
      // test passed
    });

    it('acceptance/menu-editor-test.js', function () {
      // test passed
    });

    it('acceptance/order-cart-test.js', function () {
      // test passed
    });

    it('acceptance/order-states/order-states-happy-path-test.js', function () {
      // test passed
    });

    it('acceptance/order-states/order-states-negative-path-test.js', function () {
      // test passed
    });

    it('acceptance/profile-test.js', function () {
      // test passed
    });

    it('acceptance/promo-codes-test.js', function () {
      // test passed
    });

    it('acceptance/restaurant-closure-test.js', function () {
      // test passed
    });

    it('acceptance/restaurant-details-locations-test.js', function () {
      // test passed
    });

    it('acceptance/restaurant-details-test.js', function () {
      // test passed
    });

    it('acceptance/restaurant-tags-test.js', function () {
      // test passed
    });

    it('acceptance/set-menu-meal-plan-order-test.js', function () {
      // test passed
    });

    it('acceptance/set-menu-team-order-test.js', function () {
      // test passed
    });

    it('acceptance/tax-rate-test.js', function () {
      // test passed
    });

    it('acceptance/user-details-test.js', function () {
      // test passed
    });

    it('blanket-options.js', function () {
      // test passed
    });

    it('factories/area.js', function () {
      // test passed
    });

    it('factories/client.js', function () {
      // test passed
    });

    it('factories/dietary-tag.js', function () {
      // test passed
    });

    it('factories/email-message.js', function () {
      // test passed
    });

    it('factories/event.js', function () {
      // test passed
    });

    it('factories/group-order-member.js', function () {
      // test passed
    });

    it('factories/meal-planning-reservation.js', function () {
      // test passed
    });

    it('factories/menu-item.js', function () {
      // test passed
    });

    it('factories/menu-option-group.js', function () {
      // test passed
    });

    it('factories/menu-option-item.js', function () {
      // test passed
    });

    it('factories/order-item.js', function () {
      // test passed
    });

    it('factories/order.js', function () {
      // test passed
    });

    it('factories/restaurant.js', function () {
      // test passed
    });

    it('factories/service-time.js', function () {
      // test passed
    });

    it('factories/user.js', function () {
      // test passed
    });

    it('helpers/destroy-app.js', function () {
      // test passed
    });

    it('helpers/module-for-acceptance.js', function () {
      // test passed
    });

    it('helpers/resolver.js', function () {
      // test passed
    });

    it('helpers/start-app.js', function () {
      // test passed
    });

    it('integration/components/sf/simple-button/component-test.js', function () {
      // test passed
    });

    it('integration/features/components/form-controls/model-select-control/component-test.js', function () {
      // test passed
    });

    it('integration/features/components/sf/controls/action-button/component-test.js', function () {
      // test passed
    });

    it('integration/features/components/sf/controls/date-buttons/component-test.js', function () {
      // test passed
    });

    it('integration/features/components/sf/controls/dietary-tags-select/component-test.js', function () {
      // test passed
    });

    it('integration/features/components/sf/controls/model-select/component-test.js', function () {
      // test passed
    });

    it('integration/features/components/sf/controls/pagination-control/component-test.js', function () {
      // test passed
    });

    it('integration/features/components/sf/controls/pagination-search-control/component-test.js', function () {
      // test passed
    });

    it('integration/features/components/sf/controls/price-range-control/component-test.js', function () {
      // test passed
    });

    it('integration/features/components/sf/controls/time-select/component-test.js', function () {
      // test passed
    });

    it('integration/features/components/sf/controls/toggle-button/component-test.js', function () {
      // test passed
    });

    it('integration/features/components/sf/dietary-tag/component-test.js', function () {
      // test passed
    });

    it('integration/features/components/sf/fields/dietary-tags-field/component-test.js', function () {
      // test passed
    });

    it('integration/features/components/sf/fields/input-field/component-test.js', function () {
      // test passed
    });

    it('integration/features/components/sf/fields/model-select-or-create/component-test.js', function () {
      // test passed
    });

    it('integration/features/components/sf/fields/model-select/component-test.js', function () {
      // test passed
    });

    it('integration/features/components/sf/listed-order/component-test.js', function () {
      // test passed
    });

    it('integration/features/components/sf/logistics/courier-select/component-test.js', function () {
      // test passed
    });

    it('integration/features/components/sf/logistics/date-select/component-test.js', function () {
      // test passed
    });

    it('integration/features/components/sf/logistics/destination-table-cell/component-test.js', function () {
      // test passed
    });

    it('integration/features/components/sf/logistics/driver-select/component-test.js', function () {
      // test passed
    });

    it('integration/features/components/sf/logistics/pickup-time-select/component-test.js', function () {
      // test passed
    });

    it('integration/features/components/sf/logistics/price-table-cell/component-test.js', function () {
      // test passed
    });

    it('integration/features/components/sf/logistics/progress-tracker/component-test.js', function () {
      // test passed
    });

    it('integration/features/components/sf/logistics/stats-display/component-test.js', function () {
      // test passed
    });

    it('integration/features/components/sf/menus/fields/menu-item-description-field/component-test.js', function () {
      // test passed
    });

    it('integration/features/components/sf/orders/email-messages/component-test.js', function () {
      // test passed
    });

    it('integration/features/components/sf/orders/order-menu/component-test.js', function () {
      // test passed
    });

    it('integration/features/components/sf/orders/order-notes/component-test.js', function () {
      // test passed
    });

    it('integration/features/components/sf/orders/order-state-display/component-test.js', function () {
      // test passed
    });

    it('integration/features/components/sf/orders/restaurant-details/component-test.js', function () {
      // test passed
    });

    it('integration/features/components/sf/orders/restaurant-details/service-times/component-test.js', function () {
      // test passed
    });

    it('integration/features/components/sf/simple-button/component-test.js', function () {
      // test passed
    });

    it('integration/features/components/sf/tables/ordered-table/table-header/table-header-cell/component-test.js', function () {
      // test passed
    });

    it('integration/features/components/sf/time-select-tz/component-test.js', function () {
      // test passed
    });

    it('integration/features/sf/controls/credit-card/component-test.js', function () {
      // test passed
    });

    it('integration/features/sf/couriers/courier-row/component-test.js', function () {
      // test passed
    });

    it('integration/features/sf/fields/value-select-field/component-test.js', function () {
      // test passed
    });

    it('integration/features/sf/form-for/inline-helper/component-test.js', function () {
      // test passed
    });

    it('integration/features/sf/forms/location-form-for/component-test.js', function () {
      // test passed
    });

    it('integration/features/sf/orders/order-cart/custom-item-modal/component-test.js', function () {
      // test passed
    });

    it('test-helper.js', function () {
      // test passed
    });

    it('unit/features/logged-in/orders/edit/cart/controller-test.js', function () {
      // test passed
    });

    it('unit/features/logged-in/orders/edit/route-test.js', function () {
      // test passed
    });

    it('unit/features/logged-in/orders/route-test.js', function () {
      // test passed
    });

    it('unit/helpers/fde-query-params-test.js', function () {
      // test passed
    });

    it('unit/helpers/format-snake-case-test.js', function () {
      // test passed
    });

    it('unit/helpers/formatted-date-range-test.js', function () {
      // test passed
    });

    it('unit/helpers/formatted-date-test.js', function () {
      // test passed
    });

    it('unit/helpers/not-test.js', function () {
      // test passed
    });

    it('unit/helpers/or-value-test.js', function () {
      // test passed
    });

    it('unit/models/fragments/meal-planning/day-test.js', function () {
      // test passed
    });

    it('unit/models/fragments/meal-planning/slot-test.js', function () {
      // test passed
    });

    it('unit/models/meal-planning-reservation-test.js', function () {
      // test passed
    });

    it('unit/models/menu-item-test.js', function () {
      // test passed
    });

    it('unit/models/menu-option-group-test.js', function () {
      // test passed
    });

    it('unit/models/order-test.js', function () {
      // test passed
    });

    it('unit/models/payment-card-test.js', function () {
      // test passed
    });

    it('unit/models/user-test.js', function () {
      // test passed
    });

    it('unit/services/location-test.js', function () {
      // test passed
    });

    it('unit/services/loggers/log-entries-logger-test.js', function () {
      // test passed
    });

    it('unit/services/loggers/manager-test.js', function () {
      // test passed
    });

    it('unit/services/mock-card-service-test.js', function () {
      // test passed
    });

    it('unit/services/modal-test.js', function () {
      // test passed
    });

    it('unit/services/set-menu-service-test.js', function () {
      // test passed
    });

    it('unit/supports/filters/filter-collection-test.js', function () {
      // test passed
    });

    it('unit/supports/filters/filter-test.js', function () {
      // test passed
    });

    it('unit/transforms/time-test.js', function () {
      // test passed
    });

    it('unit/utils/order-item-options-test.js', function () {
      // test passed
    });

    it('unit/utils/url-test.js', function () {
      // test passed
    });
  });
});
define('star-fox/tests/unit/features/logged-in/orders/edit/cart/controller-test', ['exports', 'chai', 'ember', 'ember-data-factory-guy', 'mocha', 'ember-mocha'], function (exports, _chai, _ember, _emberDataFactoryGuy, _mocha, _emberMocha) {
  var run = _ember['default'].run;

  (0, _mocha.describe)('LoggedInOrdersEditCartController', function () {
    (0, _emberMocha.setupTest)('controller:logged-in/orders/edit/cart', {
      // Specify the other units that are required for this test.
      needs: ['service:notify', 'service:modal', 'model:menu-item', 'model:order', 'model:dietary-tag', 'model:order-item', 'model:restaurant', 'model:group-order-member', 'model:service-time', 'model:user']
    });

    (0, _mocha.beforeEach)(function () {
      (0, _emberDataFactoryGuy.manualSetup)(this.subject().container);
      var controller = this.subject();
      var menuItem = (0, _emberDataFactoryGuy.make)('menu-item');

      var orderItem = (0, _emberDataFactoryGuy.make)('order-item', {
        menuItem: menuItem,
        quantity: 1
      });

      var model = {
        order: (0, _emberDataFactoryGuy.make)('order', {
          orderItems: [orderItem]
        })
      };

      controller.setProperties({
        model: model,
        orderItem: orderItem,
        menuItem: menuItem
      });
    });

    (0, _mocha.describe)('#handleMenuItemClick', function () {
      (0, _mocha.beforeEach)(function () {
        var controller = this.subject();
        controller.setProperties({
          increaseOrderItem: sinon.spy(),
          _locateOrderItem: sinon.stub(),
          createOrderItem: sinon.spy(),
          'notify.alert': sinon.spy()
        });
      });

      (0, _mocha.describe)('for group orders', function () {
        (0, _mocha.beforeEach)(function () {
          var controller = this.subject();

          run.next(function () {
            controller.setProperties({
              'order.isGroupOrder': true
            });
          });
        });

        (0, _mocha.it)('warns if selectedGroupOrderMember is not set', function (done) {
          var _this = this;

          run.next(function () {
            var controller = _this.subject();
            var notifyAlert = controller.get('notify.alert');

            (0, _chai.expect)(notifyAlert.calledOnce).to.be['false'];
            controller.send('handleMenuItemClick', controller.get('menuItem'));
            (0, _chai.expect)(notifyAlert.calledOnce).to.be['true'];
            done();
          });
        });

        (0, _mocha.it)('can call #createOrderItem if there is a selectedGroupOrderMember', function (done) {
          var _this2 = this;

          run.next(function () {
            var controller = _this2.subject();
            var createOrderItem = controller.get('createOrderItem');
            controller.set('selectedGroupOrderMember', (0, _emberDataFactoryGuy.make)('group-order-member'));

            run.later(function (_) {
              (0, _chai.expect)(createOrderItem.calledOnce).to.be['false'];
              controller.send('handleMenuItemClick', controller.get('menuItem'));
              (0, _chai.expect)(createOrderItem.calledOnce).to.be['true'];
              done();
            });
          });
        });
      });

      (0, _mocha.it)('will not call #createOrderItem if it finds an OrderItem', function () {
        var controller = this.subject();
        var orderItem = controller.get('orderItem');

        var _controller$getProperties = controller.getProperties('_locateOrderItem', 'createOrderItem', 'increaseOrderItem', 'menuItem', 'order');

        var _locateOrderItem = _controller$getProperties._locateOrderItem;
        var createOrderItem = _controller$getProperties.createOrderItem;
        var menuItem = _controller$getProperties.menuItem;
        var increaseOrderItem = _controller$getProperties.increaseOrderItem;

        _locateOrderItem.withArgs(menuItem.get('id')).returns(orderItem);

        (0, _chai.expect)(_locateOrderItem.calledOnce).to.be['false'];
        (0, _chai.expect)(increaseOrderItem.calledOnce).to.be['false'];
        controller.send('handleMenuItemClick', controller.get('menuItem'));
        (0, _chai.expect)(_locateOrderItem.calledOnce).to.be['true'];
        (0, _chai.expect)(increaseOrderItem.calledOnce).to.be['true'];
        (0, _chai.expect)(createOrderItem.calledOnce).to.be['false'];
      });

      (0, _mocha.it)('calls #createOrderItem if no pre existing OrderItem is found', function () {
        var controller = this.subject();
        var createOrderItem = controller.get('createOrderItem');

        (0, _chai.expect)(createOrderItem.calledOnce).to.be['false'];
        controller.send('handleMenuItemClick', controller.get('menuItem'));
        (0, _chai.expect)(createOrderItem.calledOnce).to.be['true'];
      });
    });
  });
});
/* jshint expr:true */
/* globals sinon */
define('star-fox/tests/unit/features/logged-in/orders/edit/route-test', ['exports', 'chai', 'mocha', 'ember-mocha'], function (exports, _chai, _mocha, _emberMocha) {

  (0, _mocha.describe)('LoggedInOrdersEditRoute', function () {
    (0, _emberMocha.setupTest)('route:logged-in/orders/edit', {
      // Specify the other units that are required for this test.
      // needs: ['controller:foo']
    });

    (0, _mocha.it)('exists', function () {
      var route = this.subject();
      (0, _chai.expect)(route).to.be.ok;
    });
  });
});
/* jshint expr:true */
define('star-fox/tests/unit/features/logged-in/orders/route-test', ['exports', 'chai', 'mocha', 'ember-mocha'], function (exports, _chai, _mocha, _emberMocha) {

  (0, _mocha.describe)('LoggedInOrdersRoute', function () {
    (0, _emberMocha.setupTest)('route:logged-in/orders', {
      // Specify the other units that are required for this test.
      // needs: ['controller:foo']
    });

    (0, _mocha.it)('exists', function () {
      var route = this.subject();
      (0, _chai.expect)(route).to.be.ok;
    });
  });
});
/* jshint expr:true */
define('star-fox/tests/unit/helpers/fde-query-params-test', ['exports', 'chai', 'mocha', 'star-fox/helpers/fde-query-params'], function (exports, _chai, _mocha, _starFoxHelpersFdeQueryParams) {

  (0, _mocha.describe)('FdeQueryParams', function () {

    (0, _mocha.it)('converts positional params correctly', function () {

      var result = (0, _starFoxHelpersFdeQueryParams.fdeQueryParams)(['foo', 'bar', 'baz', 'qux']);

      (0, _chai.expect)(result.get('isQueryParams')).to.equal(true);

      (0, _chai.expect)(result.values.foo).to.equal('bar');

      (0, _chai.expect)(result.values.baz).to.equal('qux');
    });
  });
});
/* jshint expr:true */
define('star-fox/tests/unit/helpers/format-snake-case-test', ['exports', 'chai', 'mocha', 'star-fox/helpers/titleize-snake-case'], function (exports, _chai, _mocha, _starFoxHelpersTitleizeSnakeCase) {

  (0, _mocha.describe)('TitleizeSnakeCase', function () {
    (0, _mocha.it)('formats a given string correctly', function () {

      (0, _chai.expect)((0, _starFoxHelpersTitleizeSnakeCase.TitleizeSnakeCase)(['client_confirmation'])).to.equal('Client Confirmation');
    });
  });
});
/* jshint expr:true */
define('star-fox/tests/unit/helpers/formatted-date-range-test', ['exports', 'chai', 'mocha', 'star-fox/helpers/formatted-date-range', 'moment'], function (exports, _chai, _mocha, _starFoxHelpersFormattedDateRange, _moment) {

  (0, _mocha.describe)('FormattedDateRangeHelper', function () {
    // Replace this with your real tests.
    (0, _mocha.it)('should format with the default format value', function () {
      var arg = (0, _moment['default'])();
      var arg2 = (0, _moment['default'])();

      (0, _chai.expect)((0, _starFoxHelpersFormattedDateRange.formattedDateRange)([arg, arg2])).to.equal('From \'' + arg.format('lll') + '\' to \'' + arg2.format('lll') + '\'');
    });

    (0, _mocha.it)('should format with a provided format', function () {
      var arg = (0, _moment['default'])();
      var arg2 = (0, _moment['default'])();

      (0, _chai.expect)((0, _starFoxHelpersFormattedDateRange.formattedDateRange)([arg, arg2, 'MM'])).to.equal('From \'' + arg.format('MM') + '\' to \'' + arg2.format('MM') + '\'');
    });
  });
});
/* jshint expr:true */
define('star-fox/tests/unit/helpers/formatted-date-test', ['exports', 'chai', 'mocha', 'star-fox/helpers/formatted-date', 'moment'], function (exports, _chai, _mocha, _starFoxHelpersFormattedDate, _moment) {

  (0, _mocha.describe)('FormattedDateHelper', function () {
    (0, _mocha.it)('format with the provided value', function () {
      var arg = (0, _moment['default'])();

      (0, _chai.expect)((0, _starFoxHelpersFormattedDate.formattedDate)([(0, _moment['default'])(), 'MM'])).to.equal(arg.format('MM'));
    });

    (0, _mocha.it)('format with the format value default value', function () {
      var arg = (0, _moment['default'])();

      (0, _chai.expect)((0, _starFoxHelpersFormattedDate.formattedDate)([arg])).to.equal(arg.format('lll'));
    });
  });
});
/* jshint expr:true */
define('star-fox/tests/unit/helpers/not-test', ['exports', 'chai', 'mocha', 'star-fox/helpers/not'], function (exports, _chai, _mocha, _starFoxHelpersNot) {

  (0, _mocha.describe)('NotHelper', function () {

    (0, _mocha.it)('negates a null', function () {
      (0, _chai.expect)((0, _starFoxHelpersNot.not)([null])).to.equal(true);
    });

    (0, _mocha.it)('negates an undefined', function () {
      (0, _chai.expect)((0, _starFoxHelpersNot.not)([undefined])).to.equal(true);
    });

    (0, _mocha.it)('negates a boolean', function () {
      (0, _chai.expect)((0, _starFoxHelpersNot.not)([true])).to.equal(false);
      (0, _chai.expect)((0, _starFoxHelpersNot.not)([false])).to.equal(true);
    });

    (0, _mocha.it)('negates a string', function () {
      (0, _chai.expect)((0, _starFoxHelpersNot.not)([''])).to.equal(true);
      (0, _chai.expect)((0, _starFoxHelpersNot.not)(['foo'])).to.equal(false);
    });

    (0, _mocha.it)('negates a number', function () {
      (0, _chai.expect)((0, _starFoxHelpersNot.not)([0])).to.equal(true);
      (0, _chai.expect)((0, _starFoxHelpersNot.not)([1])).to.equal(false);
    });
  });
});
/* jshint expr:true */
define('star-fox/tests/unit/helpers/or-value-test', ['exports', 'chai', 'mocha', 'star-fox/helpers/or-value'], function (exports, _chai, _mocha, _starFoxHelpersOrValue) {

  (0, _mocha.describe)('OrValueHelper', function () {
    (0, _mocha.it)('should return the default value if the first is falsey', function () {
      (0, _chai.expect)((0, _starFoxHelpersOrValue.orValue)([null, 42])).to.equal(42);
    });

    (0, _mocha.it)('should return value when provided', function () {
      (0, _chai.expect)((0, _starFoxHelpersOrValue.orValue)([42, 43])).to.equal(42);
    });
  });
});
/* jshint expr:true */
define('star-fox/tests/unit/models/fragments/meal-planning/day-test', ['exports', 'ember', 'mocha', 'chai', 'ember-mocha', 'ember-data-factory-guy', 'star-fox/models/meal-planning-reservation'], function (exports, _ember, _mocha, _chai, _emberMocha, _emberDataFactoryGuy, _starFoxModelsMealPlanningReservation) {
  var getOwner = _ember['default'].getOwner;

  (0, _mocha.describe)('ModelTest.fragments.meal-planning.day', function () {
    (0, _emberMocha.setupModelTest)('fragments/meal-planning/day', {
      needs: ['model:fragments/meal-planning/meal', 'model:fragments/meal-planning/slot', 'model:meal-planning-reservation', 'model:delivery-location', 'model:contact', 'model:order', 'model:fragments/contact', 'model:fragments/location']
    });

    var rejected = null;
    var converted = null;
    var confirmed = null;

    var contact = null;
    var location = null;

    (0, _mocha.beforeEach)(function () {
      (0, _emberDataFactoryGuy.manualSetup)(getOwner(this));

      rejected = _emberDataFactoryGuy['default'].make('meal-planning-reservation', { state: _starFoxModelsMealPlanningReservation.States.REJECTED });
      converted = _emberDataFactoryGuy['default'].make('meal-planning-reservation', { state: _starFoxModelsMealPlanningReservation.States.CONVERTED });
      confirmed = _emberDataFactoryGuy['default'].make('meal-planning-reservation', { state: _starFoxModelsMealPlanningReservation.States.CONFIRMED });

      contact = { id: 1, copy: function copy() {
          return { id: 1 };
        } };
      location = { id: 1, copy: function copy() {
          return { id: 1 };
        } };
    });

    (0, _mocha.it)('lets you add and remove meals', function () {
      var day = this.subject();
      var meal = day.addMeal(1, contact, location);

      (0, _chai.expect)(day.get('meals.length')).to.equal(1);

      day.removeMeal(meal);

      (0, _chai.expect)(day.get('meals.length')).to.equal(0);
    });

    (0, _mocha.it)('holds a maximum of four meals', function () {
      var day = this.subject();
      day.addMeal(1, contact, location);
      day.addMeal(1, contact, location);
      day.addMeal(1, contact, location);
      (0, _chai.expect)(day.get('canAddMeal')).to.equal(true);
      day.addMeal(1, contact, location);
      (0, _chai.expect)(day.get('canAddMeal')).to.equal(false);
    });

    (0, _mocha.it)('collects all of its meal\'s slots', function () {
      var day = this.subject({
        meals: [{ slots: [{}, {}] }, { slots: [{}, {}] }]
      });
      (0, _chai.expect)(day.get('slotCount')).to.equal(4);
      day.addMeal(2, contact, location, 2);
      (0, _chai.expect)(day.get('slotCount')).to.equal(6);
    });

    (0, _mocha.it)('reports as rejected if any slots are rejected', function () {

      var day = this.subject();

      (0, _chai.expect)(day.get('hasRejected')).to.equal(false);

      day = this.subject();
      var meal = day.addMeal(1, contact, location);
      meal.addSlot({ reservationId: rejected.id });
      meal.addSlot({ reservationId: converted.id });

      (0, _chai.expect)(day.get('hasRejected')).to.equal(true);
    });

    (0, _mocha.it)('reports as converted if all slots are converted', function () {
      var day = this.subject();
      var meal = day.addMeal(1, contact, location);

      (0, _chai.expect)(day.get('isConverted')).to.equal(false, 'With not slots');

      meal.set('slots.firstObject.reservationId', converted.id);
      (0, _chai.expect)(day.get('isConverted')).to.equal(true, 'With one converted slot');

      meal.addSlot({ reservationId: rejected.id });
      (0, _chai.expect)(day.get('isConverted')).to.equal(false, 'With one rejected slot');
    });

    (0, _mocha.it)('reports as confirmed if all slots are confirmed', function () {
      var day = this.subject();
      var meal = day.addMeal(1, contact, location);
      (0, _chai.expect)(day.get('isConfirmed')).to.equal(false);

      meal.set('slots.firstObject.reservationId', confirmed.id);
      (0, _chai.expect)(day.get('isConfirmed')).to.equal(true);

      meal.addSlot({ reservationId: rejected.id });
      (0, _chai.expect)(day.get('isConfirmed')).to.equal(false);
    });
  });
});
define('star-fox/tests/unit/models/fragments/meal-planning/slot-test', ['exports', 'ember', 'mocha', 'ember-mocha', 'star-fox/models/meal-planning-reservation', 'ember-data-factory-guy', 'chai'], function (exports, _ember, _mocha, _emberMocha, _starFoxModelsMealPlanningReservation, _emberDataFactoryGuy, _chai) {
  var getOwner = _ember['default'].getOwner;

  (0, _mocha.describe)('ModelTest.fragments.meal-planning.slot', function () {

    (0, _emberMocha.setupModelTest)('fragments/meal-planning/slot', {
      needs: ['model:meal-planning-reservation']
    });

    (0, _mocha.beforeEach)(function () {
      (0, _emberDataFactoryGuy.manualSetup)(getOwner(this));
    });

    (0, _mocha.it)('fetches its reservation based on its id', function () {
      var s = this.subject();
      (0, _chai.expect)(s.get('reservation')).to.equal(null);

      s.set('reservationId', 1);
      (0, _chai.expect)(s.get('reservation')).to.equal(null);

      var reservation = _emberDataFactoryGuy['default'].make('meal-planning-reservation');

      s.set('reservationId', reservation.id);
      (0, _chai.expect)(s.get('reservation')).to.equal(reservation);
    });

    (0, _mocha.it)('delegates its state to its reservation which are false without a reservation', function () {
      var s = this.subject();

      (0, _chai.expect)(s.get('isConverted')).to.equal(false);
      (0, _chai.expect)(s.get('isRejected')).to.equal(false);
      (0, _chai.expect)(s.get('isConfirmed')).to.equal(false);
    });

    (0, _mocha.it)('delegates its state to its reservation', function () {
      var s = this.subject();

      var reservation = _emberDataFactoryGuy['default'].make('meal-planning-reservation');
      s.set('reservationId', reservation.id);

      (0, _chai.expect)(s.get('isConverted')).to.equal(false);
      (0, _chai.expect)(s.get('isRejected')).to.equal(false);
      (0, _chai.expect)(s.get('isConfirmed')).to.equal(false);

      reservation.set('state', _starFoxModelsMealPlanningReservation.States.CONFIRMED);
      (0, _chai.expect)(s.get('isConverted')).to.equal(false);
      (0, _chai.expect)(s.get('isRejected')).to.equal(false);
      (0, _chai.expect)(s.get('isConfirmed')).to.equal(true);

      reservation.set('state', _starFoxModelsMealPlanningReservation.States.CONVERTED);
      (0, _chai.expect)(s.get('isConverted')).to.equal(true);
      (0, _chai.expect)(s.get('isRejected')).to.equal(false);
      (0, _chai.expect)(s.get('isConfirmed')).to.equal(false);

      reservation.set('state', _starFoxModelsMealPlanningReservation.States.REJECTED);
      (0, _chai.expect)(s.get('isConverted')).to.equal(false);
      (0, _chai.expect)(s.get('isRejected')).to.equal(true);
      (0, _chai.expect)(s.get('isConfirmed')).to.equal(false);
    });
  });
});
define('star-fox/tests/unit/models/meal-planning-reservation-test', ['exports', 'ember', 'mocha', 'ember-mocha', 'ember-data-factory-guy', 'star-fox/models/meal-planning-reservation', 'chai'], function (exports, _ember, _mocha, _emberMocha, _emberDataFactoryGuy, _starFoxModelsMealPlanningReservation, _chai) {
  var getOwner = _ember['default'].getOwner;

  (0, _mocha.describe)('ModelTest.meal-planning-reservation', function () {

    (0, _emberMocha.setupModelTest)('meal-planning-reservation', {
      needs: ['model:meal-planning-instance', 'model:meal-planning-reservation', 'model:area', 'model:order', 'model:client', 'model:restaurant']
    });

    (0, _mocha.beforeEach)(function () {
      (0, _emberDataFactoryGuy.manualSetup)(getOwner(this));
    });

    (0, _mocha.it)('computes its boolean properties based on its state value', function () {
      var sut = this.subject();

      sut.set('state', _starFoxModelsMealPlanningReservation.States.DRAFT);
      (0, _chai.expect)(sut.get('isConverted')).to.equal(false);
      (0, _chai.expect)(sut.get('isConfirmed')).to.equal(false);
      (0, _chai.expect)(sut.get('isRejected')).to.equal(false);

      sut.set('state', _starFoxModelsMealPlanningReservation.States.CONVERTED);
      (0, _chai.expect)(sut.get('isConverted')).to.equal(true);
      (0, _chai.expect)(sut.get('isConfirmed')).to.equal(false);
      (0, _chai.expect)(sut.get('isRejected')).to.equal(false);

      sut.set('state', _starFoxModelsMealPlanningReservation.States.CONFIRMED);
      (0, _chai.expect)(sut.get('isConverted')).to.equal(false);
      (0, _chai.expect)(sut.get('isConfirmed')).to.equal(true);
      (0, _chai.expect)(sut.get('isRejected')).to.equal(false);

      sut.set('state', _starFoxModelsMealPlanningReservation.States.REJECTED);
      (0, _chai.expect)(sut.get('isConverted')).to.equal(false);
      (0, _chai.expect)(sut.get('isConfirmed')).to.equal(false);
      (0, _chai.expect)(sut.get('isRejected')).to.equal(true);
    });
  });
});
define('star-fox/tests/unit/models/menu-item-test', ['exports', 'ember', 'chai', 'mocha', 'ember-mocha', 'ember-data-factory-guy'], function (exports, _ember, _chai, _mocha, _emberMocha, _emberDataFactoryGuy) {
  var getOwner = _ember['default'].getOwner;

  (0, _mocha.describe)('ModelTest.menu-item', function () {
    (0, _emberMocha.setupModelTest)('menu-item', {
      // Specify the other units that ae required for this test.
      needs: ['model:invoicing-tax-rate', 'model:order-item', 'model:group-order-member', 'model:dietary-tag', 'model:menu-option-group', 'model:menu-option-item', 'model:menu-item', 'model:menu-group', 'model:food-type', 'model:meal-type']
    });

    (0, _mocha.beforeEach)(function () {
      (0, _emberDataFactoryGuy.manualSetup)(getOwner(this));
    });

    (0, _mocha.it)('express its permutation as a list of lists laid out as a truth table when a multiple option', function () {
      var moi1 = (0, _emberDataFactoryGuy.make)('menu-option-item', { id: 1 });
      var moi2 = (0, _emberDataFactoryGuy.make)('menu-option-item', { id: 2 });
      var moi3 = (0, _emberDataFactoryGuy.make)('menu-option-item', { id: 3 });

      var mog1 = (0, _emberDataFactoryGuy.make)('menu-option-group', {
        menuOptionItems: [moi1, moi2, moi3]
      });

      var moi4 = (0, _emberDataFactoryGuy.make)('menu-option-item', { id: 4 });
      var moi5 = (0, _emberDataFactoryGuy.make)('menu-option-item', { id: 5 });
      var moi6 = (0, _emberDataFactoryGuy.make)('menu-option-item', { id: 6 });

      var mog2 = (0, _emberDataFactoryGuy.make)('menu-option-group', {
        isSingleOpt: true,
        menuOptionItems: [moi4, moi5, moi6]
      });

      var moi7 = (0, _emberDataFactoryGuy.make)('menu-option-item', { id: 7 });
      var moi8 = (0, _emberDataFactoryGuy.make)('menu-option-item', { id: 8 });
      var moi9 = (0, _emberDataFactoryGuy.make)('menu-option-item', { id: 9 });

      var mog3 = (0, _emberDataFactoryGuy.make)('menu-option-group', {
        isSingleOpt: true,
        menuOptionItems: [moi7, moi8, moi9]
      });

      var sut = this.subject({
        menuOptionGroups: [mog3, mog2, mog1]
      });

      var combinations = sut.get('combinations');

      var expected = [[/*noi7,noi4,noi1,moi2,moi2*/], [moi7 /*,noi4noi1,moi2,moi2*/], [moi8 /*,noi5noi1,moi2,moi2*/], [moi9 /*,noi4,noi1,moi2,moi2*/], [/*noi7,*/moi4 /*noi1,moi2,moi2*/], [/*noi7,*/moi5 /*noi1,moi2,moi2*/], [/*noi7,*/moi6 /*noi1,moi2,moi2*/], [/*noi7,noi4,noi1,moi2*/moi3], [moi7 /*,noi4noi1,moi2*/, moi3], [moi8 /*,noi5noi1,moi2*/, moi3], [moi9 /*,noi4,noi1,moi2*/, moi3], [/*noi7,*/moi4 /*noi1,moi2*/, moi3], [/*noi7,*/moi5 /*noi1,moi2*/, moi3], [/*noi7,*/moi6 /*noi1,moi2*/, moi3], [/*noi7,noi4,noi1,moi2*/moi2], [moi7 /*,noi4noi1,moi2*/, moi2], [moi8 /*,noi5noi1,moi2*/, moi2], [moi9 /*,noi4,noi1,moi2*/, moi2], [/*noi7,*/moi4 /*noi1,moi2*/, moi2], [/*noi7,*/moi5 /*noi1,moi2*/, moi2], [/*noi7,*/moi6 /*noi1,moi2*/, moi2], [/*noi7,noi4,noi1,moi2*/moi1], [moi7 /*,noi4noi1,moi2*/, moi1], [moi8 /*,noi5noi1,moi2*/, moi1], [moi9 /*,noi4,noi1,moi2*/, moi1], [/*noi7,*/moi4 /*noi1,moi2*/, moi1], [/*noi7,*/moi5 /*noi1,moi2*/, moi1], [/*noi7,*/moi6 /*noi1,moi2*/, moi1], [/*noi7,noi4,noi1,moi2*/moi1, mog2], [moi7 /*,noi4noi1,moi2*/, moi1, mog2], [moi8 /*,noi5noi1,moi2*/, moi1, mog2], [moi9 /*,noi4,noi1,moi2*/, moi1, mog2], [/*noi7,*/moi4 /*noi1,moi2*/, moi1, mog2], [/*noi7,*/moi5 /*noi1,moi2*/, moi1, mog2], [/*noi7,*/moi6 /*noi1,moi2*/, moi1, mog2], [/*noi7,noi4,noi1,moi2*/moi1, mog3], [moi7 /*,noi4noi1,moi2*/, moi1, mog3], [moi8 /*,noi5noi1,moi2*/, moi1, mog3], [moi9 /*,noi4,noi1,moi2*/, moi1, mog3], [/*noi7,*/moi4 /*noi1,moi2*/, moi1, mog3], [/*noi7,*/moi5 /*noi1,moi2*/, moi1, mog3], [/*noi7,*/moi6 /*noi1,moi2*/, moi1, mog3], [/*noi7,noi4,noi1,moi2*/moi2, mog3], [moi7 /*,noi4noi1,moi2*/, moi2, mog3], [moi8 /*,noi5noi1,moi2*/, moi2, mog3], [moi9 /*,noi4,noi1,moi2*/, moi2, mog3], [/*noi7,*/moi4 /*noi1,moi2*/, moi2, mog3], [/*noi7,*/moi5 /*noi1,moi2*/, moi2, mog3], [/*noi7,*/moi6 /*noi1,moi2*/, moi2, mog3], [/*noi7,noi4,noi1,moi2*/moi1, mog3, mog2], [moi7 /*,noi4noi1,moi2*/, moi1, mog3, mog2], [moi8 /*,noi5noi1,moi2*/, moi1, mog3, mog2], [moi9 /*,noi4,noi1,moi2*/, moi1, mog3, mog2], [/*noi7,*/moi4 /*noi1,moi2*/, moi1, mog3, mog2], [/*noi7,*/moi5 /*noi1,moi2*/, moi1, mog3, mog2], [/*noi7,*/moi6 /*noi1,moi2*/, moi1, mog3, mog2], [moi7, moi4 /*noi1,moi2,moi2*/], [moi7, moi5 /*noi1,moi2,moi2*/], [moi7, moi6 /*noi1,moi2,moi2*/], [moi8, moi4 /*noi1,moi2,moi2*/], [moi8, moi5 /*noi1,moi2,moi2*/], [moi8, moi6 /*noi1,moi2,moi2*/], [moi9, moi4 /*noi1,moi2,moi2*/], [moi9, moi5 /*noi1,moi2,moi2*/], [moi9, moi6 /*noi1,moi2,moi2*/], [moi7, moi4, /*noi1,moi2,*/moi3], [moi8, moi4, /*noi1,moi2,*/moi3], [moi9, moi4, /*noi1,moi2,*/moi3], [moi7, moi4, /*noi1,*/moi2 /*,noi3*/], [moi8, moi4, /*noi1,*/moi2 /*,noi3*/], [moi9, moi4, /*noi1,*/moi2 /*,noi3*/], [moi7, moi4, moi1 /*,noi2,noi3*/], [moi8, moi4, moi1 /*,noi2,noi3*/], [moi9, moi4, moi1 /*,noi2,noi3*/], [moi7, moi5, /*noi1,moi2,*/moi3], [moi8, moi5, /*noi1,moi2,*/moi3], [moi9, moi5, /*noi1,moi2,*/moi3], [moi7, moi5, /*noi1,*/moi2 /*,noi3*/], [moi8, moi5, /*noi1,*/moi2 /*,noi3*/], [moi9, moi5, /*noi1,*/moi2 /*,noi3*/], [moi7, moi5, moi1 /*,noi2,noi3*/], [moi8, moi5, moi1 /*,noi2,noi3*/], [moi9, moi5, moi1 /*,noi2,noi3*/], [moi7, moi6, /*noi1,moi2,*/moi3], [moi8, moi6, /*noi1,moi2,*/moi3], [moi9, moi6, /*noi1,moi2,*/moi3], [moi7, moi6, /*noi1,*/moi2 /*,noi3*/], [moi8, moi6, /*noi1,*/moi2 /*,noi3*/], [moi9, moi6, /*noi1,*/moi2 /*,noi3*/], [moi7, moi6, moi1 /*,noi2,noi3*/], [moi8, moi6, moi1 /*,noi2,noi3*/], [moi9, moi6, moi1 /*,noi2,noi3*/], [moi7, moi4, /*noi1,*/moi2, moi3], [moi8, moi4, /*noi1,*/moi2, moi3], [moi9, moi4, /*noi1,*/moi2, moi3], [moi7, moi4, moi1 /*,noi2*/, moi3], [moi8, moi4, moi1 /*,noi2*/, moi3], [moi9, moi4, moi1 /*,noi2*/, moi3], [moi7, moi4, moi1, moi2 /*,noi3*/], [moi8, moi4, moi1, moi2 /*,noi3*/], [moi9, moi4, moi1, moi2 /*,noi3*/], [moi7, moi5, /*noi1,*/moi2, moi3], [moi8, moi5, /*noi1,*/moi2, moi3], [moi9, moi5, /*noi1,*/moi2, moi3], [moi7, moi5, moi1 /*,noi2*/, moi3], [moi8, moi5, moi1 /*,noi2*/, moi3], [moi9, moi5, moi1 /*,noi2*/, moi3], [moi7, moi5, moi1, moi2 /*,noi3*/], [moi8, moi5, moi1, moi2 /*,noi3*/], [moi9, moi5, moi1, moi2 /*,noi3*/], [moi7, moi6, /*noi1,*/moi2, moi3], [moi8, moi6, /*noi1,*/moi2, moi3], [moi9, moi6, /*noi1,*/moi2, moi3], [moi7, moi6, moi1 /*,noi2*/, moi3], [moi8, moi6, moi1 /*,noi2*/, moi3], [moi9, moi6, moi1 /*,noi2*/, moi3], [moi7, moi6, moi1, moi2 /*,noi3*/], [moi8, moi6, moi1, moi2 /*,noi3*/], [moi9, moi6, moi1, moi2 /*,noi3*/], [moi7, moi4, moi1, moi2, moi3], [moi7, moi5, moi1, moi2, moi3], [moi7, moi6, moi1, moi2, moi3], [moi8, moi4, moi1, moi2, moi3], [moi8, moi5, moi1, moi2, moi3], [moi8, moi6, moi1, moi2, moi3], [moi9, moi4, moi1, moi2, moi3], [moi9, moi5, moi1, moi2, moi3], [moi9, moi6, moi1, moi2, moi3]];

      var actualIds = combinations.map(function (c) {
        return c.mapBy('id').sort().join(',');
      }).sort();
      var expectedIds = expected.map(function (c) {
        return c.mapBy('id').sort().join(',');
      }).sort();

      (0, _chai.expect)(actualIds).to.eql(expectedIds);
    });
  });
});
/* jshint expr:true */
define('star-fox/tests/unit/models/menu-option-group-test', ['exports', 'ember', 'chai', 'mocha', 'ember-mocha', 'ember-data-factory-guy'], function (exports, _ember, _chai, _mocha, _emberMocha, _emberDataFactoryGuy) {
  var getOwner = _ember['default'].getOwner;

  (0, _mocha.describe)('ModelTest.menu-option-group', function () {
    (0, _emberMocha.setupModelTest)('menu-option-group', {
      // Specify the other units that ae required for this test.
      needs: ['model:menu-option-item', 'model:menu-item']
    });

    (0, _mocha.beforeEach)(function () {
      (0, _emberDataFactoryGuy.manualSetup)(getOwner(this));
    });

    (0, _mocha.it)('express its permutation as a list of lists as a single option', function () {
      var moi1 = (0, _emberDataFactoryGuy.make)('menu-option-item', { id: 1 });
      var moi2 = (0, _emberDataFactoryGuy.make)('menu-option-item', { id: 2 });
      var moi3 = (0, _emberDataFactoryGuy.make)('menu-option-item', { id: 3 });

      var sut = this.subject({
        isSingleOpt: true,
        menuOptionItems: [moi1, moi2, moi3]
      });

      var combinations = sut.get('combinations');

      (0, _chai.expect)(combinations).to.eql([[], [moi1], [moi2], [moi3]]);
    });

    (0, _mocha.it)('express its permutation as a list of lists laid out as a truth table when a multiple option', function () {
      var moi1 = (0, _emberDataFactoryGuy.make)('menu-option-item', { id: 1 });
      var moi2 = (0, _emberDataFactoryGuy.make)('menu-option-item', { id: 2 });
      var moi3 = (0, _emberDataFactoryGuy.make)('menu-option-item', { id: 3 });

      var sut = this.subject({
        menuOptionItems: [moi1, moi2, moi3]
      });

      (0, _chai.expect)(sut.get('combinations')).to.eql([[/*noi1,moi2,moi2*/], [/*noi1,moi2,*/moi3], [/*noi1,*/moi2 /*,noi3*/], [/*noi1,*/moi2, moi3], [moi1 /*,noi2,noi3*/], [moi1 /*,noi2*/, moi3], [moi1, moi2 /*,noi3*/], [moi1, moi2, moi3]]);
    });
  });
});
/* jshint expr:true */
define('star-fox/tests/unit/models/order-test', ['exports', 'ember', 'mocha', 'ember-mocha', 'ember-data-factory-guy'], function (exports, _ember, _mocha, _emberMocha, _emberDataFactoryGuy) {
  var getOwner = _ember['default'].getOwner;

  (0, _mocha.describe)('ModelTest.order', function () {
    (0, _emberMocha.setupModelTest)('order', {
      // Specify the other units that are required for this test.
      // These are the actual model names and not the name we've assigned it on order.
      // For example, client-location and restaurant-location aren't
      // actual models and will not work here.
      needs: ['model:order', 'model:area', 'model:client', 'model:courier', 'model:restaurant', 'model:location', 'model:user', 'model:order-item', 'model:service-time']
    });

    (0, _mocha.beforeEach)(function () {
      (0, _emberDataFactoryGuy.manualSetup)(getOwner(this));
    });
  });
});
/* jshint expr:true */
define('star-fox/tests/unit/models/payment-card-test', ['exports', 'chai', 'mocha', 'ember-mocha'], function (exports, _chai, _mocha, _emberMocha) {

  (0, _mocha.describe)('ModelTest.payment-card', function () {
    (0, _emberMocha.setupModelTest)('payment-card', {
      // Specify the other units that are required for this test.
      needs: ['model:client', 'model:order', 'model:user']
    });

    // Replace this with your real tests.
    (0, _mocha.it)('exists', function () {
      var model = this.subject();
      // var store = this.store();
      (0, _chai.expect)(model).to.be.ok;
    });
  });
});
define('star-fox/tests/unit/models/user-test', ['exports', 'faker', 'ember', 'chai', 'mocha', 'ember-mocha', 'ember-data-factory-guy'], function (exports, _faker, _ember, _chai, _mocha, _emberMocha, _emberDataFactoryGuy) {
  var getOwner = _ember['default'].getOwner;

  (0, _mocha.describe)('ModelTest.user', function () {
    (0, _emberMocha.setupModelTest)('user', {
      // Specify the other units that ae required for this test.
      needs: ['model:user', 'model:courier', 'model:driver-ping', 'model:driver-week', 'model:order', 'model:payment-card', 'model:client']
    });

    (0, _mocha.beforeEach)(function () {
      (0, _emberDataFactoryGuy.manualSetup)(getOwner(this));
    });

    (0, _mocha.it)('should properly concatenate the first name and last name into a full name', function () {
      var u = (0, _emberDataFactoryGuy.make)('user');

      var firstName = _faker['default'].name.firstName();
      var lastName = _faker['default'].name.lastName();

      u.setProperties({ firstName: firstName, lastName: lastName });

      (0, _chai.expect)(u.get('fullName')).to.equal(firstName + ' ' + lastName);
    });
  });
});
/* jshint expr:true */
define('star-fox/tests/unit/services/location-test', ['exports', 'chai', 'mocha', 'ember-mocha', 'ember'], function (exports, _chai, _mocha, _emberMocha, _ember) {
  var Service = _ember['default'].Service;

  /**
   * Stub Ajax Service to return a preduction
   */
  var StubAjaxService = Service.extend({

    request: function request(_url) {
      return Promise.resolve({
        "predictions": [{
          "description": "1238 Seymour Street, Vancouver, BC, Canada",
          "id": "0435d90b7570dfaf80c4c75671a7e6f5cd12516f",
          "matched_substrings": [{
            "length": 4,
            "offset": 0
          }, {
            "length": 7,
            "offset": 5
          }],
          "place_id": "ChIJCQwzqtZzhlQRbm_BCNgw_fY",
          "reference": "ClRCAAAAnqhfXyFtQIc9CR-jbjO6AtMCTWxTcP2i-8e-KmEYlpeKNSCV0zmGIvNunThhs6sTboXmo54r4gDLI81TvLis7MyPIDnQAdbSkKpTltZ0VDYSELH3f4fT6MA88Ii9HRxyw-8aFCSfVkTojrR5UWEOiUeTkSzmhyOi",
          "structured_formatting": {
            "main_text": "1238 Seymour Street",
            "main_text_matched_substrings": [{
              "length": 4,
              "offset": 0
            }, {
              "length": 7,
              "offset": 5
            }],
            "secondary_text": "Vancouver, BC, Canada"
          },
          "terms": [{
            "offset": 0,
            "value": "1238"
          }, {
            "offset": 5,
            "value": "Seymour Street"
          }, {
            "offset": 21,
            "value": "Vancouver"
          }, {
            "offset": 32,
            "value": "BC"
          }, {
            "offset": 36,
            "value": "Canada"
          }],
          "types": ["street_address", "geocode"]
        }]
      });
    }

  });

  (0, _mocha.describe)('LocationService', function () {
    (0, _emberMocha.setupTest)('service:location', {
      // needs: ['service:ajax'] we stub this
    });

    // Replace this with your real tests.

    (0, _mocha.it)('properly maps google places to suggestion hashes', function () {
      this.register('service:ajax', StubAjaxService);
      var service = this.subject();

      service.suggestPlaces('1238 Seymour Street').then(function (results) {
        var first = results.pop();

        (0, _chai.expect)(first.country).to.equal('ca');

        (0, _chai.expect)(first.description).to.equal('<strong><em>1238 Seymour Street</em></strong>, Vancouver, BC, Canada');

        (0, _chai.expect)(first.placeId).to.equal('ChIJCQwzqtZzhlQRbm_BCNgw_fY');
      });
    });

    (0, _mocha.it)('properly maps google address to Foodee Locations', function () {
      this.register('service:ajax', StubAjaxService);
      var service = this.subject();

      // google's geocoder is super weird returns this mess when you query
      // place_id: ChIJCQwzqtZzhlQRbm_BCNgw_fY
      var geocoderResult = {
        "address_components": [{
          "long_name": "1238",
          "short_name": "1238",
          "types": ["street_number"]
        }, { "long_name": "Seymour Street", "short_name": "Seymour St", "types": ["route"] }, {
          "long_name": "Central",
          "short_name": "Central",
          "types": ["neighborhood", "political"]
        }, {
          "long_name": "Vancouver",
          "short_name": "Vancouver",
          "types": ["locality", "political"]
        }, {
          "long_name": "Greater Vancouver",
          "short_name": "Greater Vancouver",
          "types": ["administrative_area_level_2", "political"]
        }, {
          "long_name": "British Columbia",
          "short_name": "BC",
          "types": ["administrative_area_level_1", "political"]
        }, { "long_name": "Canada", "short_name": "CA", "types": ["country", "political"] }, {
          "long_name": "V6B 6J3",
          "short_name": "V6B 6J3",
          "types": ["postal_code"]
        }],
        "formatted_address": "1238 Seymour St, Vancouver, BC V6B 6J3, Canada",
        "geometry": {
          "location": { "lat": function lat() {
              return 49.2757657;
            }, "lng": function lng() {
              return -123.1258977;
            } },
          "location_type": "ROOFTOP",
          "viewport": {
            "south": 49.2744167197085,
            "west": -123.12724668029148,
            "north": 49.2771146802915,
            "east": -123.12454871970851
          }
        },
        "place_id": "ChIJCQwzqtZzhlQRbm_BCNgw_fY",
        "types": ["street_address"]
      };

      var location = service.mapGoogleAddressToFoodeeLocation(geocoderResult);

      (0, _chai.expect)(location.building).to.equal('1238');
      (0, _chai.expect)(location.street).to.equal('Seymour Street');
      (0, _chai.expect)(location.city).to.equal('Vancouver');
      (0, _chai.expect)(location.province).to.equal('BC');
      (0, _chai.expect)(location.country).to.equal('CA');
      (0, _chai.expect)(location.addressCode).to.equal('V6B 6J3');
      (0, _chai.expect)(location.latitude).to.equal(49.2757657);
      (0, _chai.expect)(location.longitude).to.equal(-123.1258977);
    });
  });
});
/* jshint expr:true */
define('star-fox/tests/unit/services/loggers/log-entries-logger-test', ['exports', 'chai', 'sinon', 'ember-mocha', 'mocha'], function (exports, _chai, _sinon, _emberMocha, _mocha) {

  (0, _mocha.describe)('LogEntriesLogger', function () {
    (0, _emberMocha.setupTest)('service:loggers/log-entries-logger', {
      // Specify the other units that are required for this test.
      needs: ['service:userSession', 'service:ajax', 'service:session']
    });

    (0, _mocha.describe)('Log Entries library methods get called', function () {
      var logEntriesLogger = undefined;
      var fakeLogEntries = undefined;

      (0, _mocha.beforeEach)(function () {
        logEntriesLogger = this.subject();
        fakeLogEntries = {
          info: _sinon['default'].stub(),
          log: _sinon['default'].stub(),
          warn: _sinon['default'].stub(),
          error: _sinon['default'].stub()
        };

        logEntriesLogger.attachLogEntries(fakeLogEntries);
      });

      (0, _mocha.it)('calls #log method on Log Entries', function () {
        logEntriesLogger.log('foo');
        (0, _chai.expect)(fakeLogEntries.log.called).to.be['true'];
        (0, _chai.expect)(fakeLogEntries.info.called).to.be['false'];
        (0, _chai.expect)(fakeLogEntries.warn.called).to.be['false'];
        (0, _chai.expect)(fakeLogEntries.error.called).to.be['false'];
      });

      (0, _mocha.it)('calls #info method on Log Entries', function () {
        logEntriesLogger.info('foo');
        (0, _chai.expect)(fakeLogEntries.log.called).to.be['false'];
        (0, _chai.expect)(fakeLogEntries.info.called).to.be['true'];
        (0, _chai.expect)(fakeLogEntries.warn.called).to.be['false'];
        (0, _chai.expect)(fakeLogEntries.error.called).to.be['false'];
      });

      (0, _mocha.it)('calls #warn method on Log Entries', function () {
        logEntriesLogger.warn('foo');
        (0, _chai.expect)(fakeLogEntries.log.called).to.be['false'];
        (0, _chai.expect)(fakeLogEntries.info.called).to.be['false'];
        (0, _chai.expect)(fakeLogEntries.warn.called).to.be['true'];
        (0, _chai.expect)(fakeLogEntries.error.called).to.be['false'];
      });

      (0, _mocha.it)('calls #error method on Log Entries', function () {
        logEntriesLogger.error('foo');
        (0, _chai.expect)(fakeLogEntries.log.called).to.be['false'];
        (0, _chai.expect)(fakeLogEntries.info.called).to.be['false'];
        (0, _chai.expect)(fakeLogEntries.warn.called).to.be['false'];
        (0, _chai.expect)(fakeLogEntries.error.called).to.be['true'];
      });

      (0, _mocha.it)('calls #error method on Log Entries when #assert given a falsy value is called on the logger', function () {
        logEntriesLogger.assert(false, 'foo');
        (0, _chai.expect)(fakeLogEntries.log.called).to.be['false'];
        (0, _chai.expect)(fakeLogEntries.info.called).to.be['false'];
        (0, _chai.expect)(fakeLogEntries.warn.called).to.be['false'];
        (0, _chai.expect)(fakeLogEntries.error.called).to.be['true'];
      });

      (0, _mocha.it)('does not call #error method on Log Entries when #assert given a truthy value is called on the logger', function () {
        logEntriesLogger.assert(true, 'foo');
        (0, _chai.expect)(fakeLogEntries.log.called).to.be['false'];
        (0, _chai.expect)(fakeLogEntries.info.called).to.be['false'];
        (0, _chai.expect)(fakeLogEntries.warn.called).to.be['false'];
        (0, _chai.expect)(fakeLogEntries.error.called).to.be['false'];
      });

      (0, _mocha.it)('calls logEntries with message and userSession meta data', function () {
        logEntriesLogger.log('foo');

        var lastPayload = logEntriesLogger.get('_lastPayload');
        (0, _chai.expect)(fakeLogEntries.log.calledWith(lastPayload)).to.be['true'];
      });
    });
  });
});
/* jshint expr:true */
define('star-fox/tests/unit/services/loggers/manager-test', ['exports', 'chai', 'sinon', 'ember', 'ember-mocha', 'mocha'], function (exports, _chai, _sinon, _ember, _emberMocha, _mocha) {
  var Object = _ember['default'].Object;

  (0, _mocha.describe)('LoggerManager', function () {
    (0, _emberMocha.setupTest)('service:loggers/manager', {
      // Specify the other units that are required for this test.
      needs: []
    });

    (0, _mocha.describe)('#addLogger', function () {
      (0, _mocha.it)('add\'s a logger to the internal loggers array', function () {
        var loggerManager = this.subject();
        loggerManager.addLogger(_sinon['default'].stub());
        (0, _chai.expect)(loggerManager._loggers).to.have.length(1);
      });
    });

    (0, _mocha.describe)('#setLogLevel', function () {
      var loggerManager = undefined;
      var fakeEmberLogger = undefined;
      var fakeRemoteLogger = undefined;
      var fakeEmber = undefined;

      (0, _mocha.beforeEach)(function () {
        loggerManager = this.subject();

        fakeRemoteLogger = Object.create({
          name: 'remote',
          log: _sinon['default'].stub(),
          info: _sinon['default'].stub(),
          warn: _sinon['default'].stub(),
          error: _sinon['default'].stub(),
          debug: _sinon['default'].stub(),
          assert: _sinon['default'].stub()
        });

        fakeEmberLogger = {
          log: _sinon['default'].stub(),
          info: _sinon['default'].stub(),
          warn: _sinon['default'].stub(),
          error: _sinon['default'].stub(),
          debug: _sinon['default'].stub(),
          assert: _sinon['default'].stub()
        };

        fakeEmber = {
          Logger: fakeEmberLogger
        };

        loggerManager.attachEmberLogger(fakeEmber);
        loggerManager.addLogger(fakeRemoteLogger);
      });

      (0, _mocha.it)('log level 4 works\'', function () {
        loggerManager.set('logLevels', {
          console: 4,
          remote: 4
        });

        fakeEmber.Logger.debug('foo');
        fakeEmber.Logger.info('bar');
        fakeEmber.Logger.log('baz');
        fakeEmber.Logger.warn('qux');
        fakeEmber.Logger.error('quux');

        (0, _chai.expect)(fakeRemoteLogger.debug.called).to.be['true'];
        (0, _chai.expect)(fakeRemoteLogger.info.called).to.be['true'];
        (0, _chai.expect)(fakeRemoteLogger.log.called).to.be['true'];
        (0, _chai.expect)(fakeRemoteLogger.warn.called).to.be['true'];
        (0, _chai.expect)(fakeRemoteLogger.error.called).to.be['true'];
      });

      (0, _mocha.it)('log level 3 works\'', function () {
        loggerManager.set('logLevels', {
          console: 3,
          remote: 3
        });

        fakeEmber.Logger.debug('foo');
        fakeEmber.Logger.info('bar');
        fakeEmber.Logger.log('baz');
        fakeEmber.Logger.warn('qux');
        fakeEmber.Logger.error('quux');

        (0, _chai.expect)(fakeRemoteLogger.debug.called).to.be['false'];
        (0, _chai.expect)(fakeRemoteLogger.info.called).to.be['true'];
        (0, _chai.expect)(fakeRemoteLogger.log.called).to.be['true'];
        (0, _chai.expect)(fakeRemoteLogger.warn.called).to.be['true'];
        (0, _chai.expect)(fakeRemoteLogger.error.called).to.be['true'];
      });

      (0, _mocha.it)('log level 2 works\'', function () {
        loggerManager.set('logLevels', {
          console: 2,
          remote: 2
        });

        fakeEmber.Logger.debug('foo');
        fakeEmber.Logger.info('bar');
        fakeEmber.Logger.log('baz');
        fakeEmber.Logger.warn('qux');
        fakeEmber.Logger.error('quux');

        (0, _chai.expect)(fakeRemoteLogger.debug.called).to.be['false'];
        (0, _chai.expect)(fakeRemoteLogger.info.called).to.be['false'];
        (0, _chai.expect)(fakeRemoteLogger.log.called).to.be['false'];
        (0, _chai.expect)(fakeRemoteLogger.warn.called).to.be['true'];
        (0, _chai.expect)(fakeRemoteLogger.error.called).to.be['true'];
      });

      (0, _mocha.it)('log level 1 works\'', function () {
        loggerManager.set('logLevels', {
          console: 1,
          remote: 1
        });

        fakeEmber.Logger.debug('foo');
        fakeEmber.Logger.info('bar');
        fakeEmber.Logger.log('baz');
        fakeEmber.Logger.warn('qux');
        fakeEmber.Logger.error('quux');

        (0, _chai.expect)(fakeRemoteLogger.debug.called).to.be['false'];
        (0, _chai.expect)(fakeRemoteLogger.info.called).to.be['false'];
        (0, _chai.expect)(fakeRemoteLogger.log.called).to.be['false'];
        (0, _chai.expect)(fakeRemoteLogger.warn.called).to.be['false'];
        (0, _chai.expect)(fakeRemoteLogger.error.called).to.be['true'];
      });
    });
  });
});
/* jshint expr:true */
define('star-fox/tests/unit/services/mock-card-service-test', ['exports', 'chai', 'ember-mocha', 'mocha', 'star-fox/services/mock-card-service', 'star-fox/instance-initializers/rsvp-custom-catch', 'star-fox/services/card-service', 'sinon', 'ember'], function (exports, _chai, _emberMocha, _mocha, _starFoxServicesMockCardService, _starFoxInstanceInitializersRsvpCustomCatch, _starFoxServicesCardService, _sinon, _ember) {
  _starFoxInstanceInitializersRsvpCustomCatch['default'].initialize();

  var Object = _ember['default'].Object;

  /**
   * This will test the card service through a proxy service which extends from the main Card Service
   */
  (0, _mocha.describe)('MockCardServce', function () {
    (0, _emberMocha.setupTest)('service:mock-card-service', {
      // Specify the other units that are required for this test.
      // needs: ['service:foo']
    });

    function createMockCard() {
      return Object.create({
        send: _sinon['default'].stub()
      });
    }

    // Replace this with your real tests.
    (0, _mocha.it)('exists', function () {
      var service = this.subject();
      (0, _chai.expect)(service).to.be.ok;
    });

    (0, _mocha.describe)('Service deals with Stripe Errors', function () {
      var cardService = undefined;
      var card = undefined;
      var saveMethod = undefined;

      beforeEach(function () {
        cardService = this.subject();
        saveMethod = _sinon['default'].stub();
        card = createMockCard();
      });

      (0, _mocha.it)('fails a Stripe CVC error properly', function (done) {
        var caught = false;
        cardService.setToFail(_starFoxServicesMockCardService.FailureType.CVC, _starFoxServicesMockCardService.FailureSource.ON_TOKEN_SAVE);
        cardService.saveCard(card, saveMethod)['catch'](function (_) {
          (0, _chai.expect)(_).to.be['instanceof'](_starFoxServicesCardService.CVCError);
          caught = true;
        })['finally'](function (_) {
          (0, _chai.expect)(caught).to.be['true'];
          done();
        });
      });

      (0, _mocha.it)('fails a Stripe expiry error properly', function (done) {
        var caught = false;
        cardService.setToFail(_starFoxServicesMockCardService.FailureType.EXPIRY, _starFoxServicesMockCardService.FailureSource.ON_TOKEN_SAVE);
        cardService.saveCard(card, saveMethod)['catch'](function (_) {
          (0, _chai.expect)(_).to.be['instanceof'](_starFoxServicesCardService.ExpiryError);
          caught = true;
        })['finally'](function (_) {
          (0, _chai.expect)(caught).to.be['true'];
          done();
        });
      });

      (0, _mocha.it)('fails a Stripe number error properly', function (done) {
        var caught = false;
        cardService.setToFail(_starFoxServicesMockCardService.FailureType.NUMBER, _starFoxServicesMockCardService.FailureSource.ON_TOKEN_SAVE);
        cardService.saveCard(card, saveMethod)['catch'](function (_) {
          (0, _chai.expect)(_).to.be['instanceof'](_starFoxServicesCardService.CardError);
          caught = true;
        })['finally'](function (_) {
          (0, _chai.expect)(caught).to.be['true'];
          done();
        });
      });

      (0, _mocha.it)('fails a Stripe decline error properly', function (done) {
        var caught = false;
        cardService.setToFail(_starFoxServicesMockCardService.FailureType.DECLINED, _starFoxServicesMockCardService.FailureSource.ON_TOKEN_SAVE);
        cardService.saveCard(card, saveMethod)['catch'](function (_) {
          (0, _chai.expect)(_).to.be['instanceof'](_starFoxServicesCardService.CardError);
          caught = true;
        })['finally'](function (_) {

          (0, _chai.expect)(caught).to.be['true'];
          done();
        });
      });
    });

    (0, _mocha.describe)('Service deals with MasterFox Errors', function () {
      var cardService = undefined;
      var card = undefined;
      var saveMethod = undefined;

      beforeEach(function () {
        cardService = this.subject();
        saveMethod = _sinon['default'].stub();
        card = createMockCard();
      });

      (0, _mocha.it)('fails a MasterFox CVC error properly', function (done) {
        var caught = false;
        cardService.setToFail(_starFoxServicesMockCardService.FailureType.CVC, _starFoxServicesMockCardService.FailureSource.ON_CARD_SAVE);
        cardService.saveCard(card, saveMethod)['catch'](function (_) {
          (0, _chai.expect)(_).to.be['instanceof'](_starFoxServicesCardService.CVCError);
          caught = true;
        })['finally'](function (_) {
          (0, _chai.expect)(caught).to.be['true'];
          done();
        });
      });

      (0, _mocha.it)('fails a MasterFox expiry error properly', function (done) {
        var caught = false;
        cardService.setToFail(_starFoxServicesMockCardService.FailureType.EXPIRY, _starFoxServicesMockCardService.FailureSource.ON_CARD_SAVE);
        cardService.saveCard(card, saveMethod)['catch'](function (_) {
          (0, _chai.expect)(_).to.be['instanceof'](_starFoxServicesCardService.ExpiryError);
          caught = true;
        })['finally'](function (_) {
          (0, _chai.expect)(caught).to.be['true'];
          done();
        });
      });

      (0, _mocha.it)('fails a MasterFox number error properly', function (done) {
        var caught = false;
        cardService.setToFail(_starFoxServicesMockCardService.FailureType.NUMBER, _starFoxServicesMockCardService.FailureSource.ON_CARD_SAVE);
        cardService.saveCard(card, saveMethod)['catch'](function (_) {
          (0, _chai.expect)(_).to.be['instanceof'](_starFoxServicesCardService.CardError);
          caught = true;
        })['finally'](function (_) {
          (0, _chai.expect)(caught).to.be['true'];
          done();
        });
      });

      (0, _mocha.it)('fails a MasterFox decline error properly', function (done) {
        var caught = false;
        cardService.setToFail(_starFoxServicesMockCardService.FailureType.DECLINED, _starFoxServicesMockCardService.FailureSource.ON_CARD_SAVE);
        cardService.saveCard(card, saveMethod)['catch'](function (_) {
          (0, _chai.expect)(_).to.be['instanceof'](_starFoxServicesCardService.CardError);
          caught = true;
        })['finally'](function (_) {
          (0, _chai.expect)(caught).to.be['true'];
          done();
        });
      });
    });
  });
});
/* jshint expr:true */
define('star-fox/tests/unit/services/modal-test', ['exports', 'chai', 'mocha', 'ember-mocha'], function (exports, _chai, _mocha, _emberMocha) {

  (0, _mocha.describe)('ModalService', function () {
    (0, _emberMocha.setupTest)('service:modal', {
      // Specify the other units that are required for this test.
      needs: ['service:modal']
    });

    // No real testing to happen with this modal service.
    // The service is really to allow the testing of other modals.
    (0, _mocha.it)('exists', function () {
      var service = this.subject();
      (0, _chai.expect)(service).to.be.ok;
    });
  });
});
/* jshint expr:true */
define('star-fox/tests/unit/services/set-menu-service-test', ['exports', 'chai', 'mocha', 'ember-mocha'], function (exports, _chai, _mocha, _emberMocha) {

  (0, _mocha.describe)('SetMenuServiceService', function () {
    (0, _emberMocha.setupTest)('service:set-menu-service', {
      // Specify the other units that are required for this test.
      // needs: ['service:foo']
    });

    // Replace this with your real tests.
    (0, _mocha.it)('exists', function () {
      var service = this.subject();
      (0, _chai.expect)(service).to.be.ok;
    });
  });
});
/* jshint expr:true */
define('star-fox/tests/unit/supports/filters/filter-collection-test', ['exports', 'chai', 'mocha', 'ember-mocha', 'star-fox/supports/filters/filter'], function (exports, _chai, _mocha, _emberMocha, _starFoxSupportsFiltersFilter) {

  var filterStorageKey = 'filter-test';
  localStorage.removeItem(filterStorageKey);

  var anFilter = _starFoxSupportsFiltersFilter['default'].create({ id: 'foo', label: 'Foo', key: 'foo', value: ['Foo'] });
  var anFilter2 = _starFoxSupportsFiltersFilter['default'].create({ id: 'bar', label: 'Bar', key: 'bar', value: ['Foo'] });
  var anFilter3 = _starFoxSupportsFiltersFilter['default'].create({ id: 'baz', label: 'Baz', key: 'bar', value: ['Bar'] });

  var filterDefinition1 = { key: 'foo', icon: 'fooIcon', label: 'fooLabel', resourceName: 'fooResource', resourceValueLabel: 'fooName', valueTextDelimiter: '-' };
  var filterDefinition2 = { key: 'bar', icon: 'barIcon', label: 'barLabel', resourceName: 'barResource', resourceValueLabel: 'barName', valueTextDelimiter: '-' };

  var fullyLoadedFooFilter = _starFoxSupportsFiltersFilter['default'].create({
    key: 'foo',
    icon: 'fooIcon',
    label: 'fooLabel',
    resourceName: 'fooResource',
    resourceValueLabel: 'fooName',
    value: ['fooValue'],
    valueText: ['fooValueText'],
    valueTextDelimiter: '-'
  });

  var fullyLoadedBarFilter = _starFoxSupportsFiltersFilter['default'].create({
    key: 'bar',
    icon: 'barIcon',
    label: 'barLabel',
    resourceName: 'barResource',
    resourceValueLabel: 'barName',
    value: ['barValue'],
    valueText: ['barValueText'],
    valueTextDelimiter: '-'
  });

  var fullyLoadedBarFilter2 = _starFoxSupportsFiltersFilter['default'].create({
    key: 'bar',
    icon: 'barIcon',
    label: 'barLabel',
    resourceName: 'barResource',
    resourceValueLabel: 'barName',
    value: ['barValue2'],
    valueText: ['barValueText2'],
    valueTextDelimiter: '-'
  });

  (0, _mocha.describe)('supports.filters.FilterCollection', function () {
    (0, _emberMocha.setupTest)('support:filters/filter-collection', {
      // Specify the other units that are required for this test.
      needs: ['support:filters/filter']
    });

    (0, _mocha.describe)('({ isStaticFilterList: false })', function () {
      (0, _mocha.it)('represent all of its filters as JR', function () {
        var sut = this.subject({
          filters: [anFilter, anFilter2],
          selectedFilters: [fullyLoadedFooFilter, fullyLoadedBarFilter, fullyLoadedBarFilter2]
        }).get('asJR');

        (0, _chai.expect)(sut.foo).to.have.lengthOf(1);
        (0, _chai.expect)(sut.foo[0]).to.have.equal('fooValue');

        // multiple entries with the same key are concatenated together
        (0, _chai.expect)(sut.bar).to.have.lengthOf(2);
        (0, _chai.expect)(sut.bar[0]).to.have.equal('barValue');
        (0, _chai.expect)(sut.bar[1]).to.have.equal('barValue2');
      });

      (0, _mocha.it)('store itself in localStorage after adding/removing filters', function () {
        var sut = this.subject({
          storageKey: filterStorageKey,
          filters: []
        });

        sut.addFilter(anFilter);
        (0, _chai.expect)(localStorage.getItem(filterStorageKey)).to.equal('[{"id":"foo","key":"foo","value":["Foo"],"label":"Foo"}]');

        sut.addFilter(anFilter2);
        (0, _chai.expect)(localStorage.getItem(filterStorageKey)).to.equal('[{"id":"foo","key":"foo","value":["Foo"],"label":"Foo"},{"id":"bar","key":"bar","value":["Foo"],"label":"Bar"}]');

        sut.removeFilter(anFilter);
        (0, _chai.expect)(localStorage.getItem(filterStorageKey)).to.equal('[{"id":"bar","key":"bar","value":["Foo"],"label":"Bar"}]');

        sut.removeFilter(anFilter2);
        (0, _chai.expect)(localStorage.getItem(filterStorageKey)).to.equal('[]');
      });

      (0, _mocha.it)('restore itself from storage on init', function () {
        localStorage.setItem(filterStorageKey, '[{"id":"bar","label":"Bar","value":[]}]');

        var sut = this.subject({
          storageKey: filterStorageKey,
          restoreOnInit: true
        });

        (0, _chai.expect)(sut.get('selectedFilters.firstObject.label')).to.equal('Bar');
      });

      (0, _mocha.it)('restores from query params object correctly', function () {
        var sut = this.subject({
          filters: [filterDefinition1, filterDefinition2].map(function (_) {
            return _starFoxSupportsFiltersFilter['default'].create(_);
          })
        });

        var firstFilter = undefined;
        var secondFilter = undefined;

        // From a Foo
        sut.restoreFromQueryParams({ foo: 'fooValue-fooValueText' });
        (0, _chai.expect)(sut.get('selectedFilters.length')).to.equal(1);

        firstFilter = sut.get('selectedFilters.firstObject');
        (0, _chai.expect)(firstFilter.get('value.firstObject')).to.equal('fooValue');
        (0, _chai.expect)(firstFilter.get('valueText.firstObject')).to.equal('fooValueText');
        (0, _chai.expect)(firstFilter.get('icon')).to.equal('fooIcon');
        (0, _chai.expect)(firstFilter.get('label')).to.equal('fooLabel');
        (0, _chai.expect)(firstFilter.get('resourceName')).to.equal('fooResource');
        (0, _chai.expect)(firstFilter.get('resourceValueLabel')).to.equal('fooName');

        // From a Bar
        sut.restoreFromQueryParams({ bar: 'barValue-barValueText' });
        (0, _chai.expect)(sut.get('selectedFilters.length')).to.equal(1);

        firstFilter = sut.get('selectedFilters.firstObject');
        (0, _chai.expect)(firstFilter.get('value.firstObject')).to.equal('barValue');
        (0, _chai.expect)(firstFilter.get('valueText.firstObject')).to.equal('barValueText');
        (0, _chai.expect)(firstFilter.get('icon')).to.equal('barIcon');
        (0, _chai.expect)(firstFilter.get('label')).to.equal('barLabel');
        (0, _chai.expect)(firstFilter.get('resourceName')).to.equal('barResource');
        (0, _chai.expect)(firstFilter.get('resourceValueLabel')).to.equal('barName');

        //From Both
        sut.restoreFromQueryParams({
          foo: 'fooValue-fooValueText',
          bar: 'barValue-barValueText'
        });

        (0, _chai.expect)(sut.get('selectedFilters.length')).to.equal(2);

        firstFilter = sut.get('selectedFilters.firstObject');
        secondFilter = sut.get('selectedFilters.lastObject');

        (0, _chai.expect)(firstFilter.get('value.firstObject')).to.equal('fooValue');
        (0, _chai.expect)(secondFilter.get('value.firstObject')).to.equal('barValue');
      });

      (0, _mocha.it)('outputs to query params object correctly', function () {
        var sut = this.subject({
          filters: [anFilter],
          selectedFilters: [fullyLoadedFooFilter]
        });

        (0, _chai.expect)(JSON.stringify(sut.get('asQueryParams'))).to.equal('{"foo":"fooValue-fooValueText"}');

        sut.addFilter(fullyLoadedBarFilter);

        (0, _chai.expect)(JSON.stringify(sut.get('asQueryParams'))).to.equal('{"foo":"fooValue-fooValueText","bar":"barValue-barValueText"}');
      });
    });

    (0, _mocha.describe)('({ isStaticFilterList: true })', function () {
      (0, _mocha.it)('represent all of its filters as JR', function () {
        var sut = this.subject({
          isStaticFilterList: true,
          includeAllFilter: true,
          filters: [anFilter, anFilter2, anFilter3],
          selectedFilters: [anFilter, anFilter2, anFilter3]
        }).get('asJR');

        (0, _chai.expect)(sut.foo).to.have.lengthOf(1);
        (0, _chai.expect)(sut.foo[0]).to.have.equal('Foo');

        // multiple entries with the same key are concatenated together
        (0, _chai.expect)(sut.bar).to.have.lengthOf(2);
        (0, _chai.expect)(sut.bar[0]).to.have.equal('Foo');
        (0, _chai.expect)(sut.bar[1]).to.have.equal('Bar');
      });

      (0, _mocha.it)('store itself in localStorage after changes', function () {
        anFilter2.set('single', true);

        var sut = this.subject({
          isStaticFilterList: true,
          includeAllFilter: true,
          storageKey: filterStorageKey,
          filters: [anFilter, anFilter2, anFilter3],
          selectedFilters: []
        });

        sut.toggleFilter(anFilter2);

        (0, _chai.expect)(localStorage.getItem(filterStorageKey)).to.equal('[{"id":"bar","key":"bar","value":["Foo"],"label":"Bar","single":true}]');
      });

      (0, _mocha.it)('restore itself from storage on init', function () {
        anFilter2.set('single', true);

        localStorage.setItem(filterStorageKey, '[{"id":"bar","label":"Bar","single":true,"value":[]}]');

        var sut = this.subject({
          isStaticFilterList: true,
          includeAllFilter: true,
          storageKey: filterStorageKey,
          filters: [anFilter, anFilter2, anFilter3],
          selectedFilters: []
        });

        (0, _chai.expect)(sut.get('selectedFilters.firstObject.label')).to.equal('Bar');
      });
    });

    (0, _mocha.describe)('({ isStaticFilterList: true })#hasActiveFilter', function () {
      (0, _mocha.it)('is false when the all filter is selected', function () {
        (0, _chai.expect)(this.subject({ isStaticFilterList: true, includeAllFilter: true }).get('hasActiveFilter')).to.be['false'];
      });

      (0, _mocha.it)('is true when any filter is selected', function () {
        (0, _chai.expect)(this.subject({
          isStaticFilterList: true,
          includeAllFilter: true,
          filters: [anFilter, anFilter2, anFilter3],
          selectedFilters: [anFilter, anFilter3]
        }).get('hasActiveFilter')).to.be['true'];
      });
    });

    (0, _mocha.describe)('({ isStaticFilterList: true })#filterText', function () {
      (0, _mocha.it)('displays all when none are selected', function () {
        (0, _chai.expect)(this.subject({ isStaticFilterList: true, includeAllFilter: true }).get('filterText')).to.equal('Filter: All');
      });

      (0, _mocha.it)('displays a comma seperated list of the selected filters', function () {

        (0, _chai.expect)(this.subject({
          isStaticFilterList: true,
          includeAllFilter: true,
          filters: [anFilter, anFilter2, anFilter3],
          selectedFilters: [anFilter, anFilter3]
        }).get('filterText')).to.equal('Filter: Foo, Baz');
      });
    });

    (0, _mocha.describe)('({ isStaticFilterList: true })#toggleFilter', function () {
      (0, _mocha.it)('clear the filters when a single filter is toggled', function () {
        anFilter2.set('single', true);
        var sut = this.subject({
          isStaticFilterList: true,
          includeAllFilter: true,
          filters: [anFilter, anFilter2, anFilter3],
          selectedFilters: [anFilter, anFilter3]
        });

        sut.toggleFilter(anFilter2);

        var selectedFilters = sut.get('selectedFilters');
        (0, _chai.expect)(selectedFilters).to.have.lengthOf(1);
        (0, _chai.expect)(selectedFilters[0]).to.equal(anFilter2);
      });

      (0, _mocha.it)('toggle a standard filter ', function () {
        anFilter2.set('single', true);

        var sut = this.subject({
          isStaticFilterList: true,
          includeAllFilter: true,
          filters: [anFilter, anFilter2, anFilter3],
          selectedFilters: [anFilter, anFilter3]
        });

        sut.toggleFilter(anFilter);

        var selectedFilters = sut.get('selectedFilters');
        (0, _chai.expect)(selectedFilters).to.have.lengthOf(1);
        (0, _chai.expect)(selectedFilters).not.to.include(anFilter);

        sut.toggleFilter(anFilter);
        (0, _chai.expect)(selectedFilters).to.have.lengthOf(2);
        (0, _chai.expect)(selectedFilters).to.include(anFilter);
      });
    });
  });
});
/* jshint expr:true */
define('star-fox/tests/unit/supports/filters/filter-test', ['exports', 'chai', 'mocha', 'ember-mocha', 'ember'], function (exports, _chai, _mocha, _emberMocha, _ember) {

  (0, _mocha.describe)('supports.filters.Filter', function () {
    (0, _emberMocha.setupTest)('support:filters/filter');

    (0, _mocha.it)('filters an object', function () {
      var filter = this.subject({
        key: 'foo',
        value: ['bar']
      });

      (0, _chai.expect)(filter.filter(_ember['default'].Object.create({ foo: 'bar' }))).to.be['true'];
      (0, _chai.expect)(filter.filter(_ember['default'].Object.create({ foo: 'baz' }))).to.be['false'];
    });

    (0, _mocha.it)('appends itself to a JR filter', function () {
      var filter = this.subject({
        key: 'foo',
        value: ['bar']
      });

      var result = filter.toJR({});

      // test appending
      (0, _chai.expect)(result.foo[0]).to.equal('bar');

      // test appending to existing key
      filter.toJR(result);
      (0, _chai.expect)(result.foo[0]).to.equal('bar');
      (0, _chai.expect)(result.foo[1]).to.equal('bar');
    });
  });
});
/* jshint expr:true */
define('star-fox/tests/unit/transforms/time-test', ['exports', 'chai', 'mocha', 'star-fox/transforms/time', 'moment'], function (exports, _chai, _mocha, _starFoxTransformsTime, _moment) {

  // url for this test http://star-fox.dev/starfox/tests?grep=Time
  (0, _mocha.describe)('Time', function () {

    (0, _mocha.describe)('#buildable', function () {
      (0, _mocha.it)('should be buildable from a time', function () {
        (0, _chai.expect)(new _starFoxTransformsTime.Time(new _starFoxTransformsTime.Time('12:12:12')).toString()).to.equal('12:12:12');
      });

      (0, _mocha.it)('should be buildable from a string', function () {
        (0, _chai.expect)(new _starFoxTransformsTime.Time('12:12:12').toString()).to.equal('12:12:12');
      });

      (0, _mocha.it)('should be buildable from a moment', function () {
        var mo = (0, _moment['default'])();

        (0, _chai.expect)(new _starFoxTransformsTime.Time(mo).toString()).to.equal(mo.format('HH:mm:ss'));
      });
    });

    (0, _mocha.describe)('#add', function () {

      (0, _mocha.it)('should add hours', function () {
        (0, _chai.expect)(_starFoxTransformsTime.Time.startOfDay.add(1, 'hours').toString()).to.equal('01:00:00');
      });

      (0, _mocha.it)('should add minutes', function () {
        (0, _chai.expect)(_starFoxTransformsTime.Time.startOfDay.add(1, 'minutes').toString()).to.equal('00:01:00');
      });

      (0, _mocha.it)('should add seconds', function () {
        (0, _chai.expect)(_starFoxTransformsTime.Time.startOfDay.add(1, 'seconds').toString()).to.equal('00:00:01');
      });
    });

    (0, _mocha.describe)('#rangeBetween', function () {

      (0, _mocha.it)('should properly compute the range between two times', function () {
        var t = _starFoxTransformsTime.Time.startOfDay;
        var t2 = t.add(1, 'hours');
        var expectedRange = [new _starFoxTransformsTime.Time('00:00:00'), new _starFoxTransformsTime.Time('00:15:00'), new _starFoxTransformsTime.Time('00:30:00'), new _starFoxTransformsTime.Time('00:45:00'), new _starFoxTransformsTime.Time('01:00:00')];
        var range = t.rangeBetween(t2, 15);

        (0, _chai.expect)(range.length).to.equal(5);

        // compare each of the elements in the range
        expectedRange.forEach(function (time, i) {
          return (0, _chai.expect)(time.toString()).to.equal(range[i].toString());
        });
      });

      (0, _mocha.it)('should properly compute a whole day worth of dates', function () {
        var t = _starFoxTransformsTime.Time.startOfDay;
        var t2 = _starFoxTransformsTime.Time.endOfDay;

        var range = t.rangeBetween(t2, 15);
        (0, _chai.expect)(range.length).to.equal(96 + 1);
      });
    });

    (0, _mocha.describe)('#startOfDay', function () {

      (0, _mocha.it)('should return the start of the day', function () {
        (0, _chai.expect)(_starFoxTransformsTime.Time.startOfDay.toString()).to.equal('00:00:00');
      });
    });

    (0, _mocha.describe)('#endOfDay', function () {

      (0, _mocha.it)('should return the start of the day', function () {
        (0, _chai.expect)(_starFoxTransformsTime.Time.endOfDay.toString()).to.equal('23:59:59');
      });
    });
  });
});
/* jshint expr:true */
define('star-fox/tests/unit/utils/order-item-options-test', ['exports', 'ember', 'chai', 'mocha', 'ember-mocha', 'ember-data-factory-guy', 'star-fox/utils/order-item-options'], function (exports, _ember, _chai, _mocha, _emberMocha, _emberDataFactoryGuy, _starFoxUtilsOrderItemOptions) {
  var run = _ember['default'].run;

  (0, _mocha.describe)('OrderItemOptions', function () {
    (0, _emberMocha.setupModelTest)('order-item', {
      needs: ['model:group-order-member', 'model:order', 'model:order-item', 'model:menu-item', 'model:menu-option-item', 'model:menu-option-group']
    });

    (0, _mocha.describe)('#createFromOrderItem', function () {
      (0, _mocha.beforeEach)(function () {
        (0, _emberDataFactoryGuy.manualSetup)(this.subject().container);

        var controller = this.subject();

        var threeMenuOptionItems = (0, _emberDataFactoryGuy.makeList)('menu-option-item', 3);
        var fiveMenuOptionItems = (0, _emberDataFactoryGuy.makeList)('menu-option-item', 5);

        var menuOptionGroup = (0, _emberDataFactoryGuy.make)('menu-option-group', {
          menuOptionItems: threeMenuOptionItems
        });

        var isSingleOptMenuOptionGroup = (0, _emberDataFactoryGuy.make)('menu-option-group', {
          isSingleOpt: true,
          menuOptionItems: fiveMenuOptionItems
        });

        var menuItem = (0, _emberDataFactoryGuy.make)('menu-item', {
          menuOptionGroups: [menuOptionGroup, isSingleOptMenuOptionGroup]
        });

        var orderItem = (0, _emberDataFactoryGuy.makeNew)('order-item');

        run.next(function () {
          orderItem.set('menuItem', menuItem);

          controller.setProperties({
            orderItem: orderItem,
            isSingleOptMenuOptionGroup: isSingleOptMenuOptionGroup
          });
        });
      });

      (0, _mocha.it)('creates intermediaryObject from new order-item', function (done) {
        var _this = this;

        run.next(function () {
          var orderItem = _this.subject().get('orderItem');
          var isSingleOptMenuOptionGroup = _this.subject().get('isSingleOptMenuOptionGroup');
          var firstMenuOptionItem = isSingleOptMenuOptionGroup.get('menuOptionItems.firstObject');
          var expectedMogKey = 'mog' + isSingleOptMenuOptionGroup.get('id');

          var intermediaryObject = _starFoxUtilsOrderItemOptions['default'].createFromOrderItem(orderItem);

          (0, _chai.expect)(Object.keys(intermediaryObject).length).to.eq(4);
          (0, _chai.expect)(intermediaryObject).to.contain.key(expectedMogKey);
          (0, _chai.expect)(intermediaryObject[expectedMogKey]).to.eq(firstMenuOptionItem);
          done();
        });
      });
    });

    (0, _mocha.describe)('#createFromOrderItem', function () {
      (0, _mocha.beforeEach)(function () {
        (0, _emberDataFactoryGuy.manualSetup)(this.subject().container);

        var controller = this.subject();

        var threeMenuOptionItems = (0, _emberDataFactoryGuy.makeList)('menu-option-item', 3);
        var fiveMenuOptionItems = (0, _emberDataFactoryGuy.makeList)('menu-option-item', 5);

        var menuOptionGroup = (0, _emberDataFactoryGuy.make)('menu-option-group', {
          menuOptionItems: threeMenuOptionItems
        });

        var isSingleOptMenuOptionGroup = (0, _emberDataFactoryGuy.make)('menu-option-group', {
          isSingleOpt: true,
          menuOptionItems: fiveMenuOptionItems
        });

        var menuItem = (0, _emberDataFactoryGuy.make)('menu-item', {
          menuOptionGroups: [menuOptionGroup, isSingleOptMenuOptionGroup]
        });

        var menuOptionItemsToApply = _ember['default'].Object.create({
          moi1: true,
          moi2: true,
          moi3: false,
          mog2: fiveMenuOptionItems[0]
        });

        var orderItem = (0, _emberDataFactoryGuy.make)('order-item', {
          menuItem: menuItem,
          menuOptionItems: menuOptionItemsToApply,
          quantity: 1
        });

        run.next(function () {
          controller.setProperties({
            orderItem: orderItem,
            mogOption: fiveMenuOptionItems[0],
            otherMogOption: fiveMenuOptionItems[1],
            menuOptionItemsToApply: menuOptionItemsToApply
          });
        });
      });

      (0, _mocha.it)('creates intermediaryObject from a saved order item', function (done) {
        var _this2 = this;

        run.next(function () {
          var orderItem = _this2.subject().get('orderItem');

          // Fake intermediaryStruct usually created by
          // OrderItemOptions.createFromOrderItem(orderItem)
          var menuOptionItemsToApply = _this2.subject().get('menuOptionItemsToApply');

          var intermediaryObject = _starFoxUtilsOrderItemOptions['default'].createFromOrderItem(orderItem);
          (0, _chai.expect)(Object.keys(intermediaryObject).length).to.eq(4);

          _starFoxUtilsOrderItemOptions['default'].applyToOrderItem(orderItem, menuOptionItemsToApply);
          (0, _chai.expect)(orderItem.get('menuOptionItems.length')).to.eq(3);

          // Lets add another menu_order_item to the order item
          menuOptionItemsToApply.set('moi3', true);

          _starFoxUtilsOrderItemOptions['default'].applyToOrderItem(orderItem, menuOptionItemsToApply);
          (0, _chai.expect)(orderItem.get('menuOptionItems.length')).to.eq(4);
          done();
        });
      });

      (0, _mocha.it)('correctly switches isSingleOpt menu option group\'s menu option items', function (done) {
        var _this3 = this;

        run.next(function () {
          var orderItem = _this3.subject().get('orderItem');
          var mogOption = _this3.subject().get('mogOption');
          var otherMogOption = _this3.subject().get('otherMogOption');

          // Fake intermediaryStruct usually created by
          // OrderItemOptions.createFromOrderItem(orderItem)
          var menuOptionItemsToApply = _this3.subject().get('menuOptionItemsToApply');

          // First we're applying some menu options items to the order item
          _starFoxUtilsOrderItemOptions['default'].applyToOrderItem(orderItem, menuOptionItemsToApply);
          (0, _chai.expect)(orderItem.get('menuOptionItems.length')).to.eq(3);
          (0, _chai.expect)(orderItem.get('menuOptionItems').includes(mogOption)).to.be.ok;

          // Now we're switching the isSingleOpt menu option group's menu_option_item
          menuOptionItemsToApply.set('mog2', otherMogOption);

          _starFoxUtilsOrderItemOptions['default'].applyToOrderItem(orderItem, menuOptionItemsToApply);
          (0, _chai.expect)(orderItem.get('menuOptionItems').includes(otherMogOption)).to.be.ok;
          done();
        });
      });
    });
  });
});
/* jshint expr:true */
define('star-fox/tests/unit/utils/url-test', ['exports', 'chai', 'mocha', 'star-fox/utils/url'], function (exports, _chai, _mocha, _starFoxUtilsUrl) {

  (0, _mocha.describe)('url', function () {
    // Replace this with your real tests.
    (0, _mocha.it)('works', function () {
      var getHostName = _starFoxUtilsUrl['default'].getHostName;
      var getHostPath = _starFoxUtilsUrl['default'].getHostPath;
      var buildPath = _starFoxUtilsUrl['default'].buildPath;
      (0, _chai.expect)(getHostName).to.be.ok;
      (0, _chai.expect)(getHostPath).to.be.ok;
      (0, _chai.expect)(buildPath).to.be.ok;
    });
  });
});
/* jshint expr:true */
/* jshint ignore:start */

require('star-fox/tests/test-helper');
EmberENV.TESTS_FILE_LOADED = true;

/* jshint ignore:end */
//# sourceMappingURL=tests.map

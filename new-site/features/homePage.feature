Feature: Verify the Home page of the OrangeHRM website.

  Scenario: Verify the top navigation menu in the Home page.
    Given I load the OrangeHRM website
    When I land on the Home page
    Then I can see the top navigation menu bar with the OrangeHRM logo
    And the navigation menu bar contains the "Solutions" menu
    And the navigation menu bar contains the "Why OrangeHRM" menu
    And the navigation menu bar contains the "Resources" menu
    And the navigation menu bar contains the "Company" menu
    And the navigation menu bar contains the "Pricing" menu
    And the navigation menu bar contains the Book a Free Demo button
    And the navigation menu bar contains the Contact Sales button
    When I click the "Solutions" menu in the navigation menu bar
    Then I can see the various solutions that OrangeHRM offers
    When I click the "Why OrangeHRM" menu in the navigation menu bar
    Then I can see the various reasons why OrangeHRM is better
    When I click the "Resources" menu in the navigation menu bar
    Then I can see the various resources available
    When I click the "Company" menu in the navigation menu bar
    Then I can see the various information links about the company

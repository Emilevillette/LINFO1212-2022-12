Feature: the client can rent items

  Scenario: The user wants to rent items from the inventory
    Given the shopping cart of the user (all the item they want to rent)
    And the user's phone number
    And the user's email address
    And the user's physical address
    When the user selects a time period
    Scenario: The selected items are all available during the desired rent period
      Then the user is informed that the request is succesful
      And the user gets a receipt with practical information

    Scenario: The selected items are not all available in the time period
      Then the user is informed about which item is not available
      And the user is prompted to try again with a valid time period
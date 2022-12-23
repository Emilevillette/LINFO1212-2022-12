Feature: Admins can manage orders

  Admins can manage orders

  Scenario: The admin wishes to manage an order with its order number
    Given an order number
    When the admin enters the order number 
    And confirms his entry
    Then the admin can now see every order associated with that order number
    And can add information on the date of the items' departure
    And the date of the items' return
    And if needed comments about the order

  Scenario: The admin wishes to manage an order with an order number that doesn't exist
    Given an order number
    When the admin enters the order number 
    And confirms his entry
    Then the admin is informed that the order number given doesn't exist
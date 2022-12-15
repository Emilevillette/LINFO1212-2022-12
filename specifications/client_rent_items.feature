Feature: the client can rent items

  The clients try to rent some items from the website

  Scenario: The client tries to select an item that is available
    Given the client wishes to add an item to the cart
    When the client tries to add the item to the cart
    Then the client is informed that the item is successfully added to the cart

  Scenario: The client tries to select an item that is not available
    Given the client wishes to add an item to the cart
    When the client tries to add the item to the cart
    Then the client is informed that the item is not available

  Scenario: The client wants to confirm his order
    Given the shopping cart of the client with all the items they want to rent
    When the client has entered his phone number
    And his email address
    And his physical address
    And has selected a time period for the item to be rented
    Then the order is confirmed and the client is given a pdf with a recap of his order which includes an order number for the pickup of the items
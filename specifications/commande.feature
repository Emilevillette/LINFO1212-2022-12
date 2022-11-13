Feature: order management for admin

  Admins can manage orders

  Scenario: The user is logged in an admin account
    Given an order number
    Then the admin can confirm the hardware's departure/entry in the inventory
    And the admin can cancel an order
    And the admin can see the order's information

Feature: the admins can register new items to inventory

    Scenario: The admin tries to add items to the inventory and is logged in
        Given the admin has entered the number of items
        And the items' category
        And the category of the item
        And the admin is logged in
        When the admin confirms the inventory input
        Then the server successfully adds the items to the database
        And they are listed as available to rent
        And a unique ID is generated for each item

    Scenario: The admin tries to add items to the inventory but is logged in
        Given the admin has entered the number of items
        And the items' category
        And the category of the item
        And the admin is not logged in
        When the admin confirms the inventory input
        Then the admin input is rejected
        And he's sent to the admin login page
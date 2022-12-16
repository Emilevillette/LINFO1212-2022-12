Feature: Manage admin accounts

    Super admin can create accounts and all admins can log in to their accounts

    Scenario: A regular admin tries to create an admin account
        Given the admin enters a valid email
        And a valid password
        And he's not logged in to a super admin account
        When he confirms his inputs
        Then the admin account is not created
        And the admin is informed that only a super admin can create regular admin accounts

    Scenario: The super admin successfully creates an admin account
        Given the admin enters a valid email
        And a valid password
        And he's logged in to a super admin account
        When he confirms his inputs
        Then the admin account is successfully created

    Scenario: The super admin fails in creating an admin account
        Given the admin enters a not-valid or an already-used email
        And a valid password
        And he's logged in to a super admin account
        When he confirms his inputs
        Then the admin account is not created
        And the admin is informed that the email is not valid or has already been used

    Scenario: An admin successfully login
        Given the admin enters a valid email
        And a valid password
        When he confirms his inputs
        Then the admin is logged in
    
    Scenario: An admin fails in logging in
        Given the admin enters a valid or incorrect email
        And a valid or incorrect password
        When he confirms his inputs
        Then the login fails
        And the admin is informed that the email or the password is incorrect
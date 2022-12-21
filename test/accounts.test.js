const Account_mgmt = require("../scripts/account_management");

describe("Find if an email exist",() => {
   test("Find an existing email",() => {
       const email = Account_mgmt.check_existing("admin@louvainlinux.org");
       expect(email).not.toBeFalsy();
   });
    test("Find an non existing email",() => {
        const email = Account_mgmt.check_existing("testing@testing.com");
        expect(email).not.toBeFalsy();
    });
});

describe("Find an admin account",() => {
    beforeAll(() => {
        //Creates a testing account
        Account_mgmt.create_account("testing@testing.com","testing",false);
    });
    afterAll(() => {
        //Deletes the test account
        Account_mgmt.delete_account("testing@testing.com");
    });
    test("Find an existing account with incorrect password",async () => {
        const account = await Account_mgmt.get_account("testing@testing.com", "incorrect_psw");
        expect(account["code"]).toMatch(/connect_password_incorrect/);
    });

    test("Find an existing account with correct password",async () => {
        const account = await Account_mgmt.get_account("testing@testing.com", "testing");
        expect(account["code"]).toMatch(/connect_ok/);
    });

    test("Find an non existing account",async () => {
        const account = await Account_mgmt.get_account("not_an_account@testing.com", "not_an_account");
        expect(account["code"]).toMatch(/connect_not_found/);
    });
});

describe("Create an admin account",() => {
    afterAll(() => {
        //Deletes the test account
        Account_mgmt.delete_account("testing@testing.com");
    });
    test("Create an  account that doesn't exist", async () => {
        const account = await Account_mgmt.create_account("testing@testing.com", "testing", false);
        expect(account).toMatch(/create_ok/);
    });
    test("Create an account that already exists", async () => {
        const account = await Account_mgmt.create_account("admin@louvainlinux.org", "testing", false);
        expect(account).toMatch(/create_fail/);
    });
});
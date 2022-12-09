const bcrypt = require("bcrypt");
const {Users} = require("../models/users");

/**
 * Creates an admin account
 *
 * @param email the user's email address
 * @param password the user's password
 * @returns {Promise<string>}
 */
async function create_account(email, password, is_main_admin) {
    if (await check_existing(email) !== false) {
        return "create_fail";
    }

    await Users.create({
        email: email,
        password_hash: await hash_password(password),
        is_main_admin: is_main_admin,
    })
    return "create_ok";
}


/**
 * Returns account if it exists, false otherwise
 *
 * @param email the user's email address
 * @returns {Promise<Model<any, TModelAttributes>|boolean>}
 */
async function check_existing(email) {
    const account = await Users.findByPk(email);
    if (account) {
        return account;
    } else {
        return false;
    }
}

/**
 * Gets the admin account that it's trying to connect
 *
 * @param email the user's email address
 * @param password the user's password
 * @returns {Promise<{code: string, data: null, pass: boolean}|{code: string, data: (Model<*, TModelAttributes>|boolean), pass: boolean}>}
 */
async function get_account(email, password) {
    const account = await check_existing(email);
    if (account === false) {
        return {
            code: "connect_not_found",
            pass: false,
            data: null
        };
    } else {
        const check = await check_password(password, account.password_hash);
        if (check) {
            return {
                code: "connect_ok",
                pass: true,
                data: account
            };
        } else {
            return {
                code: "connect_password_incorrect",
                pass: false,
                data: null
            };
        }
    }
}

/**
 * Checks if the password is correct
 *
 * @param providedPassword user-provided password
 * @param hash user password hash in database
 * @returns {Promise<void|*>}
 */
async function check_password(providedPassword, hash) {
    return await bcrypt.compare(providedPassword, hash);
}

/**
 * Hashes the user's password
 *
 * @param password user-provided password
 * @returns {Promise<void|*>}
 */
async function hash_password(password) {
    return bcrypt.hash(password, 10);
}


module.exports = {create_account, get_account};
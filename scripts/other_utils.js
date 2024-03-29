/**
 * Extract a list of values from dictionaries in a list
 *
 * @param dict_list
 * @param attribute_name
 * @returns {*[]}
 */
function extract_values(dict_list, attribute_name) {
    let retval = []
    for (let element in dict_list) {
        retval.push(dict_list[element][attribute_name]);
    }
    return retval;
}

module.exports = {extract_values}
export let MESSAGES = {
    required:   "This field is required.",
    email: "Please enter a valid email ID.",
    url: "Please enter a valid url.",
    size: "Exceed file size.",
    password:"Enter min 8 character combination of letters (using upper and lower case) and a special character (@#$%).",
    equalTo: "Enter the same value again.",
    onesPlace:"Please enter a valid amount.",
    weightage:"Please enter value 1 to 100",
    min:"Please enter value lesser then max value",
    max:"Please enter value greater then min value",
    decimal:"Please enter value in XX or XX.XX format",
    number:"Please enter number only",
    mobile:"",
    signup : {
        final : {
            code : {
                maxLength: "Please enter no more than 4 characters.",
            },
            phone : {
                minLength: "Please enter at least 5 characters.",
                onesPlace: "Please enter your valid mobile number.",
            }

        }
    },
    passwordLengthError: 'Password should be greater than 6 characters',
    passwordSuccessfullysent: 'Password has been successfully sent to the registered phone number',
}
export let PATTERN = {
    onesPlace : /^[1-9][0-9]*$/,
    password:/^[!$@#\w\s]*$/,
    email:/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,

}

export const FilterList = [{
    id: 0,
    value: 'All Users'
},
{
    id: 1,
    value: 'All Approved'
},
{
    id: 2,
    value: 'Approved Drivers'
},
{
    id: 3,
    value: 'Approved Fleet Owners'
},
{
    id: 4,
    value: 'Approved Customers'
},
{
    id: 5,
    value: 'Approved Agents'
},
{
    id: 6,
    value: 'Pending Users'
},
{
    id: 7,
    value: 'Active Users'
},
{
    id: 8,
    value: 'Deactive Users'
},
{
    id: 9,
    value: 'Fleet Owners with Pending Trucks'
},
{
    id: 10,
    value: 'User with Smartphones'
},
{
    id: 11,
    value: 'Users without Smartphones'
}
]

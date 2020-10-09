import { API } from './../../backend';

export const getMeToken = (userId,token) => {
    return fetch(`${API}payment/gettoken/${userId}` ,{
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: ` Bearer ${token}`
        }
    }).then(response => {
        return response.json();
    }).catch(err => console.log(err));
};

export const processpayment = (userId, token, paymentinfo) => {
    return fetch(`${API}payment/braintree/${userId}` , {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: ` Bearer ${token}`
        },
        body: JSON.stringify(paymentinfo)
    }).then(response => {
        return response.json();
    })
    .catch(err => console.log(err))
}


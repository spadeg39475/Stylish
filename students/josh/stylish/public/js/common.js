let localStorage = {
    user: {},

    cart: {
        prime: "",
        order: {
            shipping: "",
            payment: "",
            subtotal: "",
            freight: "",
            total: "",
            recipient: {
                name: "",
                phone: "",
                email: "",
                address: "",
                time: ""
            }
        },

        list: []
    }
}

// "list": 
//     {
//       "id": [Product ID],
//       "name": [Product Name],
//       "price": [Product Unit Price],
//       "color": {
//         "name": [Product Variant Color Name],
//         "code": [Product Variant Color HexCode]
//       },
//       "size": [Product Variant Size],
//       "qty": [Quantity]
//     }

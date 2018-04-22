export interface Partner {
    name: String,
    email: String,
    phone: Number,
    alternate: Number,
    basic: {
      address: String,
      city: String,
      state: String,
      pincode: Number
    },
    location: {
      latitude: Number, 
      longitude: Number
    },
    characteristics: {
      type: String,
      services: [String],
      seating: Boolean,
      cuisine: [String],
      weektimings: [String],
      opentime: String,
      closetime: String
    },
    bankdetails: {
      name: String,
      number: Number,
      bankname: String,
      branch: String, 
      ifsc: String
    },
    commission: Number,
    documents: [String]
}
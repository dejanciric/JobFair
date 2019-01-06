export interface Offer{
    id: String,
    title: String,
    type: String,
    content: String,
    deadline:String,
    companyName: String,
    companyUsername: String,
    students:[{"username":String, "firstname":String, "lastname":String, "result":String, "comment":String}],
    image:String
}

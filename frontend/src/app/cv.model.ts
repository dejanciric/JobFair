import { Work } from './work.model';
import { Education } from './education.model';

export interface CV{
    username: String,
    firstname: String,
    lastname: String,
    address: String,
    postcode:String,
    city: String,
    country: String,
    phoneType: String,
    phone: String,
    mail: String,
    applicationType:String,
    description: String,
    additionalSkillsText: String,
    educations: [Education],
    works: [Work],
    language1: String,
    language2:String,
    language3: String,
    language1knowladge: String,
    language2knowladge:String,
    language3knowladge: String
}

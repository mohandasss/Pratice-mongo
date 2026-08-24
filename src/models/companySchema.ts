import mongoose from "mongoose";


const companySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  logo: {
    type: String,
  },
 
});

const company = mongoose.model('company', companySchema);
export default company;
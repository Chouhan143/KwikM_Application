import {createSlice} from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'details',
  initialState: {
    values: [],
    number: [],
    category_id: [],
    product_id: [],
    login_data: [],
    lead_details: [],
    paytm_lead_details: [],
    check_payment_status: [],
    edit_bank_account: [],
    pice_lead_details: {},
    pice_campaign_url: {},

    // corporate redux store
    recentTransactions: [],
    myDistributorsList: [],

    // distributor
    distributor_leadMessage: {},
  },

  reducers: {
    addDetails: (state, action) => {
      // console.log(action.payload)
      state.values = action.payload;
    },
    addNumber: (state, action) => {
      // console.log(action.payload)
      state.number = action.payload;
    },
    addCategoryId: (state, action) => {
      // console.log(action.payload)
      state.category_id = action.payload;
    },
    addProductId: (state, action) => {
      // console.log(action.payload)
      state.product_id = action.payload;
    },
    addLogin_data: (state, action) => {
      state.login_data = action.payload;
    },
    addRecentTransactions: (state, action) => {
      // console.log(action.payload)
      state.recentTransactions = action.payload;
    },
    addMyDistibutorList: (state, action) => {
      // console.log("Slice",action.payload)
      state.myDistributorsList = action.payload;
    },
    add_lead_Details: (state, action) => {
      // console.log(action.payload)
      state.lead_details = action.payload;
    },
    add_paytm_lead_details: (state, action) => {
      // console.log(action.payload)
      state.paytm_lead_details = action.payload;
    },
    add_check_payment_status: (state, action) => {
      state.check_payment_status = action.payload;
    },
    add_edit_bank_account_details: (state, action) => {
      state.edit_bank_account = action.payload;
    },
    add_pice_lead_details: (state, action) => {
      //  console.log(action.payload)
      state.pice_lead_details = action.payload;
    },
    add_pice_campaign_url: (state, action) => {
      state.pice_campaign_url = action.payload;
    },
    add_distributor_leadMessage: (state, action) => {
      state.distributor_leadMessage = action.payload;
    },
  },
});

export const {
  addDetails,
  addNumber,
  addCategoryId,
  addProductId,
  addLogin_data,
  addRecentTransactions,
  addMyDistibutorList,
  add_lead_Details,
  add_paytm_lead_details,
  add_check_payment_status,
  add_edit_bank_account_details,
  add_pice_lead_details,
  add_pice_campaign_url,
  add_distributor_leadMessage,
} = slice.actions;
export default slice.reducer;

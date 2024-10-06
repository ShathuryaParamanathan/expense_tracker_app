// import {Config} from 'drizzle-kit';
export default {
    schema: "./utils/schema.jsx",
    dialect: 'postgresql',
    dbCredentials: {
      url: 'postgresql://expense-tracker_owner:CZG52VPHfWTI@ep-tiny-wave-a55kogg7.us-east-2.aws.neon.tech/expense-tracker?sslmode=require',
    }
  } ;
var dotenv = require('dotenv');
dotenv.config()

const AdminBro = require('admin-bro');
const AdminBroExpress = require('admin-bro-expressjs');
const AdminBroMongoose = require('admin-bro-mongoose');
const Admin = require('../models/Admin');
const User = require('../models/User');
const mongoose = require("mongoose");
const express = require('express');
const app = express();
const bcrypt = require('bcryptjs');
const combineStlyes = require('@admin-bro/design-system');

AdminBro.registerAdapter(AdminBroMongoose)

const adminBro = new AdminBro({
  rootPath: '/admin',
  logoutPath: '/admin/logout',
  loginPath: '/admin/login',
  databases: [ mongoose ],
  branding: {
    logo: 'https://i.postimg.cc/bJG40C4K/penthouse.jpg',
    companyName: 'Konyang Pent House',
    softwareBrothers: false,
    favicon: 'https://i.postimg.cc/bJG40C4K/penthouse.jpg',
  },
})

const ADMIN = {
  email: 'Lyrical@email.com',
  password: 'Lyrical1234'
};

const adminRouter = AdminBroExpress.buildAuthenticatedRouter(adminBro, {
  cookieName: 'admin-bro',
  cookiePassword: 'superlongandcomplicatedname',
  authenticate: async (email, password) => {
    if (ADMIN.password === password && ADMIN.email === email) {
      return ADMIN
    }
      return null
    },
  }, null, {
    resave: true,
    saveUninitialized: true,
});

app.use(adminBro.options.rootPath, adminRouter)

module.exports = adminRouter
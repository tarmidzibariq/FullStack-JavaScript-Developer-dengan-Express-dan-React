// import express
const express = require('express');

// import prisma client
const prisma = require('../prisma/client');

// import validationResult from express-validator
const { validationResult } = require('express-validator');

// import bcrypt for password hashing
const bcrypt = require('bcryptjs');

// function findUser
const findUser = async (req, res) =>{
    try{

        // get all user from database
        const users = await prisma.user.findMany({
            select:{
                id: true,
                name: true,
                email: true,
            },
            orderBy: {
                id: 'desc',
            },
        })

        // send response
        res.status(200).send({
            success: true,
            message: 'Get all users successfully',
            data: users,
        });

    }catch (error) {
        // jika terjadi error, kembalikan error ke pengguna
        res.status(500).send({
            success: false,
            message: 'Internal server error',
        });
    }
}

// function createUser
const createUser = async (req, res) => {

    // periksa hasil validasi
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        // jika ada error, kembalikan error ke pengguna
        return res.status(422).json({ 
            success: false,
            message: 'Validation error',
            errors: errors.array() 
        });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    try {
        // insert data
        const user = await prisma.user.create({
            data: {
                name: req.body.name,
                email: req.body.email,
                password: hashedPassword,
            }
        });

        res.status(201).send({
            success: true,
            message: 'User created successfully',
            data: user,
        });

    } catch (error) {
        res.status(500).send({
            success: false,
            message: 'Internal server error',
        });
    }

}

module.exports = { findUser, createUser };
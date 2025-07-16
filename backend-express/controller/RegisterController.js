// import express
const express = require('express');

// Import validation from express-validator
const { validationResult } = require('express-validator');

// import bcrypt for password hashing
const bcrypt = require('bcryptjs');

// import prisma client 
const prisma = require('../prisma/client');

// function register
const register = async (req, res) => {

    // periksa hasil validasi
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        // Jika ada error, kembalikan error ke pengguna
        return res.status(400).json({
             success: false,
             message: 'Validation failed',
             errors: errors.array()
        });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    try{
        // insert data
        const user = await prisma.user.create({
            data: {
                name: req.body.name,
                email: req.body.email,
                password: hashedPassword,
            },
        });

        // return response json
        res.status(201).send({
            success: true,
            message: 'User registered successfully',
            data: user,
        });
    }catch (error) {
        // jika terjadi error, kembalikan error ke pengguna
        res.status(500).send({
            success: false,
            message: 'Internal server error',
        });
    }
}

module.exports = { register };
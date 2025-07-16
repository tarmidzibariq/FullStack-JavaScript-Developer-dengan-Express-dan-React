// import express
const express = require('express');

// Import validationResult from express-validator
const { validationResult } = require('express-validator');

// import bcrypt for password hashing
const bcrypt = require('bcryptjs');

// import jwt
const jwt = require('jsonwebtoken');

// import prisma client
const prisma = require('../prisma/client');

//  function login
const login = async (req, res) => {
    // Periksa hasil validasi
    const errors = validationResult(req);

    if (!errors.isEmpty()) {

        // Jika ada error, kembalikan error ke pengguna
        return res.status(400).json({
            success: false,
            message: 'Validation failed',
            errors: errors.array()
        });
    }

    try {
        // Cari user berdasarkan email
        const user = await prisma.user.findFirst({
            where: {
                email: req.body.email
            },
            select: {
                id: true,
                name: true,
                email: true,
                password: true
            },
        });

        // Jika user tidak ditemukan, kembalikan error
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
            });
        }

        // compare password
        const validPassword = await bcrypt.compare(
            req.body.password,
            user.password
        );
        
        // Jika password tidak valid, kembalikan error
        if (!validPassword) {
            return res.status(401).json({
                success: false,
                message: 'Invalid password',
            });
        }

        // Generate JWT token   
        const token = jwt.sign({id : user.id}, process.env.JWT_SECRET, {
            expiresIn: "1h", // Token berlaku selama 1 jam
        })

        // destructure to remove pasword from user object
        const { password, ...userWithoutPassword } = user;

        // return response json
        return res.status(200).send({
            success: true,
            message: 'Login successful',
            data: {
                user: userWithoutPassword,
                token: token
            },
        });

    } catch (error) {
        res.status(500).send({
            success: false,
            message: 'Internal server error',
        });
    }
}

module.exports = { login };